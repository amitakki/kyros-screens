import { Check, Lock, Shield } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";
import { ROUTES } from "../../../shared/constants/routes";

type HeroContent = {
  eyebrow: string;
  titleLines: readonly string[];
  description: string;
  proofItems: readonly { icon: string; label: string }[];
  primaryCtaLabel: string;
  microcopy: string;
  trustItems: readonly { icon: string; label: string }[];
};

type HeroSectionProps = {
  isMobile: boolean;
  content: HeroContent;
  visual?: ReactNode;
};

function renderTrustIcon(icon: string) {
  const iconProps = {
    size: 12,
    style: { color: "var(--text-subtle)" },
  };

  switch (icon) {
    case "lock":
      return <Lock {...iconProps} />;
    case "check":
      return <Check {...iconProps} />;
    case "shield":
      return <Shield {...iconProps} />;
    default:
      return null;
  }
}

export function HeroSection({
  isMobile,
  content,
  visual,
}: HeroSectionProps) {
  return (
    <section
      className="bg-surface-subtle"
      style={{
        minHeight: isMobile ? "auto" : "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-6 py-12 w-full"
        style={{
          paddingTop: isMobile ? 28 : 80,
          paddingBottom: isMobile ? 28 : 80,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "55fr 45fr",
            gap: isMobile ? 32 : 64,
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "var(--brand-light)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              {content.eyebrow}
            </p>
            <h1
              style={{
                fontSize: isMobile ? 32 : 52,
                fontWeight: 700,
                color: "var(--text-heading)",
                lineHeight: isMobile ? 1.2 : 1.15,
                marginBottom: 24,
              }}
            >
              {content.titleLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h1>
            <p
              style={{
                fontSize: isMobile ? 16 : 18,
                color: "var(--text-body)",
                lineHeight: 1.65,
                marginBottom: 24,
                maxWidth: 480,
              }}
            >
              {content.description}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 20,
                marginBottom: 28,
                fontSize: 14,
                color: "var(--text-heading)",
              }}
            >
              {content.proofItems.map((item) => (
                <span
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 500,
                  }}
                >
                  <span>{item.icon}</span> {item.label}
                </span>
              ))}
            </div>

            <Link
              to={ROUTES.register}
              style={{ display: "block", marginBottom: 10 }}
            >
              <Button
                style={{
                  width: "100%",
                  height: 56,
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  fontSize: 17,
                  fontWeight: 700,
                  borderRadius: 8,
                }}
                className="hover:bg-brand-hover"
              >
                {content.primaryCtaLabel}
              </Button>
            </Link>

            <p
              style={{
                textAlign: "center",
                fontSize: 13,
                color: "var(--text-subtle)",
                marginBottom: 24,
              }}
            >
              {content.microcopy}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                fontSize: 12,
                color: "var(--text-subtle)",
              }}
            >
              {content.trustItems.map((item) => (
                <span
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  {renderTrustIcon(item.icon)} {item.label}
                </span>
              ))}
            </div>
          </div>

          {!isMobile && visual}
        </div>
      </div>
    </section>
  );
}
