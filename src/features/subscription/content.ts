import i18next from '../../shared/i18n/config';
import type { StatusBadgeTone } from '../../shared/components/feedback/StatusBadge';

const t = (key: string) => i18next.t(key, { ns: 'subscription' });
const arr = <T>(key: string) => i18next.t(key, { ns: 'subscription', returnObjects: true }) as T;

type PlanStrings = {
  badge: string;
  price: string;
  period: string;
  meta: string | null;
  savings?: string;
  features: string[];
  cta: string;
  helper: string;
};

// Non-translatable design tokens — badge tones, colours, layout flags
const planDesign = [
  {
    id: 'monthly',
    badgeTone: 'neutral' as StatusBadgeTone | 'neutral',
    savings: null as string | null,
    highlight: false,
    ctaPrimary: false,
    savingBadgeBg: '',
    savingBadgeColor: '',
    priceHighlight: '',
    priceHighlightColor: '',
  },
  {
    id: 'quarterly',
    badgeTone: 'warning' as StatusBadgeTone,
    savings: null as string | null,
    highlight: false,
    ctaPrimary: false,
    savingBadgeBg: 'var(--warning-subtle)',
    savingBadgeColor: 'var(--warning-foreground)',
    priceHighlight: '',
    priceHighlightColor: '',
  },
  {
    id: 'annual',
    badgeTone: 'brand' as StatusBadgeTone,
    savings: null as string | null,
    highlight: false,
    ctaPrimary: false,
    savingBadgeBg: 'var(--success-subtle)',
    savingBadgeColor: 'var(--success-dark)',
    priceHighlight: '',
    priceHighlightColor: 'var(--success)',
  },
] as const;

export const subscriptionBillingContent = {
  title: t('title'),
  description: t('description'),
  supportPrompt: t('supportPrompt'),
  supportCta: t('supportCta'),
  planStateCards: {
    active: {
      title: t('planStateCards.active.title'),
      badge: t('planStateCards.active.badge'),
      price: t('planStateCards.active.price'),
      period: t('planStateCards.active.period'),
      savings: t('planStateCards.active.savings'),
      renewsOn: t('planStateCards.active.renewsOn'),
      nextPayment: t('planStateCards.active.nextPayment'),
      profileUsage: t('planStateCards.active.profileUsage'),
      profileUsagePercent: 66.6, // non-translatable: mock numeric data
      features: arr<string[]>('planStateCards.active.features'),
      changePlanCta: t('planStateCards.active.changePlanCta'),
      cancelCta: t('planStateCards.active.cancelCta'),
      helper: t('planStateCards.active.helper'),
    },
    trial: {
      title: t('planStateCards.trial.title'),
      badge: t('planStateCards.trial.badge'),
      remainingDays: t('planStateCards.trial.remainingDays'),
      remainingLabel: t('planStateCards.trial.remainingLabel'),
      progressPercent: 57, // non-translatable: mock numeric data
      endsOn: t('planStateCards.trial.endsOn'),
      features: arr<string[]>('planStateCards.trial.features'),
      notice: t('planStateCards.trial.notice'),
      choosePlanCta: t('planStateCards.trial.choosePlanCta'),
      helper: t('planStateCards.trial.helper'),
      downgradeNotice: t('planStateCards.trial.downgradeNotice'),
    },
    cancelled: {
      title: t('planStateCards.cancelled.title'),
      badge: t('planStateCards.cancelled.badge'),
      accessUntilLabel: t('planStateCards.cancelled.accessUntilLabel'),
      accessUntilDate: t('planStateCards.cancelled.accessUntilDate'),
      helper: t('planStateCards.cancelled.helper'),
      afterTitle: t('planStateCards.cancelled.afterTitle'),
      afterItems: arr<string[]>('planStateCards.cancelled.afterItems'),
      reactivateCta: t('planStateCards.cancelled.reactivateCta'),
      reactivateHelper: t('planStateCards.cancelled.reactivateHelper'),
      reactivateLink: t('planStateCards.cancelled.reactivateLink'),
    },
    pastdue: {
      title: t('planStateCards.pastdue.title'),
      badge: t('planStateCards.pastdue.badge'),
      errorSummary: t('planStateCards.pastdue.errorSummary'),
      retryNotice: t('planStateCards.pastdue.retryNotice'),
      warning: t('planStateCards.pastdue.warning'),
      cardSummary: t('planStateCards.pastdue.cardSummary'),
      cardStatus: t('planStateCards.pastdue.cardStatus'),
      updatePaymentCta: t('planStateCards.pastdue.updatePaymentCta'),
      updateHelper: t('planStateCards.pastdue.updateHelper'),
      retrySchedule: t('planStateCards.pastdue.retrySchedule'),
      cancelNotice: t('planStateCards.pastdue.cancelNotice'),
    },
  },
  cancelModal: {
    title: t('cancelModal.title'),
    intro: t('cancelModal.intro'),
    introDetail: t('cancelModal.introDetail'),
    downgradeTitle: t('cancelModal.downgradeTitle'),
    downgradeItems: arr<string[]>('cancelModal.downgradeItems'),
    pauseCta: t('cancelModal.pauseCta'),
    feedbackLabel: t('cancelModal.feedbackLabel'),
    reasonPlaceholder: t('cancelModal.reasonPlaceholder'),
    feedbackPlaceholder: t('cancelModal.feedbackPlaceholder'),
    keepCta: t('cancelModal.keepCta'),
    cancelCta: t('cancelModal.cancelCta'),
    reasons: arr<string[]>('cancelModal.reasons'),
  },
  availablePlans: {
    title: t('availablePlans.title'),
    description: t('availablePlans.description'),
    currentPlanLabel: t('availablePlans.currentPlanLabel'),
    plans: arr<PlanStrings[]>('availablePlans.plans').map((strings, i) => ({
      ...planDesign[i],
      badge: strings.badge,
      price: strings.price,
      period: strings.period,
      // meta and savings: use JSON string when present, design null when absent
      meta: strings.meta ?? null,
      savings: strings.savings ?? null,
      features: strings.features,
      cta: strings.cta,
      helper: strings.helper,
    })),
  },
  paymentMethod: {
    title: t('paymentMethod.title'),
    emptyState: t('paymentMethod.emptyState'),
    brand: t('paymentMethod.brand'),
    cardNumber: t('paymentMethod.cardNumber'),
    expiry: t('paymentMethod.expiry'),
    status: t('paymentMethod.status'),
    securityLabel: t('paymentMethod.securityLabel'),
    addCta: t('paymentMethod.addCta'),
    updateCta: t('paymentMethod.updateCta'),
  },
  billingHistory: {
    title: t('billingHistory.title'),
    description: t('billingHistory.description'),
    columns: arr<string[]>('billingHistory.columns'),
    downloadCta: t('billingHistory.downloadCta'),
    exportCsvCta: t('billingHistory.exportCsvCta'),
    exportPdfCta: t('billingHistory.exportPdfCta'),
    rows: arr<Array<{ date: string; desc: string; amount: string; status: string }>>('billingHistory.rows'),
  },
};
