export type Tab = 'profile' | 'children' | 'notifications' | 'password' | 'privacy';
export type AccountType = 'google' | 'email';

export type Child = {
  id: string;
  name: string;
  firstName: string;
  year: string;
  region: string;
  avatar?: string;
  schools: number;
  lastActive: string;
  diagnosticPending?: boolean;
};

export type NotificationPrefs = {
  topicComplete: boolean;
  inactivity: boolean;
  weeklySummary: boolean;
  milestones: boolean;
  trialExpiry: boolean;
};
