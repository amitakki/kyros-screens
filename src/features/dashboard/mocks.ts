import type {
  ChildDetailModel,
  ParentDashboardModel,
  Topic,
} from "./types";

function buildTopics(): Topic[] {
  return Array.from({ length: 20 }, (_, index) => {
    const id = index + 1;

    if (id <= 7) {
      return {
        id,
        name: `Topic ${id}`,
        status: "completed",
        bestScore: 85 + ((id * 3) % 15),
        attempts: (id % 3) + 1,
        lastPractised: `${(id % 5) + 1} days ago`,
      };
    }

    if (id === 8) {
      return { id, name: "Sequences", status: "active", bestScore: 70, attempts: 2 };
    }

    return { id, name: `Topic ${id}`, status: "locked" };
  });
}

export const childDetailMock: ChildDetailModel = {
  childName: "Emma Thompson",
  firstName: "Emma",
  year: "Year 5",
  region: "Kent",
  streak: 5,
  schools: ["Tonbridge Grammar School", "Invicta Grammar School"],
  currentTopic: "Topic 8 - Sequences",
  subjects: [
    { name: "Maths", progress: 35, color: "var(--brand)" },
    { name: "English", progress: 45, color: "var(--success)" },
    { name: "Verbal Reasoning", progress: 25, color: "var(--warning)" },
    { name: "Non-Verbal Reasoning", progress: 20, color: "var(--danger)" },
  ],
  topics: buildTopics(),
  testHistory: [
    {
      date: "09 Dec",
      subject: "Maths",
      topic: "Topic 7: Basic Algebra",
      score: "18/20 (90%)",
      rawScore: 90,
      time: "22 min",
    },
    {
      date: "08 Dec",
      subject: "Maths",
      topic: "Topic 7: Basic Algebra",
      score: "14/20 (70%)",
      rawScore: 70,
      time: "25 min",
    },
    {
      date: "07 Dec",
      subject: "Maths",
      topic: "Topic 6: Fractions",
      score: "20/20 (100%)",
      rawScore: 100,
      time: "18 min",
    },
    {
      date: "06 Dec",
      subject: "English",
      topic: "Topic 5: Comprehension",
      score: "16/20 (80%)",
      rawScore: 80,
      time: "30 min",
    },
    {
      date: "05 Dec",
      subject: "Maths",
      topic: "Topic 5: Decimals",
      score: "17/20 (85%)",
      rawScore: 85,
      time: "20 min",
    },
  ],
};

export const parentDashboardMock: ParentDashboardModel = {
  daysRemaining: 4,
  parentName: "Sarah",
  children: [
    {
      id: "2",
      name: "Sophie Thompson",
      firstName: "Sophie",
      year: "Year 4",
      region: "Kent",
      diagnosticComplete: false,
      hasActivity: false,
    },
    {
      id: "1",
      name: "Emma Thompson",
      firstName: "Emma",
      year: "Year 5",
      region: "Kent",
      diagnosticComplete: true,
      hasActivity: true,
      currentSubject: "Maths",
      topicsCompleted: 7,
      totalTopics: 20,
      nextTopic: "Topic 8 - Sequences",
      avgScore: 78,
      scoreChange: "up",
      totalTests: 12,
      lastActivity: "2h ago",
      streak: 5,
      autoSkip: false,
    },
  ],
  activityGroups: [
    {
      childId: "1",
      childName: "Emma",
      timestamp: "2h ago",
      items: [
        "Completed Topic 7 - Basic Algebra",
        "Scored 90% on Topic 7 (Attempt 2) 🎉",
        "Unlocked Topic 8: Sequences",
      ],
    },
    {
      childId: "2",
      childName: "Sophie",
      timestamp: "5h ago",
      items: ["Logged in for the first time"],
    },
  ],
};
