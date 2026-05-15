import { useState } from "react";
import { Link } from "react-router";

import { AppHeader } from "../../../shared/components/app-shell/AppHeader";
import { ROUTES } from "../../../shared/constants/routes";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { ChildProfileSummaryCard } from "../components/ChildProfileSummaryCard";
import { ExamReadinessCard } from "../components/ExamReadinessCard";
import { LearningPathSection } from "../components/LearningPathSection";
import { NextRecommendedStepCard } from "../components/NextRecommendedStepCard";
import { ScoreTrendCard } from "../components/ScoreTrendCard";
import { StickyFloatingCTA } from "../components/StickyFloatingCTA";
import { TestHistorySection } from "../components/TestHistorySection";
import { childDetailContent } from "../content";
import { childDetailMock } from "../mocks";

export function ChildDetailPage() {
  const [activeSubject, setActiveSubject] = useState("Maths");
  const [showStickyCTA, setShowStickyCTA] = useState(true);
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
    topics,
    year,
  } = childDetailMock;

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

          <ChildProfileSummaryCard
            childName={childName}
            firstName={firstName}
            isMobile={isMobile}
            region={region}
            schools={schools}
            streak={streak}
            year={year}
          />

          <NextRecommendedStepCard
            currentTopic={currentTopic}
            firstName={firstName}
          />

          <LearningPathSection
            activeSubject={activeSubject}
            isMobile={isMobile}
            subjects={subjects}
            topics={topics}
            weeksRemaining={6}
            onChangeSubject={setActiveSubject}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
              gap: 24,
              marginBottom: 24,
            }}
          >
            <ExamReadinessCard />
            <ScoreTrendCard firstName={firstName} subjects={subjects} />
          </div>

          <TestHistorySection
            filterSubject={filterSubject}
            searchQuery={searchQuery}
            sortBy={sortBy}
            testHistory={testHistory}
            onFilterSubjectChange={setFilterSubject}
            onSearchQueryChange={setSearchQuery}
            onSortByChange={setSortBy}
          />
        </div>
      </div>

      {showStickyCTA ? (
        <StickyFloatingCTA
          childFirstName={firstName}
          topicName="Topic 8"
          onDismiss={() => setShowStickyCTA(false)}
        />
      ) : null}
    </div>
  );
}
