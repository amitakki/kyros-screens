type ActiveTopic = {
  title: string;
  subtitle: string;
  progress: string;
  note: string;
};

type PathVisualizationContent = {
  pathLabel: string;
  progressBadge: string;
  examReadyLabel: string;
  completeLabel: string;
  overallProgress: string;
  completedBadge: string;
  activeTopic: ActiveTopic;
};

type Props = { content: PathVisualizationContent };

export function PathVisualization({ content }: Props) {
  const nodes = Array.from({ length: 20 }, (_, i) => {
    const t = i / 19;
    const x = 24 + t * 452;
    const y = 270 - Math.pow(t, 0.65) * 230;
    return { x, y, index: i + 1 };
  });
  const solidPath = nodes
    .slice(0, 8)
    .map((n, i) => `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`)
    .join(" ");
  const dashedPath = nodes
    .slice(7)
    .map((n, i) => `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`)
    .join(" ");
  const node8 = nodes[7];
  const node7 = nodes[6];

  return (
    <div className="bg-warning-subtle rounded-[16px] p-6 border border-brand-muted shadow-2xl relative">
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {content.pathLabel}
        </span>
        <span style={{ fontSize: 12, color: "var(--success)", fontWeight: 600 }}>
          {content.progressBadge}
        </span>
      </div>

      <div className="relative" style={{ height: 300 }}>
        <svg viewBox="0 0 500 300" preserveAspectRatio="xMidYMid meet" className="w-full h-full" style={{ overflow: "visible" }}>
          <path d={solidPath} style={{ stroke: "var(--brand)" }} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={dashedPath} style={{ stroke: "var(--border-subtle)" }} strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="6 4" />

          {nodes.map((node, i) => {
            if (i < 7)
              return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="8" style={{ fill: "var(--success)" }} />
                  <polyline
                    points={`${node.x - 3.5},${node.y} ${node.x - 1},${node.y + 3} ${node.x + 4},${node.y - 3}`}
                    stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
              );
            if (i === 7)
              return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="18" style={{ fill: "var(--brand)" }} opacity="0.12" />
                  <circle cx={node.x} cy={node.y} r="12" style={{ fill: "var(--brand)" }} />
                  <circle cx={node.x} cy={node.y} r="5" fill="white" />
                </g>
              );
            if (i === 19)
              return (
                <g key={i}>
                  <circle cx={node.x} cy={node.y} r="10" fill="white" style={{ stroke: "var(--brand)" }} strokeWidth="2" />
                  <text x={node.x} y={node.y + 4.5} textAnchor="middle" fontSize="12" style={{ fill: "var(--brand)" }}>★</text>
                  <text x={node.x} y={node.y + 26} textAnchor="middle" fontSize="10" style={{ fill: "var(--text-subtle)" }} fontFamily="DM Sans, sans-serif">
                    {content.examReadyLabel}
                  </text>
                </g>
              );
            return (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r="7" style={{ fill: "var(--surface-subtle)", stroke: "var(--border-subtle)" }} strokeWidth="1.5" />
              </g>
            );
          })}

          {/* Floating topic card */}
          <foreignObject x={node8.x - 112} y={node8.y - 112} width="224" height="98" style={{ overflow: "visible" }}>
            <div
              style={{
                background: "var(--surface-raised)",
                borderRadius: 10,
                boxShadow: "var(--shadow-popover)",
                borderLeft: "4px solid var(--brand)",
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-heading)", marginBottom: 2 }}>
                {content.activeTopic.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>
                {content.activeTopic.subtitle}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: "var(--border-subtle)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: "70%", height: "100%", background: "var(--brand)", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, color: "var(--brand)", fontWeight: 600 }}>{content.activeTopic.progress}</span>
              </div>
              <div style={{ fontSize: 10, color: "var(--text-subtle)", marginTop: 4 }}>{content.activeTopic.note}</div>
            </div>
          </foreignObject>

          {/* Completed badge */}
          <foreignObject x={node7.x - 62} y={node7.y + 16} width="124" height="26" style={{ overflow: "visible" }}>
            <div
              style={{
                background: "var(--success)",
                color: "var(--success-foreground)",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {content.completedBadge}
            </div>
          </foreignObject>
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2 bg-brand-muted rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: "35%" }} />
        </div>
        <span style={{ fontSize: 12, color: "var(--brand)", fontWeight: 600 }}>{content.overallProgress}</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{content.completeLabel}</span>
      </div>
    </div>
  );
}
