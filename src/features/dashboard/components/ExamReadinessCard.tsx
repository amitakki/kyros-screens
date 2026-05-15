import { childDetailContent } from "../content";

const READINESS_SCORE = 0.72;
const READINESS_DISPLAY = "72%";
const SVG_RADIUS = 52;
const SVG_SIZE = 120;

export function ExamReadinessCard() {
  const circumference = 2 * Math.PI * SVG_RADIUS;

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", marginBottom: 4 }}>
        {childDetailContent.examReadinessTitle}
      </h3>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 24 }}>
        {childDetailContent.examReadinessSubtitle}
      </p>

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            width: SVG_SIZE,
            height: SVG_SIZE,
            margin: "0 auto",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg height={SVG_SIZE} style={{ transform: "rotate(-90deg)" }} width={SVG_SIZE}>
            <circle
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              fill="none"
              r={SVG_RADIUS}
              style={{ stroke: "var(--border-subtle)" }}
              strokeWidth="10"
            />
            <circle
              cx={SVG_SIZE / 2}
              cy={SVG_SIZE / 2}
              fill="none"
              r={SVG_RADIUS}
              style={{ stroke: "var(--brand)" }}
              strokeDasharray={`${circumference * READINESS_SCORE} ${circumference}`}
              strokeLinecap="round"
              strokeWidth="10"
            />
          </svg>
          <div style={{ position: "absolute" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: "var(--text-heading)" }}>
              {READINESS_DISPLAY}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {childDetailContent.readinessLabel}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8 }}>
            {childDetailContent.strongAreasTitle}
          </p>
          <div style={{ fontSize: 13, color: "var(--success)" }}>
            {childDetailContent.strongAreas.map((area) => (
              <p key={area} style={{ marginBottom: 4 }}>
                {area}
              </p>
            ))}
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "var(--text-muted)", marginBottom: 8 }}>
            {childDetailContent.needsAttentionTitle}
          </p>
          <div style={{ fontSize: 13, color: "var(--danger)" }}>
            {childDetailContent.needsAttention.map((area) => (
              <p key={area} style={{ marginBottom: 4 }}>
                {area}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
