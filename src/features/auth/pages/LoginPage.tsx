import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';
import { ROUTES } from '../../../shared/constants/routes';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { AuthBackgroundOrbs } from '../components/AuthBackgroundOrbs';
import { GoogleIcon } from '../components/GoogleIcon';
import { loginContent as content } from '../content';

/* ─── Subject Score Cards — Left Panel Illustration ─── */
function SubjectDashboard() {
  const subjects = [
    { name: 'Maths',            score: 78, color: 'var(--brand-light)',   bg: 'var(--brand)',   icon: '∑' },
    { name: 'English',          score: 82, color: 'var(--success-light)', bg: 'var(--success)', icon: 'Aa' },
    { name: 'Verbal Reasoning', score: 71, color: 'var(--warning-light)', bg: 'var(--warning)', icon: 'VR' },
    { name: 'Non-Verbal',       score: 65, color: '#67E8F9',              bg: '#06B6D4',        icon: 'NV' },
  ];

  return (
    <div>
      <p style={{ fontSize: 11, color: 'color-mix(in oklch, var(--brand-muted) 80%, transparent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
        {content.panelOverviewLabel}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {subjects.map((s) => (
          <div key={s.name} style={{
            background: 'var(--auth-panel-surface)',
            border: '1px solid var(--auth-panel-border)',
            borderRadius: 12,
            padding: '14px 14px 12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: 'white',
              }}>{s.icon}</div>
              <span style={{ fontSize: 10, color: 'var(--auth-panel-text-faint)' }}>7/20</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--auth-panel-text)', marginBottom: 3 }}>{s.name}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-foreground)', lineHeight: 1, marginBottom: 8 }}>{s.score}%</div>
            <div style={{ height: 4, background: 'var(--auth-panel-overlay)', borderRadius: 2 }}>
              <div style={{ width: `${s.score}%`, height: '100%', background: s.bg, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Avg score', value: '74%' },
          { label: 'Streak',    value: '🔥 5 days' },
          { label: 'Topics',    value: '26 / 80' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'var(--auth-panel-surface)',
            border: '1px solid var(--auth-panel-surface)',
            borderRadius: 10,
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand-foreground)' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'var(--auth-panel-text-dim)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>

      {/* ═══ LEFT PANEL — brand illustration ═══ */}
      <div style={{
        width: '44%',
        background: 'var(--brand-dark)',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <AuthBackgroundOrbs />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            border: '2px dashed var(--brand-muted)',
            background: 'color-mix(in oklch, var(--brand-subtle) 8%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, color: 'var(--brand-light)', letterSpacing: '0.06em' }}>LOGO</span>
          </div>
          <span style={{ color: 'var(--brand-foreground)', fontSize: 18, fontWeight: 600 }}>Kyros</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--brand-foreground)', lineHeight: 1.35, marginBottom: 28 }}>
            {content.panelHeading.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <SubjectDashboard />
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid var(--auth-panel-border)',
          paddingTop: 24, marginTop: 32,
        }}>
          <p style={{ fontSize: 14, color: 'var(--auth-panel-text-bright)', lineHeight: 1.65, marginBottom: 14, fontStyle: 'italic' }}>
            {content.testimonialQuote}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-foreground)' }}>{content.testimonialName}</div>
              <div style={{ fontSize: 11, color: 'var(--success)' }}>{content.testimonialSchool}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — form ═══ */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '32px 24px' : '48px',
        background: 'var(--surface-raised)',
        position: 'relative',
      }}>
        {isMobile && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'var(--brand-dark)', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              border: '2px dashed var(--brand-muted)', background: 'color-mix(in oklch, var(--brand-subtle) 8%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 7, color: 'var(--brand-light)', letterSpacing: '0.06em',
            }}>LOGO</div>
            <span style={{ color: 'var(--brand-foreground)', fontSize: 16, fontWeight: 600 }}>Kyros</span>
          </div>
        )}

        <Link to={ROUTES.home} style={{
          position: 'absolute', top: isMobile ? 72 : 28, right: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-subtle)', textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-body)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-subtle)')}
        >
          <X size={20} />
        </Link>

        <div style={{ width: '100%', maxWidth: 396, marginTop: isMobile ? 64 : 0 }}>
          <h1 style={{ fontSize: isMobile ? 26 : 30, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 8 }}>
            {content.welcomeHeading}
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text-body)', marginBottom: 32 }}>
            {content.subheading}
          </p>

          <button
            style={{
              width: '100%', height: 48,
              border: '1px solid var(--border-subtle)',
              borderRadius: 8, background: 'var(--surface-raised)',
              fontSize: 15, fontWeight: 500, color: 'var(--text-heading)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 24, transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-subtle)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--surface-raised)')}
          >
            <GoogleIcon /> {content.googleLabel}
          </button>

          <div style={{ position: 'relative', marginBottom: 24 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, borderTop: '1px solid var(--surface-muted)' }} />
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: 'var(--surface-raised)', padding: '0 12px', fontSize: 13, color: 'var(--text-subtle)' }}>
                {content.dividerText}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <Label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
              {content.emailLabel}
            </Label>
            <Input
              id="email" type="email" placeholder={content.emailPlaceholder}
              className="h-12 rounded-[8px] border-border-subtle text-text-heading placeholder:text-text-subtle focus:border-brand focus:ring-[3px] focus:ring-brand/12"
            />
          </div>

          <div style={{ marginBottom: 8 }}>
            <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
              {content.passwordLabel}
            </Label>
            <div style={{ position: 'relative' }}>
              <Input
                id="password" type={showPassword ? 'text' : 'password'}
                placeholder={content.passwordPlaceholder}
                className="h-12 rounded-[8px] border-border-subtle text-text-heading placeholder:text-text-subtle pr-12 focus:border-brand focus:ring-[3px] focus:ring-brand/12"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <a href="#forgot" style={{ fontSize: 13, color: 'var(--brand)', textDecoration: 'none', fontWeight: 500 }}
               onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
               onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              {content.forgotPasswordLabel}
            </a>
          </div>

          <Link to={ROUTES.onboardingCreateChild}>
            <Button style={{
              width: '100%', height: 48, background: 'var(--brand)', color: 'var(--brand-foreground)',
              borderRadius: 8, fontSize: 15, fontWeight: 600, marginBottom: 20,
            }} className="hover:bg-brand-hover">
              {content.submitLabel}
            </Button>
          </Link>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-body)' }}>
            {content.noAccountText}{' '}
            <Link to={ROUTES.register} style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              {content.signUpLabel}
            </Link>
          </p>
        </div>

        <p style={{
          position: 'absolute', bottom: 24,
          fontSize: 12, color: 'var(--text-subtle)', textAlign: 'center',
        }}>
          {content.trustLine}
        </p>
      </div>
    </div>
  );
}

