import { Check, X } from "lucide-react";
import { Link } from "react-router";

import { cn } from "../../../app/components/ui/utils";
import { COMMON_STRINGS } from "../../../shared/constants/common-strings";
import { ROUTES } from "../../../shared/constants/routes";

interface OnboardingHeaderProps {
  currentStep: number;
  closeLabel: string;
  steps: [string, string];
}

function StepMarker({
  active,
  complete,
  label,
  stepNumber,
}: {
  active?: boolean;
  complete?: boolean;
  label: string;
  stepNumber: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full text-xs font-bold",
          complete && "bg-success text-success-foreground",
          active && "bg-brand text-brand-foreground",
          !active && !complete && "bg-secondary text-secondary-foreground",
        )}
      >
        {complete ? <Check className="size-3.5" strokeWidth={3} /> : stepNumber}
      </div>
      <span
        className={cn(
          "text-sm font-medium",
          complete && "text-success",
          active && "text-foreground",
          !active && !complete && "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function OnboardingHeader({
  currentStep,
  closeLabel,
  steps,
}: OnboardingHeaderProps) {
  return (
    <header className="border-b border-border bg-card py-5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link className="flex items-center gap-2" to={ROUTES.home}>
          <div className="flex size-8 items-center justify-center rounded-md border-2 border-dashed border-brand-muted bg-brand-subtle text-[8px] font-semibold tracking-[0.08em] text-muted-foreground">
            {COMMON_STRINGS.logoPlaceholder}
          </div>
          <span className="text-base font-semibold text-foreground">
            {COMMON_STRINGS.appName}
          </span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <StepMarker complete label={steps[0]} stepNumber={1} />
          <div className="h-0.5 w-8 rounded-full bg-success" />
          <StepMarker active={currentStep === 2} label={steps[1]} stepNumber={2} />
        </div>

        <Link
          aria-label={closeLabel}
          className="text-muted-foreground transition-colors hover:text-foreground"
          to={ROUTES.parentDashboard}
        >
          <X className="size-5" />
        </Link>
      </div>
    </header>
  );
}
