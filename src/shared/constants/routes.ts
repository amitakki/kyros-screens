export const ROUTES = {
  home: "/",
  landingV1: "/v1",
  landingV2: "/v2",
  register: "/register",
  login: "/login",
  onboardingCreateChild: "/onboarding/create-child",
  onboardingSelectSchools: "/onboarding/select-schools",
  parentDashboard: "/parent",
  settings: "/settings",
  billing: "/parent/billing",
  childDetail: (childId: string) => `/parent/children/${childId}`,
} as const;
