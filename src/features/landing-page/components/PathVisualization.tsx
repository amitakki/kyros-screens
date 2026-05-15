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

function catmullRomPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)},${cp2x.toFixed(1)} ${cp2y.toFixed(1)},${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

export function PathVisualization({ content }: Props) {
  const nodes = Array.from({ length: 20 }, (_, i) => {
    const t = i / 19;
    const x = 24 + t * 452;
    const y = 265 - Math.pow(t, 0.65) * 225;
    return { x, y };
  });

  const completedNodes = nodes.slice(0, 8);
  const remainingNodes = nodes.slice(7);

  const solidPathD = catmullRomPath(completedNodes);
  const dashedPathD = catmullRomPath(remainingNodes);

  const last = completedNodes[completedNodes.length - 1];
  const first = completedNodes[0];
  const areaD = `${solidPathD} L ${last.x.toFixed(1)} 280 L ${first.x.toFixed(1)} 280 Z`;

  const node8 = nodes[7];
  const node7 = nodes[6];

  return (
    <div
      style={{
        background: "var(--surface-raised)",
        borderRadius: 20,
        padding: 24,
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 20px 60px rgba(79,70,229,0.1), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "var(--text-subtle)",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          {content.pathLabel}
        </span>
        <span
          style={{
            fontSize: 12,
            color: "var(--success-dark)",
            fontWeight: 700,
            background: "var(--success-subtle)",
            padding: "2px 10px",
            borderRadius: 20,
          }}
        >
          {content.progressBadge}
        </span>
      </div>

      {/* SVG chart */}
      <div style={{ position: "relative", height: 295 }}>
        <svg
          viewBox="0 0 500 295"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="pvAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pvLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="pvNodeShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#4f46e5" floodOpacity="0.35" />
            </filter>
            <filter id="pvActiveShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#f59e0b" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Gradient area fill */}
          <path d={areaD} fill="url(#pvAreaGrad)" />

          {/* Completed path */}
          <path
            d={solidPathD}
            stroke="url(#pvLineGrad)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Future dashed path */}
          <path
            d={dashedPathD}
            stroke="#e2e8f0"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 5"
          />

          {/* Completed nodes */}
          {nodes.slice(0, 7).map((node, i) => (
            <g key={i} filter="url(#pvNodeShadow)">
              <circle cx={node.x} cy={node.y} r="8" fill="#4f46e5" />
              <polyline
                points={`${node.x - 3.5},${node.y} ${node.x - 1},${node.y + 3} ${node.x + 4},${node.y - 3.5}`}
                stroke="white"
                strokeWidth="1.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}

          {/* Active node */}
          <g filter="url(#pvActiveShadow)">
            <circle cx={node8.x} cy={node8.y} r="22" fill="rgba(245,158,11,0.1)" />
            <circle cx={node8.x} cy={node8.y} r="15" fill="rgba(245,158,11,0.2)" />
            <circle cx={node8.x} cy={node8.y} r="10" fill="#f59e0b" />
            <circle cx={node8.x} cy={node8.y} r="4" fill="white" />
          </g>

          {/* Future nodes */}
          {nodes.slice(8, 19).map((node, i) => (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r="6"
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
          ))}

          {/* Goal node */}
          <g>
            <circle cx={nodes[19].x} cy={nodes[19].y} r="11" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
            <text x={nodes[19].x} y={nodes[19].y + 4.5} textAnchor="middle" fontSize="12" fill="#d97706">★</text>
            <text
              x={nodes[19].x}
              y={nodes[19].y + 26}
              textAnchor="middle"
              fontSize="10"
              fill="#94a3b8"
              fontFamily="DM Sans, sans-serif"
            >
              {content.examReadyLabel}
            </text>
          </g>

          {/* Floating topic card */}
          <foreignObject
            x={node8.x - 112}
            y={node8.y - 118}
            width="224"
            height="100"
            style={{ overflow: "visible" }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 10,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                borderLeft: "4px solid #f59e0b",
                padding: "10px 12px",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>
                {content.activeTopic.title}
              </div>
              <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>
                {content.activeTopic.subtitle}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ flex: 1, height: 5, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      width: content.activeTopic.progress,
                      height: "100%",
                      background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, color: "#d97706", fontWeight: 700 }}>
                  {content.activeTopic.progress}
                </span>
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 5 }}>{content.activeTopic.note}</div>
            </div>
          </foreignObject>

          {/* Completed badge */}
          <foreignObject
            x={node7.x - 66}
            y={node7.y + 16}
            width="132"
            height="26"
            style={{ overflow: "visible" }}
          >
            <div
              style={{
                background: "#4f46e5",
                color: "white",
                borderRadius: 20,
                padding: "4px 12px",
                fontSize: 11,
                fontWeight: 700,
                textAlign: "center",
                whiteSpace: "nowrap",
                boxShadow: "0 4px 12px rgba(79,70,229,0.35)",
              }}
            >
              {content.completedBadge}
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Progress bar footer */}
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 6, background: "#eef2ff", borderRadius: 3, overflow: "hidden" }}>
          <div
            style={{
              width: "35%",
              height: "100%",
              background: "linear-gradient(90deg, #4f46e5, #818cf8)",
              borderRadius: 3,
            }}
          />
        </div>
        <span style={{ fontSize: 12, color: "#4f46e5", fontWeight: 700 }}>{content.overallProgress}</span>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{content.completeLabel}</span>
      </div>
    </div>
  );
}
