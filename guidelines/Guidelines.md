# 11+ Mock Test & Practice Platform — Figma Make Design Guidelines
**Version:** 1.0  
**Theme:** Dual-Mode Split  
**Canvas:** Desktop-first, 1280px wide  
**Audience:** British parents (Mode A) and children aged 8–11 (Mode B)

> **How to use:** Paste this entire file as the first message in every Figma Make session before running any screen prompt. Each screen prompt will then refer to sections here by name (e.g. "→ See SHARED COLOURS", "→ Apply MODE A").

---

## 1. SHARED BRAND

One brand. Two personalities. The indigo `#4F46E5` is the single visual thread connecting both experiences.

| Token | Value | Usage |
|---|---|---|
| Brand indigo | `#4F46E5` | Primary buttons, links, active states, highlights |
| Success / complete | `#10B981` | Completed topics, passed tests, correct answers |
| Amber / streak | `#F59E0B` | Streak badges, warnings, "needs practice" |
| Cyan / info | `#06B6D4` | Non-Verbal Reasoning subject, info highlights |
| Danger / weak | `#EF4444` | Weak topics, incorrect answers, error states |

---

## 2. TYPOGRAPHY

**Font family:** A geometric sans-serif with personality. Use **DM Sans** or **Plus Jakarta Sans**. Do not use Inter, Roboto, or system fonts.

| Element | Size | Weight | Usage |
|---|---|---|---|
| H1 | 48px | 700 | Page heroes, major headings |
| H2 | 36px | 700 | Page titles, section headers |
| H3 | 24px | 600 | Card titles, sub-section headers |
| Body large | 18px | 400 | Student-facing question text (minimum) |
| Body | 16px | 400 | Standard body copy |
| Body small | 14px | 400 | Secondary text, helpers |
| Label / caption | 12px | 500 | Tags, metadata, small-caps labels |

**Student screens only:** Minimum body size is 18px. Children aged 8–11 need larger, clearer text.

---

## 3. SPACING & LAYOUT

| Token | Value |
|---|---|
| Canvas width | 1280px |
| Content max-width | 1184px (48px margin each side) |
| Grid | 12 columns, 24px gutters |
| Header height | 72px (sticky on all screens) |
| Base spacing unit | 8px |
| Card padding | 24px |
| Section gap | 48px |
| Element gap | 16px |

**Border radius:**
- Cards: `12px`
- Inputs: `8px`
- Buttons: `8px` (primary), `24px` (pill badges/tags)
- Topic grid cells: `10px`
- Modal/overlay: `16px`

**Shadows:**
- Card default: `0 2px 8px rgba(0,0,0,0.06)`
- Card hover: `0 4px 16px rgba(0,0,0,0.10)`
- Modal: `0 8px 32px rgba(0,0,0,0.16)`

---

## 4. MODE A — PARENT INTERFACE

**Applies to:** P-01 Landing Page, P-02 Registration, P-03 Create Child Profile, P-04 School Selection, P-05 Parent Dashboard, P-06 Child Detail View, P-07 Account Settings, P-08 Subscription & Billing

**Character:** Professional, data-focused, trustworthy. A British parent should feel they are looking at a serious educational tool — like a well-designed fintech dashboard adapted for education. Clean white surfaces, cool-toned greys, no decorative textures.

### Colour Tokens — Mode A

| Token | Value |
|---|---|
| Page background | `#F8FAFC` |
| Card / surface | `#FFFFFF` |
| Card border | `#E2E8F0` |
| Header background | `#1E1B4B` |
| Header text | `#FFFFFF` |
| Header nav link (inactive) | `#A5B4FC` |
| Heading text | `#1E293B` |
| Body text | `#475569` |
| Muted / label text | `#94A3B8` |
| Divider | `#E2E8F0` |
| Input border (default) | `#E2E8F0` |
| Input border (focus) | `#4F46E5` |
| Progress bar track | `#E2E8F0` |
| Progress bar fill | `#4F46E5` |
| Hover row / highlight | `#EEF2FF` |
| Info tint background | `#EEF2FF` |

### Subject Colours — Mode A

| Subject | Colour | Hex |
|---|---|---|
| Maths | Indigo | `#4F46E5` |
| English | Emerald | `#10B981` |
| Verbal Reasoning | Amber | `#F59E0B` |
| Non-Verbal Reasoning | Red | `#EF4444` |

### Component Rules — Mode A

**Header (72px, sticky):**
- Background: `#1E1B4B`
- Logo + wordmark: white
- Nav links: `#A5B4FC` inactive, white active with underline
- Right slot: avatar circle + parent name + dropdown chevron

**Cards:**
- Background: `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Radius: `12px`
- Shadow: `0 2px 8px rgba(0,0,0,0.06)`
- Hover shadow: `0 4px 16px rgba(0,0,0,0.10)`
- Left accent bar variant: `4px` left border in subject colour (used on child cards)

**Data presentation:**
- Line charts: indigo line `#4F46E5` on white card
- Bar charts: subject colours per subject row
- Tables: alternating `#FFFFFF` / `#F8FAFC` rows, hover `#EEF2FF`
- Small-caps section labels: `#94A3B8`, `font-size: 12px`, `letter-spacing: 0.08em`

---

## 5. MODE B — STUDENT INTERFACE

**Applies to:** S-01 Student Login, S-02 Student Dashboard, S-03 Diagnostic Intro, S-04 Test Interface (variant — see note), S-05 Test Results, S-06 Learning Path, S-07 Topic Detail

**Character:** Warm, encouraging, action-focused. A child should feel excited and ready, not stressed or intimidated. Warm cream canvas, rounded cards, bright indigo header, generous use of the streak badge and celebratory language.

> **S-04 Test Interface exception:** Uses `#1E1B4B` navy header and `#FFFFFF` white background instead of warm cream. The test context requires maximum focus and minimum visual noise. All other Mode B rules still apply.

### Colour Tokens — Mode B

| Token | Value |
|---|---|
| Page background | `#FFFBEB` |
| Card / surface | `#FFFFFF` |
| Card border | `#E9D5FF` |
| Header background | `#4F46E5` |
| Header text | `#FFFFFF` |
| Hero topic card background | `#4F46E5` |
| Hero topic card text | `#FFFFFF` |
| Streak badge | `#F59E0B` pill, white text |
| Heading text | `#312E81` |
| Body text | `#374151` |
| Muted / helper text | `#6B7280` |
| Input border (default) | `#E9D5FF` |
| Input border (focus) | `#4F46E5` |
| Progress bar track | `#E9D5FF` |
| Progress bar fill | `#4F46E5` |
| Info tint background | `#EEF2FF` |
| Explanation block | `#EEF2FF` with indigo-tint |

### Topic Grid State Colours — Mode B

| State | Background | Border | Text | Icon |
|---|---|---|---|---|
| Completed | `#FFFFFF` | Emerald `#10B981` top-border | `#374151` | ✓ emerald |
| Current / Active | `#4F46E5` | none | `#FFFFFF` | ● white |
| Locked | `#F8FAFC` | `#D1D5DB` | `#9CA3AF` muted | 🔒 grey |

### Subject Colours — Mode B

| Subject | Colour | Hex |
|---|---|---|
| Maths | Indigo | `#4F46E5` |
| English | Emerald | `#10B981` |
| Verbal Reasoning | Amber | `#F59E0B` |
| Non-Verbal Reasoning | Cyan | `#06B6D4` |

> Note: Non-Verbal Reasoning is Red in Mode A and Cyan in Mode B. The warmer student palette uses Cyan here to avoid making any subject feel scary.

### Component Rules — Mode B

**Header (72px, sticky):**
- Background: `#4F46E5` (except S-04: `#1E1B4B`)
- Logo + wordmark: white
- Nav links: white, active = white bold with underline
- Right slot: streak badge (amber pill `🔥 N days`) + avatar circle

**Cards:**
- Background: `#FFFFFF`
- Border: `1px solid #E9D5FF`
- Radius: `14px` (slightly more rounded than Mode A)
- Shadow: `0 2px 8px rgba(0,0,0,0.06)`

**Hero topic card (S-02 only):**
- Background: `#4F46E5`
- Text: `#FFFFFF` (primary), `rgba(255,255,255,0.7)` (secondary)
- CTA button inside: `#FFFFFF` background, `#4F46E5` text
- Radius: `16px`
- This is the single most prominent element on the student dashboard

**Encouragement language patterns (built into all student screens):**
- Greetings: "Hi [Name]! 👋", "Welcome back! 👋"
- Progress: "Keep going!", "So close!", "You're improving!"
- Completion: "Excellent work! 🎉", "Topic complete! 🎉"
- Streak: "🔥 [N] days!" (amber pill, always in header)
- Results messages by score:
  - 90%+: "Excellent work! 🎉"
  - 70–89%: "Good job! 👍"
  - 50–69%: "Keep practising! 💪"
  - Below 50%: "You're learning! 🌱"

---

## 6. SHARED COMPONENTS (Both Modes)

### Buttons

| Type | Background | Text | Border | Height | Radius |
|---|---|---|---|---|---|
| Primary | `#4F46E5` | `#FFFFFF` | none | 48px | 8px |
| Primary large | `#4F46E5` | `#FFFFFF` | none | 56–64px | 10px |
| Secondary | `#FFFFFF` | `#4F46E5` | `1px #4F46E5` | 48px | 8px |
| Ghost | transparent | `#4F46E5` | none | 48px | 8px |
| Destructive | `#FFFFFF` | `#EF4444` | `1px #EF4444` | 48px | 8px |
| Disabled | `#E2E8F0` | `#94A3B8` | none | 48px | 8px |

### Input Fields

| Token | Value |
|---|---|
| Height | 48px |
| Padding | 12px 16px |
| Font size | 16px |
| Border (default) | Mode A: `#E2E8F0` / Mode B: `#E9D5FF` |
| Border (focus) | `#4F46E5` with `0 0 0 3px rgba(79,70,229,0.15)` ring |
| Border (error) | `#EF4444` |
| Border radius | 8px |
| Helper text | 12px, muted colour |
| Error text | 12px, `#EF4444` |

### Status Indicators (Both Modes)

| State | Colour | Hex | Usage |
|---|---|---|---|
| Complete / Passed | Emerald | `#10B981` | Completed topics, correct answers, paid invoices |
| Active / Current | Indigo | `#4F46E5` | Current topic, in-progress state |
| Locked | Grey | `#D1D5DB` | Locked topics, unavailable content |
| Weak / Needs work | Red | `#EF4444` | Low-scoring topics, error states |
| Average / Keep going | Amber | `#F59E0B` | Mid-range scores, warnings, streaks |

### Progress Bar

```
Track:  Mode A = #E2E8F0  |  Mode B = #E9D5FF
Fill:   #4F46E5 (both modes)
Height: 8px
Radius: 4px (fully rounded)
Always show percentage label to the right or below
```

### Badges / Pills

```
Indigo pill:  background #EEF2FF  text #4F46E5  padding 4px 10px  radius 20px
Emerald pill: background #D1FAE5  text #065F46  padding 4px 10px  radius 20px
Amber pill:   background #FEF3C7  text #92400E  padding 4px 10px  radius 20px
Red pill:     background #FEE2E2  text #991B1B  padding 4px 10px  radius 20px
Grey pill:    background #F1F5F9  text #475569  padding 4px 10px  radius 20px
```

### Navigation (Breadcrumb)

```
Format:    Parent page › Child page › Current page
Link colour:   #4F46E5
Separator:     › in muted grey #94A3B8
Current page:  #1E293B (Mode A) or #312E81 (Mode B), not a link
Font size: 14px
```

### Trial Banner (Student screens only)

```
Background: #FEF3C7 (amber-50)
Border:     1px solid #F59E0B
Text:       "You have [N] days left on your free trial. Ask a parent to subscribe to keep your progress! →"
Text colour: #92400E
Dismissible: × close right
Position:   directly below header, above page content
```

### Empty States

```
Icon:     muted grey illustration or emoji, centred, 64px
Heading:  muted #94A3B8, 18px
Message:  muted body text, 16px, centred
CTA:      primary indigo button below message
```

### Modals / Overlays

```
Backdrop:     rgba(0,0,0,0.45)
Card:         #FFFFFF, radius 16px, shadow 0 8px 32px rgba(0,0,0,0.16)
Max-width:    480px centred
Header:       H3 title, × close top-right
Body:         16px body text
Footer:       button row — primary right, ghost/cancel left
```

---

## 7. SUBJECT COLOUR REFERENCE

Quick reference for applying subject colours consistently across both modes.

| Subject | Mode A Hex | Mode B Hex | Usage |
|---|---|---|---|
| Maths | `#4F46E5` indigo | `#4F46E5` indigo | Same in both modes |
| English | `#10B981` emerald | `#10B981` emerald | Same in both modes |
| Verbal Reasoning | `#F59E0B` amber | `#F59E0B` amber | Same in both modes |
| Non-Verbal Reasoning | `#EF4444` red | `#06B6D4` cyan | **Different** — cyan in student mode |

Apply subject colours to: card left-border accents, progress bar fills, subject tab active states, chart bars, subject badge pills, and topic grid state borders.

---

## 8. SCREEN MAP

Figma Make output for each screen is saved to `src/components/figma/` and then wired up by developers into the App Router route shown in the `File path` column.

| ID | Screen Name | Mode | Header | Background | File path in `frontend/src/` |
|---|---|---|---|---|---|
| P-01 | Landing Page | A | `#1E1B4B` navy | `#F8FAFC` | `app/(marketing)/page.tsx` |
| P-02 | Parent Registration | A | Minimal | `#F8FAFC` | `app/(auth)/register/page.tsx` |
| P-03 | Create Child Profile | A | Minimal + stepper | `#F8FAFC` | `app/onboarding/create-child/page.tsx` |
| P-04 | School Selection | A | Minimal + stepper | `#F8FAFC` | `app/onboarding/select-schools/page.tsx` |
| P-05 | Parent Dashboard | A | `#1E1B4B` navy | `#F8FAFC` | `app/parent/page.tsx` |
| P-06 | Child Detail View | A | `#1E1B4B` navy | `#F8FAFC` | `app/parent/children/[childId]/page.tsx` |
| P-07 | Account Settings | A | `#1E1B4B` navy | `#F8FAFC` | `app/parent/settings/page.tsx` |
| P-08 | Subscription & Billing | A | `#1E1B4B` navy | `#F8FAFC` | `app/parent/billing/page.tsx` |
| S-01 | Student Login | B | Minimal | `#FFFBEB` | `app/(auth)/login/page.tsx` |
| S-02 | Student Dashboard | B | `#4F46E5` indigo | `#FFFBEB` | `app/student/page.tsx` |
| S-03 | Diagnostic Intro | B | Minimal + exit | `#FFFBEB` | `app/student/diagnostic/page.tsx` |
| S-04 | Test Interface | B† | `#1E1B4B` navy | `#FFFFFF` | `app/student/tests/[testId]/page.tsx` |
| S-05 | Test Results | B | `#4F46E5` indigo | `#FFFBEB` | `app/student/tests/[testId]/results/page.tsx` |
| S-06 | Learning Path | B | `#4F46E5` indigo | `#FFFBEB` | `app/student/learning-path/page.tsx` |
| S-07 | Topic Detail | B | `#4F46E5` indigo | `#FFFBEB` | `app/student/learning-path/[topicId]/page.tsx` |

† S-04 uses navy header and white background as an exception — exam focus mode.

---

---

## 9. LANDING PAGE — BRAND IDENTITY RULES

These rules apply specifically to P-01 and any future marketing pages. They supplement the Mode A tokens in §4.

### Logo & Platform Name Placeholders

The landing page is designed for white-label use. Every brand slot must look like a real design element — not a filler label.

| Element | Placeholder text | Visual treatment |
|---|---|---|
| Logo | `[ YOUR LOGO ]` | Rounded rectangle, dashed `#C7D2FE` border, `#EEF2FF` fill, 40px tall — proportioned for a real logomark |
| Platform name | `[ Platform Name ]` | Ghost text in brand font, medium weight — clearly a placeholder but positioned as if a real name lives there |
| Combined unit | Always shown together | 8px gap between logo box and wordmark, treated as one unit |
| Dark bg variant (footer, CTA band) | Inverted | Logo: `#1E293B` fill + `#4F46E5` dashed border · Name: white ghost text |

### Page Structure — 6 Sections in Order

| # | Section | Background | Purpose |
|---|---|---|---|
| 1 | Sticky header | `#1E1B4B` | Brand anchor + nav + trial CTA |
| 2 | Hero (2-column) | `#F8FAFC` | Positive emotional hook — possibility, confidence |
| 3 | School name ticker | `#1E293B` | Named-school trust signal |
| 4 | How It Works — 3 steps | `#F8FAFC` | System explanation, light copy |
| 5 | Testimonials | `#EEF2FF` | Social proof — short quotes, named schools |
| 6 | Pricing | `#F8FAFC` | 3 tiers, quarterly highlighted |
| — | Footer | `#0F172A` | Navigation + brand close |

### Competitive Differentiation Rules

Three things this page does that competitors (Atom Learning, Bond 11+, 11plusonlinetesting.co.uk) do not:

**1. Positive, forward-looking copy** — competitors use pressure language ("get into grammar school") or neutral functional language. This page leads with possibility and confidence: "Give your child the confidence to shine." No fear, no stress language anywhere on the page.

**2. Named-school trust signals** — competitors use generic social proof ("350,000+ families", Trustpilot stars). This page names real grammar schools in the ticker and inside testimonial pills. Seeing their local school's name converts better than any number.

**3. Brand Hero Image not a screenshot** — competitors show flat product screenshots. The hero right column is a layered, warm composition using Mode B colours — showing parents what their child's experience looks and feels like, not what the admin UI looks like.

### Hero Right Column — Brand Hero Image

The single most important design element on the page. Give it full visual weight.

- NOT a flat dashboard screenshot
- IS a warm, rounded panel on `#FFFBEB` cream background containing 3 floating UI fragment cards at staggered positions — score card (emerald), progress pill (indigo), streak badge (amber) — over a soft upward progress arc
- Uses Mode B student colours (`#FFFBEB`, `#4F46E5`, `#10B981`, `#F59E0B`) bleeding intentionally into the Mode A page
- Generous whitespace inside the panel — nothing crammed
- Must feel ownable and recognisable at thumbnail scale

### Testimonial Rules — P-01 Only

Every testimonial card: one sentence quote · parent name + initial + town · emerald pill with named grammar school. Short quotes only — the school pill does the credibility work.

### Copy Rules — P-01 Only

| Element | Rule |
|---|---|
| H1 | Max 6 words across 3 short lines. Positive, forward-looking. No fear or stress words. |
| Hero subheading | 2 lines maximum. System benefit, not feature list. |
| Section H2s | Max 7 words. Benefit-led, confident. |
| Step / feature body | 2 lines maximum. One idea per block. |
| Testimonial quotes | 1 sentence. Specific result mentioned. |
| CTA buttons | Max 6 words. No exclamation marks. |

**Whitespace is the design.** Every section has one job. Resist adding more copy to fill space — empty space signals premium.

---

## 10. CONTENT & TONE RULES

### Platform naming
- Full name: **Kyros** (this is the real platform name confirmed in the codebase)
- Short name in UI: **Kyros**
- Tagline: "Your journey to 11+ success"
- Logo treatment: Kyros wordmark + logomark (placeholder: rounded square with dashed `#C7D2FE` border while the real asset is finalised)
- In P-01 landing page: use `Kyros` as the wordmark text — the visual logo slot remains a swap-ready placeholder rectangle

### Exam formats supported (use in copy exactly as written)
- GL Assessment
- CEM
- Kent Test
- ISEB

### Subjects (use exactly as written)
- Maths
- English
- Verbal Reasoning
- Non-Verbal Reasoning

### Sample data (use consistently across all screens)
- Parent name: Sarah Thompson
- Child 1: Emma Thompson, Year 5, Kent, target schools: Tonbridge Grammar School + Invicta Grammar School
- Child 2: Sophie Thompson, Year 4, Kent (no diagnostic yet)
- Emma's current Maths topic: Topic 8 — Basic Algebra
- Emma's Maths progress: 7/20 topics, 35% complete, avg 78%
- Emma's streak: 🔥 5 days (6 after completing Topic 8 results)
- Subscription: Annual Plan, £79.99/year, renews 15 January 2026

### Writing style (student screens)
- First name always: "Hi Emma!", never "Hi Student"
- Short sentences: children shouldn't have to parse long copy
- Encouraging, never pressuring: "do your best" not "you must score 85%"
- British English spelling throughout: practise (v), practice (n), personalised, organised, colour, programme

### Writing style (parent screens)
- Professional but warm: not corporate, not childish
- Data-confident: show numbers, percentages, trends
- British English: emphasise, recognise, organised, summarise

---

## 11. ACCESSIBILITY

- Minimum body text: 16px (parent) · 18px (student)
- All interactive elements: 48px minimum touch/click target
- Colour contrast: WCAG AA compliant — all text meets 4.5:1 on its background
- Focus states: visible 2px `#4F46E5` outline ring on all interactive elements
- Error states: never colour-only — always accompany with text or icon
- Keyboard navigation: all primary flows reachable without mouse

---

## 12. FRONTEND CODE STRUCTURE

Figma Make generates the visual layout. Developers integrate it into the Next.js codebase. These rules ensure the two stay aligned.

### Tech stack (do not deviate)

| Layer | Technology |
|---|---|
| Framework | Next.js 15 — App Router |
| Language | TypeScript 5.6+ — strict mode, no `any` |
| Styling | TailwindCSS 4 + ShadCN UI (Radix UI primitives) |
| State — server | TanStack Query (`@tanstack/react-query`) |
| State — client | Zustand |
| Forms | React Hook Form + Zod |
| API client | hey-api generated client (`src/lib/api/generated/`) — never raw `fetch` |
| Icons | Lucide React (`lucide-react`) |
| Charts | Recharts |
| i18n | `t()` helper — `src/i18n/en.ts` — no inline strings |

### Directory structure

```
frontend/
└── src/
    ├── app/                        ← Next.js App Router — page files only
    │   ├── (auth)/                 ← Login, register (route group, no URL segment)
    │   ├── (marketing)/            ← Landing page, about, pricing (public)
    │   ├── dashboard/              ← Shared dashboard shell + layout
    │   ├── parent/                 ← Parent-specific pages
    │   │   ├── page.tsx            ← P-05 Parent Dashboard
    │   │   ├── children/[childId]/ ← P-06 Child Detail
    │   │   ├── settings/           ← P-07 Account Settings
    │   │   └── billing/            ← P-08 Billing
    │   ├── student/                ← Student-specific pages
    │   │   ├── page.tsx            ← S-02 Student Dashboard
    │   │   ├── diagnostic/         ← S-03 Diagnostic Intro
    │   │   ├── learning-path/      ← S-06 Learning Path
    │   │   │   └── [topicId]/      ← S-07 Topic Detail
    │   │   └── tests/[testId]/     ← S-04 Test Interface
    │   │       └── results/        ← S-05 Test Results
    │   └── onboarding/             ← P-03 Create Child, P-04 School Selection
    │
    ├── components/
    │   ├── ui/                     ← ShadCN base components — READ ONLY, never edit
    │   └── figma/                  ← ★ FIGMA MAKE OUTPUT GOES HERE ★
    │
    ├── features/                   ← Smart components that own data-fetching
    │   ├── auth/                   ← Auth forms, hooks, API calls
    │   ├── Dashboard.tsx
    │   ├── MockExams.tsx
    │   └── Topics.tsx
    │
    ├── stores/                     ← Zustand global state slices only
    ├── lib/
    │   └── api/generated/          ← Auto-generated API client — never edit manually
    ├── i18n/
    │   ├── en.ts                   ← All UI strings live here
    │   └── index.ts                ← t() helper — import this in every component
    └── styles/
        └── globals.css             ← CSS variables + Tailwind base
```

### Component placement rules

| Component type | Where it lives | Rule |
|---|---|---|
| Figma Make layouts | `src/components/figma/` | Drop Figma output here directly |
| ShadCN base (Button, Card, Input…) | `src/components/ui/` | **Read-only.** Never edit. Use as-is. |
| Smart components (own API calls) | `src/features/` | Wire up API + state here, not in figma/ |
| Page files | `src/app/**/page.tsx` | Import from figma/ or features/, thin wrapper only |
| Global state | `src/stores/` | Zustand slices only — no component logic |
| Hooks | co-located in `src/features/<feature>/` | Prefix with `use` — e.g. `useTopics.ts` |

### File naming conventions

| Type | Convention | Example |
|---|---|---|
| React components | PascalCase | `StudentDashboard.tsx`, `TopicCard.tsx` |
| Custom hooks | camelCase, `use` prefix | `useTopics.ts`, `useAuthStore.ts` |
| Utility functions | camelCase | `formatScore.ts`, `dateHelpers.ts` |
| Page files | always `page.tsx` | `app/student/page.tsx` |
| Route folders | kebab-case | `learning-path/`, `create-child/` |

### Server vs Client components

Default to **Server Components** (no directive needed). Add `'use client'` only when the component needs:
- `useState` / `useEffect` or other hooks
- Event handlers (`onClick`, `onChange`)
- Browser APIs
- TanStack Query hooks (`useQuery`, `useMutation`)

```typescript
// Server Component (default) — good for Figma Make layout shells
export default function StudentDashboard() {
  return <div className="...">...</div>
}

// Client Component — good for interactive parts wired in features/
'use client'
export function TopicGrid({ topics }: TopicGridProps) {
  const [selected, setSelected] = useState<string | null>(null)
  ...
}
```

### TypeScript rules

- No `any`. Strict mode is enforced — CI fails on type errors.
- All props must have explicit interfaces.
- All API responses typed via generated client — never cast to `unknown`.

```typescript
// CORRECT
interface TopicCardProps {
  topic: Topic
  onSelect: (topicId: string) => void
  isLocked: boolean
}

// WRONG
interface TopicCardProps {
  topic: any
  onSelect: Function
}
```

---

## 13. i18n — STRING CATALOGUE RULES

### The rule

**No inline strings in JSX. Ever.**

Every piece of visible text — headings, labels, button text, placeholders, error messages, helper text — must go through the `t()` helper.

```typescript
// CORRECT
import { t } from '@/i18n'
<h1>{t('landing.heroHeadline')}</h1>
<button>{t('landing.heroCta')}</button>

// WRONG — will be caught in code review
<h1>Give your child the confidence to shine</h1>
<button>Start Your Free 7-Day Trial</button>
```

### How to add new strings

1. Open `frontend/src/i18n/en.ts`
2. Find or create the appropriate namespace object
3. Add your key in camelCase
4. Use `t('namespace.key')` in the component

Interpolation for dynamic values:
```typescript
t('landing.tickerLabel', { count: 288 })
// en.ts: tickerLabel: 'Families preparing for {count}+ schools'
```

### Existing namespaces in `en.ts`

| Namespace | Screens it covers |
|---|---|
| `welcome` | Auth layout, login page student flow |
| `auth` | Parent registration, parent login |
| `parentDashboard` | P-05 Parent Dashboard |
| `omrExam` | OMR exam offline mode |
| `mockExam` | Online mock exam interface |
| `common` | Shared across all screens (Back, Save, Cancel…) |

### `landing` namespace — add to `en.ts`

This namespace covers all strings in **P-01 Landing Page**. Add the entire block to `en.ts` alongside the existing namespaces.

```typescript
// Add to frontend/src/i18n/en.ts

landing: {
  // Header
  navHowItWorks: 'How It Works',
  navSchools: 'Schools',
  navPricing: 'Pricing',
  navLogin: 'Log in',
  navCta: 'Start Free Trial',

  // Hero
  heroEyebrow: 'GL Assessment · CEM · Kent Test · ISEB',
  heroHeadline: 'Give your child the confidence to shine',
  heroSubheading: 'Adaptive practice and a clear path to exam day — built around your child from the very first question.',
  heroCta: 'Start Your Free 7-Day Trial',
  heroMicroCopy: 'No card required · Cancel anytime',
  heroTrustQuestions: '8,863 questions',
  heroTrustSchools: '288 grammar schools',
  heroTrustResults: 'Instant results',

  // Brand hero image captions (floating UI cards)
  heroCardScore: 'Topic 7 Complete ✓ — 92%',
  heroCardProgress: 'Your learning path — 7 of 20 topics',
  heroCardStreak: '12-day streak — keep it up!',
  heroCardGoal: 'Exam ready',

  // School ticker
  tickerPrefix: 'Families preparing for:',
  tickerMore: 'and {count} more →',

  // How It Works
  howItWorksTitle: 'A clear path from day one to exam day',
  howItWorksSubtitle: 'Three stages. Adapts to your child. Always the right next step.',
  step1Label: 'Discover',
  step1Heading: 'Find the starting point',
  step1Body: 'A 40-question diagnostic across all four subjects. Instant results. Your child's personalised path generated immediately.',
  step2Label: 'Adapt',
  step2Heading: 'Practice that adjusts to them',
  step2Body: 'Questions adapt to your child's level. Topics unlock as they master each one. No skipping ahead, no falling behind.',
  step3Label: 'Succeed',
  step3Heading: 'Arrive at exam day ready',
  step3Body: 'Full mock exams in GL Assessment, CEM, Kent Test and ISEB formats. Timed, marked, and explained — just like the real thing.',
  pullQuote: 'She started enjoying practice. That told me everything.',
  pullQuoteAttribution: '— Parent, Year 5, Kent',

  // Feature Spotlight
  spotlightLabel: 'Adaptive Learning Path',
  spotlightHeadline: 'Always the right question at the right time',
  spotlightBody: 'Our platform continuously adjusts to your child's performance. Topics are sequenced in the right order. Each question is calibrated to their current level. Progress is tracked automatically — so you always know exactly where they stand.',
  spotlightFeature1: '20 structured topics per subject, unlocking progressively',
  spotlightFeature2: 'Questions adapt to your child's level in real time',
  spotlightFeature3: 'Weak areas surfaced and prioritised automatically',
  spotlightFeature4: 'Parent dashboard shows progress across all four subjects',
  spotlightLink: 'See the full learning path →',
  spotlightAdaptiveInsight: 'Based on Emma's results, we've adjusted Topic 8 to focus on word problems — her biggest growth opportunity.',

  // Testimonials
  testimonialsTitle: 'Families who made it',
  testimonial1Quote: 'Real progress, week on week. She got into Invicta.',
  testimonial1Author: 'Sarah M. — Maidstone, Kent',
  testimonial1School: 'Invicta Grammar ✓',
  testimonial2Quote: 'The path made it clear exactly what he needed. He got into Judd.',
  testimonial2Author: 'James T. — Tonbridge, Kent',
  testimonial2School: 'The Judd School ✓',
  testimonial3Quote: 'Her confidence went through the roof. King Edward's — first choice.',
  testimonial3Author: 'Priya K. — Birmingham',
  testimonial3School: 'King Edward's ✓',
  testimonialsRating: '4.9 / 5 from 1,200+ parents',

  // Pricing
  pricingTitle: 'Simple pricing. Everything included.',
  pricingSubtitle: 'Every subject · every topic · every mock exam · one plan.',
  pricingMonthlyLabel: 'Monthly',
  pricingMonthlyPrice: '£9.99',
  pricingMonthlyPeriod: '/month',
  pricingQuarterlyLabel: 'Quarterly',
  pricingQuarterlyPrice: '£24.99',
  pricingQuarterlyPeriod: '/quarter',
  pricingQuarterlyBadge: 'Most Popular',
  pricingQuarterlySave: 'Save £5',
  pricingAnnualLabel: 'Annual',
  pricingAnnualPrice: '£79.99',
  pricingAnnualPeriod: '/year',
  pricingAnnualMonthly: '£6.67/month',
  pricingAnnualSave: 'Save £40',
  pricingCta: 'Start Free Trial',
  pricingFeature1: 'Adaptive learning path — all 4 subjects',
  pricingFeature2: 'Personalised diagnostic from day one',
  pricingFeature3: 'Unlimited mock exams (GL · CEM · Kent · ISEB)',
  pricingFeature4: 'Parent progress dashboard',
  pricingNote: '7-day free trial · No card required · Cancel anytime · Secure by Stripe',

  // Footer
  footerTagline: 'The adaptive path to grammar school success.',
  footerColPlatform: 'Platform',
  footerLinkHowItWorks: 'How It Works',
  footerLinkLearningPath: 'Learning Path',
  footerLinkMockExams: 'Mock Exams',
  footerLinkPricing: 'Pricing',
  footerColSchools: 'Schools',
  footerLinkBrowseSchools: 'Browse Schools',
  footerLinkGL: 'GL Assessment',
  footerLinkCEM: 'CEM',
  footerLinkKent: 'Kent Test',
  footerLinkISEB: 'ISEB',
  footerColSupport: 'Support',
  footerLinkHelp: 'Help',
  footerLinkContact: 'Contact',
  footerLinkPrivacy: 'Privacy',
  footerLinkTerms: 'Terms',
  footerCta: 'Start Free Trial',
  footerCtaNote: 'No card required',
  footerCopyright: '© 2024 Kyros. All rights reserved.',
},
```

### Usage example in a component

```typescript
// src/components/figma/LandingHero.tsx
import { t } from '@/i18n'

export function LandingHero() {
  return (
    <section>
      <p className="text-sm uppercase tracking-widest text-primary/70">
        {t('landing.heroEyebrow')}
      </p>
      <h1 className="text-5xl font-bold text-foreground">
        {t('landing.heroHeadline')}
      </h1>
      <p className="text-lg text-muted-foreground">
        {t('landing.heroSubheading')}
      </p>
      <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg">
        {t('landing.heroCta')}
      </button>
    </section>
  )
}
```