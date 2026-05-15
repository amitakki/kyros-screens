import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";

type FooterSection = {
  title: string;
  links: readonly string[];
};

type FooterContent = {
  logoLabel: string;
  brandName: string;
  brandTagline: string;
  sections: readonly FooterSection[];
  ctaTitle: string;
  ctaSubtext: string;
  ctaLabel: string;
  copyright: string;
  legalNote: string;
};

type Props = {
  isMobile: boolean;
  content: FooterContent;
};

export function LandingFooter({ isMobile, content }: Props) {
  return (
    <footer
      style={{
        background: "var(--surface-ink)",
        paddingTop: 64,
        paddingBottom: 40,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr 1fr"
              : "2fr 1fr 1fr 1fr 1.5fr",
            gap: isMobile ? 32 : 48,
            marginBottom: 48,
            paddingBottom: 48,
            borderBottom: "1px solid var(--auth-panel-surface)",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  border: "2px dashed var(--brand)",
                  background: "var(--surface-inverse)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    color: "var(--text-subtle)",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                  }}
                >
                  {content.logoLabel}
                </span>
              </div>
              <span
                style={{
                  color: "var(--surface-raised)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {content.brandName}
              </span>
            </div>
            <p
              style={{
                color: "var(--auth-panel-text)",
                fontSize: 14,
                lineHeight: 1.6,
              }}
            >
              {content.brandTagline}
            </p>
          </div>

          {content.sections.map((section) => (
            <div key={section.title}>
              <h4
                style={{
                  color: "var(--surface-raised)",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                {section.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((item) => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        color: "var(--auth-panel-text)",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--surface-raised)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--auth-panel-text)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div
            style={{
              background: "var(--brand-dark)",
              border: "1px solid var(--auth-panel-border)",
              borderRadius: 12,
              padding: 24,
            }}
          >
            <p
              style={{
                color: "var(--surface-raised)",
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 6,
              }}
            >
              {content.ctaTitle}
            </p>
            <p
              style={{
                color: "var(--auth-panel-text-strong)",
                fontSize: 13,
                marginBottom: 20,
              }}
            >
              {content.ctaSubtext}
            </p>
            <Link to="/register">
              <Button
                style={{
                  width: "100%",
                  height: 44,
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
                className="hover:bg-brand-hover"
              >
                {content.ctaLabel}
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? 8 : 0,
          }}
        >
          <p style={{ color: "var(--auth-panel-text-ghost)", fontSize: 12 }}>
            {content.copyright}
          </p>
          <p style={{ color: "var(--auth-panel-text-ghost)", fontSize: 12 }}>
            {content.legalNote}
          </p>
        </div>
      </div>
    </footer>
  );
}
