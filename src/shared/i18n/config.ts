import i18next from 'i18next';
import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enSettings from './locales/en/settings.json';
import enDashboard from './locales/en/dashboard.json';
import enOnboarding from './locales/en/onboarding.json';
import enSubscription from './locales/en/subscription.json';
import enLanding from './locales/en/landing.json';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      settings: enSettings,
      dashboard: enDashboard,
      onboarding: enOnboarding,
      subscription: enSubscription,
      landing: enLanding,
    },
  },
  // Synchronous init — resources are bundled, no async plugins
  initImmediate: false,
  interpolation: { escapeValue: false },
});

export default i18next;
