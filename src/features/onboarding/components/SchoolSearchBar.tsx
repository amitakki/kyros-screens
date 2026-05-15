import { Search } from "lucide-react";

import { Input } from "../../../app/components/ui/input";

interface SchoolSearchBarProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SchoolSearchBar({
  placeholder,
  value,
  onChange,
}: SchoolSearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="h-11 rounded-lg border-border pl-9 shadow-none"
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
