"use client";

import { teacherSessions } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  Breathwork: "#0BA89A",
  Meditation: "#6BAA3E",
  Yoga: "#D4940A",
  Somatic: "#E8603A",
  Reiki: "#C026A0",
};

export default function DisciplineBreakdown() {
  const completedSessions = teacherSessions.filter(
    (s) => s.status === "completed"
  );
  const total = completedSessions.length;

  const counts: Partial<Record<Discipline, number>> = {};
  for (const s of completedSessions) {
    counts[s.discipline] = (counts[s.discipline] || 0) + 1;
  }

  const sorted = Object.entries(counts).sort(
    ([, a], [, b]) => b - a
  ) as [Discipline, number][];

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Sessions by Discipline
      </h3>
      <div className="space-y-4">
        {sorted.map(([discipline, count]) => {
          const pct = Math.round((count / total) * 100);
          return (
            <div key={discipline}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-700">
                  {discipline}
                </span>
                <span className="text-neutral-500">
                  {count} ({pct}%)
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-neutral-100">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: DISCIPLINE_COLORS[discipline],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
