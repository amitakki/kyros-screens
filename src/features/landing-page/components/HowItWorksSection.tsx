import { ArrowRight, BarChart2, Flag, Zap } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";
import { ROUTES } from "../../../shared/constants/routes";

type HowItWorksStep = {
  icon: "bar-chart" | "zap" | "flag";
  eyebrow: string;
  title: string;
  description: string;
  linkLabel?: string;
  linkHref?: string;
};

type HowItWorksContent = {
  title: string;
  description: string;
  steps: readonly HowItWorksStep[];
  ctaLabel: string;
};

type HowItWorksSectionProps = {
  isMobile: boolean;
  content: HowItWorksContent;
};

function renderStepIcon(icon: HowItWorksStep["icon"]) {
  const iconProps = { size: 28, style: { color: "var(--brand)" } };

  switch (icon) {
    case "bar-chart":
      return <BarChart2 {...iconProps} />;
    case "zap":
      return <Zap {...iconProps} />;
    case "flag":
      return <Flag {...iconProps} />;
  }
}

export function HowItWorksSection({
  isMobile,
  content,
}: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      style={{
        background: "var(--surface-subtle)",
        paddingTop: isMobile ? 40 : 64,
        paddingBottom: isMobile ? 40 : 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div
          className="text-center"
          style={{ marginBottom: isMobile ? 40 : 64 }}
        >
          <h2
            style={{
              fontSize: isMobile ? 24 : 36,
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: 16,
            }}
          >
            {content.title}
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-body)" }}>
            {content.description}
          </p>
        </div>

        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 32,
            marginBottom: 80,
          }}
        >
          {!isMobile && (
            <div
              style={{
                position: "absolute",
                top: 36,
                left: "20%",
                right: "20%",
                height: 2,
                borderTop: "2px dashed var(--brand-muted)",
                zIndex: 0,
              }}
            />
          )}

          {content.steps.map((step) => (
            <div
              key={step.title}
              style={{
                background: "var(--surface-raised)",
                borderRadius: 12,
                padding: 32,
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-soft)",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "var(--brand-subtle)",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                {renderStepIcon(step.icon)}
              </div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--brand)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                {step.eyebrow}
              </p>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "var(--text-heading)",
                  marginBottom: 12,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text-body)",
                  lineHeight: 1.65,
                  marginBottom: step.linkLabel ? 16 : 0,
                }}
              >
                {step.description}
              </p>
              {step.linkLabel && (
                <a
                  href={step.linkHref ?? "#"}
                  style={{
                    fontSize: 13,
                    color: "var(--brand)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontWeight: 500,
                  }}
                >
                  {step.linkLabel} <ArrowRight size={13} />
                </a>
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: "center",
            marginTop: 48,
          }}
        >
          <Link to={ROUTES.register}>
            <Button
              style={{
                background: "var(--brand)",
                color: "var(--brand-foreground)",
                height: 48,
                paddingLeft: 28,
                paddingRight: 28,
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
              }}
              className="hover:bg-brand-hover"
            >
              {content.ctaLabel}
              <ArrowRight
                size={15}
                style={{ marginLeft: 6 }}
              />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
