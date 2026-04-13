"use client";

import type { TeacherSession } from "@/lib/teacher/types";
import { Clock, CheckCircle2, XCircle, Star, FileText } from "lucide-react";

function hashColor(initials: string): string {
  const colors = [
    "bg-electric-teal",
    "bg-lime-sage",
    "bg-bright-amber",
    "bg-vivid-coral",
    "bg-deep-sage",
  ];
  let hash = 0;
  for (let i = 0; i < initials.length; i++) {
    hash = initials.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

interface TeacherSessionCardProps {
  session: TeacherSession;
}

export default function TeacherSessionCard({ session }: TeacherSessionCardProps) {
  const bgClass = hashColor(session.clientInitials);
  const isCancelled = session.status === "cancelled";

  return (
    <div
      className={`rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5 ${
        isCancelled ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`h-10 w-10 shrink-0 rounded-full ${bgClass} flex items-center justify-center text-white text-sm font-semibold`}
        >
          {session.clientInitials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900">
            {session.clientName}
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock size={12} />
              {session.time} &ndash; {session.endTime}
            </span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[0.65rem] font-medium text-neutral-600">
              {session.duration} min
            </span>
          </div>

          <p className="text-xs text-neutral-500 mt-1">{session.date}</p>

          {/* Status badge */}
          <div className="mt-3">
            {session.status === "completed" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-lime-sage/10 px-2.5 py-0.5 text-xs font-medium text-lime-sage">
                <CheckCircle2 size={12} />
                Completed
              </span>
            )}
            {session.status === "confirmed" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-electric-teal/10 px-2.5 py-0.5 text-xs font-medium text-electric-teal">
                Confirmed
              </span>
            )}
            {session.status === "pending" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-bright-amber/10 px-2.5 py-0.5 text-xs font-medium text-bright-amber">
                Pending
              </span>
            )}
            {session.status === "in_progress" && (
              <span className="inline-flex items-center gap-1 rounded-full bg-vivid-coral/10 px-2.5 py-0.5 text-xs font-medium text-vivid-coral">
                In Progress
              </span>
            )}
            {isCancelled && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-500">
                <XCircle size={12} />
                Cancelled
              </span>
            )}
          </div>

          {/* Review indicator for completed */}
          {session.status === "completed" && session.clientReview && (
            <div className="flex items-center gap-1 mt-2 text-xs text-bright-amber">
              <Star size={12} fill="currentColor" />
              <span className="font-medium">
                {session.clientReview.rating}/5 &mdash; &ldquo;{session.clientReview.text.slice(0, 60)}
                {session.clientReview.text.length > 60 ? "..." : ""}&rdquo;
              </span>
            </div>
          )}

          {/* Cancellation info */}
          {isCancelled && session.cancellationReason && (
            <p className="text-xs text-neutral-400 mt-2">
              Cancelled by {session.cancelledBy}: {session.cancellationReason}
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 mt-3">
            {session.status === "confirmed" && (
              <button className="rounded-full bg-deep-sage px-[20px] py-[7px] text-xs font-semibold text-white transition-colors hover:bg-deep-sage-hover">
                Join Session
              </button>
            )}

            {session.status === "pending" && (
              <>
                <button className="rounded-full bg-electric-teal px-[20px] py-[7px] text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  Accept
                </button>
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors">
                  Decline
                </button>
              </>
            )}

            {session.status === "completed" && (
              <button className="inline-flex items-center gap-1 rounded-full border border-deep-sage px-[20px] py-[7px] text-xs font-semibold text-deep-sage transition-colors hover:bg-deep-sage hover:text-white">
                <FileText size={12} />
                {session.hasNotes ? "View Notes" : "Add Notes"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
