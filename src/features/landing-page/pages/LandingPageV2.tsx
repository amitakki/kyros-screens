/**
 * Kyros Landing Page — Version 2
 *
 * Design language: Light theme · Deep indigo brand · Orange CTAs
 * Hero: Centered, audience-split · Features: Alternating rows
 * Cards: White with layered shadows · Animations: Scale + fade
 */

import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../shared/constants/routes";

// ─── Scroll Animation ─────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// V2 animation: scale-up + fade (feels like content "materialises" rather than slides)
function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "scale(1) translateY(0)" : "scale(0.96) translateY(20px)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────

const Check = ({ color = "text-indigo-600" }: { color?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 ${color}`}>
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const X = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-400">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const Arrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// ─── Shared label ─────────────────────────────────────────────────────────

function Label({ children, color = "text-indigo-600 bg-indigo-50 border-indigo-100" }: { children: ReactNode; color?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${color}`}>
      {children}
    </span>
  );
}

// ─── Navbar V2 ────────────────────────────────────────────────────────────

function NavbarV2({ onCTA }: { onCTA: () => void }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm shadow-indigo-200">
              <span className="text-white font-black text-sm">K</span>
            </div>
            <span className="text-slate-900 font-black text-xl tracking-tight">Kyros</span>
            <span className="hidden sm:flex items-center gap-1 bg-orange-50 border border-orange-100 text-orange-600 text-xs font-bold px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              Version 2
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {[{ label: "How It Works", id: "v2-how" }, { label: "Features", id: "v2-features" }, { label: "Subjects", id: "v2-subjects" }, { label: "Pricing", id: "v2-pricing" }, { label: "FAQ", id: "v2-faq" }].map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
                {item.label}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => navigate(ROUTES.login)} className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
              Log in
            </button>
            <button onClick={onCTA} className="bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold px-5 py-2 rounded-xl transition-all shadow-sm shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-px">
              Start Free Trial
            </button>
          </div>

          {/* Mobile */}
          <button className="md:hidden p-1 text-slate-500" onClick={() => setOpen(!open)}>
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" className="w-6 h-6">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-2 shadow-lg">
          {[{ label: "How It Works", id: "v2-how" }, { label: "Features", id: "v2-features" }, { label: "Subjects", id: "v2-subjects" }, { label: "Pricing", id: "v2-pricing" }, { label: "FAQ", id: "v2-faq" }].map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="block w-full text-left text-slate-700 hover:text-indigo-600 py-2 text-sm font-medium">
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <button onClick={() => { navigate(ROUTES.login); setOpen(false); }} className="block w-full text-left text-slate-500 text-sm py-2">Log in</button>
            <button onClick={() => { onCTA(); setOpen(false); }} className="block w-full bg-orange-500 text-white font-bold py-2.5 rounded-xl text-sm">Start Free Trial</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero V2 ──────────────────────────────────────────────────────────────

function HeroV2({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="relative overflow-hidden bg-white pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-50 rounded-full -translate-x-1/2 -translate-y-1/3 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50 rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-50/60 rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 text-center">
        {/* Version badge */}
        <div className="inline-flex items-center gap-2 bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-indigo-200">
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
            <path d="M6 1l1.236 3.804H11.4L8.09 7.196l1.236 3.804L6 8.804l-3.326 2.196 1.236-3.804L.6 4.804h4.164L6 1z" />
          </svg>
          11+ Exam Preparation Platform
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight mb-6 max-w-4xl mx-auto">
          The smarter path to{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-indigo-600">grammar school</span>
            <span
              className="absolute bottom-1 left-0 right-0 h-3 bg-orange-200/70 -z-0 -skew-x-2"
              aria-hidden="true"
            />
          </span>
        </h1>

        <p className="text-slate-500 text-xl leading-relaxed max-w-2xl mx-auto mb-10">
          Unlimited GL & CEM mock tests + a personalised 20-topic learning path.
          Less than the cost of a single test centre session.
        </p>

        {/* Dual CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={onCTA}
            className="group flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black px-8 py-4 rounded-2xl text-base shadow-xl shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5"
          >
            Start 7-Day Free Trial
            <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => document.getElementById("v2-how")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-base transition-colors group"
          >
            <span className="w-9 h-9 rounded-full border-2 border-slate-200 group-hover:border-indigo-200 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </span>
            See how it works
          </button>
        </div>

        {/* Audience cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
          {/* For Parents */}
          <Rise>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100 p-6 text-left hover:shadow-xl hover:shadow-indigo-50 transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center text-xl mb-4">👩‍💼</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">For Parents</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Track Emma's progress from your own dashboard. Know exactly which topics she's mastered and where she needs help — no tutoring expertise required.
              </p>
              <ul className="space-y-1.5">
                {["Save £500–1,600 vs test centres", "Separate parent dashboard", "PDF progress reports"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check color="text-emerald-500" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>

          {/* For Students */}
          <Rise delay={120}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-100 p-6 text-left hover:shadow-xl hover:shadow-orange-50 transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center text-xl mb-4">🎒</div>
              <h3 className="text-slate-900 font-bold text-lg mb-2">For Students</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                Never wonder what to study next. Alex's personalised 20-topic path tells him exactly where to start and what to do — one topic at a time.
              </p>
              <ul className="space-y-1.5">
                {["Personalised 20-topic path", "Instant results & explanations", "Unlock topics as you progress"].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check color="text-emerald-500" /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </Rise>
        </div>

        {/* Social proof strip */}
        <Rise delay={80}>
          <div className="flex flex-wrap items-center justify-center gap-6 pb-8">
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400"><Star /></span>)}
              <span className="text-slate-500 text-sm ml-1">4.8/5 · 400+ reviews</span>
            </div>
            <span className="text-slate-200 hidden sm:block">|</span>
            <span className="text-slate-500 text-sm">2,847+ families enrolled</span>
            <span className="text-slate-200 hidden sm:block">|</span>
            <span className="text-slate-500 text-sm">8,863 practice questions</span>
          </div>
        </Rise>
      </div>

      {/* Dashboard hero image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <Rise delay={200}>
          <HeroDashboard />
        </Rise>
      </div>
    </section>
  );
}

// ─── Hero Dashboard Preview ───────────────────────────────────────────────

function HeroDashboard() {
  return (
    <div className="relative">
      {/* Glow base */}
      <div className="absolute -inset-4 bg-gradient-to-b from-indigo-100/40 to-transparent rounded-3xl" />

      <div className="relative bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200 overflow-hidden">
        {/* Browser chrome */}
        <div className="bg-slate-50 border-b border-slate-100 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="flex-1 bg-white rounded-lg border border-slate-200 px-3 py-1 flex items-center gap-2 max-w-xs mx-auto">
            <svg className="w-3 h-3 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-slate-400 text-xs">kyros.co.uk/dashboard</span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="grid lg:grid-cols-3 gap-0 divide-x divide-slate-100">
          {/* Left sidebar */}
          <div className="p-5 bg-white hidden lg:block">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <div>
                <p className="text-slate-900 font-bold text-sm">Emma Thompson</p>
                <p className="text-slate-400 text-xs">Year 5 · Kent</p>
              </div>
            </div>
            <nav className="space-y-1">
              {[
                { label: "Dashboard", icon: "🏠", active: true },
                { label: "Learning Path", icon: "🗺️", active: false },
                { label: "Mock Tests", icon: "📋", active: false },
                { label: "Results", icon: "📊", active: false },
                { label: "Reports", icon: "📄", active: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium ${item.active ? "bg-indigo-50 text-indigo-700" : "text-slate-500"}`}>
                  <span>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="col-span-2 p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-slate-900 font-bold text-base">Good morning, Emma! 👋</p>
                <p className="text-slate-400 text-xs mt-0.5">Continue where you left off</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                🔥 7-day streak
              </div>
            </div>

            {/* Progress cards row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Path Progress", value: "65%", sub: "13 of 20 topics", color: "bg-indigo-50 text-indigo-600" },
                { label: "Avg. Score", value: "84%", sub: "+18% this month", color: "bg-emerald-50 text-emerald-600" },
                { label: "Tests Done", value: "12", sub: "this month", color: "bg-orange-50 text-orange-600" },
              ].map(card => (
                <div key={card.label} className={`${card.color} rounded-2xl p-3`}>
                  <p className="text-xs font-medium opacity-70 mb-1">{card.label}</p>
                  <p className="font-black text-xl leading-none">{card.value}</p>
                  <p className="text-xs opacity-60 mt-0.5">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* Current topic */}
            <div className="bg-indigo-600 rounded-2xl p-4 mb-4 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-indigo-200 text-xs font-medium">Current Topic · 14 of 20</p>
                  <p className="font-bold text-base">Non-Verbal Reasoning: Shapes</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">🔷</div>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full mb-3">
                <div className="h-1.5 bg-white rounded-full" style={{ width: "40%" }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-indigo-200 text-xs">8 / 20 questions done</span>
                <button className="bg-white text-indigo-600 text-xs font-bold px-4 py-1.5 rounded-lg">Continue →</button>
              </div>
            </div>

            {/* Recent topics */}
            <div className="space-y-2">
              {[
                { name: "Verbal Reasoning: Word Patterns", score: 88, done: true },
                { name: "Maths: Fractions & Decimals", score: 92, done: true },
                { name: "English: Comprehension", score: 76, done: true },
              ].map(t => (
                <div key={t.name} className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs font-bold flex-shrink-0">✓</span>
                    <span className="text-slate-700 text-sm font-medium">{t.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${t.score >= 85 ? "text-emerald-600" : t.score >= 70 ? "text-amber-600" : "text-red-500"}`}>
                    {t.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating parent badge */}
      <div className="absolute top-16 -right-4 hidden lg:block bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 p-3.5">
        <p className="text-slate-500 text-xs mb-1">Parent view</p>
        <p className="text-slate-900 font-bold text-sm">Emma is on track 🎯</p>
        <p className="text-slate-400 text-xs">Estimated exam-ready: 6 wks</p>
      </div>
    </div>
  );
}

// ─── Stats Band ───────────────────────────────────────────────────────────

function StatsBand() {
  const stats = [
    { n: "2,847+", label: "Families using Kyros" },
    { n: "£1,600", label: "Average family saving" },
    { n: "8,863", label: "Exclusive questions" },
    { n: "4.8★", label: "Parent satisfaction" },
  ];

  return (
    <section className="bg-indigo-600 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:divide-x lg:divide-indigo-500">
          {stats.map((s, i) => (
            <Rise key={s.n} delay={i * 80} className="text-center lg:px-8">
              <p className="text-white font-black text-4xl mb-1">{s.n}</p>
              <p className="text-indigo-200 text-sm">{s.label}</p>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Cost Comparison V2 ────────────────────────────────────────────────────

function CostSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-16">
          <Label color="text-orange-600 bg-orange-50 border-orange-100">💸 The Real Cost</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            £50–80 per test. Every time.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Physical test centres are costly, inconvenient, and slow. There's a better way.
          </p>
        </Rise>

        {/* Transformation visual */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto mb-14">
          {/* Before */}
          <Rise direction="left" className="h-full">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">❌ Old Way</div>
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-3xl mb-5">🏫</div>
              <h3 className="text-slate-900 font-bold text-xl mb-1">Physical Test Centres</h3>
              <p className="text-slate-400 text-sm mb-5">Pay per session. Travel. Wait weeks for results.</p>

              <div className="space-y-3 mb-6">
                {[
                  "£50–80 per single test session",
                  "Limited dates — fills up months ahead",
                  "Drive to a test venue every time",
                  "Wait days or weeks for results",
                  "No idea how your child compares",
                  "No structured learning between tests",
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5"><X /></div>
                    <span className="text-slate-500 text-sm">{t}</span>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 rounded-2xl p-4">
                <p className="text-slate-500 text-sm">Typical 10–20 test season:</p>
                <p className="text-3xl font-black text-red-500 mt-1">£500 – £1,600</p>
                <p className="text-slate-400 text-xs mt-0.5">Plus travel, parking & time costs</p>
              </div>
            </div>
          </Rise>

          {/* After */}
          <Rise direction="right" delay={100} className="h-full">
            <div className="bg-indigo-600 rounded-3xl p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 -translate-y-1/4" />
              <div className="absolute top-4 right-4 bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full">✅ Kyros</div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-5">🚀</div>
              <h3 className="text-white font-bold text-xl mb-1">Kyros Platform</h3>
              <p className="text-indigo-200 text-sm mb-5">One subscription. Unlimited tests. Start today.</p>

              <div className="space-y-3 mb-6">
                {[
                  "From £29.99/month — unlimited tests",
                  "Available 24/7 — start in minutes",
                  "Practice at home on any device",
                  "Instant results with full explanations",
                  "Personalised 20-topic learning path",
                  "Parent dashboard with PDF reports",
                ].map(t => (
                  <div key={t} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-300">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-indigo-100 text-sm">{t}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-indigo-200 text-sm">Full year of unlimited practice:</p>
                <p className="text-3xl font-black text-white mt-1">£199.99</p>
                <p className="text-indigo-300 text-xs mt-0.5">Save up to £1,400 compared to test centres</p>
              </div>
            </div>
          </Rise>
        </div>

        <Rise delay={200} className="text-center">
          <button
            onClick={onCTA}
            className="group inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black px-10 py-4 rounded-2xl shadow-xl shadow-orange-100 hover:shadow-orange-200 transition-all hover:-translate-y-px text-base"
          >
            Start Saving Today
            <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-slate-400 text-sm mt-3">7-day free trial · No credit card required</p>
        </Rise>
      </div>
    </section>
  );
}

// ─── How It Works V2 ──────────────────────────────────────────────────────

function HowItWorksV2({ onCTA }: { onCTA: () => void }) {
  const steps = [
    {
      n: "01",
      icon: "⚡",
      color: "bg-indigo-600",
      lightBg: "bg-indigo-50",
      lightText: "text-indigo-600",
      title: "Create your account",
      body: "Sign up in 30 seconds with Google or email — no credit card needed. Create a child profile and choose their target schools to match the correct GL or CEM format.",
      pill: "30 seconds",
    },
    {
      n: "02",
      icon: "🧠",
      color: "bg-orange-500",
      lightBg: "bg-orange-50",
      lightText: "text-orange-600",
      title: "Diagnostic assessment",
      body: "Your child takes a 40-question diagnostic across all four subjects. The platform analyses results in seconds and builds a personalised 20-topic learning path based on their level.",
      pill: "40 questions · 35 min",
    },
    {
      n: "03",
      icon: "🏆",
      color: "bg-emerald-500",
      lightBg: "bg-emerald-50",
      lightText: "text-emerald-600",
      title: "Follow the path to success",
      body: "Topics unlock progressively as your child masters each one. Instant explanations after every question. Parents track progress from their own dashboard in real time.",
      pill: "20 topics · clear path",
    },
  ];

  return (
    <section id="v2-how" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-20">
          <Label color="text-indigo-600 bg-indigo-50 border-indigo-100">How It Works</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            Up and running in minutes
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            No complex setup. No guesswork. A clear, proven path to exam confidence.
          </p>
        </Rise>

        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <Rise key={step.n} delay={i * 100}>
              <div className="grid sm:grid-cols-[80px_1fr] gap-6 items-start bg-white rounded-3xl border border-slate-100 shadow-md shadow-slate-50 hover:shadow-lg hover:shadow-slate-100 transition-shadow p-7">
                {/* Number + icon */}
                <div className="flex sm:flex-col items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                    {step.icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100 hidden sm:block select-none">{step.n}</span>
                  <span className={`sm:hidden text-3xl font-black ${step.lightText} select-none`}>{step.n}</span>
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-slate-900 font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.body}</p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${step.lightBg} ${step.lightText}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />{step.pill}
                  </span>
                </div>
              </div>
            </Rise>
          ))}
        </div>

        <Rise delay={320} className="text-center mt-12">
          <button onClick={onCTA} className="group inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-orange-100 transition-all hover:-translate-y-px text-sm">
            Get Started Free
            <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Rise>
      </div>
    </section>
  );
}

// ─── Features V2 (alternating rows) ──────────────────────────────────────

function FeaturesV2() {
  const features = [
    {
      icon: "🗺️",
      iconBg: "bg-indigo-100",
      accent: "indigo",
      title: "A personalised learning path for every child",
      body: "After a 40-question diagnostic, each child gets a unique 20-topic roadmap tailored to their exact strengths and gaps. Topics unlock one at a time — so they always know exactly what to study next. No more guessing, no wasted time.",
      highlights: ["Diagnostic-driven path", "Progressive topic unlock", "Completion certificates"],
      mockup: <LearningPathMockup />,
      reverse: false,
    },
    {
      icon: "📊",
      iconBg: "bg-orange-100",
      accent: "orange",
      title: "Full visibility for parents — without the stress",
      body: "Your separate parent dashboard shows topic progress, score trends, streaks, and exam readiness — all at a glance. Check in from your phone during lunch. Download PDF reports to share with tutors. Always know Emma is on track.",
      highlights: ["Separate parent login", "Score trend charts", "Downloadable PDF reports"],
      mockup: <ParentDashMockup />,
      reverse: true,
    },
    {
      icon: "⚡",
      iconBg: "bg-emerald-100",
      accent: "emerald",
      title: "Instant results with step-by-step explanations",
      body: "Results arrive within seconds of submitting a test — not days later. Every wrong answer includes a full worked explanation so your child understands the reasoning, not just the correct answer. Learning happens immediately.",
      highlights: ["Results in <5 seconds", "Worked explanations", "Question-by-question review"],
      mockup: <ResultsMockup />,
      reverse: false,
    },
  ];

  const accentBorder: Record<string, string> = {
    indigo: "border-indigo-100",
    orange: "border-orange-100",
    emerald: "border-emerald-100",
  };

  const accentText: Record<string, string> = {
    indigo: "text-indigo-600",
    orange: "text-orange-600",
    emerald: "text-emerald-600",
  };

  const accentBg: Record<string, string> = {
    indigo: "bg-indigo-50",
    orange: "bg-orange-50",
    emerald: "bg-emerald-50",
  };

  return (
    <section id="v2-features" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-20">
          <Label color="text-indigo-600 bg-indigo-50 border-indigo-100">Platform Features</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            Built around what families actually need
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Every feature solves a real pain point — not just a checkbox on a product list.
          </p>
        </Rise>

        <div className="space-y-16">
          {features.map((f, i) => (
            <Rise key={f.title} delay={i * 60}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${f.reverse ? "lg:flex lg:flex-row-reverse" : ""}`}>
                {/* Text side */}
                <div className={f.reverse ? "lg:pl-8" : "lg:pr-8"}>
                  <div className={`w-12 h-12 rounded-2xl ${f.iconBg} flex items-center justify-center text-2xl mb-5`}>
                    {f.icon}
                  </div>
                  <h3 className="text-slate-900 font-black text-3xl leading-tight mb-4">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">{f.body}</p>
                  <ul className="space-y-2.5">
                    {f.highlights.map(h => (
                      <li key={h} className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg ${accentBg[f.accent]} ${accentText[f.accent]} flex items-center justify-center flex-shrink-0`}>
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-slate-700 text-sm font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mockup side */}
                <div className={`${accentBg[f.accent]} rounded-3xl border ${accentBorder[f.accent]} p-6 lg:p-8`}>
                  {f.mockup}
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Feature mockup sub-components ────────────────────────────────────────

function LearningPathMockup() {
  const topics = [
    { name: "Basic Arithmetic", pct: 92, state: "done" },
    { name: "Fractions & Decimals", pct: 88, state: "done" },
    { name: "Verbal Reasoning A", pct: 79, state: "done" },
    { name: "Non-Verbal Shapes", pct: null, state: "active" },
    { name: "Comprehension Skills", pct: null, state: "locked" },
    { name: "Advanced Maths", pct: null, state: "locked" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-slate-900 font-bold text-sm">Emma's Learning Path</p>
        <span className="text-indigo-600 font-bold text-sm">65%</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full mb-4">
        <div className="h-1.5 bg-indigo-500 rounded-full" style={{ width: "65%" }} />
      </div>
      <div className="space-y-2">
        {topics.map((t) => (
          <div key={t.name} className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs ${t.state === "active" ? "bg-indigo-50 border border-indigo-100" : "bg-slate-50"}`}>
            <div className="flex items-center gap-2">
              {t.state === "done" && <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]">✓</span>}
              {t.state === "active" && <span className="w-4 h-4 rounded-full bg-indigo-200 animate-pulse flex-shrink-0" />}
              {t.state === "locked" && <span className="w-4 h-4 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🔒</span>}
              <span className={t.state === "locked" ? "text-slate-400" : t.state === "active" ? "text-indigo-700 font-semibold" : "text-slate-600"}>{t.name}</span>
            </div>
            {t.pct && <span className="text-emerald-600 font-bold">{t.pct}%</span>}
            {t.state === "active" && <span className="text-indigo-500 font-semibold text-[10px] uppercase">Now</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentDashMockup() {
  return (
    <div className="bg-white rounded-2xl border border-orange-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center font-bold text-orange-600 text-sm">SM</div>
        <div>
          <p className="text-slate-900 font-bold text-sm">Sarah · Parent View</p>
          <p className="text-slate-400 text-xs">Checked 2 min ago</p>
        </div>
        <div className="ml-auto bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">On Track</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[{ l: "Path complete", v: "65%", c: "text-indigo-600" }, { l: "Avg score", v: "84%", c: "text-emerald-600" }, { l: "Tests this month", v: "12", c: "text-orange-600" }, { l: "Exam in", v: "9 wks", c: "text-slate-700" }].map(s => (
          <div key={s.l} className="bg-slate-50 rounded-xl p-3">
            <p className="text-slate-400 text-xs mb-0.5">{s.l}</p>
            <p className={`font-black text-xl ${s.c}`}>{s.v}</p>
          </div>
        ))}
      </div>
      <div className="bg-orange-50 rounded-xl p-3 flex items-center gap-3">
        <span className="text-xl">📄</span>
        <div className="flex-1">
          <p className="text-slate-700 font-semibold text-xs">May Progress Report</p>
          <p className="text-slate-400 text-xs">Ready to download</p>
        </div>
        <button className="text-orange-600 font-bold text-xs bg-white border border-orange-100 px-3 py-1 rounded-lg">Download</button>
      </div>
    </div>
  );
}

function ResultsMockup() {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-slate-900 font-bold text-sm">Test Complete!</p>
          <p className="text-slate-400 text-xs">GL Mock · 45 minutes</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-emerald-600">88%</p>
          <p className="text-xs text-emerald-500 font-semibold">↑ 6% from last test</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[{ s: "English", v: 84 }, { s: "Maths", v: 92 }, { s: "VR", v: 88 }, { s: "NVR", v: 85 }].map(sub => (
          <div key={sub.s} className="text-center">
            <div className="h-16 bg-slate-100 rounded-lg relative overflow-hidden mb-1">
              <div className="absolute bottom-0 inset-x-0 bg-emerald-400 rounded-b-lg" style={{ height: `${sub.v}%` }} />
            </div>
            <p className="text-slate-500 text-xs">{sub.s}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[{ q: "Q4: Word meaning — synonym", r: "correct" }, { q: "Q7: Fraction division", r: "wrong" }].map(q => (
          <div key={q.q} className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${q.r === "correct" ? "bg-emerald-50" : "bg-red-50"}`}>
            <span>{q.r === "correct" ? "✓" : "✗"}</span>
            <span className={q.r === "correct" ? "text-emerald-700" : "text-red-600"}>{q.q}</span>
            {q.r === "wrong" && <span className="ml-auto text-red-500 font-semibold underline">See explanation</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Subjects V2 ──────────────────────────────────────────────────────────

function SubjectsV2() {
  const subjects = [
    { name: "English", emoji: "📖", color: "bg-blue-600", light: "bg-blue-50 border-blue-100", text: "text-blue-700", topics: ["Reading Comprehension", "Cloze Tests", "Synonyms & Antonyms", "Sentence Structure", "Punctuation & Grammar"] },
    { name: "Mathematics", emoji: "🔢", color: "bg-emerald-600", light: "bg-emerald-50 border-emerald-100", text: "text-emerald-700", topics: ["Arithmetic & Decimals", "Fractions & Ratios", "Algebra Foundations", "Geometry & Measurement", "Word Problem Solving"] },
    { name: "Verbal Reasoning", emoji: "💬", color: "bg-indigo-600", light: "bg-indigo-50 border-indigo-100", text: "text-indigo-700", topics: ["Letter Sequences", "Word Codes & Patterns", "Odd One Out", "Analogies", "Logic Deduction"] },
    { name: "Non-Verbal Reasoning", emoji: "🔷", color: "bg-orange-500", light: "bg-orange-50 border-orange-100", text: "text-orange-700", topics: ["Shape Sequences", "Matrix Completion", "Spatial Rotation", "Mirror Images", "Figure Classification"] },
  ];

  return (
    <section id="v2-subjects" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-16">
          <Label color="text-indigo-600 bg-indigo-50 border-indigo-100">Full Curriculum</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            All four 11+ subjects covered
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            GL and CEM formats. Expert-authored questions. Content protection built in.
          </p>
        </Rise>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((s, i) => (
            <Rise key={s.name} delay={i * 90}>
              <div className={`rounded-3xl border ${s.light} p-6 h-full hover:-translate-y-1 transition-transform`}>
                <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                  {s.emoji}
                </div>
                <h3 className="text-slate-900 font-bold text-lg mb-3">{s.name}</h3>
                <ul className="space-y-2">
                  {s.topics.map(t => (
                    <li key={t} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${s.color} flex-shrink-0`} />
                      <span className="text-slate-500 text-xs">{t}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-4 inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${s.light} ${s.text} border`}>
                  GL & CEM ✓
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials V2 ──────────────────────────────────────────────────────

function TestimonialsV2() {
  const quotes = [
    {
      quote: "The learning path completely changed how Emma studies. She now knows exactly what to do each evening — no more 'what should I practise?' moments. Her score went from 68% to 87% in 8 weeks.",
      name: "Sarah M.", role: "Parent · Kent", initials: "SM", bg: "bg-indigo-600",
      stat: "68% → 87%", statLabel: "score improvement",
    },
    {
      quote: "We saved roughly £700 compared to what we were spending at the test centre near us. The instant explanations are miles better too — Alex actually understands why he got something wrong.",
      name: "Raj K.", role: "Parent · Birmingham", initials: "RK", bg: "bg-orange-500",
      stat: "£700", statLabel: "saved vs test centre",
    },
    {
      quote: "I check the parent dashboard on my phone every few days. I always know exactly what Olivia has done, what she struggled with, and whether she's on track. She got into her first-choice school.",
      name: "Charlotte B.", role: "Parent · Buckinghamshire", initials: "CB", bg: "bg-emerald-600",
      stat: "1st choice", statLabel: "school secured",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-16">
          <Label color="text-emerald-600 bg-emerald-50 border-emerald-100">Parent Stories</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            Real results from real families
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400"><Star /></span>)}
            <span className="text-slate-400 text-sm ml-2">4.8/5 · 400+ reviews</span>
          </div>
        </Rise>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <Rise key={q.name} delay={i * 100}>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-md shadow-slate-50 p-7 flex flex-col h-full hover:shadow-lg hover:shadow-slate-100 transition-shadow">
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {[1,2,3,4,5].map(j => <span key={j} className="text-amber-400"><Star /></span>)}
                </div>

                {/* Big quote mark */}
                <div className="text-6xl text-indigo-100 font-serif leading-none mb-2 select-none">"</div>

                <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-6">
                  {q.quote}
                </blockquote>

                {/* Stat callout */}
                <div className="bg-slate-50 rounded-2xl p-4 mb-5 flex items-center gap-4">
                  <p className="text-3xl font-black text-slate-900">{q.stat}</p>
                  <p className="text-slate-400 text-xs">{q.statLabel}</p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className={`w-10 h-10 rounded-full ${q.bg} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {q.initials}
                  </div>
                  <div>
                    <p className="text-slate-900 font-semibold text-sm">{q.name}</p>
                    <p className="text-slate-400 text-xs">{q.role}</p>
                  </div>
                </div>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing V2 ───────────────────────────────────────────────────────────

function PricingV2({ onCTA }: { onCTA: () => void }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Monthly",
      monthlyPrice: "£29.99",
      annualPrice: "£16.66",
      annualTotal: "£199.99/year",
      desc: "Flexible month-to-month",
      features: ["Unlimited GL & CEM mock tests", "20-topic learning path", "Instant results & explanations", "Parent dashboard", "Up to 2 child profiles", "PDF reports"],
      highlight: false,
    },
    {
      name: "Annual",
      monthlyPrice: "£29.99",
      annualPrice: "£16.66",
      annualTotal: "£199.99 billed yearly",
      desc: "Best value — save £160",
      features: ["Everything in Monthly", "Up to 5 child profiles", "Priority support", "Weak area identification", "Nationwide benchmarking (Phase 2)", "Early feature access"],
      highlight: true,
    },
  ];

  return (
    <section id="v2-pricing" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-6">
          <Label color="text-indigo-600 bg-indigo-50 border-indigo-100">Pricing</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            Simple, honest pricing
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            7-day free trial on every plan. No credit card required.
          </p>
        </Rise>

        {/* Toggle */}
        <Rise className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-3 bg-slate-100 p-1 rounded-2xl">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${!annual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${annual ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}
            >
              Annual
              <span className="bg-emerald-100 text-emerald-600 text-xs font-black px-2 py-0.5 rounded-full">Save 44%</span>
            </button>
          </div>
        </Rise>

        {/* Freemium note */}
        <Rise className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-5 py-2">
            <span className="text-emerald-500">🎁</span>
            <span className="text-emerald-700 text-sm font-medium">Free tier: 2 mock tests included — no subscription needed</span>
          </div>
        </Rise>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <Rise key={plan.name} delay={i * 80}>
              <div className={`rounded-3xl p-8 flex flex-col h-full relative
                ${plan.highlight
                  ? "bg-indigo-600 shadow-2xl shadow-indigo-200"
                  : "bg-white border border-slate-100 shadow-md shadow-slate-50"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-orange-500 text-white text-xs font-black px-4 py-1 rounded-full shadow-md">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <p className={`font-bold text-sm mb-2 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>{plan.name}</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-black text-5xl ${plan.highlight ? "text-white" : "text-slate-900"}`}>
                      {annual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className={`text-sm ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>/mo</span>
                  </div>
                  {annual && (
                    <p className={`text-sm mt-1 ${plan.highlight ? "text-indigo-200" : "text-slate-400"}`}>
                      {plan.annualTotal}
                    </p>
                  )}
                  <p className={`text-sm mt-2 font-medium ${plan.highlight ? "text-emerald-300" : "text-emerald-600"}`}>
                    {plan.desc}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-emerald-300" : "text-emerald-500"}`}>
                        <Check color={plan.highlight ? "text-emerald-300" : "text-emerald-500"} />
                      </span>
                      <span className={`text-sm ${plan.highlight ? "text-indigo-100" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={onCTA}
                  className={`w-full font-bold py-3.5 rounded-2xl text-sm transition-all
                    ${plan.highlight
                      ? "bg-orange-500 hover:bg-orange-400 text-white shadow-md shadow-orange-900/20"
                      : "bg-slate-900 hover:bg-slate-800 text-white"}`}
                >
                  Start 7-Day Free Trial
                </button>
              </div>
            </Rise>
          ))}
        </div>

        <Rise className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            All plans · 7-day free trial · Cancel anytime · GDPR compliant · Stripe payments
          </p>
        </Rise>
      </div>
    </section>
  );
}

// ─── FAQ V2 ───────────────────────────────────────────────────────────────

function FAQV2() {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    { q: "What is the 11+ exam?", a: "The 11+ is a selective entrance test taken by Year 6 students (aged 10–11) for admission to grammar and selective secondary schools across the UK. It covers English, Maths, Verbal Reasoning, and Non-Verbal Reasoning." },
    { q: "What's the difference between GL and CEM formats?", a: "GL Assessment and CEM are the two main 11+ exam boards. Different schools use different formats — Kent uses GL, Birmingham uses CEM, for example. Kyros automatically selects the correct format based on your child's target schools." },
    { q: "How does the learning path work?", a: "After a 40-question diagnostic, the platform creates a personalised 20-topic path. Topics unlock as your child completes them — they can't skip ahead, which ensures solid foundations. Clear progress indicators show exactly how far along they are." },
    { q: "Can I track my child's progress as a parent?", a: "Yes. Your parent account has a completely separate dashboard showing topic completion, score trends, streaks, and readiness estimates. You can download PDF progress reports at any time." },
    { q: "Is there a free option?", a: "Yes — a free tier gives access to 2 full mock tests with no subscription needed. The 7-day free trial unlocks everything. After the trial, you choose a paid plan or stay on the free tier." },
    { q: "How is the content protected?", a: "Kyros questions are original, expert-authored, and exclusively available on our platform. Multi-layer protection prevents copying, screenshot sharing, and leaking — so every child practises with genuinely unseen material." },
  ];

  return (
    <section id="v2-faq" className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise className="text-center mb-14">
          <Label color="text-indigo-600 bg-indigo-50 border-indigo-100">FAQ</Label>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mt-4 mb-4 leading-tight">
            Frequently asked questions
          </h2>
          <p className="text-slate-500">
            Still have questions?{" "}
            <a href="mailto:support@kyros.co.uk" className="text-indigo-600 hover:text-indigo-500 font-semibold">Talk to us →</a>
          </p>
        </Rise>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Rise key={i} delay={i * 50}>
              <div className={`bg-white rounded-2xl border transition-all ${open === i ? "border-indigo-100 shadow-md shadow-indigo-50" : "border-slate-100 shadow-sm"}`}>
                <button
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 py-5"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-slate-900 font-semibold text-sm sm:text-base">{f.q}</span>
                  <span className={`flex-shrink-0 ${open === i ? "text-indigo-600" : "text-slate-400"}`}>
                    <Chevron open={open === i} />
                  </span>
                </button>
                {open === i && (
                  <div className="px-6 pb-5">
                    <p className="text-slate-500 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA V2 ─────────────────────────────────────────────────────────

function FinalCTAV2({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Rise>
          <div className="relative bg-indigo-600 rounded-3xl overflow-hidden p-12 sm:p-16 text-center shadow-2xl shadow-indigo-200">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-1/2 right-12 w-24 h-24 bg-orange-500/20 rounded-full blur-2xl" />

            <div className="relative">
              <span className="text-5xl mb-6 block">🎓</span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 leading-tight">
                Your child's grammar school
                <br />
                <span className="text-orange-300">place starts here</span>
              </h2>
              <p className="text-indigo-200 text-lg max-w-xl mx-auto mb-10">
                Join 2,847 families who swapped expensive test centres for smarter, unlimited preparation at home.
              </p>

              <button
                onClick={onCTA}
                className="group inline-flex items-center gap-2.5 bg-orange-500 hover:bg-orange-400 text-white font-black px-10 py-4 rounded-2xl text-lg shadow-xl shadow-orange-900/20 transition-all hover:-translate-y-0.5 mb-8"
              >
                Start Your Free 7-Day Trial
                <Arrow className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex flex-wrap justify-center gap-8">
                {[["No credit card", "💳"], ["Cancel anytime", "✌️"], ["GDPR compliant", "🔒"], ["UK-based", "🇬🇧"]].map(([label, icon]) => (
                  <div key={label} className="flex items-center gap-2 text-indigo-200 text-sm">
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Rise>
      </div>
    </section>
  );
}

// ─── Footer V2 ────────────────────────────────────────────────────────────

function FooterV2() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">K</span>
              </div>
              <span className="text-white font-black text-xl">Kyros</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Making quality 11+ preparation accessible to every UK family.
            </p>
            <p className="text-slate-600 text-xs">© 2026 Kyros · All rights reserved</p>
          </div>

          {[
            { h: "Product", links: ["How It Works", "Features", "Subjects", "Pricing", "Free Trial"] },
            { h: "Support", links: ["Help Centre", "Parent Guide", "Student Guide", "Contact Us", "Status"] },
            { h: "Legal", links: ["Privacy Policy", "Terms", "Cookie Policy", "GDPR", "Child Safety"] },
          ].map(col => (
            <div key={col.h}>
              <p className="text-white font-semibold text-sm mb-4">{col.h}</p>
              <ul className="space-y-2.5">
                {col.links.map(l => (
                  <li key={l}><span className="text-slate-500 hover:text-slate-300 text-sm cursor-pointer transition-colors">{l}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-600">
            <span>🇬🇧 Built for UK families</span>
            <span>🔒 GDPR compliant</span>
            <span>👧 Age Appropriate Design Code</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(ROUTES.login)} className="text-slate-500 hover:text-slate-300 text-xs">Log in</button>
            <button onClick={() => navigate(ROUTES.register)} className="text-orange-400 hover:text-orange-300 text-xs font-bold">Sign up free →</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page V2 ─────────────────────────────────────────────────────────

export function LandingPageV2() {
  const navigate = useNavigate();
  const handleCTA = () => navigate(ROUTES.register);

  return (
    <div className="min-h-screen bg-white">
      <NavbarV2 onCTA={handleCTA} />
      <HeroV2 onCTA={handleCTA} />
      <StatsBand />
      <CostSection onCTA={handleCTA} />
      <HowItWorksV2 onCTA={handleCTA} />
      <FeaturesV2 />
      <SubjectsV2 />
      <TestimonialsV2 />
      <PricingV2 onCTA={handleCTA} />
      <FAQV2 />
      <FinalCTAV2 onCTA={handleCTA} />
      <FooterV2 />
    </div>
  );
}
