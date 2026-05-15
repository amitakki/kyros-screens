import { useState, type CSSProperties } from "react";
import { Archive, Download, MoreVertical, RotateCcw } from "lucide-react";

import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";

interface ChildOverflowMenuProps {
  childName: string;
  light?: boolean;
  onArchive: () => void;
  onReset: () => void;
}

export function ChildOverflowMenu({
  childName,
  light,
  onArchive,
  onReset,
}: ChildOverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <Button
        style={{
          height: light ? 42 : 48,
          paddingLeft: 16,
          paddingRight: 16,
          color: light ? "rgba(255,255,255,0.7)" : undefined,
          border: light ? "1px solid rgba(255,255,255,0.2)" : undefined,
        }}
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
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              boxShadow: "0 12px 40px rgba(15, 23, 42, 0.20), 0 2px 8px rgba(15, 23, 42, 0.10)",
              minWidth: 220,
              zIndex: 20,
              overflow: "hidden",
            }}
          >
            <button
              style={menuButtonStyle}
              onClick={() => setIsOpen(false)}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#f8fafc";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.background = "none";
              }}
            >
              <Download size={16} /> {parentDashboardContent.downloadReport}
            </button>
            <button
              style={menuButtonStyle}
              onClick={() => {
                onReset();
                setIsOpen(false);
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.background = "#f8fafc";
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
                event.currentTarget.style.background = "#fef2f2";
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
