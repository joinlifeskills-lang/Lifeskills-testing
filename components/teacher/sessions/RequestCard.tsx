"use client";

import type { PendingBooking } from "@/lib/teacher/types";

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

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

interface RequestCardProps {
  booking: PendingBooking;
}

export default function RequestCard({ booking }: RequestCardProps) {
  const bgClass = hashColor(booking.clientInitials);

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`h-10 w-10 shrink-0 rounded-full ${bgClass} flex items-center justify-center text-white text-sm font-semibold`}
        >
          {booking.clientInitials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-neutral-900">
            {booking.clientName}
          </p>
          <p className="text-xs text-neutral-500 mt-0.5">
            {formatDate(booking.requestedDate)} &middot; {booking.requestedTime} &middot; {booking.duration} min
          </p>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3">
            <button className="rounded-full bg-deep-sage px-[20px] py-[7px] text-xs font-semibold text-white transition-colors hover:bg-deep-sage-hover">
              Accept
            </button>
            <button className="text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
