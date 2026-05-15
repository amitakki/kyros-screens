import { ArrowRight, Check } from "lucide-react";
import { ParentDashboardPanel } from "./ParentDashboardPanel";
import { TopicGridMockup } from "./TopicGridMockup";

type TopicGridContent = {
  subjects: readonly string[];
  topics: readonly {
    label: string;
    score: string;
    state: "done" | "active" | "locked";
  }[];
  inProgressLabel: string;
  adaptationHighlight: string;
  adaptationBody: string;
};

type ParentDashboardContent = {
  studentName: string;
  lastActive: string;
  liveLabel: string;
  subjects: readonly { name: string; pct: number; color: string }[];
  tagline: string;
};

type FeatureSpotlightContent = {
  eyebrow: string;
  titleLines: readonly string[];
  descriptionDesktop: string;
  descriptionMobile: string;
  bullets: readonly string[];
  ctaLabel: string;
  mockup: {
    topicGrid: TopicGridContent;
    parentDashboard: ParentDashboardContent;
  };
};

type Props = {
  isMobile: boolean;
  content: FeatureSpotlightContent;
};

export function FeatureSpotlightSection({ isMobile, content }: Props) {
  return (
    <section
      style={{
        background: "var(--surface-subtle)",
        paddingTop: isMobile ? 40 : 64,
        paddingBottom: isMobile ? 40 : 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? 32 : 64,
            alignItems: "start",
          }}
        >
          {isMobile && (
            <div style={{ maxWidth: 440 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--brand)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {content.eyebrow}
              </p>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  lineHeight: 1.25,
                  marginBottom: 16,
                }}
              >
                {content.titleLines.join(" ")}
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-body)",
                  lineHeight: 1.75,
                  marginBottom: 0,
                }}
              >
                {content.descriptionMobile}
              </p>
            </div>
          )}

          <div style={{ minWidth: 0 }}>
            <TopicGridMockup isMobile={isMobile} content={content.mockup.topicGrid} />
            <ParentDashboardPanel content={content.mockup.parentDashboard} />
          </div>

          {!isMobile && (
            <div style={{ maxWidth: 440, paddingTop: 16 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "var(--brand)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                {content.eyebrow}
              </p>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  lineHeight: 1.25,
                  marginBottom: 20,
                }}
              >
                {content.titleLines.map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-body)",
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                {content.descriptionDesktop}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                }}
              >
                {content.bullets.map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <Check
                      size={16}
                      style={{
                        color: "var(--brand)",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        color: "var(--text-body)",
                        lineHeight: 1.55,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                style={{
                  fontSize: 14,
                  color: "var(--brand)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {content.ctaLabel} <ArrowRight size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
