"use client";

import { useState } from "react";
import { Check, Plus, Flame } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { calculateGoalProgress } from "@/lib/journey/types";

export default function GoalsSection({ clientId }: { clientId: string }) {
  const { goals, addCustomerGoal, confirmDraft } = useJourneyStore();

  // Show all customer goals regardless of status (no draft distinction on customer side)
  const clientGoals = goals.filter(
    (g) =>
      g.clientId === clientId &&
      g.status !== "pending_acceptance" &&
      g.status !== "flagged"
  );

  const [showForm, setShowForm] = useState(false);
  const [text, setText] = useState("");
  const canAdd = clientGoals.length < 3;

  const handleSubmit = () => {
    const t = text.trim();
    if (!t) return;
    // Add then immediately confirm so it's active — customer owns their goals
    addCustomerGoal(clientId, t);
    // The new goal was just pushed to the end of the array
    const updated = goals;
    const newest = updated[updated.length - 1];
    if (newest && newest.status === "draft") {
      confirmDraft(newest.id);
    }
    setText("");
    setShowForm(false);
  };

  return (
    <section className="h-full flex flex-col">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-deep-sage">My Goals</h2>
          <span className="font-sans text-xs text-neutral-500">
            {clientGoals.length}/3
          </span>
        </div>

        <div className="space-y-4">
          {clientGoals.map((goal) => {
            const progress = calculateGoalProgress(goal.subGoals);
            return (
              <div key={goal.id} className="bg-warm-sand/30 rounded-2xl p-5">
                <h3 className="font-display text-lg text-deep-sage mb-3">
                  {goal.title}
                </h3>

                {/* Progress bar */}
                {goal.subGoals.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-xs font-medium text-neutral-500">
                        Progress
                      </span>
                      <span className="font-sans text-sm font-bold text-electric-teal">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-electric-teal rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Practices */}
                {goal.subGoals.length > 0 && (
                  <div className="space-y-2">
                    {goal.subGoals.map((sg) => (
                      <div key={sg.id} className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                            sg.completedToday
                              ? "bg-electric-teal"
                              : "border-[1.5px] border-neutral-300"
                          }`}
                        >
                          {sg.completedToday && (
                            <Check size={11} className="text-white" strokeWidth={3} />
                          )}
                        </div>
                        <span className="font-sans text-sm flex-1 text-neutral-700">
                          {sg.title}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Flame size={12} className="text-bright-amber" fill="#F0A500" />
                          <span className="font-sans text-xs font-bold text-bright-amber">
                            {sg.currentStreak}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {goal.subGoals.length === 0 && (
                  <p className="font-sans text-xs text-neutral-500">
                    Your teacher will add daily practices for this goal.
                  </p>
                )}
              </div>
            );
          })}

          {/* Empty state */}
          {clientGoals.length === 0 && (
            <div className="text-center py-4">
              <p className="font-display text-lg text-deep-sage mb-2">
                Set your first goal
              </p>
              <p className="font-sans text-sm text-neutral-500 max-w-sm mx-auto">
                Write what you want to work toward. Your teacher will add daily
                practices to help you get there.
              </p>
            </div>
          )}

          {/* Add goal — hidden at 3 */}
          {canAdd && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-sans font-medium text-sm hover:border-electric-teal hover:text-electric-teal transition-colors duration-200"
            >
              <Plus size={18} />
              Add a goal
            </button>
          )}

          {showForm && (
            <div className="bg-warm-sand/30 rounded-2xl p-5">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What would you like to work toward?"
                className="w-full font-sans text-base text-neutral-900 placeholder:text-neutral-300 bg-transparent outline-none mb-4"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={!text.trim()}
                  className="font-sans font-semibold text-sm px-6 py-2.5 rounded-full text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(232,96,58,0.35)] disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  style={{
                    background: "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)",
                  }}
                >
                  Set goal
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setText("");
                  }}
                  className="font-sans font-medium text-sm text-neutral-500 hover:text-neutral-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
