import { CheckCircle, CreditCard, Shield } from "lucide-react";

import { subscriptionBillingContent } from "../content";

interface SubscriptionPaymentMethodCardProps {
  noCard?: boolean;
}

export function SubscriptionPaymentMethodCard({
  noCard,
}: SubscriptionPaymentMethodCardProps) {
  const content = subscriptionBillingContent.paymentMethod;

  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-7 shadow-sm">
      <p className="mb-5 text-base font-bold text-foreground">
        {content.title}
      </p>

      {noCard ? (
        <div className="mb-5 rounded-lg border-2 border-dashed border-border px-4 py-6 text-center">
          <CreditCard className="mx-auto mb-2 text-muted-foreground" size={24} />
          <p className="text-sm text-muted-foreground">{content.emptyState}</p>
        </div>
      ) : (
        <>
          <div className="mb-2.5 flex items-center justify-between rounded-lg border border-border bg-surface-subtle px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-[30px] w-11 items-center justify-center rounded bg-brand-dark">
                <span className="text-[9px] font-bold tracking-[0.5px] text-white">
                  {content.brand}
                </span>
              </div>
              <div>
                <p className="mb-0.5 text-sm font-medium text-foreground">
                  {content.cardNumber}
                </p>
                <p className="text-xs text-muted-foreground">{content.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="text-success" size={14} />
              <span className="text-sm font-medium text-success">
                {content.status}
              </span>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-1.5">
            <Shield className="text-muted-foreground" size={12} />
            <span className="text-xs text-muted-foreground">
              {content.securityLabel}
            </span>
          </div>
        </>
      )}

      <button
        className="h-12 rounded-lg border border-brand bg-card px-6 text-[15px] font-semibold text-brand"
        type="button"
      >
        {noCard ? content.addCta : content.updateCta}
      </button>
    </div>
  );
}
