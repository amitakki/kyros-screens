import { ArrowRight } from "lucide-react";

import { SectionHeader } from "../../../shared/components/layout/SectionHeader";
import { parentDashboardContent } from "../content";
import type { DashboardActivityGroup } from "../types";

interface RecentActivitySectionProps {
  activityGroups: DashboardActivityGroup[];
}

export function RecentActivitySection({
  activityGroups,
}: RecentActivitySectionProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-8">
      <SectionHeader
        actions={
          <a
            className="inline-flex items-center gap-1 text-sm font-medium text-brand transition-colors hover:text-brand/80"
            href="#"
          >
            {parentDashboardContent.viewActivity} <ArrowRight size={14} />
          </a>
        }
        className="mb-6"
        title={parentDashboardContent.recentActivityTitle}
      />

      <div className="flex flex-col gap-6">
        {activityGroups.map((group, index) => (
          <div key={index}>
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className="flex size-6 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: 'linear-gradient(135deg, var(--brand), var(--brand-light))' }}
              >
                {group.childName[0]}
              </div>
              <span className="text-sm font-bold text-foreground">
                {group.childName}
              </span>
              <span className="text-sm text-muted-foreground">
                &middot; {group.timestamp}
              </span>
              <div
                className={
                  group.childId === "1"
                    ? "size-2 rounded-full bg-success"
                    : "size-2 rounded-full bg-warning"
                }
              />
            </div>
            <ul className="ml-8 list-disc text-text-body">
              {group.items.map((item, itemIndex) => (
                <li key={itemIndex} className="mb-1 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
