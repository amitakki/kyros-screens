import { PlayCircle } from "lucide-react";

import { Button } from "../../../app/components/ui/button";

interface NextRecommendedStepCardProps {
  currentScore: number;
  currentTopic: string;
  estimatedMinutes: number;
  firstName: string;
  isMobile: boolean;
  targetScore: number;
}

export function NextRecommendedStepCard({
  currentScore,
  currentTopic,
  estimatedMinutes,
  isMobile,
  targetScore,
}: NextRecommendedStepCardProps) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderLeft: "4px solid var(--brand)",
        borderRadius: 16,
        padding: isMobile ? "16px 18px" : "16px 24px",
        marginBottom: 24,
        boxShadow: "var(--shadow-soft)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 14 : 20,
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: "var(--brand-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <PlayCircle size={22} style={{ color: "var(--brand)" }} />
      </div>

      {/* Topic info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 3,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "var(--brand)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Next Recommended
          </span>
          <span
            style={{
              background: "var(--brand-subtle)",
              color: "var(--brand)",
              fontSize: 11,
              fontWeight: 600,
              padding: "1px 8px",
              borderRadius: 20,
            }}
          >
            Maths
          </span>
          <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>
            {estimatedMinutes} min · Medium
          </span>
        </div>
        <p
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-heading)",
            margin: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentTopic}
        </p>
      </div>

      {/* Score progress bar */}
      <div style={{ width: isMobile ? "100%" : 200, flexShrink: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Best: <strong style={{ color: "var(--warning)" }}>{currentScore}%</strong>
          </span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            Target: <strong style={{ color: "var(--success)" }}>{targetScore}%</strong>
          </span>
        </div>
        <div
          style={{
            height: 8,
            background: "var(--border-subtle)",
            borderRadius: 4,
            position: "relative",
            overflow: "visible",
          }}
        >
          {/* Score fill */}
          <div
            style={{
              width: `${currentScore}%`,
              height: "100%",
              background: "var(--warning)",
              borderRadius: 4,
            }}
          />
          {/* Target marker */}
          <div
            style={{
              position: "absolute",
              top: -4,
              left: `${targetScore}%`,
              width: 2,
              height: 16,
              background: "var(--success)",
              borderRadius: 1,
              transform: "translateX(-50%)",
            }}
          />
        </div>
      </div>

      {/* CTA */}
      <Button
        style={{
          flexShrink: 0,
          height: 40,
          background: "var(--brand)",
          color: "var(--brand-foreground)",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          paddingLeft: 20,
          paddingRight: 20,
          width: isMobile ? "100%" : undefined,
        }}
      >
        Continue →
      </Button>
    </div>
  );
}
