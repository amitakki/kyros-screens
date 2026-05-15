import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

import { cn } from "../../lib/cn";
import { COMMON_STRINGS } from "../../constants/common-strings";

interface UserMenuItem {
  label: string;
  path: string;
  tone?: "default" | "danger";
}

interface UserMenuProps {
  items: readonly UserMenuItem[];
  userName: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserMenu({ items, userName }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const initials = useMemo(() => getInitials(userName), [userName]);

  return (
    <div className="relative hidden md:block">
      <button
        className="flex items-center gap-2.5 text-white"
        type="button"
        onClick={() => setOpen((current) => !current)}
      >
        <div className="flex size-9 items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
          {initials}
        </div>
        <span className="text-sm font-medium">{userName}</span>
        <ChevronDown className="size-4" />
      </button>

      {open ? (
        <>
          <button
            aria-label={COMMON_STRINGS.ariaLabels.closeUserMenu}
            className="fixed inset-0 z-40 cursor-default"
            type="button"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-12 z-50 min-w-48 overflow-hidden rounded-xl border border-border bg-card shadow-popover">
            {items.map((item) => (
              <Link
                key={item.path}
                className={cn(
                  "block px-5 py-3 text-sm transition-colors hover:bg-surface-subtle",
                  item.tone === "danger"
                    ? "text-danger hover:text-danger"
                    : "text-foreground",
                )}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
