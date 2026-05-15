import type { ComponentPropsWithoutRef, ElementType } from "react";

import { cn } from "../../lib/cn";

export function PageContainer({
  as: Component = "div",
  className,
  ...props
}: ComponentPropsWithoutRef<"div"> & {
  as?: ElementType;
}) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-5xl px-6 lg:px-8", className)}
      {...props}
    />
  );
}
