import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

import { cn } from "../../lib/cn";
import { COMMON_STRINGS } from "../../constants/common-strings";
import { PRIMARY_NAV_ITEMS, USER_MENU_ITEMS } from "../../constants/navigation";
import { ROUTES } from "../../constants/routes";
import { useIsMobile } from "../../hooks/useIsMobile";
import { AppNav } from "./AppNav";
import { UserMenu } from "./UserMenu";

interface AppHeaderProps {
  activePath: string;
  userName?: string;
}

export function AppHeader({
  activePath,
  userName = "Sarah",
}: AppHeaderProps) {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-brand-dark text-white">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-6 lg:px-8">
        <Link className="flex items-center gap-2 text-white" to={ROUTES.home}>
          <div className="flex size-8 items-center justify-center rounded-md border-2 border-dashed border-brand-muted bg-brand-subtle/10 text-[8px] font-medium tracking-[0.08em] text-brand-muted">
            {COMMON_STRINGS.logoPlaceholder}
          </div>
          <span className="text-base font-semibold">{COMMON_STRINGS.appName}</span>
        </Link>

        <AppNav activePath={activePath} items={PRIMARY_NAV_ITEMS} />

        {isMobile ? (
          <button
            aria-label={mobileMenuOpen ? COMMON_STRINGS.ariaLabels.closeNav : COMMON_STRINGS.ariaLabels.openNav}
            className="text-white md:hidden"
            type="button"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        ) : (
          <UserMenu items={USER_MENU_ITEMS} userName={userName} />
        )}
      </div>

      <div className={cn("md:hidden", !mobileMenuOpen && "hidden")}>
        <AppNav
          activePath={activePath}
          items={PRIMARY_NAV_ITEMS}
          mobile
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
