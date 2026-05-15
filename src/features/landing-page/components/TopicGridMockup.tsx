import { Zap } from "lucide-react";

type Topic = {
  label: string;
  score: string;
  state: "done" | "active" | "locked";
};

type TopicGridContent = {
  subjects: readonly string[];
  topics: readonly Topic[];
  inProgressLabel: string;
  adaptationHighlight: string;
  adaptationBody: string;
};

type Props = { content: TopicGridContent };

export function TopicGridMockup({ content }: Props) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        boxShadow: "var(--shadow-soft)",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
        {content.subjects.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "var(--brand-foreground)" : "var(--text-subtle)",
              background: i === 0 ? "var(--brand)" : "transparent",
              border: i === 0 ? "none" : "1px solid var(--border-subtle)",
              whiteSpace: "nowrap",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {i === 0 && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--auth-panel-text-bright)",
                  display: "inline-block",
                }}
              />
            )}
            {s}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {content.topics.map((topic, i) => (
          <div
            key={i}
            style={{
              borderRadius: 10,
              padding: "8px 6px",
              textAlign: "center",
              ...(topic.state === "done"
                ? {
                    background: "var(--surface-raised)",
                    border: "2px solid var(--success)",
                    borderTop: "3px solid var(--success)",
                  }
                : topic.state === "active"
                  ? { background: "var(--brand)", border: "none" }
                  : {
                      background: "var(--surface-subtle)",
                      border: "1px solid var(--border-subtle)",
                    }),
            }}
          >
            {topic.state === "done" && (
              <>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--success)", marginBottom: 1 }}>✓</div>
                <div style={{ fontSize: 9, color: "var(--text-body)", lineHeight: 1.2, marginBottom: 2 }}>{topic.label}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--success)" }}>{topic.score}</div>
              </>
            )}
            {topic.state === "active" && (
              <>
                <div style={{ fontSize: 9, color: "var(--auth-panel-text-bright)", marginBottom: 1 }}>{content.inProgressLabel}</div>
                <div style={{ fontSize: 9, color: "var(--brand-foreground)", fontWeight: 600, lineHeight: 1.2 }}>{topic.label}</div>
                <div
                  style={{
                    width: 16, height: 4,
                    background: "var(--auth-panel-text-ghost)",
                    borderRadius: 2, margin: "3px auto 0", overflow: "hidden",
                  }}
                >
                  <div style={{ width: "70%", height: "100%", background: "white", borderRadius: 2 }} />
                </div>
              </>
            )}
            {topic.state === "locked" && (
              <>
                <div style={{ fontSize: 11, color: "var(--border-subtle)", marginBottom: 1 }}>🔒</div>
                <div style={{ fontSize: 9, color: "var(--text-subtle)", lineHeight: 1.2 }}>{topic.label}</div>
              </>
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          background: "var(--brand-subtle)",
          border: "1px solid var(--brand-muted)",
          borderRadius: 8,
          padding: "10px 12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          <Zap size={14} style={{ color: "var(--brand)", marginTop: 1, flexShrink: 0 }} />
          <p style={{ fontSize: 11, color: "var(--brand-dark)", lineHeight: 1.5, margin: 0 }}>
            <strong>{content.adaptationHighlight}</strong>{" "}
            {content.adaptationBody}
          </p>
        </div>
      </div>
    </div>
  );
}
