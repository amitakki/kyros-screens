import { useRef, useState } from "react";

import { childDetailContent } from "../content";
import type { TestRecord } from "../types";

// ── Subject colour palette (mirrors mock SubjectProgress colours) ─
const SUBJECT_COLOR: Record<string, string> = {
  "Maths":                "#818cf8",
  "English":              "#10b981",
  "Verbal Reasoning":     "#f59e0b",
  "Non-Verbal Reasoning": "#ef4444",
};

const SUBJECT_SUBTLE: Record<string, string> = {
  "Maths":                "#eef2ff",
  "English":              "#d1fae5",
  "Verbal Reasoning":     "#fef3c7",
  "Non-Verbal Reasoning": "#fee2e2",
};

const SUBJECT_LABEL: Record<string, string> = {
  "Maths":                "Maths",
  "English":              "English",
  "Verbal Reasoning":     "Verbal",
  "Non-Verbal Reasoning": "Non-Verbal",
};

const ALL_KEY = "all";
const ALL_LINE = "var(--border-subtle)";

// ── Ring gauge ────────────────────────────────────────────────────
const READINESS_SCORE = 0.72;
const RING_R = 46;
const RING_SIZE = 108;

function ReadinessRing() {
  const c = RING_SIZE / 2;
  const circumference = 2 * Math.PI * RING_R;
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          margin: "0 auto",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          style={{ transform: "rotate(-90deg)", position: "absolute" }}
        >
          <circle cx={c} cy={c} r={RING_R} fill="none" stroke="var(--border-subtle)" strokeWidth="9" />
          <circle
            cx={c} cy={c} r={RING_R}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="9"
            strokeDasharray={`${circumference * READINESS_SCORE} ${circumference}`}
            strokeLinecap="round"
          />
        </svg>
        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-heading)" }}>72%</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Ready</div>
        </div>
      </div>
    </div>
  );
}

// ── SVG chart constants ───────────────────────────────────────────
const VW = 400;
const VH = 134;
const PT = 14, PR = 52, PB = 26, PL = 36;
const CW = VW - PL - PR;
const CH = VH - PT - PB;

interface TooltipState {
  x: number;
  y: number;
  record: TestRecord;
  color: string;
  subtle: string;
}

interface SparklineProps {
  activeSubject: string;
  testHistory: TestRecord[];
}

function ScoreSparkline({ testHistory, activeSubject }: SparklineProps) {
  const isAll = activeSubject === ALL_KEY;
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Oldest-first chronological order
  const sorted = [...testHistory].reverse();

  // Filter to subject if not "all"
  const visible = isAll ? sorted : sorted.filter((t) => t.subject === activeSubject);

  if (visible.length === 0) {
    return (
      <div
        style={{
          height: VH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <span style={{ fontSize: 22 }}>📭</span>
        <span style={{ fontSize: 13, color: "var(--text-subtle)" }}>
          No {SUBJECT_LABEL[activeSubject] ?? activeSubject} tests recorded yet
        </span>
      </div>
    );
  }

  // Single data point — centre it
  if (visible.length === 1) {
    const rec = visible[0];
    const color = isAll ? (SUBJECT_COLOR[rec.subject] ?? "#818cf8") : (SUBJECT_COLOR[activeSubject] ?? "#818cf8");
    return (
      <div
        style={{
          height: VH,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: SUBJECT_SUBTLE[rec.subject] ?? "#eef2ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 18, fontWeight: 700, color }}>{rec.rawScore}%</span>
        </div>
        <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>{rec.date}</span>
        <span style={{ fontSize: 11, color: "var(--text-subtle)" }}>1 test recorded</span>
      </div>
    );
  }

  // ── Full chart ────────────────────────────────────────────────
  const n = visible.length;
  const scores = visible.map((t) => t.rawScore);
  const minS = Math.max(0,   Math.min(...scores) - 8);
  const maxS = Math.min(100, Math.max(...scores) + 8);
  const avg  = Math.round(scores.reduce((a, b) => a + b, 0) / n);

  const tx = (i: number) => PL + (i / (n - 1)) * CW;
  const ty = (v: number) => PT + CH - ((v - minS) / (maxS - minS)) * CH;
  const avgY = ty(avg);

  const pts = visible.map((t, i) => ({
    x: tx(i),
    y: ty(t.rawScore),
    record: t,
  }));

  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
  const areaD = `${lineD} L${pts[n - 1].x.toFixed(1)},${(PT + CH).toFixed(1)} L${pts[0].x.toFixed(1)},${(PT + CH).toFixed(1)} Z`;

  const lineColor = isAll ? ALL_LINE : (SUBJECT_COLOR[activeSubject] ?? "#818cf8");
  const gradId    = `perf-grad-${activeSubject.replace(/\s+/g, "-").toLowerCase()}`;

  function handleDotEnter(e: React.MouseEvent<SVGCircleElement>, pt: typeof pts[0]) {
    const rect = (e.target as SVGCircleElement).getBoundingClientRect();
    const dotColor  = isAll ? (SUBJECT_COLOR[pt.record.subject] ?? "#818cf8") : lineColor;
    const dotSubtle = isAll ? (SUBJECT_SUBTLE[pt.record.subject] ?? "#eef2ff") : (SUBJECT_SUBTLE[activeSubject] ?? "#eef2ff");
    setTooltip({
      x: rect.left + rect.width / 2,
      y: rect.top,
      record: pt.record,
      color: dotColor,
      subtle: dotSubtle,
    });
  }

  return (
    <>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VW} ${VH}`}
        style={{ width: "100%", height: "auto", overflow: "visible" }}
        aria-hidden="true"
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            {isAll ? (
              <>
                <stop offset="0%"   style={{ stopColor: ALL_LINE }} stopOpacity="0.12" />
                <stop offset="100%" style={{ stopColor: ALL_LINE }} stopOpacity="0.01" />
              </>
            ) : (
              <>
                <stop offset="0%"   style={{ stopColor: lineColor }} stopOpacity="0.22" />
                <stop offset="100%" style={{ stopColor: lineColor }} stopOpacity="0.02" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Y-axis labels */}
        <text x={PL - 5} y={PT + 4}      textAnchor="end" style={{ fill: "var(--text-subtle)" }} fontSize="10" fontFamily="sans-serif">{Math.round(maxS)}%</text>
        <text x={PL - 5} y={PT + CH + 4} textAnchor="end" style={{ fill: "var(--text-subtle)" }} fontSize="10" fontFamily="sans-serif">{Math.round(minS)}%</text>

        {/* Average dashed rule */}
        <line x1={PL} y1={avgY} x2={VW - PR + 4} y2={avgY} style={{ stroke: "var(--border-subtle)" }} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x={VW - PR + 8} y={avgY + 4} style={{ fill: "var(--text-subtle)" }} fontSize="9" fontFamily="sans-serif">{avg}% avg</text>

        {/* Area fill */}
        <path d={areaD} fill={`url(#${gradId})`} />

        {/* Connecting line */}
        <path
          d={lineD}
          fill="none"
          style={{ stroke: lineColor }}
          strokeWidth={isAll ? "1.5" : "2.5"}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={isAll ? "5 3" : undefined}
        />

        {/* Data point dots — larger hit area via transparent outer circle */}
        {pts.map((p, i) => {
          const dotColor = isAll
            ? (SUBJECT_COLOR[p.record.subject] ?? "#818cf8")
            : lineColor;
          const isHovered = tooltip?.record === p.record;
          return (
            <g key={i} style={{ cursor: "pointer" }}>
              {/* Invisible wider hit target */}
              <circle
                cx={p.x}
                cy={p.y}
                r="10"
                fill="transparent"
                onMouseEnter={(e) => handleDotEnter(e, p)}
              />
              {/* Visible dot — grows slightly on hover */}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? (isAll ? "6" : "5.5") : (isAll ? "4" : "3.5")}
                fill={dotColor}
                stroke="#fff"
                strokeWidth={isHovered ? "2" : "1.5"}
                style={{ transition: "r 100ms, stroke-width 100ms" }}
                pointerEvents="none"
              />
            </g>
          );
        })}

        {/* X-axis: first and last date */}
        <text x={PL}       y={VH - 6} textAnchor="middle" style={{ fill: "var(--text-subtle)" }} fontSize="9" fontFamily="sans-serif">{visible[0].date}</text>
        <text x={VW - PR}  y={VH - 6} textAnchor="middle" style={{ fill: "var(--text-subtle)" }} fontSize="9" fontFamily="sans-serif">{visible[n - 1].date}</text>
      </svg>

      {/* Fixed-position tooltip — escapes overflow:hidden */}
      {tooltip && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y - 8,
            transform: "translate(-50%, -100%)",
            background: "var(--surface-inverse)",
            borderRadius: 10,
            padding: "10px 13px",
            pointerEvents: "none",
            zIndex: 9999,
            minWidth: 180,
            boxShadow: "0 8px 24px rgba(15,23,42,0.22)",
          }}
        >
          {/* Subject chip + date */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 7, gap: 10 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: tooltip.color,
                background: tooltip.subtle,
                padding: "2px 8px",
                borderRadius: 20,
              }}
            >
              {SUBJECT_LABEL[tooltip.record.subject] ?? tooltip.record.subject}
            </span>
            <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>
              {tooltip.record.date}
            </span>
          </div>

          {/* Topic */}
          <p
            style={{
              fontSize: 12,
              color: "#e2e8f0",
              margin: "0 0 8px",
              lineHeight: 1.4,
              maxWidth: 200,
            }}
          >
            {tooltip.record.topic}
          </p>

          {/* Score + time row */}
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: tooltip.color,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {tooltip.record.rawScore}%
            </span>
            <span style={{ fontSize: 11, color: "#64748b" }}>
              {tooltip.record.score.split(" ")[0]}
            </span>
            <span style={{ fontSize: 11, color: "#64748b", marginLeft: "auto" }}>
              {tooltip.record.time}
            </span>
          </div>

          {/* Arrow pointer */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid var(--surface-inverse)",
            }}
          />
        </div>
      )}
    </>
  );
}

// ── Subject filter pill ───────────────────────────────────────────
function SubjectPill({
  active,
  color,
  label,
  subtle,
  onClick,
}: {
  active: boolean;
  color: string;
  label: string;
  subtle: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        height: 28,
        padding: "0 11px",
        border: `1.5px solid ${active ? color : "var(--border-subtle)"}`,
        borderRadius: 20,
        background: active ? subtle : "transparent",
        color: active ? color : "var(--text-muted)",
        fontSize: 12,
        fontWeight: active ? 700 : 400,
        cursor: "pointer",
        fontFamily: "var(--font-family-sans)",
        transition: "background 120ms, border-color 120ms, color 120ms",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ── Subject legend (shown in "all" view only) ─────────────────────
function SubjectLegend({ subjects }: { subjects: string[] }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
      {subjects.map((s) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: SUBJECT_COLOR[s] ?? "#94a3b8",
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
            {SUBJECT_LABEL[s] ?? s}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Subject insight strip ─────────────────────────────────────────
function SubjectInsight({
  activeSubject,
  firstName,
  testHistory,
}: {
  activeSubject: string;
  firstName: string;
  testHistory: TestRecord[];
}) {
  const isAll = activeSubject === ALL_KEY;

  if (isAll) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        <Callout color="var(--brand)" bg="var(--brand-subtle)">
          {childDetailContent.scoreTrendInsight.replace("Emma's", `${firstName}'s`)}
        </Callout>
        <Callout color="var(--warning-foreground)" bg="var(--warning-subtle)" border="var(--warning)">
          {childDetailContent.scoreTrendAttention}
        </Callout>
      </div>
    );
  }

  const records = testHistory.filter((t) => t.subject === activeSubject);
  if (records.length === 0) return null;

  const scores  = records.map((t) => t.rawScore);
  const avg     = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const best    = Math.max(...scores);
  const latest  = [...records].reverse()[records.length - 1].rawScore;
  const first   = [...records].reverse()[0].rawScore;
  const trend   = latest > first ? "↑ improving" : latest < first ? "↓ declining" : "→ stable";
  const color   = SUBJECT_COLOR[activeSubject] ?? "var(--brand)";
  const subtle  = SUBJECT_SUBTLE[activeSubject] ?? "var(--brand-subtle)";

  return (
    <div
      style={{
        marginTop: 14,
        background: subtle,
        borderLeft: `3px solid ${color}`,
        borderRadius: 6,
        padding: "10px 14px",
        display: "flex",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      {[
        { label: "Tests",   value: String(records.length) },
        { label: "Avg",     value: `${avg}%` },
        { label: "Best",    value: `${best}%` },
        { label: "Trend",   value: trend },
      ].map(({ label, value }) => (
        <div key={label}>
          <div style={{ fontSize: 10, color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            {label}
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color }}>
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}

function Callout({
  bg,
  border,
  color,
  children,
}: {
  bg: string;
  border?: string;
  color: string;
  children: string;
}) {
  return (
    <div
      style={{
        background: bg,
        borderLeft: `3px solid ${border ?? color}`,
        borderRadius: 6,
        padding: "9px 12px",
      }}
    >
      <p style={{ fontSize: 12, color, margin: 0, lineHeight: 1.5 }}>{children}</p>
    </div>
  );
}

// ── Main card ─────────────────────────────────────────────────────
interface PerformanceOverviewCardProps {
  firstName: string;
  isMobile: boolean;
  testHistory: TestRecord[];
}

export function PerformanceOverviewCard({
  firstName,
  isMobile,
  testHistory,
}: PerformanceOverviewCardProps) {
  const [activeSubject, setActiveSubject] = useState(ALL_KEY);

  // Derive which subjects actually have test records
  const presentSubjects = Object.keys(SUBJECT_COLOR).filter((s) =>
    testHistory.some((t) => t.subject === s)
  );

  const visibleCount = activeSubject === ALL_KEY
    ? testHistory.length
    : testHistory.filter((t) => t.subject === activeSubject).length;

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 24,
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {/* ── Header ── */}
      <div style={{ padding: "18px 28px 14px", borderBottom: "1px solid var(--border-subtle)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--text-heading)", margin: 0 }}>
          Performance Overview
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "230px 1fr" }}>

        {/* ── Left: readiness ring + areas ── */}
        <div
          style={{
            padding: "24px 20px",
            borderRight: isMobile ? "none" : "1px solid var(--border-subtle)",
            borderBottom: isMobile ? "1px solid var(--border-subtle)" : "none",
          }}
        >
          <ReadinessRing />
          <p
            style={{
              fontSize: 11,
              color: "var(--text-muted)",
              textAlign: "center",
              marginTop: 6,
              marginBottom: 20,
              lineHeight: 1.5,
            }}
          >
            {childDetailContent.examReadinessSubtitle}
          </p>

          <div style={{ marginBottom: 16 }}>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              {childDetailContent.strongAreasTitle}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {childDetailContent.strongAreas.map((area) => (
                <span key={area} style={{ background: "var(--success-subtle)", color: "var(--success)", fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>
              {childDetailContent.needsAttentionTitle}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {childDetailContent.needsAttention.map((area) => (
                <span key={area} style={{ background: "var(--danger-subtle)", color: "var(--danger)", fontSize: 12, fontWeight: 500, padding: "3px 10px", borderRadius: 20 }}>
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: sparkline with subject filter ── */}
        <div style={{ padding: "20px 24px 18px" }}>

          {/* Row: title + test count */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-heading)", margin: 0 }}>
              {childDetailContent.scoreTrendTitle}
            </p>
            <span style={{ fontSize: 12, color: "var(--text-subtle)", fontVariantNumeric: "tabular-nums" }}>
              {visibleCount} test{visibleCount !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Subject filter pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
            <SubjectPill
              active={activeSubject === ALL_KEY}
              color="#475569"
              label="All subjects"
              subtle="var(--surface-muted)"
              onClick={() => setActiveSubject(ALL_KEY)}
            />
            {presentSubjects.map((s) => (
              <SubjectPill
                key={s}
                active={activeSubject === s}
                color={SUBJECT_COLOR[s]}
                label={SUBJECT_LABEL[s] ?? s}
                subtle={SUBJECT_SUBTLE[s]}
                onClick={() => setActiveSubject(s)}
              />
            ))}
          </div>

          {/* Chart */}
          <ScoreSparkline testHistory={testHistory} activeSubject={activeSubject} />

          {/* Legend (all view only) */}
          {activeSubject === ALL_KEY && <SubjectLegend subjects={presentSubjects} />}

          {/* Insight */}
          <SubjectInsight
            activeSubject={activeSubject}
            firstName={firstName}
            testHistory={testHistory}
          />
        </div>
      </div>
    </div>
  );
}
