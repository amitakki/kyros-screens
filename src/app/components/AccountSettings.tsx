import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronDown, Eye, EyeOff, AlertCircle, Archive, X, ExternalLink, Chrome, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useIsMobile } from './hooks/useIsMobile';

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
  schools: number;
  lastActive: string;
  diagnosticPending?: boolean;
}

type Tab = 'profile' | 'children' | 'notifications' | 'password' | 'privacy';
type AccountType = 'google' | 'email';

/* ══════════════════════════════════════════════
   ARCHIVE CHILD MODAL
══════════════════════════════════════════════ */
function ArchiveChildModal({ childName, onClose, onConfirm }: { childName: string; onClose: () => void; onConfirm: () => void }) {
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
            Archive {childName}'s profile?
          </h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, textAlign: 'left' }}>
            {childName}'s profile will be archived for 30 days. During this time, you can restore it from this page.
            After 30 days, all data is permanently deleted including: learning progress · scores and reports ·
            diagnostic results · target schools
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
            I understand {childName}'s profile will be archived and permanently deleted after 30 days
          </span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1, height: 48, fontSize: 15 }}>
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
            Archive Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DELETE ACCOUNT MODAL
══════════════════════════════════════════════ */
function DeleteAccountModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  const [confirmText, setConfirmText] = useState('');
  const canDelete = confirmText === 'DELETE';

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
          maxWidth: 520,
          padding: 32,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <AlertCircle size={32} style={{ color: '#EF4444', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
            Delete your Kyros account?
          </h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, textAlign: 'left' }}>
            This will immediately deactivate your account. All data will be permanently deleted after 30 days.
            Your subscription will be cancelled with no refund for the remaining billing period.
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
            Type DELETE to confirm
          </Label>
          <Input
            type="text"
            placeholder="DELETE"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="h-12 rounded-[8px] border-[#E2E8F0]"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1, height: 48, fontSize: 15 }}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!canDelete}
            style={{
              flex: 1,
              height: 48,
              background: canDelete ? '#EF4444' : '#E2E8F0',
              color: canDelete ? '#FFFFFF' : '#94A3B8',
              cursor: canDelete ? 'pointer' : 'not-allowed',
              fontSize: 15,
              fontWeight: 600,
            }}
            className={canDelete ? 'hover:bg-[#DC2626]' : ''}
          >
            Delete My Account
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   STICKY SAVE BAR
══════════════════════════════════════════════ */
function StickySaveBar({ onSave, onDiscard }: { onSave: () => void; onDiscard: () => void }) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: '#FFFFFF',
        borderTop: '1px solid #E2E8F0',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: FF,
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <p style={{ fontSize: 14, color: '#475569' }}>You have unsaved changes</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="ghost" onClick={onDiscard} style={{ height: 40 }}>
          Discard
        </Button>
        <Button
          onClick={onSave}
          style={{
            height: 40,
            background: '#4F46E5',
            color: '#FFFFFF',
            paddingLeft: 24,
            paddingRight: 24,
          }}
          className="hover:bg-[#4338CA]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   ACCOUNT SETTINGS
══════════════════════════════════════════════ */
export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [accountType] = useState<AccountType>('google'); // or 'email'
  const [hasChanges, setHasChanges] = useState(false);
  const [archiveChildId, setArchiveChildId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Profile state
  const [fullName, setFullName] = useState('Sarah Thompson');
  const [email] = useState('sarah.thompson@gmail.com');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState({
    topicComplete: true,
    inactivity: false,
    weeklySummary: true,
    milestones: true,
    trialExpiry: true,
  });

  const children: Child[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      firstName: 'Emma',
      year: 'Year 5',
      region: 'Kent',
      schools: 2,
      lastActive: '2h ago',
    },
    {
      id: '2',
      name: 'Sophie Thompson',
      firstName: 'Sophie',
      year: 'Year 4',
      region: 'Kent',
      schools: 0,
      lastActive: 'yesterday',
      diagnosticPending: true,
    },
  ];

  const childToArchive = children.find((c) => c.id === archiveChildId);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
    // Show toast: "Preferences updated ✓"
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
              <Link to="/parent" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
              <Link to="/settings" style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 500, textDecoration: 'none', borderBottom: '2px solid #FFFFFF', paddingBottom: 4 }}>Settings</Link>
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
            {[{ label: 'Dashboard', path: '/parent' }, { label: 'Settings', path: '/settings', active: true }, { label: 'Billing', path: '/parent/billing' }].map(({ label, path, active }) => (
              <Link key={label} to={path} onClick={() => setMobileMenuOpen(false)}
                style={{ display: 'block', color: active ? '#FFFFFF' : 'rgba(255,255,255,0.7)', fontSize: 15, textDecoration: 'none', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontWeight: active ? 600 : 400 }}>{label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div style={{ padding: isMobile ? '24px 16px' : '48px 24px' }}>
        <div className="max-w-[1280px] mx-auto">
          {/* PAGE TITLE */}
          <div style={{ marginBottom: isMobile ? 24 : 40 }}>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Account Settings
            </h2>
            <p style={{ fontSize: 15, color: '#64748B' }}>
              Manage your account, children, and learning preferences.
            </p>
          </div>

          {/* MOBILE: horizontal scroll tab strip */}
          {isMobile && (
            <div
              style={{
                overflowX: 'auto',
                display: 'flex',
                gap: 0,
                marginBottom: 20,
                borderBottom: '2px solid #E2E8F0',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {[
                { id: 'profile' as Tab, label: 'Profile' },
                { id: 'children' as Tab, label: 'Children' },
                { id: 'notifications' as Tab, label: 'Notifications' },
                { id: 'password' as Tab, label: 'Security' },
                { id: 'privacy' as Tab, label: 'Privacy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flexShrink: 0,
                    padding: '10px 16px',
                    border: 'none',
                    borderBottom: activeTab === tab.id ? '2px solid #4F46E5' : '2px solid transparent',
                    marginBottom: -2,
                    background: 'transparent',
                    fontSize: 14,
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? '#4F46E5' : '#64748B',
                    cursor: 'pointer',
                    fontFamily: FF,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {/* 2-COLUMN LAYOUT (desktop) / single column (mobile) */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 32, alignItems: 'flex-start' }}>
            {/* SIDEBAR — desktop only */}
            {!isMobile && (
            <div
              style={{
                width: 240,
                flexShrink: 0,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 16,
                padding: 8,
                position: 'sticky',
                top: 120,
              }}
            >
              {[
                { id: 'profile' as Tab, label: 'Profile' },
                { id: 'children' as Tab, label: 'Your Children' },
                { id: 'notifications' as Tab, label: 'Notifications' },
                { id: 'password' as Tab, label: 'Password & Security' },
                { id: 'privacy' as Tab, label: 'Data & Privacy' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: 'none',
                    borderLeft: activeTab === tab.id ? '4px solid #4F46E5' : '4px solid transparent',
                    background: activeTab === tab.id ? '#EEF2FF' : 'transparent',
                    textAlign: 'left',
                    fontSize: 15,
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? '#4F46E5' : '#475569',
                    cursor: 'pointer',
                    borderRadius: 8,
                    fontFamily: FF,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) e.currentTarget.style.background = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            )}

            {/* CONTENT AREA */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* TAB 1: PROFILE */}
              {activeTab === 'profile' && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: isMobile ? 20 : 40,
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
                      marginBottom: 32,
                    }}
                  >
                    Your Profile
                  </p>

                  <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 24 : 40, marginBottom: 40 }}>
                    {/* Avatar */}
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 36,
                          fontWeight: 700,
                          color: '#FFFFFF',
                          marginBottom: 12,
                        }}
                      >
                        S
                      </div>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#4F46E5',
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'block',
                          marginBottom: 4,
                        }}
                      >
                        Change Photo
                      </button>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: 'pointer',
                          display: 'block',
                        }}
                      >
                        Remove Photo
                      </button>
                    </div>

                    {/* Form */}
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 20 }}>
                        <Label htmlFor="fullname" style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
                          Full Name <span style={{ color: '#EF4444' }}>*</span>
                        </Label>
                        <Input
                          id="fullname"
                          type="text"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            setHasChanges(true);
                          }}
                          className="h-12 rounded-[8px] border-[#E2E8F0]"
                        />
                      </div>

                      <div>
                        <Label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
                          Email Address
                        </Label>
                        {accountType === 'google' ? (
                          <>
                            <div style={{ position: 'relative' }}>
                              <Input
                                type="email"
                                value={email}
                                readOnly
                                className="h-12 rounded-[8px] bg-[#F8FAFC] border-[#E2E8F0]"
                                style={{ cursor: 'not-allowed' }}
                              />
                              <div
                                style={{
                                  position: 'absolute',
                                  right: 14,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: '#FFFFFF',
                                  border: '1px solid #E2E8F0',
                                  borderRadius: 6,
                                  padding: '4px 10px',
                                  fontSize: 12,
                                  color: '#4F46E5',
                                  fontWeight: 500,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6,
                                }}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Connected with Google
                              </div>
                            </div>
                            <p style={{ fontSize: 12, color: '#64748B', marginTop: 6 }}>
                              Google account — email cannot be changed here. Manage your email through your Google account.
                            </p>
                          </>
                        ) : (
                          <>
                            <div style={{ position: 'relative' }}>
                              <Input
                                type="email"
                                value={email}
                                className="h-12 rounded-[8px] border-[#E2E8F0]"
                              />
                              <button
                                style={{
                                  position: 'absolute',
                                  right: 14,
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: 'none',
                                  border: 'none',
                                  color: '#4F46E5',
                                  fontSize: 13,
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                }}
                              >
                                Change Email
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {hasChanges && (
                    <StickySaveBar
                      onSave={() => {
                        setHasChanges(false);
                        // Save logic
                      }}
                      onDiscard={() => {
                        setFullName('Sarah Thompson');
                        setHasChanges(false);
                      }}
                    />
                  )}
                </div>
              )}

              {/* TAB 2: YOUR CHILDREN */}
              {activeTab === 'children' && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: isMobile ? 20 : 40,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#94A3B8',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Your Children
                    </p>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: 14, color: '#475569', marginBottom: 4 }}>
                        {children.length} of 5 child profiles used
                      </p>
                      <div
                        style={{
                          width: 200,
                          height: 6,
                          background: '#E2E8F0',
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${(children.length / 5) * 100}%`,
                            height: '100%',
                            background: '#4F46E5',
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                    {children.map((child) => (
                      <div
                        key={child.id}
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          borderRadius: 12,
                          padding: 20,
                          display: 'flex',
                          flexDirection: isMobile ? 'column' : 'row',
                          justifyContent: 'space-between',
                          alignItems: isMobile ? 'flex-start' : 'center',
                          gap: isMobile ? 16 : 0,
                        }}
                      >
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <div
                            style={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 16,
                              fontWeight: 700,
                              color: '#FFFFFF',
                            }}
                          >
                            {child.firstName[0]}
                          </div>
                          <div>
                            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 4 }}>
                              {child.name}
                            </h4>
                            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 6 }}>
                              {child.year} · {child.region}
                            </p>
                            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                              {child.diagnosticPending ? (
                                <div
                                  style={{
                                    background: '#FEF3C7',
                                    color: '#92400E',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    padding: '2px 10px',
                                    borderRadius: 12,
                                  }}
                                >
                                  Diagnostic pending
                                </div>
                              ) : (
                                <div
                                  style={{
                                    background: '#EEF2FF',
                                    color: '#4F46E5',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    padding: '2px 10px',
                                    borderRadius: 12,
                                  }}
                                >
                                  {child.schools} target schools
                                </div>
                              )}
                              <span style={{ fontSize: 12, color: '#94A3B8' }}>
                                Last active {child.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
                          <Button variant="outline" style={{ height: 40, fontSize: 14, flex: isMobile ? 1 : 'none' }}>
                            Edit Profile
                          </Button>
                          <Button variant="outline" style={{ height: 40, fontSize: 14, flex: isMobile ? 1 : 'none' }}>
                            Manage Schools
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setArchiveChildId(child.id)}
                            style={{ height: 40, color: '#EF4444', fontSize: 14 }}
                          >
                            🗑 Archive
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {children.length < 5 && (
                    <>
                      <Link to="/onboarding/create-child?childNumber=3" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="outline"
                          style={{
                            width: '100%',
                            height: 48,
                            fontSize: 15,
                            fontWeight: 600,
                            borderStyle: 'dashed',
                          }}
                        >
                          + Add Child Profile
                        </Button>
                      </Link>
                      <p style={{ fontSize: 12, color: '#64748B', marginTop: 8, textAlign: 'center' }}>
                        Each child gets a separate learning path and progress dashboard.
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* TAB 3: NOTIFICATIONS */}
              {activeTab === 'notifications' && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: isMobile ? 20 : 40,
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
                      marginBottom: 32,
                    }}
                  >
                    Notification Preferences
                  </p>

                  {/* Practice Updates */}
                  <div style={{ marginBottom: 32 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                      Practice Updates
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 14, color: '#1E293B', marginBottom: 4 }}>
                            Email when a child completes a topic
                          </p>
                          <p style={{ fontSize: 12, color: '#64748B' }}>
                            Sent after each topic is finished
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.topicComplete}
                          onChange={() => handleNotificationToggle('topicComplete')}
                          style={{ cursor: 'pointer', width: 44, height: 24 }}
                        />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <p style={{ fontSize: 14, color: '#1E293B', marginBottom: 4 }}>
                            Alert when a child hasn't practised for 3+ days
                          </p>
                          <p style={{ fontSize: 12, color: '#64748B' }}>
                            A gentle nudge to keep momentum
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications.inactivity}
                          onChange={() => handleNotificationToggle('inactivity')}
                          style={{ cursor: 'pointer', width: 44, height: 24 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Weekly Insights */}
                  <div style={{ marginBottom: 32 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                      Weekly Insights
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 14, color: '#1E293B', marginBottom: 4 }}>
                          Weekly progress summary email
                        </p>
                        <p style={{ fontSize: 12, color: '#64748B' }}>
                          Every Monday — overview of the past week
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.weeklySummary}
                        onChange={() => handleNotificationToggle('weeklySummary')}
                        style={{ cursor: 'pointer', width: 44, height: 24 }}
                      />
                    </div>
                  </div>

                  {/* Milestones */}
                  <div style={{ marginBottom: 32 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                      Milestones & Achievements
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 14, color: '#1E293B', marginBottom: 4 }}>
                          Milestone achievements
                        </p>
                        <p style={{ fontSize: 12, color: '#64748B' }}>
                          When a child reaches 50% or 100% of their path
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.milestones}
                        onChange={() => handleNotificationToggle('milestones')}
                        style={{ cursor: 'pointer', width: 44, height: 24 }}
                      />
                    </div>
                  </div>

                  {/* Account */}
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 16 }}>
                      Account & Billing
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <p style={{ fontSize: 14, color: '#1E293B', marginBottom: 4 }}>
                          Trial expiry reminders 🔒
                        </p>
                        <p style={{ fontSize: 12, color: '#64748B' }}>
                          Sent on day 5–6 of your free trial
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications.trialExpiry}
                        disabled
                        style={{ cursor: 'not-allowed', width: 44, height: 24, opacity: 0.5 }}
                        title="Trial reminders are always sent during your trial"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: PASSWORD & SECURITY */}
              {activeTab === 'password' && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: isMobile ? 20 : 40,
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
                      marginBottom: 32,
                    }}
                  >
                    Password & Security
                  </p>

                  {accountType === 'google' ? (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <p style={{ fontSize: 16, color: '#475569', marginBottom: 8 }}>
                        Your account is secured by Google.
                      </p>
                      <p style={{ fontSize: 14, color: '#64748B', marginBottom: 24 }}>
                        Password management is handled through your Google account. Visit myaccount.google.com to update your security settings.
                      </p>
                      <Button
                        variant="outline"
                        style={{ height: 48, paddingLeft: 24, paddingRight: 24, fontSize: 15 }}
                      >
                        Open Google Account Settings <ExternalLink size={16} style={{ marginLeft: 8 }} />
                      </Button>
                    </div>
                  ) : (
                    <div style={{ maxWidth: 480 }}>
                      <div style={{ marginBottom: 20 }}>
                        <Label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
                          Current Password <span style={{ color: '#EF4444' }}>*</span>
                        </Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="h-12 rounded-[8px] border-[#E2E8F0] pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            style={{
                              position: 'absolute',
                              right: 14,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#94A3B8',
                            }}
                          >
                            {showCurrentPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: 20 }}>
                        <Label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
                          New Password <span style={{ color: '#EF4444' }}>*</span>
                        </Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="h-12 rounded-[8px] border-[#E2E8F0] pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            style={{
                              position: 'absolute',
                              right: 14,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#94A3B8',
                            }}
                          >
                            {showNewPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                      </div>

                      <div style={{ marginBottom: 24 }}>
                        <Label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 7 }}>
                          Confirm New Password <span style={{ color: '#EF4444' }}>*</span>
                        </Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="h-12 rounded-[8px] border-[#E2E8F0] pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                              position: 'absolute',
                              right: 14,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: '#94A3B8',
                            }}
                          >
                            {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                          </button>
                        </div>
                        {confirmPassword && (
                          <p
                            style={{
                              fontSize: 12,
                              color: confirmPassword === newPassword ? '#10B981' : '#EF4444',
                              marginTop: 6,
                            }}
                          >
                            {confirmPassword === newPassword ? '✓ Passwords match' : '✗ Passwords don\'t match'}
                          </p>
                        )}
                      </div>

                      <Button
                        style={{
                          height: 48,
                          background: '#4F46E5',
                          color: '#FFFFFF',
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        className="hover:bg-[#4338CA]"
                      >
                        Update Password
                      </Button>
                    </div>
                  )}

                  {/* Session Management */}
                  <div style={{ borderTop: '1px solid #E2E8F0', marginTop: 40, paddingTop: 32 }}>
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
                      Active Sessions
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 16,
                        background: '#F8FAFC',
                        borderRadius: 8,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <Chrome size={20} style={{ color: '#64748B' }} />
                        <div>
                          <p style={{ fontSize: 14, color: '#1E293B', fontWeight: 500 }}>
                            Chrome on macOS — London, UK
                          </p>
                          <div
                            style={{
                              display: 'inline-block',
                              background: '#D1FAE5',
                              color: '#065F46',
                              fontSize: 11,
                              fontWeight: 600,
                              padding: '2px 8px',
                              borderRadius: 12,
                              marginTop: 4,
                            }}
                          >
                            Current session
                          </div>
                        </div>
                      </div>
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: 'pointer',
                        }}
                      >
                        Sign out all other sessions
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: DATA & PRIVACY */}
              {activeTab === 'privacy' && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: 16,
                    padding: isMobile ? 20 : 40,
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
                      marginBottom: 32,
                    }}
                  >
                    Data & Privacy
                  </p>

                  {/* GDPR Data Export */}
                  <div style={{ marginBottom: 48 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
                      Download Your Data
                    </h3>
                    <p style={{ fontSize: 14, color: '#475569', marginBottom: 20, lineHeight: 1.6 }}>
                      Download a complete copy of your account data including your profile, children's profiles, test history,
                      and learning progress. Exported as a JSON file.
                    </p>
                    <Button
                      variant="outline"
                      style={{ height: 48, fontSize: 15, fontWeight: 600 }}
                    >
                      ⬇ Download My Data
                    </Button>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 8 }}>
                      Your download will be ready within a few minutes. We'll email you a link to {email}.
                    </p>
                  </div>

                  {/* Account Deletion */}
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 32 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#EF4444', marginBottom: 12 }}>
                      Delete Account
                    </h3>
                    <p style={{ fontSize: 14, color: '#475569', marginBottom: 16, lineHeight: 1.6 }}>
                      Permanently delete your Kyros account and all associated data. Your account will be deactivated immediately
                      and all data will be permanently deleted after 30 days.
                    </p>
                    <ul style={{ fontSize: 13, color: '#EF4444', marginBottom: 24, paddingLeft: 20 }}>
                      <li style={{ marginBottom: 6 }}>Your active subscription will be cancelled</li>
                      <li style={{ marginBottom: 6 }}>All children's profiles and progress will be archived</li>
                      <li style={{ marginBottom: 6 }}>Downloaded data will remain with you</li>
                      <li>This action cannot be reversed after 30 days</li>
                    </ul>
                    <Button
                      variant="ghost"
                      onClick={() => setShowDeleteModal(true)}
                      style={{
                        height: 48,
                        border: '1px solid #EF4444',
                        color: '#EF4444',
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                      className="hover:bg-[#FEF2F2]"
                    >
                      Delete My Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {archiveChildId && childToArchive && (
        <ArchiveChildModal
          childName={childToArchive.firstName}
          onClose={() => setArchiveChildId(null)}
          onConfirm={() => {
            // Archive logic
            setArchiveChildId(null);
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            // Delete logic
            setShowDeleteModal(false);
          }}
        />
      )}
    </div>
  );
}
