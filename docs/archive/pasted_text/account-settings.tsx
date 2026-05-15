Screen: P-07 — Account Settings
Mode: A (Guidelines §4)
Canvas: 1280px full page, sticky header
File: src/app/parent/settings/page.tsx
Component: src/components/figma/AccountSettings.tsx
i18n: t('settings.*')
Spec: F-046 (Sprint 8, P0)

DESIGN INTENT:
  A safe, parent-focused settings experience for managing
  account details, children, notifications, and privacy.
  Tone: calm, secure, organised, parent-friendly.
  Prioritise family management over account administration.
  Destructive actions feel deliberate, not accidental.


━━━ HEADER (72px, sticky, #1E1B4B) ━━━

  Logo + Kyros wordmark (left)
  Nav: Dashboard · Settings (active, white underline) · Billing
  Right: avatar circle "S" + "Sarah ▼" dropdown


━━━ PAGE TITLE ━━━

  H2 (28px, #1E293B): "Account Settings"
  Subtitle (16px, muted):
    "Manage your account, children, and learning preferences."


━━━ LAYOUT ━━━

  2-column: 240px fixed sidebar (left) + scrollable content (right)
  Sidebar is sticky — content scrolls independently


━━━ SIDEBAR (white card, 16px radius, #E2E8F0 border) ━━━

  5 navigation items:

  1. Profile          ← default active tab
  2. Your Children
  3. Notifications
  4. Password & Security
  5. Data & Privacy

  ACTIVE STATE:
    Indigo left-border (4px) · bold text · #EEF2FF background

  HOVER STATE:
    #F8FAFC background · smooth transition

  Note: "Data & Privacy" tab is P0 requirement (F-046 GDPR AC).
  Must appear in the sidebar even if content loads last.


━━━ TAB 1 — PROFILE ━━━

  WHITE CARD · 16px radius · generous padding

  SECTION LABEL: "YOUR PROFILE" (small-caps, muted, 11px)

  ── PROFILE ROW ──

  LEFT — Avatar area:
    Circular photo 100px
      Uploaded photo if exists · default avatar fallback
    Below avatar:
      [Change Photo] — indigo text link · 13px
      [Remove Photo] — red text link · 13px
        Visible only when photo exists
    Photo upload spec:
      Accepted: JPG, PNG · max 5MB
      On click [Change Photo]: opens file picker
      After selection: shows crop/preview modal
        Circular crop frame · [Confirm] primary · [Cancel] ghost
      Stores to S3 · displays on dashboard and all child views

  RIGHT — Profile form:

    Full Name *
      Text input · 48px · value: "Sarah Thompson"

    Email Address
      TWO STATES based on account type:

      STATE A — Google OAuth account:
        Text input (read-only, #F8FAFC bg)
        Value: "sarah.thompson@gmail.com"
        Google-G badge inline: "Connected with Google"
        Helper (muted, 12px):
          "Google account — email cannot be changed here.
           Manage your email through your Google account."
        No edit icon or [Change] button

      STATE B — Email/password account:
        Text input (editable)
        Value: "sarah.thompson@example.com"
        [Change Email] — indigo text link · 13px · right of field
          Opens inline expand or modal:
            "New email address" input
            "Confirm new email" input
            [Send Verification Email] primary
            Note: "A verification link will be sent to the
                   new address before the change takes effect."

  ── STICKY SAVE BAR ──
  — Appears only when any field has been changed —
  — Slides in from bottom of content area —

  Background: white · border-top: 1px solid #E2E8F0 · 64px
  "You have unsaved changes" (14px, #475569, left)
  [Discard] ghost · [Save Changes] primary indigo (right)
  Smooth slide-in animation when changes detected
  Disappears on save or discard


━━━ TAB 2 — YOUR CHILDREN ━━━

  WHITE CARD · 16px radius

  SECTION LABEL: "YOUR CHILDREN" (small-caps, muted, 11px)

  CHILD LIMIT STATUS:
    "2 of 5 child profiles used" (14px, #475569)
    Small indigo progress bar below · 6px height · 2/5 fill
    Right-aligned

  ── CHILD LIST ──

  Each child: white inset card · 12px radius · #E2E8F0 border

  EMMA THOMPSON ROW:
    LEFT:
      Circular avatar 40px
      Name: "Emma Thompson" (15px, bold, #1E293B)
      Meta: "Year 5 · Kent" (13px, muted)
      Context pills (12px, below meta):
        Indigo pill: "2 target schools"
        Muted text: "Last active 2h ago"
    RIGHT ACTIONS:
      [Edit Profile] secondary · 40px
      [Manage Schools] secondary · 40px
      [🗑 Archive] ghost · red text #EF4444 · 40px
        — Not "Delete" — F-046 uses 30-day soft delete —

  SOPHIE THOMPSON ROW:
    LEFT:
      Circular avatar 40px (default — no photo)
      Name: "Sophie Thompson" (15px, bold)
      Meta: "Year 4 · Kent" (13px, muted)
      Context pills:
        Amber pill: "Diagnostic pending"
        Muted text: "Last active yesterday"
    RIGHT ACTIONS:
      [Edit Profile] secondary
      [Manage Schools] secondary
      [🗑 Archive] ghost · red text

  ADD CHILD BUTTON:
    [+ Add Child Profile] secondary outlined · full width
    Helper below (12px, muted):
      "Each child gets a separate learning path and progress dashboard."

  MAX LIMIT STATE (when 5 children exist):
    Hide [+ Add Child Profile] button entirely
    Show muted note (13px, #94A3B8):
      "Maximum of 5 child profiles reached."

  ── ARCHIVE CHILD MODAL ──
  — Triggered by [🗑 Archive] —

  Backdrop: rgba(0,0,0,0.45)
  Card: white · 16px radius · max-width 480px · centred

  Icon: amber warning circle (32px)
  H3 (20px): "Archive Emma's profile?"
  Body (15px, #475569):
    "Emma's profile will be archived for 30 days.
     During this time, you can restore it from this page.
     After 30 days, all data is permanently deleted including:
     learning progress · scores and reports ·
     diagnostic results · target schools"
  Checkbox (required before button activates):
    "I understand Emma's profile will be archived and
     permanently deleted after 30 days"
  Footer:
    [Cancel] ghost (left) · [Archive Profile] solid red (right)
    Red button disabled/greyed until checkbox ticked


━━━ TAB 3 — NOTIFICATIONS ━━━

  WHITE CARD · 16px radius

  SECTION LABEL: "NOTIFICATION PREFERENCES" (small-caps, muted)

  Auto-save on toggle change · toast: "Preferences updated ✓"
  No explicit Save button needed for this tab.

  GROUP 1 — PRACTICE UPDATES:
    Label: "Practice Updates" (14px, bold, #1E293B)

    Email when a child completes a topic
      Toggle: ON (indigo)
      Helper (12px, muted): "Sent after each topic is finished"

    Alert when a child hasn't practised for 3+ days
      Toggle: OFF (grey)
      Helper (12px, muted): "A gentle nudge to keep momentum"

  GROUP 2 — WEEKLY INSIGHTS:
    Label: "Weekly Insights" (14px, bold)

    Weekly progress summary email
      Toggle: ON
      Helper: "Every Monday — overview of the past week"

  GROUP 3 — MILESTONES:
    Label: "Milestones & Achievements" (14px, bold)

    Milestone achievements
      Toggle: ON
      Helper: "When a child reaches 50% or 100% of their path"

  GROUP 4 — ACCOUNT:
    Label: "Account & Billing" (14px, bold)

    Trial expiry reminders
      Toggle: ON
      Helper: "Sent on day 5–6 of your free trial"
      Note: this toggle cannot be turned OFF during active trial
        Show lock icon 🔒 when trial is active
        Tooltip: "Trial reminders are always sent during your trial"


━━━ TAB 4 — PASSWORD & SECURITY ━━━

  WHITE CARD · 16px radius

  SECTION LABEL: "PASSWORD & SECURITY" (small-caps, muted)

  ── FOR EMAIL/PASSWORD ACCOUNTS ──

  Change Password sub-section:

    Current Password *
      Password input · show/hide toggle

    New Password *
      Password input · show/hide toggle
      Strength indicator (4-segment bar, same as P-03)

    Confirm New Password *
      Password input · show/hide toggle
      Inline validation: ✓ Passwords match / ✗ Don't match

    [Update Password] primary indigo · 48px

  ── FOR GOOGLE OAUTH ACCOUNTS ──

  Replace the form with:
    Google-G icon (32px) + text (16px, #475569):
      "Your account is secured by Google."
    Sub-text (14px, muted):
      "Password management is handled through your Google account.
       Visit myaccount.google.com to update your security settings."
    [Open Google Account Settings ↗] — secondary outlined · 48px

  ── SESSION MANAGEMENT (both account types) ──

  Section label: "ACTIVE SESSIONS" (small-caps, muted)

  Single active session row:
    Browser icon · "Chrome on macOS — London, UK"
    "Current session" — emerald badge
    [Sign out all other sessions] — ghost, red text · 13px

  Note: Shown as informational at MVP.
  Multi-session management is a future enhancement.


━━━ TAB 5 — DATA & PRIVACY ━━━
  — P0 requirement — F-046 GDPR AC —

  WHITE CARD · 16px radius

  SECTION LABEL: "DATA & PRIVACY" (small-caps, muted)

  ── GDPR DATA EXPORT ──

  Sub-section title (16px, bold): "Download Your Data"
  Body (14px, #475569):
    "Download a complete copy of your account data
     including your profile, children's profiles, test history,
     and learning progress. Exported as a JSON file."

  [⬇ Download My Data] secondary outlined · 48px
  Helper below (12px, muted):
    "Your download will be ready within a few minutes.
     We'll email you a link to sarah.thompson@gmail.com."

  ── ACCOUNT DELETION ──

  Divider line · generous spacing above

  Sub-section title (16px, bold, #EF4444): "Delete Account"
  Body (14px, #475569):
    "Permanently delete your Kyros account and all associated data.
     Your account will be deactivated immediately and all data
     will be permanently deleted after 30 days."
  Warning list (13px, #EF4444, red bullet points):
    • Your active subscription will be cancelled
    • All children's profiles and progress will be archived
    • Downloaded data will remain with you
    • This action cannot be reversed after 30 days

  [Delete My Account] ghost · red border · red text · 48px
    — Ghost style, not solid red — serious but not alarming —

  ── ACCOUNT DELETION MODAL ──
  — Triggered by [Delete My Account] —

  Backdrop: rgba(0,0,0,0.45)
  Card: white · 16px radius · max-width 520px · centred

  Icon: red warning circle (32px)
  H3 (20px): "Delete your Kyros account?"
  Body (15px, #475569):
    "This will immediately deactivate your account.
     All data will be permanently deleted after 30 days.
     Your subscription will be cancelled with no refund
     for the remaining billing period."
  Input confirmation:
    Label: "Type DELETE to confirm"
    Text input · placeholder "DELETE"
    [Delete My Account] solid red button activates only
    when input matches "DELETE" exactly (case-sensitive)
  Footer:
    [Cancel] ghost (left) · [Delete My Account] solid red (right)


━━━ DESIGN NOTES ━━━

SIDEBAR TABS (5 total):
  The ChatGPT prompt had 4 tabs. Tab 5 "Data & Privacy" is
  a P0 F-046 requirement. It cannot be omitted or moved to
  a settings section within another tab — it must be its own
  clearly labelled destination. Parents in the UK expect GDPR
  controls to be findable.

PHOTO UPLOAD (Tab 1):
  Fully supported per platform decision (not coming soon).
  Design with active Change Photo + Remove Photo controls.
  Crop/preview modal is part of the flow per F-041 spec.
  Circular crop frame matches how avatars are displayed
  throughout the platform.

EMAIL FIELD (Tab 1):
  Two distinct states are required — Google OAuth vs email/password.
  The read-only state with Google badge prevents confusion.
  The editable state with verification flow prevents security risks.
  Never show both states simultaneously.

PHONE FIELD:
  Removed. Not in F-046 AC. GDPR data minimisation principle
  (explicitly in codebase) prohibits collecting data without
  a defined purpose. Phone number has no spec'd use case at MVP.

ARCHIVE vs DELETE (Tab 2 child list):
  F-046 specifies 30-day soft delete. The UI word is "Archive"
  not "Delete" — this is intentional. The modal explains the
  30-day window and uses "Archive" throughout. The data-clearing
  timeline is stated clearly so parents are not surprised later.

NOTIFICATIONS — MISSING TOGGLES ADDED (Tab 3):
  Milestone achievements and trial expiry reminders were absent
  from the ChatGPT prompt but are explicitly in F-046 and F-036 AC.
  Trial expiry toggle is locked ON during an active trial — parents
  cannot disable trial reminders while their trial is running.

ACCOUNT DELETION — INPUT CONFIRMATION (Tab 5):
  The "Type DELETE" pattern is stronger protection than a checkbox
  for a fully destructive action. It forces deliberate intent.
  The button only activates on exact case-sensitive match.
  This matches F-046 AC: "confirmation required."

MOBILE ADAPTATION:
  Sidebar becomes segmented tabs (horizontal scroll) or a
  dropdown selector below the page title.
  Child rows stack vertically — action buttons collapse into
  an overflow ⋯ menu per row.
  Sticky save bar remains full-width at bottom.
  Archive and deletion modals are full-screen bottom sheets.
  Data & Privacy tab scrolls normally — no special treatment.