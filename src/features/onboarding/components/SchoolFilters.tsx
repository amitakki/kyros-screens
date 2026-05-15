import type { SchoolGender, SchoolRegion, SchoolSortOption } from "../types";

const selectClassName =
  "h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-shadow focus:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

interface SchoolFiltersProps {
  region: "" | SchoolRegion;
  gender: "" | SchoolGender;
  sortBy: SchoolSortOption;
  regionOptions: Array<{ value: "" | SchoolRegion; label: string }>;
  genderOptions: Array<{ value: "" | SchoolGender; label: string }>;
  sortOptions: Array<{ value: SchoolSortOption; label: string }>;
  onRegionChange: (value: "" | SchoolRegion) => void;
  onGenderChange: (value: "" | SchoolGender) => void;
  onSortChange: (value: SchoolSortOption) => void;
}

export function SchoolFilters({
  region,
  gender,
  sortBy,
  regionOptions,
  genderOptions,
  sortOptions,
  onRegionChange,
  onGenderChange,
  onSortChange,
}: SchoolFiltersProps) {
  return (
    <>
      <select
        className={selectClassName}
        value={region}
        onChange={(event) => onRegionChange(event.target.value as "" | SchoolRegion)}
      >
        {regionOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={selectClassName}
        value={gender}
        onChange={(event) => onGenderChange(event.target.value as "" | SchoolGender)}
      >
        {genderOptions.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className={selectClassName}
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value as SchoolSortOption)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
