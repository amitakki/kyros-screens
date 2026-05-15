import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router';

type NavItem = {
  label: string;
  path: string;
  active: boolean;
};

type HeaderContent = {
  logoLabel: string;
  brandName: string;
  userInitial: string;
  userName: string;
  navItems: readonly NavItem[];
};

type Props = {
  isMobile: boolean;
  content: HeaderContent;
  mobileMenuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
};

export function SettingsHeader({
  isMobile,
  content,
  mobileMenuOpen,
  onToggleMenu,
  onCloseMenu,
}: Props) {
  return (
    <header
      style={{
        background: 'var(--brand-dark)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-8"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              border: '2px dashed var(--brand-muted)',
              background: 'color-mix(in oklch, var(--brand-subtle) 10%, transparent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{ fontSize: 8, color: 'var(--brand-light)', fontWeight: 500, letterSpacing: '0.05em' }}
            >
              {content.logoLabel}
            </span>
          </div>
          <span style={{ color: 'var(--brand-foreground)', fontSize: 16, fontWeight: 600 }}>{content.brandName}</span>
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32 }}>
            {content.navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                style={{
                  color: item.active ? 'var(--brand-foreground)' : 'var(--auth-panel-text-bright)',
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                  ...(item.active
                    ? { borderBottom: '2px solid var(--brand-foreground)', paddingBottom: 4 }
                    : {}),
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {!isMobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: 'var(--brand-foreground)',
              }}
            >
              {content.userInitial}
            </div>
            <span style={{ color: 'var(--brand-foreground)', fontSize: 15, fontWeight: 500 }}>{content.userName}</span>
            <ChevronDown size={16} style={{ color: 'var(--brand-foreground)' }} />
          </div>
        ) : (
          <button
            onClick={onToggleMenu}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--brand-foreground)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div
          style={{
            background: 'var(--brand-dark)',
            borderTop: '1px solid var(--auth-panel-border)',
            padding: '12px 24px 20px',
          }}
        >
          {content.navItems.map(({ label, path, active }) => (
            <Link
              key={label}
              to={path}
              onClick={onCloseMenu}
              style={{
                display: 'block',
                color: active ? 'var(--brand-foreground)' : 'var(--auth-panel-text-bright)',
                fontSize: 15,
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid var(--auth-panel-surface)',
                fontWeight: active ? 600 : 400,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
