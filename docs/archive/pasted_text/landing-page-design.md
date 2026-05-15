Screen: P-01 — Landing Page (Pre-Login)
Mode: A (Guidelines §4 · §9 · §12 · §13)
Canvas: 1280px wide, scrollable — branded learning portal
Platform name: Kyros (Guidelines §10)
i18n: all strings use t('landing.*') — see Guidelines §13
Component output: src/components/figma/LandingPage.tsx

DESIGN INTENT:
  Light on text. Heavy on space. Every section has one job.
  Core story: adaptive learning + clear path to exam day = proven results.
  Show the path and the proof — don't describe either in paragraphs.
  Tone: positive, forward-looking, specific. No fear or pressure language.


━━━ SECTION 1 — HEADER (72px, sticky, #1E1B4B) ━━━
  — Stays visible on scroll. CTA always in view. —

LEFT:
  Logo placeholder: rounded square, dashed #C7D2FE border,
  #EEF2FF fill, 40px tall, labelled "Logo" in small muted text
  Kyros wordmark — white, 18px, beside logo, 8px gap

CENTRE NAV (white, 16px):
  How It Works · Schools · Pricing · FAQ

RIGHT:
  "Log in" ghost white, 44px
  "Start Free Trial" solid indigo #4F46E5 pill, 44px


━━━ SECTION 2 — HERO (full viewport height, 2-column 55/45) ━━━

LEFT — copy (vertically centred, max-width 520px):

  EYEBROW (12px, small-caps, #A5B4FC, letter-spaced):
    GL ASSESSMENT · CEM · KENT TEST · ISEB

  H1 (52px, bold, #1E293B, line-height 1.15):
    "Give your child
     the confidence
     to shine"

  SUBHEADING (18px, #475569, line-height 1.6):
    "Adaptive practice and a clear path to exam day —
     built around your child from the very first question."

  — Note: "adaptive practice" and "clear path to exam day" are the
    two core product phrases. Never reword or remove them.

  PROOF BAR (below subheading, above CTA — inline, 14px, #1E293B):
    ⭐ 4.9/5 from 1,200+ parents  ·  🏫 288 schools  ·  👨‍👩‍👧 10,000+ families

  CTA BUTTON (56px height, full left-column width, #4F46E5):
    "Start Your Free 7-Day Trial"

  MICRO-COPY (13px, muted #94A3B8, centred below button):
    No card required · Cancel anytime · Takes 2 minutes to set up

  MINI ONBOARDING STEPS (below micro-copy, inline, 12px, muted):
    1. Sign up free  →  2. Take diagnostic  →  3. Get personalised plan

  TRUST BADGES (below steps, 12px, muted, inline):
    🔒 Safe for children  ·  ✓ Cancel in 2 clicks  ·  🛡 GDPR compliant


RIGHT — Brand Hero Image (Guidelines §9):

  A warm, rounded panel on #FFFBEB cream background.
  Visualises the ADAPTIVE PATH as 20 topic nodes.

  VISUAL CONCEPT — "The Path":
    Gently curving upward path — 20 topic nodes left to right.
    Nodes 1–7: filled emerald circles — completed
    Node 8: filled indigo circle, slightly larger, soft indigo glow
    Nodes 9–20: outlined grey circles — upcoming
    Path line: indigo solid between completed, dashed grey ahead

    AT NODE 8 — floating card (white, 12px radius, indigo left-border):
      "Topic 8 — Basic Algebra"
      "Adapted to Emma · Medium difficulty"
      Progress bar (indigo, 70%): "Your best: 70% — keep going!"

    AT NODE 7 — small badge:
      Emerald pill: "Topic 7 ✓ — 92%"

    AT NODE 20 — goal marker (soft, indigo):
      Star icon, labelled "Exam ready" in 12px muted text

    ANIMATION (optional): indigo path fill animates
      left-to-right across completed nodes.

  Generous padding. Path arc has breathing room.
  Should read instantly: "there's a clear plan, we're on it."


━━━ SECTION 3 — SCHOOL TICKER (#1E293B, 56px tall) ━━━

  Scrolling or static row — white text, 14px medium:
  "Families preparing for: Tonbridge Grammar · The Judd School ·
   Invicta Grammar · Dartford Grammar · Weald of Kent · Simon Langton ·
   King Edward's Birmingham · Withington Girls' · Reading School ·
   Henrietta Barnett · and 277 more →"


━━━ SECTION 4 — OUTCOMES STRIP (#1E1B4B dark background) ━━━
  — NEW. Proves results immediately after ticker. —

  3 STATS — horizontal row, centred, generous spacing:

  Stat 1:
    Number (48px, bold, white): "+22%"
    Label (14px, #A5B4FC): "average improvement in 8 weeks"

  Stat 2:
    Number (48px, bold, white): "87%"
    Label (14px, #A5B4FC): "of students reach exam-ready level"

  Stat 3:
    Number (48px, bold, white): "3 in 5"
    Label (14px, #A5B4FC): "students improve by at least one grade band"

  Footnote (11px, #A5B4FC, centred below):
    "Based on pilot data from students using structured topic paths"

  Design note: Numbers dominate. No cards, no borders.
  Stats float on dark background with plenty of vertical space.


━━━ SECTION 5 — HOW IT WORKS (#F8FAFC, generous vertical padding) ━━━

  H2 (centred, 36px, #1E293B):
    "A clear path from day one to exam day"
  Subtext (centred, 16px, muted):
    "Start early. Stay ahead. Know exactly when your child is exam-ready."

  3 STEPS — horizontal row, connected by dashed indigo line:

  STEP 1
    Icon: diagnostic chart / magnifier (32px outline)
    Label (indigo, small-caps, 11px): DISCOVER
    Heading (18px, bold): "Find the starting point"
    Body (14px, #475569, 2 lines):
      "A 40-question diagnostic across all four subjects.
       Instant results. Personalised path generated immediately."
    CTA link: "Find your child's starting point →" (indigo, 13px)

  STEP 2
    Icon: branching path / adaptive nodes
    Label (indigo, small-caps, 11px): ADAPT
    Heading (18px, bold): "Practice that adjusts to them"
    Body (14px, #475569, 2 lines):
      "Questions adapt to your child's level as they progress.
       Topics unlock one by one. Always the right next step."

  STEP 3
    Icon: calendar / target / flag
    Label (indigo, small-caps, 11px): SUCCEED
    Heading (18px, bold): "Arrive at exam day ready"
    Body (14px, #475569, 2 lines):
      "Full mock exams in GL Assessment, CEM, Kent Test and ISEB
       formats. Timed, marked, and explained in full."
    CTA link: "See the full learning path →" (indigo, 13px)

  Pull quote (italic, 20px, centred, #1E293B, generous top margin):
    "She started enjoying practice. That told me everything."
    — Parent, Year 5, Kent


━━━ SECTION 6 — FEATURE SPOTLIGHT (white bg, generous padding) ━━━

  2-column layout. Left: product illustration. Right: copy.

  LEFT COLUMN — Visual (adaptive path + parent dashboard):

    TWO STACKED PANELS in a rounded product frame
    (white, #E2E8F0 border, shadow):

    TOP PANEL — Learning Path Grid:
      Subject tabs: [Maths ●]  English  VR  NVR
      20-topic grid:
        Topics 1–7: emerald ✓ + score
        Topic 8: indigo "In Progress"
        Topics 9–20: grey 🔒
      Adaptive insight card (indigo-tinted bg):
        "Based on Emma's results, we've adjusted Topic 8 to focus
         on word problems — her biggest growth opportunity."
      — This card is the adaptive proof point. Make it readable.

    BOTTOM PANEL — Parent Dashboard mini-preview:
      "Emma Thompson · Year 5 · Kent"
      4 subject bars: Maths indigo 78%, English emerald 85%,
                      VR amber 72%, NVR red 65%
      Caption: "See exactly where your child stands at any time"

  RIGHT COLUMN — copy (vertically centred, max-width 440px):

    LABEL (indigo, small-caps, 12px): ADAPTIVE LEARNING PATH

    H2 (36px, bold, #1E293B):
      "Always the right
       question at the
       right time"

    BODY (16px, #475569, line-height 1.7, 4 sentences max):
      "Our platform continuously adjusts to your child's performance.
       Topics unlock in the right order. Questions calibrate to their
       level. And you always know exactly where they stand."

    FEATURE LIST (14px, indigo ticks):
      ✓ 20 structured topics per subject, unlocking progressively
      ✓ Questions adapt to your child's level in real time
      ✓ Weak areas surfaced and prioritised automatically
      ✓ Parent dashboard shows progress across all four subjects

    CTA LINK (indigo, 14px):
      "See your personalised learning path →"


━━━ SECTION 7 — BEFORE / AFTER (#F8FAFC) ━━━
  — NEW. Visual proof of transformation. —

  H2 (centred, 32px, #1E293B): "This is what changes"

  TABLE (centred, max-width 760px, white card, 12px radius, shadow):

    Headers:
      "Without Kyros"  — muted, left
      "With Kyros"     — indigo #4F46E5, bold, right column

    5 rows (alternating white / #F8FAFC):
      ✗ Random practice          →  ✓ Structured path to exam day
      ✗ Weak areas unknown        →  ✓ Gaps identified from day one
      ✗ Inconsistent scores       →  ✓ Steady, tracked improvement
      ✗ Parents guessing progress →  ✓ Live progress dashboard
      ✗ Exam format a mystery     →  ✓ Real mock exams, real formats

    Left column: muted text, small red ✗
    Right column: #1E293B text, small emerald ✓, #EEF2FF column bg

  REAL EXAMPLE (below table, indigo-tinted rounded pill, centred):
    "Emma: 52% → 78% in 6 weeks  ·  Year 5  ·  Target: Tonbridge Grammar"


━━━ SECTION 8 — TRY A QUESTION (white bg) ━━━
  — NEW. Builds product credibility before signup. —

  H2 (centred, 32px, #1E293B): "Try a sample question"
  Subtext (centred, 16px, muted):
    "See how Kyros explains every answer — right or wrong."

  SAMPLE CARD (centred, max-width 640px,
               white, 12px radius, #E2E8F0 border, shadow):

    Badges top row:
      Left: "Maths · Topic 8" — indigo pill
      Right: "Medium" — amber pill

    Question (18px, #1E293B):
      "Solve for x:  2x + 5 = 13"

    5 answer options (48px rows, #E9D5FF border, 10px radius):
      ○  A.  x = 2
      ○  B.  x = 3
      ○  C.  x = 4
      ○  D.  x = 5
      ○  E.  x = 6

    [Submit Answer] — primary indigo, 48px

    ANSWER STATE (second state, shown after selection):
      C. x = 4 — emerald left-border highlight
      Explanation block (#EEF2FF, indigo left-border):
        "Step 1: Subtract 5 from both sides: 2x = 8
         Step 2: Divide both sides by 2: x = 4 ✓"

  Below card (14px, muted, centred):
    "Every question on Kyros includes a step-by-step explanation like this."
  Link: "Preview a full mock test →" (indigo, 14px)


━━━ SECTION 9 — TESTIMONIALS (#EEF2FF background) ━━━

  H2 (centred, 32px): "Families who made it"

  3 CARDS (white, 12px radius, equal height, shadow):

  Card 1:
    ★★★★★
    "Went from 60% to 85% in 2 months. She got into Invicta."
    Sarah M. — Maidstone, Kent
    Emerald pill: "Invicta Grammar ✓"
    Indigo micro-badge top-right: "+25 points"

  Card 2:
    ★★★★★
    "Got into Judd after really struggling with maths.
     The path made the difference — he always knew what to do next."
    James T. — Tonbridge, Kent
    Emerald pill: "The Judd School ✓"
    Indigo micro-badge: "Maths: 58% → 81%"

  Card 3:
    ★★★★★
    "Her confidence went through the roof. King Edward's — first choice."
    Priya K. — Birmingham
    Emerald pill: "King Edward's ✓"
    Indigo micro-badge: "+22 points in 8 weeks"

  Below cards (14px, muted, centred):
    ★ 4.9 / 5 from 1,200+ parents


━━━ SECTION 10 — WHO IS THIS FOR? (#F8FAFC) ━━━
  — NEW. Helps parents self-qualify quickly. —

  H2 (centred, 32px, #1E293B): "Built for every 11+ student"

  2-column layout (equal width):

  LEFT — who it's for:
    Heading (18px, bold): "Kyros works for:"
    4 rows (indigo ✓, 16px):
      ✓ Year 4–6 students starting early
      ✓ Students needing structured revision
      ✓ Children targeting top grammar schools
      ✓ Beginners with no prior prep experience

  RIGHT — subjects:
    Heading (18px, bold): "All four subjects covered:"
    4 subject blocks (icon + subject name + one-line description):

      [M]  Maths (indigo)
           "From times tables to algebra and ratio"

      [E]  English (emerald)
           "Comprehension, vocabulary and writing skills"

      [VR] Verbal Reasoning (amber)
           "Codes, analogies and word patterns"

      [NVR] Non-Verbal Reasoning (cyan)
            "Shapes, sequences and spatial reasoning"

  Below both columns (centred, 14px, indigo):
    "Covers GL Assessment, CEM, Kent Test and ISEB formats"


━━━ SECTION 11 — COMPARISON TABLE (white bg) ━━━
  — NEW. Answers "why not books or a tutor?" —

  H2 (centred, 32px, #1E293B): "Why Kyros beats the alternatives"

  TABLE (centred, max-width 860px, white card, 12px radius, shadow):

    Headers: Feature · Books · Tuition · Kyros
    Kyros column: #EEF2FF background, indigo header — visually distinct

    Rows:
      Adaptive to your child      ✗   ✗    ✓
      Personalised learning path  ✗   ✗    ✓
      Progress tracking           ✗  Limited ✓
      Real mock exams             ✗  Limited ✓
      Instant explanations        ✗   ✗    ✓
      Available 24/7              ✓   ✗    ✓
      Monthly cost               £5–20  £40–80+  £9.99

    ✓ = emerald  ·  ✗ = light red  ·  Limited = amber

  CTA below table:
    "All of this, for less than the cost of one tutoring session."
    [Start your child's plan →] — primary indigo, 48px


━━━ SECTION 12 — FAQ (#F8FAFC) ━━━
  — NEW. Removes objections before pricing. —

  H2 (centred, 32px, #1E293B): "Questions parents ask"

  5 ACCORDION ITEMS (white cards, stacked, 12px radius,
                     chevron ▼ right, expand on click):

  Q1: "Is this suitable for my child's level?"
  A1: "Yes. Our diagnostic test assesses your child's current level across
       all four subjects on day one and builds a path that starts exactly
       where they are — whether just starting out or already well ahead."

  Q2: "How is this different from books or a tutor?"
  A2: "Books give everyone the same content. Tutors are expensive and
       limited by availability. Kyros adapts to your child's performance,
       tracks progress automatically, and is available any time — for the
       price of a single tutoring hour per month."

  Q3: "How often should my child practise?"
  A3: "20–30 minutes a day is more effective than long weekend sessions.
       Kyros is designed for short, focused daily practice — each topic
       takes around 20 minutes to complete."

  Q4: "Do you cover all exam boards?"
  A4: "Yes — GL Assessment, CEM, Kent Test and ISEB formats are all
       covered. Select your child's target schools when setting up their
       profile and we tailor the content accordingly."

  Q5: "Can I track my child's progress?"
  A5: "Yes. The parent dashboard shows progress across all four subjects,
       highlights weak areas, tracks scores over time, and lets you
       download a full PDF report at any time."

  Link below (centred, 14px, muted):
    "More questions? Visit our Help Centre →" (indigo link)


━━━ SECTION 13 — PRICING (#F8FAFC) ━━━

  H2 (centred, 32px, #1E293B): "Simple pricing. Everything included."
  Subtext (centred, 16px, muted):
    "Every subject · every topic · every mock exam · one plan."

  3 CARDS (white, 12px radius, centred, max 960px total):

  Monthly — £9.99/month
    [Start Free Trial] secondary outlined

  Quarterly — £24.99/quarter
    "Most Popular" indigo pill · "Save £5" amber badge
    [Start your child's plan →] PRIMARY solid indigo — slightly elevated

  Annual — £79.99/year
    "£6.67/month" emerald text · "Save £40" emerald badge
    [Start your child's plan →] secondary outlined

  Feature list ALL cards (4 lines, indigo ticks, 14px):
    ✓ Adaptive learning path — all 4 subjects
    ✓ Personalised diagnostic from day one
    ✓ Unlimited mock exams (GL · CEM · Kent · ISEB)
    ✓ Parent progress dashboard

  GUARANTEE ROW (below cards, centred, 14px, #1E293B):
    🔒 7-day free trial  ·  Cancel anytime in 2 clicks
    "If you don't find value, don't continue — no questions asked."

  Trust badges (13px, muted, centred):
    Stripe · SSL secured · GDPR compliant · All prices include VAT


━━━ FOOTER (#0F172A, white text) ━━━

  LEFT:
    Logo placeholder (dark: #1E293B fill, #4F46E5 dashed border)
    Kyros wordmark — white
    Tagline: "The adaptive path to grammar school success."

  CENTRE — 3 columns (14px, muted white):
    Platform:  How It Works · Learning Path · Mock Exams · Pricing
    Schools:   Browse Schools · GL Assessment · CEM · Kent Test · ISEB
    Support:   Help · Contact · Privacy · Terms

  RIGHT:
    "Start Free Trial" — indigo, 44px
    "No card required" — 12px below, muted

  Bottom bar (border-top, 12px, very muted):
    © 2024 Kyros. All rights reserved.
    Stripe · SSL secured · GDPR compliant


━━━ DESIGN PRINCIPLES ━━━

WHITESPACE:
  Every section has one job. Min 96px padding between sections.
  Density kills trust. When in doubt, add space not content.

MOBILE (critical — most parents land here on mobile):
  Hero: single column, H1 stacks above brand hero image
  Brand hero image: readable at 375px, simplify to 10 nodes if needed
  All CTA buttons: min 56px height, full width on mobile
  Comparison table and FAQ: both work cleanly on touch
  Sticky header: shorten to "Try Free" on small screens
  CTA always visible — never scrolled off screen

PROOF BAR (Section 2):
  Sits directly below subheading, above CTA.
  First trust signal a parent sees. Must be immediately legible.

OUTCOMES STRIP (Section 4):
  The numbers are the design. No borders, no cards.
  The footnote about pilot data is small but critical for credibility.

BEFORE/AFTER (Section 7):
  Emerald ✓ vs red ✗ carries the argument visually.
  The real example row ("Emma: 52% → 78%") makes it personal.

SAMPLE QUESTION (Section 8):
  Design both states: question state + answer-revealed state.
  The explanation block is the quality proof — it shows parents
  that wrong answers become learning moments.

TESTIMONIALS (Section 9):
  Score improvement micro-badges are the new credibility layer.
  One sentence quote maximum. Let the data do the talking.

FAQ (Section 12):
  All 5 items start closed. First may be open by default.
  Position before pricing — remove objections before the ask.

VARIED CTA TEXT:
  Header:            "Start Free Trial"
  Hero button:       "Start Your Free 7-Day Trial"
  How It Works S1:   "Find your child's starting point →"
  Feature Spotlight: "See your personalised learning path →"
  Comparison:        "Start your child's plan →"
  Pricing quarterly: "Start your child's plan →"
  Footer:            "Start Free Trial"

SECTION TITLES:
  Max 7 words. Benefit-led. No exclamation marks.

PRICING GUARANTEE:
  The guarantee row is the last thing a parent reads before
  deciding. It is the risk-reversal close — treat it with weight.