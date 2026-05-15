import { PlayCircle, X } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";

interface StickyFloatingCTAProps {
  childFirstName: string;
  topicName: string;
  onDismiss: () => void;
}

export function StickyFloatingCTA({
  childFirstName,
  topicName,
  onDismiss,
}: StickyFloatingCTAProps) {
  return (
    <div
      className="kyros-slide-up"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderTop: "3px solid var(--brand)",
        borderRadius: 12,
        padding: "14px 16px 12px",
        boxShadow: "0 8px 32px rgba(15, 23, 42, 0.16)",
        zIndex: 50,
        minWidth: 280,
        maxWidth: 320,
      }}
    >
      {/* Dismiss button */}
      <button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
          color: "var(--text-subtle)",
          cursor: "pointer",
          padding: 4,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={onDismiss}
      >
        <X size={14} />
      </button>

      {/* Topic label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 10,
          paddingRight: 24,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--brand-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <PlayCircle size={15} style={{ color: "var(--brand)" }} />
        </div>
        <div>
          <p
            style={{
              fontSize: 11,
              color: "var(--text-subtle)",
              margin: 0,
              marginBottom: 1,
            }}
          >
            {childFirstName}&apos;s {parentDashboardContent.currentTopicLabel}
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--text-heading)",
              margin: 0,
            }}
          >
            {topicName}
          </p>
        </div>
      </div>

      {/* CTA button */}
      <Button
        style={{
          width: "100%",
          height: 42,
          background: "var(--brand)",
          color: "var(--brand-foreground)",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {parentDashboardContent.continuePractice} &rarr;
      </Button>
    </div>
  );
}
