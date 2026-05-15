import { Link } from "react-router";
import { Plus } from "lucide-react";

import { ROUTES } from "../../../shared/constants/routes";
import { parentDashboardContent } from "../content";

interface AddChildCardProps {
  childNumber: number;
}

export function AddChildCard({ childNumber }: AddChildCardProps) {
  return (
    <Link
      className="group flex min-h-80 flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-muted bg-brand-subtle px-8 py-12 text-center transition-colors hover:border-brand hover:bg-brand-subtle/70"
      to={`${ROUTES.onboardingCreateChild}?childNumber=${childNumber}`}
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Plus className="size-6" />
      </div>
      <h3 className="mb-2 text-base font-bold text-brand">
        {parentDashboardContent.addChildTitle}
      </h3>
      <p className="mb-4 text-sm text-muted-foreground">
        {parentDashboardContent.addChildHelper}
      </p>
      <span className="text-sm font-semibold text-brand">
        {parentDashboardContent.addChildCta}
      </span>
    </Link>
  );
}
