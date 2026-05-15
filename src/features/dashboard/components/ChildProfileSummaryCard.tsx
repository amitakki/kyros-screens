import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";
import { ChildOverflowMenu } from "./ChildOverflowMenu";

interface ChildProfileSummaryCardProps {
  childName: string;
  firstName: string;
  isMobile: boolean;
  region: string;
  schools: string[];
  streak: number;
  year: string;
}

export function ChildProfileSummaryCard({
  childName,
  firstName,
  isMobile,
  region,
  schools,
  streak,
  year,
}: ChildProfileSummaryCardProps) {
  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: isMobile ? 20 : 32,
        marginBottom: 24,
        boxShadow: "var(--shadow-soft)",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "stretch" : "flex-start",
        gap: isMobile ? 16 : 0,
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--brand), var(--brand-light))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            color: "var(--brand-foreground)",
            flexShrink: 0,
          }}
        >
          E
        </div>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--text-heading)", marginBottom: 6 }}>
            {childName}
          </h2>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 10 }}>
            {year} · {region}
          </p>
          <div
            style={{
              background: "var(--warning-subtle)",
              color: "var(--warning-foreground)",
              fontSize: 12,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 20,
              display: "inline-block",
              marginBottom: 12,
            }}
          >
            🔥 {streak}-{parentDashboardContent.streakSuffix}
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {schools.map((school) => (
              <div
                key={school}
                style={{
                  background: "var(--brand-subtle)",
                  color: "var(--brand)",
                  fontSize: 13,
                  fontWeight: 500,
                  padding: "4px 12px",
                  borderRadius: 20,
                }}
              >
                {school}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 12,
          alignItems: isMobile ? "stretch" : "flex-start",
        }}
      >
        <Button
          className="hover:bg-brand-hover"
          style={{
            height: 48,
            background: "var(--brand)",
            color: "var(--brand-foreground)",
            borderRadius: 8,
            fontSize: 15,
            fontWeight: 600,
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {parentDashboardContent.continuePractice}
        </Button>
        <Button style={{ height: 48, fontSize: 15, fontWeight: 600 }} variant="ghost">
          {parentDashboardContent.editProfile}
        </Button>
        <ChildOverflowMenu
          childName={firstName}
          onArchive={() => console.log("Archive")}
          onReset={() => console.log("Reset")}
        />
      </div>
    </div>
  );
}
