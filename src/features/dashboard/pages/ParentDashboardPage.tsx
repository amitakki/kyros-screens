import { useState } from "react";

import { AppHeader } from "../../../shared/components/app-shell/AppHeader";
import { PageContainer } from "../../../shared/components/layout/PageContainer";
import { SectionHeader } from "../../../shared/components/layout/SectionHeader";
import { CHILD_PROFILE_LIMIT } from "../../../shared/constants/limits";
import { ROUTES } from "../../../shared/constants/routes";
import { AddChildCard } from "../components/AddChildCard";
import { ParentChildCard } from "../components/ParentChildCard";
import { RecentActivitySection } from "../components/RecentActivitySection";
import { ResetDiagnosticModal } from "../components/ResetDiagnosticModal";
import { TrialBanner } from "../components/TrialBanner";
import { parentDashboardContent } from "../content";
import { parentDashboardMock } from "../mocks";
import type { DashboardChild } from "../types";

export function ParentDashboardPage() {
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [resetModalChild, setResetModalChild] = useState<string | null>(null);
  const [children, setChildren] = useState<DashboardChild[]>(
    parentDashboardMock.children,
  );

  const { activityGroups, daysRemaining, parentName } = parentDashboardMock;

  const childToReset = children.find((child) => child.id === resetModalChild);

  const handleToggleAutoSkip = (childId: string) => {
    setChildren((current) =>
      current.map((child) =>
        child.id === childId ? { ...child, autoSkip: !child.autoSkip } : child,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-surface-subtle">
      <AppHeader activePath={ROUTES.parentDashboard} userName={parentName} />

      {showTrialBanner && daysRemaining > 0 ? (
        <TrialBanner
          daysRemaining={daysRemaining}
          onDismiss={
            daysRemaining <= 4 ? () => setShowTrialBanner(false) : undefined
          }
        />
      ) : null}

      <PageContainer className="py-6 md:py-12">
        <div className="mb-6 md:mb-10">
          <SectionHeader
            description={parentDashboardContent.greetingSuffix}
            title={`${parentDashboardContent.greetingPrefix}, ${parentName}! 👋`}
          />
        </div>

        <section className="mb-8 md:mb-12">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {parentDashboardContent.childrenTitle}
          </p>

          <div className="grid gap-6 xl:grid-cols-2">
            {children.map((child) => (
              <ParentChildCard
                key={child.id}
                child={child}
                onResetDiagnostic={setResetModalChild}
                onToggleAutoSkip={handleToggleAutoSkip}
              />
            ))}

            {children.length < CHILD_PROFILE_LIMIT ? (
              <AddChildCard childNumber={children.length + 1} />
            ) : null}
          </div>
        </section>

        <RecentActivitySection activityGroups={activityGroups} />
      </PageContainer>

      {resetModalChild && childToReset ? (
        <ResetDiagnosticModal
          childName={childToReset.firstName}
          onClose={() => setResetModalChild(null)}
          onConfirm={() => setResetModalChild(null)}
        />
      ) : null}
    </div>
  );
}
