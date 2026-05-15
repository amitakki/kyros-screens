import { Button } from "../../../app/components/ui/button";

interface NextRecommendedStepCardProps {
  currentTopic: string;
  firstName: string;
}

export function NextRecommendedStepCard({
  currentTopic,
  firstName,
}: NextRecommendedStepCardProps) {
  return (
    <div
      style={{
        background: "var(--brand-subtle)",
        borderLeft: "4px solid var(--brand)",
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--brand)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        Next Recommended Step
      </p>
      <p style={{ fontSize: 16, color: "var(--text-heading)", marginBottom: 8 }}>
        {firstName} is ready to continue with:
      </p>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--brand)", marginBottom: 8 }}>
        {currentTopic}
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 4 }}>
        Maths · Estimated practice time: 20 min · Medium difficulty
      </p>
      <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
        {firstName}&apos;s best: 70% - target is 85% to pass
      </p>
      <Button
        className="hover:bg-brand-hover"
        style={{
          width: "100%",
          height: 48,
          background: "var(--brand)",
          color: "var(--brand-foreground)",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        Continue Practice -&gt;
      </Button>
      <p style={{ fontSize: 13, color: "var(--brand)", textAlign: "center", cursor: "pointer" }}>
        Resume where {firstName} left off
      </p>
    </div>
  );
}
