# Mobile Adaptation Plan

## Shared foundation

**Create `src/app/components/hooks/useIsMobile.ts`**  
A single hook used by every screen:
```ts
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}
```

**Shared mobile header pattern** (hamburger nav)  
All dashboard screens (ChildDetailView, AccountSettings, SubscriptionBilling) share the same sticky `#1E1B4B` header with a nav that needs to collapse. Each will use the hook + a local `menuOpen` state to toggle a full-width dropdown from the header.

---

## Screen-by-screen changes

### 1. LoginPage & RegisterPage

**Problem:** Fixed `width: '44%'` left panel + `flex: 1` right panel breaks on narrow screens — left panel squashes the form illegibly.

**Fix:**
- Import `useIsMobile`. When `isMobile`:
  - Left panel: `display: 'none'` — hidden entirely
  - Right panel: full-width, add a minimal logo+wordmark at the top of the form card (same `#1E1B4B` mark, white bg row)
  - Outer wrapper padding reduced: `padding: '32px 20px'`
- Desktop behaviour unchanged.

---

### 2. LandingPage

**Problem:** Multiple fixed multi-column layouts that collapse badly on narrow viewports.

**Fix — section by section:**

| Section | Desktop | Mobile |
|---|---|---|
| Header nav | Inline links + CTA | Hamburger → slide-down menu |
| Hero | 2-column 50/50 | Single column; illustration (PathVisualization) hidden |
| How It Works | 3-column step cards | Vertical stack, full-width cards |
| Testimonials | 3-column cards | Single column stack |
| Pricing | 3-column cards | Vertical stack, Annual card first |
| Footer | 4-column grid | 2-column then 1-column stack |

All section padding reduced from `80px` to `48px` vertical on mobile.

---

### 3. ChildDetailView

**Problem:** Fixed `display: flex, justifyContent: 'space-between'` header; fixed multi-column subject grid; `repeat(5, 1fr)` topic grid.

**Fix:**
- **Header:** Logo + hamburger button on mobile; nav links collapse into a dropdown drawer
- **Profile card:** `display: 'flex', gap: 20` row → `flexDirection: 'column'` with avatar centred; action buttons stack full-width
- **Subject performance grid:** Any fixed-column grid → `repeat(2, 1fr)`
- **Topic grid:** `repeat(5, 1fr)` → `repeat(2, 1fr)` on mobile
- **Stats rows:** Multi-column stat strips → `repeat(2, 1fr)` or `repeat(3, 1fr)` (already small enough)
- **Breadcrumb:** Remains single line (already fine)

---

### 4. AccountSettings

**Problem:** Fixed `display: 'flex'` sidebar + content area; horizontal tab list overflows on narrow screens.

**Fix:**
- **Header:** Same hamburger pattern as above
- **Sidebar + content:** `display: flex, gap: 32, alignItems: 'flex-start'` → `flexDirection: 'column'` on mobile. Sidebar becomes a tab strip at the top.
- **Tab strip (mobile):** `overflowX: 'auto', whiteSpace: 'nowrap'` horizontal scroll rail — no hamburger, just scrollable tabs. Active tab has indigo underline.
- **Children grid (2-col):** → single column on mobile
- **Form rows:** Already single-column — no change needed
- **Danger zone card:** Full-width, already works

---

### 5. SubscriptionBilling

**Problem:** Fixed `gridTemplateColumns: '1fr 340px'` main layout; `repeat(3, 1fr)` plans grid; billing table overflows.

**Fix:**
- **Header:** Same hamburger pattern
- **Main grid:** `1fr 340px` → single column. Payment method card and support footer move below the main left column content (plans card and billing history)
- **Available Plans grid:** `repeat(3, 1fr)` → single column, Annual card rendered first
- **Billing table:** On mobile, each row becomes an accordion card — tap to expand shows Description, Amount, Status, Download link. Uses a `expandedRow` state.
- **Sticky bottom bar (mobile only):** Fixed `position: fixed, bottom: 0` bar showing current plan name + `[Change Plan]` CTA, `height: 64px`, `#1E1B4B` background. Disappears on desktop.
- **Cancel modal:** On mobile, becomes a full-screen bottom sheet (`position: fixed, bottom: 0, borderRadius: '16px 16px 0 0', maxHeight: '90vh', overflowY: 'auto'`).

---

## Implementation order

1. Create `useIsMobile` hook
2. LoginPage
3. RegisterPage
4. LandingPage
5. ChildDetailView
6. AccountSettings
7. SubscriptionBilling
