import { useState } from 'react';
import type { NotificationPrefs } from '../types';

type NotifItem = {
  key: string;
  label: string;
  sublabel: string;
  disabled: boolean;
  disabledTitle: string;
};

type NotifGroup = {
  title: string;
  items: readonly NotifItem[];
};

type NotificationsContent = {
  sectionLabel: string;
  groups: readonly NotifGroup[];
};

type Props = {
  isMobile: boolean;
  content: NotificationsContent;
};

export function NotificationsTab({ isMobile, content }: Props) {
  const [notifications, setNotifications] = useState<NotificationPrefs>({
    topicComplete: true,
    inactivity: false,
    weeklySummary: true,
    milestones: true,
    trialExpiry: true,
  });

  function toggle(key: keyof NotificationPrefs) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

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

      {content.groups.map((group, gi) => (
        <div key={group.title} style={{ marginBottom: gi < content.groups.length - 1 ? 32 : 0 }}>
          <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 16 }}>
            {group.title}
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {group.items.map((item) => (
              <div
                key={item.key}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
              >
                <div>
                  <p style={{ fontSize: 14, color: 'var(--text-heading)', marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.sublabel}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof NotificationPrefs]}
                  onChange={() =>
                    !item.disabled && toggle(item.key as keyof NotificationPrefs)
                  }
                  disabled={item.disabled}
                  title={item.disabledTitle || undefined}
                  style={{
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    width: 44,
                    height: 24,
                    opacity: item.disabled ? 0.5 : 1,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
