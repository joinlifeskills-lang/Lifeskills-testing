import { journeyGoals, journeyJournalEntries, journeyMilestones } from "./data";
import type {
  JourneyGoal,
  JourneyJournalEntry,
  JourneyMilestone,
  SubGoalFrequency,
} from "./types";

// ── Module-level shared store ──
// All journey components on both dashboards subscribe to this single store.
// Changes on the customer side are immediately visible on the teacher side and vice-versa.

interface StoreState {
  goals: JourneyGoal[];
  entries: JourneyJournalEntry[];
  milestones: JourneyMilestone[];
}

let state: StoreState = {
  goals: journeyGoals,
  entries: journeyJournalEntries,
  milestones: journeyMilestones,
};

type Listener = () => void;
const listeners = new Set<Listener>();

export function getState() {
  return state;
}

export function subscribe(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

function set(next: StoreState) {
  state = next;
  listeners.forEach((fn) => fn());
}

// ── Customer actions ──

export function toggleSubGoal(goalId: string, subGoalId: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId
        ? g
        : {
            ...g,
            subGoals: g.subGoals.map((sg) =>
              sg.id !== subGoalId
                ? sg
                : {
                    ...sg,
                    completedToday: !sg.completedToday,
                    currentStreak: !sg.completedToday
                      ? sg.currentStreak + 1
                      : Math.max(0, sg.currentStreak - 1),
                  }
            ),
          }
    ),
  });
}

export function acceptGoal(goalId: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId
        ? g
        : { ...g, status: "active", lockedAt: new Date().toISOString().slice(0, 10) }
    ),
  });
}

export function keepDraftGoal(goalId: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId
        ? g
        : {
            ...g,
            title: g.draftTitle ?? g.title,
            status: "active",
            lockedAt: new Date().toISOString().slice(0, 10),
          }
    ),
  });
}

export function flagGoal(goalId: string, note: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId ? g : { ...g, status: "flagged", flagNote: note }
    ),
  });
}

export function addCustomerGoal(clientId: string, title: string) {
  const newGoal: JourneyGoal = {
    id: `jg-${Date.now()}`,
    clientId,
    title,
    status: "draft",
    createdBy: "customer",
    createdAt: new Date().toISOString().slice(0, 10),
    subGoals: [],
  };
  set({ ...state, goals: [...state.goals, newGoal] });
}

export function addJournalEntry(clientId: string, content: string) {
  const entry: JourneyJournalEntry = {
    id: `je-${Date.now()}`,
    clientId,
    prompt: "What did you notice today?",
    content,
    createdAt: new Date().toISOString().slice(0, 10),
  };
  set({ ...state, entries: [entry, ...state.entries] });
}

export function dismissMilestone(milestoneId: string) {
  set({
    ...state,
    milestones: state.milestones.map((m) =>
      m.id !== milestoneId ? m : { ...m, unread: false }
    ),
  });
}

// ── Teacher actions ──

export function addTeacherGoal(clientId: string, title: string) {
  const newGoal: JourneyGoal = {
    id: `jg-${Date.now()}`,
    clientId,
    title,
    status: "active",
    createdBy: "teacher",
    createdAt: new Date().toISOString().slice(0, 10),
    lockedAt: new Date().toISOString().slice(0, 10),
    subGoals: [],
  };
  set({ ...state, goals: [...state.goals, newGoal] });
}

export function editGoalTitle(goalId: string, title: string) {
  set({
    ...state,
    goals: state.goals.map((g) => (g.id !== goalId ? g : { ...g, title })),
  });
}

export function confirmDraft(goalId: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId
        ? g
        : { ...g, status: "active", lockedAt: new Date().toISOString().slice(0, 10) }
    ),
  });
}

export function refineGoal(goalId: string, refinedTitle: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId ? g : { ...g, title: refinedTitle, status: "pending_acceptance" }
    ),
  });
}

export function addSubGoal(goalId: string, title: string, frequency: SubGoalFrequency) {
  const sg = {
    id: `sg-${Date.now()}`,
    goalId,
    title,
    frequency,
    currentStreak: 0,
    longestStreak: 0,
    completedToday: false,
    completionHistory: [] as string[],
  };
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId ? g : { ...g, subGoals: [...g.subGoals, sg] }
    ),
  });
}

export function deleteSubGoal(goalId: string, subGoalId: string) {
  set({
    ...state,
    goals: state.goals.map((g) =>
      g.id !== goalId
        ? g
        : { ...g, subGoals: g.subGoals.filter((sg) => sg.id !== subGoalId) }
    ),
  });
}

export function addJournalComment(entryId: string, comment: string) {
  set({
    ...state,
    entries: state.entries.map((e) =>
      e.id !== entryId
        ? e
        : {
            ...e,
            teacherComment: comment,
            teacherCommentAt: new Date().toISOString().slice(0, 10),
          }
    ),
  });
}
