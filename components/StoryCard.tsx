import { StoryResponse } from "../lib/api/storiesApi";

interface StoryCardProps {
  story: StoryResponse;
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <div className="story-card">
      <div className="story-card-header">
        <span className="story-id">#{story.id}</span>
        <span className="story-meta">
          {new Date(story.created_at).toLocaleDateString()}
        </span>
      </div>
      <p className="story-content">{story.story_text}</p>
    </div>
  );
}
