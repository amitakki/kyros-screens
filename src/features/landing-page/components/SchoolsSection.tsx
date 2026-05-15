import { GraduationCap } from "lucide-react";

type SchoolsSectionContent = {
  title: string;
  subtitle: string;
  examBoardsLabel: string;
  examBoards: readonly string[];
  moreSchoolsLabel: string;
  footerNote: string;
};

type Props = {
  isMobile: boolean;
  schools: readonly string[];
  content: SchoolsSectionContent;
};

export function SchoolsSection({ isMobile, schools, content }: Props) {
  return (
    <section
      id="schools"
      style={{
        background: "var(--brand-subtle)",
        paddingTop: isMobile ? 40 : 64,
        paddingBottom: isMobile ? 40 : 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 40 }}>
          <h2
            style={{
              fontSize: isMobile ? 24 : 32,
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: 12,
            }}
          >
            {content.title}
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 16, color: "var(--text-body)", maxWidth: 560, margin: "0 auto" }}>
            {content.subtitle}
          </p>
        </div>

        {/* Exam board pills */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? 28 : 36 }}>
          <p style={{ fontSize: 12, color: "var(--text-subtle)", fontWeight: 500, marginBottom: 10 }}>
            {content.examBoardsLabel}
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
            {content.examBoards.map((board) => (
              <span
                key={board}
                style={{
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  padding: "5px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                {board}
              </span>
            ))}
          </div>
        </div>

        {/* School chips */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 10,
            maxWidth: 960,
            margin: "0 auto 20px",
          }}
        >
          {schools.map((school) => (
            <div
              key={school}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                background: "var(--surface-raised)",
                border: "1px solid var(--border-subtle)",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: isMobile ? 12 : 13,
                fontWeight: 500,
                color: "var(--text-heading)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <GraduationCap size={12} style={{ color: "var(--brand)", flexShrink: 0 }} />
              {school}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1.5px dashed var(--brand-muted)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: isMobile ? 12 : 13,
              fontWeight: 600,
              color: "var(--brand)",
            }}
          >
            {content.moreSchoolsLabel}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-subtle)" }}>
          {content.footerNote}
        </p>
      </div>
    </section>
  );
}
