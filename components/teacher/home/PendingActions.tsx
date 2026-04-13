import Link from "next/link";
import { pendingBookings, teacherSessions, teacherConversations } from "@/lib/teacher/data";
import { MessageSquare, FileText, Calendar, Clock } from "lucide-react";

function formatDate(dateStr: string): string {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export default function PendingActions() {
  const unreadCount = teacherConversations.reduce((sum, c) => sum + c.unread, 0);
  const needsNotes = teacherSessions.filter(
    (s) => s.status === "completed" && !s.hasNotes
  );

  const hasContent =
    pendingBookings.length > 0 || unreadCount > 0 || needsNotes.length > 0;

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5 h-full">
      <h3 className="font-display text-lg text-neutral-900 mb-3">
        Needs Attention
      </h3>

      {!hasContent ? (
        <p className="text-sm text-neutral-500 py-6 text-center">
          You&apos;re all caught up!
        </p>
      ) : (
        <div className="space-y-4">
          {/* Pending Booking Requests */}
          {pendingBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-xl border border-neutral-100 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 shrink-0 rounded-full bg-bright-amber/20 flex items-center justify-center text-xs font-semibold text-bright-amber">
                  {booking.clientInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900">
                    {booking.clientName}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs font-medium text-neutral-700">
                      <Calendar size={11} className="text-neutral-400" />
                      {formatDate(booking.requestedDate)}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-neutral-700">
                      <Clock size={11} className="text-neutral-400" />
                      {booking.requestedTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button className="rounded-full bg-electric-teal px-[20px] py-[7px] text-xs font-semibold text-white transition-opacity hover:opacity-90">
                  Accept
                </button>
                <button className="text-xs font-medium text-neutral-500 hover:text-neutral-700 transition-colors">
                  Decline
                </button>
              </div>
            </div>
          ))}

          {/* Unread Messages */}
          {unreadCount > 0 && (
            <Link
              href="/teacher-dashboard/messages"
              className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4 transition-colors hover:bg-neutral-50"
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-electric-teal/10 flex items-center justify-center text-electric-teal">
                <MessageSquare size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">
                  {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                </p>
                <p className="text-xs text-neutral-500">Tap to view</p>
              </div>
            </Link>
          )}

          {/* Sessions Needing Notes */}
          {needsNotes.length > 0 && (
            <div className="flex items-center gap-3 rounded-xl border border-neutral-100 p-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-vivid-coral/10 flex items-center justify-center text-vivid-coral">
                <FileText size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900">
                  {needsNotes.length} session{needsNotes.length !== 1 ? "s" : ""} need
                  notes
                </p>
                <p className="text-xs text-neutral-500">
                  {needsNotes.map((s) => s.clientName).join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
