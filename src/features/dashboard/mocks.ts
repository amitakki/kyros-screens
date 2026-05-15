import type {
  ChildDetailModel,
  ParentDashboardModel,
  Topic,
} from "./types";

function buildTopics(
  names: string[],
  completedCount: number,
  activeIdx: number,
  activeScore: number
): Topic[] {
  return names.map((name, i) => {
    const id = i + 1;
    if (i < completedCount) {
      return {
        id,
        name,
        status: "completed",
        bestScore: 85 + ((id * 3) % 15),
        attempts: (id % 3) + 1,
        lastPractised: `${(id % 5) + 1} days ago`,
      };
    }
    if (i === activeIdx) {
      return { id, name, status: "active", bestScore: activeScore, attempts: 2 };
    }
    return { id, name, status: "locked" };
  });
}

const mathsTopics = buildTopics(
  [
    "Multiplication & Division", "Long Division", "Fractions", "Decimals",
    "Percentages", "Ratio & Proportion", "Basic Algebra", "Sequences",
    "Coordinates", "Geometry Basics", "Area & Perimeter", "Angles",
    "Statistics", "Probability", "Word Problems", "Speed, Distance & Time",
    "Shape Patterns", "Algebra II", "Data Handling", "Mixed Practice",
  ],
  7, 7, 70
);

const englishTopics = buildTopics(
  [
    "Reading Comprehension", "Vocabulary Building", "Synonyms & Antonyms",
    "Spelling Patterns", "Grammar Basics", "Punctuation", "Sentence Structure",
    "Inference Skills", "Text Types", "Creative Writing",
    "Figurative Language", "Poetry Analysis", "Author's Purpose",
    "Word Classes", "Clauses & Phrases", "Essay Structure",
    "Formal Writing", "Literary Devices", "Reading for Meaning", "Advanced Comprehension",
  ],
  9, 9, 72
);

const verbalTopics = buildTopics(
  [
    "Word Definitions", "Synonyms", "Antonyms", "Word Connections",
    "Analogy Completion", "Letter Sequences", "Number Sequences", "Code Words",
    "Hidden Words", "Missing Letters", "Word Order", "Sentence Completion",
    "Verbal Classification", "Logic Puzzles", "Double Meanings", "Word Patterns",
    "Compound Words", "Verbal Sequences", "Word Puzzles", "Mixed Problems",
  ],
  5, 5, 65
);

const nonVerbalTopics = buildTopics(
  [
    "Shape Matching", "Pattern Completion", "Odd One Out", "Mirror Images",
    "Rotation", "Reflection", "3D Shapes", "Nets of Shapes",
    "Matrices", "Series Completion", "Analogies", "Coding & Decoding",
    "Combined Shapes", "Spatial Reasoning", "Visual Sequences", "Cube Nets",
    "Paper Folding", "Embedded Figures", "Advanced Patterns", "Mixed Practice",
  ],
  4, 4, 68
);

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
  topicsPerSubject: {
    Maths: mathsTopics,
    English: englishTopics,
    "Verbal Reasoning": verbalTopics,
    "Non-Verbal Reasoning": nonVerbalTopics,
  },
  totalTests: 47,
  testHistory: [
    { date: "11 Dec", subject: "Maths",            topic: "Topic 8: Sequences",         score: "14/20 (70%)",  rawScore: 70,  time: "24 min" },
    { date: "10 Dec", subject: "English",           topic: "Topic 9: Text Types",        score: "17/20 (85%)",  rawScore: 85,  time: "28 min" },
    { date: "09 Dec", subject: "Maths",             topic: "Topic 7: Basic Algebra",     score: "18/20 (90%)",  rawScore: 90,  time: "22 min" },
    { date: "08 Dec", subject: "Maths",             topic: "Topic 7: Basic Algebra",     score: "14/20 (70%)",  rawScore: 70,  time: "25 min" },
    { date: "07 Dec", subject: "Maths",             topic: "Topic 6: Fractions",         score: "20/20 (100%)", rawScore: 100, time: "18 min" },
    { date: "06 Dec", subject: "English",           topic: "Topic 5: Comprehension",     score: "16/20 (80%)",  rawScore: 80,  time: "30 min" },
    { date: "05 Dec", subject: "Maths",             topic: "Topic 5: Decimals",          score: "17/20 (85%)",  rawScore: 85,  time: "20 min" },
    { date: "04 Dec", subject: "Verbal Reasoning",  topic: "Topic 4: Word Connections",  score: "15/20 (75%)",  rawScore: 75,  time: "22 min" },
    { date: "03 Dec", subject: "Maths",             topic: "Topic 5: Decimals",          score: "13/20 (65%)",  rawScore: 65,  time: "26 min" },
    { date: "02 Dec", subject: "English",           topic: "Topic 8: Inference Skills",  score: "16/20 (80%)",  rawScore: 80,  time: "29 min" },
    { date: "01 Dec", subject: "Non-Verbal Reasoning", topic: "Topic 4: Mirror Images",  score: "14/20 (70%)",  rawScore: 70,  time: "20 min" },
    { date: "30 Nov", subject: "Maths",             topic: "Topic 4: Decimals",          score: "12/20 (60%)",  rawScore: 60,  time: "28 min" },
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
