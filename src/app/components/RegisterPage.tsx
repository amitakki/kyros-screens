import { useState } from 'react';
import { Eye, EyeOff, X, Check } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useIsMobile } from './hooks/useIsMobile';

/* ─── Path Journey Illustration — Register Left Panel ─── */
function JourneyIllustration() {
  // Mini 12-node path arc
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

  return (
    <div>
      {/* Mini arc */}
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 14,
        padding: '20px 20px 16px',
        marginBottom: 20,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'DM Sans, sans-serif' }}>
            Maths · 12 topics
          </span>
          <span style={{ fontSize: 11, color: '#10B981', fontWeight: 600, fontFamily: 'DM Sans, sans-serif' }}>4 of 12 ✓</span>
        </div>

        <div style={{ position: 'relative', height: 130 }}>
          <svg viewBox="0 0 360 120" className="w-full h-full" style={{ overflow: 'visible' }}>
            <path d={solidPath} stroke="rgba(255,255,255,0.9)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d={dashedPath} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="5 4" />

            {nodes.map((node, i) => {
              if (i < 4) return <circle key={i} cx={node.x} cy={node.y} r="7" fill="#10B981" />;
              if (i === 4) return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="14" fill="rgba(255,255,255,0.15)" />
                  <circle cx={node.x} cy={node.y} r="9" fill="white" />
                  <circle cx={node.x} cy={node.y} r="4" fill="#4F46E5" />
                </g>
              );
              if (i === 11) return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="9" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                  <text x={node.x} y={node.y + 4.5} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.8)">★</text>
                  <text x={node.x} y={node.y + 22} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" fontFamily="DM Sans, sans-serif">Exam ready</text>
                </g>
              );
              return <circle key={i} cx={node.x} cy={node.y} r="5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />;
            })}

            {/* Active topic card */}
            <foreignObject x={node5.x - 95} y={node5.y - 80} width="190" height="68" style={{ overflow: 'visible' }}>
              <div style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '8px 12px',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#FFFFFF', marginBottom: 2 }}>Topic 5 — Fractions</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 6 }}>Adapted · Medium level</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2 }}>
                    <div style={{ width: '64%', height: '100%', background: '#FFFFFF', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>64%</span>
                </div>
              </div>
            </foreignObject>

            {/* Completed badge */}
            <foreignObject x={node4.x - 42} y={node4.y + 12} width="84" height="22" style={{ overflow: 'visible' }}>
              <div style={{
                background: '#10B981', color: 'white', borderRadius: 20,
                padding: '2px 8px', fontSize: 10, fontWeight: 600,
                fontFamily: 'DM Sans, sans-serif', textAlign: 'center', whiteSpace: 'nowrap',
              }}>Topic 4 ✓ 90%</div>
            </foreignObject>
          </svg>
        </div>
      </div>

      {/* 3-step value props */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { step: '01', label: 'DISCOVER', title: 'Personalised diagnostic', desc: '40 questions · instant results · path generated', color: '#10B981' },
          { step: '02', label: 'ADAPT',    title: 'Questions that adjust',   desc: 'Level-calibrated · 20 topics per subject',          color: '#F59E0B' },
          { step: '03', label: 'SUCCEED',  title: 'Arrive exam-ready',       desc: 'GL · CEM · Kent Test · ISEB mock exams',             color: '#818CF8' },
        ].map((item) => (
          <div key={item.step} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: `${item.color}22`,
              border: `1.5px solid ${item.color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: item.color, fontFamily: 'DM Sans, sans-serif' }}>{item.step}</span>
            </div>
            <div>
              <p style={{ fontSize: 10, color: item.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>{item.label}</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#FFFFFF', marginBottom: 2, fontFamily: 'DM Sans, sans-serif' }}>{item.title}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Decorative background orbs ─── */
function Orbs() {
  return (
    <>
      <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: '#4F46E5', opacity: 0.18, top: -100, right: -100, filter: 'blur(72px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', background: '#10B981', opacity: 0.10, bottom: 60, left: -50, filter: 'blur(56px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 160, height: 160, borderRadius: '50%', background: '#06B6D4', opacity: 0.08, top: '40%', left: '60%', filter: 'blur(48px)', pointerEvents: 'none' }} />
    </>
  );
}

/* ─── Google Icon ─── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

/* ── Password strength bar ── */
function PasswordStrength({ password }: { password: string }) {
  const len = password.length;
  const strength = len === 0 ? 0 : len < 6 ? 1 : len < 10 ? 2 : 3;
  const colors = ['#E2E8F0', '#EF4444', '#F59E0B', '#10B981'];
  const labels = ['', 'Weak', 'Fair', 'Strong'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= strength ? colors[strength] : '#E2E8F0', transition: 'background 0.2s' }} />
      ))}
      {strength > 0 && (
        <span style={{ fontSize: 11, color: colors[strength], fontWeight: 500, fontFamily: 'DM Sans, sans-serif', whiteSpace: 'nowrap' }}>
          {labels[strength]}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   REGISTER PAGE
══════════════════════════════════════════════ */
export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [password, setPassword] = useState('');
  const isMobile = useIsMobile();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'DM Sans, sans-serif' }}>

      {/* ═══ LEFT PANEL — brand illustration ═══ */}
      <div style={{
        width: '44%',
        background: '#1E1B4B',
        display: isMobile ? 'none' : 'flex',
        flexDirection: 'column',
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Orbs />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            border: '2px dashed rgba(199,210,254,0.5)',
            background: 'rgba(238,242,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, color: 'rgba(165,180,252,0.9)', letterSpacing: '0.06em' }}>LOGO</span>
          </div>
          <span style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 600 }}>Kyros</span>
        </div>

        {/* Headline */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 20, padding: '4px 12px', marginBottom: 16,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#6EE7B7', fontFamily: 'DM Sans, sans-serif' }}>7-day free trial · No card required</span>
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.3, marginBottom: 28 }}>
            A clear, structured path<br />from day one to exam day
          </h2>
        </div>

        {/* Journey illustration */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1 }}>
          <JourneyIllustration />
        </div>

        {/* Stats strip */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex', gap: 0,
          marginTop: 24,
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
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
              borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif' }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</div>
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
        background: '#FFFFFF',
        position: 'relative',
        overflowY: 'auto',
      }}>
        {/* Mobile logo row */}
        {isMobile && (
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            background: '#1E1B4B', padding: '16px 24px',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 6,
              border: '2px dashed #C7D2FE', background: 'rgba(238,242,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 7, color: '#A5B4FC', letterSpacing: '0.06em',
            }}>LOGO</div>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>Kyros</span>
          </div>
        )}

        {/* Back link */}
        <Link to="/" style={{
          position: 'absolute', top: isMobile ? 72 : 28, right: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#94A3B8', textDecoration: 'none',
          transition: 'color 0.2s',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#475569')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
        >
          <X size={20} />
        </Link>

        <div style={{ width: '100%', maxWidth: 420, paddingTop: isMobile ? 80 : 24, paddingBottom: 24 }}>
          {/* Heading */}
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1E293B', marginBottom: 6 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>
            Start your free 7-day trial — no card needed.
          </p>

          {/* Google */}
          <button
            style={{
              width: '100%', height: 48,
              border: '1px solid #E2E8F0',
              borderRadius: 8, background: '#FFFFFF',
              fontSize: 15, fontWeight: 500, color: '#1E293B',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 20, transition: 'background 0.15s, box-shadow 0.15s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.10)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
          >
            <GoogleIcon /> Continue with Google
          </button>

          {/* Divider */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, borderTop: '1px solid #F1F5F9' }} />
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: '#FFFFFF', padding: '0 12px', fontSize: 13, color: '#94A3B8' }}>or sign up with email</span>
            </div>
          </div>

          {/* Full name */}
          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="fullname" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
              Your full name
            </Label>
            <Input
              id="fullname" type="text" placeholder="Sarah Thompson"
              className="h-12 rounded-[8px] border-[#E2E8F0] bg-white text-[#1E293B] placeholder:text-[#CBD5E1] focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: 14 }}>
            <Label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
              Email address
            </Label>
            <Input
              id="email" type="email" placeholder="sarah@example.com"
              className="h-12 rounded-[8px] border-[#E2E8F0] bg-white text-[#1E293B] placeholder:text-[#CBD5E1] focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 18 }}>
            <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
              Password
            </Label>
            <div style={{ position: 'relative' }}>
              <Input
                id="password" type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-[8px] border-[#E2E8F0] bg-white text-[#1E293B] placeholder:text-[#CBD5E1] pr-12 focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
              />
              <button
                type="button" onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#94A3B8', display: 'flex', alignItems: 'center', padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </div>

          {/* Terms */}
          <label htmlFor="terms" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 22, cursor: 'pointer' }}>
            <div
              onClick={() => setAgreedToTerms(!agreedToTerms)}
              style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
                border: `2px solid ${agreedToTerms ? '#4F46E5' : '#D1D5DB'}`,
                background: agreedToTerms ? '#4F46E5' : 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.15s', cursor: 'pointer',
              }}
            >
              {agreedToTerms && <Check size={11} color="white" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: 13, color: '#475569', lineHeight: 1.55 }}>
              I agree to the{' '}
              <a href="#terms" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
              {' '}and{' '}
              <a href="#privacy" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
            </span>
          </label>

          {/* Submit */}
          <Link to="/onboarding/create-child" style={{ pointerEvents: agreedToTerms ? 'auto' : 'none' }}>
            <Button
              style={{
                width: '100%', height: 48, background: agreedToTerms ? '#4F46E5' : '#E2E8F0',
                color: agreedToTerms ? 'white' : '#94A3B8',
                borderRadius: 8, fontSize: 15, fontWeight: 600, marginBottom: 16,
                transition: 'all 0.2s', cursor: agreedToTerms ? 'pointer' : 'not-allowed',
              }}
              className={agreedToTerms ? 'hover:bg-[#4338CA]' : ''}
              disabled={!agreedToTerms}
            >
              Create account — free for 7 days
            </Button>
          </Link>

          {/* Perks strip */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
            {['No card required', 'Cancel anytime', 'GDPR compliant'].map((p) => (
              <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Check size={12} style={{ color: '#10B981' }} />
                <span style={{ fontSize: 12, color: '#64748B' }}>{p}</span>
              </div>
            ))}
          </div>

          {/* Log in link */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#475569' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4F46E5', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
