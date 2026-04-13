"use client";

import { useState } from "react";
import { Flag, Lock, Check } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL, calculateGoalProgress } from "@/lib/journey/types";

export default function GoalsSection({ clientId }: { clientId: string }) {
  const { goals: allGoals, acceptGoal, keepDraftGoal, flagGoal, addCustomerGoal } =
    useJourneyStore();

  const goals = allGoals.filter((g) => g.clientId === clientId);
  const activeCount = goals.filter((g) => g.status !== "completed").length;

  const [flagOpen, setFlagOpen] = useState<Record<string, boolean>>({});
  const [flagNote, setFlagNote] = useState<Record<string, string>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoalText, setNewGoalText] = useState("");

  function submitFlag(goalId: string) {
    const note = (flagNote[goalId] ?? "").trim();
    if (!note) return;
    flagGoal(goalId, note);
    setFlagOpen((p) => ({ ...p, [goalId]: false }));
  }

  function handleAddGoal() {
    const text = newGoalText.trim();
    if (!text) return;
    addCustomerGoal(clientId, text);
    setNewGoalText("");
    setShowAddForm(false);
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-2xl text-deep-sage">Your goals</h2>
        {activeCount < 3 && !showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="rounded-full border border-deep-sage px-4 py-2 text-xs font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
          >
            + Add goal
          </button>
        )}
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          /* ── Pending acceptance ── */
          if (goal.status === "pending_acceptance") {
            return (
              <div
                key={goal.id}
                className="rounded-2xl bg-bright-amber/10 border border-bright-amber/20 p-6"
              >
                <span className="mb-4 inline-block rounded-full bg-bright-amber/20 px-3 py-1 text-xs font-semibold text-bright-amber">
                  Maya refined your goal
                </span>
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                      You wrote
                    </p>
                    <p className="text-sm italic text-neutral-500">&ldquo;{goal.draftTitle}&rdquo;</p>
                  </div>
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                      Maya refined it to
                    </p>
                    <p className="font-display text-[1.6rem] leading-snug text-deep-sage">
                      &ldquo;{goal.title}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => acceptGoal(goal.id)}
                    className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => keepDraftGoal(goal.id)}
                    className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
                  >
                    Keep mine
                  </button>
                </div>
              </div>
            );
          }

          /* ── Draft ── */
          if (goal.status === "draft") {
            return (
              <div
                key={goal.id}
                className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
                      Waiting for Maya&apos;s review
                    </span>
                    <p className="font-display text-[1.6rem] leading-snug text-neutral-400">
                      &ldquo;{goal.title}&rdquo;
                    </p>
                  </div>
                  <Lock size={18} className="mt-1 shrink-0 text-neutral-300" />
                </div>
              </div>
            );
          }

          /* ── Flagged ── */
          if (goal.status === "flagged") {
            return (
              <div
                key={goal.id}
                className="rounded-2xl border border-vivid-coral/20 bg-vivid-coral/5 p-6"
              >
                <span className="mb-3 inline-block rounded-full bg-vivid-coral/15 px-3 py-1 text-xs font-semibold text-vivid-coral">
                  Flagged for revisit
                </span>
                <p className="font-display text-[1.6rem] leading-snug text-deep-sage mb-2">
                  {goal.title}
                </p>
                {goal.flagNote && (
                  <p className="text-sm italic text-neutral-500">&ldquo;{goal.flagNote}&rdquo;</p>
                )}
              </div>
            );
          }

          /* ── Active ── */
          const progress = calculateGoalProgress(goal.subGoals);
          const isOpen = !!flagOpen[goal.id];

          return (
            <div
              key={goal.id}
              className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6"
            >
              {/* Goal title */}
              <p className="font-display text-[1.6rem] leading-snug text-deep-sage mb-2">
                {goal.title}
              </p>

              {/* "Refined by teacher" badge */}
              {goal.createdBy === "customer" && goal.draftTitle && (
                <span className="mb-4 inline-block rounded-full bg-warm-sand px-2.5 py-0.5 text-xs font-medium text-soft-clay">
                  Refined by Maya
                </span>
              )}

              {/* Progress bar */}
              {goal.subGoals.length > 0 && (
                <div className="mb-5 mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-electric-teal">{progress}%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-teal-sage-gradient transition-all duration-700"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Sub-goals — read-only context */}
              {goal.subGoals.length > 0 && (
                <div className="mb-5 space-y-1">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                    Daily practices
                  </p>
                  {goal.subGoals.map((sg) => (
                    <div
                      key={sg.id}
                      className="flex items-center gap-3 rounded-xl bg-warm-sand/60 px-3 py-2.5"
                    >
                      <div
                        className={[
                          "h-4 w-4 shrink-0 rounded-full flex items-center justify-center",
                          sg.completedToday
                            ? "bg-electric-teal"
                            : "border-2 border-neutral-200 bg-white",
                        ].join(" ")}
                      >
                        {sg.completedToday && (
                          <Check size={9} className="text-white" strokeWidth={3} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm leading-snug ${
                            sg.completedToday ? "text-neutral-400 line-through" : "text-neutral-700"
                          }`}
                        >
                          {sg.title}
                        </p>
                        <p className="text-[11px] text-neutral-400">
                          {FREQUENCY_LABEL[sg.frequency]}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <span className="text-sm leading-none">🔥</span>
                        <span className="text-xs font-bold text-bright-amber">
                          {sg.currentStreak}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {goal.subGoals.length === 0 && (
                <p className="mb-5 text-sm italic text-neutral-400">
                  Maya will add daily practices soon.
                </p>
              )}

              {/* Flag */}
              {!isOpen ? (
                <button
                  onClick={() => setFlagOpen((p) => ({ ...p, [goal.id]: true }))}
                  className="flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-vivid-coral transition-colors"
                >
                  <Flag size={11} />
                  Flag for revisit
                </button>
              ) : (
                <div className="rounded-xl border border-vivid-coral/20 bg-vivid-coral/5 p-4 space-y-2">
                  <p className="text-xs font-medium text-neutral-700">
                    Let Maya know what you&apos;d like to revisit
                  </p>
                  <textarea
                    value={flagNote[goal.id] ?? ""}
                    onChange={(e) =>
                      setFlagNote((p) => ({ ...p, [goal.id]: e.target.value }))
                    }
                    placeholder="e.g. I'm struggling with this — can we adjust it?"
                    rows={2}
                    className="w-full resize-none rounded-xl border border-vivid-coral/20 bg-white p-3 text-sm placeholder:text-neutral-400 focus:border-vivid-coral focus:outline-none focus:ring-1 focus:ring-vivid-coral"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => submitFlag(goal.id)}
                      disabled={!(flagNote[goal.id] ?? "").trim()}
                      className="rounded-full border border-vivid-coral px-[26px] py-[10px] text-[0.88rem] font-semibold text-vivid-coral hover:bg-vivid-coral hover:text-white transition-colors disabled:opacity-40"
                    >
                      Send flag
                    </button>
                    <button
                      onClick={() => setFlagOpen((p) => ({ ...p, [goal.id]: false }))}
                      className="rounded-full border border-neutral-200 px-[26px] py-[10px] text-[0.88rem] font-semibold text-neutral-500 hover:border-neutral-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state — first-time goal setting */}
        {goals.length === 0 && !showAddForm && (
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 text-center">
            <div className="mb-4 h-14 w-14 mx-auto rounded-full bg-deep-sage/8 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <p className="font-display text-[1.5rem] leading-snug text-deep-sage mb-2">
              What would you like to work on?
            </p>
            <p className="text-sm text-neutral-500 mb-6 max-w-xs mx-auto">
              Write a goal in your own words. Maya will read it and work with you to shape it into something you can practise every day.
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Set my first goal
            </button>
          </div>
        )}

        {/* Add goal form */}
        {showAddForm && (
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 space-y-4">
            <div>
              <p className="font-display text-[1.4rem] leading-snug text-deep-sage mb-1">
                {goals.length === 0 ? "Your first goal" : "A new goal"}, in your own words
              </p>
              <p className="text-xs text-neutral-400">
                Be honest and specific. Maya will help shape the wording with you.
              </p>
            </div>
            <textarea
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="e.g. I want to feel less anxious in social situations"
              rows={4}
              className="w-full resize-none rounded-xl border-0 bg-warm-sand p-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-electric-teal/30"
            />
            <div className="flex gap-3">
              <button
                onClick={handleAddGoal}
                disabled={!newGoalText.trim()}
                className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Send to Maya
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewGoalText("");
                }}
                className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
