"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL } from "@/lib/journey/types";

const CLIENT_ID = "cl-1";

export default function HomePractices() {
  const { goals, toggleSubGoal } = useJourneyStore();
  const clientGoals = goals.filter(
    (g) => g.clientId === CLIENT_ID && g.status === "active"
  );
  const allSg = clientGoals.flatMap((g) => g.subGoals);
  const doneCount = allSg.filter((s) => s.completedToday).length;

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-neutral-900">
          Today&apos;s Practices
        </h3>
        <span className="font-sans text-xs text-neutral-500">
          {doneCount}/{allSg.length} done
        </span>
      </div>

      <div className="space-y-2">
        {clientGoals.map((goal) =>
          goal.subGoals.map((sg) => (
            <div
              key={sg.id}
              className="flex items-center gap-3 py-2"
            >
              <button
                onClick={sg.completedToday ? undefined : () => toggleSubGoal(goal.id, sg.id)}
                disabled={sg.completedToday}
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: sg.completedToday ? "#2D4A3E" : "transparent",
                  borderWidth: sg.completedToday ? "0px" : "2px",
                  borderStyle: "solid",
                  borderColor: sg.completedToday ? "transparent" : "#0BA89A",
                  cursor: sg.completedToday ? "default" : "pointer",
                  transition: "background-color 400ms ease, border-color 400ms ease",
                }}
              >
                {sg.completedToday ? (
                  <Check size={14} className="text-white" strokeWidth={3} />
                ) : (
                  <Check size={14} className="text-electric-teal" strokeWidth={2} />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <p
                  className="font-sans text-sm text-neutral-900"
                  style={{
                    color: sg.completedToday ? "#7A7A7A" : "#1A1A1A",
                    transition: "color 300ms ease",
                  }}
                >
                  {sg.title}
                </p>
                <p className="font-sans text-[0.6rem] text-neutral-500">
                  {FREQUENCY_LABEL[sg.frequency]}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {allSg.length === 0 && (
        <p className="font-sans text-sm text-neutral-500 text-center py-3">
          No practices yet.
        </p>
      )}

      <Link
        href="/customer-dashboard/journey"
        className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-neutral-100 font-sans text-sm font-medium text-electric-teal hover:text-deep-sage transition-colors"
      >
        View my journey
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
