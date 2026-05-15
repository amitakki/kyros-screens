import { useEffect, useState } from "react";

import type { Topic } from "../types";

// Hex values — used for backgrounds and SVG-adjacent contexts where CSS vars aren't reliable
const C = {
  success: "#10b981",
  warning: "#f59e0b",
  danger:  "#ef4444",
  brand:   "#4f46e5",
  brandLight: "#818cf8",
};

function barColor(topic: Topic): string {
  if (topic.status === "active")  return C.brand;
  if (topic.status === "locked")  return "transparent";
  const s = topic.bestScore ?? 0;
  if (s >= 80) return C.success;
  if (s >= 60) return C.warning;
  return C.danger;
}

function scoreColor(score: number): string {
  if (score >= 80) return C.success;
  if (score >= 60) return C.warning;
  return C.danger;
}

interface Tooltip {
  topic: Topic;
  x: number;
  y: number;
}

interface TopicBarChartProps {
  topics: Topic[];
}

export function TopicBarChart({ topics }: TopicBarChartProps) {
  const [mounted, setMounted] = useState(false);
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  // Trigger bar-draw animation one frame after mount
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);

  const completed = topics.filter((t) => t.status === "completed");
  const hasHigh = completed.some((t) => (t.bestScore ?? 0) >= 80);
  const hasMid  = completed.some((t) => { const s = t.bestScore ?? 0; return s >= 60 && s < 80; });
  const hasLow  = completed.some((t) => (t.bestScore ?? 0) < 60);

  return (
    <div>
      {/* ── Legend ─────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "9px 16px 8px",
          borderBottom: "1px solid var(--border-subtle)",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {hasHigh && <LegendDot color={C.success}  label="≥ 80%" />}
        {hasMid  && <LegendDot color={C.warning}  label="60–79%" />}
        {hasLow  && <LegendDot color={C.danger}   label="< 60%" />}
        <LegendDot color={C.brand} label="In progress" />
        <LegendDot color="#e2e8f0" label="Locked" dashed />
      </div>

      {/* ── Bar rows ────────────────────────────────────────── */}
      <div style={{ paddingTop: 4, paddingBottom: 6 }}>
        {topics.map((topic, i) => {
          const isCompleted = topic.status === "completed";
          const isActive    = topic.status === "active";
          const isLocked    = topic.status === "locked";
          const color       = barColor(topic);
          const barPct      = isLocked ? 0 : (topic.bestScore ?? 0);
          const scoreLabel  = (isCompleted || isActive) && topic.bestScore !== undefined
            ? `${topic.bestScore}%`
            : null;

          return (
            <div
              key={topic.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 16px",
                cursor: isLocked ? "default" : "pointer",
                transition: "background 120ms",
              }}
              onMouseEnter={(e) => {
                if (isLocked) return;
                const r = e.currentTarget.getBoundingClientRect();
                setTooltip({ topic, x: r.left + r.width / 2, y: r.top });
              }}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* ── Topic label ── */}
              <div style={{ width: 130, flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 1 }}>
                  <span
                    style={{
                      fontSize: 10,
                      color: "var(--text-subtle)",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 500,
                    }}
                  >
                    T{topic.id}
                  </span>
                  {isActive && (
                    <span
                      className="kyros-pulse-dot"
                      style={{
                        display: "inline-block",
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: C.brand,
                        flexShrink: 0,
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    display: "block",
                    fontSize: 11,
                    lineHeight: 1.4,
                    fontWeight: isActive ? 600 : 400,
                    color: isLocked ? "var(--text-subtle)" : "var(--text-heading)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {topic.name}
                </span>
              </div>

              {/* ── Bar track ── */}
              <div
                style={{
                  flex: 1,
                  height: 16,
                  borderRadius: 4,
                  overflow: "hidden",
                  background: isLocked ? "#f8fafc" : "#f1f5f9",
                  border: isLocked ? "1px dashed #cbd5e1" : "1px solid transparent",
                  position: "relative",
                }}
              >
                {!isLocked && (
                  <div
                    style={{
                      height: "100%",
                      width: mounted ? `${barPct}%` : "0%",
                      borderRadius: 4,
                      background: isActive
                        ? `linear-gradient(90deg, ${C.brand} 0%, ${C.brandLight} 100%)`
                        : color,
                      transition: `width 0.55s cubic-bezier(0.2, 0, 0, 1) ${i * 35}ms`,
                    }}
                  />
                )}
              </div>

              {/* ── Score label ── */}
              <div style={{ width: 32, textAlign: "right", flexShrink: 0 }}>
                {scoreLabel && (
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      fontVariantNumeric: "tabular-nums",
                      color: isActive ? C.brand : scoreColor(topic.bestScore!),
                    }}
                  >
                    {scoreLabel}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Fixed tooltip ───────────────────────────────────── */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y - 10,
            transform: "translate(-50%, -100%)",
            background: "#0f172a",
            color: "#fff",
            fontSize: 12,
            padding: "10px 14px",
            borderRadius: 10,
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
            pointerEvents: "none",
            zIndex: 9999,
            minWidth: 170,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 7 }}>
            {tooltip.topic.name}
          </div>

          {tooltip.topic.bestScore !== undefined && (
            <TooltipRow
              label="Best score"
              value={`${tooltip.topic.bestScore}%`}
              valueColor={
                tooltip.topic.status === "active"
                  ? C.brandLight
                  : scoreColor(tooltip.topic.bestScore)
              }
            />
          )}
          {tooltip.topic.attempts !== undefined && (
            <TooltipRow label="Attempts" value={String(tooltip.topic.attempts)} />
          )}
          {tooltip.topic.lastPractised && (
            <TooltipRow label="Last practiced" value={tooltip.topic.lastPractised} />
          )}
          {tooltip.topic.status === "active" && (
            <div
              style={{
                marginTop: 7,
                fontSize: 10,
                fontWeight: 700,
                color: C.brandLight,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              In progress
            </div>
          )}

          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -5,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #0f172a",
            }}
          />
        </div>
      )}
    </div>
  );
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: dashed ? "transparent" : color,
          border: dashed ? `1.5px dashed ${color}` : "none",
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}

function TooltipRow({
  label,
  value,
  valueColor = "rgba(255,255,255,0.9)",
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 3,
        opacity: 0.85,
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 600, color: valueColor }}>{value}</span>
    </div>
  );
}
