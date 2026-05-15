import { useState } from "react";
import { Link } from "react-router";

import { AppHeader } from "../../../shared/components/app-shell/AppHeader";
import { ROUTES } from "../../../shared/constants/routes";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { ChildProfileSummaryCard } from "../components/ChildProfileSummaryCard";
import { LearningPathSection } from "../components/LearningPathSection";
import { NextRecommendedStepCard } from "../components/NextRecommendedStepCard";
import { PerformanceOverviewCard } from "../components/PerformanceOverviewCard";
import { TestHistorySection } from "../components/TestHistorySection";
import { childDetailContent } from "../content";
import { childDetailMock } from "../mocks";

export function ChildDetailPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filterSubject, setFilterSubject] = useState("all");
  const isMobile = useIsMobile();

  const {
    childName,
    currentTopic,
    firstName,
    region,
    schools,
    streak,
    subjects,
    testHistory,
    topicsPerSubject,
    totalTests,
    year,
  } = childDetailMock;

  const avgScore = testHistory.length > 0
    ? Math.round(testHistory.reduce((sum, t) => sum + t.rawScore, 0) / testHistory.length)
    : 0;

  const WEEKS_TO_EXAM = 6;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--surface-subtle)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <AppHeader activePath={ROUTES.parentDashboard} />

      <div style={{ padding: isMobile ? "24px 16px" : "48px 24px" }}>
        <div className="max-w-[1280px] mx-auto">

          {/* Breadcrumb */}
          <div style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 24 }}>
            <Link
              to={ROUTES.parentDashboard}
              style={{ color: "var(--text-muted)", textDecoration: "none" }}
            >
              {childDetailContent.breadcrumbLabel}
            </Link>
            <span style={{ margin: "0 8px" }}>&gt;</span>
            <span style={{ color: "var(--text-heading)", fontWeight: 500 }}>{childName}</span>
          </div>

          {/* 1. Hero profile card */}
          <ChildProfileSummaryCard
            avgScore={avgScore}
            childName={childName}
            firstName={firstName}
            isMobile={isMobile}
            region={region}
            schools={schools}
            streak={streak}
            totalTests={totalTests}
            weeksToExam={WEEKS_TO_EXAM}
            year={year}
          />

          {/* 2. Compact next-step bar */}
          <NextRecommendedStepCard
            currentScore={70}
            currentTopic={currentTopic}
            estimatedMinutes={20}
            firstName={firstName}
            isMobile={isMobile}
            targetScore={85}
          />

          {/* 3. Learning path — 2×2 subject cards */}
          <LearningPathSection
            isMobile={isMobile}
            subjects={subjects}
            topicsPerSubject={topicsPerSubject}
            weeksRemaining={WEEKS_TO_EXAM}
          />

          {/* 4. Performance overview — readiness ring + sparkline */}
          <PerformanceOverviewCard
            firstName={firstName}
            isMobile={isMobile}
            testHistory={testHistory}
          />

          {/* 5. Test history */}
          <TestHistorySection
            filterSubject={filterSubject}
            searchQuery={searchQuery}
            sortBy={sortBy}
            testHistory={testHistory}
            totalTests={totalTests}
            onFilterSubjectChange={setFilterSubject}
            onSearchQueryChange={setSearchQuery}
            onSortByChange={setSortBy}
          />

        </div>
      </div>

    </div>
  );
}
