export const ROUTES = {
  home: "/",
  register: "/register",
  login: "/login",
  onboardingCreateChild: "/onboarding/create-child",
  onboardingSelectSchools: "/onboarding/select-schools",
  parentDashboard: "/parent",
  settings: "/settings",
  billing: "/parent/billing",
  childDetail: (childId: string) => `/parent/children/${childId}`,
} as const;
