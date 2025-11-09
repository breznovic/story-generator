"use client";

import { useState } from "react";
import { useGenerateStoryMutation } from "../lib/api/storiesApi";
import type { SocialClass } from "../lib/api/storiesApi";

const REGIONS = [
  "England",
  "France",
  "Germany",
  "Italy",
  "Spain",
  "Scotland",
  "Ireland",
  "Wales",
  "Byzantium",
  "Holy Land",
];

const SOCIAL_CLASSES: { value: SocialClass; label: string; emoji: string }[] = [
  { value: "peasant", label: "Peasant", emoji: "🌾" },
  { value: "knight", label: "Knight", emoji: "⚔️" },
  { value: "merchant", label: "Merchant", emoji: "💰" },
  { value: "noble", label: "Noble", emoji: "👑" },
  { value: "cleric", label: "Cleric", emoji: "⛪" },
];

export default function StoryGenerator() {
  const [socialClass, setSocialClass] = useState<SocialClass>("peasant");
  const [region, setRegion] = useState(REGIONS[0]);
  const [includeConflict, setIncludeConflict] = useState(true);

  const [generateStory, { data: story, isLoading, error, reset }] =
    useGenerateStoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await generateStory({
        social_class: socialClass,
        region,
        include_conflict: Boolean(includeConflict),
      }).unwrap();
    } catch (err) {
      console.error("Failed to generate story:", err);
    }
  };

  const handleReset = () => {
    reset();
    setSocialClass("peasant");
    setRegion(REGIONS[0]);
    setIncludeConflict(true);
  };

  return (
    <div className="card">
      <h2>Generate New Story</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Social Class</label>
          <div className="social-class-grid">
            {SOCIAL_CLASSES.map((sc) => (
              <button
                key={sc.value}
                type="button"
                onClick={() => setSocialClass(sc.value)}
                className={`social-class-button ${
                  socialClass === sc.value ? "active" : ""
                }`}
              >
                <div className="social-class-emoji">{sc.emoji}</div>
                <div className="social-class-label">{sc.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="region" className="form-label">
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="form-select"
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              id="includeConflict"
              type="checkbox"
              checked={includeConflict}
              onChange={(e) => setIncludeConflict(e.target.checked)}
              className="checkbox"
            />
            <label htmlFor="includeConflict">Include historical conflict</label>
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Generating..." : "Generate Story"}
          </button>

          <button type="button" onClick={handleReset} className="btn-secondary">
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="error-message">
          Error:{" "}
          {"data" in error
            ? JSON.stringify(error.data)
            : "Failed to generate story"}
        </div>
      )}

      {story && (
        <div className="story-result">
          <div className="story-header">
            <h3 className="story-title">Your Story</h3>
            <span className="story-date">
              {new Date(story.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="story-content">{story.story}</p>
        </div>
      )}
    </div>
  );
}
