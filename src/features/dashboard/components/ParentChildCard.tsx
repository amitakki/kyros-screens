import { Link } from "react-router";
import { Download, Minus, RotateCcw, TrendingDown, TrendingUp } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { StatusBadge } from "../../../shared/components/feedback/StatusBadge";
import { ROUTES } from "../../../shared/constants/routes";
import { parentDashboardContent } from "../content";
import type { DashboardChild } from "../types";

interface ParentChildCardProps {
  child: DashboardChild;
  onResetDiagnostic: (childId: string) => void;
  onToggleAutoSkip: (childId: string) => void;
}

export function ParentChildCard({
  child,
  onResetDiagnostic,
  onToggleAutoSkip,
}: ParentChildCardProps) {
  const needsAttention = !child.diagnosticComplete;
  const progressWidth = `${((child.topicsCompleted || 0) / (child.totalTopics || 1)) * 100}%`;

  return (
    <div
      className={`flex flex-col gap-5 rounded-xl border bg-card p-6 shadow-sm ${
        needsAttention ? "border-warning/40 border-l-4" : "border-border border-l-4 border-l-brand"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex size-20 shrink-0 items-center justify-center rounded-full text-3xl font-bold text-white"
          style={
            child.avatar
              ? { backgroundImage: `url(${child.avatar})`, backgroundSize: "cover" }
              : { background: 'linear-gradient(135deg, var(--brand), var(--brand-light))' }
          }
        >
          {!child.avatar ? child.firstName[0] : null}
        </div>
        <div className="flex-1">
          <h3 className="mb-1 text-base font-bold text-foreground">{child.name}</h3>
          <p className="text-sm text-muted-foreground">
            {child.year} &middot; {child.region}
          </p>
        </div>
        {needsAttention ? (
          <StatusBadge tone="warning">
            {parentDashboardContent.needsAttention}
          </StatusBadge>
        ) : child.streak ? (
          <StatusBadge tone="warning">{child.streak} days</StatusBadge>
        ) : null}
      </div>

      {needsAttention ? (
        <div className="rounded-lg border-l-4 border-warning bg-warning-subtle p-4">
          <p className="text-sm text-warning-foreground">
            {child.firstName} {parentDashboardContent.diagnosticPending}
          </p>
        </div>
      ) : !child.hasActivity ? (
        <>
          <div>
            <p className="mb-1.5 text-xs font-medium text-brand">
              {child.currentSubject}
            </p>
            <div>
              <div className="h-2 overflow-hidden rounded bg-border-subtle">
                <div className="h-full w-0 rounded bg-brand" />
              </div>
              <p className="mt-1.5 text-right text-sm text-muted-foreground">
                0 / {child.totalTopics} {parentDashboardContent.topicsSuffix}
              </p>
            </div>
            <p className="mt-2 text-sm text-brand">
              {parentDashboardContent.nextTopicPrefix} {child.nextTopic} -&gt;
            </p>
          </div>
          <div className="rounded-lg border-l-4 border-brand bg-brand-subtle p-3">
            <p className="text-xs text-brand">
              {parentDashboardContent.noActivityYet}
            </p>
          </div>
        </>
      ) : (
        <div>
          <p className="mb-1.5 text-xs font-medium text-brand">
            {child.currentSubject}
          </p>
          <div>
            <div className="h-2 overflow-hidden rounded bg-border-subtle">
              <div
                className="h-full rounded bg-brand transition-[width]"
                style={{ width: progressWidth }}
              />
            </div>
            <p className="mt-1.5 text-right text-sm text-muted-foreground">
              {child.topicsCompleted} / {child.totalTopics}{" "}
              {parentDashboardContent.topicsSuffix}
            </p>
          </div>
          <p className="mt-2 text-sm text-brand">
            {parentDashboardContent.nextTopicPrefix} {child.nextTopic} -&gt;
          </p>
        </div>
      )}

      {!needsAttention && child.hasActivity ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>📊</span>
            <span className="font-semibold text-foreground">{child.avgScore}%</span>
            {child.scoreChange === "up" ? <TrendingUp className="size-3.5 text-success" /> : null}
            {child.scoreChange === "down" ? <TrendingDown className="size-3.5 text-danger" /> : null}
            {child.scoreChange === "flat" ? <Minus className="size-3.5 text-muted-foreground" /> : null}
          </div>
          <span>✅ {child.totalTests} {parentDashboardContent.testsLabel}</span>
          <span>🕒 {child.lastActivity}</span>
        </div>
      ) : needsAttention ? (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
          <span>📊 —</span>
          <span>✅ 0 {parentDashboardContent.testsLabel}</span>
          <span>🕒 {parentDashboardContent.neverActivity}</span>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        {needsAttention ? (
          <Button className="h-12 w-full bg-brand text-white hover:bg-brand-hover text-sm font-semibold" size="lg">
            {parentDashboardContent.startDiagnostic}
          </Button>
        ) : (
          <>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 w-full bg-brand text-sm font-semibold text-white hover:bg-brand-hover sm:flex-[2]" size="lg">
                {child.hasActivity
                  ? parentDashboardContent.continuePractice
                  : parentDashboardContent.startPractice}
              </Button>
              <div className="flex gap-3 sm:contents">
                <Link className="flex-1" to={ROUTES.childDetail(child.id)}>
                  <Button
                    className="h-12 w-full text-sm font-semibold"
                    size="lg"
                    variant="outline"
                  >
                    {parentDashboardContent.viewDetails}
                  </Button>
                </Link>
                <Button className="h-12 px-4 shrink-0" size="lg" variant="ghost">
                  <Download size={18} />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-text-body">
                <input
                  checked={child.autoSkip || false}
                  className="cursor-pointer"
                  type="checkbox"
                  onChange={() => onToggleAutoSkip(child.id)}
                />
                {parentDashboardContent.autoSkipLabel}
              </label>
              <button
                className="flex items-center gap-1 bg-transparent text-sm font-medium text-danger"
                onClick={() => onResetDiagnostic(child.id)}
              >
                <RotateCcw size={14} /> {parentDashboardContent.resetDiagnostic}
              </button>
            </div>
          </>
        )}
        {needsAttention ? (
          <div className="flex items-center justify-between">
            <label
              className="flex cursor-not-allowed items-center gap-2 text-sm text-muted-foreground opacity-50"
              title={parentDashboardContent.autoSkipDisabledTitle}
            >
              <input disabled className="cursor-not-allowed" type="checkbox" />
              {parentDashboardContent.autoSkipLabel}
            </label>
          </div>
        ) : null}
      </div>
    </div>
  );
}
