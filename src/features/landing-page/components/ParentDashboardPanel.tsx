type Subject = { name: string; pct: number; color: string };

type ParentDashboardContent = {
  studentName: string;
  lastActive: string;
  liveLabel: string;
  subjects: readonly Subject[];
  tagline: string;
};

type Props = { content: ParentDashboardContent };

export function ParentDashboardPanel({ content }: Props) {
  return (
    <div
      style={{
        marginTop: 12,
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        boxShadow: "var(--shadow-soft)",
        padding: "18px 20px",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: 2,
            }}
          >
            {content.studentName}
          </p>
          <p style={{ fontSize: 11, color: "var(--text-subtle)" }}>{content.lastActive}</p>
        </div>
        <span
          style={{
            fontSize: 10,
            background: "var(--brand-subtle)",
            color: "var(--brand)",
            padding: "3px 9px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          {content.liveLabel}
        </span>
      </div>
      {content.subjects.map((s) => (
        <div
          key={s.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 60,
              fontSize: 11,
              color: "var(--text-body)",
              flexShrink: 0,
            }}
          >
            {s.name}
          </div>
          <div
            style={{
              flex: 1,
              height: 7,
              background: "var(--surface-muted)",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${s.pct}%`,
                height: "100%",
                background: s.color,
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              width: 36,
              fontSize: 11,
              fontWeight: 700,
              color: s.color,
              textAlign: "right",
            }}
          >
            {s.pct}%
          </div>
        </div>
      ))}
      <p
        style={{
          fontSize: 11,
          color: "var(--text-subtle)",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        {content.tagline}
      </p>
    </div>
  );
}
