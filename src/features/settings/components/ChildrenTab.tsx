import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../../../app/components/ui/button';
import { settingsContent } from '../content';
import { ArchiveChildModal } from './ArchiveChildModal';
import type { Child } from '../types';

const CHILDREN_DATA: Child[] = [
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

type ChildrenContent = {
  sectionLabel: string;
  maxProfiles: number;
  editLabel: string;
  manageSchoolsLabel: string;
  archiveLabel: string;
  diagnosticPendingLabel: string;
  lastActivePrefix: string;
  addChildLabel: string;
  addChildNote: string;
  addChildPath: string;
};

type Props = {
  isMobile: boolean;
  content: ChildrenContent;
};

export function ChildrenTab({ isMobile, content }: Props) {
  const [archiveChildId, setArchiveChildId] = useState<string | null>(null);
  const children = CHILDREN_DATA;
  const childToArchive = children.find((c) => c.id === archiveChildId);

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--text-subtle)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {content.sectionLabel}
        </p>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 14, color: 'var(--text-body)', marginBottom: 4 }}>
            {children.length} of {content.maxProfiles} child profiles used
          </p>
          <div
            style={{
              width: 200,
              height: 6,
              background: 'var(--border-subtle)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(children.length / content.maxProfiles) * 100}%`,
                height: '100%',
                background: 'var(--brand)',
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
              background: 'var(--surface-raised)',
              border: '1px solid var(--border-subtle)',
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
                  background: 'linear-gradient(135deg, var(--brand), var(--brand-light))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--brand-foreground)',
                }}
              >
                {child.firstName[0]}
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-heading)', marginBottom: 4 }}>
                  {child.name}
                </h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
                  {child.year} · {child.region}
                </p>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {child.diagnosticPending ? (
                    <div
                      style={{
                        background: 'var(--warning-subtle)',
                        color: 'var(--warning-foreground)',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '2px 10px',
                        borderRadius: 12,
                      }}
                    >
                      {content.diagnosticPendingLabel}
                    </div>
                  ) : (
                    <div
                      style={{
                        background: 'var(--brand-subtle)',
                        color: 'var(--brand)',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '2px 10px',
                        borderRadius: 12,
                      }}
                    >
                      {child.schools} target schools
                    </div>
                  )}
                  <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>
                    {content.lastActivePrefix} {child.lastActive}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <Button
                variant="outline"
                style={{ height: 40, fontSize: 14, flex: isMobile ? 1 : 'none' }}
              >
                {content.editLabel}
              </Button>
              <Button
                variant="outline"
                style={{ height: 40, fontSize: 14, flex: isMobile ? 1 : 'none' }}
              >
                {content.manageSchoolsLabel}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setArchiveChildId(child.id)}
                style={{ height: 40, color: 'var(--danger)', fontSize: 14 }}
              >
                {content.archiveLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {children.length < content.maxProfiles && (
        <>
          <Link to={content.addChildPath} style={{ textDecoration: 'none' }}>
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
              {content.addChildLabel}
            </Button>
          </Link>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
            {content.addChildNote}
          </p>
        </>
      )}

      {archiveChildId && childToArchive && (
        <ArchiveChildModal
          childName={childToArchive.firstName}
          content={settingsContent.archiveModal}
          onClose={() => setArchiveChildId(null)}
          onConfirm={() => setArchiveChildId(null)}
        />
      )}
    </div>
  );
}
