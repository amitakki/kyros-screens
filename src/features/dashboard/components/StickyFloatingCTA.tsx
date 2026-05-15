import { X } from "lucide-react";

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
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        padding: "12px 20px",
        boxShadow: "var(--shadow-popover)",
        zIndex: 50,
        minWidth: 280,
      }}
    >
      <button
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          color: "var(--text-subtle)",
          cursor: "pointer",
          padding: 4,
        }}
        onClick={onDismiss}
      >
        <X size={14} />
      </button>
      <Button
        className="hover:bg-brand-hover"
        style={{
          width: "100%",
          height: 48,
          background: "var(--brand)",
          color: "var(--brand-foreground)",
          borderRadius: 8,
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 6,
        }}
      >
        {parentDashboardContent.continuePractice.replace("->", "")} {topicName} &rarr;
      </Button>
      <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
        {childFirstName}&apos;s {parentDashboardContent.currentTopicLabel}
      </p>
    </div>
  );
}
