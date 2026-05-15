Screen: P-08 — Subscription & Billing
Mode: A (Guidelines §4)
Canvas: 1280px full page, sticky header
File: src/app/parent/billing/page.tsx
Component: src/components/figma/SubscriptionBilling.tsx
i18n: t('billing.*')
Spec: F-047 (Sprint 8, P0)

DESIGN INTENT:
  A calm, trustworthy billing experience focused on clarity,
  transparency, and reassurance.
  Tone: transparent, calm, supportive — never aggressive or sales-heavy.
  Reinforce subscription value. Reduce billing anxiety.
  Make plan changes and cancellation predictable and safe.


━━━ HEADER (72px, sticky, #1E1B4B) ━━━

  Logo + Kyros wordmark (left)
  Nav: Dashboard · Settings · Billing (active, white underline)
  Right: avatar circle "S" + "Sarah ▼" dropdown


━━━ PAGE TITLE ━━━

  H2 (28px, #1E293B): "Subscription & Billing"
  Subtitle (16px, muted):
    "Manage your subscription, payment methods, and billing history."


━━━ PAGE LAYOUT ORDER ━━━

  1. Current Plan Card  (or Trial / Cancelled / Past Due state)
  2. Payment Method
  3. Available Plans
  4. Billing History
  5. Support Footer


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THIS SCREEN HAS 4 PLAN STATES
Design all four. They replace Section 1 (Current Plan Card) only.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


━━━ STATE 1 — ACTIVE PAID SUBSCRIPTION ━━━
  White card · indigo left-border (4px) · 16px radius · shadow

  TOP ROW:
    Left: H3 (20px, bold): "Annual Plan"
    Right: "Active" emerald badge

  PRICE ROW:
    "£79.99 / year" (32px, bold, #1E293B)
    "Save 33% compared to monthly billing"
      (13px, emerald text, below price)

  RENEWAL ROW (14px, #475569):
    "Renews on 15 January 2026"
    "Next payment: £79.99 on 15 January 2026"
      (both lines stacked, muted)

  CHILD PROFILE USAGE (#3):
    "2 of 3 child profiles currently used" (13px, muted)
    Small indigo progress bar · 6px · 2/3 fill · below text

  FEATURE LIST (emerald ticks, 14px):
    ✓ Unlimited practice tests
    ✓ Up to 3 child profiles
    ✓ Full question bank — 8,863 questions
    ✓ Progress tracking & PDF reports

  ACTIONS ROW:
    [Change Plan] secondary · 48px
    Cancel subscription — small red muted text link · NOT a button
      Positioned right-aligned, below or beside [Change Plan]

  CANCEL HELP TEXT (13px, muted, below actions):
    "You'll keep full access until your current billing period ends."


━━━ STATE 2 — FREE TRIAL (#18 — MISSING FROM CHATGPT) ━━━
  White card · amber left-border (4px) · 16px radius · shadow

  TOP ROW:
    Left: H3 (20px, bold): "Free Trial"
    Right: "Trial Active" amber badge

  TRIAL COUNTDOWN:
    Large amber number: "3" + "days remaining" (muted)
    Amber progress bar (7-segment): Day 4 of 7 · 8px · rounded
    "Trial ends on 18 December 2024" (13px, muted)

  WHAT'S INCLUDED (14px, indigo ticks):
    ✓ Full access to all features
    ✓ Unlimited practice tests
    ✓ Up to 3 child profiles
    ✓ No card required during trial

  PAYMENT METHOD NOTE:
    Amber info box (#FEF3C7, amber left-border, 13px):
      "No payment method on file — you won't be charged
       until you choose a plan after your trial ends."

  TRIAL CTA:
    [Choose a Plan →] PRIMARY indigo · 48px · full card width
    Sub-text below (12px, muted):
      "Pick a plan before your trial ends to keep Emma's progress."

  TRIAL EXPIRY NOTE (13px, muted, below CTA):
    "If you don't choose a plan, your account will revert to
     limited access (2 tests total) at the end of your trial."


━━━ STATE 3 — CANCELLED (ACTIVE UNTIL PERIOD END) (#16 — MISSING) ━━━
  White card · red left-border (4px) · 16px radius · shadow

  TOP ROW:
    Left: H3 (20px, bold): "Annual Plan"
    Right: "Cancelled" red badge

  ACCESS INFO:
    "Full access until:" (14px, muted)
    "15 January 2026" (20px, bold, #1E293B)
    "After this date, your account reverts to limited access."
      (13px, muted)

  LIMITED ACCESS WARNING (red-tinted box #FEE2E2, red left-border):
    "After 15 January 2026:
     • Tests limited to 2 total
     • No learning path access
     • No PDF reports or mock exams"

  REACTIVATE CTA:
    [Reactivate Subscription] PRIMARY indigo · 48px · full width
    Sub-text (12px, muted):
      "Reactivate now to keep uninterrupted access.
       Your next billing date will remain 15 January 2026."

  SECONDARY LINK:
    "Changed your mind? Reactivate before 15 Jan 2026 →"
      indigo text link · 13px · below button


━━━ STATE 4 — PAYMENT FAILED / PAST DUE (#19 — MISSING) ━━━
  White card · red left-border (4px) · 16px radius · shadow

  TOP ROW:
    Left: H3 (20px, bold): "Annual Plan"
    Right: "Payment Failed" red badge

  ALERT BOX (red-tinted #FEE2E2, red border-left, 14px):
    ⚠ "We couldn't process your payment of £79.99
       on 15 January 2026."
    Retry info: "We'll retry on 18 January 2026 (attempt 1 of 3)."

  URGENCY MESSAGE (14px, #EF4444, bold):
    "Update your payment method to avoid losing access."

  CURRENT CARD:
    Show masked card: "Visa •••• 4242 — Exp. 08/27"
    Status: "Payment failed" — red label

  CTA:
    [Update Payment Method →] PRIMARY indigo · 48px · full width
    Sub-text (12px, muted):
      "Updating your card will trigger an immediate retry."

  RETRY TIMELINE (13px, muted, below CTA):
    "Retry 1: 18 Jan · Retry 2: 23 Jan · Final: 30 Jan
     Your subscription will be cancelled if payment fails 3 times."


━━━ PAYMENT METHOD CARD ━━━
  White card · 16px radius

  TITLE (16px, bold): "Payment Method"

  CARD ROW:
    Visa card icon (32px) + "•••• •••• •••• 4242" + "Exp. 08/27"
    Status: ✓ "Active" emerald text (13px)

  TRUST SIGNAL (#5):
    Below card row: small Stripe logo + "✔ Secured by Stripe"
      (12px, muted, inline)

  [Update Payment Method] secondary · 48px

  NO PAYMENT METHOD STATE (trial users, State 2):
    Replace row with:
      Dashed border box · centred:
        Card icon (muted, 24px)
        "No payment method added yet" (14px, muted)
      [Add Payment Method] secondary · 48px


━━━ AVAILABLE PLANS CARD ━━━
  White card · 16px radius

  TITLE (16px, bold): "Available Plans"
  SUBTEXT (#6, 13px, muted):
    "Plan changes take effect at your next billing cycle."

  3-COLUMN PRICING CARDS:

  CARD 1 — MONTHLY:
    Badge: "Most Flexible" — muted grey pill
    Price: "£9.99" (28px, bold) + "/ month" (14px, muted)
    Meta (13px, muted): "Flexible monthly billing"
    Feature list (3 lines, indigo ticks, 13px):
      ✓ All features included
      ✓ Cancel or change anytime
      ✓ Full question bank
    CTA: [Switch to Monthly] secondary · 44px
    Helper (12px, muted, below CTA):
      "You'll keep Annual access until 15 Jan 2026"

  CARD 2 — QUARTERLY:
    Badge: "Save £5" — amber pill
    Price: "£24.99" (28px, bold) + "/ quarter" (14px, muted)
    Savings text (13px, emerald): "Save £5 vs monthly"
    Feature list: same as Monthly
    CTA: [Switch to Quarterly] secondary · 44px
    Helper: "You'll keep Annual access until 15 Jan 2026"

  CARD 3 — ANNUAL (CURRENT):
    Badge: "Best Value" — indigo pill (top-right)
    "Your Current Plan" label — muted indigo text (top-left)
    Price: "£79.99" (28px, bold) + "/ year" (14px, muted)
    Savings text (13px, emerald): "Save 33% vs monthly billing"
    Feature list: same as Monthly + "✓ Priority support"
    CTA: [Current Plan ✓] — muted indigo bg · indigo text (#9)
      NOT greyed-out dead-looking — styled as "selected" state
    Helper: "You're on this plan — no action needed"

    CARD ELEVATION:
      Current plan card (Card 3) has a slightly deeper shadow
      and a subtle indigo tint on background (#FAFAFE)
      to signal "this is yours"


━━━ BILLING HISTORY CARD ━━━
  White card · 16px radius · full width

  TITLE (16px, bold): "Billing History"
  HELPER (#10, 13px, muted):
    "Receipts are automatically emailed after each payment."

  TABLE:
    Columns: Date · Description · Amount · Status · Receipt
    50 rows per page

    Row 1: 15 Jan 2025 · Annual Plan · £79.99 · ✓ Paid · [Download]
    Row 2: 15 Jan 2024 · Annual Plan · £79.99 · ✓ Paid · [Download]

    Status column:
      Paid: emerald badge
      Pending: amber badge
      Failed: red badge

    Receipt column: [Download] — indigo text link
      Opens/downloads invoice PDF from Stripe

  EMPTY STATE (#11):
    Centred, no rows:
      Invoice icon (muted, 32px)
      "Your invoices and receipts will appear here
       after your first payment." (14px, muted)

  EXPORT ROW (#12, below table, right-aligned, 13px):
    [↓ Export CSV] ghost button
    [↓ Export PDF] ghost button
    Note: both available per backend support


━━━ CANCEL SUBSCRIPTION MODAL (#13, #14, #15, #17) ━━━
  — Triggered by "Cancel subscription" link —

  Backdrop: rgba(0,0,0,0.45)
  Card: white · 16px radius · max-width 520px · centred

  Icon: amber warning circle (32px)
  H3 (20px): "Cancel your subscription?"

  ACCESS CONTINUITY MESSAGE (14px, #475569):
    "You'll keep full access until 15 January 2026.
     Your children's learning progress, reports, scores,
     and school setup will remain available until then."

  WHAT HAPPENS AFTER (amber-tinted box #FEF3C7, 13px):
    "After 15 January 2026, your account reverts to:
     • Tests limited to 2 total
     • No learning path access
     • No mock exams or PDF reports"

  RETENTION LINK (#15):
    "Pause subscription instead →" — indigo text link · 13px
    Below the warning box

  CANCELLATION REASON (#17 — F-047 AC required):
    Section label (12px, muted): "Help us improve (optional)"
    Reason dropdown (required for submission):
      Select a reason ▼
      · Too expensive
      · Child no longer needs it
      · Switching to a different service
      · Not using it enough
      · Technical issues
      · Other
    Optional feedback textarea (88px tall):
      Placeholder: "Tell us more (optional)"
      Max 500 characters · character counter bottom-right

  FOOTER BUTTONS:
    [Keep My Subscription] PRIMARY indigo · full width
    [Cancel Subscription] ghost · red border · red text
      — below primary, not beside it —
      — keeps [Keep] as the dominant action —


━━━ SUPPORT FOOTER (#22) ━━━

  Muted text · centred · 14px
  "Need help with billing? Contact support →"
    Indigo text link


━━━ DESIGN NOTES ━━━

4 PLAN CARD STATES:
  State 1 (Active) is the default and primary design.
  States 2–4 are mutually exclusive replacements for the top card.
  Sections 2–5 (Payment Method, Plans, History, Footer) are
  identical across all states.

TRIAL STATE (State 2):
  The countdown number is the dominant visual — large amber.
  No payment method row in State 2 — show "no card added" placeholder.
  [Choose a Plan →] is the only primary CTA on the page during trial.

CANCELLED STATE (State 3):
  [Reactivate Subscription] is the primary CTA — the job of this
  state is to undo the cancellation, not reinforce it.
  The access end date is shown in large bold to anchor urgency.
  Red left-border signals "action needed" without being alarming.

PAYMENT FAILED STATE (State 4):
  The most urgent state. Red palette throughout the top card.
  [Update Payment Method →] is the only CTA that matters here.
  The retry timeline helps parents understand they have time —
  reduces panic. Final retry date shown to create urgency without
  being threatening.

CANCEL MODAL — CTA ORDER:
  [Keep My Subscription] is the full-width primary CTA.
  [Cancel Subscription] sits below it as a smaller ghost action.
  This is intentional — F-047 intent is to reduce churn.
  Parents who want to cancel can still do so easily; the layout
  just doesn't make it the obvious choice.

CANCELLATION REASON (#17):
  F-047 AC requires reason capture. The dropdown is required
  for modal submission (parent must select before [Cancel] activates).
  The feedback textarea is optional. Both map directly to the
  API's `reason` and `feedback` fields on CancelSubscriptionRequest.

PAUSE SUBSCRIPTION (#15):
  "Pause subscription instead →" is now shown as a retention link
  in the cancel modal. Pause is a supported backend feature.

PLAN BADGES (#7 FIX):
  Monthly = "Most Flexible" · Quarterly = "Save £5" · Annual = "Best Value"
  Never two cards with the same badge — each card earns one distinct label.

CURRENT PLAN BUTTON STYLE (#9):
  Annual card's [Current Plan ✓] uses muted indigo background
  (#EEF2FF) with indigo text. NOT dead grey. It communicates
  "selected" — a positive state — not "unavailable."

EXPORT BUTTONS (#12):
  Both CSV and PDF exports are shown as active ghost buttons
  (not "coming soon") per backend support confirmation.

STRIPE BADGE (#5):
  Small and reassuring — not a prominent design element.
  Sits inline below the card row as a trust signal.

BILLING CYCLE NOTE (#6):
  "Plan changes take effect at your next billing cycle" is
  shown as a subtitle below the Available Plans heading.
  Also repeated as per-card helper text below each CTA.

MICRO-INTERACTIONS (#20):
  Pricing plan cards animate softly on hover — subtle lift shadow.
  Active/current plan card is slightly elevated (deeper shadow)
  at rest — no hover needed to signal "selected."
  Modal fades and scales in (0.85 → 1.0 scale, 200ms ease-out).
  Cancel modal [Cancel Subscription] button fades in only after
  reason dropdown is selected — draws attention to the reason step.
  Download links show hover underline.
  Toggle/CTA transitions: 150ms ease.

MOBILE ADAPTATION (#21):
  Plan cards stack vertically — Annual card appears first.
  Billing table becomes accordion rows (tap to expand).
  Sticky bottom bar shows current plan name + [Change Plan] CTA.
  Payment method row stacks cleanly — card + button vertical.
  Cancel modal is full-screen bottom sheet on mobile.
  Export buttons stack below table — full width on mobile.