import i18next from '../../shared/i18n/config';

const t = (key: string) => i18next.t(key, { ns: 'landing' });
const arr = <T>(key: string) => i18next.t(key, { ns: 'landing', returnObjects: true }) as T;

// ─── Non-translatable design tokens ────────────────────────────────────────

// Topic states for the feature-spotlight mockup grid
const topicStates: Array<'done' | 'active' | 'locked'> = [
  'done', 'done', 'done', 'done', 'done', 'done', 'done',
  'active',
  'locked', 'locked', 'locked', 'locked', 'locked', 'locked',
  'locked', 'locked', 'locked', 'locked', 'locked', 'locked',
];

// Subject chart colors (maps to semantic tokens)
const subjectColors = ['var(--brand)', 'var(--success)', 'var(--warning)', 'var(--danger)'];
const subjectPcts = [78, 85, 72, 65];

// Testimonial design — avatar initials and accent colours
const testimonialDesign = [
  { initial: 'S', color: 'var(--brand)' },
  { initial: 'J', color: 'var(--success)' },
  { initial: 'P', color: 'var(--warning)' },
];

// "Who is it for" subject accent colours
const whoSubjectColors = ['var(--brand)', 'var(--success)', 'var(--warning)', 'var(--info)'];

// "Why Kyros" icon colours and backgrounds
const whyPointDesign = [
  { iconColor: 'var(--brand)', iconBg: 'var(--brand-subtle)' },
  { iconColor: 'var(--warning)', iconBg: 'var(--warning-subtle)' },
  { iconColor: 'var(--success)', iconBg: 'var(--success-subtle)' },
];

// Pricing plan design tokens (badge colours, layout flags)
const pricingPlanDesign = [
  { savingBadgeBg: '', savingBadgeColor: '', highlight: false, ctaPrimary: false, priceHighlightColor: '' },
  { savingBadgeBg: 'var(--warning-subtle)', savingBadgeColor: 'var(--warning-foreground)', highlight: true, ctaPrimary: true, priceHighlightColor: '' },
  { savingBadgeBg: 'var(--success-subtle)', savingBadgeColor: 'var(--success-dark)', highlight: false, ctaPrimary: false, priceHighlightColor: 'var(--success)' },
];

// ─── Content object ─────────────────────────────────────────────────────────

export const landingPageContent = {
  header: {
    brandName: t('header.brandName'),
    navItems: arr<string[]>('header.navItems'),
    loginLabel: t('header.loginLabel'),
    startTrialLabel: t('header.startTrialLabel'),
    logoLabel: t('header.logoLabel'),
  },
  hero: {
    eyebrow: t('hero.eyebrow'),
    titleLines: arr<string[]>('hero.titleLines'),
    description: t('hero.description'),
    proofItems: arr<Array<{ icon: string; label: string }>>('hero.proofItems'),
    primaryCtaLabel: t('hero.primaryCtaLabel'),
    microcopy: t('hero.microcopy'),
    steps: arr<string[]>('hero.steps'),
    trustItems: arr<Array<{ icon: string; label: string }>>('hero.trustItems'),
  },
  schools: arr<string[]>('schools'),
  schoolsSection: {
    title: t('schoolsSection.title'),
    subtitle: t('schoolsSection.subtitle'),
    examBoardsLabel: t('schoolsSection.examBoardsLabel'),
    examBoards: arr<string[]>('schoolsSection.examBoards'),
    moreSchoolsLabel: t('schoolsSection.moreSchoolsLabel'),
    footerNote: t('schoolsSection.footerNote'),
  },
  faqItems: arr<Array<{ q: string; a: string }>>('faqItems'),
  tryAQuestion: {
    title: t('tryAQuestion.title'),
    description: t('tryAQuestion.description'),
    questionBadge: t('tryAQuestion.questionBadge'),
    difficultyBadge: t('tryAQuestion.difficultyBadge'),
    question: t('tryAQuestion.question'),
    submitLabel: t('tryAQuestion.submitLabel'),
    correctBadge: t('tryAQuestion.correctBadge'),
    explanationTitle: t('tryAQuestion.explanationTitle'),
    explanationSteps: arr<Array<{ label: string; text: string }>>('tryAQuestion.explanationSteps'),
    ctaLabel: t('tryAQuestion.ctaLabel'),
    ctaSubtext: t('tryAQuestion.ctaSubtext'),
    answerOptions: arr<Array<{ id: string; text: string }>>('tryAQuestion.answerOptions'),
    correctAnswer: t('tryAQuestion.correctAnswer'),
  },
  faqSection: {
    title: t('faqSection.title'),
    moreQuestionsLabel: t('faqSection.moreQuestionsLabel'),
    helpCenterLabel: t('faqSection.helpCenterLabel'),
    helpCenterHref: t('faqSection.helpCenterHref'),
  },
  outcomesStrip: {
    stats: arr<Array<{ number: string; label: string }>>('outcomesStrip.stats'),
    footnote: t('outcomesStrip.footnote'),
  },
  howItWorks: {
    title: t('howItWorks.title'),
    description: t('howItWorks.description'),
    steps: arr<Array<{ icon: 'bar-chart' | 'zap' | 'flag'; eyebrow: string; title: string; description: string; linkLabel?: string; linkHref?: string }>>('howItWorks.steps'),
    ctaLabel: t('howItWorks.ctaLabel'),
    quote: {
      body: t('howItWorks.quote.body'),
      avatarLabel: t('howItWorks.quote.avatarLabel'),
      attribution: t('howItWorks.quote.attribution'),
    },
  },
  pathVisualization: {
    pathLabel: t('pathVisualization.pathLabel'),
    progressBadge: t('pathVisualization.progressBadge'),
    examReadyLabel: t('pathVisualization.examReadyLabel'),
    completeLabel: t('pathVisualization.completeLabel'),
    overallProgress: t('pathVisualization.overallProgress'),
    completedBadge: t('pathVisualization.completedBadge'),
    activeTopic: {
      title: t('pathVisualization.activeTopic.title'),
      subtitle: t('pathVisualization.activeTopic.subtitle'),
      progress: t('pathVisualization.activeTopic.progress'),
      note: t('pathVisualization.activeTopic.note'),
    },
  },
  featureSpotlight: {
    eyebrow: t('featureSpotlight.eyebrow'),
    titleLines: arr<string[]>('featureSpotlight.titleLines'),
    descriptionDesktop: t('featureSpotlight.descriptionDesktop'),
    descriptionMobile: t('featureSpotlight.descriptionMobile'),
    bullets: arr<string[]>('featureSpotlight.bullets'),
    ctaLabel: t('featureSpotlight.ctaLabel'),
    mockup: {
      topicGrid: (() => {
        const labels = arr<string[]>('featureSpotlight.mockup.topicGrid.topicLabels');
        const scores = arr<string[]>('featureSpotlight.mockup.topicGrid.topicScores');
        return {
          subjects: arr<string[]>('featureSpotlight.mockup.topicGrid.subjects'),
          topics: labels.map((label, i) => ({
            label,
            score: scores[i] ?? '',
            state: topicStates[i],
          })),
          inProgressLabel: t('featureSpotlight.mockup.topicGrid.inProgressLabel'),
          adaptationHighlight: t('featureSpotlight.mockup.topicGrid.adaptationHighlight'),
          adaptationBody: t('featureSpotlight.mockup.topicGrid.adaptationBody'),
        };
      })(),
      parentDashboard: (() => {
        const names = arr<string[]>('featureSpotlight.mockup.parentDashboard.subjectNames');
        return {
          studentName: t('featureSpotlight.mockup.parentDashboard.studentName'),
          lastActive: t('featureSpotlight.mockup.parentDashboard.lastActive'),
          liveLabel: t('featureSpotlight.mockup.parentDashboard.liveLabel'),
          subjects: names.map((name, i) => ({
            name,
            pct: subjectPcts[i],
            color: subjectColors[i],
          })),
          tagline: t('featureSpotlight.mockup.parentDashboard.tagline'),
        };
      })(),
    },
  },
  testimonials: {
    title: t('testimonials.title'),
    items: arr<Array<{ quote: string; author: string; school: string; badge: string }>>('testimonials.items')
      .map((item, i) => ({ ...item, ...testimonialDesign[i] })),
    ratingScore: t('testimonials.ratingScore'),
    ratingCount: t('testimonials.ratingCount'),
  },
  whoIsItFor: {
    title: t('whoIsItFor.title'),
    worksForTitle: t('whoIsItFor.worksForTitle'),
    worksForItems: arr<string[]>('whoIsItFor.worksForItems'),
    subjectsTitle: t('whoIsItFor.subjectsTitle'),
    subjects: arr<Array<{ abbr: string; name: string; desc: string }>>('whoIsItFor.subjects')
      .map((s, i) => ({ ...s, color: whoSubjectColors[i] })),
    footerNote: t('whoIsItFor.footerNote'),
  },
  whyKyros: {
    title: t('whyKyros.title'),
    points: arr<Array<{ icon: 'target' | 'clock' | 'bar-chart'; title: string; desc: string }>>('whyKyros.points')
      .map((p, i) => ({ ...p, ...whyPointDesign[i] })),
  },
  beforeAfter: {
    title: t('beforeAfter.title'),
    headerWithout: t('beforeAfter.headerWithout'),
    headerWith: t('beforeAfter.headerWith'),
    rows: arr<Array<{ feature: string; without: string; with: string }>>('beforeAfter.rows'),
    examplePill: {
      prefix: t('beforeAfter.examplePill.prefix'),
      highlight: t('beforeAfter.examplePill.highlight'),
      suffix: t('beforeAfter.examplePill.suffix'),
    },
  },
  pricing: {
    title: t('pricing.title'),
    subtitle: t('pricing.subtitle'),
    plans: arr<Array<{ label: string; price: string; unit: string; savingBadge: string; popularLabel: string; priceHighlight: string; perDay: string; ctaLabel: string }>>('pricing.plans')
      .map((s, i) => ({ ...s, ...pricingPlanDesign[i] })),
    riskReducers: arr<string[]>('pricing.riskReducers'),
    paymentFooter: t('pricing.paymentFooter'),
    featureItems: arr<string[]>('pricing.featureItems'),
  },
  footer: {
    logoLabel: t('footer.logoLabel'),
    brandName: t('footer.brandName'),
    brandTagline: t('footer.brandTagline'),
    sections: arr<Array<{ title: string; links: string[] }>>('footer.sections'),
    ctaTitle: t('footer.ctaTitle'),
    ctaSubtext: t('footer.ctaSubtext'),
    ctaLabel: t('footer.ctaLabel'),
    copyright: t('footer.copyright'),
    legalNote: t('footer.legalNote'),
  },
};
