import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../../../app/components/ui/button";
import { ROUTES } from "../../../shared/constants/routes";

type LandingHeaderProps = {
  isMobile: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  brandName: string;
  loginLabel: string;
  startTrialLabel: string;
  logoLabel: string;
  navItems: readonly string[];
};

function toAnchorId(item: string) {
  return `#${item.toLowerCase().replace(/\s+/g, "-")}`;
}

export function LandingHeader({
  isMobile,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  brandName,
  loginLabel,
  startTrialLabel,
  logoLabel,
  navItems,
}: LandingHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--brand-dark)",
        borderBottom: "1px solid var(--brand-dark-border)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to={ROUTES.home} className="flex items-center gap-2">
          <div
            className="flex items-center justify-center rounded-lg"
            style={{
              width: 40,
              height: 40,
              border: "2px dashed var(--brand-muted)",
              background: "var(--brand-subtle)",
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "var(--text-subtle)",
                fontWeight: 500,
                letterSpacing: "0.05em",
              }}
            >
              {logoLabel}
            </span>
          </div>
          <span
            style={{
              color: "var(--surface-raised)",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            {brandName}
          </span>
        </Link>

        {!isMobile && (
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={toAnchorId(item)}
                style={{
                  color: "var(--brand-light)",
                  fontSize: 16,
                  textDecoration: "none",
                  transition: "color var(--duration-normal)",
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = "var(--surface-raised)";
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = "var(--brand-light)";
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        {!isMobile && (
          <div className="flex items-center gap-3">
            <Link to={ROUTES.login}>
              <Button
                variant="ghost"
                style={{ color: "var(--surface-raised)", fontSize: 16 }}
                className="hover:bg-white/10"
              >
                {loginLabel}
              </Button>
            </Link>
            <Link to={ROUTES.register}>
              <Button
                className="hover:bg-brand-hover"
                style={{
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  borderRadius: 24,
                  height: 44,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {startTrialLabel}
              </Button>
            </Link>
          </div>
        )}

        {isMobile && (
          <button
            onClick={onToggleMenu}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--surface-raised)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {isMobile && menuOpen && (
        <div
          style={{
            background: "var(--brand-dark)",
            borderTop: "1px solid var(--auth-panel-border)",
            padding: "16px 24px 24px",
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={toAnchorId(item)}
              onClick={onCloseMenu}
              style={{
                display: "block",
                color: "var(--brand-light)",
                fontSize: 16,
                textDecoration: "none",
                padding: "12px 0",
                borderBottom: "1px solid var(--auth-panel-surface)",
              }}
            >
              {item}
            </a>
          ))}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginTop: 16,
            }}
          >
            <Link to={ROUTES.login} onClick={onCloseMenu}>
              <Button
                variant="ghost"
                style={{
                  width: "100%",
                  color: "var(--surface-raised)",
                  border: "1px solid var(--auth-panel-border-strong)",
                }}
                className="hover:bg-white/10"
              >
                {loginLabel}
              </Button>
            </Link>
            <Link to={ROUTES.register} onClick={onCloseMenu}>
              <Button
                className="hover:bg-brand-hover"
                style={{
                  width: "100%",
                  background: "var(--brand)",
                  color: "var(--brand-foreground)",
                  borderRadius: 8,
                  height: 48,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {startTrialLabel}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
