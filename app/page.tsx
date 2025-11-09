import StoryGenerator from "../components/StoryGenerator";

export default function Home() {
  return (
    <div>
      <div className="hero-section">
        <h1 className="hero-title">Medieval Story Generator</h1>
        <p className="hero-description">
          Create authentic medieval stories based on social class, region, and
          historical context. Experience life as a peasant, knight, merchant,
          noble, or cleric in the Middle Ages.
        </p>
      </div>
      <StoryGenerator />
    </div>
  );
}
