import { useState } from 'react';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';
import { settingsContent } from '../content';
import { StickySaveBar } from './StickySaveBar';
import type { AccountType } from '../types';

type ProfileContent = {
  sectionLabel: string;
  avatarInitial: string;
  changePhotoLabel: string;
  removePhotoLabel: string;
  fullNameLabel: string;
  emailLabel: string;
  googleBadgeLabel: string;
  googleEmailNote: string;
  changeEmailLabel: string;
  defaultFullName: string;
};

type Props = {
  isMobile: boolean;
  content: ProfileContent;
  accountType: AccountType;
  email: string;
};

export function ProfileTab({ isMobile, content, accountType, email }: Props) {
  const [fullName, setFullName] = useState(content.defaultFullName);
  const [hasChanges, setHasChanges] = useState(false);

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

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 24 : 40,
          marginBottom: 40,
        }}
      >
        {/* Avatar */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              fontWeight: 700,
              color: 'var(--brand-foreground)',
              marginBottom: 12,
            }}
          >
            {content.avatarInitial}
          </div>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--brand)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'block',
              marginBottom: 4,
            }}
          >
            {content.changePhotoLabel}
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--danger)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'block',
            }}
          >
            {content.removePhotoLabel}
          </button>
        </div>

        {/* Form */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: 20 }}>
            <Label
              htmlFor="fullname"
              style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}
            >
              {content.fullNameLabel} <span style={{ color: 'var(--danger)' }}>*</span>
            </Label>
            <Input
              id="fullname"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setHasChanges(true);
              }}
              className="h-12 rounded-[8px] border-border-subtle"
            />
          </div>

          <div>
            <Label
              style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}
            >
              {content.emailLabel}
            </Label>
            {accountType === 'google' ? (
              <>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="email"
                    value={email}
                    readOnly
                    className="h-12 rounded-[8px] bg-surface-subtle border-border-subtle"
                    style={{ cursor: 'not-allowed' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      right: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'var(--surface-raised)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 6,
                      padding: '4px 10px',
                      fontSize: 12,
                      color: 'var(--brand)',
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
                    {content.googleBadgeLabel}
                  </div>
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  {content.googleEmailNote}
                </p>
              </>
            ) : (
              <div style={{ position: 'relative' }}>
                <Input
                  type="email"
                  value={email}
                  className="h-12 rounded-[8px] border-border-subtle"
                />
                <button
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--brand)',
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {content.changeEmailLabel}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasChanges && (
        <StickySaveBar
          content={settingsContent.saveBar}
          onSave={() => setHasChanges(false)}
          onDiscard={() => {
            setFullName(content.defaultFullName);
            setHasChanges(false);
          }}
        />
      )}
    </div>
  );
}
