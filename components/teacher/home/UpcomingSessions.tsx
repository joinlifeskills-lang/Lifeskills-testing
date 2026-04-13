import Link from "next/link";
import { teacherSessions } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";
import { Calendar } from "lucide-react";

const TODAY = "2026-04-09";

const disciplineColors: Record<Discipline, string> = {
  Breathwork: "#0BA89A",
  Meditation: "#6BAA3E",
  Yoga: "#D4940A",
  Somatic: "#E8603A",
  Reiki: "#C026A0",
};

export default function UpcomingSessions() {
  const upcoming = teacherSessions
    .filter(
      (s) =>
        s.date > TODAY &&
        (s.status === "confirmed" || s.status === "pending")
    )
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5);

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-neutral-900">Coming Up</h3>
        <Link
          href="/teacher-dashboard/sessions"
          className="text-sm font-medium text-electric-teal hover:underline"
        >
          View all
        </Link>
      </div>

      {upcoming.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6 text-center">
          No upcoming sessions.
        </p>
      ) : (
        <div className="space-y-3">
          {upcoming.map((session) => (
            <div
              key={session.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-100 px-4 py-3"
            >
              <div className="h-8 w-8 shrink-0 rounded-full bg-deep-sage/5 flex items-center justify-center text-deep-sage">
                <Calendar size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-neutral-900 truncate">
                  {session.clientName}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-0.5">
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[0.65rem] font-medium text-white"
                    style={{
                      backgroundColor: disciplineColors[session.discipline],
                    }}
                  >
                    {session.discipline}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {session.date} &middot; {session.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
