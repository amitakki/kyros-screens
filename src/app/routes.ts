import { createBrowserRouter } from "react-router";
import { RegisterPage } from "../features/auth/pages/RegisterPage";
import { LoginPage } from "../features/auth/pages/LoginPage";
import { CreateChildProfilePage as CreateChildProfile } from "../features/onboarding/pages/CreateChildProfilePage";
import { AccountSettingsPage as AccountSettings } from "../features/settings/pages/AccountSettingsPage";
import { SchoolSelectionPage } from "../features/onboarding/pages/SchoolSelectionPage";
import { ChildDetailPage } from "../features/dashboard/pages/ChildDetailPage";
import { ParentDashboardPage } from "../features/dashboard/pages/ParentDashboardPage";
import { LandingPage } from "../features/landing-page/pages/LandingPage";
import { SubscriptionBilling } from "../features/subscription/pages/SubscriptionBillingPage";
import { ROUTES } from "../shared/constants/routes";
import { RootLayout } from "./RootLayout";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      {
        path: ROUTES.home,
        Component: LandingPage,
      },
      {
        path: ROUTES.register,
        Component: RegisterPage,
      },
      {
        path: ROUTES.login,
        Component: LoginPage,
      },
      {
        path: ROUTES.onboardingCreateChild,
        Component: CreateChildProfile,
      },
      {
        path: ROUTES.onboardingSelectSchools,
        Component: SchoolSelectionPage,
      },
      {
        path: ROUTES.parentDashboard,
        Component: ParentDashboardPage,
      },
      {
        path: ROUTES.childDetail(":childId"),
        Component: ChildDetailPage,
      },
      {
        path: ROUTES.settings,
        Component: AccountSettings,
      },
      {
        path: ROUTES.billing,
        Component: SubscriptionBilling,
      },
    ],
  },
]);
