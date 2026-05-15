import { useState } from "react";
import { BarChart2, Info, LayoutList } from "lucide-react";

import type { SubjectProgress, Topic } from "../types";
import { childDetailContent } from "../content";
import { TopicBarChart } from "./TopicBarChart";
import { TopicRow } from "./TopicRow";

interface LearningPathSectionProps {
  isMobile: boolean;
  subjects: SubjectProgress[];
  topicsPerSubject: Record<string, Topic[]>;
  weeksRemaining?: number;
}

type ViewMode = "list" | "chart";

function SubjectCard({
  subject,
  topics,
}: {
  subject: SubjectProgress;
  topics: Topic[];
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const completed   = topics.filter((t) => t.status === "completed").length;
  const total       = topics.length;

  return (
    <div
      style={{
        border: "1px solid var(--border-subtle)",
        borderLeftWidth: 4,
        borderLeftColor: subject.color,
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--surface-raised)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* ── Card header ── */}
      <div
        style={{
          padding: "13px 14px 12px",
          background: "var(--surface-subtle)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        {/* Row 1: subject name + toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-heading)" }}>
            {subject.name}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                color: "var(--text-muted)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {completed}/{total} · {subject.progress}%
            </span>

            {/* Toggle */}
            <div
              style={{
                display: "flex",
                border: "1px solid var(--border-subtle)",
                borderRadius: 6,
                overflow: "hidden",
                background: "var(--surface-raised)",
              }}
            >
              <ToggleBtn
                active={viewMode === "list"}
                title="List view"
                onClick={() => setViewMode("list")}
              >
                <LayoutList size={13} />
              </ToggleBtn>
              <ToggleBtn
                active={viewMode === "chart"}
                title="Chart view"
                onClick={() => setViewMode("chart")}
              >
                <BarChart2 size={13} />
              </ToggleBtn>
            </div>
          </div>
        </div>

        {/* Row 2: progress bar */}
        <div
          style={{
            height: 5,
            background: "rgba(0,0,0,0.08)",
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${subject.progress}%`,
              height: "100%",
              background: subject.color,
              borderRadius: 3,
              transition: "width 0.4s var(--ease-standard)",
            }}
          />
        </div>
      </div>

      {/* ── Content: list or chart ── */}
      <div style={{ overflowY: "auto", maxHeight: 296 }}>
        {viewMode === "list" ? (
          topics.map((topic) => <TopicRow key={topic.id} topic={topic} />)
        ) : (
          <TopicBarChart topics={topics} />
        )}
      </div>
    </div>
  );
}

function ToggleBtn({
  active,
  title,
  onClick,
  children,
}: {
  active: boolean;
  title: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      title={title}
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 26,
        height: 24,
        border: "none",
        background: active ? "var(--brand)" : "transparent",
        color: active ? "#fff" : "var(--text-subtle)",
        cursor: "pointer",
        transition: "background 150ms, color 150ms",
      }}
    >
      {children}
    </button>
  );
}

export function LearningPathSection({
  isMobile,
  subjects,
  topicsPerSubject,
  weeksRemaining,
}: LearningPathSectionProps) {
  const allTopics     = Object.values(topicsPerSubject).flat();
  const totalCompleted = allTopics.filter((t) => t.status === "completed").length;
  const totalTopics   = allTopics.length;

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: isMobile ? 20 : 28,
        marginBottom: 24,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* ── Section header ── */}
      <div style={{ marginBottom: 20 }}>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "var(--text-heading)",
            margin: 0,
            marginBottom: 4,
          }}
        >
          {childDetailContent.learningPathTitle}
        </h3>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {totalCompleted} {childDetailContent.topicsCompletedOf} {totalTopics}{" "}
            {childDetailContent.topicsCompletedSuffix}
          </span>
          {weeksRemaining !== undefined && (
            <>
              <span style={{ color: "var(--text-subtle)", fontSize: 12 }}>·</span>
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                ~{weeksRemaining} {childDetailContent.weeksRemainingLabel}
              </span>
              <Info
                size={13}
                style={{ color: "var(--text-subtle)", cursor: "pointer" }}
                title={childDetailContent.paceTooltip}
              />
            </>
          )}
        </div>
      </div>

      {/* ── 2×2 subject grid ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 14,
        }}
      >
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.name}
            subject={subject}
            topics={topicsPerSubject[subject.name] ?? []}
          />
        ))}
      </div>
    </div>
  );
}
