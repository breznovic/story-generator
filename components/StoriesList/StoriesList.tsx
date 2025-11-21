"use client";

import { useState } from "react";
import { useGetStoriesQuery } from "../../lib/api/storiesApi";
import StoryCard from "../StoryCard/StoryCard";
import s from "./StoriesList.module.css";

const ITEMS_PER_PAGE = 10;

export default function StoriesList() {
  const [skip, setSkip] = useState(0);

  const { data, isLoading, error, refetch } = useGetStoriesQuery({
    skip,
    limit: ITEMS_PER_PAGE,
  });

  const currentPage = Math.floor(skip / ITEMS_PER_PAGE) + 1;
  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 1;

  const handlePrevious = () => {
    setSkip(Math.max(0, skip - ITEMS_PER_PAGE));
  };

  const handleNext = () => {
    if (data && skip + ITEMS_PER_PAGE < data.total) {
      setSkip(skip + ITEMS_PER_PAGE);
    }
  };

  if (error) {
    return (
      <div className={s.errorContainer}>
        <div className={s.errorMessageText}>Failed to load stories</div>
        <button
          onClick={() => refetch()}
          className="btn btn-primary retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={s.list}>
      <div className={s.header}>
        <h2 className={s.title}>Historical Stories</h2>
        <button
          onClick={() => refetch()}
          disabled={isLoading}
          className="btn btn-primary"
        >
          Refresh
        </button>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <div className={s.grid}>
            {data?.items.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {data && data.items.length > 0 && (
            <div className={s.pagination}>
              <button
                onClick={handlePrevious}
                disabled={skip === 0}
                className="btn-secondary"
              >
                Previous
              </button>

              <span className={s.info}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={!data || skip + ITEMS_PER_PAGE >= data.total}
                className="btn-secondary"
              >
                Next
              </button>
            </div>
          )}

          {data?.items.length === 0 && (
            <div className={s.empty}>
              No stories generated yet. Create your first story!
            </div>
          )}
        </>
      )}
    </div>
  );
}
