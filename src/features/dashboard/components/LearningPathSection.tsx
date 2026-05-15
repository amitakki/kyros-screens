import { Info } from "lucide-react";

import type { SubjectProgress, Topic } from "../types";
import { childDetailContent } from "../content";
import { TopicCell } from "./TopicCell";

interface LearningPathSectionProps {
  activeSubject: string;
  isMobile: boolean;
  onChangeSubject: (subjectName: string) => void;
  subjects: SubjectProgress[];
  topics: Topic[];
  weeksRemaining?: number;
}

export function LearningPathSection({
  activeSubject,
  isMobile,
  onChangeSubject,
  subjects,
  topics,
  weeksRemaining,
}: LearningPathSectionProps) {
  const completedCount = topics.filter((t) => t.status === "completed").length;
  const totalCount = topics.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: 32,
        marginBottom: 24,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: isMobile ? 12 : 24,
          marginBottom: 24,
          borderBottom: "2px solid var(--surface-muted)",
          overflowX: "auto",
        }}
      >
        {subjects.map((subject) => (
          <button
            key={subject.name}
            style={{
              background: "none",
              border: "none",
              padding: "12px 0",
              fontSize: 15,
              fontWeight: activeSubject === subject.name ? 700 : 500,
              color: activeSubject === subject.name ? "var(--brand)" : "var(--text-muted)",
              borderBottom:
                activeSubject === subject.name ? "2px solid var(--brand)" : "none",
              cursor: "pointer",
              marginBottom: -2,
              fontFamily: "var(--font-family-sans)",
            }}
            onClick={() => onChangeSubject(subject.name)}
          >
            {subject.name}{" "}
            <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>
              · {subject.progress}%
            </span>
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 15, color: "var(--text-heading)", fontWeight: 600, marginBottom: 8 }}>
          {completedCount} {childDetailContent.topicsCompletedOf} {totalCount}{" "}
          {childDetailContent.topicsCompletedSuffix} — {pct}%
        </p>
        <div
          style={{
            height: 8,
            background: "var(--border-subtle)",
            borderRadius: 4,
            overflow: "hidden",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              background: "var(--brand)",
              borderRadius: 4,
            }}
          />
        </div>
        {weeksRemaining !== undefined ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              ~{weeksRemaining} {childDetailContent.weeksRemainingLabel}
            </p>
            <Info
              size={14}
              style={{ color: "var(--text-subtle)", cursor: "pointer" }}
              title={childDetailContent.paceTooltip}
            />
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
          gap: 12,
        }}
      >
        {topics.map((topic) => (
          <TopicCell key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
