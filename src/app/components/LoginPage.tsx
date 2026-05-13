import { useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useIsMobile } from './hooks/useIsMobile';

/* ─── Subject Score Cards — Left Panel Illustration ─── */
function SubjectDashboard() {
  const subjects = [
    { name: 'Maths',             score: 78, color: '#818CF8', bg: '#4F46E5', icon: '∑' },
    { name: 'English',           score: 82, color: '#34D399', bg: '#10B981', icon: 'Aa' },
    { name: 'Verbal Reasoning',  score: 71, color: '#FCD34D', bg: '#F59E0B', icon: 'VR' },
    { name: 'Non-Verbal',        score: 65, color: '#67E8F9', bg: '#06B6D4', icon: 'NV' },
  ];

  return (
    <div>
      {/* Label */}
      <p style={{ fontSize: 11, color: 'rgba(165,180,252,0.8)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'DM Sans, sans-serif' }}>
        Emma · Year 5 · Progress overview
      </p>

      {/* 2×2 grid of subject cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        {subjects.map((s) => (
          <div key={s.name} style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 12,
            padding: '14px 14px 12px',
          }}>
            {/* Icon + topics */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 7,
                background: s.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: 'white', fontFamily: 'DM Sans, sans-serif',
              }}>{s.icon}</div>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontFamily: 'DM Sans, sans-serif' }}>7/20</span>
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 3, fontFamily: 'DM Sans, sans-serif' }}>{s.name}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', lineHeight: 1, marginBottom: 8, fontFamily: 'DM Sans, sans-serif' }}>{s.score}%</div>
            {/* Mini bar */}
            <div style={{ height: 4, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
              <div style={{ width: `${s.score}%`, height: '100%', background: s.bg, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
        {[
          { label: 'Avg score', value: '74%' },
          { label: 'Streak',    value: '🔥 5 days' },
          { label: 'Topics',    value: '26 / 80' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10,
            padding: '10px 8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FFFFFF', fontFamily: 'DM Sans, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 2, fontFamily: 'DM Sans, sans-serif' }}>{stat.label}</div>
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

/* ══════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════ */
export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
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
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            border: '2px dashed #C7D2FE',
            background: 'rgba(238,242,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 8, color: '#A5B4FC', letterSpacing: '0.06em' }}>LOGO</span>
          </div>
          <span style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 600 }}>Kyros</span>
        </div>

        {/* Dashboard illustration */}
        <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.35, marginBottom: 28 }}>
            Track every step of<br />your child's journey
          </h2>
          <SubjectDashboard />
        </div>

        {/* Testimonial */}
        <div style={{
          position: 'relative', zIndex: 1,
          borderTop: '1px solid rgba(255,255,255,0.10)',
          paddingTop: 24, marginTop: 32,
        }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, marginBottom: 14, fontStyle: 'italic' }}>
            "She went from dreading practice to asking for it."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: 'white',
            }}>S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Sarah M.</div>
              <div style={{ fontSize: 11, color: '#10B981' }}>Invicta Grammar ✓</div>
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
        background: '#FFFFFF',
        position: 'relative',
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

        {/* Back to site */}
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

        <div style={{ width: '100%', maxWidth: 396, marginTop: isMobile ? 64 : 0 }}>
          {/* Heading */}
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 15, color: '#475569', marginBottom: 32 }}>
            Log in to continue your child's 11+ preparation.
          </p>

          {/* Google */}
          <button
            style={{
              width: '100%', height: 48,
              border: '1px solid #E2E8F0',
              borderRadius: 8, background: '#FFFFFF',
              fontSize: 15, fontWeight: 500, color: '#1E293B',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 24, transition: 'background 0.15s',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
          >
            <GoogleIcon /> Continue with Google
          </button>

          {/* Divider */}
          <div style={{ position: 'relative', marginBottom: 24 }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: 1, borderTop: '1px solid #F1F5F9' }} />
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: 'white', padding: '0 12px', fontSize: 13, color: '#94A3B8' }}>or continue with email</span>
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <Label htmlFor="email" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
              Email address
            </Label>
            <Input
              id="email" type="email" placeholder="sarah@example.com"
              className="h-12 rounded-[8px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#CBD5E1] focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 8 }}>
            <Label htmlFor="password" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
              Password
            </Label>
            <div style={{ position: 'relative' }}>
              <Input
                id="password" type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="h-12 rounded-[8px] border-[#E2E8F0] text-[#1E293B] placeholder:text-[#CBD5E1] pr-12 focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[rgba(79,70,229,0.12)]"
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
          </div>

          {/* Forgot */}
          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            <a href="#forgot" style={{ fontSize: 13, color: '#4F46E5', textDecoration: 'none', fontWeight: 500 }}
               onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
               onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <Link to="/onboarding/create-child">
            <Button style={{
              width: '100%', height: 48, background: '#4F46E5', color: 'white',
              borderRadius: 8, fontSize: 15, fontWeight: 600, marginBottom: 20,
            }} className="hover:bg-[#4338CA]">
              Log in
            </Button>
          </Link>

          {/* Switch */}
          <p style={{ textAlign: 'center', fontSize: 14, color: '#475569' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#4F46E5', fontWeight: 600, textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}>
              Start free trial
            </Link>
          </p>
        </div>

        {/* Bottom trust line */}
        <p style={{
          position: 'absolute', bottom: 24,
          fontSize: 12, color: '#CBD5E1', textAlign: 'center',
        }}>
          Trusted by 12,000+ families · SSL secured · GDPR compliant
        </p>
      </div>
    </div>
  );
}