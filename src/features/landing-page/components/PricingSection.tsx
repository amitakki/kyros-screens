import { Check } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";
import { Card, CardContent } from "../../../app/components/ui/card";
import { PricingFeatureList } from "./PricingFeatureList";

type PricingPlan = {
  label: string;
  price: string;
  unit: string;
  savingBadge: string;
  savingBadgeBg: string;
  savingBadgeColor: string;
  highlight: boolean;
  popularLabel: string;
  priceHighlight: string;
  priceHighlightColor: string;
  perDay: string;
  ctaLabel: string;
  ctaPrimary: boolean;
};

type PricingContent = {
  title: string;
  subtitle: string;
  plans: readonly PricingPlan[];
  riskReducers: readonly string[];
  paymentFooter: string;
  featureItems: readonly string[];
};

type Props = {
  isMobile: boolean;
  content: PricingContent;
};

export function PricingSection({ isMobile, content }: Props) {
  return (
    <section
      id="pricing"
      style={{
        background: "var(--surface-subtle)",
        paddingTop: 64,
        paddingBottom: 64,
      }}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "var(--text-heading)",
              marginBottom: 14,
            }}
          >
            {content.title}
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-body)" }}>
            {content.subtitle}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: 24,
            maxWidth: 960,
            margin: "0 auto 36px",
            alignItems: "start",
          }}
        >
          {content.plans.map((plan) => {
            const card = (
              <Card
                style={{
                  background: "var(--surface-raised)",
                  border: plan.highlight
                    ? "2px solid var(--brand)"
                    : "1px solid var(--border-subtle)",
                  borderRadius: 12,
                  ...(plan.highlight
                    ? {
                        boxShadow: `0 8px 32px color-mix(in oklch, var(--brand) 18%, transparent)`,
                        transform: "scale(1.04)",
                      }
                    : {}),
                }}
              >
                <CardContent style={{ padding: 32 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--text-body)",
                      marginBottom: plan.savingBadge ? 8 : 16,
                    }}
                  >
                    {plan.label}
                  </p>
                  {plan.savingBadge && (
                    <div
                      style={{
                        display: "inline-block",
                        background: plan.savingBadgeBg,
                        color: plan.savingBadgeColor,
                        padding: "3px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        marginBottom: 10,
                      }}
                    >
                      {plan.savingBadge}
                    </div>
                  )}
                  <div style={{ marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: "var(--text-heading)",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: "var(--text-subtle)" }}>
                      {plan.unit}
                    </span>
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    {plan.priceHighlight && (
                      <p
                        style={{
                          fontSize: 13,
                          color: plan.priceHighlightColor,
                          fontWeight: 600,
                          marginBottom: 2,
                        }}
                      >
                        {plan.priceHighlight}
                      </p>
                    )}
                    <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                      {plan.perDay}
                    </p>
                  </div>
                  <PricingFeatureList items={content.featureItems} />
                  <Link to="/register">
                    <Button
                      variant={plan.ctaPrimary ? undefined : "outline"}
                      style={{
                        width: "100%",
                        height: 48,
                        ...(plan.ctaPrimary
                          ? { background: "var(--brand)", color: "var(--brand-foreground)" }
                          : { border: "1px solid var(--brand)", color: "var(--brand)" }),
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                      className={
                        plan.ctaPrimary
                          ? "hover:bg-brand-hover"
                          : "hover:bg-brand-subtle"
                      }
                    >
                      {plan.ctaLabel}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );

            if (plan.popularLabel) {
              return (
                <div key={plan.label} style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      top: -14,
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "var(--brand)",
                      color: "var(--brand-foreground)",
                      padding: "4px 16px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      zIndex: 10,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {plan.popularLabel}
                  </div>
                  {card}
                </div>
              );
            }

            return <div key={plan.label}>{card}</div>;
          })}
        </div>

        <div
          style={{
            maxWidth: 600,
            margin: "0 auto 24px",
            display: "flex",
            justifyContent: "center",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          {content.riskReducers.map((text) => (
            <div
              key={text}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "var(--success)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check
                  size={12}
                  style={{ color: "var(--success-foreground)", strokeWidth: 3 }}
                />
              </div>
              <span
                style={{ fontSize: 14, color: "var(--text-heading)", fontWeight: 500 }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "var(--text-subtle)",
          }}
        >
          {content.paymentFooter}
        </p>
      </div>
    </section>
  );
}
