import { Check } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import type { StatusBadgeTone } from "../../../shared/components/feedback/StatusBadge";
import { StatusBadge } from "../../../shared/components/feedback/StatusBadge";
import { COMMON_STRINGS } from "../../../shared/constants/common-strings";
import type { School } from "../types";

interface SchoolCardProps {
  addLabel: string;
  addedLabel: string;
  examBoardTone: StatusBadgeTone;
  examFormatLabel: string;
  isFull: boolean;
  isSelected: boolean;
  onAddSchool: (school: School) => void;
  popularLabel: string;
  school: School;
}

export function SchoolCard({
  addLabel,
  addedLabel,
  examBoardTone,
  examFormatLabel,
  isFull,
  isSelected,
  onAddSchool,
  popularLabel,
  school,
}: SchoolCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-lg border border-border bg-card px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex-1">
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground">{school.name}</h4>
          {school.popular ? (
            <StatusBadge tone="warning">{popularLabel}</StatusBadge>
          ) : null}
          <StatusBadge tone={examBoardTone}>{school.examBoard}</StatusBadge>
        </div>

        <p className="mb-1 text-sm text-muted-foreground">
          {school.location} · {school.gender}
        </p>

        <button
          className="text-sm font-medium text-brand transition-colors hover:text-brand/80"
          type="button"
        >
          {examFormatLabel}
        </button>
      </div>

      {isSelected ? (
        <div className="flex items-center gap-2 text-sm font-medium text-success">
          <Check className="size-4" strokeWidth={2.5} />
          {addedLabel}
        </div>
      ) : (
        <Button
          aria-label={`${COMMON_STRINGS.add} ${school.name}`}
          className="h-9 rounded-md border-brand bg-card px-4 text-brand hover:bg-brand-subtle"
          disabled={isFull}
          variant="outline"
          onClick={() => onAddSchool(school)}
        >
          + {addLabel}
        </Button>
      )}
    </article>
  );
}
