import type { ComponentPropsWithoutRef } from "react";

import { cn } from "../../lib/cn";

export type StatusBadgeTone =
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

const toneClassNames: Record<StatusBadgeTone, string> = {
  brand: "border border-brand-muted bg-brand-subtle text-brand",
  success: "border border-success/15 bg-success-subtle text-success",
  warning: "border border-warning/20 bg-warning-subtle text-warning-foreground",
  danger: "border border-danger/15 bg-danger-subtle text-danger-foreground",
  info: "border border-info/15 bg-info-subtle text-info",
  neutral: "border border-border bg-secondary text-secondary-foreground",
};

export interface StatusBadgeProps
  extends ComponentPropsWithoutRef<"span"> {
  tone?: StatusBadgeTone;
}

export function StatusBadge({
  className,
  tone = "neutral",
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em]",
        toneClassNames[tone],
        className,
      )}
      {...props}
    />
  );
}
