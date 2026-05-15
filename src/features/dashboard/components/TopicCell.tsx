import { useState } from "react";
import { Check, Lock, Target } from "lucide-react";

import type { Topic } from "../types";
import { childDetailContent } from "../content";

interface TopicCellProps {
  topic: Topic;
}

export function TopicCell({ topic }: TopicCellProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const bgColor =
    topic.status === "completed"
      ? "var(--success)"
      : topic.status === "active"
        ? "var(--brand)"
        : "var(--surface-raised)";
  const borderColor = topic.status === "locked" ? "var(--border-subtle)" : bgColor;
  const textColor =
    topic.status === "locked" ? "var(--text-subtle)" : "var(--surface-raised)";

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1",
          background: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {topic.status === "completed" ? (
          <Check size={20} style={{ color: textColor }} />
        ) : null}
        {topic.status === "active" ? (
          <Target size={20} style={{ color: textColor }} />
        ) : null}
        {topic.status === "locked" ? (
          <Lock size={20} style={{ color: textColor }} />
        ) : null}
        <span style={{ fontSize: 11, color: textColor, fontWeight: 600, marginTop: 4 }}>
          {topic.id}
        </span>
        {topic.status === "active" ? (
          <div
            style={{
              position: "absolute",
              top: -8,
              background: "var(--brand)",
              color: "var(--brand-foreground)",
              fontSize: 9,
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {childDetailContent.currentTopicBadge}
          </div>
        ) : null}
      </div>

      {showTooltip ? (
        <div
          style={{
            position: "absolute",
            bottom: "110%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--surface-raised)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 8,
            padding: 12,
            boxShadow: "var(--shadow-popover)",
            width: 200,
            zIndex: 30,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--surface-raised)",
            }}
          />
          <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-heading)", marginBottom: 8 }}>
            {topic.name}
          </p>
          {topic.status === "completed" ? (
            <>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                Best: {topic.bestScore}%
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                Attempts: {topic.attempts}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                Last: {topic.lastPractised}
              </p>
            </>
          ) : null}
          {topic.status === "active" ? (
            <>
              <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 4 }}>
                Best: {topic.bestScore}%
              </p>
              <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                {childDetailContent.passTargetLabel}
              </p>
            </>
          ) : null}
          {topic.status === "locked" ? (
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {childDetailContent.unlockHintPrefix} {topic.id - 1}{" "}
              {childDetailContent.unlockHintSuffix}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
