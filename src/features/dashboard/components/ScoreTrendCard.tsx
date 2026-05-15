import { TrendingUp } from "lucide-react";

import type { SubjectProgress } from "../types";
import { childDetailContent } from "../content";

interface ScoreTrendCardProps {
  firstName: string;
  subjects: SubjectProgress[];
}

export function ScoreTrendCard({ firstName, subjects }: ScoreTrendCardProps) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", marginBottom: 16 }}>
        {childDetailContent.scoreTrendTitle}
      </h3>
      <div
        style={{
          background: "var(--surface-subtle)",
          borderRadius: 8,
          padding: 24,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <TrendingUp size={32} style={{ color: "var(--success)" }} />
        <div>
          <div style={{ fontSize: 24, fontWeight: 700, color: "var(--text-heading)" }}>
            {childDetailContent.scoreTrendRange}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {childDetailContent.scoreTrendPeriod}
          </div>
        </div>
      </div>
      <div
        style={{
          background: "var(--brand-subtle)",
          borderLeft: "3px solid var(--brand)",
          borderRadius: 8,
          padding: 12,
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 13, color: "var(--brand)" }}>
          {childDetailContent.scoreTrendInsight.replace("Emma's", `${firstName}'s`)}
        </p>
      </div>
      <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-heading)", marginBottom: 12 }}>
        {childDetailContent.subjectBreakdownTitle}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {subjects.map((subject) => (
          <div key={subject.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 100, fontSize: 13, color: "var(--text-muted)" }}>
              {subject.name}
            </div>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "var(--border-subtle)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${subject.progress}%`,
                  height: "100%",
                  background: subject.color,
                  borderRadius: 4,
                }}
              />
            </div>
            <div
              style={{
                width: 40,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-heading)",
                textAlign: "right",
              }}
            >
              {subject.progress}%
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          background: "var(--brand-subtle)",
          borderLeft: "3px solid var(--brand)",
          borderRadius: 8,
          padding: 12,
        }}
      >
        <p style={{ fontSize: 13, color: "var(--brand)" }}>
          {childDetailContent.scoreTrendAttention}
        </p>
      </div>
    </div>
  );
}
