Screen: P-05 — Parent Dashboard
Mode: A (Guidelines §4)
Canvas: 1280px full page, sticky header
File: src/app/parent/page.tsx
Component: src/components/figma/ParentDashboard.tsx
i18n: t('parentDashboard.*')
Spec: F-026 (Sprint 8, P0)

━━━ THIS SCREEN HAS 4 STATES — design all four ━━━

STATE 1: During 7-day free trial (trial countdown banner visible)
STATE 2: Active paid subscriber (no banner)
STATE 3: Empty state — no children (safety fallback only —
         parent always has ≥1 child after onboarding,
         but design for edge cases: bypassed onboarding
         or last child profile deleted)
STATE 4: Child card sub-state — diagnostic complete but
         zero test history (no activity yet)


━━━ HEADER (72px, sticky, #1E1B4B) ━━━

  Logo + Kyros wordmark (left)
  Nav: Dashboard (active, white underline) · Settings · Billing
  Right: avatar circle "S" + "Sarah ▼" dropdown


━━━ TRIAL COUNTDOWN BANNER (State 1 only) ━━━
  — Sits directly below header, above all page content —
  — Dismissed permanently on upgrade, hidden in State 2 —
  — Changes appearance based on days remaining —

  DAYS 1–4 — neutral amber:
    Background: #FEF3C7 · border-bottom: 1px solid #F59E0B · 56px
    LEFT: amber icon + text (14px, #92400E, bold):
      "Your free trial expires in 4 days"
    CENTRE: progress bar (max-width 240px):
      Track: #FDE68A · Fill: #F59E0B · 8px · rounded
      "Day 4 of 7" in 12px muted below bar
    RIGHT: [Upgrade Now →] solid #F59E0B · × dismiss

  DAYS 5–6 — urgent amber (stronger tone):
    Same layout, copy changes to:
      "Your trial ends soon — upgrade to keep Emma's progress"
    [Upgrade Now →] button gains a subtle pulse animation
    Dismiss icon hidden — no longer dismissible

  DAY 7 — critical red:
    Background: #FEE2E2 · border-bottom: 1px solid #EF4444
    LEFT: red icon + text (14px, #991B1B, bold):
      "Your free trial expires today"
    [Upgrade Now →] button: solid red #EF4444
    No dismiss option

  Note: State 2 — banner absent entirely, no empty space.


━━━ PAGE GREETING ━━━

  H2 (28px, #1E293B): "Welcome back, Sarah! 👋"
  Subtitle (16px, muted): "Here's how your children are doing today."


━━━ SECTION — YOUR CHILDREN ━━━

  Section label: "YOUR CHILDREN" (small-caps, muted, 11px)
  Layout: 2-column grid (1 column on mobile)

  CARD ORDERING RULE:
    Cards with "Diagnostic pending" or "Needs attention" sort FIRST.
    Within each group, sort by most recent activity.
    Sophie (diagnostic pending) appears before Emma in this example.

  ── CHILD CARD 1 — Sophie Thompson ──
  — "Needs attention" — diagnostic pending —
  White card · 12px radius · shadow · amber left-border (4px)

  ROW 1 — identity:
    Circular avatar 80px (default avatar — no photo yet) (left)
    Name: "Sophie Thompson" (16px bold, #1E293B)
    Meta: "Year 4 · Kent" (14px, muted)
    Top-right: amber pill "⚠ Needs attention"
      — replaces streak badge when diagnostic is pending

  ROW 2 — status message:
    Amber info box (#FEF3C7 bg, amber left-border):
      "Sophie hasn't taken the diagnostic yet.
       The diagnostic creates her personalised learning path."

  ROW 3 — stats (all placeholder dashes, 13px, muted):
    📊 —  ·  ✅ 0 tests  ·  🕒 Never

  ROW 4 — actions:
    [Start Diagnostic Assessment →] primary indigo · full card width · 48px
    Auto-skip toggle: greyed 50% opacity
      Tooltip: "Available after diagnostic is complete"
    [Reset Diagnostic]: hidden

  ── CHILD CARD 2 — Emma Thompson ──
  — Active, has data —
  White card · 12px radius · shadow · indigo left-border (4px)

  ROW 1 — identity:
    Circular photo 80px (uploaded photo or default avatar) (left)
    Name: "Emma Thompson" (16px bold, #1E293B)
    Meta: "Year 5 · Kent" (14px, muted)
    Streak badge: amber pill "🔥 5 days" (top-right)

  ROW 2 — learning path progress:
    Label: "Maths" (12px, indigo subject colour)
    Progress bar: indigo fill 35% on #E2E8F0 track · 8px
    Text right: "7 / 20 topics" (13px, muted)
    Next topic line (13px, indigo, below progress bar):
      "Next: Topic 8 — Sequences →"
      — sourced from API suggested_topic + suggested_subject

  ROW 3 — stats (icons + values, 13px):
    📊 78% ↑  ·  ✅ 12 tests  ·  🕒 2h ago
    ↑ arrow: emerald if improving · red if declining · grey if flat

  ROW 4 — actions (2 rows):
    PRIMARY ROW:
      [Continue Practice →] PRIMARY indigo · 48px
        — replaces "View Details" as primary CTA
        — routes to current topic in student learning path
      [View Details] secondary outlined · 48px
      [Download Report] ghost · 48px

    CONTROLS ROW (13px, below action buttons):
      Auto-skip toggle:
        Label: "Auto-skip ≥90%" (13px, #475569)
        Toggle switch: ON = indigo · OFF = grey
        Tooltip on hover: "Topics scored ≥90% are automatically
          marked complete to save time and focus on weaker areas"
      [↺ Reset Diagnostic] ghost · red text #EF4444 · 13px
        On click → confirmation modal (see MODAL spec below)

  ── CHILD CARD — STATE 4 sub-state ──
  — Diagnostic complete, zero test history —
  — Shown instead of normal ROW 2 + ROW 3 when no tests taken —
  White card · indigo left-border · same structure as Emma's card

  ROW 2: progress bar shows 0% · "0 / 20 topics"
         Next topic line: "Next: Topic 1 — Place Value →"

  ROW 3: replace stats row with soft info message
    Indigo-tinted box (#EEF2FF bg, indigo left-border, 12px):
      "No activity yet — start practice to see progress here."

  ROW 4: [Start Practice →] primary indigo (instead of Continue Practice)

  ── ADD CHILD CARD ──
  Dashed border #C7D2FE · #EEF2FF bg · 12px radius
  Same height as child cards · entire card clickable → P-03
  Hidden when 5 children already exist

  Centred content:
    + icon (24px, indigo)
    "Add another child's learning path" (16px, indigo, bold)
    "Up to 5 children per account" (12px, muted)


━━━ MODAL — Reset Diagnostic Confirmation ━━━
  — Overlay shown when [↺ Reset Diagnostic] is clicked —
  — Guidelines §6 modal rules —

  Backdrop: rgba(0,0,0,0.45)
  Card: white · 16px radius · max-width 480px · centred

  Icon: amber warning circle (32px)
  H3 (20px): "Reset Emma's diagnostic?"
  Body (15px, #475569):
    "This will archive Emma's current learning path and scores.
     She will need to retake the diagnostic to generate a new path.
     This action cannot be undone."
  Checkbox (required before confirm button activates):
    "I understand this will archive Emma's current progress"

  Footer:
    [Cancel] ghost (left) · [Reset Diagnostic] solid red #EF4444 (right)
    Red button disabled/greyed until checkbox is ticked


━━━ SECTION — RECENT ACTIVITY ━━━

  White card · full width
  Label: "RECENT ACTIVITY" (small-caps, muted, 11px)

  GROUPED FORMAT — grouped by child, then by time cluster:

  GROUP 1 — Emma · 2h ago (emerald dot):
    • Completed Topic 7 — Basic Algebra
    • Scored 90% on Topic 7 (Attempt 2) 🎉
    • Unlocked Topic 8: Sequences

  GROUP 2 — Sophie · 5h ago (amber dot):
    • Logged in for the first time

  Each group:
    Child avatar (24px circular) + child name bold + timestamp muted
    Bullet items indented below (14px, #475569)

  [View full activity →] indigo text link (14px) below groups

  EMPTY FEED STATE (no activity at all):
    Muted centred text: "No activity yet — encourage Emma to
    start her first practice session!"


━━━ STATE 3 — EMPTY STATE ━━━
  — Replaces child grid section only —
  — Safety fallback — not first-run (see spec note) —

  Centred empty state card (white, 16px radius, shadow):
    Illustration: friendly pencil/star graphic (indigo/amber palette)
    H3 (20px, #1E293B): "No children added yet"
    Body (15px, muted):
      "Add your first child's profile to get started."
    [+ Create Your First Child Profile] primary indigo · 48px · centred

  Design note: encouraging, not an error state.


━━━ DESIGN NOTES ━━━

CARD ORDERING:
  Cards with "Needs attention" (diagnostic pending) sort first.
  This surfaces actionable items before monitoring items.
  Sophie appears before Emma despite being the second child.

PRIMARY CTA CHANGE (suggestion #1):
  "Continue Practice →" replaces "View Details" as the primary
  button on active child cards. Parents want the next action,
  not a status report. "View Details" is demoted to secondary.
  "Next: Topic 8 — Sequences" below the progress bar provides
  the context that makes "Continue Practice" meaningful.
  Data source: API ChildDashboardOutput.suggested_topic field.

NEEDS ATTENTION BADGE (suggestion #2):
  Amber "⚠ Needs attention" pill replaces the streak badge on
  cards where the diagnostic is pending or action is required.
  Combined with amber left-border and first-position sorting,
  parents cannot miss that Sophie needs action.

TRIAL BANNER URGENCY PROGRESSION (suggestion #8):
  Three distinct states tied to days remaining. Days 1–4 are
  informational. Days 5–6 escalate tone and remove the dismiss
  option — parents must either upgrade or see it every session.
  Day 7 switches to red — maximum urgency, no ambiguity.
  Matches F-036 trial expiry email sent on day 5–6.

GROUPED ACTIVITY FEED (suggestion #6):
  Flat chronological lists become unreadable when 2+ children
  are active. Grouping by child + time cluster makes the feed
  scannable at a glance. Parents see "what Emma did" and
  "what Sophie did" as separate units, not an interleaved stream.

STATE 4 — NO-ACTIVITY SUB-STATE (suggestion #9):
  A child who completed the diagnostic but has no test history
  shows a gentle indigo info message instead of a row of dashes.
  "No activity yet — start practice to see progress here."
  CTA becomes [Start Practice →] not [Continue Practice →].

AUTO-SKIP TOOLTIP (suggestion #12):
  Updated to: "Topics scored ≥90% are automatically marked
  complete to save time and focus on weaker areas."
  Parent-friendly language — avoids technical phrasing.

ADD CHILD COPY (suggestion #11):
  "Add another child's learning path" (was "Add Another Child").
  Communicates the value of the action, not just the action.

WEEKLY GOAL (suggestion #5 — deferred):
  Not included — requires unbuilt backend feature (study_goals
  table + use cases). Reserve a visual placeholder space in the
  card if desired, labelled "Weekly goals — coming soon."
  Do NOT wire up or imply it is functional at MVP.

DOWNLOAD REPORT:
  Present per F-026 AC #2. If F-035 (Sprint 10) not ready
  at launch: render with "Coming soon" tooltip, not removed.

CHILD CARD LAYOUT:
  2-column grid desktop · 1-column mobile.
  Equal card heights per row using CSS grid align-items: stretch.
  5 children: Add Child card hidden, last card full-width row 3.