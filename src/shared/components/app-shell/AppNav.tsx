import { Link } from "react-router";

import { cn } from "../../lib/cn";

interface AppNavItem {
  label: string;
  path: string;
}

interface AppNavProps {
  activePath: string;
  items: readonly AppNavItem[];
  mobile?: boolean;
  onNavigate?: () => void;
}

export function AppNav({
  activePath,
  items,
  mobile = false,
  onNavigate,
}: AppNavProps) {
  if (mobile) {
    return (
      <nav className="border-t border-white/10 bg-brand-dark px-6 pb-5 pt-3">
        {items.map((item) => {
          const isActive = item.path === activePath;

          return (
            <Link
              key={item.path}
              className={cn(
                "block border-b border-white/10 py-3 text-[15px] transition-colors",
                isActive ? "font-semibold text-white" : "text-white/70 hover:text-white",
              )}
              to={item.path}
              onClick={onNavigate}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {items.map((item) => {
        const isActive = item.path === activePath;

        return (
          <Link
            key={item.path}
            className={cn(
              "border-b-2 pb-1 text-[15px] transition-colors",
              isActive
                ? "border-white font-semibold text-white"
                : "border-transparent font-medium text-white/70 hover:text-white",
            )}
            to={item.path}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
