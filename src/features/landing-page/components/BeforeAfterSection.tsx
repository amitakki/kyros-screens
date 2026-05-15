type Row = {
  feature: string;
  without: string;
  with: string;
};

type BeforeAfterContent = {
  title: string;
  headerWithout: string;
  headerWith: string;
  rows: readonly Row[];
  examplePill: {
    prefix: string;
    highlight: string;
    suffix: string;
  };
};

type Props = { content: BeforeAfterContent };

export function BeforeAfterSection({ content }: Props) {
  return (
    <section
      style={{
        background: "var(--surface-subtle)",
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <h2
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--text-heading)",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          {content.title}
        </h2>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto 28px",
            background: "var(--surface-raised)",
            borderRadius: 12,
            boxShadow: "var(--shadow-medium)",
            overflowX: "auto",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              background: "var(--surface-subtle)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            <div
              style={{
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-subtle)",
              }}
            />
            <div
              style={{
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--text-subtle)",
              }}
            >
              {content.headerWithout}
            </div>
            <div
              style={{
                padding: "14px 24px",
                fontSize: 13,
                fontWeight: 700,
                color: "var(--brand)",
                background: "var(--brand-subtle)",
              }}
            >
              {content.headerWith}
            </div>
          </div>
          {content.rows.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: i % 2 === 0 ? "var(--surface-raised)" : "var(--surface-subtle)",
                borderBottom:
                  i < content.rows.length - 1
                    ? "1px solid var(--surface-muted)"
                    : "none",
              }}
            >
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  color: "var(--text-subtle)",
                  fontWeight: 500,
                }}
              >
                {row.feature}
              </div>
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    color: "var(--danger)",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  ✗
                </span>{" "}
                {row.without}
              </div>
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  color: "var(--text-heading)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--brand-subtle)",
                }}
              >
                <span
                  style={{
                    color: "var(--success)",
                    fontWeight: 700,
                    fontSize: 15,
                  }}
                >
                  ✓
                </span>{" "}
                {row.with}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              background: "var(--brand-subtle)",
              border: "1px solid var(--brand-muted)",
              color: "var(--brand-dark)",
              padding: "10px 24px",
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            {content.examplePill.prefix}{" "}
            <strong>{content.examplePill.highlight}</strong>{" "}
            {content.examplePill.suffix}
          </span>
        </div>
      </div>
    </section>
  );
}
