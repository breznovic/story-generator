import { useState } from "react";
import { StoryResponse, useDeleteStoryMutation } from "../lib/api/storiesApi";
import ConfirmationModal from "./ConfirmationModal";

interface StoryCardProps {
  story: StoryResponse;
}

export default function StoryCard({ story }: StoryCardProps) {
  const [deleteStory, { isLoading: isDeleting }] = useDeleteStoryMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteStory(story.id).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to delete story:", error);
    }
  };

  const handleCloseModal = () => {
    if (!isDeleting) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="story-card">
        <div className="story-card-header">
          <span className="story-id">#{story.id}</span>
          <span className="story-meta">
            {new Date(story.created_at).toLocaleDateString()}
          </span>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="delete-btn"
            title="Delete story"
          >
            {isDeleting ? "🗑️ Deleting..." : "🗑️"}
          </button>
        </div>
        <p className="story-content">{story.story_text}</p>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Story"
        message={`Are you sure you want to delete story #${story.id}? This action cannot be undone.`}
        confirmText="Delete Story"
        cancelText="Keep Story"
        isProcessing={isDeleting}
      />
    </>
  );
}
