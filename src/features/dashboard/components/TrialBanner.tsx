import { AlertCircle, X } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";

interface TrialBannerProps {
  daysRemaining: number;
  onDismiss?: () => void;
}

export function TrialBanner({ daysRemaining, onDismiss }: TrialBannerProps) {
  if (daysRemaining <= 0) {
    return null;
  }

  const isDays1to4 = daysRemaining >= 1 && daysRemaining <= 4;
  const isDays5to6 = daysRemaining >= 5 && daysRemaining <= 6;
  const isDay7 = daysRemaining === 7;
  const toneClasses = isDay7
    ? {
        container: "border-b border-danger/30 bg-danger-subtle",
        text: "text-danger-foreground",
        track: "bg-danger/15",
        progress: "bg-danger",
        button: "bg-danger text-white hover:bg-danger/90",
      }
    : {
        container: "border-b border-warning/30 bg-warning-subtle",
        text: "text-warning-foreground",
        track: "bg-warning/20",
        progress: "bg-warning",
        button: "bg-warning text-warning-foreground hover:bg-warning/90",
      };

  const message = isDays1to4
    ? `Your free trial expires in ${daysRemaining} day${daysRemaining > 1 ? "s" : ""}`
    : isDays5to6
      ? "Your trial ends soon - upgrade to keep Emma's progress"
      : "Your free trial expires today";

  const canDismiss = isDays1to4 && onDismiss;

  return (
    <div className={`${toneClasses.container} py-3 md:py-4`}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
        <div className="flex items-center gap-2.5">
          <AlertCircle className={`size-[18px] shrink-0 ${toneClasses.text}`} />
          <span className={`text-sm font-bold ${toneClasses.text}`}>
            {message}
          </span>
        </div>

        <div className="hidden max-w-60 flex-1 md:block">
          <div className={`h-2 overflow-hidden rounded ${toneClasses.track}`}>
            <div
              className={`h-full rounded transition-[width] ${toneClasses.progress}`}
              style={{ width: `${(daysRemaining / 7) * 100}%` }}
            />
          </div>
          <p className={`mt-1 text-center text-xs ${toneClasses.text}`}>
            Day {daysRemaining} of 7
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            className={`h-9 px-4 text-sm font-semibold md:h-10 md:px-5 ${toneClasses.button}`}
          >
            {parentDashboardContent.upgradeNow}
          </Button>
          {canDismiss ? (
            <button
              className={`cursor-pointer bg-transparent p-1 ${toneClasses.text}`}
              onClick={onDismiss}
              type="button"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
