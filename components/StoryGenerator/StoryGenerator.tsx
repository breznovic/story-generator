"use client";

import { useState } from "react";
import type { SocialClass } from "../../lib/api/storiesApi";
import { useGenerateStoryMutation } from "../../lib/api/storiesApi";
import s from "./StoryGenerator.module.css";

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
    <div className={s.card}>
      <h2>Generate New Story</h2>

      <form onSubmit={handleSubmit}>
        <div className={s.formGroup}>
          <label className={s.formLabel}>Social Class</label>
          <div className={s.socialClassGrid}>
            {SOCIAL_CLASSES.map((sc) => (
              <button
                key={sc.value}
                type="button"
                onClick={() => setSocialClass(sc.value)}
                className={`${s.socialClassButton} ${
                  socialClass === sc.value ? s.active : ""
                }`}
              >
                <div className={s.socialClassEmoji}>{sc.emoji}</div>
                <div className={s.socialClassLabel}>{sc.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className={s.formGroup}>
          <label htmlFor="region" className={s.formLabel}>
            Region
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={s.formSelect}
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className={s.formGroup}>
          <div className={s.checkBoxGroup}>
            <input
              id="includeConflict"
              type="checkbox"
              checked={includeConflict}
              onChange={(e) => setIncludeConflict(e.target.checked)}
              className={s.checkbox}
            />
            <label htmlFor="includeConflict">Include historical conflict</label>
          </div>
        </div>

        <div className={s.buttonGroup}>
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
        <div className={s.result}>
          <div className={s.header}>
            <h3 className={s.title}>Your Story</h3>
            <span className={s.date}>
              {new Date(story.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className={s.content}>{story.story}</p>
        </div>
      )}
    </div>
  );
}
