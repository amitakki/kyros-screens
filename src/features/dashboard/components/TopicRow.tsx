import { Check, Lock, PlayCircle } from "lucide-react";

import type { Topic } from "../types";
import { childDetailContent } from "../content";

interface TopicRowProps {
  topic: Topic;
}

export function TopicRow({ topic }: TopicRowProps) {
  const isCompleted = topic.status === "completed";
  const isActive = topic.status === "active";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 16px",
        background: isActive ? "var(--brand-subtle)" : "transparent",
        borderLeft: `3px solid ${isActive ? "var(--brand)" : "transparent"}`,
        borderBottom: "1px solid var(--border-subtle)",
        cursor: isActive || isCompleted ? "pointer" : "default",
      }}
    >
      <div style={{ width: 16, flexShrink: 0, display: "flex", alignItems: "center" }}>
        {isCompleted && <Check size={13} style={{ color: "var(--success)" }} />}
        {isActive && <PlayCircle size={13} style={{ color: "var(--brand)" }} />}
        {!isCompleted && !isActive && <Lock size={12} style={{ color: "var(--text-subtle)" }} />}
      </div>

      <span
        style={{
          fontSize: 11,
          color: "var(--text-subtle)",
          fontWeight: 500,
          width: 20,
          flexShrink: 0,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {topic.id}
      </span>

      <span
        style={{
          flex: 1,
          fontSize: 13,
          color: topic.status === "locked" ? "var(--text-subtle)" : "var(--text-heading)",
          fontWeight: isActive ? 600 : 400,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {topic.name}
      </span>

      {isActive && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "var(--brand)",
            background: "var(--brand-muted)",
            padding: "2px 6px",
            borderRadius: 4,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            flexShrink: 0,
          }}
        >
          {childDetailContent.currentTopicBadge}
        </span>
      )}

      {isCompleted && topic.bestScore !== undefined && (
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: topic.bestScore >= 80 ? "var(--success)" : "var(--warning)",
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {topic.bestScore}%
        </span>
      )}
    </div>
  );
}
