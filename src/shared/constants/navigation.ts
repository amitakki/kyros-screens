import { ROUTES } from "./routes";

export const PRIMARY_NAV_ITEMS = [
  { label: "Dashboard", path: ROUTES.parentDashboard },
  { label: "Settings", path: ROUTES.settings },
  { label: "Billing", path: ROUTES.billing },
] as const;

export const USER_MENU_ITEMS = [
  { label: "Parent Dashboard", path: ROUTES.parentDashboard },
  { label: "Account Settings", path: ROUTES.settings },
  { label: "Subscription & Billing", path: ROUTES.billing },
  { label: "Log out", path: ROUTES.login, tone: "danger" as const },
] as const;
