import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/constants/routes";

// ─── Scroll Animation Hook ─────────────────────────────────────────────────

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// FadeIn: fades + slides up, fires once when scrolled into view.
// delay: ms offset for stagger effects
// direction: "up" | "left" | "right" for directional slides
function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}) {
  const { ref, inView } = useInView();

  const hiddenTransform =
    direction === "left"
      ? "translate(-28px, 0)"
      : direction === "right"
        ? "translate(28px, 0)"
        : "translate(0, 28px)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translate(0, 0)" : hiddenTransform,
        transition: `opacity 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.65s cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons (inline SVG) ────────────────────────────────────────────────────

const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const CrossIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// ─── Section Header ────────────────────────────────────────────────────────

function SectionHeader({
  eyebrow,
  eyebrowColor,
  title,
  subtitle,
}: {
  eyebrow: string;
  eyebrowColor: string;
  title: ReactNode;
  subtitle: string;
}) {
  return (
    <div className="text-center mb-16">
      <FadeIn>
        <p className={`${eyebrowColor} font-semibold text-sm uppercase tracking-widest mb-3`}>{eyebrow}</p>
      </FadeIn>
      <FadeIn delay={80}>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{title}</h2>
      </FadeIn>
      <FadeIn delay={160}>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </FadeIn>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────

function Navbar({ onCTA }: { onCTA: () => void }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-slate-950 font-black text-sm">K</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">Kyros</span>
            <span className="hidden sm:inline text-amber-400 text-xs font-semibold bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
              11+ Prep
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "How It Works", id: "how-it-works" },
              { label: "Features", id: "features" },
              { label: "Subjects", id: "subjects" },
              { label: "Pricing", id: "pricing" },
              { label: "FAQ", id: "faq" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate(ROUTES.login)} className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
              Log in
            </button>
            <button
              onClick={onCTA}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-amber-400/25"
            >
              Start Free Trial
            </button>
          </div>

          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Features", id: "features" },
            { label: "Subjects", id: "subjects" },
            { label: "Pricing", id: "pricing" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left text-slate-300 hover:text-white py-2 text-sm font-medium">
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <button onClick={() => { navigate(ROUTES.login); setMenuOpen(false); }} className="text-slate-300 text-sm font-medium py-2">
              Log in
            </button>
            <button onClick={() => { onCTA(); setMenuOpen(false); }} className="bg-amber-400 text-slate-950 text-sm font-bold py-2.5 rounded-lg">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Dashboard Mockup ─────────────────────────────────────────────────────

function DashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-amber-500/10 rounded-3xl blur-3xl scale-110" />
      <div className="relative bg-slate-900 rounded-2xl border border-slate-800 p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-slate-500 text-xs mb-0.5">Emma's Progress</p>
            <p className="text-white font-bold text-base">Learning Path</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full">
            On Track ✓
          </div>
        </div>

        <div className="flex items-center gap-5 mb-5 p-4 bg-slate-800/50 rounded-xl">
          <div className="relative w-20 h-20 flex-shrink-0">
            <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#1e293b" strokeWidth="8" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="url(#progressGradV1)" strokeWidth="8" strokeDasharray={`${0.65 * 201} ${201}`} strokeLinecap="round" />
              <defs>
                <linearGradient id="progressGradV1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-white font-black text-lg leading-none">65%</span>
              <span className="text-slate-500 text-xs">done</span>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Topics completed</span>
              <span className="text-white font-semibold">13 / 20</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Average score</span>
              <span className="text-emerald-400 font-semibold">84%</span>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>Current streak</span>
              <span className="text-amber-400 font-semibold">🔥 7 days</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { name: "Arithmetic & Number", score: 92, status: "done" },
            { name: "Fractions & Decimals", score: 88, status: "done" },
            { name: "Verbal Reasoning Patterns", score: 79, status: "done" },
            { name: "Non-Verbal Shapes", score: null, status: "active" },
            { name: "Comprehension & Cloze", score: null, status: "locked" },
          ].map((topic) => (
            <div
              key={topic.name}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs
                ${topic.status === "active" ? "bg-amber-400/10 border border-amber-400/20" : "bg-slate-800/50"}`}
            >
              <div className="flex items-center gap-2">
                {topic.status === "done" && (
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400 text-[10px]">✓</span>
                  </div>
                )}
                {topic.status === "active" && (
                  <div className="w-4 h-4 rounded-full bg-amber-400/20 border border-amber-400/40 flex-shrink-0 animate-pulse" />
                )}
                {topic.status === "locked" && (
                  <div className="w-4 h-4 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-600 text-[10px]">🔒</span>
                  </div>
                )}
                <span className={
                  topic.status === "locked" ? "text-slate-600" :
                  topic.status === "active" ? "text-amber-300 font-medium" :
                  "text-slate-400"
                }>
                  {topic.name}
                </span>
              </div>
              {topic.score !== null && <span className="text-emerald-400 font-semibold">{topic.score}%</span>}
              {topic.status === "active" && <span className="text-amber-400 font-semibold text-[10px]">IN PROGRESS</span>}
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-sm">
          Continue Learning →
        </button>
      </div>

      <div className="absolute -top-4 -right-4 bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎉</span>
          <div>
            <p className="text-white text-xs font-semibold">Topic Unlocked!</p>
            <p className="text-slate-500 text-xs">Non-Verbal Shapes</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 bg-slate-800 border border-emerald-500/20 rounded-xl p-3 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="text-lg">📈</span>
          <div>
            <p className="text-white text-xs font-semibold">+18% improvement</p>
            <p className="text-slate-500 text-xs">Past 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────

function HeroSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950 pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400 text-xs font-semibold tracking-wide uppercase">
                UK's Most Affordable 11+ Preparation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Your child's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                grammar school
              </span>{" "}
              journey starts here
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl">
              Unlimited GL & CEM mock tests, a personalised 20-topic learning path, and
              instant detailed results — all from home, for less than the cost of
              a single test centre session.
            </p>

            <div className="flex items-center gap-3 mb-8 p-4 bg-slate-900 rounded-xl border border-slate-800">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <span className="text-emerald-400 text-lg">💷</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">Save up to £1,600 vs physical test centres</p>
                <p className="text-slate-500 text-xs">Test centres charge £50–80 per session · We charge from £29.99/month</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={onCTA}
                className="group flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-0.5"
              >
                Start Your 7-Day Free Trial
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-medium px-8 py-4 rounded-xl text-base transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                See how it works
              </button>
            </div>

            <p className="text-slate-600 text-sm">No credit card required · Cancel anytime · GDPR compliant</p>
          </div>

          <div className="hidden lg:block">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar ─────────────────────────────────────────────────────────────

function TrustBar() {
  const stats = [
    { value: "2,847+", label: "Families enrolled", icon: "👨‍👩‍👧" },
    { value: "8,863", label: "Practice questions", icon: "📝" },
    { value: "GL & CEM", label: "Exam formats covered", icon: "🎯" },
    { value: "4.8 / 5", label: "Parent satisfaction", icon: "⭐" },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-800">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 100} className="flex flex-col items-center text-center lg:px-8">
              <span className="text-2xl mb-1">{stat.icon}</span>
              <span className="text-white font-black text-2xl">{stat.value}</span>
              <span className="text-slate-500 text-sm">{stat.label}</span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cost Comparison ──────────────────────────────────────────────────────

function CostComparisonSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The Smart Choice"
          eyebrowColor="text-amber-400"
          title="Stop paying £50–80 per test"
          subtitle="Physical test centres are expensive, limited, and inconvenient. Kyros gives your child unlimited practice, at home, for a fraction of the cost."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          <FadeIn direction="left">
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl">🏫</div>
                <div>
                  <p className="text-red-400 text-xs font-semibold uppercase tracking-wide">Traditional</p>
                  <p className="text-white font-bold text-lg">Physical Test Centres</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  "£50–80 per single test session",
                  "Limited test dates — books up fast",
                  "Travel required — time & expense",
                  "Results take days or weeks",
                  "No personalised learning path",
                  "No parent progress dashboard",
                  "One format per centre",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 text-red-500"><CrossIcon /></div>
                    <span className="text-slate-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-500 text-sm">10–20 tests = <span className="text-red-400 font-bold text-lg">£500–1,600</span></p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={100}>
            <div className="bg-slate-900 rounded-2xl border border-amber-400/20 p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center text-xl">🚀</div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wide">Smart Alternative</p>
                  <p className="text-white font-bold text-lg">Kyros Platform</p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                {[
                  "From £29.99/month — unlimited tests",
                  "Available 24/7 — start immediately",
                  "Practice from home at any time",
                  "Instant results with full explanations",
                  "Personalised 20-topic learning path",
                  "Full parent dashboard & reports",
                  "GL and CEM formats included",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 text-emerald-400"><CheckIcon /></div>
                    <span className="text-slate-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-400 text-sm">
                  Full year = <span className="text-amber-400 font-black text-lg">£199.99</span>
                  <span className="text-slate-500 text-xs ml-2">Save 44% vs monthly</span>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={200} className="text-center">
          <button
            onClick={onCTA}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-10 py-4 rounded-xl text-base transition-all hover:shadow-2xl hover:shadow-amber-400/30 hover:-translate-y-0.5"
          >
            Start Saving Today — 7-Day Free Trial
          </button>
          <p className="text-slate-600 text-sm mt-3">No credit card · Cancel anytime</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────

function HowItWorksSection({ onCTA }: { onCTA: () => void }) {
  const steps = [
    {
      number: "01",
      icon: "⚡",
      title: "Create your account",
      description: "Sign up in under 30 seconds with Google or email. No credit card needed for your free trial. Then create a child profile and choose their target schools.",
      highlight: "Takes 30 seconds",
      color: "from-violet-500 to-violet-700",
      accent: "violet" as const,
    },
    {
      number: "02",
      icon: "🧠",
      title: "Take the diagnostic test",
      description: "Your child completes a 40-question diagnostic covering all four subjects. Our platform analyses strengths and gaps to build a personalised learning path.",
      highlight: "40 questions · 35 mins",
      color: "from-amber-500 to-amber-700",
      accent: "amber" as const,
    },
    {
      number: "03",
      icon: "🏆",
      title: "Follow the learning path",
      description: "A structured 20-topic path unlocks progressively. Complete each topic, review instant explanations, and track improvement — all while parents monitor from their own dashboard.",
      highlight: "20 topics · clear progress",
      color: "from-emerald-500 to-emerald-700",
      accent: "emerald" as const,
    },
  ];

  const accentClasses = {
    violet: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
    amber: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  };

  return (
    <section id="how-it-works" className="bg-slate-950 py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Simple & Structured"
          eyebrowColor="text-emerald-400"
          title="Up and running in minutes"
          subtitle="No complicated setup. No confusing menus. Just a clear path to exam confidence."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 120}>
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-7 h-full hover:border-slate-700 transition-colors group">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${accentClasses[step.accent]}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {step.highlight}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={360} className="text-center mt-12">
          <button
            onClick={onCTA}
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-all hover:shadow-xl hover:shadow-amber-400/20"
          >
            Get Started Free →
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Features Grid ────────────────────────────────────────────────────────

function FeaturesSection() {
  const features = [
    { icon: "∞", iconBg: "bg-violet-500/10", iconColor: "text-violet-400", title: "Unlimited Mock Tests", description: "Take as many full-length GL and CEM format mock tests as your child needs — no limits, no extra charges, no waiting for bookings." },
    { icon: "🗺️", iconBg: "bg-amber-500/10", iconColor: "text-amber-400", title: "Personalised Learning Path", description: "A diagnostic test builds a unique 20-topic roadmap for each child. Topics unlock progressively so they always know exactly what to study next." },
    { icon: "⚡", iconBg: "bg-emerald-500/10", iconColor: "text-emerald-400", title: "Instant Detailed Results", description: "Results appear within seconds of completing a test, with step-by-step explanations for every question — not days later." },
    { icon: "📊", iconBg: "bg-blue-500/10", iconColor: "text-blue-400", title: "Parent Progress Dashboard", description: "A separate parent login gives you full visibility into your child's progress, topic completion, and score trends — without hovering over their shoulder." },
    { icon: "🔐", iconBg: "bg-rose-500/10", iconColor: "text-rose-400", title: "Protected Premium Content", description: "Our questions are exclusively available on Kyros. Multi-layer content protection ensures every child benefits from genuine, unseen practice questions." },
    { icon: "📍", iconBg: "bg-teal-500/10", iconColor: "text-teal-400", title: "Target School Formats", description: "Select your child's target schools and we automatically match practice tests to the exact GL or CEM format used by those schools." },
  ];

  return (
    <section id="features" className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Everything You Need" eyebrowColor="text-violet-400" title="Built for exam success" subtitle="Every feature is designed around one goal: giving your child the best possible preparation for their 11+ exams." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 80}>
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-7 h-full hover:border-slate-600 hover:bg-slate-800 transition-all group">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <span className={`${feature.iconColor} text-xl font-black`}>{feature.icon}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Subjects Section ─────────────────────────────────────────────────────

function SubjectsSection() {
  const subjects = [
    { name: "English", emoji: "📖", topics: ["Comprehension", "Cloze Tests", "Synonyms & Antonyms", "Grammar & Punctuation"], gradient: "from-blue-600 to-blue-800", border: "border-blue-500/20", badge: "bg-blue-500/10 text-blue-400" },
    { name: "Mathematics", emoji: "🔢", topics: ["Arithmetic", "Fractions & Decimals", "Algebra Basics", "Problem Solving"], gradient: "from-emerald-600 to-emerald-800", border: "border-emerald-500/20", badge: "bg-emerald-500/10 text-emerald-400" },
    { name: "Verbal Reasoning", emoji: "💬", topics: ["Letter Sequences", "Word Patterns", "Code Breaking", "Logic Puzzles"], gradient: "from-violet-600 to-violet-800", border: "border-violet-500/20", badge: "bg-violet-500/10 text-violet-400" },
    { name: "Non-Verbal Reasoning", emoji: "🔷", topics: ["Shape Patterns", "Matrix Problems", "Spatial Reasoning", "Analogies"], gradient: "from-amber-600 to-amber-800", border: "border-amber-500/20", badge: "bg-amber-500/10 text-amber-400" },
  ];

  return (
    <section id="subjects" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Full Curriculum Coverage" eyebrowColor="text-amber-400" title="All four 11+ subjects" subtitle="Comprehensive question banks across every subject tested in GL and CEM formats, with new questions added regularly." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((subject, i) => (
            <FadeIn key={subject.name} delay={i * 100}>
              <div className={`rounded-2xl border ${subject.border} bg-slate-900 p-6 h-full hover:scale-[1.03] transition-transform`}>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg`}>{subject.emoji}</div>
                <h3 className="text-white font-bold text-lg mb-3">{subject.name}</h3>
                <ul className="space-y-1.5">
                  {subject.topics.map((topic) => (
                    <li key={topic} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-500 flex-shrink-0" />
                      <span className="text-slate-400 text-xs">{topic}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${subject.badge}`}>GL & CEM formats</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    { quote: "The learning path was a game-changer for us. Emma always knew exactly what to study next — no more wasted time or guessing. She improved from 68% to 87% in just two months.", name: "Sarah M.", role: "Parent of Emma, Year 5 · Kent", initials: "SM", stars: 5, bg: "bg-violet-600" },
    { quote: "We were spending £70 per test at the local centre. With Kyros, Alex took 14 mock tests in one month. The instant results with explanations meant he actually learned from his mistakes.", name: "Raj K.", role: "Parent of Alex, Year 6 · Birmingham", initials: "RK", stars: 5, bg: "bg-amber-600" },
    { quote: "What I love most is the parent dashboard. I check it during my lunch break and always know exactly where Olivia stands. She got into her first-choice grammar school!", name: "Charlotte B.", role: "Parent of Olivia, Year 6 · Buckinghamshire", initials: "CB", stars: 5, bg: "bg-emerald-600" },
  ];

  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Real Families, Real Results" eyebrowColor="text-emerald-400" title="Trusted by thousands of families" subtitle="Rated 4.8 out of 5 from 400+ parent reviews" />
        <FadeIn className="flex justify-center -mt-10 mb-14">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => <span key={i} className="text-amber-400"><StarIcon /></span>)}
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120}>
              <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-7 flex flex-col h-full">
                <div className="flex items-center gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => <span key={j} className="text-amber-400"><StarIcon /></span>)}
                </div>
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">"{t.quote}"</blockquote>
                <div className="flex items-center gap-3 pt-5 border-t border-slate-700/50">
                  <div className={`w-10 h-10 rounded-full ${t.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>{t.initials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────

function PricingSection({ onCTA }: { onCTA: () => void }) {
  const plans = [
    { name: "Monthly", price: "£29.99", period: "per month", saving: null, description: "Perfect for trying the platform", features: ["Unlimited GL & CEM mock tests", "Personalised learning path", "Instant results & explanations", "Parent progress dashboard", "Up to 2 child profiles", "PDF progress reports"], highlight: false },
    { name: "Quarterly", price: "£69.99", period: "per quarter", saving: "Save £20 vs monthly", description: "Most popular for focused prep", features: ["Everything in Monthly", "£23.33/month effective rate", "Priority support", "Up to 3 child profiles", "Performance trend analytics", "Weak area identification"], highlight: false },
    { name: "Annual", price: "£199.99", period: "per year", saving: "Save £160 — Best value", description: "Maximum savings, full year", features: ["Everything in Quarterly", "£16.66/month effective rate", "Up to 5 child profiles", "Nationwide benchmarking (Phase 2)", "Early access to new features", "Dedicated support"], highlight: true },
  ];

  return (
    <section id="pricing" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Simple, Transparent Pricing" eyebrowColor="text-amber-400" title="One subscription, unlimited potential" subtitle="All plans include a 7-day free trial. No credit card required to start." />
        <FadeIn className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2">
            <span className="text-emerald-400 text-sm">🎁</span>
            <span className="text-emerald-400 text-sm font-medium">Free tier available: 2 mock tests to try before subscribing</span>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 100}>
              <div className={`rounded-2xl border p-7 flex flex-col h-full relative ${plan.highlight ? "bg-gradient-to-b from-slate-800 to-slate-900 border-amber-400/40 shadow-2xl shadow-amber-400/10" : "bg-slate-900 border-slate-800"}`}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wide">Best Value</span>
                  </div>
                )}
                <div className="mb-5">
                  <p className={`font-semibold text-sm mb-1 ${plan.highlight ? "text-amber-400" : "text-slate-400"}`}>{plan.name}</p>
                  <span className="text-white font-black text-4xl">{plan.price}</span>
                  <p className="text-slate-500 text-sm">{plan.period}</p>
                  {plan.saving && <p className="text-emerald-400 text-xs font-semibold mt-1">{plan.saving}</p>}
                </div>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 mt-0.5 text-emerald-400"><CheckIcon /></span>
                      <span className="text-slate-300 text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={onCTA} className={`w-full font-bold py-3 rounded-xl text-sm transition-all ${plan.highlight ? "bg-amber-400 hover:bg-amber-300 text-slate-950 hover:shadow-lg hover:shadow-amber-400/30" : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"}`}>
                  Start Free Trial
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={300} className="text-center">
          <p className="text-slate-600 text-sm mt-8">All plans include 7-day free trial · Cancel anytime · GDPR compliant · Secure payments via Stripe</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: "What is the 11+ exam and who is it for?", a: "The 11+ is a selective entrance examination taken by children aged 10–11 (Year 6) for admission to grammar schools and selective secondary schools in the UK. It typically tests English, Maths, Verbal Reasoning, and Non-Verbal Reasoning." },
    { q: "What's the difference between GL and CEM formats?", a: "GL Assessment and CEM (Centre for Evaluation and Monitoring) are the two main exam boards for the 11+. Different schools and regions use different formats — for example, Kent grammar schools typically use GL, while Birmingham uses CEM. When you set up your child's profile and choose target schools, Kyros automatically matches practice to the right format." },
    { q: "How does the personalised learning path work?", a: "Your child starts with a 40-question diagnostic test covering all four subjects. Our platform analyses the results to identify strengths and gaps, then generates a structured 20-topic learning path. Topics unlock progressively as your child masters each stage — they always know exactly what to study next." },
    { q: "Can I monitor my child's progress as a parent?", a: "Yes — you have a completely separate parent login with its own dashboard. You can see your child's learning path completion, topic scores, practice streaks, and overall progress trends at any time. You can also download PDF progress reports to share with tutors." },
    { q: "Is the content really exclusive and protected?", a: "Yes. Our questions are created by experienced 11+ experts and are only available on the Kyros platform. We use multi-layer content protection to prevent copying, sharing, and leaking — so every child benefits from genuinely unseen practice material." },
    { q: "What happens after the 7-day free trial?", a: "After your free trial you'll be asked to choose a subscription plan to continue. If you don't subscribe, you'll retain free-tier access (2 mock tests total). You can cancel at any time — there are no long contracts or hidden fees." },
  ];

  return (
    <section id="faq" className="bg-slate-900 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Questions Answered" eyebrowColor="text-violet-400" title="Frequently asked questions" subtitle="" />
        <FadeIn className="-mt-10 mb-10 text-center">
          <p className="text-slate-400">Can't find what you're looking for?{" "}<a href="mailto:support@kyros.co.uk" className="text-amber-400 hover:text-amber-300 transition-colors">Contact our support team</a></p>
        </FadeIn>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 60}>
              <div className={`rounded-xl border transition-all ${openIndex === index ? "bg-slate-800 border-slate-700" : "bg-slate-800/50 border-slate-800 hover:border-slate-700"}`}>
                <button className="w-full text-left px-6 py-4 flex items-center justify-between gap-4" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                  <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
                  <span className={`flex-shrink-0 text-slate-400 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}><ChevronDownIcon /></span>
                </button>
                {openIndex === index && <div className="px-6 pb-5"><p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p></div>}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA Banner ─────────────────────────────────────────────────────

function FinalCTASection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 border border-slate-700 p-12 sm:p-16">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-5xl mb-6 block">🎓</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                Give your child the best<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">possible start</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">Join thousands of families who chose Kyros over expensive test centres. Start your 7-day free trial today — no credit card required.</p>
              <button onClick={onCTA} className="group inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-10 py-4 rounded-xl text-lg transition-all hover:shadow-2xl hover:shadow-amber-400/40 hover:-translate-y-0.5">
                Start Free 7-Day Trial
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {["No credit card", "Cancel anytime", "GDPR compliant", "UK-based team"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-slate-500 text-sm">
                    <span className="text-emerald-500"><CheckIcon /></span>{item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-slate-950 font-black text-sm">K</span>
              </div>
              <span className="text-white font-bold text-xl">Kyros</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Making quality 11+ preparation accessible to every family in the UK.</p>
            <p className="text-slate-600 text-xs">© 2026 Kyros. All rights reserved.</p>
          </div>
          {[
            { heading: "Product", links: ["How It Works", "Features", "Subjects", "Pricing", "Free Trial"] },
            { heading: "Support", links: ["Help Centre", "Parent Guide", "Student Guide", "Contact Us", "System Status"] },
            { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance", "Child Safety"] },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-white font-semibold text-sm mb-4">{col.heading}</p>
              <ul className="space-y-2.5">
                {col.links.map((item) => <li key={item}><span className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">{item}</span></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4">
            <span className="text-slate-600 text-xs">🇬🇧 Designed for UK families</span>
            <span className="text-slate-600 text-xs">🔒 GDPR compliant</span>
            <span className="text-slate-600 text-xs">👧 Age Appropriate Design Code</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(ROUTES.login)} className="text-slate-500 hover:text-slate-300 text-xs transition-colors">Log in</button>
            <button onClick={() => navigate(ROUTES.register)} className="text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors">Sign up free →</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export function LandingPageV1() {
  const navigate = useNavigate();
  const handleCTA = () => navigate(ROUTES.register);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar onCTA={handleCTA} />
      <HeroSection onCTA={handleCTA} />
      <TrustBar />
      <CostComparisonSection onCTA={handleCTA} />
      <HowItWorksSection onCTA={handleCTA} />
      <FeaturesSection />
      <SubjectsSection />
      <TestimonialsSection />
      <PricingSection onCTA={handleCTA} />
      <FAQSection />
      <FinalCTASection onCTA={handleCTA} />
      <Footer />
    </div>
  );
}
