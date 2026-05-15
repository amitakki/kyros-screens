import { FileText } from "lucide-react";

import { subscriptionBillingContent } from "../content";

export function SubscriptionSupportFooter() {
  return (
    <div className="mb-6 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <FileText className="mx-auto mb-2 size-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {subscriptionBillingContent.supportPrompt}{" "}
        <a className="font-medium text-brand no-underline" href="#">
          {subscriptionBillingContent.supportCta}
        </a>
      </p>
    </div>
  );
}
