import { useState } from 'react';
import { Eye, EyeOff, X, Check } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';
import { ROUTES } from '../../../shared/constants/routes';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { AuthBackgroundOrbs } from '../components/AuthBackgroundOrbs';
import { GoogleIcon } from '../components/GoogleIcon';
import { registerContent as content } from '../content';

/* ─── Path Journey Illustration — Register Left Panel ─── */
function JourneyIllustration() {
  const nodes = Array.from({ length: 12 }, (_, i) => {
    const t = i / 11;
    const x = 20 + t * 320;
    const y = 110 - Math.pow(t, 0.7) * 90;
    return { x, y };
  });

  const solidPath = nodes.slice(0, 5).map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(' ');
  const dashedPath = nodes.slice(4).map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`).join(' ');
  const node5 = nodes[4];
  const node4 = nodes[3];

  const steps = [
    { step: '01', label: 'DISCOVER', title: 'Personalised diagnostic', desc: '40 questions · instant results · path generated',
      color: 'var(--success)',     dimBg: 'color-mix(in oklch, var(--success) 13%, transparent)',     dimBorder: 'color-mix(in oklch, var(--success) 38%, transparent)' },
    { step: '02', label: 'ADAPT',    title: 'Questions that adjust',   desc: 'Level-calibrated · 20 topics per subject',
      color: 'var(--warning)',     dimBg: 'color-mix(in oklch, var(--warning) 13%, transparent)',     dimBorder: 'color-mix(in oklch, var(--warning) 38%, transparent)' },
    { step: '03', label: 'SUCCEED',  title: 'Arrive exam-ready',       desc: 'GL · CEM · Kent Test · ISEB mock exams',
      color: 'var(--brand-light)', dimBg: 'color-mix(in oklch, var(--brand-light) 13%, transparent)', dimBorder: 'color-mix(in oklch, var(--brand-light) 38%, transparent)' },
  ];

  return (
    <div>
      <div style={{
        background: 'var(--auth-panel-surface)',
        border: '1px solid var(--auth-panel-overlay)',
        borderRadius: 14,
        padding: '20px 20px 16px',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: 'var(--auth-panel-text-mid)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {content.illustrationSubjectLabel}
          </span>
          <span style={{ fontSize: 11, color: 'var(--success)', fontWeight: 600 }}>{content.illustrationCompletedBadge}</span>
        </div>

        <div style={{ position: 'relative', height: 130 }}>
          <svg viewBox="0 0 360 120" className="w-full h-full" style={{ overflow: 'visible' }}>
            <path d={solidPath} stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={dashedPath} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="5 4" />

            {nodes.map((node, i) => {
              if (i < 4) return <circle key={i} cx={node.x} cy={node.y} r="7" style={{ fill: 'var(--success)' }} />;
              if (i === 4) return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="14" fill="rgba(255,255,255,0.15)" />
                  <circle cx={node.x} cy={node.y} r="9" fill="white" />
                  <circle cx={node.x} cy={node.y} r="4" style={{ fill: 'var(--brand)' }} />
                </g>
              );
              if (i === 11) return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="9" fill="var(--auth-panel-overlay)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x={node.x} y={node.y + 4.5} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.8)">★</text>
                  <text x={node.x} y={node.y + 22} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="DM Sans, sans-serif">{content.illustrationExamReady}</text>
                </g>
              );
              return <circle key={i} cx={node.x} cy={node.y} r="5" fill="rgba(255,255,255,0.15)" stroke="var(--auth-panel-text-ghost)" strokeWidth="1" />;
            })}

            <foreignObject x={node5.x - 95} y={node5.y - 80} width="190" height="68" style={{ overflow: 'visible' }}>
              <div style={{
                background: 'var(--auth-panel-overlay)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--auth-panel-border-strong)',
                borderRadius: 8,
                padding: '8px 12px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--brand-foreground)', marginBottom: 2 }}>{content.illustrationTopicTitle}</div>
                <div style={{ fontSize: 10, color: 'var(--auth-panel-text-strong)', marginBottom: 6 }}>{content.illustrationTopicSubtitle}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                    <div style={{ width: '64%', height: '100%', background: 'var(--brand-foreground)', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>64%</span>
                </div>
              </div>
            </foreignObject>

            <foreignObject x={node4.x - 42} y={node4.y + 12} width="84" height="22" style={{ overflow: 'visible' }}>
              <div style={{
                background: 'var(--success)', color: 'white', borderRadius: 20,
                padding: '2px 8px', fontSize: 10, fontWeight: 600,
                textAlign: 'center', whiteSpace: 'nowrap',
              }}>{content.illustrationCompletedTopic}</div>
            </foreignObject>
          </svg>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((item) => (
          <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: item.dimBg,
              border: `1.5px solid ${item.dimBorder}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: item.color }}>{item.step}</span>
            </div>
            <div>
              <p style={{ fontSize: 10, color: item.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>{item.label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--brand-foreground)', marginBottom: 2 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Password strength bar ── */
function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 10 ? 2 : 3;
  const strengthColors = ['var(--border-subtle)', 'var(--danger)', 'var(--warning)', 'var(--success)'];
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  const activeColor = strengthColors[strength];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? activeColor : 'var(--border-subtle)', transition: 'background 0.2s' }} />
      ))}
      {strength > 0 && (
        <span style={{ fontSize: 11, color: activeColor, fontWeight: 500, whiteSpace: 'nowrap' }}>
          {labels[strength]}
        </span>
      )}
    </div>
  );
}

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [password, setPassword] = useState('');
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

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            border: '2px dashed var(--brand-muted)',
            background: 'color-mix(in oklch, var(--brand-subtle) 10%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, color: 'var(--brand-light)', letterSpacing: '0.06em' }}>LOGO</span>
          </div>
          <span style={{ color: 'var(--brand-foreground)', fontSize: 18, fontWeight: 600 }}>Kyros</span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'color-mix(in oklch, var(--success) 15%, transparent)',
            border: '1px solid color-mix(in oklch, var(--success) 30%, transparent)',
            borderRadius: 20, padding: '4px 12px', marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success-light)' }}>{content.trialBadge}</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: 'var(--brand-foreground)', lineHeight: 1.3, marginBottom: 28 }}>
            {content.panelHeading.split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
        </div>

        <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          <JourneyIllustration />
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: 0,
          marginTop: 24,
          background: 'var(--auth-panel-surface)',
          border: '1px solid var(--auth-panel-overlay)',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {[
            { value: '8,863', label: 'Questions' },
            { value: '288',   label: 'Schools' },
            { value: '4.9★',  label: 'Parent rating' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1, padding: '12px 8px', textAlign: 'center',
              borderLeft: i > 0 ? '1px solid var(--auth-panel-border)' : 'none',
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--brand-foreground)' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'var(--auth-panel-text-mid)' }}>{stat.label}</div>
            </div>
          ))}
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
        overflowY: 'auto',
      }}>
        {isMobile && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: 'var(--brand-dark)', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              border: '2px dashed var(--brand-muted)',
              background: 'color-mix(in oklch, var(--brand-subtle) 8%, transparent)',
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

        <div style={{ width: '100%', maxWidth: 420, paddingTop: isMobile ? 80 : 24, paddingBottom: 24 }}>
          <h1 style={{ fontSize: isMobile ? 24 : 28, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 6 }}>
            {content.heading}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 28 }}>
            {content.subheading}
          </p>

          <button
            style={{
              width: '100%', height: 48,
              border: '1px solid var(--border-subtle)',
              borderRadius: 8, background: 'var(--surface-raised)',
              fontSize: 15, fontWeight: 500, color: 'var(--text-heading)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 20, transition: 'background 0.15s, box-shadow 0.15s',
              boxShadow: 'var(--shadow-card)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--surface-subtle)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--surface-raised)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; }}
          >
            <GoogleIcon /> {content.googleLabel}
          </button>

          <div style={{ position: 'relative', marginBottom: 20 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, borderTop: '1px solid var(--surface-muted)' }} />
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: 'var(--surface-raised)', padding: '0 12px', fontSize: 13, color: 'var(--text-subtle)' }}>
                {content.dividerText}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="fullname" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
              {content.fullNameLabel}
            </Label>
            <Input
              id="fullname" type="text" placeholder={content.fullNamePlaceholder}
              className="h-12 rounded-[8px] border-border-subtle bg-surface-raised text-text-heading placeholder:text-text-subtle focus:border-brand focus:ring-[3px] focus:ring-brand/12"
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
              {content.emailLabel}
            </Label>
            <Input
              id="email" type="email" placeholder={content.emailPlaceholder}
              className="h-12 rounded-[8px] border-border-subtle bg-surface-raised text-text-heading placeholder:text-text-subtle focus:border-brand focus:ring-[3px] focus:ring-brand/12"
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
              {content.passwordLabel}
            </Label>
            <div style={{ position: 'relative' }}>
              <Input
                id="password" type={showPassword ? 'text' : 'password'}
                placeholder={content.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-[8px] border-border-subtle bg-surface-raised text-text-heading placeholder:text-text-subtle pr-12 focus:border-brand focus:ring-[3px] focus:ring-brand/12"
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
            <PasswordStrength password={password} />
          </div>

          <label htmlFor="terms" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 22, cursor: 'pointer' }}>
            <div
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                border: `2px solid ${agreedToTerms ? 'var(--brand)' : 'var(--border-subtle)'}`,
                background: agreedToTerms ? 'var(--brand)' : 'var(--surface-raised)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              {agreedToTerms && <Check size={11} color="white" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-body)', lineHeight: 1.55 }}>
              {content.termsPrefix}{' '}
              <a href="#terms" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 500 }}>{content.termsOfServiceLabel}</a>
              {' '}{content.termsConjunction}{' '}
              <a href="#privacy" style={{ color: 'var(--brand)', textDecoration: 'none', fontWeight: 500 }}>{content.privacyPolicyLabel}</a>
            </span>
          </label>

          <Link to={ROUTES.onboardingCreateChild} style={{ pointerEvents: agreedToTerms ? 'auto' : 'none' }}>
            <Button
              style={{
                width: '100%', height: 48,
                background: agreedToTerms ? 'var(--brand)' : 'var(--border-subtle)',
                color: agreedToTerms ? 'var(--brand-foreground)' : 'var(--text-subtle)',
                borderRadius: 8, fontSize: 15, fontWeight: 600, marginBottom: 16,
                transition: 'all 0.2s', cursor: agreedToTerms ? 'pointer' : 'not-allowed',
              }}
              className={agreedToTerms ? 'hover:bg-brand-hover' : ''}
              disabled={!agreedToTerms}
            >
              {content.submitLabel}
            </Button>
          </Link>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            {content.perks.map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={12} style={{ color: 'var(--success)' }} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p}</span>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--text-body)' }}>
            {content.alreadyHaveAccountText}{' '}
            <Link to={ROUTES.login} style={{ color: 'var(--brand)', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              {content.loginLabel}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

