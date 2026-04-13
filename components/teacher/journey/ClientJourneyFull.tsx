"use client";

import { useState } from "react";
import {
  Plus, Edit2, Check, X, Flame, ChevronDown, ChevronUp, MessageSquare,
} from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import type { SubGoalFrequency } from "@/lib/journey/types";
import { FREQUENCY_LABEL, calculateGoalProgress } from "@/lib/journey/types";

const FREQ_OPTIONS: { value: SubGoalFrequency; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "3x_week", label: "3× per week" },
  { value: "weekly", label: "Weekly" },
];

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });
}

interface Props {
  clientId: string;
  clientName: string;
  completedSessionCount: number;
}

export default function ClientJourneyFull({ clientId, clientName, completedSessionCount }: Props) {
  const {
    goals: allGoals,
    entries: allEntries,
    editGoalTitle,
    confirmDraft,
    refineGoal,
    addSubGoal,
    deleteSubGoal,
    addTeacherGoal,
    addJournalComment,
  } = useJourneyStore();

  const goals = allGoals.filter((g) => g.clientId === clientId);
  const entries = allEntries.filter((e) => e.clientId === clientId);
  const firstName = clientName.split(" ")[0];

  // Local UI state only — nothing that needs to be shared
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [refiningGoalId, setRefiningGoalId] = useState<string | null>(null);
  const [refineText, setRefineText] = useState("");
  const [addSubGoalForId, setAddSubGoalForId] = useState<string | null>(null);
  const [newSubTitle, setNewSubTitle] = useState("");
  const [newSubFreq, setNewSubFreq] = useState<SubGoalFrequency>("daily");
  const [showNewGoalForm, setShowNewGoalForm] = useState(false);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [commentingEntryId, setCommentingEntryId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  const activeCount = goals.filter((g) => g.status !== "completed").length;

  function saveGoalEdit(goalId: string) {
    const text = editTitle.trim();
    if (!text) return;
    editGoalTitle(goalId, text);
    setEditingGoalId(null);
  }

  function saveRefinement(goalId: string) {
    const text = refineText.trim();
    if (!text) return;
    refineGoal(goalId, text);
    setRefiningGoalId(null);
  }

  function handleAddSubGoal(goalId: string) {
    const text = newSubTitle.trim();
    if (!text) return;
    addSubGoal(goalId, text, newSubFreq);
    setAddSubGoalForId(null);
    setNewSubTitle("");
    setNewSubFreq("daily");
  }

  function handleAddGoal() {
    const text = newGoalTitle.trim();
    if (!text) return;
    addTeacherGoal(clientId, text);
    setNewGoalTitle("");
    setShowNewGoalForm(false);
  }

  function saveComment(entryId: string) {
    const text = commentText.trim();
    if (!text) return;
    addJournalComment(entryId, text);
    setCommentingEntryId(null);
    setCommentText("");
  }

  return (
    <div className="space-y-6">

      {/* ── Goals ── */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-display text-lg text-neutral-900">Goals</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {activeCount} of 3 slots · {completedSessionCount} sessions completed
            </p>
          </div>
          {activeCount < 3 && !showNewGoalForm && (
            <button
              onClick={() => setShowNewGoalForm(true)}
              className="flex items-center gap-1.5 rounded-full border border-deep-sage px-4 py-2 text-xs font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
            >
              <Plus size={13} />
              Add goal
            </button>
          )}
        </div>

        <div className="space-y-3">
          {goals.map((goal) => {
            const isExpanded = expandedGoalId === goal.id;
            const isEditing = editingGoalId === goal.id;
            const isRefining = refiningGoalId === goal.id;
            const isAddingSub = addSubGoalForId === goal.id;
            const progress = calculateGoalProgress(goal.subGoals);

            return (
              <div key={goal.id} className="rounded-xl border border-neutral-100 overflow-hidden">
                <div className="flex items-start gap-3 p-4">
                  <div className="flex-1 min-w-0">
                    {/* Status badge */}
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      {goal.status === "active" && (
                        <span className="rounded-full bg-electric-teal/10 px-2 py-0.5 text-[11px] font-semibold text-electric-teal">Active</span>
                      )}
                      {goal.status === "draft" && (
                        <span className="rounded-full bg-bright-amber/15 px-2 py-0.5 text-[11px] font-semibold text-bright-amber">
                          {firstName}'s draft — needs review
                        </span>
                      )}
                      {goal.status === "pending_acceptance" && (
                        <span className="rounded-full bg-electric-teal/10 px-2 py-0.5 text-[11px] font-semibold text-electric-teal">
                          Awaiting {firstName}'s acceptance
                        </span>
                      )}
                      {goal.status === "flagged" && (
                        <span className="rounded-full bg-vivid-coral/15 px-2 py-0.5 text-[11px] font-semibold text-vivid-coral">
                          Flagged by {firstName}
                        </span>
                      )}
                    </div>

                    {/* Title or edit field */}
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveGoalEdit(goal.id);
                            if (e.key === "Escape") setEditingGoalId(null);
                          }}
                        />
                        <button onClick={() => saveGoalEdit(goal.id)} className="h-7 w-7 rounded-full bg-lime-sage flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </button>
                        <button onClick={() => setEditingGoalId(null)} className="h-7 w-7 rounded-full bg-neutral-100 flex items-center justify-center">
                          <X size={12} className="text-neutral-500" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-neutral-900 leading-snug">{goal.title}</p>
                    )}

                    {goal.status === "pending_acceptance" && goal.draftTitle && (
                      <p className="mt-1 text-xs text-neutral-400 italic">Original: "{goal.draftTitle}"</p>
                    )}
                    {goal.status === "flagged" && goal.flagNote && (
                      <p className="mt-1 text-xs text-neutral-500 italic">"{goal.flagNote}"</p>
                    )}

                    {goal.status === "active" && goal.subGoals.length > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-neutral-100 overflow-hidden">
                          <div className="h-full rounded-full bg-electric-teal transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-[11px] font-semibold text-electric-teal shrink-0">{progress}%</span>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-1">
                    {goal.status === "active" && !isEditing && (
                      <button
                        onClick={() => { setEditingGoalId(goal.id); setEditTitle(goal.title); }}
                        className="h-7 w-7 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                        title="Edit goal"
                      >
                        <Edit2 size={12} className="text-neutral-600" />
                      </button>
                    )}
                    <button
                      onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}
                      className="h-7 w-7 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={13} className="text-neutral-600" /> : <ChevronDown size={13} className="text-neutral-600" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-neutral-100 p-4 space-y-4">

                    {/* Draft review */}
                    {goal.status === "draft" && !isRefining && (
                      <div className="space-y-2">
                        <p className="text-xs text-neutral-500">
                          {firstName} wrote: <span className="italic">"{goal.draftTitle ?? goal.title}"</span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => confirmDraft(goal.id)} className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors">
                            Confirm as-is
                          </button>
                          <button
                            onClick={() => { setRefiningGoalId(goal.id); setRefineText(goal.title); }}
                            className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
                          >
                            Refine wording
                          </button>
                        </div>
                      </div>
                    )}

                    {isRefining && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-neutral-700">
                          Refined wording — {firstName} will be asked to accept
                        </p>
                        <textarea
                          value={refineText}
                          onChange={(e) => setRefineText(e.target.value)}
                          rows={2}
                          autoFocus
                          className="w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                        />
                        <div className="flex gap-2">
                          <button onClick={() => saveRefinement(goal.id)} className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors">Save refinement</button>
                          <button onClick={() => setRefiningGoalId(null)} className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors">Cancel</button>
                        </div>
                      </div>
                    )}

                    {/* Sub-goals (active + flagged goals) */}
                    {(goal.status === "active" || goal.status === "flagged") && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Daily practices</p>
                          {!isAddingSub && (
                            <button
                              onClick={() => setAddSubGoalForId(goal.id)}
                              className="flex items-center gap-1 text-xs font-semibold text-deep-sage hover:opacity-70 transition-opacity"
                            >
                              <Plus size={12} /> Add practice
                            </button>
                          )}
                        </div>

                        {goal.subGoals.length === 0 && !isAddingSub && (
                          <p className="text-xs text-neutral-400 italic">No daily practices yet.</p>
                        )}

                        {goal.subGoals.map((sg) => (
                          <div key={sg.id} className="flex items-center gap-3 rounded-lg border border-neutral-100 px-3 py-2.5">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-neutral-800">{sg.title}</p>
                              <p className="text-[11px] text-neutral-400">{FREQUENCY_LABEL[sg.frequency]}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <div className="flex items-center gap-1">
                                <Flame size={12} className="text-bright-amber" />
                                <span className="text-xs font-semibold text-bright-amber">{sg.currentStreak}</span>
                              </div>
                              <button
                                onClick={() => deleteSubGoal(goal.id, sg.id)}
                                className="h-6 w-6 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-vivid-coral/10 hover:text-vivid-coral transition-colors"
                                title="Remove"
                              >
                                <X size={11} className="text-neutral-400" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {isAddingSub && (
                          <div className="rounded-xl border border-neutral-200 p-3 space-y-2">
                            <input
                              value={newSubTitle}
                              onChange={(e) => setNewSubTitle(e.target.value)}
                              placeholder="e.g. 10 min breathwork each morning"
                              autoFocus
                              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm placeholder:text-neutral-400 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                              onKeyDown={(e) => { if (e.key === "Enter") handleAddSubGoal(goal.id); }}
                            />
                            <select
                              value={newSubFreq}
                              onChange={(e) => setNewSubFreq(e.target.value as SubGoalFrequency)}
                              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                            >
                              {FREQ_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <button onClick={() => handleAddSubGoal(goal.id)} disabled={!newSubTitle.trim()} className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors disabled:opacity-40">Add</button>
                              <button onClick={() => { setAddSubGoalForId(null); setNewSubTitle(""); }} className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors">Cancel</button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {goals.length === 0 && (
            <p className="text-sm text-neutral-500">No goals yet. Add one to start {firstName}'s journey.</p>
          )}

          {showNewGoalForm && (
            <div className="rounded-xl border border-neutral-200 p-4 space-y-3">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">New goal</p>
              <input
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="e.g. Build a consistent daily breathwork practice"
                autoFocus
                className="w-full rounded-lg border border-neutral-200 px-3 py-2.5 text-sm placeholder:text-neutral-400 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddGoal();
                  if (e.key === "Escape") setShowNewGoalForm(false);
                }}
              />
              <div className="flex gap-2">
                <button onClick={handleAddGoal} disabled={!newGoalTitle.trim()} className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors disabled:opacity-40">Create goal</button>
                <button onClick={() => { setShowNewGoalForm(false); setNewGoalTitle(""); }} className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Journal Feed ── */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg text-neutral-900">Reflections</h3>
          <span className="text-xs text-neutral-400">{entries.length} {entries.length === 1 ? "entry" : "entries"}</span>
        </div>

        {entries.length === 0 ? (
          <p className="text-sm text-neutral-500">{firstName} hasn't written any reflections yet.</p>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => {
              const isCommenting = commentingEntryId === entry.id;
              return (
                <div key={entry.id} className="rounded-xl border border-neutral-100 overflow-hidden">
                  <div className="p-4">
                    <p className="text-xs font-medium text-neutral-400 mb-2">{formatDate(entry.createdAt)}</p>
                    <p className="text-xs font-medium text-neutral-500 italic mb-1.5">"{entry.prompt}"</p>
                    <p className="text-sm text-neutral-800 leading-relaxed">{entry.content}</p>
                  </div>

                  {entry.teacherComment && (
                    <div className="border-t border-neutral-100 bg-electric-teal/5 px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="shrink-0 h-7 w-7 rounded-full bg-electric-teal flex items-center justify-center text-white text-[11px] font-bold">
                          MR
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold text-electric-teal mb-0.5">Your note</p>
                          <p className="text-sm text-neutral-700 leading-relaxed">{entry.teacherComment}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {!entry.teacherComment && (
                    <div className="border-t border-neutral-100 px-4 py-3">
                      {isCommenting ? (
                        <div className="space-y-2">
                          <textarea
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Add encouragement or feedback..."
                            rows={2}
                            autoFocus
                            className="w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm placeholder:text-neutral-400 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
                          />
                          <div className="flex gap-2">
                            <button onClick={() => saveComment(entry.id)} disabled={!commentText.trim()} className="rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover transition-colors disabled:opacity-40">Save</button>
                            <button onClick={() => { setCommentingEntryId(null); setCommentText(""); }} className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setCommentingEntryId(entry.id); setCommentText(""); }}
                          className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-electric-teal transition-colors"
                        >
                          <MessageSquare size={13} />
                          Add a note
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
