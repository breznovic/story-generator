"use client";

import { useState } from "react";
import { useGetStoriesQuery } from "../lib/api/storiesApi";
import StoryCard from "./StoryCard";

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
      <div className="error-container">
        <div className="error-message-text">Failed to load stories</div>
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
    <div className="stories-list">
      <div className="stories-header">
        <h2 className="stories-title">Historical Stories</h2>
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
          <div className="stories-grid">
            {data?.items.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>

          {data && data.items.length > 0 && (
            <div className="pagination">
              <button
                onClick={handlePrevious}
                disabled={skip === 0}
                className="btn-secondary"
              >
                Previous
              </button>

              <span className="page-info">
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
            <div className="empty-state">
              No stories generated yet. Create your first story!
            </div>
          )}
        </>
      )}
    </div>
  );
}
