import i18next from '../../shared/i18n/config';
import { CHILD_PROFILE_LIMIT } from '../../shared/constants/limits';

const t = (key: string) => i18next.t(key, { ns: 'settings' });
const arr = <T>(key: string) => i18next.t(key, { ns: 'settings', returnObjects: true }) as T;

export const settingsContent = {
  page: {
    title: t('page.title'),
    description: t('page.description'),
  },
  header: {
    logoLabel: t('header.logoLabel'),
    brandName: t('header.brandName'),
    userInitial: t('header.userInitial'),
    userName: t('header.userName'),
    navItems: arr<Array<{ label: string; path: string; active: boolean }>>('header.navItems'),
  },
  tabs: {
    mobile: arr<Array<{ id: string; label: string }>>('tabs.mobile'),
    desktop: arr<Array<{ id: string; label: string }>>('tabs.desktop'),
  },
  profile: {
    sectionLabel: t('profile.sectionLabel'),
    avatarInitial: t('profile.avatarInitial'),
    changePhotoLabel: t('profile.changePhotoLabel'),
    removePhotoLabel: t('profile.removePhotoLabel'),
    fullNameLabel: t('profile.fullNameLabel'),
    emailLabel: t('profile.emailLabel'),
    googleBadgeLabel: t('profile.googleBadgeLabel'),
    googleEmailNote: t('profile.googleEmailNote'),
    changeEmailLabel: t('profile.changeEmailLabel'),
    defaultFullName: t('profile.defaultFullName'),
  },
  children: {
    sectionLabel: t('children.sectionLabel'),
    maxProfiles: CHILD_PROFILE_LIMIT,
    editLabel: t('children.editLabel'),
    manageSchoolsLabel: t('children.manageSchoolsLabel'),
    archiveLabel: t('children.archiveLabel'),
    diagnosticPendingLabel: t('children.diagnosticPendingLabel'),
    lastActivePrefix: t('children.lastActivePrefix'),
    addChildLabel: t('children.addChildLabel'),
    addChildNote: t('children.addChildNote'),
    addChildPath: t('children.addChildPath'),
  },
  notifications: {
    sectionLabel: t('notifications.sectionLabel'),
    groups: arr<Array<{
      title: string;
      items: Array<{ key: string; label: string; sublabel: string; disabled: boolean; disabledTitle: string }>;
    }>>('notifications.groups'),
  },
  password: {
    sectionLabel: t('password.sectionLabel'),
    googleSecuredText: t('password.googleSecuredText'),
    googleSecuredNote: t('password.googleSecuredNote'),
    googleSettingsLabel: t('password.googleSettingsLabel'),
    currentPasswordLabel: t('password.currentPasswordLabel'),
    newPasswordLabel: t('password.newPasswordLabel'),
    confirmPasswordLabel: t('password.confirmPasswordLabel'),
    passwordMatchText: t('password.passwordMatchText'),
    passwordMismatchText: t('password.passwordMismatchText'),
    updatePasswordLabel: t('password.updatePasswordLabel'),
    sessionsSectionLabel: t('password.sessionsSectionLabel'),
    currentSessionDesc: t('password.currentSessionDesc'),
    currentSessionBadge: t('password.currentSessionBadge'),
    signOutAllLabel: t('password.signOutAllLabel'),
  },
  privacy: {
    sectionLabel: t('privacy.sectionLabel'),
    downloadTitle: t('privacy.downloadTitle'),
    downloadDesc: t('privacy.downloadDesc'),
    downloadLabel: t('privacy.downloadLabel'),
    downloadNotePrefix: t('privacy.downloadNotePrefix'),
    deleteTitle: t('privacy.deleteTitle'),
    deleteDesc: t('privacy.deleteDesc'),
    deleteWarnings: arr<string[]>('privacy.deleteWarnings'),
    deleteLabel: t('privacy.deleteLabel'),
  },
  archiveModal: {
    descriptionSuffix: t('archiveModal.descriptionSuffix'),
    checkboxPrefix: t('archiveModal.checkboxPrefix'),
    checkboxSuffix: t('archiveModal.checkboxSuffix'),
    cancelLabel: t('archiveModal.cancelLabel'),
    confirmLabel: t('archiveModal.confirmLabel'),
  },
  deleteModal: {
    title: t('deleteModal.title'),
    description: t('deleteModal.description'),
    inputLabel: t('deleteModal.inputLabel'),
    inputPlaceholder: t('deleteModal.inputPlaceholder'),
    confirmKeyword: t('deleteModal.confirmKeyword'),
    cancelLabel: t('deleteModal.cancelLabel'),
    confirmLabel: t('deleteModal.confirmLabel'),
  },
  saveBar: {
    unsavedMessage: t('saveBar.unsavedMessage'),
    discardLabel: t('saveBar.discardLabel'),
    saveLabel: t('saveBar.saveLabel'),
  },
};
