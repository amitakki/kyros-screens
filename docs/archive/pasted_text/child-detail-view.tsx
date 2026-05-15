Screen: P-06 — Child Detail View
Mode: A (Guidelines §4)
Canvas: 1280px full page, sticky header
File: src/app/parent/children/[childId]/page.tsx
Component: src/components/figma/ChildDetailView.tsx
i18n: t('childDetail.*')
Spec: F-027 (Sprint 8, P0)

DESIGN INTENT:
  Help parents quickly understand how the child is progressing,
  what needs attention, and what the child should do next.
  Tone: clear, supportive, actionable — not overly analytical.
  Every section answers one question. Data guides action.


━━━ HEADER (72px, sticky, #1E1B4B) ━━━

  Same structure as P-05 header.
  Nav: Dashboard · Settings · Billing — Dashboard active.


━━━ BREADCRUMB ━━━

  Dashboard › Emma Thompson
  Follow Guidelines §6 breadcrumb rules.


━━━ SECTION 1 — CHILD PROFILE CARD ━━━
  White card · full width · 16px radius · subtle shadow

  LEFT:
    Circular avatar 80px (uploaded photo or default)
    H2 (22px, bold, #1E293B): "Emma Thompson"
    Meta (14px, muted): "Year 5 · Kent"
    Streak badge: amber pill "🔥 5-day learning streak"
      — sits below meta, inline with tags
    Target school tags (indigo pills, 13px):
      "Tonbridge Grammar School"  "Invicta Grammar School"

  RIGHT ACTIONS:
    [Continue Practice →] PRIMARY indigo · 48px
      — routes to current topic in student learning path
    [Edit Profile] ghost · 48px

    OVERFLOW MENU (⋯ More — ghost button, right edge):
      Dropdown items:
        📄 Download PDF Report
            Note: "(Coming soon)" if F-035 not yet live
        ↺  Reset Diagnostic
            Opens confirmation modal (same modal spec as P-05)
        📦 Archive Child
            Opens confirmation modal with warning


━━━ SECTION 2 — NEXT RECOMMENDED STEP ━━━
  — Suggestion #4 — NEW, HIGH PRIORITY —
  Indigo-tinted card (#EEF2FF bg · #4F46E5 left-border 4px ·
  16px radius · sits directly below profile card)

  LABEL (small-caps, indigo, 11px): NEXT RECOMMENDED STEP

  BODY (16px, #1E293B):
    "Emma is ready to continue with:"
    Topic name (20px, bold, indigo): "Topic 8 — Sequences"
    Meta row (13px, muted):
      "Maths  ·  Estimated practice time: 20 min  ·  Medium difficulty"
    Previous attempt (13px, muted):
      "Emma's best: 70% — target is 85% to pass"

  ACTIONS:
    [Continue Practice →] PRIMARY indigo · 48px · full card width
    "Resume where Emma left off" — ghost text link · 13px · below button

  EMPTY STATE (no current topic):
    Show only if all topics complete or no learning path started.
    Replace body with:
      "Emma has completed her current learning path! 🎉
       Start the next subject or revisit weak topics."


━━━ SECTION 3 — LEARNING PATH PROGRESS ━━━
  White card · 16px radius

  SUBJECT TABS:
    [Maths ●]  English  Verbal Reasoning  Non-Verbal Reasoning
    Active: indigo underline + bold text
    Each tab shows a mini progress pill (e.g. "35%") in muted text

  PROGRESS SUMMARY ROW:
    "7 of 20 topics completed — 35%"
    Progress bar: indigo fill 35% on #E2E8F0 track · 8px

    ESTIMATED COMPLETION (#5):
      Below progress bar, muted, 13px:
      "~6 weeks remaining at current pace"
      Tooltip on hover (ⓘ icon): "Based on Emma's average of
      1.2 topics per week over the last 4 weeks. Pace may vary."
      Note to Figma Make: show this as a calculated estimate,
      not a guarantee. The ⓘ icon is important — it signals
      this is an approximation, not a commitment.

  TOPIC GRID (20 cells · 5 per row):
    State rules per Guidelines §5 topic grid states:
      Topics 1–7: completed — emerald filled · ✔ icon
      Topic 8:    active    — indigo filled · 🎯 icon · "Current" badge
      Topics 9–20: locked   — grey outlined · 🔒 icon

    TOOLTIP on every cell (hover/click — suggestion #6):
      Show a small floating card with:
        Topic name (bold): e.g. "Multiplication & Division"
        Best score:    "Best: 92%"
        Attempts:      "Attempts: 3"
        Last practised: "Last: 2 days ago"
      Locked topics tooltip: "Complete Topic 7 to unlock"
      Design: white card · 8px radius · shadow · 200px wide
      Appears above the hovered cell · arrow pointer below


━━━ SECTION 4 — EXAM READINESS ━━━
  — Suggestion #7 — NEW —
  Compact white card · sits in a 2-column row alongside
  the performance metrics section (or as a standalone card
  spanning full width — Figma Make to decide best layout)

  TITLE (16px, bold, #1E293B): "Exam Readiness"
  FOOTNOTE below title (12px, muted):
    "Updated based on recent practice and diagnostics"

  CIRCULAR PROGRESS INDICATOR (120px diameter):
    Ring fill: indigo #4F46E5 at 72%
    Centre text: "72%" (22px bold) + "Ready" (12px muted below)
    Ring track: #E2E8F0

  TWO COLUMNS below the ring:

    Strong Areas (emerald ticks, 13px):
      ✔ Algebra
      ✔ Vocabulary

    Needs Attention (red dots, 13px):
      • Fractions
      • Non-Verbal Reasoning

  Note to Figma Make: the 72% score is a composite indicator
  derived from topic completion + average scores + weak area
  count. It is clearly labelled as an estimate ("Updated based
  on recent practice") — not a definitive exam prediction.
  Parents should feel informed, not alarmed.


━━━ SECTION 5 — PERFORMANCE METRICS ━━━
  2-column layout · equal width cards

  LEFT CARD — SCORE TREND:
    Title: "Score Trend — Last 20 Tests"

    LINE CHART:
      Indigo line · x-axis dates · y-axis 0–100%
      Upward trend · latest point highlighted: "Dec 9 · 90%"
      Chart area: white · subtle #E2E8F0 grid lines

    INSIGHT TEXT below chart (suggestion #8):
      Indigo-tinted box (#EEF2FF · 12px · indigo left-border):
        "Emma's average Maths score improved from
         68% → 90% over her last 20 tests. 📈"

    EMPTY STATE (suggestion #9 — fewer than 3 tests):
      Replace chart with centred empty state:
        Icon: bar chart outline (muted, 32px)
        Text (14px, muted): "Emma needs 3 completed tests
        before her score trend appears here."
        Sub-text (12px, muted): "Encourage her to complete
        her first few practice sessions!"

  RIGHT CARD — SUBJECT BREAKDOWN:
    Title: "Subject Breakdown"

    HORIZONTAL BAR CHART:
      Subject colours per Guidelines §7:
        Maths             78% — indigo
        English           85% — emerald
        Verbal Reasoning  72% — amber
        Non-Verbal Reasoning 65% — red
      Each bar: subject label left · percentage right · 8px height

    THREE-BAND TOPIC LISTS:
      Weak areas (🔴, red text):
        Fractions — 65%
        Word Problems — 72%
      Strong areas (🟢, emerald text):
        Times Tables — 96%
        Vocabulary — 91%

    INSIGHT TEXT below lists (suggestion #10):
      Indigo-tinted box (#EEF2FF · 12px · indigo left-border):
        "Fractions and Non-Verbal Reasoning need the
         most attention this week."


━━━ SECTION 6 — TEST HISTORY ━━━
  White card · full width · 16px radius

  TITLE: "Test History"

  CONTROLS ROW:
    Search input (suggestion #11):
      🔍 "Search by topic or subject..." · 280px width · 40px height
    Sort by [Date ▼] dropdown
    Filter [All Subjects ▼] dropdown
    EXPORT ROW (suggestion #12 — future-ready):
      Right-aligned, 13px:
        [↓ Export CSV] ghost
        [↓ Export PDF] ghost · "(Coming soon)" tooltip

  TABLE:
    Columns: Date · Subject · Topic · Score · Time
    50 rows per page per F-027 AC

    Rows:
      09 Dec · Maths    · Topic 7: Basic Algebra   · 18/20 (90%) ✓ · 22 min
      08 Dec · Maths    · Topic 7: Basic Algebra   · 14/20 (70%)   · 25 min
      07 Dec · Maths    · Topic 6: Fractions       · 20/20 (100%) 🎉 · 18 min
      06 Dec · English  · Topic 5: Comprehension   · 16/20 (80%)   · 30 min

    Score column colour coding:
      ≥85%: emerald text · 70–84%: muted · <70%: red text

    Row hover: #EEF2FF background tint

  [Load More] centred below table · ghost button


━━━ STICKY FLOATING CTA (suggestion #13) ━━━
  — Appears when user scrolls past the profile card —
  — Visible only when: current topic exists AND
    child has an active learning path —

  DESKTOP:
    Fixed bottom-right · 24px from edges
    White card · 12px radius · shadow · padding 12px 20px
    "Continue Topic 8 →" — PRIMARY indigo button · 48px
    Small text below (12px, muted): "Emma's current topic"
    × dismiss icon top-right (disappears for session)

  MOBILE:
    Full-width bottom bar (not floating)
    #4F46E5 background · white text
    "Continue Topic 8 →" — full width · 56px height
    Replaces the floating card

  HIDDEN when:
    Parent has already clicked Continue Practice
    No active learning path exists
    All topics completed


━━━ DESIGN NOTES ━━━

OVERFLOW MENU (suggestion #3):
  Moving PDF download + reset diagnostic + archive into ⋯
  clears the profile card of secondary actions. The primary
  action (Continue Practice) is unmissable. Parents who need
  the destructive actions (reset, archive) know where to find
  them without them competing for attention.

ESTIMATED COMPLETION (suggestion #5):
  Shown with a ⓘ tooltip to set parent expectations correctly.
  Based on rolling average topics/week. If Emma has fewer than
  2 weeks of history, show "Not enough data yet" instead.
  Always framed as "at current pace" — never a guarantee.

EXAM READINESS (suggestion #7):
  The 72% gauge is a composite score — not a black box.
  The footnote ("Updated based on recent practice") is required.
  Parents benefit from a single number they can track over time
  even if the methodology is approximate at MVP stage. Design
  it as a clear visual that invites drilling into the detail
  below (strong areas / needs attention lists).

TOPIC GRID TOOLTIPS (suggestion #6):
  Every cell — completed, active, and locked — has a tooltip.
  Locked topics show the unlock condition, not just a lock icon.
  This reduces parent anxiety about locked content.

INSIGHT TEXT BOXES (suggestions #8, #10):
  These are the most parent-friendly element on the page.
  A parent who doesn't read charts will read one sentence.
  Keep them to 1–2 lines. Use specific numbers, not generalities.

CHART EMPTY STATE (suggestion #9):
  Critical for new children. Without it, a brand-new child's
  view shows a broken/empty chart area. The message should
  feel encouraging ("Encourage her to complete her first few
  sessions") — not like an error.

EXPORT BUTTONS (suggestion #12):
  Export CSV: shown as ghost button. At MVP this can be
  disabled with a tooltip "Available soon." No backend spec
  exists yet — placeholder only.
  Export PDF: ghost button with "Coming soon" tooltip until
  F-035 (Sprint 10) is live. Do not wire up at MVP launch.

STICKY CTA (suggestion #13):
  The page is long — parents lose context of what to do.
  The floating CTA is the action anchor. It must not be
  intrusive — small, bottom-right, dismissible. On mobile
  it becomes a full-width bar because floating elements
  at small viewport sizes feel like ads.

MOBILE ADAPTATION (suggestion #14):
  All sections stack vertically — no 2-column layout.
  Topic grid: 4 columns (5 per row breaks on mobile).
  Performance charts: horizontal scroll if needed.
  Sticky CTA: full-width bottom bar, not floating card.
  Overflow menu: becomes a bottom sheet on mobile.
  Test history table: horizontal scroll with frozen
  Date + Score columns.