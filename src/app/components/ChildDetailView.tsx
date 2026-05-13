import { useState } from 'react';
import { Link } from 'react-router';
import {
  ChevronDown,
  MoreVertical,
  Download,
  RotateCcw,
  Archive,
  ArrowRight,
  Info,
  Lock,
  Check,
  Target,
  X,
  Search,
  TrendingUp,
  Menu,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from './hooks/useIsMobile';

const FF = 'DM Sans, sans-serif';

/* ══════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════ */
interface Topic {
  id: number;
  name: string;
  status: 'completed' | 'active' | 'locked';
  bestScore?: number;
  attempts?: number;
  lastPractised?: string;
}

interface TestRecord {
  date: string;
  subject: string;
  topic: string;
  score: string;
  rawScore: number;
  time: string;
}

/* ══════════════════════════════════════════════
   OVERFLOW MENU
══════════════════════════════════════════════ */
function OverflowMenu({ childName, onReset, onArchive }: { childName: string; onReset: () => void; onArchive: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        style={{ height: 48, paddingLeft: 16, paddingRight: 16 }}
      >
        <MoreVertical size={18} />
      </Button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 10,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              minWidth: 200,
              zIndex: 20,
              fontFamily: FF,
            }}
          >
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                fontSize: 14,
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <Download size={16} /> Download PDF Report
              <span style={{ fontSize: 12, color: '#94A3B8', marginLeft: 'auto' }}>(Coming soon)</span>
            </button>
            <button
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                background: 'none',
                textAlign: 'left',
                fontSize: 14,
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <RotateCcw size={16} /> Reset Diagnostic
            </button>
            <button
              onClick={() => {
                onArchive();
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: 'none',
                borderTop: '1px solid #F1F5F9',
                background: 'none',
                textAlign: 'left',
                fontSize: 14,
                color: '#EF4444',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <Archive size={16} /> Archive Child
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   TOPIC GRID CELL
══════════════════════════════════════════════ */
function TopicCell({ topic }: { topic: Topic }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const bgColor = topic.status === 'completed' ? '#10B981' : topic.status === 'active' ? '#4F46E5' : '#FFFFFF';
  const borderColor = topic.status === 'locked' ? '#E2E8F0' : bgColor;
  const textColor = topic.status === 'locked' ? '#94A3B8' : '#FFFFFF';

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1',
          background: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        {topic.status === 'completed' && <Check size={20} style={{ color: textColor }} />}
        {topic.status === 'active' && <Target size={20} style={{ color: textColor }} />}
        {topic.status === 'locked' && <Lock size={20} style={{ color: textColor }} />}
        <span style={{ fontSize: 11, color: textColor, fontWeight: 600, marginTop: 4 }}>
          {topic.id}
        </span>
        {topic.status === 'active' && (
          <div
            style={{
              position: 'absolute',
              top: -8,
              background: '#4F46E5',
              color: '#FFFFFF',
              fontSize: 9,
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Current
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            padding: 12,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            width: 200,
            zIndex: 30,
            fontFamily: FF,
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid #FFFFFF',
            }}
          />
          <p style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>
            {topic.name}
          </p>
          {topic.status === 'completed' && (
            <>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>
                Best: {topic.bestScore}%
              </p>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>
                Attempts: {topic.attempts}
              </p>
              <p style={{ fontSize: 12, color: '#64748B' }}>
                Last: {topic.lastPractised}
              </p>
            </>
          )}
          {topic.status === 'active' && (
            <>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 4 }}>
                Best: {topic.bestScore}%
              </p>
              <p style={{ fontSize: 12, color: '#64748B' }}>
                Target: 85% to pass
              </p>
            </>
          )}
          {topic.status === 'locked' && (
            <p style={{ fontSize: 12, color: '#64748B' }}>
              Complete Topic {topic.id - 1} to unlock
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════
   STICKY FLOATING CTA
══════════════════════════════════════════════ */
function StickyFloatingCTA({ topicName, onDismiss }: { topicName: string; onDismiss: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        padding: '12px 20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        zIndex: 50,
        fontFamily: FF,
        minWidth: 280,
      }}
    >
      <button
        onClick={onDismiss}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          background: 'none',
          border: 'none',
          color: '#94A3B8',
          cursor: 'pointer',
          padding: 4,
        }}
      >
        <X size={14} />
      </button>
      <Button
        style={{
          width: '100%',
          height: 48,
          background: '#4F46E5',
          color: '#FFFFFF',
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
        }}
        className="hover:bg-[#4338CA]"
      >
        Continue {topicName} →
      </Button>
      <p style={{ fontSize: 12, color: '#64748B', textAlign: 'center' }}>
        Emma's current topic
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   CHILD DETAIL VIEW
══════════════════════════════════════════════ */
export function ChildDetailView() {
  const [activeSubject, setActiveSubject] = useState('Maths');
  const [showStickyCTA, setShowStickyCTA] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterSubject, setFilterSubject] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Mock data
  const childName = 'Emma Thompson';
  const firstName = 'Emma';
  const year = 'Year 5';
  const region = 'Kent';
  const streak = 5;
  const schools = ['Tonbridge Grammar School', 'Invicta Grammar School'];
  const currentTopic = 'Topic 8 — Sequences';

  const subjects = [
    { name: 'Maths', progress: 35, color: '#4F46E5' },
    { name: 'English', progress: 45, color: '#10B981' },
    { name: 'Verbal Reasoning', progress: 25, color: '#F59E0B' },
    { name: 'Non-Verbal Reasoning', progress: 20, color: '#EF4444' },
  ];

  const topics: Topic[] = Array.from({ length: 20 }, (_, i) => {
    const id = i + 1;
    if (id <= 7) {
      return {
        id,
        name: `Topic ${id}`,
        status: 'completed',
        bestScore: 85 + Math.floor(Math.random() * 15),
        attempts: Math.floor(Math.random() * 3) + 1,
        lastPractised: `${Math.floor(Math.random() * 5) + 1} days ago`,
      };
    } else if (id === 8) {
      return { id, name: 'Sequences', status: 'active', bestScore: 70, attempts: 2 };
    } else {
      return { id, name: `Topic ${id}`, status: 'locked' };
    }
  });

  const testHistory: TestRecord[] = [
    { date: '09 Dec', subject: 'Maths', topic: 'Topic 7: Basic Algebra', score: '18/20 (90%)', rawScore: 90, time: '22 min' },
    { date: '08 Dec', subject: 'Maths', topic: 'Topic 7: Basic Algebra', score: '14/20 (70%)', rawScore: 70, time: '25 min' },
    { date: '07 Dec', subject: 'Maths', topic: 'Topic 6: Fractions', score: '20/20 (100%)', rawScore: 100, time: '18 min' },
    { date: '06 Dec', subject: 'English', topic: 'Topic 5: Comprehension', score: '16/20 (80%)', rawScore: 80, time: '30 min' },
    { date: '05 Dec', subject: 'Maths', topic: 'Topic 5: Decimals', score: '17/20 (85%)', rawScore: 85, time: '20 min' },
  ];

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
              <span style={{ fontSize: 8, color: '#A5B4FC', fontWeight: 500, letterSpacing: '0.05em' }}>
                LOGO
              </span>
            </div>
            <span style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 600 }}>Kyros</span>
          </Link>

          {!isMobile && (
            <nav style={{ display: 'flex', gap: 32 }}>
              <Link to="/parent" style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 500, textDecoration: 'none', borderBottom: '2px solid #FFFFFF', paddingBottom: 4 }}>Dashboard</Link>
              <Link to="/settings" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Settings</Link>
              <Link to="/parent/billing" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Billing</Link>
            </nav>
          )}

          {!isMobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #4F46E5, #818CF8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>S</div>
              <span style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 500 }}>Sarah</span>
              <ChevronDown size={16} style={{ color: '#FFFFFF' }} />
            </div>
          ) : (
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#FFFFFF' }}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {isMobile && mobileMenuOpen && (
          <div style={{ background: '#1E1B4B', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '12px 24px 20px' }}>
            {[{ label: 'Dashboard', path: '/parent' }, { label: 'Settings', path: '/settings' }, { label: 'Billing', path: '/parent/billing' }].map(({ label, path }) => (
              <Link key={label} to={path} onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', color: 'rgba(255,255,255,0.8)', fontSize: 15, textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div style={{ padding: isMobile ? '24px 16px' : '48px 24px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* BREADCRUMB */}
          <div style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>
            <Link to="/parent" style={{ color: '#64748B', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#1E293B', fontWeight: 500 }}>{childName}</span>
          </div>

          {/* SECTION 1: CHILD PROFILE CARD */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: isMobile ? 20 : 32,
              marginBottom: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'flex-start',
              gap: isMobile ? 16 : 0,
            }}
          >
            <div style={{ display: 'flex', gap: 20 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  flexShrink: 0,
                }}
              >
                E
              </div>
              <div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E293B', marginBottom: 6 }}>
                  {childName}
                </h2>
                <p style={{ fontSize: 14, color: '#64748B', marginBottom: 10 }}>
                  {year} · {region}
                </p>
                <div
                  style={{
                    background: '#FEF3C7',
                    color: '#92400E',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 20,
                    display: 'inline-block',
                    marginBottom: 12,
                  }}
                >
                  🔥 {streak}-day learning streak
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {schools.map((school) => (
                    <div
                      key={school}
                      style={{
                        background: '#EEF2FF',
                        color: '#4F46E5',
                        fontSize: 13,
                        fontWeight: 500,
                        padding: '4px 12px',
                        borderRadius: 20,
                      }}
                    >
                      {school}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 12, alignItems: isMobile ? 'stretch' : 'flex-start' }}>
              <Button
                style={{
                  height: 48,
                  background: '#4F46E5',
                  color: '#FFFFFF',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
                className="hover:bg-[#4338CA]"
              >
                Continue Practice →
              </Button>
              <Button variant="ghost" style={{ height: 48, fontSize: 15, fontWeight: 600 }}>Edit Profile</Button>
              <OverflowMenu childName={firstName} onReset={() => console.log('Reset')} onArchive={() => console.log('Archive')} />
            </div>
          </div>

          {/* SECTION 2: NEXT RECOMMENDED STEP */}
          <div
            style={{
              background: '#EEF2FF',
              borderLeft: '4px solid #4F46E5',
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#4F46E5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}
            >
              Next Recommended Step
            </p>
            <p style={{ fontSize: 16, color: '#1E293B', marginBottom: 8 }}>
              {firstName} is ready to continue with:
            </p>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#4F46E5', marginBottom: 8 }}>
              {currentTopic}
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 4 }}>
              Maths · Estimated practice time: 20 min · Medium difficulty
            </p>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              {firstName}'s best: 70% — target is 85% to pass
            </p>
            <Button
              style={{
                width: '100%',
                height: 48,
                background: '#4F46E5',
                color: '#FFFFFF',
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 600,
                marginBottom: 8,
              }}
              className="hover:bg-[#4338CA]"
            >
              Continue Practice →
            </Button>
            <p style={{ fontSize: 13, color: '#4F46E5', textAlign: 'center', cursor: 'pointer' }}>
              Resume where {firstName} left off
            </p>
          </div>

          {/* SECTION 3: LEARNING PATH PROGRESS */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: 32,
              marginBottom: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            {/* Subject Tabs */}
            <div style={{ display: 'flex', gap: isMobile ? 12 : 24, marginBottom: 24, borderBottom: '2px solid #F1F5F9', overflowX: 'auto' }}>
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => setActiveSubject(subject.name)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 0',
                    fontSize: 15,
                    fontWeight: activeSubject === subject.name ? 700 : 500,
                    color: activeSubject === subject.name ? '#4F46E5' : '#64748B',
                    borderBottom: activeSubject === subject.name ? '2px solid #4F46E5' : 'none',
                    cursor: 'pointer',
                    marginBottom: -2,
                    fontFamily: FF,
                  }}
                >
                  {subject.name} <span style={{ fontSize: 12, color: '#94A3B8' }}>· {subject.progress}%</span>
                </button>
              ))}
            </div>

            {/* Progress Summary */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontSize: 15, color: '#1E293B', fontWeight: 600, marginBottom: 8 }}>
                7 of 20 topics completed — 35%
              </p>
              <div
                style={{
                  height: 8,
                  background: '#E2E8F0',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: '35%',
                    height: '100%',
                    background: '#4F46E5',
                    borderRadius: 4,
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <p style={{ fontSize: 13, color: '#64748B' }}>
                  ~6 weeks remaining at current pace
                </p>
                <Info
                  size={14}
                  style={{ color: '#94A3B8', cursor: 'pointer' }}
                  title="Based on Emma's average of 1.2 topics per week over the last 4 weeks. Pace may vary."
                />
              </div>
            </div>

            {/* Topic Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                gap: 12,
              }}
            >
              {topics.map((topic) => (
                <TopicCell key={topic.id} topic={topic} />
              ))}
            </div>
          </div>

          {/* SECTIONS 4 & 5: 2-COLUMN LAYOUT */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: 24, marginBottom: 24 }}>
            {/* SECTION 4: EXAM READINESS */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 16,
                padding: 32,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                Exam Readiness
              </h3>
              <p style={{ fontSize: 12, color: '#64748B', marginBottom: 24 }}>
                Updated based on recent practice and diagnostics
              </p>

              {/* Circular Progress */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <div
                  style={{
                    width: 120,
                    height: 120,
                    margin: '0 auto',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth="10"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      fill="none"
                      stroke="#4F46E5"
                      strokeWidth="10"
                      strokeDasharray={`${2 * Math.PI * 52 * 0.72} ${2 * Math.PI * 52}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{ position: 'absolute' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#1E293B' }}>72%</div>
                    <div style={{ fontSize: 12, color: '#64748B' }}>Ready</div>
                  </div>
                </div>
              </div>

              {/* Strong & Weak Areas */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                    Strong Areas
                  </p>
                  <div style={{ fontSize: 13, color: '#10B981' }}>
                    <p style={{ marginBottom: 4 }}>✔ Algebra</p>
                    <p>✔ Vocabulary</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                    Needs Attention
                  </p>
                  <div style={{ fontSize: 13, color: '#EF4444' }}>
                    <p style={{ marginBottom: 4 }}>• Fractions</p>
                    <p>• Non-Verbal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 5: PERFORMANCE METRICS */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 16,
                padding: 32,
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                Score Trend — Last 20 Tests
              </h3>

              {/* Simple trend indicator */}
              <div
                style={{
                  background: '#F8FAFC',
                  borderRadius: 8,
                  padding: 24,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                }}
              >
                <TrendingUp size={32} style={{ color: '#10B981' }} />
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#1E293B' }}>68% → 90%</div>
                  <div style={{ fontSize: 13, color: '#64748B' }}>Last 20 tests</div>
                </div>
              </div>

              {/* Insight */}
              <div
                style={{
                  background: '#EEF2FF',
                  borderLeft: '3px solid #4F46E5',
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 24,
                }}
              >
                <p style={{ fontSize: 13, color: '#4F46E5' }}>
                  {firstName}'s average Maths score improved from 68% → 90% over her last 20 tests. 📈
                </p>
              </div>

              {/* Subject Breakdown */}
              <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1E293B', marginBottom: 12 }}>
                Subject Breakdown
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {subjects.map((subject) => (
                  <div key={subject.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 100, fontSize: 13, color: '#64748B' }}>{subject.name}</div>
                    <div style={{ flex: 1, height: 8, background: '#E2E8F0', borderRadius: 4, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${subject.progress}%`,
                          height: '100%',
                          background: subject.color,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                    <div style={{ width: 40, fontSize: 13, fontWeight: 600, color: '#1E293B', textAlign: 'right' }}>
                      {subject.progress}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Insight */}
              <div
                style={{
                  background: '#EEF2FF',
                  borderLeft: '3px solid #4F46E5',
                  borderRadius: 8,
                  padding: 12,
                }}
              >
                <p style={{ fontSize: 13, color: '#4F46E5' }}>
                  Fractions and Non-Verbal Reasoning need the most attention this week.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 6: TEST HISTORY */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 16,
              padding: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 20 }}>
              Test History
            </h3>

            {/* Controls */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ position: 'relative', width: 280 }}>
                  <Search
                    size={16}
                    style={{
                      position: 'absolute',
                      left: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#94A3B8',
                    }}
                  />
                  <Input
                    type="text"
                    placeholder="Search by topic or subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      height: 40,
                      paddingLeft: 40,
                      fontSize: 14,
                      border: '1px solid #E2E8F0',
                      borderRadius: 8,
                    }}
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    height: 40,
                    padding: '0 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: FF,
                    cursor: 'pointer',
                  }}
                >
                  <option value="date">Sort by Date</option>
                  <option value="score">Sort by Score</option>
                </select>
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  style={{
                    height: 40,
                    padding: '0 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: 8,
                    fontSize: 14,
                    fontFamily: FF,
                    cursor: 'pointer',
                  }}
                >
                  <option value="all">All Subjects</option>
                  <option value="maths">Maths</option>
                  <option value="english">English</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Button variant="ghost" style={{ fontSize: 13 }}>
                  ↓ Export CSV
                </Button>
                <Button variant="ghost" style={{ fontSize: 13 }} title="Coming soon">
                  ↓ Export PDF
                </Button>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                      Date
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                      Subject
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                      Topic
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                      Score
                    </th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#64748B' }}>
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((test, i) => (
                    <tr
                      key={i}
                      style={{ borderBottom: '1px solid #F1F5F9' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#EEF2FF')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{test.date}</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{test.subject}</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#475569' }}>{test.topic}</td>
                      <td
                        style={{
                          padding: '12px 16px',
                          fontSize: 14,
                          color: test.rawScore >= 85 ? '#10B981' : test.rawScore < 70 ? '#EF4444' : '#64748B',
                          fontWeight: 600,
                        }}
                      >
                        {test.score} {test.rawScore === 100 && '🎉'} {test.rawScore >= 85 && test.rawScore < 100 && '✓'}
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 14, color: '#64748B' }}>{test.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Button variant="ghost" style={{ fontSize: 15 }}>
                Load More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY FLOATING CTA */}
      {showStickyCTA && (
        <StickyFloatingCTA
          topicName="Topic 8"
          onDismiss={() => setShowStickyCTA(false)}
        />
      )}
    </div>
  );
}
