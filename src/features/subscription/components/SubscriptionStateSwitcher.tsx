import type { PlanState } from "../types";

interface SubscriptionStateSwitcherProps {
  state: PlanState;
  onChange: (state: PlanState) => void;
}

const options: { value: PlanState; label: string }[] = [
  { value: "active", label: "✓ Active" },
  { value: "trial", label: "⏳ Trial" },
  { value: "cancelled", label: "✗ Cancelled" },
  { value: "pastdue", label: "⚠ Past Due" },
];

export function SubscriptionStateSwitcher({
  state,
  onChange,
}: SubscriptionStateSwitcherProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-lg border border-brand-muted bg-brand-subtle px-4 py-3">
      <span className="mr-1 text-xs font-semibold text-brand">
        Preview state:
      </span>
      {options.map((option) => {
        const isActive = option.value === state;

        return (
          <button
            key={option.value}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              isActive
                ? "border-brand bg-brand text-primary-foreground"
                : "border-brand-muted bg-card text-brand hover:bg-brand-subtle/70"
            }`}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
