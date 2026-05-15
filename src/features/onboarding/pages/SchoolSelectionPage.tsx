import { useMemo, useState } from "react";
import { AlertTriangle, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { Button } from "../../../app/components/ui/button";
import { StatusBadge } from "../../../shared/components/feedback/StatusBadge";
import { PageContainer } from "../../../shared/components/layout/PageContainer";
import { COMMON_STRINGS } from "../../../shared/constants/common-strings";
import { ROUTES } from "../../../shared/constants/routes";
import {
  examBoardTones,
  genderOptions,
  regionOptions,
  schoolSelectionContent,
  sortOptions,
} from "../content";
import { OnboardingHeader } from "../components/OnboardingHeader";
import { SchoolCard } from "../components/SchoolCard";
import { SchoolFilters } from "../components/SchoolFilters";
import { SchoolSearchBar } from "../components/SchoolSearchBar";
import { SelectionProgress } from "../components/SelectionProgress";
import { SCHOOL_SELECTION_LIMIT, SCHOOLS } from "../mocks";
import type { School, SchoolGender, SchoolRegion, SchoolSortOption } from "../types";

export function SchoolSelectionPage() {
  const [selectedSchools, setSelectedSchools] = useState<School[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState<"" | SchoolRegion>("");
  const [genderFilter, setGenderFilter] = useState<"" | SchoolGender>("");
  const [sortBy, setSortBy] = useState<SchoolSortOption>("popular");

  const filteredSchools = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase();

    const matchingSchools = SCHOOLS.filter((school) => {
      const matchesSearch =
        school.name.toLowerCase().includes(normalizedQuery) ||
        school.location.toLowerCase().includes(normalizedQuery);
      const matchesRegion = !regionFilter || school.region === regionFilter;
      const matchesGender = !genderFilter || school.gender === genderFilter;

      return matchesSearch && matchesRegion && matchesGender;
    });

    return matchingSchools.sort((left, right) => {
      if (sortBy === "popular") {
        if (left.popular === right.popular) {
          return left.name.localeCompare(right.name);
        }

        return left.popular ? -1 : 1;
      }

      return left.name.localeCompare(right.name);
    });
  }, [genderFilter, regionFilter, searchQuery, sortBy]);

  const canContinue = selectedSchools.length >= 1;

  const addSchool = (school: School) => {
    if (
      selectedSchools.length >= SCHOOL_SELECTION_LIMIT ||
      selectedSchools.some((selectedSchool) => selectedSchool.id === school.id)
    ) {
      return;
    }

    setSelectedSchools((current) => [...current, school]);
  };

  const removeSchool = (schoolId: string) => {
    setSelectedSchools((current) =>
      current.filter((school) => school.id !== schoolId),
    );
  };

  return (
    <div className="min-h-screen bg-surface-subtle">
      <OnboardingHeader
        closeLabel={schoolSelectionContent.screenReader.closeSelection}
        currentStep={2}
        steps={[
          schoolSelectionContent.stepOneLabel,
          schoolSelectionContent.stepTwoLabel,
        ]}
      />

      <PageContainer className="py-12">
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              {schoolSelectionContent.title}
            </h2>
            <p className="mb-2 text-base text-foreground/80">
              {schoolSelectionContent.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {schoolSelectionContent.helper}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-warning/20 bg-warning-subtle px-3 py-1.5">
              <AlertTriangle className="size-3.5 text-warning-foreground" />
              <span className="text-xs font-medium text-warning-foreground">
                {schoolSelectionContent.callout}
              </span>
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 shadow-soft">
            <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
              <SchoolSearchBar
                placeholder={schoolSelectionContent.searchPlaceholder}
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <SchoolFilters
                gender={genderFilter}
                genderOptions={genderOptions}
                region={regionFilter}
                regionOptions={regionOptions}
                sortBy={sortBy}
                sortOptions={sortOptions}
                onGenderChange={setGenderFilter}
                onRegionChange={setRegionFilter}
                onSortChange={setSortBy}
              />
            </div>
          </section>

          <SelectionProgress
            helper={schoolSelectionContent.selectedHelper}
            limit={SCHOOL_SELECTION_LIMIT}
            selectedSchools={selectedSchools}
            title={schoolSelectionContent.selectedTitle}
            onRemoveSchool={removeSchool}
          />

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              {schoolSelectionContent.availableTitle}
            </h3>

            <div className="flex max-h-[500px] flex-col gap-3 overflow-y-auto">
              {filteredSchools.map((school) => {
                const isSelected = selectedSchools.some(
                  (selectedSchool) => selectedSchool.id === school.id,
                );
                const isFull =
                  selectedSchools.length >= SCHOOL_SELECTION_LIMIT;

                return (
                  <SchoolCard
                    key={school.id}
                    addLabel={COMMON_STRINGS.add}
                    addedLabel={schoolSelectionContent.addedLabel}
                    examBoardTone={examBoardTones[school.examBoard]}
                    examFormatLabel={schoolSelectionContent.examFormatLink}
                    isFull={isFull}
                    isSelected={isSelected}
                    popularLabel={COMMON_STRINGS.popular}
                    school={school}
                    onAddSchool={addSchool}
                  />
                );
              })}
            </div>
          </section>

          {selectedSchools.length === 0 ? (
            <section className="rounded-xl border border-warning/20 bg-warning-subtle px-6 py-8 text-center">
              <StatusBadge tone="warning">
                {schoolSelectionContent.emptyState}
              </StatusBadge>
            </section>
          ) : null}

          <div className="flex items-center justify-between gap-3 pt-2">
            <Button asChild className="text-muted-foreground" variant="ghost">
              <Link to={ROUTES.onboardingCreateChild}>
                <ArrowLeft className="size-4" />
                {COMMON_STRINGS.back}
              </Link>
            </Button>

            {canContinue ? (
              <Button asChild className="h-12 rounded-lg px-7 bg-brand text-brand-foreground hover:bg-brand-hover">
                <Link to={ROUTES.parentDashboard}>
                  {schoolSelectionContent.continueLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            ) : (
              <Button className="h-12 rounded-lg px-7 bg-brand text-brand-foreground" disabled>
                {schoolSelectionContent.continueLabel}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
