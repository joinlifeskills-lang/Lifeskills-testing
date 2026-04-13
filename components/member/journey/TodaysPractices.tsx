"use client";

import { Check } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL } from "@/lib/journey/types";

export default function TodaysPractices({ clientId }: { clientId: string }) {
  const { goals: allGoals, toggleSubGoal } = useJourneyStore();

  const activeGoals = allGoals.filter(
    (g) => g.clientId === clientId && g.status === "active"
  );
  const practices = activeGoals.flatMap((g) =>
    g.subGoals.map((sg) => ({ ...sg, goalId: g.id }))
  );

  if (practices.length === 0) return null;

  const completedCount = practices.filter((p) => p.completedToday).length;
  const allDone = completedCount === practices.length;

  return (
    <section>
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-2xl text-deep-sage">Today&apos;s practices</h2>
        <span className="text-sm text-neutral-500">
          {completedCount}/{practices.length} done
        </span>
      </div>

      {allDone && (
        <div className="mb-5 rounded-2xl bg-lime-sage/10 px-5 py-3.5 flex items-center gap-3">
          <span className="text-xl">✨</span>
          <p className="text-sm font-semibold text-lime-sage">
            All practices done — beautiful work today.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {practices.map((practice) => {
          const done = practice.completedToday;
          return (
            <button
              key={practice.id}
              onClick={() => toggleSubGoal(practice.goalId, practice.id)}
              className={[
                "w-full text-left rounded-2xl p-5 transition-all duration-300 cursor-pointer select-none",
                done
                  ? "bg-deep-sage shadow-[0_6px_24px_rgba(45,74,62,0.3)]"
                  : "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:-translate-y-0.5",
              ].join(" ")}
            >
              {/* Top row: title + check */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm leading-snug ${done ? "text-white/90" : "text-neutral-900"}`}>
                    {practice.title}
                  </p>
                  <p className={`text-xs mt-1 ${done ? "text-white/45" : "text-neutral-400"}`}>
                    {FREQUENCY_LABEL[practice.frequency]}
                  </p>
                </div>
                <div
                  className={[
                    "shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200",
                    done
                      ? "bg-white/25"
                      : "border-2 border-neutral-200",
                  ].join(" ")}
                >
                  {done && <Check size={12} className="text-white" strokeWidth={3} />}
                </div>
              </div>

              {/* Streak */}
              <div className="flex items-end gap-1.5 mb-4">
                <span className="text-xl leading-none">🔥</span>
                <span className={`text-3xl font-display leading-none ${done ? "text-white" : "text-bright-amber"}`}>
                  {practice.currentStreak}
                </span>
                <span className={`text-xs mb-0.5 ${done ? "text-white/45" : "text-neutral-400"}`}>
                  day streak
                </span>
              </div>

              {/* CTA hint */}
              {!done ? (
                <div className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-200 px-3 py-2">
                  <div className="h-4 w-4 shrink-0 rounded-full border-2 border-electric-teal/60" />
                  <span className="text-xs font-medium text-neutral-400">
                    Tap card when done today
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2">
                  <Check size={13} className="text-white/70" strokeWidth={2.5} />
                  <span className="text-xs font-medium text-white/60">Marked complete</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
