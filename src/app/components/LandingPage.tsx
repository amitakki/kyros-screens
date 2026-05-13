import { useState } from "react";
import {
  Check,
  ArrowRight,
  Star,
  Zap,
  BarChart2,
  Flag,
  ChevronDown,
  Lock,
  Shield,
  Target,
  Clock,
  Menu,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useIsMobile } from "./hooks/useIsMobile";

const FF = "DM Sans, sans-serif";

/* ══════════════════════════════════════════════
   HERO — PATH VISUALISATION
══════════════════════════════════════════════ */
function PathVisualization() {
  const nodes = Array.from({ length: 20 }, (_, i) => {
    const t = i / 19;
    const x = 24 + t * 452;
    const y = 270 - Math.pow(t, 0.65) * 230;
    return { x, y, index: i + 1 };
  });
  const solidPath = nodes
    .slice(0, 8)
    .map(
      (n, i) =>
        `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`,
    )
    .join(" ");
  const dashedPath = nodes
    .slice(7)
    .map(
      (n, i) =>
        `${i === 0 ? "M" : "L"} ${n.x.toFixed(1)} ${n.y.toFixed(1)}`,
    )
    .join(" ");
  const node8 = nodes[7];
  const node7 = nodes[6];
  return (
    <div className="bg-[#FFFBEB] rounded-[16px] p-6 border border-[#E9D5FF] shadow-2xl relative">
      <div className="flex items-center justify-between mb-4">
        <span
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "#6B7280",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Emma's Learning Path — Maths
        </span>
        <span
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "#10B981",
            fontWeight: 600,
          }}
        >
          7 of 20 topics ✓
        </span>
      </div>
      <div className="relative" style={{ height: 300 }}>
        <svg
          viewBox="0 0 500 300"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <path
            d={solidPath}
            stroke="#4F46E5"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={dashedPath}
            stroke="#D1D5DB"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          {nodes.map((node, i) => {
            if (i < 7)
              return (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="8"
                    fill="#10B981"
                  />
                  <polyline
                    points={`${node.x - 3.5},${node.y} ${node.x - 1},${node.y + 3} ${node.x + 4},${node.y - 3}`}
                    stroke="white"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            if (i === 7)
              return (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="18"
                    fill="#4F46E5"
                    opacity="0.12"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="12"
                    fill="#4F46E5"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="5"
                    fill="white"
                  />
                </g>
              );
            if (i === 19)
              return (
                <g key={i}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="10"
                    fill="white"
                    stroke="#4F46E5"
                    strokeWidth="2"
                  />
                  <text
                    x={node.x}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#4F46E5"
                  >
                    ★
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 26}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94A3B8"
                    fontFamily={FF}
                  >
                    Exam ready
                  </text>
                </g>
              );
            return (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="7"
                  fill="#F9FAFB"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
          {/* Floating topic card */}
          <foreignObject
            x={node8.x - 112}
            y={node8.y - 112}
            width="224"
            height="98"
            style={{ overflow: "visible" }}
          >
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 10,
                boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                borderLeft: "4px solid #4F46E5",
                padding: "10px 12px",
                fontFamily: FF,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 2,
                }}
              >
                Topic 8 — Basic Algebra
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#6B7280",
                  marginBottom: 8,
                }}
              >
                Adapted to Emma · Medium difficulty
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    background: "#E2E8F0",
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      background: "#4F46E5",
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#4F46E5",
                    fontWeight: 600,
                  }}
                >
                  70%
                </span>
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: "#94A3B8",
                  marginTop: 4,
                }}
              >
                Your best: 70% — keep going!
              </div>
            </div>
          </foreignObject>
          {/* Topic 7 badge */}
          <foreignObject
            x={node7.x - 62}
            y={node7.y + 16}
            width="124"
            height="26"
            style={{ overflow: "visible" }}
          >
            <div
              style={{
                background: "#10B981",
                color: "#FFFFFF",
                borderRadius: 20,
                padding: "4px 10px",
                fontSize: 11,
                fontWeight: 600,
                fontFamily: FF,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Topic 7 ✓ — 92%
            </div>
          </foreignObject>
        </svg>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-2 bg-[#E9D5FF] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#4F46E5] rounded-full"
            style={{ width: "35%" }}
          />
        </div>
        <span
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "#4F46E5",
            fontWeight: 600,
          }}
        >
          35%
        </span>
        <span
          style={{
            fontFamily: FF,
            fontSize: 12,
            color: "#6B7280",
          }}
        >
          complete
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FEATURE SPOTLIGHT — TOP PANEL: TOPIC GRID
══════════════════════════════════════════════ */
function TopicGridMockup() {
  const subjects = [
    "Maths",
    "English",
    "Verbal Reasoning",
    "Non-Verbal Reasoning",
  ];
  const topics = [
    { label: "Place Value", score: "94%", state: "done" },
    { label: "Addition & Sub", score: "88%", state: "done" },
    { label: "Multiplication", score: "91%", state: "done" },
    { label: "Division", score: "85%", state: "done" },
    { label: "Fractions", score: "90%", state: "done" },
    { label: "Decimals", score: "87%", state: "done" },
    { label: "Percentages", score: "92%", state: "done" },
    { label: "Basic Algebra", score: "", state: "active" },
    { label: "Ratio & Proportion", score: "", state: "locked" },
    { label: "Geometry", score: "", state: "locked" },
    { label: "Measures", score: "", state: "locked" },
    { label: "Statistics", score: "", state: "locked" },
    { label: "Number Patterns", score: "", state: "locked" },
    { label: "Problem Solving", score: "", state: "locked" },
    { label: "Word Problems", score: "", state: "locked" },
    { label: "Shape & Space", score: "", state: "locked" },
    { label: "Data Handling", score: "", state: "locked" },
    { label: "Mental Maths", score: "", state: "locked" },
    { label: "Mixed Review", score: "", state: "locked" },
    { label: "Mock Exam Prep", score: "", state: "locked" },
  ];
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: 20,
        fontFamily: FF,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 16,
          overflowX: "auto",
        }}
      >
        {subjects.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "#FFFFFF" : "#94A3B8",
              background: i === 0 ? "#4F46E5" : "transparent",
              border: i === 0 ? "none" : "1px solid #E2E8F0",
              whiteSpace: "nowrap",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            {i === 0 && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.8)",
                  display: "inline-block",
                }}
              />
            )}
            {s}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 6,
        }}
      >
        {topics.map((topic, i) => (
          <div
            key={i}
            style={{
              borderRadius: 10,
              padding: "8px 6px",
              textAlign: "center",
              ...(topic.state === "done"
                ? {
                    background: "#FFFFFF",
                    border: "2px solid #10B981",
                    borderTop: "3px solid #10B981",
                  }
                : topic.state === "active"
                  ? { background: "#4F46E5", border: "none" }
                  : {
                      background: "#F8FAFC",
                      border: "1px solid #D1D5DB",
                    }),
            }}
          >
            {topic.state === "done" && (
              <>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#10B981",
                    marginBottom: 1,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#374151",
                    lineHeight: 1.2,
                    marginBottom: 2,
                  }}
                >
                  {topic.label}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#10B981",
                  }}
                >
                  {topic.score}
                </div>
              </>
            )}
            {topic.state === "active" && (
              <>
                <div
                  style={{
                    fontSize: 9,
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: 1,
                  }}
                >
                  In Progress
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#FFFFFF",
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {topic.label}
                </div>
                <div
                  style={{
                    width: 16,
                    height: 4,
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: 2,
                    margin: "3px auto 0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "70%",
                      height: "100%",
                      background: "white",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </>
            )}
            {topic.state === "locked" && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: "#D1D5DB",
                    marginBottom: 1,
                  }}
                >
                  🔒
                </div>
                <div
                  style={{
                    fontSize: 9,
                    color: "#9CA3AF",
                    lineHeight: 1.2,
                  }}
                >
                  {topic.label}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 14,
          background: "#EEF2FF",
          border: "1px solid #C7D2FE",
          borderRadius: 8,
          padding: "10px 12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <Zap
            size={14}
            style={{
              color: "#4F46E5",
              marginTop: 1,
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontSize: 11,
              color: "#3730A3",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            <strong>Based on Emma's results,</strong> we've
            adjusted Topic 8 to focus on word problems — her
            biggest growth opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FEATURE SPOTLIGHT — BOTTOM PANEL: PARENT DASHBOARD
══════════════════════════════════════════════ */
function ParentDashboardPanel() {
  const subjects = [
    { name: "Maths", pct: 78, color: "#4F46E5" },
    { name: "English", pct: 85, color: "#10B981" },
    { name: "Verbal Reasoning", pct: 72, color: "#F59E0B" },
    { name: "Non-Verbal", pct: 65, color: "#EF4444" },
  ];
  return (
    <div
      style={{
        marginTop: 12,
        background: "#FFFFFF",
        border: "1px solid #E2E8F0",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: "18px 20px",
        fontFamily: FF,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#1E293B",
              marginBottom: 2,
            }}
          >
            Emma Thompson · Year 5 · Kent
          </p>
          <p style={{ fontSize: 11, color: "#94A3B8" }}>
            Last active: today · 🔥 5-day streak
          </p>
        </div>
        <span
          style={{
            fontSize: 10,
            background: "#EEF2FF",
            color: "#4F46E5",
            padding: "3px 9px",
            borderRadius: 20,
            fontWeight: 600,
          }}
        >
          Live
        </span>
      </div>
      {subjects.map((s) => (
        <div
          key={s.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 60,
              fontSize: 11,
              color: "#475569",
              flexShrink: 0,
            }}
          >
            {s.name}
          </div>
          <div
            style={{
              flex: 1,
              height: 7,
              background: "#F1F5F9",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${s.pct}%`,
                height: "100%",
                background: s.color,
                borderRadius: 4,
              }}
            />
          </div>
          <div
            style={{
              width: 36,
              fontSize: 11,
              fontWeight: 700,
              color: s.color,
              textAlign: "right",
            }}
          >
            {s.pct}%
          </div>
        </div>
      ))}
      <p
        style={{
          fontSize: 11,
          color: "#94A3B8",
          marginTop: 10,
          textAlign: "center",
        }}
      >
        See exactly where your child stands at any time
      </p>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PRICING FEATURE LIST
══════════════════════════════════════════════ */
function PricingFeatureList() {
  const items = [
    "Adaptive learning path — all 4 subjects",
    "Personalised diagnostic from day one",
    "Unlimited mock exams (GL · CEM · Kent · ISEB)",
    "Parent progress dashboard",
  ];
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        margin: "0 0 24px",
      }}
    >
      {items.map((item) => (
        <li
          key={item}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <Check
            size={15}
            style={{
              color: "#4F46E5",
              marginTop: 2,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#475569",
              lineHeight: 1.5,
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ══════════════════════════════════════════════
   MAIN LANDING PAGE
══════════════════════════════════════════════ */
export function LandingPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<
    string | null
  >(null);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const schools = [
    "Tonbridge Grammar",
    "The Judd School",
    "Invicta Grammar",
    "Dartford Grammar",
    "Weald of Kent",
    "Simon Langton",
    "King Edward's Birmingham",
    "Withington Girls'",
    "Reading School",
    "Henrietta Barnett",
    "St Olave's Grammar",
    "Tiffin School",
    "Wallington County",
    "Wilson's School",
    "Altrincham Grammar",
  ];
  const tickerItems = [...schools, ...schools];

  const faqItems = [
    {
      q: "Is this suitable for my child's level?",
      a: "Yes. Our diagnostic test assesses your child's current level across all four subjects on day one and builds a path that starts exactly where they are — whether just starting out or already well ahead.",
    },
    {
      q: "How is this different from books or a tutor?",
      a: "Books give everyone the same content. Tutors are expensive and limited by availability. Kyros adapts to your child's performance, tracks progress automatically, and is available any time — for the price of a single tutoring hour per month.",
    },
    {
      q: "How often should my child practise?",
      a: "20–30 minutes a day is more effective than long weekend sessions. Kyros is designed for short, focused daily practice — each topic takes around 20 minutes to complete.",
    },
    {
      q: "Do you cover all exam boards?",
      a: "Yes — GL Assessment, CEM, Kent Test and ISEB formats are all covered. Select your child's target schools when setting up their profile and we tailor the content accordingly.",
    },
    {
      q: "Can I track my child's progress?",
      a: "Yes. The parent dashboard shows progress across all four subjects, highlights weak areas, tracks scores over time, and lets you download a full PDF report at any time.",
    },
  ];

  const answerOptions = [
    { id: "A", text: "x = 2" },
    { id: "B", text: "x = 3" },
    { id: "C", text: "x = 4" },
    { id: "D", text: "x = 5" },
    { id: "E", text: "x = 6" },
  ];
  const correctAnswer = "C";

  return (
    <div
      className="min-h-screen bg-[#F8FAFC]"
      style={{ fontFamily: FF }}
    >
      {/* ─── Ticker keyframes ─── */}
      <style>{`
        @keyframes kyrosTickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .kyros-ticker-track { display: flex; animation: kyrosTickerScroll 36s linear infinite; will-change: transform; }
        .kyros-ticker-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ══════════════════════════════════════
          SECTION 1 — STICKY HEADER
      ══════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#1E1B4B] border-b border-[#2D2A5E]">
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 40,
                height: 40,
                border: "2px dashed #C7D2FE",
                background: "#EEF2FF",
              }}
            >
              <span style={{ fontSize: 9, color: "#94A3B8", fontWeight: 500, letterSpacing: "0.05em" }}>
                LOGO
              </span>
            </div>
            <span style={{ color: "#FFFFFF", fontSize: 18, fontWeight: 600 }}>Kyros</span>
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <nav className="flex items-center gap-8">
              {["How It Works", "Schools", "Pricing", "FAQ"].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ color: "#A5B4FC", fontSize: 16, textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#A5B4FC")}
                >{item}</a>
              ))}
            </nav>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" style={{ color: "#FFFFFF", fontSize: 16 }} className="hover:bg-white/10">Log in</Button>
              </Link>
              <Link to="/register">
                <Button style={{ background: "#4F46E5", color: "#FFFFFF", borderRadius: 24, height: 44, paddingLeft: 20, paddingRight: 20, fontSize: 15, fontWeight: 600 }} className="hover:bg-[#4338CA]">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#FFFFFF", display: "flex", alignItems: "center" }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        {isMobile && menuOpen && (
          <div style={{ background: "#1E1B4B", borderTop: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px 24px" }}>
            {["How It Works", "Schools", "Pricing", "FAQ"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setMenuOpen(false)}
                style={{ display: "block", color: "#A5B4FC", fontSize: 16, textDecoration: "none", padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >{item}</a>
            ))}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button variant="ghost" style={{ width: "100%", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.2)" }} className="hover:bg-white/10">Log in</Button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <Button style={{ width: "100%", background: "#4F46E5", color: "#FFFFFF", borderRadius: 8, height: 48, fontSize: 15, fontWeight: 600 }} className="hover:bg-[#4338CA]">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════
          SECTION 2 — HERO
      ══════════════════════════════════════ */}
      <section
        className="bg-[#F8FAFC]"
        style={{
          minHeight: "calc(100vh - 72px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-[1280px] mx-auto px-6 py-12 w-full" style={{ paddingTop: isMobile ? 40 : 80, paddingBottom: isMobile ? 40 : 80 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "55fr 45fr",
              gap: isMobile ? 32 : 64,
              alignItems: "center",
            }}
          >
            {/* Left — Copy */}
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#A5B4FC",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 24,
                }}
              >
                GL Assessment · CEM · Kent Test · ISEB
              </p>
              <h1
                style={{
                  fontSize: 52,
                  fontWeight: 700,
                  color: "#1E293B",
                  lineHeight: 1.15,
                  marginBottom: 24,
                }}
              >
                Give your child
                <br />
                the confidence
                <br />
                to shine
              </h1>
              <p
                style={{
                  fontSize: 18,
                  color: "#475569",
                  lineHeight: 1.65,
                  marginBottom: 24,
                  maxWidth: 480,
                }}
              >
                Adaptive practice and a clear path to exam day — built around your child from the very first question.
              </p>

              {/* Proof bar */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 20,
                  marginBottom: 28,
                  fontSize: 14,
                  color: "#1E293B",
                }}
              >
                {[
                  {
                    icon: "⭐",
                    label: "4.9/5 from 1,200+ parents",
                  },
                  { icon: "🏫", label: "Used for 288 grammar schools" },
                  { icon: "👨‍👩‍👧", label: "Trusted by 10,000+ families" },
                ].map((item) => (
                  <span
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontWeight: 500,
                    }}
                  >
                    <span>{item.icon}</span> {item.label}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                to="/register"
                style={{ display: "block", marginBottom: 10 }}
              >
                <Button
                  style={{
                    width: "100%",
                    height: 56,
                    background: "#4F46E5",
                    color: "#FFFFFF",
                    fontSize: 17,
                    fontWeight: 700,
                    borderRadius: 8,
                  }}
                  className="hover:bg-[#4338CA]"
                >
                  Start Your Free 7-Day Trial
                </Button>
              </Link>

              {/* Micro-copy */}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 13,
                  color: "#94A3B8",
                  marginBottom: 24,
                }}
              >
                No card required · Cancel anytime · Takes 2
                minutes to set up
              </p>

              {/* Mini onboarding steps */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "#94A3B8",
                  marginBottom: 20,
                }}
              >
                {[
                  "Sign up free",
                  "Take diagnostic",
                  "Get personalised plan",
                ].map((step, i) => (
                  <span
                    key={step}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        background: "#EEF2FF",
                        color: "#4F46E5",
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 11,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                    {i < 2 && (
                      <span style={{ color: "#C7D2FE" }}>
                        →
                      </span>
                    )}
                  </span>
                ))}
              </div>

              {/* Trust badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  fontSize: 12,
                  color: "#94A3B8",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Lock
                    size={12}
                    style={{ color: "#94A3B8" }}
                  />{" "}
                  Safe for children
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Check
                    size={12}
                    style={{ color: "#94A3B8" }}
                  />{" "}
                  Cancel in 2 clicks
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Shield
                    size={12}
                    style={{ color: "#94A3B8" }}
                  />{" "}
                  GDPR compliant
                </span>
              </div>
            </div>

            {/* Right — Path Visualisation (desktop only) */}
            {!isMobile && <PathVisualization />}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 3 — SCHOOL TICKER
      ══════════════════════════════════════ */}
      <section
        id="schools"
        style={{
          background: "#1E293B",
          height: 56,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div style={{ overflow: "hidden", width: "100%" }}>
          <div className="kyros-ticker-track">
            {tickerItems.map((school, i) => (
              <span
                key={i}
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  paddingRight: 32,
                  fontFamily: FF,
                }}
              >
                {i === 0 || i === schools.length ? (
                  <span>
                    <span
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        marginRight: 12,
                      }}
                    >
                      Families preparing for:
                    </span>
                    {school}
                  </span>
                ) : (
                  <>·&nbsp;&nbsp;{school}</>
                )}
              </span>
            ))}
            <span
              style={{
                color: "#A5B4FC",
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: "nowrap",
                paddingRight: 64,
              }}
            >
              and 277 more →
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 4 — OUTCOMES STRIP (NEW)
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#1E1B4B",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: isMobile ? 32 : 48,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            {[
              {
                number: "+22%",
                label: "average improvement in 8 weeks",
              },
              {
                number: "87%",
                label: "of students reach exam-ready level",
              },
              {
                number: "3 in 5",
                label:
                  "students improve by at least one grade band",
              },
            ].map((stat) => (
              <div key={stat.number}>
                <div
                  style={{
                    fontSize: 52,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.1,
                    marginBottom: 12,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#A5B4FC",
                    lineHeight: 1.5,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 11,
              color: "#A5B4FC",
              opacity: 0.7,
            }}
          >
            Based on data from 1,200+ students using structured learning paths
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 5 — HOW IT WORKS
      ══════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{
          background: "#F8FAFC",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            className="text-center"
            style={{ marginBottom: 64 }}
          >
            <h2
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: 16,
              }}
            >
              A clear path from day one to exam day
            </h2>
            <p style={{ fontSize: 16, color: "#475569" }}>
              Start early. Stay ahead. Know exactly when your
              child is exam-ready.
            </p>
          </div>

          <div
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 32,
              marginBottom: 80,
            }}
          >
            {!isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: 36,
                  left: "20%",
                  right: "20%",
                  height: 2,
                  borderTop: "2px dashed #C7D2FE",
                  zIndex: 0,
                }}
              />
            )}

            {/* Step 1 */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 32,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "#EEF2FF",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <BarChart2
                  size={28}
                  style={{ color: "#4F46E5" }}
                />
              </div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#4F46E5",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Discover
              </p>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 12,
                }}
              >
                Find the starting point
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                A 40-question diagnostic across all four
                subjects. Instant results. Personalised path
                generated immediately.
              </p>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: "#4F46E5",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontWeight: 500,
                }}
              >
                Find your child's starting point{" "}
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Step 2 */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 32,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "#EEF2FF",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Zap size={28} style={{ color: "#4F46E5" }} />
              </div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#4F46E5",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Adapt
              </p>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 12,
                }}
              >
                Practice that adjusts to them
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.65,
                }}
              >
                Questions adapt to your child's level as they
                progress. Topics unlock one by one. Always the
                right next step.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 32,
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: "#EEF2FF",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}
              >
                <Flag size={28} style={{ color: "#4F46E5" }} />
              </div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#4F46E5",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Succeed
              </p>
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 12,
                }}
              >
                Arrive at exam day ready
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#475569",
                  lineHeight: 1.65,
                  marginBottom: 16,
                }}
              >
                Full mock exams in GL Assessment, CEM, Kent Test
                and ISEB formats. Timed, marked, and explained
                in full.
              </p>
              <a
                href="#"
                style={{
                  fontSize: 13,
                  color: "#4F46E5",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontWeight: 500,
                }}
              >
                See the full learning path{" "}
                <ArrowRight size={13} />
              </a>
            </div>
          </div>

          {/* Contextual CTA */}
          <div style={{ textAlign: "center", marginTop: 48, marginBottom: 64 }}>
            <Link to="/register">
              <Button
                style={{
                  background: "#4F46E5",
                  color: "#FFFFFF",
                  height: 48,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                }}
                className="hover:bg-[#4338CA]"
              >
                Find your child's starting point{" "}
                <ArrowRight size={15} style={{ marginLeft: 6 }} />
              </Button>
            </Link>
          </div>

          {/* Pull quote — centred, no illustration */}
          <div
            style={{
              textAlign: "center",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontSize: 56,
                lineHeight: 0.75,
                color: "#C7D2FE",
                fontFamily: "Georgia, serif",
                marginBottom: 16,
              }}
            >
              "
            </div>
            <p
              style={{
                fontSize: 22,
                fontStyle: "italic",
                color: "#1E293B",
                lineHeight: 1.6,
                marginBottom: 20,
              }}
            >
              She started enjoying practice. That told me
              everything.
            </p>
            <cite
              style={{
                fontSize: 14,
                color: "#94A3B8",
                fontStyle: "normal",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #4F46E5, #818CF8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: "white",
                }}
              >
                S
              </div>
              <span>Parent, Year 5, Kent</span>
            </cite>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 6 — FEATURE SPOTLIGHT
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#FFFFFF",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 32 : 64,
              alignItems: "start",
            }}
          >
            {/* Copy first on mobile, panels second */}
            {isMobile && (
              <div style={{ maxWidth: 440 }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: "#4F46E5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Adaptive Learning Path</p>
                <h2 style={{ fontSize: 28, fontWeight: 700, color: "#1E293B", lineHeight: 1.25, marginBottom: 16 }}>Always the right question at the right time</h2>
                <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, marginBottom: 0 }}>Our platform continuously adjusts to your child's performance. Topics unlock in the right order. Questions calibrate to their level.</p>
              </div>
            )}

            {/* Left — Two stacked panels */}
            <div>
              <TopicGridMockup />
              <ParentDashboardPanel />
            </div>

            {/* Right — Copy (desktop only) */}
            {!isMobile && <div style={{ maxWidth: 440, paddingTop: 16 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#4F46E5",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Adaptive Learning Path
              </p>
              <h2
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#1E293B",
                  lineHeight: 1.25,
                  marginBottom: 20,
                }}
              >
                Always the right
                <br />
                question at the
                <br />
                right time
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: 28,
                }}
              >
                Our platform continuously adjusts to your
                child's performance. Topics unlock in the right
                order. Questions calibrate to their level. And
                you always know exactly where they stand.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 28px",
                }}
              >
                {[
                  "20 structured topics per subject, unlocking progressively",
                  "Questions adapt to your child's level in real time",
                  "Weak areas surfaced and prioritised automatically",
                  "Parent dashboard shows progress across all four subjects",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      marginBottom: 12,
                    }}
                  >
                    <Check
                      size={16}
                      style={{
                        color: "#4F46E5",
                        marginTop: 2,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        color: "#475569",
                        lineHeight: 1.55,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                style={{
                  fontSize: 14,
                  color: "#4F46E5",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration =
                    "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration =
                    "none")
                }
              >
                See your personalised learning path{" "}
                <ArrowRight size={14} />
              </a>
            </div>}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 7 — BEFORE / AFTER (NEW)
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#F8FAFC",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1E293B",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            What changes when you use Kyros
          </h2>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto 28px",
              background: "#FFFFFF",
              borderRadius: 12,
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              overflowX: "auto",
              border: "1px solid #E2E8F0",
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: "#F8FAFC",
                borderBottom: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94A3B8",
                }}
              />
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#94A3B8",
                }}
              >
                Without Kyros
              </div>
              <div
                style={{
                  padding: "14px 24px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#4F46E5",
                  background: "#EEF2FF",
                }}
              >
                With Kyros
              </div>
            </div>
            {[
              {
                feature: "Learning approach",
                without: "Random practice",
                with: "Structured path to exam day",
              },
              {
                feature: "Weak areas",
                without: "Unknown until too late",
                with: "Identified from day one",
              },
              {
                feature: "Scores over time",
                without: "Inconsistent, unpredictable",
                with: "Steady, tracked improvement",
              },
              {
                feature: "Parent visibility",
                without: "Guessing how they're doing",
                with: "Live progress dashboard",
              },
              {
                feature: "Exam readiness",
                without: "Exam format a mystery",
                with: "Real mock exams, real formats",
              },
            ].map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  background:
                    i % 2 === 0 ? "#FFFFFF" : "#F8FAFC",
                  borderBottom:
                    i < 4 ? "1px solid #F1F5F9" : "none",
                }}
              >
                <div
                  style={{
                    padding: "14px 24px",
                    fontSize: 13,
                    color: "#94A3B8",
                    fontWeight: 500,
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    padding: "14px 24px",
                    fontSize: 13,
                    color: "#64748B",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      color: "#EF4444",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    ✗
                  </span>{" "}
                  {row.without}
                </div>
                <div
                  style={{
                    padding: "14px 24px",
                    fontSize: 13,
                    color: "#1E293B",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#EEF2FF",
                  }}
                >
                  <span
                    style={{
                      color: "#10B981",
                      fontWeight: 700,
                      fontSize: 15,
                    }}
                  >
                    ✓
                  </span>{" "}
                  {row.with}
                </div>
              </div>
            ))}
          </div>
          {/* Real example pill */}
          <div style={{ textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                background: "#EEF2FF",
                border: "1px solid #C7D2FE",
                color: "#3730A3",
                padding: "10px 24px",
                borderRadius: 24,
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Emma: <strong>52% → 78%</strong> in 6 weeks
              &nbsp;·&nbsp; Year 5 &nbsp;·&nbsp; Target:
              Tonbridge Grammar
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 8 — TRY A QUESTION (NEW)
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#FFFFFF",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            style={{ textAlign: "center", marginBottom: 40 }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: 12,
              }}
            >
              Try a sample question
            </h2>
            <p style={{ fontSize: 16, color: "#475569" }}>
              See how Kyros explains every answer — right or
              wrong.
            </p>
          </div>

          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                padding: 32,
              }}
            >
              {/* Badges */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Maths · Topic 8
                </span>
                <span
                  style={{
                    background: "#FEF3C7",
                    color: "#92400E",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  Medium
                </span>
              </div>

              {/* Question */}
              <p
                style={{
                  fontSize: 18,
                  color: "#1E293B",
                  fontWeight: 600,
                  marginBottom: 24,
                  lineHeight: 1.5,
                }}
              >
                Solve for <em>x</em>: &nbsp; 2x + 5 = 13
              </p>

              {/* Answer options */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                {answerOptions.map((opt) => {
                  const isSelected = selectedAnswer === opt.id;
                  const isCorrect = opt.id === correctAnswer;
                  const showResult = submitted;
                  let borderColor = "#E9D5FF";
                  let bg = "#FFFFFF";
                  let textColor = "#1E293B";
                  if (showResult && isCorrect) {
                    borderColor = "#10B981";
                    bg = "#F0FDF4";
                    textColor = "#065F46";
                  } else if (
                    showResult &&
                    isSelected &&
                    !isCorrect
                  ) {
                    borderColor = "#EF4444";
                    bg = "#FEF2F2";
                    textColor = "#991B1B";
                  } else if (!showResult && isSelected) {
                    borderColor = "#4F46E5";
                    bg = "#EEF2FF";
                  }
                  return (
                    <button
                      key={opt.id}
                      onClick={() =>
                        !submitted && setSelectedAnswer(opt.id)
                      }
                      disabled={submitted}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        height: 48,
                        padding: "0 16px",
                        border: `1.5px solid ${borderColor}`,
                        borderRadius: 10,
                        background: bg,
                        cursor: submitted
                          ? "default"
                          : "pointer",
                        fontSize: 15,
                        color: textColor,
                        fontFamily: FF,
                        textAlign: "left",
                        transition: "all 0.15s",
                        ...(showResult && isCorrect
                          ? { borderLeftWidth: 4 }
                          : {}),
                      }}
                    >
                      <span
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: `1.5px solid ${isSelected || (showResult && isCorrect) ? borderColor : "#D1D5DB"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          color:
                            isSelected ||
                            (showResult && isCorrect)
                              ? borderColor
                              : "#94A3B8",
                          flexShrink: 0,
                        }}
                      >
                        {opt.id}
                      </span>
                      {opt.text}
                      {showResult && isCorrect && (
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#10B981",
                          }}
                        >
                          ✓ Correct
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Submit / Explanation */}
              {!submitted ? (
                <button
                  onClick={() =>
                    selectedAnswer && setSubmitted(true)
                  }
                  style={{
                    width: "100%",
                    height: 48,
                    background: selectedAnswer
                      ? "#4F46E5"
                      : "#E2E8F0",
                    color: selectedAnswer
                      ? "#FFFFFF"
                      : "#94A3B8",
                    border: "none",
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: selectedAnswer
                      ? "pointer"
                      : "not-allowed",
                    fontFamily: FF,
                    transition: "all 0.2s",
                  }}
                >
                  Submit Answer
                </button>
              ) : (
                <div
                  style={{
                    background: "#EEF2FF",
                    border: "1px solid #C7D2FE",
                    borderLeft: "4px solid #4F46E5",
                    borderRadius: 8,
                    padding: "14px 16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#3730A3",
                      marginBottom: 8,
                    }}
                  >
                    Step-by-step explanation
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#374151",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    <strong>Step 1:</strong> Subtract 5 from
                    both sides: 2x = 8<br />
                    <strong>Step 2:</strong> Divide both sides
                    by 2: x = 4 ✓
                  </p>
                </div>
              )}
            </div>

            <div style={{ textAlign: "center", marginTop: 28 }}>
              <Link to="/register">
                <Button
                  style={{
                    background: "#4F46E5",
                    color: "#FFFFFF",
                    height: 52,
                    paddingLeft: 32,
                    paddingRight: 32,
                    borderRadius: 8,
                    fontSize: 16,
                    fontWeight: 600,
                    marginBottom: 12,
                  }}
                  className="hover:bg-[#4338CA]"
                >
                  Start your free trial to continue practice{" "}
                  <ArrowRight size={16} style={{ marginLeft: 6 }} />
                </Button>
              </Link>
              <p
                style={{
                  fontSize: 14,
                  color: "#64748B",
                }}
              >
                Every question includes step-by-step explanations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 9 — TESTIMONIALS
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#EEF2FF",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            style={{ textAlign: "center", marginBottom: 56 }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1E293B",
              }}
            >
              Families who made it
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 24,
              marginBottom: 40,
            }}
          >
            {[
              {
                quote:
                  "Went from 60% to 85% in 2 months. She got into Invicta.",
                author: "Sarah M. — Maidstone, Kent",
                school: "Invicta Grammar ✓",
                badge: "+25 points",
                initial: "S",
                color: "#4F46E5",
              },
              {
                quote:
                  "Got into Judd after really struggling with maths. The path made the difference — he always knew what to do next.",
                author: "James T. — Tonbridge, Kent",
                school: "The Judd School ✓",
                badge: "Maths: 58% → 81%",
                initial: "J",
                color: "#10B981",
              },
              {
                quote:
                  "Her confidence went through the roof. King Edward's — first choice.",
                author: "Priya K. — Birmingham",
                school: "King Edward's ✓",
                badge: "+22 points in 8 weeks",
                initial: "P",
                color: "#F59E0B",
              },
            ].map((t) => (
              <Card
                key={t.author}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  position: "relative",
                }}
              >
                {/* Micro-badge top right */}
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {t.badge}
                </div>
                <CardContent style={{ padding: 28 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${t.color}22, ${t.color}55)`,
                        border: `2px solid ${t.color}44`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 700,
                        color: t.color,
                      }}
                    >
                      {t.initial}
                    </div>
                    <div style={{ display: "flex", gap: 2 }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          style={{ color: "#F59E0B" }}
                          fill="#F59E0B"
                        />
                      ))}
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 15,
                      color: "#1E293B",
                      lineHeight: 1.65,
                      marginBottom: 20,
                      fontStyle: "italic",
                    }}
                  >
                    "{t.quote}"
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1E293B",
                      marginBottom: 10,
                    }}
                  >
                    {t.author}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#D1FAE5",
                      color: "#065F46",
                      padding: "4px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {t.school}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Star
                size={20}
                style={{ color: "#F59E0B" }}
                fill="#F59E0B"
              />
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#1E293B",
                }}
              >
                4.9 / 5
              </span>
              <span style={{ fontSize: 14, color: "#94A3B8" }}>
                from 1,200+ parents
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 10 — WHO IS THIS FOR? (NEW)
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#F8FAFC",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1E293B",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            Built for 11+ students
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 24 : 48,
            }}
          >
            {/* Left */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: isMobile ? 24 : 40,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 24,
                }}
              >
                Kyros works for:
              </h3>
              {[
                "Year 4–6 students starting early",
                "Students needing structured revision",
                "Children targeting top grammar schools",
                "Beginners with no prior prep experience",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <Check
                    size={18}
                    style={{ color: "#4F46E5", flexShrink: 0 }}
                  />
                  <span
                    style={{ fontSize: 16, color: "#374151" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {/* Right */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: isMobile ? 24 : 40,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <h3
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#1E293B",
                  marginBottom: 24,
                }}
              >
                All four subjects covered:
              </h3>
              {[
                {
                  abbr: "M",
                  name: "Maths",
                  desc: "From times tables to algebra and ratio",
                  color: "#4F46E5",
                },
                {
                  abbr: "E",
                  name: "English",
                  desc: "Comprehension, vocabulary and writing skills",
                  color: "#10B981",
                },
                {
                  abbr: "VR",
                  name: "Verbal Reasoning",
                  desc: "Codes, analogies and word patterns",
                  color: "#F59E0B",
                },
                {
                  abbr: "NVR",
                  name: "Non-Verbal Reasoning",
                  desc: "Shapes, sequences and spatial reasoning",
                  color: "#06B6D4",
                },
              ].map((s) => (
                <div
                  key={s.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: s.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "white",
                      flexShrink: 0,
                    }}
                  >
                    {s.abbr}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1E293B",
                        marginBottom: 2,
                      }}
                    >
                      {s.name}
                    </p>
                    <p
                      style={{ fontSize: 13, color: "#64748B" }}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 14,
              color: "#4F46E5",
              marginTop: 32,
              fontWeight: 500,
            }}
          >
            Covers GL Assessment, CEM, Kent Test and ISEB
            formats
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 11 — WHY PARENTS CHOOSE KYROS
      ══════════════════════════════════════ */}
      <section
        style={{
          background: "#FFFFFF",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1E293B",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Why parents choose Kyros
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 32,
              maxWidth: 1184,
              margin: "0 auto",
            }}
          >
            {[
              {
                icon: Target,
                iconColor: "#4F46E5",
                iconBg: "#EEF2FF",
                title: "No more guessing what to practise",
                desc: "The diagnostic shows exactly where to start. The learning path shows exactly what comes next.",
              },
              {
                icon: Clock,
                iconColor: "#F59E0B",
                iconBg: "#FEF3C7",
                title: "No wasted time on the wrong topics",
                desc: "Questions adapt to your child's level. Topics unlock in the right order. Every minute counts.",
              },
              {
                icon: BarChart2,
                iconColor: "#10B981",
                iconBg: "#D1FAE5",
                title: "Clear progress every week",
                desc: "See scores, track improvement, and know when your child is exam-ready — all in one dashboard.",
              },
            ].map((point) => {
              const IconComponent = point.icon;
              return (
                <div
                  key={point.title}
                  style={{
                    textAlign: "center",
                    padding: 32,
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      background: point.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                    }}
                  >
                    <IconComponent
                      size={28}
                      style={{ color: point.iconColor }}
                    />
                  </div>
                  <h3
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: "#1E293B",
                      marginBottom: 12,
                      lineHeight: 1.4,
                    }}
                  >
                    {point.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "#64748B",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 12 — FAQ (NEW)
      ══════════════════════════════════════ */}
      <section
        id="faq"
        style={{
          background: "#F8FAFC",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1E293B",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            Questions parents ask
          </h2>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {faqItems.map((item, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 12,
                  marginBottom: 12,
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <button
                  onClick={() =>
                    setOpenFaq(openFaq === i ? null : i)
                  }
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: FF,
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1E293B",
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: "#94A3B8",
                      flexShrink: 0,
                      transform:
                        openFaq === i
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      transition: "transform 0.2s",
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 24px 20px" }}>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#475569",
                        lineHeight: 1.7,
                        margin: 0,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
            <p
              style={{
                textAlign: "center",
                marginTop: 28,
                fontSize: 14,
                color: "#94A3B8",
              }}
            >
              More questions?{" "}
              <a
                href="#"
                style={{
                  color: "#4F46E5",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Visit our Help Centre →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SECTION 13 — PRICING
      ══════════════════════════════════════ */}
      <section
        id="pricing"
        style={{
          background: "#F8FAFC",
          paddingTop: 64,
          paddingBottom: 64,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            className="text-center"
            style={{ marginBottom: 56 }}
          >
            <h2
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: 14,
              }}
            >
              Simple pricing. Everything included.
            </h2>
            <p style={{ fontSize: 16, color: "#475569" }}>
              Every subject · every topic · every mock exam ·
              one plan.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: 24,
              maxWidth: 960,
              margin: "0 auto 36px",
              alignItems: "start",
            }}
          >
            {/* Monthly */}
            <Card
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
              }}
            >
              <CardContent style={{ padding: 32 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#475569",
                    marginBottom: 16,
                  }}
                >
                  Monthly
                </p>
                <div style={{ marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      color: "#1E293B",
                    }}
                  >
                    £9.99
                  </span>
                  <span
                    style={{ fontSize: 14, color: "#94A3B8" }}
                  >
                    /month
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    marginBottom: 20,
                  }}
                >
                  ≈ £0.33 per day
                </p>
                <PricingFeatureList />
                <Link to="/register">
                  <Button
                    variant="outline"
                    style={{
                      width: "100%",
                      height: 48,
                      border: "1px solid #4F46E5",
                      color: "#4F46E5",
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                    className="hover:bg-[#EEF2FF]"
                  >
                    Start Free Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quarterly — MOST POPULAR */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  top: -14,
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#4F46E5",
                  color: "#FFFFFF",
                  padding: "4px 16px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  zIndex: 10,
                  letterSpacing: "0.04em",
                }}
              >
                MOST POPULAR
              </div>
              <Card
                style={{
                  background: "#FFFFFF",
                  border: "2px solid #4F46E5",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(79,70,229,0.18)",
                  transform: "scale(1.04)",
                }}
              >
                <CardContent style={{ padding: 32 }}>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#475569",
                      marginBottom: 8,
                    }}
                  >
                    Quarterly
                  </p>
                  <div
                    style={{
                      display: "inline-block",
                      background: "#FEF3C7",
                      color: "#92400E",
                      padding: "3px 10px",
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      marginBottom: 10,
                    }}
                  >
                    Save £5
                  </div>
                  <div style={{ marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 40,
                        fontWeight: 700,
                        color: "#1E293B",
                      }}
                    >
                      £24.99
                    </span>
                    <span
                      style={{ fontSize: 14, color: "#94A3B8" }}
                    >
                      /quarter
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                      marginBottom: 20,
                    }}
                  >
                    ≈ £0.28 per day
                  </p>
                  <PricingFeatureList />
                  <Link to="/register">
                    <Button
                      style={{
                        width: "100%",
                        height: 48,
                        background: "#4F46E5",
                        color: "#FFFFFF",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 600,
                      }}
                      className="hover:bg-[#4338CA]"
                    >
                      Start your child's plan →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Annual */}
            <Card
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
              }}
            >
              <CardContent style={{ padding: 32 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#475569",
                    marginBottom: 8,
                  }}
                >
                  Annual
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "#D1FAE5",
                    color: "#065F46",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 10,
                  }}
                >
                  Save £40
                </div>
                <div style={{ marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 40,
                      fontWeight: 700,
                      color: "#1E293B",
                    }}
                  >
                    £79.99
                  </span>
                  <span
                    style={{ fontSize: 14, color: "#94A3B8" }}
                  >
                    /year
                  </span>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#10B981",
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    Just £6.67/month
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                    }}
                  >
                    ≈ £0.22 per day
                  </p>
                </div>
                <PricingFeatureList />
                <Link to="/register">
                  <Button
                    variant="outline"
                    style={{
                      width: "100%",
                      height: 48,
                      border: "1px solid #4F46E5",
                      color: "#4F46E5",
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                    className="hover:bg-[#EEF2FF]"
                  >
                    Start your child's plan →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Risk reducers */}
          <div
            style={{
              maxWidth: 600,
              margin: "0 auto 24px",
              display: "flex",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "✓", text: "7-day free trial" },
              { icon: "✓", text: "Cancel anytime in 2 clicks" },
              { icon: "✓", text: "No long-term commitment" },
            ].map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Check
                    size={12}
                    style={{
                      color: "#FFFFFF",
                      strokeWidth: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "#1E293B",
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Stripe · SSL secured · GDPR compliant · All prices
            include VAT
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer
        style={{
          background: "#0F172A",
          paddingTop: 64,
          paddingBottom: 40,
        }}
      >
        <div className="max-w-[1280px] mx-auto px-8">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1.5fr",
              gap: isMobile ? 32 : 48,
              marginBottom: 48,
              paddingBottom: 48,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    border: "2px dashed #4F46E5",
                    background: "#1E293B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 9,
                      color: "#94A3B8",
                      fontWeight: 500,
                      letterSpacing: "0.05em",
                    }}
                  >
                    LOGO
                  </span>
                </div>
                <span
                  style={{
                    color: "#FFFFFF",
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  Kyros
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 14,
                  lineHeight: 1.6,
                }}
              >
                The adaptive path to grammar school success.
              </p>
            </div>
            {/* Platform */}
            <div>
              <h4
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Platform
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  "How It Works",
                  "Learning Path",
                  "Mock Exams",
                  "Pricing",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "#FFFFFF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255,255,255,0.55)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Schools */}
            <div>
              <h4
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Schools
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {[
                  "Browse Schools",
                  "GL Assessment",
                  "CEM",
                  "Kent Test",
                  "ISEB",
                ].map((item) => (
                  <li key={item} style={{ marginBottom: 10 }}>
                    <a
                      href="#"
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: 14,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "#FFFFFF")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255,255,255,0.55)")
                      }
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Support */}
            <div>
              <h4
                style={{
                  color: "#FFFFFF",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 16,
                }}
              >
                Support
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {["Help", "Contact", "Privacy", "Terms"].map(
                  (item) => (
                    <li key={item} style={{ marginBottom: 10 }}>
                      <a
                        href="#"
                        style={{
                          color: "rgba(255,255,255,0.55)",
                          fontSize: 14,
                          textDecoration: "none",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color =
                            "#FFFFFF")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.55)")
                        }
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            {/* CTA */}
            <div
              style={{
                background: "#1E1B4B",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: 24,
              }}
            >
              <p
                style={{
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: 15,
                  marginBottom: 6,
                }}
              >
                Start Free Trial
              </p>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  marginBottom: 20,
                }}
              >
                No card required
              </p>
              <Link to="/register">
                <Button
                  style={{
                    width: "100%",
                    height: 44,
                    background: "#4F46E5",
                    color: "#FFFFFF",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                  className="hover:bg-[#4338CA]"
                >
                  Get started →
                </Button>
              </Link>
            </div>
          </div>
          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? 8 : 0,
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 12,
              }}
            >
              © 2024 Kyros. All rights reserved.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.3)",
                fontSize: 12,
              }}
            >
              Stripe · SSL secured · GDPR compliant
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}