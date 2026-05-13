'use client';
import { useState } from 'react';
import { Link } from 'react-router';
import {
  ChevronDown, CreditCard, Download, FileText, AlertTriangle,
  CheckCircle, X, AlertCircle, Shield, Check, ArrowRight, Menu
} from 'lucide-react';
import { useIsMobile } from './hooks/useIsMobile';

const FF = 'DM Sans, sans-serif';

/* ══════════════════════════════════════
   TYPES
══════════════════════════════════════ */
type PlanState = 'active' | 'trial' | 'cancelled' | 'pastdue';

/* ══════════════════════════════════════
   HEADER
══════════════════════════════════════ */
function Header() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navLinks = [
    { label: 'Dashboard', path: '/parent' },
    { label: 'Settings', path: '/settings' },
    { label: 'Billing', path: '/parent/billing', active: true },
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 40,
      background: '#1E1B4B',
      fontFamily: FF,
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 6,
            border: '2px dashed #C7D2FE', background: 'rgba(238,242,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, fontWeight: 500, color: '#A5B4FC', letterSpacing: '0.05em',
          }}>LOGO</div>
          <span style={{ color: '#FFFFFF', fontWeight: 600, fontSize: 16 }}>Kyros</span>
        </Link>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: 32 }}>
            {navLinks.map(({ label, path, active }) => (
              <Link key={label} to={path} style={{
                color: active ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none', fontSize: 15, fontWeight: active ? 600 : 500,
                borderBottom: active ? '2px solid #FFFFFF' : '2px solid transparent',
                paddingBottom: 4,
              }}>{label}</Link>
            ))}
          </nav>
        )}

        {!isMobile ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(!open)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, background: 'transparent',
                border: 'none', cursor: 'pointer', color: '#FFFFFF',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#4F46E5', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 14, fontWeight: 700,
              }}>S</div>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Sarah</span>
              <ChevronDown size={16} />
            </button>
            {open && (
              <div style={{
                position: 'absolute', top: 48, right: 0,
                background: '#FFFFFF', borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
                minWidth: 180, overflow: 'hidden', zIndex: 50,
              }}>
                {[
                  { label: 'Parent Dashboard', path: '/parent' },
                  { label: 'Account Settings', path: '/settings' },
                  { label: 'Subscription & Billing', path: '/parent/billing' },
                  { label: 'Log out', path: '/login' },
                ].map(({ label, path }) => (
                  <Link key={label} to={path} style={{
                    display: 'block', padding: '12px 20px', fontSize: 14,
                    color: label === 'Log out' ? '#EF4444' : '#1E293B',
                    textDecoration: 'none',
                  }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >{label}</Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF' }}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {isMobile && mobileMenuOpen && (
        <div style={{ background: '#1E1B4B', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px 20px' }}>
          {navLinks.map(({ label, path, active }) => (
            <Link key={label} to={path} onClick={() => setMobileMenuOpen(false)}
              style={{ display: 'block', color: active ? '#FFFFFF' : 'rgba(255,255,255,0.7)', fontSize: 15, textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: active ? 600 : 400 }}>{label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}

/* ══════════════════════════════════════
   PLAN STATE SWITCHER (dev tool)
══════════════════════════════════════ */
function StateSwitcher({ state, onChange }: { state: PlanState; onChange: (s: PlanState) => void }) {
  const options: { value: PlanState; label: string }[] = [
    { value: 'active', label: '✓ Active' },
    { value: 'trial', label: '⏳ Trial' },
    { value: 'cancelled', label: '✗ Cancelled' },
    { value: 'pastdue', label: '⚠ Past Due' },
  ];
  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap',
      padding: '10px 16px', background: '#EEF2FF', borderRadius: 8,
      border: '1px solid #C7D2FE', fontFamily: FF,
    }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#4F46E5', marginRight: 4 }}>Preview state:</span>
      {options.map(o => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{
          padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: 'pointer',
          background: state === o.value ? '#4F46E5' : '#FFFFFF',
          color: state === o.value ? '#FFFFFF' : '#4F46E5',
          border: `1px solid ${state === o.value ? '#4F46E5' : '#C7D2FE'}`,
        }}>{o.label}</button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════
   PLAN CARD — STATE 1: ACTIVE
══════════════════════════════════════ */
function ActivePlanCard({ onCancel }: { onCancel: () => void }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0', borderLeft: '4px solid #4F46E5',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0 }}>Annual Plan</h3>
        <span style={{
          background: '#D1FAE5', color: '#065F46', fontSize: 13, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
        }}>Active</span>
      </div>

      <div style={{ marginBottom: 6 }}>
        <span style={{ fontSize: 32, fontWeight: 700, color: '#1E293B' }}>£79.99</span>
        <span style={{ fontSize: 16, color: '#94A3B8', marginLeft: 4 }}>/ year</span>
      </div>
      <p style={{ fontSize: 13, color: '#10B981', fontWeight: 500, marginBottom: 20 }}>
        Save 33% compared to monthly billing
      </p>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>Renews on 15 January 2026</p>
        <p style={{ fontSize: 14, color: '#475569' }}>Next payment: £79.99 on 15 January 2026</p>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 8 }}>2 of 3 child profiles currently used</p>
        <div style={{ height: 6, background: '#E2E8F0', borderRadius: 4 }}>
          <div style={{ width: '66.6%', height: '100%', background: '#4F46E5', borderRadius: 4 }} />
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        {[
          'Unlimited practice tests',
          'Up to 3 child profiles',
          'Full question bank — 8,863 questions',
          'Progress tracking & PDF reports',
        ].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Check size={14} style={{ color: '#10B981', flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: '#475569' }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <button style={{
          height: 48, padding: '0 24px', borderRadius: 8, fontSize: 15, fontWeight: 600,
          background: '#FFFFFF', border: '1px solid #4F46E5', color: '#4F46E5', cursor: 'pointer',
        }}>Change Plan</button>
        <button onClick={onCancel} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, color: '#EF4444', textDecoration: 'underline', fontFamily: FF,
        }}>Cancel subscription</button>
      </div>
      <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 10 }}>
        You'll keep full access until your current billing period ends.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════
   PLAN CARD — STATE 2: TRIAL
══════════════════════════════════════ */
function TrialPlanCard() {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0', borderLeft: '4px solid #F59E0B',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0 }}>Free Trial</h3>
        <span style={{
          background: '#FEF3C7', color: '#92400E', fontSize: 13, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
        }}>Trial Active</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 56, fontWeight: 700, color: '#F59E0B', lineHeight: 1 }}>3</span>
        <span style={{ fontSize: 18, color: '#94A3B8' }}>days remaining</span>
      </div>
      <div style={{ height: 8, background: '#FEF3C7', borderRadius: 4, marginBottom: 8 }}>
        <div style={{ width: '57%', height: '100%', background: '#F59E0B', borderRadius: 4 }} />
      </div>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>Trial ends on 18 December 2024</p>

      <div style={{ marginBottom: 20 }}>
        {[
          'Full access to all features',
          'Unlimited practice tests',
          'Up to 3 child profiles',
          'No card required during trial',
        ].map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Check size={14} style={{ color: '#4F46E5', flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: '#475569' }}>{f}</span>
          </div>
        ))}
      </div>

      <div style={{
        background: '#FEF3C7', borderLeft: '4px solid #F59E0B',
        borderRadius: 8, padding: '12px 16px', marginBottom: 20,
      }}>
        <p style={{ fontSize: 13, color: '#92400E', margin: 0 }}>
          No payment method on file — you won't be charged until you choose a plan after your trial ends.
        </p>
      </div>

      <button style={{
        width: '100%', height: 48, borderRadius: 8, fontSize: 15, fontWeight: 600,
        background: '#4F46E5', color: '#FFFFFF', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8,
      }}>
        Choose a Plan <ArrowRight size={16} />
      </button>
      <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginBottom: 12 }}>
        Pick a plan before your trial ends to keep Emma's progress.
      </p>
      <p style={{ fontSize: 13, color: '#94A3B8' }}>
        If you don't choose a plan, your account will revert to limited access (2 tests total) at the end of your trial.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════
   PLAN CARD — STATE 3: CANCELLED
══════════════════════════════════════ */
function CancelledPlanCard() {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0', borderLeft: '4px solid #EF4444',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0 }}>Annual Plan</h3>
        <span style={{
          background: '#FEE2E2', color: '#991B1B', fontSize: 13, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
        }}>Cancelled</span>
      </div>

      <p style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>Full access until:</p>
      <p style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>15 January 2026</p>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 20 }}>
        After this date, your account reverts to limited access.
      </p>

      <div style={{
        background: '#FEE2E2', borderLeft: '4px solid #EF4444',
        borderRadius: 8, padding: '14px 16px', marginBottom: 20,
      }}>
        <p style={{ fontSize: 13, color: '#991B1B', fontWeight: 600, marginBottom: 8 }}>After 15 January 2026:</p>
        {['Tests limited to 2 total', 'No learning path access', 'No PDF reports or mock exams'].map(item => (
          <p key={item} style={{ fontSize: 13, color: '#991B1B', marginBottom: 4 }}>• {item}</p>
        ))}
      </div>

      <button style={{
        width: '100%', height: 48, borderRadius: 8, fontSize: 15, fontWeight: 600,
        background: '#4F46E5', color: '#FFFFFF', border: 'none', cursor: 'pointer', marginBottom: 8,
      }}>Reactivate Subscription</button>
      <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginBottom: 12 }}>
        Reactivate now to keep uninterrupted access. Your next billing date will remain 15 January 2026.
      </p>
      <button style={{
        background: 'none', border: 'none', cursor: 'pointer',
        fontSize: 13, color: '#4F46E5', textDecoration: 'underline', fontFamily: FF,
      }}>
        Changed your mind? Reactivate before 15 Jan 2026 →
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   PLAN CARD — STATE 4: PAST DUE
══════════════════════════════════════ */
function PastDuePlanCard() {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0', borderLeft: '4px solid #EF4444',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', margin: 0 }}>Annual Plan</h3>
        <span style={{
          background: '#FEE2E2', color: '#991B1B', fontSize: 13, fontWeight: 600,
          padding: '4px 12px', borderRadius: 20,
        }}>Payment Failed</span>
      </div>

      <div style={{
        background: '#FEE2E2', borderLeft: '4px solid #EF4444',
        borderRadius: 8, padding: '14px 16px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <AlertTriangle size={16} style={{ color: '#EF4444', flexShrink: 0, marginTop: 2 }} />
          <p style={{ fontSize: 14, color: '#991B1B', margin: 0 }}>
            We couldn't process your payment of £79.99 on 15 January 2026.
          </p>
        </div>
        <p style={{ fontSize: 13, color: '#991B1B', paddingLeft: 24 }}>
          We'll retry on 18 January 2026 (attempt 1 of 3).
        </p>
      </div>

      <p style={{ fontSize: 14, fontWeight: 700, color: '#EF4444', marginBottom: 20 }}>
        Update your payment method to avoid losing access.
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px', background: '#F8FAFC', borderRadius: 8,
        border: '1px solid #E2E8F0', marginBottom: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <CreditCard size={20} style={{ color: '#94A3B8' }} />
          <span style={{ fontSize: 14, color: '#475569' }}>Visa •••• 4242 — Exp. 08/27</span>
        </div>
        <span style={{ fontSize: 13, color: '#EF4444', fontWeight: 600 }}>Payment failed</span>
      </div>

      <button style={{
        width: '100%', height: 48, borderRadius: 8, fontSize: 15, fontWeight: 600,
        background: '#4F46E5', color: '#FFFFFF', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8,
      }}>
        Update Payment Method <ArrowRight size={16} />
      </button>
      <p style={{ fontSize: 12, color: '#94A3B8', textAlign: 'center', marginBottom: 12 }}>
        Updating your card will trigger an immediate retry.
      </p>
      <p style={{ fontSize: 13, color: '#94A3B8' }}>
        Retry 1: 18 Jan · Retry 2: 23 Jan · Final: 30 Jan<br />
        Your subscription will be cancelled if payment fails 3 times.
      </p>
    </div>
  );
}

/* ══════════════════════════════════════
   PAYMENT METHOD CARD
══════════════════════════════════════ */
function PaymentMethodCard({ noCard }: { noCard?: boolean }) {
  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <p style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 20 }}>Payment Method</p>

      {noCard ? (
        <div style={{
          border: '2px dashed #E2E8F0', borderRadius: 8, padding: '24px 16px',
          textAlign: 'center', marginBottom: 20,
        }}>
          <CreditCard size={24} style={{ color: '#94A3B8', marginBottom: 8 }} />
          <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 0 }}>No payment method added yet</p>
        </div>
      ) : (
        <>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 16px', background: '#F8FAFC', borderRadius: 8,
            border: '1px solid #E2E8F0', marginBottom: 10,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 44, height: 30, background: '#1A1F71', borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#FFFFFF', fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>VISA</span>
              </div>
              <div>
                <p style={{ fontSize: 14, color: '#1E293B', fontWeight: 500, marginBottom: 2 }}>
                  •••• •••• •••• 4242
                </p>
                <p style={{ fontSize: 12, color: '#94A3B8' }}>Exp. 08/27</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <CheckCircle size={14} style={{ color: '#10B981' }} />
              <span style={{ fontSize: 13, color: '#10B981', fontWeight: 500 }}>Active</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <Shield size={12} style={{ color: '#94A3B8' }} />
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Secured by Stripe</span>
          </div>
        </>
      )}

      <button style={{
        height: 48, padding: '0 24px', borderRadius: 8, fontSize: 15, fontWeight: 600,
        background: '#FFFFFF', border: '1px solid #4F46E5', color: '#4F46E5', cursor: 'pointer',
      }}>
        {noCard ? 'Add Payment Method' : 'Update Payment Method'}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════
   AVAILABLE PLANS
══════════════════════════════════════ */
function AvailablePlansCard({ current }: { current: 'monthly' | 'quarterly' | 'annual' }) {
  const isMobile = useIsMobile();
  const plans = [
    {
      id: 'monthly',
      badge: 'Most Flexible',
      badgeStyle: { background: '#F1F5F9', color: '#475569' },
      price: '£9.99',
      period: '/ month',
      meta: 'Flexible monthly billing',
      savings: null,
      features: ['All features included', 'Cancel or change anytime', 'Full question bank'],
      cta: 'Switch to Monthly',
      helper: "You'll keep Annual access until 15 Jan 2026",
    },
    {
      id: 'quarterly',
      badge: 'Save £5',
      badgeStyle: { background: '#FEF3C7', color: '#92400E' },
      price: '£24.99',
      period: '/ quarter',
      meta: null,
      savings: 'Save £5 vs monthly',
      features: ['All features included', 'Cancel or change anytime', 'Full question bank'],
      cta: 'Switch to Quarterly',
      helper: "You'll keep Annual access until 15 Jan 2026",
    },
    {
      id: 'annual',
      badge: 'Best Value',
      badgeStyle: { background: '#EEF2FF', color: '#4F46E5' },
      price: '£79.99',
      period: '/ year',
      meta: null,
      savings: 'Save 33% vs monthly billing',
      features: ['All features included', 'Cancel or change anytime', 'Full question bank', 'Priority support'],
      cta: 'Current Plan ✓',
      helper: "You're on this plan — no action needed",
    },
  ];

  // On mobile show Annual first (best value)
  const displayPlans = isMobile
    ? [plans[2], plans[0], plans[1]]
    : plans;

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: isMobile ? 20 : 28, marginBottom: 24,
    }}>
      <p style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>Available Plans</p>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>
        Plan changes take effect at your next billing cycle.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16 }}>
        {displayPlans.map(plan => {
          const isCurrent = plan.id === current;
          return (
            <div key={plan.id}
              style={{
                borderRadius: 12, border: `1px solid ${isCurrent ? '#C7D2FE' : '#E2E8F0'}`,
                padding: 20, background: isCurrent ? '#FAFAFE' : '#FFFFFF',
                boxShadow: isCurrent
                  ? '0 4px 16px rgba(79,70,229,0.12)'
                  : '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'box-shadow 150ms ease',
                display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => {
                if (!isCurrent) (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)';
              }}
              onMouseLeave={e => {
                if (!isCurrent) (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                {isCurrent && (
                  <span style={{ fontSize: 12, color: '#6366F1', fontWeight: 500 }}>Your Current Plan</span>
                )}
                {!isCurrent && <span />}
                <span style={{
                  ...plan.badgeStyle, fontSize: 11, fontWeight: 600,
                  padding: '3px 10px', borderRadius: 20,
                }}>{plan.badge}</span>
              </div>

              <div style={{ marginBottom: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: '#1E293B' }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: '#94A3B8', marginLeft: 4 }}>{plan.period}</span>
              </div>

              {plan.meta && <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>{plan.meta}</p>}
              {plan.savings && (
                <p style={{ fontSize: 13, color: '#10B981', fontWeight: 500, marginBottom: 12 }}>{plan.savings}</p>
              )}
              {!plan.meta && !plan.savings && <div style={{ marginBottom: 12 }} />}

              <div style={{ flex: 1, marginBottom: 16 }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                    <Check size={12} style={{ color: '#4F46E5', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#475569' }}>{f}</span>
                  </div>
                ))}
              </div>

              <button style={{
                height: 44, borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                marginBottom: 8,
                ...(isCurrent
                  ? { background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE' }
                  : { background: '#FFFFFF', color: '#4F46E5', border: '1px solid #4F46E5' }),
              }}>
                {plan.cta}
              </button>
              <p style={{ fontSize: 12, color: '#94A3B8' }}>{plan.helper}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   BILLING HISTORY
══════════════════════════════════════ */
const HISTORY = [
  { date: '15 Jan 2025', desc: 'Annual Plan', amount: '£79.99', status: 'Paid' },
  { date: '15 Jan 2024', desc: 'Annual Plan', amount: '£79.99', status: 'Paid' },
];

function BillingHistoryCard() {
  const statusStyle = (s: string) => {
    if (s === 'Paid') return { background: '#D1FAE5', color: '#065F46' };
    if (s === 'Pending') return { background: '#FEF3C7', color: '#92400E' };
    return { background: '#FEE2E2', color: '#991B1B' };
  };

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 28, marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: '#1E293B' }}>Billing History</p>
      </div>
      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 24 }}>
        Receipts are automatically emailed after each payment.
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
              {['Date', 'Description', 'Amount', 'Status', 'Receipt'].map(col => (
                <th key={col} style={{
                  textAlign: 'left', padding: '10px 12px', fontSize: 12,
                  color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HISTORY.map((row, i) => (
              <tr key={i} style={{
                borderBottom: '1px solid #F1F5F9',
                background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#EEF2FF')}
                onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? '#FFFFFF' : '#F8FAFC')}
              >
                <td style={{ padding: '14px 12px', color: '#475569' }}>{row.date}</td>
                <td style={{ padding: '14px 12px', color: '#475569' }}>{row.desc}</td>
                <td style={{ padding: '14px 12px', color: '#1E293B', fontWeight: 600 }}>{row.amount}</td>
                <td style={{ padding: '14px 12px' }}>
                  <span style={{
                    ...statusStyle(row.status), fontSize: 12, fontWeight: 600,
                    padding: '3px 10px', borderRadius: 20,
                  }}>{row.status}</span>
                </td>
                <td style={{ padding: '14px 12px' }}>
                  <button style={{
                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: FF,
                    display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#4F46E5',
                  }}>
                    <Download size={13} /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16,
      }}>
        {['↓ Export CSV', '↓ Export PDF'].map(btn => (
          <button key={btn} style={{
            height: 36, padding: '0 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
            background: 'transparent', border: '1px solid #E2E8F0', color: '#475569', cursor: 'pointer',
          }}>{btn}</button>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   CANCEL MODAL
══════════════════════════════════════ */
const CANCEL_REASONS = [
  'Too expensive',
  'Child no longer needs it',
  'Switching to a different service',
  'Not using it enough',
  'Technical issues',
  'Other',
];

function CancelModal({ onClose }: { onClose: () => void }) {
  const [reason, setReason] = useState('');
  const [feedback, setFeedback] = useState('');
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 60, fontFamily: FF,
        animation: 'fadeIn 200ms ease-out',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#FFFFFF', borderRadius: 16, maxWidth: 520, width: '90%',
          padding: 32, boxShadow: '0 8px 32px rgba(0,0,0,0.16)',
          animation: 'scaleIn 200ms ease-out',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: '#FEF3C7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <AlertCircle size={24} style={{ color: '#F59E0B' }} />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            Cancel your subscription?
          </h3>
          <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
            You'll keep full access until 15 January 2026.<br />
            Your children's learning progress, reports, scores, and school setup will remain available until then.
          </p>
        </div>

        <div style={{
          background: '#FEF3C7', borderLeft: '4px solid #F59E0B',
          borderRadius: 8, padding: '12px 16px', marginBottom: 12,
        }}>
          <p style={{ fontSize: 13, color: '#92400E', fontWeight: 600, marginBottom: 6 }}>
            After 15 January 2026, your account reverts to:
          </p>
          {['Tests limited to 2 total', 'No learning path access', 'No mock exams or PDF reports'].map(item => (
            <p key={item} style={{ fontSize: 13, color: '#92400E', marginBottom: 3 }}>• {item}</p>
          ))}
        </div>

        <button style={{
          background: 'none', border: 'none', cursor: 'pointer', fontFamily: FF,
          fontSize: 13, color: '#4F46E5', marginBottom: 20, textDecoration: 'underline',
        }}>
          Pause subscription instead →
        </button>

        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Help us improve (optional)
          </p>
          <select
            value={reason}
            onChange={e => setReason(e.target.value)}
            style={{
              width: '100%', height: 48, padding: '0 16px',
              border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 15,
              fontFamily: FF, color: reason ? '#1E293B' : '#94A3B8',
              background: '#FFFFFF', marginBottom: 10, cursor: 'pointer',
            }}
          >
            <option value="">Select a reason ▼</option>
            {CANCEL_REASONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>

          <div style={{ position: 'relative' }}>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value.slice(0, 500))}
              placeholder="Tell us more (optional)"
              style={{
                width: '100%', height: 88, padding: '12px 16px',
                border: '1px solid #E2E8F0', borderRadius: 8, fontSize: 14,
                fontFamily: FF, resize: 'none', boxSizing: 'border-box',
              }}
            />
            <span style={{
              position: 'absolute', bottom: 8, right: 12,
              fontSize: 11, color: '#94A3B8',
            }}>{feedback.length}/500</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onClose} style={{
            width: '100%', height: 48, borderRadius: 8, fontSize: 15, fontWeight: 600,
            background: '#4F46E5', color: '#FFFFFF', border: 'none', cursor: 'pointer',
          }}>Keep My Subscription</button>
          <button
            disabled={!reason}
            style={{
              width: '100%', height: 44, borderRadius: 8, fontSize: 14, fontWeight: 600,
              background: 'transparent', border: '1px solid #EF4444', cursor: reason ? 'pointer' : 'not-allowed',
              color: '#EF4444',
              opacity: reason ? 1 : 0.4,
              transition: 'opacity 150ms ease',
            }}
          >Cancel Subscription</button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
export function SubscriptionBilling() {
  const [planState, setPlanState] = useState<PlanState>('active');
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isMobile = useIsMobile();

  const SupportFooter = (
    <div style={{
      background: '#FFFFFF', borderRadius: 16,
      border: '1px solid #E2E8F0',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: 24,
      textAlign: 'center', marginBottom: 24,
    }}>
      <FileText size={20} style={{ color: '#94A3B8', marginBottom: 8 }} />
      <p style={{ fontSize: 14, color: '#94A3B8' }}>
        Need help with billing?{' '}
        <a href="#" style={{ color: '#4F46E5', textDecoration: 'none', fontWeight: 500 }}>
          Contact support →
        </a>
      </p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: FF }}>
      <Header />

      <main style={{ maxWidth: 1184, margin: '0 auto', padding: isMobile ? '24px 16px 80px' : '40px 48px 80px' }}>
        {/* Page title */}
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
            Subscription & Billing
          </h2>
          <p style={{ fontSize: isMobile ? 14 : 16, color: '#94A3B8' }}>
            Manage your subscription, payment methods, and billing history.
          </p>
        </div>

        {/* Dev state switcher */}
        <StateSwitcher state={planState} onChange={setPlanState} />

        {isMobile ? (
          /* Single column on mobile */
          <div>
            {planState === 'active' && <ActivePlanCard onCancel={() => setShowCancelModal(true)} />}
            {planState === 'trial' && <TrialPlanCard />}
            {planState === 'cancelled' && <CancelledPlanCard />}
            {planState === 'pastdue' && <PastDuePlanCard />}

            <PaymentMethodCard noCard={planState === 'trial'} />
            <AvailablePlansCard current="annual" />
            <BillingHistoryCard />
            {SupportFooter}
          </div>
        ) : (
          /* Two-column layout on desktop */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
            {/* Left column */}
            <div>
              {planState === 'active' && <ActivePlanCard onCancel={() => setShowCancelModal(true)} />}
              {planState === 'trial' && <TrialPlanCard />}
              {planState === 'cancelled' && <CancelledPlanCard />}
              {planState === 'pastdue' && <PastDuePlanCard />}

              <AvailablePlansCard current="annual" />
              <BillingHistoryCard />
            </div>

            {/* Right column */}
            <div>
              <PaymentMethodCard noCard={planState === 'trial'} />
              {SupportFooter}
            </div>
          </div>
        )}
      </main>

      {showCancelModal && <CancelModal onClose={() => setShowCancelModal(false)} />}
    </div>
  );
}
