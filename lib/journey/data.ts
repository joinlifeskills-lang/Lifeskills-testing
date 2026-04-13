import type {
  JourneyGoal,
  JourneyJournalEntry,
  JourneyMilestone,
} from "./types";

export const journeyGoals: JourneyGoal[] = [
  {
    id: "jg-1",
    clientId: "cl-1",
    title: "Find calm in stressful moments through daily breathwork",
    draftTitle: "I want to be less stressed at work",
    status: "active",
    createdBy: "customer",
    createdAt: "2026-03-05",
    lockedAt: "2026-03-07",
    subGoals: [
      {
        id: "sg-1",
        goalId: "jg-1",
        title: "4-7-8 breathing for 5 minutes each morning",
        frequency: "daily",
        currentStreak: 11,
        longestStreak: 11,
        completedToday: true,
        completionHistory: [
          "2026-04-13","2026-04-12","2026-04-11","2026-04-10",
          "2026-04-09","2026-04-08","2026-04-07","2026-04-06",
          "2026-04-05","2026-04-04","2026-04-03",
        ],
      },
      {
        id: "sg-2",
        goalId: "jg-1",
        title: "Box breathing before any stressful situation",
        frequency: "daily",
        currentStreak: 9,
        longestStreak: 9,
        completedToday: false,
        completionHistory: [
          "2026-04-12","2026-04-11","2026-04-10","2026-04-09",
          "2026-04-08","2026-04-07","2026-04-06","2026-04-05","2026-04-04",
        ],
      },
    ],
  },
  {
    id: "jg-2",
    clientId: "cl-1",
    title: "Build a consistent gentle morning movement practice",
    status: "active",
    createdBy: "teacher",
    createdAt: "2026-03-15",
    lockedAt: "2026-03-15",
    subGoals: [
      {
        id: "sg-3",
        goalId: "jg-2",
        title: "10 minutes of gentle movement or yoga each morning",
        frequency: "daily",
        currentStreak: 8,
        longestStreak: 8,
        completedToday: true,
        completionHistory: [
          "2026-04-13","2026-04-12","2026-04-11","2026-04-10",
          "2026-04-09","2026-04-08","2026-04-07","2026-04-06",
        ],
      },
    ],
  },
  {
    id: "jg-3",
    clientId: "cl-1",
    title: "Develop a calming pre-sleep breathwork ritual",
    draftTitle: "I want to sleep better at night",
    status: "pending_acceptance",
    createdBy: "customer",
    createdAt: "2026-04-10",
    subGoals: [],
  },
];

export const journeyJournalEntries: JourneyJournalEntry[] = [
  {
    id: "je-1",
    clientId: "cl-1",
    prompt: "What did you notice today?",
    content:
      "The morning breathing is becoming automatic. I barely have to think about it now — I just sit up and start. That feels different from a few weeks ago when I had to remind myself every day.",
    createdAt: "2026-04-12",
    teacherComment:
      "That automaticity is exactly what we're building toward. When it stops feeling like effort, it becomes part of who you are. Keep going.",
    teacherCommentAt: "2026-04-12",
  },
  {
    id: "je-2",
    clientId: "cl-1",
    prompt: "What did you notice today?",
    content:
      "Had a hard week at work. Used box breathing before my Friday presentation. It actually helped — I was surprised. My voice didn't shake like it usually does.",
    createdAt: "2026-04-10",
    teacherComment:
      "This is a real win, Sarah. The breath is most powerful when you need it most. Notice that you chose to use the tool — that's the practice working.",
    teacherCommentAt: "2026-04-11",
  },
  {
    id: "je-3",
    clientId: "cl-1",
    prompt: "What did you notice today?",
    content:
      "Woke up earlier than usual and felt less anxious about the day. I don't know if it's the breathing or just a good day, but I'll take it.",
    createdAt: "2026-04-08",
  },
  {
    id: "je-4",
    clientId: "cl-1",
    prompt: "What did you notice today?",
    content:
      "Skipped the morning breathing today. Felt off because of it — like something was missing. Maybe that's a good sign that it's becoming a habit?",
    createdAt: "2026-04-06",
    teacherComment:
      "Noticing its absence is exactly as valuable as doing it. You're paying attention — that's the whole point.",
    teacherCommentAt: "2026-04-07",
  },
  {
    id: "je-5",
    clientId: "cl-1",
    prompt: "What did you notice today?",
    content:
      "First time writing here. Not sure what to say. I'm going to try to be honest about what I notice rather than what I think I should say.",
    createdAt: "2026-04-05",
    teacherComment:
      "So glad you started, Sarah. There's no right or wrong here — just notice and write. That honesty is exactly the right approach.",
    teacherCommentAt: "2026-04-05",
  },
];

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "jm-1",
    clientId: "cl-1",
    type: "first_journal",
    unread: false,
    earnedAt: "2026-04-05",
    message: "You wrote your first reflection. That took courage.",
  },
  {
    id: "jm-2",
    clientId: "cl-1",
    type: "streak_7",
    unread: true,
    earnedAt: "2026-04-09",
    message: "Seven days of morning breathwork in a row. Consistency is its own kind of strength.",
  },
  {
    id: "jm-3",
    clientId: "cl-1",
    type: "sessions_5",
    unread: false,
    earnedAt: "2026-03-21",
    message: "You've completed 5 sessions with Maya. Something real is being built here.",
  },
];
