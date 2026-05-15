import { Button } from "../../../app/components/ui/button";
import { parentDashboardContent } from "../content";
import { ChildOverflowMenu } from "./ChildOverflowMenu";

interface ChildProfileSummaryCardProps {
  avgScore: number;
  childName: string;
  firstName: string;
  isMobile: boolean;
  region: string;
  schools: string[];
  streak: number;
  totalTests: number;
  weeksToExam: number;
  year: string;
}

export function ChildProfileSummaryCard({
  avgScore,
  childName,
  firstName,
  isMobile,
  region,
  schools,
  streak,
  totalTests,
  weeksToExam,
  year,
}: ChildProfileSummaryCardProps) {
  const initial = childName.charAt(0).toUpperCase();

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 24,
        boxShadow: "var(--shadow-medium)",
      }}
    >
      {/* ── Dark gradient hero header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-hero-mid) 55%, var(--brand-hero-end) 100%)",
          padding: isMobile ? "24px 20px" : "28px 32px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 20 : 0,
        }}
      >
        {/* Left: avatar + identity */}
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              border: "2.5px solid rgba(255,255,255,0.28)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
              letterSpacing: -0.5,
            }}
          >
            {initial}
          </div>

          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 3,
                letterSpacing: -0.3,
              }}
            >
              {childName}
            </h2>
            <p
              style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}
            >
              {year} · {region}
            </p>

            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  background: "rgba(245,158,11,0.18)",
                  border: "1px solid rgba(245,158,11,0.35)",
                  color: "#fcd34d",
                  fontSize: 12,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 20,
                }}
              >
                🔥 {streak}-{parentDashboardContent.streakSuffix}
              </span>

              {schools.map((school) => (
                <span
                  key={school}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    color: "rgba(255,255,255,0.82)",
                    fontSize: 12,
                    fontWeight: 500,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {school}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right: actions */}
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            style={{
              height: 42,
              background: "#fff",
              color: "#312e81",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            {parentDashboardContent.continuePractice}
          </Button>
          <Button
            variant="ghost"
            style={{
              height: 42,
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            {parentDashboardContent.editProfile}
          </Button>
          <ChildOverflowMenu
            childName={firstName}
            light
            onArchive={() => console.log("Archive")}
            onReset={() => console.log("Reset")}
          />
        </div>
      </div>

      {/* ── KPI stats strip ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)",
          background: "var(--brand-subtle)",
        }}
      >
        {[
          { value: totalTests,        label: "Tests Taken"   },
          { value: `${avgScore}%`,    label: "Avg Score",    highlight: avgScore >= 75 ? "success" : avgScore >= 60 ? "warning" : "danger" },
          { value: `${streak} days`,  label: "Streak",       highlight: streak >= 5 ? "warning" : undefined },
          { value: `${weeksToExam} wks`, label: "to Exam"   },
        ].map((stat, i, arr) => (
          <div
            key={stat.label}
            style={{
              padding: "16px 20px",
              textAlign: "center",
              borderRight: i < arr.length - 1 ? "1px solid var(--border-subtle)" : "none",
              borderTop: "1px solid var(--border-subtle)",
              borderBottom: isMobile && i < 2 ? "1px solid var(--border-subtle)" : "none",
            }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color:
                  stat.highlight === "success" ? "var(--success)"
                  : stat.highlight === "warning" ? "var(--warning)"
                  : stat.highlight === "danger"  ? "var(--danger)"
                  : "var(--text-heading)",
                marginBottom: 2,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
