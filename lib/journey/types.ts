export type GoalStatus =
  | "draft"
  | "pending_acceptance"
  | "active"
  | "flagged"
  | "completed";

export type SubGoalFrequency = "daily" | "3x_week" | "weekly";

export interface JourneySubGoal {
  id: string;
  goalId: string;
  title: string;
  frequency: SubGoalFrequency;
  currentStreak: number;
  longestStreak: number;
  completedToday: boolean;
  completionHistory: string[];
}

export interface JourneyGoal {
  id: string;
  clientId: string;
  title: string;
  draftTitle?: string;
  status: GoalStatus;
  createdBy: "customer" | "teacher";
  createdAt: string;
  lockedAt?: string;
  flagNote?: string;
  subGoals: JourneySubGoal[];
}

export interface JourneyJournalEntry {
  id: string;
  clientId: string;
  prompt: string;
  content: string;
  createdAt: string;
  teacherComment?: string;
  teacherCommentAt?: string;
  adminComment?: string;
  adminCommentAt?: string;
}

export type JourneyMilestoneType =
  | "first_journal"
  | "streak_7"
  | "streak_30"
  | "sessions_5"
  | "first_goal_locked"
  | "goal_completed";

export interface JourneyMilestone {
  id: string;
  clientId: string;
  type: JourneyMilestoneType;
  unread: boolean;
  earnedAt: string;
  message: string;
}

export const FREQUENCY_LABEL: Record<SubGoalFrequency, string> = {
  daily: "Daily",
  "3x_week": "3× per week",
  weekly: "Weekly",
};

export function calculateGoalProgress(subGoals: JourneySubGoal[]): number {
  if (subGoals.length === 0) return 0;
  const TARGET = 14;
  const avg =
    subGoals.reduce((s, sg) => s + Math.min(sg.currentStreak / TARGET, 1), 0) /
    subGoals.length;
  return Math.round(avg * 100);
}
