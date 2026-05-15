import { useState } from 'react';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';
import type { AccountType } from '../types';

type PasswordContent = {
  sectionLabel: string;
  googleSecuredText: string;
  googleSecuredNote: string;
  googleSettingsLabel: string;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  confirmPasswordLabel: string;
  passwordMatchText: string;
  passwordMismatchText: string;
  updatePasswordLabel: string;
  sessionsSectionLabel: string;
  currentSessionDesc: string;
  currentSessionBadge: string;
  signOutAllLabel: string;
};

type Props = {
  isMobile: boolean;
  content: PasswordContent;
  accountType: AccountType;
};

export function PasswordTab({ isMobile, content, accountType }: Props) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const fields = [
    {
      label: content.currentPasswordLabel,
      value: currentPassword,
      setter: setCurrentPassword,
      show: showCurrent,
      onToggle: () => setShowCurrent((v) => !v),
    },
    {
      label: content.newPasswordLabel,
      value: newPassword,
      setter: setNewPassword,
      show: showNew,
      onToggle: () => setShowNew((v) => !v),
    },
    {
      label: content.confirmPasswordLabel,
      value: confirmPassword,
      setter: setConfirmPassword,
      show: showConfirm,
      onToggle: () => setShowConfirm((v) => !v),
    },
  ];

  return (
    <div
      style={{
        background: 'var(--surface-raised)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        padding: isMobile ? 20 : 40,
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'var(--text-subtle)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}
      >
        {content.sectionLabel}
      </p>

      {accountType === 'google' ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" style={{ margin: '0 auto 16px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <p style={{ fontSize: 16, color: 'var(--text-body)', marginBottom: 8 }}>
            {content.googleSecuredText}
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            {content.googleSecuredNote}
          </p>
          <Button variant="outline" style={{ height: 48, paddingLeft: 24, paddingRight: 24, fontSize: 15 }}>
            {content.googleSettingsLabel}{' '}
            <ExternalLink size={16} style={{ marginLeft: 8 }} />
          </Button>
        </div>
      ) : (
        <div style={{ maxWidth: 480 }}>
          {fields.map(({ label, value, setter, show, onToggle }, idx) => (
            <div key={label} style={{ marginBottom: idx < 2 ? 20 : 24 }}>
              <Label
                style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}
              >
                {label} <span style={{ color: 'var(--danger)' }}>*</span>
              </Label>
              <div style={{ position: 'relative' }}>
                <Input
                  type={show ? 'text' : 'password'}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="h-12 rounded-[8px] border-border-subtle pr-12"
                />
                <button
                  type="button"
                  onClick={onToggle}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-subtle)',
                  }}
                >
                  {show ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {idx === 2 && confirmPassword && (
                <p
                  style={{
                    fontSize: 12,
                    color: confirmPassword === newPassword ? 'var(--success)' : 'var(--danger)',
                    marginTop: 6,
                  }}
                >
                  {confirmPassword === newPassword
                    ? content.passwordMatchText
                    : content.passwordMismatchText}
                </p>
              )}
            </div>
          ))}
          <Button
            style={{
              height: 48,
              background: 'var(--brand)',
              color: 'var(--brand-foreground)',
              fontSize: 15,
              fontWeight: 600,
            }}
            className="hover:bg-brand-hover"
          >
            {content.updatePasswordLabel}
          </Button>
        </div>
      )}

      <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: 40, paddingTop: 32 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-subtle)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          {content.sessionsSectionLabel}
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            background: 'var(--surface-subtle)',
            borderRadius: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--text-muted)' }}>
              <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
            </svg>
            <div>
              <p style={{ fontSize: 14, color: 'var(--text-heading)', fontWeight: 500 }}>
                {content.currentSessionDesc}
              </p>
              <div
                style={{
                  display: 'inline-block',
                  background: 'var(--success-subtle)',
                  color: 'var(--success)',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 12,
                  marginTop: 4,
                }}
              >
                {content.currentSessionBadge}
              </div>
            </div>
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--danger)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {content.signOutAllLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
