import { Check, X } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { COMMON_STRINGS } from "../../../shared/constants/common-strings";
import type { School } from "../types";

interface SelectionProgressProps {
  helper: string;
  limit: number;
  selectedSchools: School[];
  onRemoveSchool: (schoolId: string) => void;
  title: string;
}

export function SelectionProgress({
  helper,
  limit,
  selectedSchools,
  onRemoveSchool,
  title,
}: SelectionProgressProps) {
  const selectionProgress = (selectedSchools.length / limit) * 100;

  if (selectedSchools.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {selectedSchools.length} of {limit} selected
          </p>
        </div>
        <p className="text-sm font-medium text-brand">{helper}</p>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-brand transition-[width]"
          style={{ width: `${selectionProgress}%` }}
        />
      </div>

      <div className="flex flex-col gap-3">
        {selectedSchools.map((school) => (
          <article
            key={school.id}
            className="flex flex-col gap-3 rounded-lg border border-border border-l-4 border-l-brand bg-card px-5 py-4 shadow-card md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                <Check className="size-3" strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {school.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {school.location} · {school.gender} · {school.examBoard}
                </p>
              </div>
            </div>

            <Button
              aria-label={`${COMMON_STRINGS.close} ${school.name}`}
              className="self-end text-muted-foreground hover:text-danger md:self-auto"
              size="icon"
              variant="ghost"
              onClick={() => onRemoveSchool(school.id)}
            >
              <X className="size-4" />
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
