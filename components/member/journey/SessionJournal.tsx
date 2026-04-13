"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { journalEntries } from "@/lib/member/data";
import { disciplineTagColors, type Discipline } from "@/lib/teachers";

export default function SessionJournal() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function toggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-5">
        Session Journal
      </h3>

      <div className="space-y-4">
        {journalEntries.map((entry) => {
          const tagColor =
            disciplineTagColors[entry.discipline as Discipline];
          const isExpanded = expandedId === entry.id;

          const formattedDate = new Date(
            entry.date + "T00:00:00"
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          return (
            <button
              key={entry.id}
              onClick={() => toggle(entry.id)}
              className="w-full text-left p-4 rounded-xl border border-neutral-100 hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-neutral-900">
                      {formattedDate}
                    </span>
                    <span className="text-sm text-neutral-500">
                      {entry.teacherName}
                    </span>
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-[0.65rem] font-medium"
                      style={{
                        backgroundColor: tagColor.bg,
                        color: tagColor.text,
                      }}
                    >
                      {entry.discipline}
                    </span>
                  </div>
                  <p
                    className={`mt-1.5 text-sm text-neutral-600 leading-relaxed ${
                      isExpanded ? "" : "line-clamp-2"
                    }`}
                  >
                    {entry.note}
                  </p>
                </div>
                <div className="shrink-0 mt-0.5">
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-neutral-400" />
                  ) : (
                    <ChevronDown size={16} className="text-neutral-400" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
