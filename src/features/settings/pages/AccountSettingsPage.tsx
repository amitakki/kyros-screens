import { useState } from 'react';
import { AppHeader } from '../../../shared/components/app-shell/AppHeader';
import { ROUTES } from '../../../shared/constants/routes';
import { useIsMobile } from '../../../shared/hooks/useIsMobile';
import { settingsContent } from '../content';
import type { AccountType, Tab } from '../types';
import { ChildrenTab } from '../components/ChildrenTab';
import { NotificationsTab } from '../components/NotificationsTab';
import { PasswordTab } from '../components/PasswordTab';
import { PrivacyTab } from '../components/PrivacyTab';
import { ProfileTab } from '../components/ProfileTab';

export function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const isMobile = useIsMobile();
  const accountType: AccountType = 'google';
  const email = 'sarah.thompson@gmail.com';

  const { page, tabs } = settingsContent;

  return (
    <div className="min-h-screen bg-surface-subtle">
      <AppHeader activePath={ROUTES.settings} />

      <div style={{ padding: isMobile ? '24px 16px' : '48px 24px' }}>
        <div className="max-w-[1280px] mx-auto">
          <div style={{ marginBottom: isMobile ? 24 : 40 }}>
            <h2
              style={{
                fontSize: isMobile ? 22 : 28,
                fontWeight: 700,
                color: 'var(--text-heading)',
                marginBottom: 8,
              }}
            >
              {page.title}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>{page.description}</p>
          </div>

          {isMobile && (
            <div
              style={{
                overflowX: 'auto',
                display: 'flex',
                gap: 0,
                marginBottom: 20,
                borderBottom: '2px solid var(--border-subtle)',
              }}
            >
              {tabs.mobile.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  style={{
                    flexShrink: 0,
                    padding: '10px 16px',
                    border: 'none',
                    borderBottom:
                      activeTab === tab.id
                        ? '2px solid var(--brand)'
                        : '2px solid transparent',
                    marginBottom: -2,
                    background: 'transparent',
                    fontSize: 14,
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-muted)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: 32,
              alignItems: 'flex-start',
            }}
          >
            {!isMobile && (
              <div
                style={{
                  width: 240,
                  flexShrink: 0,
                  background: 'var(--surface-raised)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: 8,
                  position: 'sticky',
                  top: 120,
                }}
              >
                {tabs.desktop.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: 'none',
                      borderLeft:
                        activeTab === tab.id
                          ? '4px solid var(--brand)'
                          : '4px solid transparent',
                      background: activeTab === tab.id ? 'var(--brand-subtle)' : 'transparent',
                      textAlign: 'left',
                      fontSize: 15,
                      fontWeight: activeTab === tab.id ? 700 : 500,
                      color: activeTab === tab.id ? 'var(--brand)' : 'var(--text-body)',
                      cursor: 'pointer',
                      borderRadius: 8,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id)
                        e.currentTarget.style.background = 'var(--surface-subtle)';
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id)
                        e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              {activeTab === 'profile' && (
                <ProfileTab
                  isMobile={isMobile}
                  content={settingsContent.profile}
                  accountType={accountType}
                  email={email}
                />
              )}
              {activeTab === 'children' && (
                <ChildrenTab isMobile={isMobile} content={settingsContent.children} />
              )}
              {activeTab === 'notifications' && (
                <NotificationsTab isMobile={isMobile} content={settingsContent.notifications} />
              )}
              {activeTab === 'password' && (
                <PasswordTab
                  isMobile={isMobile}
                  content={settingsContent.password}
                  accountType={accountType}
                />
              )}
              {activeTab === 'privacy' && (
                <PrivacyTab
                  isMobile={isMobile}
                  content={settingsContent.privacy}
                  email={email}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
