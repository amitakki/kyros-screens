import { useState } from "react";
import { AlertCircle } from "lucide-react";

import { subscriptionBillingContent } from "../content";

interface SubscriptionCancelModalProps {
  onClose: () => void;
}

export function SubscriptionCancelModal({
  onClose,
}: SubscriptionCancelModalProps) {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const { cancelModal } = subscriptionBillingContent;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--overlay)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 60,
        animation: "fadeIn 200ms ease-out",
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[90%] max-w-[520px] rounded-2xl bg-card p-8 shadow-popover"
        style={{ animation: "scaleIn 200ms ease-out" }}
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-warning-subtle">
            <AlertCircle className="text-warning" size={24} />
          </div>
          <h3 className="mb-3 text-xl font-bold text-foreground">
            {cancelModal.title}
          </h3>
          <p className="text-sm leading-6 text-text-muted">
            {cancelModal.intro}
            <br />
            {cancelModal.introDetail}
          </p>
        </div>

        <div className="mb-3 rounded-lg border-l-4 border-warning bg-warning-subtle px-4 py-3">
          <p className="mb-1.5 text-sm font-semibold text-warning-foreground">
            {cancelModal.downgradeTitle}
          </p>
          {cancelModal.downgradeItems.map((item) => (
            <p
              key={item}
              className="mb-1 text-sm text-warning-foreground last:mb-0"
            >
              • {item}
            </p>
          ))}
        </div>

        <button
          className="mb-5 bg-transparent text-sm text-brand underline"
          type="button"
        >
          {cancelModal.pauseCta}
        </button>

        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-muted-foreground">
            {cancelModal.feedbackLabel}
          </p>
          <select
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            className="mb-2.5 h-12 w-full rounded-lg border border-border bg-card px-4 text-[15px] text-foreground"
          >
            <option value="">{cancelModal.reasonPlaceholder} ▼</option>
            {cancelModal.reasons.map((reasonOption) => (
              <option key={reasonOption} value={reasonOption}>
                {reasonOption}
              </option>
            ))}
          </select>

          <div className="relative">
            <textarea
              value={feedback}
              onChange={(event) =>
                setFeedback(event.target.value.slice(0, 500))
              }
              placeholder={cancelModal.feedbackPlaceholder}
              className="h-[88px] w-full resize-none rounded-lg border border-border px-4 py-3 text-sm"
            />
            <span className="absolute bottom-2 right-3 text-[11px] text-muted-foreground">
              {feedback.length}/500
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={onClose}
            className="h-12 rounded-lg bg-brand text-sm font-semibold text-brand-foreground"
            type="button"
          >
            {cancelModal.keepCta}
          </button>
          <button
            disabled={!reason}
            className="h-11 rounded-lg border border-danger bg-transparent text-sm font-semibold text-danger disabled:cursor-not-allowed disabled:opacity-40"
            type="button"
          >
            {cancelModal.cancelCta}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
