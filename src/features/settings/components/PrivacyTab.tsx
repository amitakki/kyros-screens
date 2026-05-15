import { useState } from 'react';
import { Button } from '../../../app/components/ui/button';
import { settingsContent } from '../content';
import { DeleteAccountModal } from './DeleteAccountModal';

type PrivacyContent = {
  sectionLabel: string;
  downloadTitle: string;
  downloadDesc: string;
  downloadLabel: string;
  downloadNotePrefix: string;
  deleteTitle: string;
  deleteDesc: string;
  deleteWarnings: readonly string[];
  deleteLabel: string;
};

type Props = {
  isMobile: boolean;
  content: PrivacyContent;
  email: string;
};

export function PrivacyTab({ isMobile, content, email }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

      <div style={{ marginBottom: 48 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 12 }}>
          {content.downloadTitle}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-body)', marginBottom: 20, lineHeight: 1.6 }}>
          {content.downloadDesc}
        </p>
        <Button variant="outline" style={{ height: 48, fontSize: 15, fontWeight: 600 }}>
          {content.downloadLabel}
        </Button>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
          {content.downloadNotePrefix} {email}.
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--danger)', marginBottom: 12 }}>
          {content.deleteTitle}
        </h3>
        <p style={{ fontSize: 14, color: 'var(--text-body)', marginBottom: 16, lineHeight: 1.6 }}>
          {content.deleteDesc}
        </p>
        <ul style={{ fontSize: 13, color: 'var(--danger)', marginBottom: 24, paddingLeft: 20 }}>
          {content.deleteWarnings.map((warning, i) => (
            <li key={i} style={{ marginBottom: i < content.deleteWarnings.length - 1 ? 6 : 0 }}>
              {warning}
            </li>
          ))}
        </ul>
        <Button
          variant="ghost"
          onClick={() => setShowDeleteModal(true)}
          style={{
            height: 48,
            border: '1px solid var(--danger)',
            color: 'var(--danger)',
            fontSize: 15,
            fontWeight: 600,
          }}
          className="hover:bg-danger-subtle"
        >
          {content.deleteLabel}
        </Button>
      </div>

      {showDeleteModal && (
        <DeleteAccountModal
          content={settingsContent.deleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}
