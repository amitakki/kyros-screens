import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, AlertCircle, X, Download, RotateCcw, ArrowRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from './ui/button';

const FF = 'DM Sans, sans-serif';

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface Child {
  id: string;
  name: string;
  firstName: string;
  year: string;
  region: string;
  avatar?: string;
  diagnosticComplete: boolean;
  hasActivity: boolean;
  currentSubject?: string;
  topicsCompleted?: number;
  totalTopics?: number;
  nextTopic?: string;
  avgScore?: number;
  scoreChange?: 'up' | 'down' | 'flat';
  totalTests?: number;
  lastActivity?: string;
  streak?: number;
  autoSkip?: boolean;
}

interface ActivityGroup {
  childId: string;
  childName: string;
  avatar?: string;
  timestamp: string;
  items: string[];
}

/* ══════════════════════════════════════════════
   TRIAL BANNER
══════════════════════════════════════════════ */
function TrialBanner({ daysRemaining, onDismiss }: { daysRemaining: number; onDismiss?: () => void }) {
  if (daysRemaining <= 0) return null;

  const isDays1to4 = daysRemaining >= 1 && daysRemaining <= 4;
  const isDays5to6 = daysRemaining >= 5 && daysRemaining <= 6;
  const isDay7 = daysRemaining === 7;

  const bgColor = isDay7 ? '#FEE2E2' : '#FEF3C7';
  const borderColor = isDay7 ? '#EF4444' : '#F59E0B';
  const textColor = isDay7 ? '#991B1B' : '#92400E';
  const buttonBg = isDay7 ? '#EF4444' : '#F59E0B';

  const message = isDays1to4
    ? `Your free trial expires in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`
    : isDays5to6
    ? "Your trial ends soon — upgrade to keep Emma's progress"
    : 'Your free trial expires today';

  const canDismiss = isDays1to4 && onDismiss;

  return (
    <div
      style={{
        background: bgColor,
        borderBottom: `1px solid ${borderColor}`,
        padding: '16px 0',
      }}
    >
      <div
        className="max-w-[1280px] mx-auto px-8"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Left: Message */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <AlertCircle size={18} style={{ color: textColor }} />
          <span style={{ fontSize: 14, color: textColor, fontWeight: 700, fontFamily: FF }}>
            {message}
          </span>
        </div>

        {/* Centre: Progress */}
        <div style={{ maxWidth: 240, flex: 1 }}>
          <div
            style={{
              height: 8,
              background: '#FDE68A',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(daysRemaining / 7) * 100}%`,
                height: '100%',
                background: buttonBg,
                borderRadius: 4,
                transition: 'width 0.3s',
              }}
            />
          </div>
          <p style={{ fontSize: 12, color: textColor, textAlign: 'center', marginTop: 4, fontFamily: FF }}>
            Day {daysRemaining} of 7
          </p>
        </div>

        {/* Right: CTA + Dismiss */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button
            style={{
              background: buttonBg,
              color: '#FFFFFF',
              height: 40,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              animation: isDays5to6 ? 'pulse 2s infinite' : 'none',
            }}
            className="hover:opacity-90"
          >
            Upgrade Now →
          </Button>
          {canDismiss && (
            <button
              onClick={onDismiss}
              style={{
                background: 'none',
                border: 'none',
                color: textColor,
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   RESET DIAGNOSTIC MODAL
══════════════════════════════════════════════ */
function ResetDiagnosticModal({ childName, onClose, onConfirm }: { childName: string; onClose: () => void; onConfirm: () => void }) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        fontFamily: FF,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 16,
          maxWidth: 480,
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <AlertCircle size={32} style={{ color: '#F59E0B', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            Reset {childName}'s diagnostic?
          </h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
            This will archive {childName}'s current learning path and scores. They will need to retake the diagnostic to generate a new path. This action cannot be undone.
          </p>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: 16,
            background: '#F8FAFC',
            borderRadius: 8,
            marginBottom: 24,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            style={{ marginTop: 2, cursor: 'pointer' }}
          />
          <span style={{ fontSize: 14, color: '#475569' }}>
            I understand this will archive {childName}'s current progress
          </span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Button
            variant="ghost"
            onClick={onClose}
            style={{ flex: 1, height: 48, fontSize: 15 }}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!confirmed}
            style={{
              flex: 1,
              height: 48,
              background: confirmed ? '#EF4444' : '#E2E8F0',
              color: confirmed ? '#FFFFFF' : '#94A3B8',
              cursor: confirmed ? 'pointer' : 'not-allowed',
              fontSize: 15,
              fontWeight: 600,
            }}
            className={confirmed ? 'hover:bg-[#DC2626]' : ''}
          >
            Reset Diagnostic
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CHILD CARD
══════════════════════════════════════════════ */
function ChildCard({ child, onResetDiagnostic, onToggleAutoSkip }: {
  child: Child;
  onResetDiagnostic: (childId: string) => void;
  onToggleAutoSkip: (childId: string) => void;
}) {
  const needsAttention = !child.diagnosticComplete;
  const borderColor = needsAttention ? '#F59E0B' : '#4F46E5';

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderLeft: `4px solid ${borderColor}`,
        borderRadius: 12,
        padding: 24,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {/* ROW 1: Identity */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: child.avatar ? `url(${child.avatar})` : 'linear-gradient(135deg, #4F46E5, #818CF8)',
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 700,
            color: '#FFFFFF',
            flexShrink: 0,
          }}
        >
          {!child.avatar && child.firstName[0]}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
            {child.name}
          </h3>
          <p style={{ fontSize: 14, color: '#64748B' }}>
            {child.year} · {child.region}
          </p>
        </div>
        {needsAttention ? (
          <div
            style={{
              background: '#FEF3C7',
              color: '#92400E',
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 20,
            }}
          >
            ⚠ Needs attention
          </div>
        ) : child.streak ? (
          <div
            style={{
              background: '#FEF3C7',
              color: '#92400E',
              fontSize: 12,
              fontWeight: 600,
              padding: '4px 12px',
              borderRadius: 20,
            }}
          >
            🔥 {child.streak} days
          </div>
        ) : null}
      </div>

      {/* ROW 2: Status / Progress */}
      {needsAttention ? (
        <div
          style={{
            background: '#FEF3C7',
            borderLeft: '3px solid #F59E0B',
            borderRadius: 8,
            padding: 16,
          }}
        >
          <p style={{ fontSize: 14, color: '#92400E' }}>
            {child.firstName} hasn't taken the diagnostic yet. The diagnostic creates their personalised learning path.
          </p>
        </div>
      ) : !child.hasActivity ? (
        <>
          <div>
            <p style={{ fontSize: 12, color: '#4F46E5', marginBottom: 6, fontWeight: 500 }}>
              {child.currentSubject}
            </p>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  height: 8,
                  background: '#E2E8F0',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '0%',
                    height: '100%',
                    background: '#4F46E5',
                    borderRadius: 4,
                  }}
                />
              </div>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 6, textAlign: 'right' }}>
                0 / {child.totalTopics} topics
              </p>
            </div>
            <p style={{ fontSize: 13, color: '#4F46E5', marginTop: 8 }}>
              Next: {child.nextTopic} →
            </p>
          </div>
          <div
            style={{
              background: '#EEF2FF',
              borderLeft: '3px solid #4F46E5',
              borderRadius: 8,
              padding: 12,
            }}
          >
            <p style={{ fontSize: 12, color: '#4F46E5' }}>
              No activity yet — start practice to see progress here.
            </p>
          </div>
        </>
      ) : (
        <div>
          <p style={{ fontSize: 12, color: '#4F46E5', marginBottom: 6, fontWeight: 500 }}>
            {child.currentSubject}
          </p>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                height: 8,
                background: '#E2E8F0',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${((child.topicsCompleted || 0) / (child.totalTopics || 1)) * 100}%`,
                  height: '100%',
                  background: '#4F46E5',
                  borderRadius: 4,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 6, textAlign: 'right' }}>
              {child.topicsCompleted} / {child.totalTopics} topics
            </p>
          </div>
          <p style={{ fontSize: 13, color: '#4F46E5', marginTop: 8 }}>
            Next: {child.nextTopic} →
          </p>
        </div>
      )}

      {/* ROW 3: Stats */}
      {!needsAttention && child.hasActivity && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#64748B' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            📊 <span style={{ color: '#1E293B', fontWeight: 600 }}>{child.avgScore}%</span>
            {child.scoreChange === 'up' && <TrendingUp size={14} style={{ color: '#10B981' }} />}
            {child.scoreChange === 'down' && <TrendingDown size={14} style={{ color: '#EF4444' }} />}
            {child.scoreChange === 'flat' && <Minus size={14} style={{ color: '#94A3B8' }} />}
          </div>
          <span>·</span>
          <span>✅ {child.totalTests} tests</span>
          <span>·</span>
          <span>🕒 {child.lastActivity}</span>
        </div>
      )}

      {needsAttention && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#94A3B8' }}>
          <span>📊 —</span>
          <span>·</span>
          <span>✅ 0 tests</span>
          <span>·</span>
          <span>🕒 Never</span>
        </div>
      )}

      {/* ROW 4: Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {needsAttention ? (
          <Button
            style={{
              width: '100%',
              height: 48,
              background: '#4F46E5',
              color: '#FFFFFF',
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
            }}
            className="hover:bg-[#4338CA]"
          >
            Start Diagnostic Assessment →
          </Button>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button
                style={{
                  flex: 2,
                  height: 48,
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                }}
                className="hover:bg-[#4338CA]"
              >
                {child.hasActivity ? 'Continue Practice →' : 'Start Practice →'}
              </Button>
              <Link to={`/parent/children/${child.id}`} style={{ flex: 1 }}>
                <Button
                  variant="outline"
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                  }}
                >
                  View Details
                </Button>
              </Link>
              <Button
                variant="ghost"
                style={{
                  height: 48,
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 8,
                }}
              >
                <Download size={18} />
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  color: '#475569',
                  cursor: 'pointer',
                }}
              >
                <input
                  type="checkbox"
                  checked={child.autoSkip || false}
                  onChange={() => onToggleAutoSkip(child.id)}
                  style={{ cursor: 'pointer' }}
                />
                Auto-skip ≥90%
              </label>
              <button
                onClick={() => onResetDiagnostic(child.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#EF4444',
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <RotateCcw size={14} /> Reset Diagnostic
              </button>
            </div>
          </>
        )}
        {needsAttention && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#94A3B8',
                opacity: 0.5,
                cursor: 'not-allowed',
              }}
              title="Available after diagnostic is complete"
            >
              <input type="checkbox" disabled style={{ cursor: 'not-allowed' }} />
              Auto-skip ≥90%
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PARENT DASHBOARD
══════════════════════════════════════════════ */
export function ParentDashboard() {
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [resetModalChild, setResetModalChild] = useState<string | null>(null);

  // Mock data - STATE 1: During trial with 2 children
  const daysRemaining = 4;
  const parentName = 'Sarah';

  const [children, setChildren] = useState<Child[]>([
    {
      id: '2',
      name: 'Sophie Thompson',
      firstName: 'Sophie',
      year: 'Year 4',
      region: 'Kent',
      diagnosticComplete: false,
      hasActivity: false,
    },
    {
      id: '1',
      name: 'Emma Thompson',
      firstName: 'Emma',
      year: 'Year 5',
      region: 'Kent',
      diagnosticComplete: true,
      hasActivity: true,
      currentSubject: 'Maths',
      topicsCompleted: 7,
      totalTopics: 20,
      nextTopic: 'Topic 8 — Sequences',
      avgScore: 78,
      scoreChange: 'up',
      totalTests: 12,
      lastActivity: '2h ago',
      streak: 5,
      autoSkip: false,
    },
  ]);

  const activityGroups: ActivityGroup[] = [
    {
      childId: '1',
      childName: 'Emma',
      timestamp: '2h ago',
      items: [
        'Completed Topic 7 — Basic Algebra',
        'Scored 90% on Topic 7 (Attempt 2) 🎉',
        'Unlocked Topic 8: Sequences',
      ],
    },
    {
      childId: '2',
      childName: 'Sophie',
      timestamp: '5h ago',
      items: ['Logged in for the first time'],
    },
  ];

  const childToReset = children.find((c) => c.id === resetModalChild);

  const handleToggleAutoSkip = (childId: string) => {
    setChildren((prev) =>
      prev.map((child) =>
        child.id === childId ? { ...child, autoSkip: !child.autoSkip } : child
      )
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: FF }}>
      {/* HEADER */}
      <header
        style={{
          background: '#1E1B4B',
          padding: '20px 0',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          className="max-w-[1280px] mx-auto px-8"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 6,
                border: '2px dashed #C7D2FE',
                background: 'rgba(238,242,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 8,
                  color: '#A5B4FC',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                LOGO
              </span>
            </div>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>Kyros</span>
          </Link>

          {/* Nav */}
          <nav style={{ display: 'flex', gap: 32 }}>
            <Link
              to="/parent"
              style={{
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
                borderBottom: '2px solid #FFFFFF',
                paddingBottom: 4,
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Settings
            </Link>
            <Link
              to="/parent/billing"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: 15,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Billing
            </Link>
          </nav>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              S
            </div>
            <span style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 500 }}>
              {parentName}
            </span>
            <ChevronDown size={16} style={{ color: '#FFFFFF' }} />
          </div>
        </div>
      </header>

      {/* TRIAL BANNER */}
      {showTrialBanner && daysRemaining > 0 && (
        <TrialBanner
          daysRemaining={daysRemaining}
          onDismiss={daysRemaining <= 4 ? () => setShowTrialBanner(false) : undefined}
        />
      )}

      {/* MAIN CONTENT */}
      <div style={{ padding: '48px 24px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* GREETING */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Welcome back, {parentName}! 👋
            </h2>
            <p style={{ fontSize: 16, color: '#64748B' }}>
              Here's how your children are doing today.
            </p>
          </div>

          {/* CHILDREN SECTION */}
          <div style={{ marginBottom: 48 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              Your Children
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))',
                gap: 24,
              }}
            >
              {children.map((child) => (
                <ChildCard
                  key={child.id}
                  child={child}
                  onResetDiagnostic={setResetModalChild}
                  onToggleAutoSkip={handleToggleAutoSkip}
                />
              ))}

              {/* ADD CHILD CARD */}
              {children.length < 5 && (
                <Link
                  to={`/onboarding/create-child?childNumber=${children.length + 1}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    style={{
                      border: '2px dashed #C7D2FE',
                      background: '#EEF2FF',
                      borderRadius: 12,
                      padding: 48,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      minHeight: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#4F46E5';
                      e.currentTarget.style.background = '#DDD6FE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#C7D2FE';
                      e.currentTarget.style.background = '#EEF2FF';
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#4F46E5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16,
                      }}
                    >
                      <span style={{ fontSize: 24, color: '#FFFFFF', fontWeight: 300 }}>+</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#4F46E5', marginBottom: 8 }}>
                      Add another child's learning path
                    </h3>
                    <p style={{ fontSize: 12, color: '#64748B' }}>
                      Up to 5 children per account
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 12,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#94A3B8',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 24,
              }}
            >
              Recent Activity
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {activityGroups.map((group, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#FFFFFF',
                      }}
                    >
                      {group.childName[0]}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1E293B' }}>
                      {group.childName}
                    </span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>· {group.timestamp}</span>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: group.childId === '1' ? '#10B981' : '#F59E0B',
                      }}
                    />
                  </div>
                  <ul style={{ marginLeft: 34, listStyle: 'disc', color: '#475569' }}>
                    {group.items.map((item, j) => (
                      <li key={j} style={{ fontSize: 14, marginBottom: 4 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <a
                href="#"
                style={{
                  fontSize: 14,
                  color: '#4F46E5',
                  fontWeight: 500,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                View full activity <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* RESET MODAL */}
      {resetModalChild && childToReset && (
        <ResetDiagnosticModal
          childName={childToReset.firstName}
          onClose={() => setResetModalChild(null)}
          onConfirm={() => {
            // Handle reset logic
            setResetModalChild(null);
          }}
        />
      )}
    </div>
  );
}
