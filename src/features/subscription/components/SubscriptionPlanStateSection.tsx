import { AlertTriangle, ArrowRight, Check, CreditCard } from "lucide-react";

import { subscriptionBillingContent } from "../content";
import type { PlanState } from "../types";

interface SubscriptionPlanStateSectionProps {
  onCancel: () => void;
  planState: PlanState;
}

function ActivePlanCard({ onCancel }: { onCancel: () => void }) {
  const content = subscriptionBillingContent.planStateCards.active;

  return (
    <div className="mb-6 rounded-2xl border border-border border-l-4 border-l-brand bg-card p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{content.title}</h3>
        <span className="rounded-full bg-success-subtle px-3 py-1 text-sm font-semibold text-success">
          {content.badge}
        </span>
      </div>

      <div className="mb-1">
        <span className="text-[32px] font-bold text-foreground">
          {content.price}
        </span>
        <span className="ml-1 text-base text-muted-foreground">
          {content.period}
        </span>
      </div>
      <p className="mb-5 text-sm font-medium text-success">
        {content.savings}
      </p>

      <div className="mb-5">
        <p className="mb-1 text-sm text-text-body">{content.renewsOn}</p>
        <p className="text-sm text-text-body">{content.nextPayment}</p>
      </div>

      <div className="mb-5">
        <p className="mb-2 text-sm text-muted-foreground">
          {content.profileUsage}
        </p>
        <div className="h-1.5 rounded bg-secondary">
          <div
            className="h-full rounded bg-brand"
            style={{ width: `${content.profileUsagePercent}%` }}
          />
        </div>
      </div>

      <div className="mb-6">
        {content.features.map((feature) => (
          <div key={feature} className="mb-2 flex items-center gap-2">
            <Check className="shrink-0 text-success" size={14} />
            <span className="text-sm text-text-body">{feature}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          className="h-12 rounded-lg border border-brand bg-card px-6 text-[15px] font-semibold text-brand"
          type="button"
        >
          {content.changePlanCta}
        </button>
        <button
          onClick={onCancel}
          className="bg-transparent text-sm text-danger underline"
          type="button"
        >
          {content.cancelCta}
        </button>
      </div>
      <p className="mt-2.5 text-sm text-muted-foreground">{content.helper}</p>
    </div>
  );
}

function TrialPlanCard() {
  const content = subscriptionBillingContent.planStateCards.trial;

  return (
    <div className="mb-6 rounded-2xl border border-border border-l-4 border-l-warning bg-card p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{content.title}</h3>
        <span className="rounded-full bg-warning-subtle px-3 py-1 text-sm font-semibold text-warning-foreground">
          {content.badge}
        </span>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span className="text-[56px] font-bold leading-none text-warning">
          {content.remainingDays}
        </span>
        <span className="text-lg text-muted-foreground">
          {content.remainingLabel}
        </span>
      </div>
      <div className="mb-2 h-2 rounded bg-warning-subtle">
        <div
          className="h-full rounded bg-warning"
          style={{ width: `${content.progressPercent}%` }}
        />
      </div>
      <p className="mb-5 text-sm text-muted-foreground">{content.endsOn}</p>

      <div className="mb-5">
        {content.features.map((feature) => (
          <div key={feature} className="mb-2 flex items-center gap-2">
            <Check className="shrink-0 text-brand" size={14} />
            <span className="text-sm text-text-body">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mb-5 rounded-lg border-l-4 border-warning bg-warning-subtle px-4 py-3">
        <p className="text-sm text-warning-foreground">{content.notice}</p>
      </div>

      <button
        className="mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-[15px] font-semibold text-brand-foreground"
        type="button"
      >
        {content.choosePlanCta} <ArrowRight size={16} />
      </button>
      <p className="mb-3 text-center text-xs text-muted-foreground">
        {content.helper}
      </p>
      <p className="text-sm text-muted-foreground">{content.downgradeNotice}</p>
    </div>
  );
}

function CancelledPlanCard() {
  const content = subscriptionBillingContent.planStateCards.cancelled;

  return (
    <div className="mb-6 rounded-2xl border border-border border-l-4 border-l-danger bg-card p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{content.title}</h3>
        <span className="rounded-full bg-danger-subtle px-3 py-1 text-sm font-semibold text-danger-foreground">
          {content.badge}
        </span>
      </div>

      <p className="mb-1 text-sm text-text-body">{content.accessUntilLabel}</p>
      <p className="mb-1 text-xl font-bold text-foreground">
        {content.accessUntilDate}
      </p>
      <p className="mb-5 text-sm text-muted-foreground">{content.helper}</p>

      <div className="mb-5 rounded-lg border-l-4 border-danger bg-danger-subtle px-4 py-3">
        <p className="mb-2 text-sm font-semibold text-danger-foreground">
          {content.afterTitle}
        </p>
        {content.afterItems.map((item) => (
          <p
            key={item}
            className="mb-1 text-sm text-danger-foreground last:mb-0"
          >
            • {item}
          </p>
        ))}
      </div>

      <button
        className="mb-2 h-12 w-full rounded-lg bg-brand text-[15px] font-semibold text-brand-foreground"
        type="button"
      >
        {content.reactivateCta}
      </button>
      <p className="mb-3 text-center text-xs text-muted-foreground">
        {content.reactivateHelper}
      </p>
      <button className="bg-transparent text-sm text-brand underline" type="button">
        {content.reactivateLink}
      </button>
    </div>
  );
}

function PastDuePlanCard() {
  const content = subscriptionBillingContent.planStateCards.pastdue;

  return (
    <div className="mb-6 rounded-2xl border border-border border-l-4 border-l-danger bg-card p-7 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">{content.title}</h3>
        <span className="rounded-full bg-danger-subtle px-3 py-1 text-sm font-semibold text-danger-foreground">
          {content.badge}
        </span>
      </div>

      <div className="mb-4 rounded-lg border-l-4 border-danger bg-danger-subtle px-4 py-3">
        <div className="mb-1.5 flex gap-2">
          <AlertTriangle
            className="mt-0.5 shrink-0 text-danger"
            size={16}
          />
          <p className="text-sm text-danger-foreground">
            {content.errorSummary}
          </p>
        </div>
        <p className="pl-6 text-sm text-danger-foreground">
          {content.retryNotice}
        </p>
      </div>

      <p className="mb-5 text-sm font-bold text-danger">{content.warning}</p>

      <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-surface-subtle px-4 py-3">
        <div className="flex items-center gap-2.5">
          <CreditCard className="text-muted-foreground" size={20} />
          <span className="text-sm text-text-body">{content.cardSummary}</span>
        </div>
        <span className="text-sm font-semibold text-danger">
          {content.cardStatus}
        </span>
      </div>

      <button
        className="mb-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand text-[15px] font-semibold text-brand-foreground"
        type="button"
      >
        {content.updatePaymentCta} <ArrowRight size={16} />
      </button>
      <p className="mb-3 text-center text-xs text-muted-foreground">
        {content.updateHelper}
      </p>
      <p className="text-sm text-muted-foreground">
        {content.retrySchedule}
        <br />
        {content.cancelNotice}
      </p>
    </div>
  );
}

export function SubscriptionPlanStateSection({
  onCancel,
  planState,
}: SubscriptionPlanStateSectionProps) {
  if (planState === "active") {
    return <ActivePlanCard onCancel={onCancel} />;
  }

  if (planState === "trial") {
    return <TrialPlanCard />;
  }

  if (planState === "cancelled") {
    return <CancelledPlanCard />;
  }

  return <PastDuePlanCard />;
}
