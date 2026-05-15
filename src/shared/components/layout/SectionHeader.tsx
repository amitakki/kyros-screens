import type { ReactNode } from "react";

import { cn } from "../../lib/cn";

interface SectionHeaderProps {
  actions?: ReactNode;
  className?: string;
  description?: string;
  title: string;
}

export function SectionHeader({
  actions,
  className,
  description,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div>{actions}</div> : null}
    </div>
  );
}
