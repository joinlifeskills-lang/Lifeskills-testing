"use client";

import Link from "next/link";
import { Circle, ArrowRight } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import { FREQUENCY_LABEL } from "@/lib/journey/types";

const CLIENT_ID = "cl-1";

export default function NeedsAttention() {
  const { goals, entries } = useJourneyStore();

  const activeGoals = goals.filter(
    (g) => g.clientId === CLIENT_ID && g.status === "active"
  );
  const incompletePractices = activeGoals.flatMap((g) =>
    g.subGoals
      .filter((sg) => !sg.completedToday)
      .map((sg) => ({ ...sg, goalTitle: g.title }))
  );

  // Check if they've written a reflection today
  const today = new Date().toISOString().slice(0, 10);
  const hasReflectionToday = entries.some(
    (e) => e.clientId === CLIENT_ID && e.createdAt === today
  );

  // Unread teacher comments (entries with teacher comments the customer hasn't "seen")
  const recentTeacherComments = entries.filter(
    (e) =>
      e.clientId === CLIENT_ID &&
      e.teacherComment &&
      e.teacherCommentAt &&
      e.teacherCommentAt >= today
  );

  const hasItems =
    incompletePractices.length > 0 ||
    !hasReflectionToday ||
    recentTeacherComments.length > 0;

  if (!hasItems) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6 h-full flex flex-col">
        <h3 className="font-display text-lg text-neutral-900 mb-4">
          Needs Attention
        </h3>
        <div className="flex-1 flex flex-col items-center justify-center text-center py-4">
          <span className="text-3xl mb-3">🎉✨🙌</span>
          <p className="font-display text-base text-deep-sage">
            You&apos;re all caught up!
          </p>
          <p className="font-sans text-xs text-neutral-500 mt-1">
            Nothing needs your attention today. Enjoy the calm 🌿
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6 h-full">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Needs Attention
      </h3>

      <div className="space-y-3">
        {/* Incomplete practices */}
        {incompletePractices.length > 0 && (
          <Link
            href="/customer-dashboard/journey"
            className="flex items-start gap-3 p-3 rounded-xl bg-warm-sand/50 hover:bg-warm-sand transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-vivid-coral/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Circle size={14} className="text-vivid-coral" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-semibold text-neutral-900">
                {incompletePractices.length} practice{incompletePractices.length > 1 ? "s" : ""} remaining today
              </p>
              <div className="mt-1 space-y-0.5">
                {incompletePractices.map((p) => (
                  <p
                    key={p.id}
                    className="font-sans text-xs text-neutral-500 truncate"
                  >
                    {p.title}
                  </p>
                ))}
              </div>
            </div>
            <ArrowRight
              size={16}
              className="text-neutral-300 group-hover:text-neutral-500 transition-colors mt-1 flex-shrink-0"
            />
          </Link>
        )}

        {/* No reflection today */}
        {!hasReflectionToday && (
          <Link
            href="/customer-dashboard/journey"
            className="flex items-center gap-3 p-3 rounded-xl bg-warm-sand/50 hover:bg-warm-sand transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-electric-teal/10 flex items-center justify-center flex-shrink-0">
              <span className="text-electric-teal text-sm">&#9998;</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-semibold text-neutral-900">
                Write today&apos;s reflection
              </p>
              <p className="font-sans text-xs text-neutral-500">
                Take a moment to notice how you feel.
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-neutral-300 group-hover:text-neutral-500 transition-colors flex-shrink-0"
            />
          </Link>
        )}

        {/* New teacher comments */}
        {recentTeacherComments.length > 0 && (
          <Link
            href="/customer-dashboard/journey"
            className="flex items-center gap-3 p-3 rounded-xl bg-warm-sand/50 hover:bg-warm-sand transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-electric-teal flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[0.5rem] font-sans font-bold">
                MR
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm font-semibold text-neutral-900">
                New note from your teacher
              </p>
              <p className="font-sans text-xs text-neutral-500 truncate">
                Maya responded to your reflection.
              </p>
            </div>
            <ArrowRight
              size={16}
              className="text-neutral-300 group-hover:text-neutral-500 transition-colors flex-shrink-0"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
