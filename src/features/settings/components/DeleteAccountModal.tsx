import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
import { Label } from '../../../app/components/ui/label';

type Content = {
  title: string;
  description: string;
  inputLabel: string;
  inputPlaceholder: string;
  confirmKeyword: string;
  cancelLabel: string;
  confirmLabel: string;
};

type Props = {
  content: Content;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteAccountModal({ content, onClose, onConfirm }: Props) {
  const [confirmText, setConfirmText] = useState('');
  const canDelete = confirmText === content.confirmKeyword;

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
          maxWidth: 520,
          padding: 32,
          boxShadow: 'var(--shadow-soft)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <AlertCircle size={32} style={{ color: 'var(--danger)', margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 12 }}>
            {content.title}
          </h3>
          <p style={{ fontSize: 15, color: 'var(--text-body)', lineHeight: 1.6, textAlign: 'left' }}>
            {content.description}
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <Label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-heading)', display: 'block', marginBottom: 7 }}>
            {content.inputLabel}
          </Label>
          <Input
            type="text"
            placeholder={content.inputPlaceholder}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="h-12 rounded-[8px] border-border-subtle"
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1, height: 48, fontSize: 15 }}>
            {content.cancelLabel}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!canDelete}
            style={{
              flex: 1,
              height: 48,
              background: canDelete ? 'var(--danger)' : 'var(--border-subtle)',
              color: canDelete ? 'var(--danger-foreground)' : 'var(--text-subtle)',
              cursor: canDelete ? 'pointer' : 'not-allowed',
              fontSize: 15,
              fontWeight: 600,
            }}
            className={canDelete ? 'hover:opacity-90' : ''}
          >
            {content.confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
