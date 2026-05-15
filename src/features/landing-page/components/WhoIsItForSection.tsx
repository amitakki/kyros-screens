import { Check } from "lucide-react";

type Subject = { abbr: string; name: string; desc: string; color: string };

type WhoIsItForContent = {
  title: string;
  worksForTitle: string;
  worksForItems: readonly string[];
  subjectsTitle: string;
  subjects: readonly Subject[];
  footerNote: string;
};

type Props = {
  isMobile: boolean;
  content: WhoIsItForContent;
};

export function WhoIsItForSection({ isMobile, content }: Props) {
  return (
    <section
      style={{
        background: "var(--surface-subtle)",
        paddingTop: isMobile ? 40 : 64,
        paddingBottom: isMobile ? 40 : 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <h2
          style={{
            fontSize: isMobile ? 24 : 32,
            fontWeight: 700,
            color: "var(--text-heading)",
            textAlign: "center",
            marginBottom: isMobile ? 32 : 56,
          }}
        >
          {content.title}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 24 : 48,
          }}
        >
          <div
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 12,
              padding: isMobile ? 24 : 40,
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text-heading)",
                marginBottom: 24,
              }}
            >
              {content.worksForTitle}
            </h3>
            {content.worksForItems.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <Check
                  size={18}
                  style={{ color: "var(--brand)", flexShrink: 0 }}
                />
                <span style={{ fontSize: 16, color: "var(--text-heading)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 12,
              padding: isMobile ? 24 : 40,
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "var(--text-heading)",
                marginBottom: 24,
              }}
            >
              {content.subjectsTitle}
            </h3>
            {content.subjects.map((s) => (
              <div
                key={s.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    background: s.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "white",
                    flexShrink: 0,
                  }}
                >
                  {s.abbr}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: "var(--text-heading)",
                      marginBottom: 2,
                    }}
                  >
                    {s.name}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "var(--brand)",
            marginTop: 32,
            fontWeight: 500,
          }}
        >
          {content.footerNote}
        </p>
      </div>
    </section>
  );
}
