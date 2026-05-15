import i18next from '../../shared/i18n/config';
import type { StatusBadgeTone } from '../../shared/components/feedback/StatusBadge';
import { CHILD_PROFILE_LIMIT } from '../../shared/constants/limits';
import type {
  SchoolExamBoard,
  SchoolGender,
  SchoolRegion,
  SchoolSortOption,
} from './types';

const t = (key: string, opts?: Record<string, unknown>) => i18next.t(key, { ns: 'onboarding', ...opts });
const arr = <T>(key: string) => i18next.t(key, { ns: 'onboarding', returnObjects: true }) as T;

function toOrdinal(n: number): string {
  if (n === 1) return '1st';
  if (n === 2) return '2nd';
  if (n === 3) return '3rd';
  return `${n}th`;
}

export const schoolSelectionContent = {
  title: t('schoolSelection.title'),
  description: t('schoolSelection.description'),
  helper: t('schoolSelection.helper'),
  callout: t('schoolSelection.callout'),
  selectedTitle: t('schoolSelection.selectedTitle'),
  selectedHelper: t('schoolSelection.selectedHelper'),
  availableTitle: t('schoolSelection.availableTitle'),
  emptyState: t('schoolSelection.emptyState'),
  searchPlaceholder: t('schoolSelection.searchPlaceholder'),
  addedLabel: t('schoolSelection.addedLabel'),
  examFormatLink: t('schoolSelection.examFormatLink'),
  continueLabel: t('schoolSelection.continueLabel'),
  stepOneLabel: t('schoolSelection.stepOneLabel'),
  stepTwoLabel: t('schoolSelection.stepTwoLabel'),
  screenReader: {
    closeSelection: t('schoolSelection.screenReader.closeSelection'),
  },
};

export const regionOptions: Array<{ value: '' | SchoolRegion; label: string }> = [
  { value: '', label: t('regionOptions.all') },
  { value: 'kent', label: t('regionOptions.kent') },
  { value: 'birmingham', label: t('regionOptions.birmingham') },
  { value: 'other', label: t('regionOptions.other') },
];

export const genderOptions: Array<{ value: '' | SchoolGender; label: string }> = [
  { value: '', label: t('genderOptions.all') },
  { value: 'Boys', label: t('genderOptions.boys') },
  { value: 'Girls', label: t('genderOptions.girls') },
  { value: 'Co-ed', label: t('genderOptions.coed') },
];

export const sortOptions: Array<{ value: SchoolSortOption; label: string }> = [
  { value: 'popular', label: t('sortOptions.popular') },
  { value: 'az', label: t('sortOptions.az') },
];

export const createChildProfileContent = {
  logoLabel: t('createChildProfile.logoLabel'),
  brandName: t('createChildProfile.brandName'),
  stepper: {
    step1Label: t('createChildProfile.stepper.step1Label'),
    step2Label: t('createChildProfile.stepper.step2Label'),
  },
  breadcrumb: {
    dashboardLabel: t('createChildProfile.breadcrumb.dashboardLabel'),
    addChildLabel: t('createChildProfile.breadcrumb.addChildLabel'),
  },
  childCounter: {
    prefix: t('createChildProfile.childCounter.prefix'),
    suffix: t('createChildProfile.childCounter.suffix', { limit: CHILD_PROFILE_LIMIT }),
    lastWarning: t('createChildProfile.childCounter.lastWarning'),
  },
  titles: {
    firstChild: t('createChildProfile.titles.firstChild'),
    lastChild: t('createChildProfile.titles.lastChild'),
    otherChild: t('createChildProfile.titles.otherChild'),
  },
  subtitles: {
    firstChild: t('createChildProfile.subtitles.firstChild'),
    otherChild: t('createChildProfile.subtitles.otherChild'),
  },
  lastChildWarning: t('createChildProfile.lastChildWarning', { ordinal: toOrdinal(CHILD_PROFILE_LIMIT) }),
  personaliseNote: t('createChildProfile.personaliseNote'),
  timeNote: t('createChildProfile.timeNote'),
  childInfoLabel: t('createChildProfile.childInfoLabel'),
  optionalLabel: t('createChildProfile.optionalLabel'),
  fields: {
    fullName: {
      label: t('createChildProfile.fields.fullName.label'),
      placeholder: t('createChildProfile.fields.fullName.placeholder'),
      helper: t('createChildProfile.fields.fullName.helper'),
    },
    username: {
      label: t('createChildProfile.fields.username.label'),
      placeholder: t('createChildProfile.fields.username.placeholder'),
      helperFallback: t('createChildProfile.fields.username.helperFallback'),
      helperPrefix: t('createChildProfile.fields.username.helperPrefix'),
      helperSuffix: t('createChildProfile.fields.username.helperSuffix'),
      generateLabel: t('createChildProfile.fields.username.generateLabel'),
      availableText: t('createChildProfile.fields.username.availableText'),
      takenText: t('createChildProfile.fields.username.takenText'),
    },
    password: {
      label: t('createChildProfile.fields.password.label'),
      placeholder: t('createChildProfile.fields.password.placeholder'),
      helperFallback: t('createChildProfile.fields.password.helperFallback'),
      helperPrefix: t('createChildProfile.fields.password.helperPrefix'),
      helperSuffix: t('createChildProfile.fields.password.helperSuffix'),
    },
    schoolYear: {
      label: t('createChildProfile.fields.schoolYear.label'),
      options: arr<string[]>('createChildProfile.fields.schoolYear.options'),
      helper: t('createChildProfile.fields.schoolYear.helper'),
    },
    region: {
      label: t('createChildProfile.fields.region.label'),
      placeholder: t('createChildProfile.fields.region.placeholder'),
      options: arr<Array<{ value: string; label: string }>>('createChildProfile.fields.region.options'),
      helper: t('createChildProfile.fields.region.helper'),
    },
    photo: {
      label: t('createChildProfile.fields.photo.label'),
      uploadText: t('createChildProfile.fields.photo.uploadText'),
      uploadSubtext: t('createChildProfile.fields.photo.uploadSubtext'),
      helperFallback: t('createChildProfile.fields.photo.helperFallback'),
      helperPrefix: t('createChildProfile.fields.photo.helperPrefix'),
      helperSuffix: t('createChildProfile.fields.photo.helperSuffix'),
      skipLabel: t('createChildProfile.fields.photo.skipLabel'),
      fallbackNote: t('createChildProfile.fields.photo.fallbackNote'),
    },
  },
  navigation: {
    backFirstChild: t('createChildProfile.navigation.backFirstChild'),
    cancelLabel: t('createChildProfile.navigation.cancelLabel'),
    continueFirstChild: t('createChildProfile.navigation.continueFirstChild'),
    saveLast: t('createChildProfile.navigation.saveLast'),
    saveOther: t('createChildProfile.navigation.saveOther'),
  },
};

// Non-translatable: TypeScript discriminated union mapping design tokens to exam board types
export const examBoardTones: Record<SchoolExamBoard, StatusBadgeTone> = {
  'GL Assessment': 'brand',
  CEM: 'warning',
  ISEB: 'success',
  'Kent Test': 'danger',
};
