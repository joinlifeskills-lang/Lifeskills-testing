"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";

const PROMPT = "What did you notice today?";
const TODAY = new Date().toISOString().slice(0, 10);

function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DailyJournal({ clientId }: { clientId: string }) {
  const { entries: allEntries, addJournalEntry } = useJourneyStore();

  const entries = allEntries.filter((e) => e.clientId === clientId);
  const hasTodayEntry = entries.some((e) => e.createdAt === TODAY);

  const [entryText, setEntryText] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  function submitEntry() {
    const text = entryText.trim();
    if (!text) return;
    addJournalEntry(clientId, text);
    setEntryText("");
  }

  return (
    <section>
      <h2 className="font-display text-2xl text-deep-sage mb-5">Daily reflection</h2>

      {/* Write area */}
      <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 mb-4">
        {!hasTodayEntry ? (
          <div className="space-y-5">
            <p className="font-display text-[1.5rem] leading-snug text-deep-sage">{PROMPT}</p>
            <textarea
              value={entryText}
              onChange={(e) => setEntryText(e.target.value)}
              placeholder="Write honestly about what you noticed — no right answers here."
              rows={6}
              className="w-full resize-none rounded-2xl border-0 bg-warm-sand p-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-electric-teal/30"
            />
            <button
              onClick={submitEntry}
              disabled={!entryText.trim()}
              className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              Save reflection
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-lime-sage/15 flex items-center justify-center">
              <span className="text-lime-sage text-sm font-bold">✓</span>
            </div>
            <p className="text-sm font-medium text-lime-sage">
              You&apos;ve written today&apos;s reflection
            </p>
          </div>
        )}
      </div>

      {/* Previous entries */}
      {entries.length > 0 && (
        <div>
          <p className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
            Previous reflections
          </p>
          <div className="space-y-2">
            {entries.map((entry) => {
              const isToday = entry.createdAt === TODAY;
              const isExpanded = expandedId === entry.id;

              return (
                <div
                  key={entry.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                    className="w-full flex items-start justify-between gap-3 p-5 text-left transition-colors hover:bg-neutral-50/60"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold text-neutral-500">
                          {isToday ? "Today" : formatDate(entry.createdAt)}
                        </p>
                        {entry.teacherComment && (
                          <span className="rounded-full bg-electric-teal/10 px-2 py-0.5 text-[10px] font-semibold text-electric-teal">
                            Maya replied
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm leading-relaxed text-neutral-700 ${
                          isExpanded ? "" : "line-clamp-2"
                        }`}
                      >
                        {entry.content}
                      </p>
                    </div>
                    <div className="mt-0.5 shrink-0 text-neutral-300">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {isExpanded && entry.teacherComment && (
                    <div className="border-t border-neutral-100 bg-electric-teal/[0.04] px-5 py-4">
                      <div className="flex items-start gap-3 border-l-[3px] border-electric-teal pl-4">
                        <div className="h-8 w-8 shrink-0 rounded-full bg-electric-teal flex items-center justify-center text-white text-[11px] font-bold">
                          MR
                        </div>
                        <div>
                          <p className="mb-1 text-[11px] font-semibold text-electric-teal">Maya</p>
                          <p className="text-sm leading-relaxed text-neutral-700">
                            {entry.teacherComment}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
