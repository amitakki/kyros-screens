import { Check } from "lucide-react";

import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { subscriptionBillingContent } from "../content";

interface SubscriptionAvailablePlansCardProps {
  current: "monthly" | "quarterly" | "annual";
}

const badgeToneClassNames = {
  neutral: "bg-secondary text-text-body",
  warning: "bg-warning-subtle text-warning-foreground",
  brand: "bg-brand-subtle text-brand",
} as const;

export function SubscriptionAvailablePlansCard({
  current,
}: SubscriptionAvailablePlansCardProps) {
  const isMobile = useIsMobile();
  const { currentPlanLabel, description, plans, title } =
    subscriptionBillingContent.availablePlans;

  const displayPlans = isMobile ? [plans[2], plans[0], plans[1]] : plans;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-5 shadow-sm md:p-7">
      <p className="mb-1 text-base font-bold text-foreground">{title}</p>
      <p className="mb-6 text-sm text-muted-foreground">{description}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {displayPlans.map((plan) => {
          const isCurrent = plan.id === current;

          return (
            <div
              key={plan.id}
              className={`flex flex-col rounded-xl border p-5 shadow-card transition-shadow ${
                isCurrent
                  ? "border-brand-muted bg-brand-subtle/40 shadow-soft"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                {isCurrent ? (
                  <span className="text-xs font-medium text-brand">
                    {currentPlanLabel}
                  </span>
                ) : (
                  <span />
                )}
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    badgeToneClassNames[plan.badgeTone]
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              <div className="mb-1">
                <span className="text-[28px] font-bold text-foreground">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              {plan.meta ? (
                <p className="mb-3 text-sm text-muted-foreground">
                  {plan.meta}
                </p>
              ) : null}
              {plan.savings ? (
                <p className="mb-3 text-sm font-medium text-success">
                  {plan.savings}
                </p>
              ) : null}
              {!plan.meta && !plan.savings ? (
                <div className="mb-3" />
              ) : null}

              <div className="mb-4 flex-1">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="mb-1.5 flex items-center gap-1.5"
                  >
                    <Check className="shrink-0 text-brand" size={12} />
                    <span className="text-sm text-text-body">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className={`mb-2 h-11 rounded-lg border text-sm font-semibold ${
                  isCurrent
                    ? "border-brand-muted bg-brand-subtle text-brand"
                    : "border-brand bg-card text-brand"
                }`}
                type="button"
              >
                {plan.cta}
              </button>
              <p className="text-xs text-muted-foreground">{plan.helper}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
