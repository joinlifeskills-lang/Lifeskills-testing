"use client";

import { disciplineBreakdown } from "@/lib/member/data";
import { disciplineTagColors, type Discipline } from "@/lib/teachers";

export default function SkillsBreakdown() {
  const maxSessions = Math.max(...disciplineBreakdown.map((d) => d.sessions));

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-5">
        Skills Practiced
      </h3>

      <div className="space-y-4">
        {disciplineBreakdown.map((item) => {
          const color =
            disciplineTagColors[item.discipline as Discipline]?.bg || "#2D4A3E";
          const widthPercent = (item.sessions / maxSessions) * 100;

          return (
            <div key={item.discipline} className="flex items-center gap-3">
              <span className="w-[120px] shrink-0 text-sm text-neutral-700 truncate">
                {item.discipline}
              </span>
              <div className="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              <span className="w-6 text-right text-sm font-semibold text-neutral-700">
                {item.sessions}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
