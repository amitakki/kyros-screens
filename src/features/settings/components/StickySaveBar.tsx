import { Button } from '../../../app/components/ui/button';

type Content = {
  unsavedMessage: string;
  discardLabel: string;
  saveLabel: string;
};

type Props = {
  content: Content;
  onSave: () => void;
  onDiscard: () => void;
};

export function StickySaveBar({ content, onSave, onDiscard }: Props) {
  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        background: 'var(--surface-raised)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'var(--font-family-sans)',
        animation: 'slideUp 0.3s ease-out',
      }}
    >
      <p style={{ fontSize: 14, color: 'var(--text-body)' }}>{content.unsavedMessage}</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="ghost" onClick={onDiscard} style={{ height: 40 }}>
          {content.discardLabel}
        </Button>
        <Button
          onClick={onSave}
          style={{
            height: 40,
            background: 'var(--brand)',
            color: 'var(--brand-foreground)',
            paddingLeft: 24,
            paddingRight: 24,
          }}
          className="hover:bg-brand-hover"
        >
          {content.saveLabel}
        </Button>
      </div>
    </div>
  );
}
