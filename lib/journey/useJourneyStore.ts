"use client";

import { useEffect, useReducer } from "react";
import { getState, subscribe } from "./store";
import * as actions from "./store";

export function useJourneyStore() {
  const [, forceUpdate] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    return subscribe(forceUpdate);
  }, []);

  return {
    ...getState(),
    toggleSubGoal: actions.toggleSubGoal,
    acceptGoal: actions.acceptGoal,
    keepDraftGoal: actions.keepDraftGoal,
    flagGoal: actions.flagGoal,
    addCustomerGoal: actions.addCustomerGoal,
    addJournalEntry: actions.addJournalEntry,
    dismissMilestone: actions.dismissMilestone,
    addTeacherGoal: actions.addTeacherGoal,
    editGoalTitle: actions.editGoalTitle,
    confirmDraft: actions.confirmDraft,
    refineGoal: actions.refineGoal,
    addSubGoal: actions.addSubGoal,
    deleteSubGoal: actions.deleteSubGoal,
    addJournalComment: actions.addJournalComment,
  };
}
