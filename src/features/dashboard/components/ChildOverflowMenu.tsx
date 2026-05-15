import { useState, type CSSProperties } from "react";
import { Archive, Download, MoreVertical, RotateCcw } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";

interface ChildOverflowMenuProps {
  childName: string;
  onArchive: () => void;
  onReset: () => void;
}

export function ChildOverflowMenu({
  childName,
  onArchive,
  onReset,
}: ChildOverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{ height: 48, paddingLeft: 16, paddingRight: 16 }}
        variant="ghost"
        onClick={() => setIsOpen((current) => !current)}
      >
        <MoreVertical size={18} />
      </Button>

      {isOpen ? (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 10 }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 8,
              background: "var(--surface-raised)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 8,
              boxShadow: "var(--shadow-popover)",
              minWidth: 220,
              zIndex: 20,
            }}
          >
            <button
              style={menuButtonStyle}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--surface-subtle)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "none";
              }}
            >
              <Download size={16} /> {parentDashboardContent.downloadReport}
              <span style={{ fontSize: 12, color: "var(--text-subtle)", marginLeft: "auto" }}>
                {parentDashboardContent.comingSoon}
              </span>
            </button>
            <button
              style={menuButtonStyle}
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--surface-subtle)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "none";
              }}
            >
              <RotateCcw size={16} /> {parentDashboardContent.resetDiagnostic}
            </button>
            <button
              style={{
                ...menuButtonStyle,
                borderTop: "1px solid var(--surface-muted)",
                color: "var(--danger)",
              }}
              onClick={() => {
                onArchive();
                setIsOpen(false);
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "var(--danger-subtle)";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "none";
              }}
            >
              <Archive size={16} /> {parentDashboardContent.archiveMenuLabel} {childName}
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

const menuButtonStyle: CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "none",
  background: "none",
  textAlign: "left",
  fontSize: 14,
  color: "var(--text-body)",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 10,
};
