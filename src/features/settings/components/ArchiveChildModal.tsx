import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../../../app/components/ui/button';

type Content = {
  descriptionSuffix: string;
  checkboxPrefix: string;
  checkboxSuffix: string;
  cancelLabel: string;
  confirmLabel: string;
};

type Props = {
  childName: string;
  content: Content;
  onClose: () => void;
  onConfirm: () => void;
};

export function ArchiveChildModal({ childName, content, onClose, onConfirm }: Props) {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface-raised)',
          borderRadius: 16,
          maxWidth: 480,
          padding: 32,
          boxShadow: 'var(--shadow-soft)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <AlertCircle size={32} style={{ color: 'var(--warning)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 12 }}>
            Archive {childName}'s profile?
          </h3>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.6, textAlign: 'left' }}>
            {childName}{content.descriptionSuffix}
          </p>
        </div>

        <label
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
            padding: 16,
            background: 'var(--surface-subtle)',
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
          <span style={{ fontSize: 14, color: 'var(--text-body)' }}>
            {content.checkboxPrefix}{childName}{content.checkboxSuffix}
          </span>
        </label>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1, height: 48, fontSize: 15 }}>
            {content.cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!confirmed}
            style={{
              flex: 1,
              height: 48,
              background: confirmed ? 'var(--danger)' : 'var(--border-subtle)',
              color: confirmed ? 'var(--danger-foreground)' : 'var(--text-subtle)',
              cursor: confirmed ? 'pointer' : 'not-allowed',
              fontSize: 15,
              fontWeight: 600,
            }}
            className={confirmed ? 'hover:opacity-90' : ''}
          >
            {content.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
