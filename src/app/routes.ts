import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { RegisterPage } from "./components/RegisterPage";
import { LoginPage } from "./components/LoginPage";
import { CreateChildProfile } from "./components/CreateChildProfile";
import { SchoolSelection } from "./components/SchoolSelection";
import { ParentDashboard } from "./components/ParentDashboard";
import { ChildDetailView } from "./components/ChildDetailView";
import { AccountSettings } from "./components/AccountSettings";
import { SubscriptionBilling } from "./components/SubscriptionBilling";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/onboarding/create-child",
    Component: CreateChildProfile,
  },
  {
    path: "/onboarding/select-schools",
    Component: SchoolSelection,
  },
  {
    path: "/parent",
    Component: ParentDashboard,
  },
  {
    path: "/parent/children/:childId",
    Component: ChildDetailView,
  },
  {
    path: "/settings",
    Component: AccountSettings,
  },
  {
    path: "/parent/billing",
    Component: SubscriptionBilling,
  },
]);
