export interface Topic {
  id: number;
  name: string;
  status: "completed" | "active" | "locked";
  bestScore?: number;
  attempts?: number;
  lastPractised?: string;
}

export interface TestRecord {
  date: string;
  subject: string;
  topic: string;
  score: string;
  rawScore: number;
  time: string;
}

export interface SubjectProgress {
  name: string;
  progress: number;
  color: string;
}

export interface ChildDetailModel {
  childName: string;
  firstName: string;
  year: string;
  region: string;
  streak: number;
  schools: string[];
  currentTopic: string;
  subjects: SubjectProgress[];
  topicsPerSubject: Record<string, Topic[]>;
  testHistory: TestRecord[];
  totalTests: number;
}

export interface DashboardChild {
  id: string;
  name: string;
  firstName: string;
  year: string;
  region: string;
  avatar?: string;
  diagnosticComplete: boolean;
  hasActivity: boolean;
  currentSubject?: string;
  topicsCompleted?: number;
  totalTopics?: number;
  nextTopic?: string;
  avgScore?: number;
  scoreChange?: "up" | "down" | "flat";
  totalTests?: number;
  lastActivity?: string;
  streak?: number;
  autoSkip?: boolean;
}

export interface DashboardActivityGroup {
  childId: string;
  childName: string;
  avatar?: string;
  timestamp: string;
  items: string[];
}

export interface ParentDashboardModel {
  daysRemaining: number;
  parentName: string;
  children: DashboardChild[];
  activityGroups: DashboardActivityGroup[];
}
