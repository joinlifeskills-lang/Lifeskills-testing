import { teacherSessions } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";
import { Clock, CheckCircle2, Calendar } from "lucide-react";

const TODAY = "2026-04-09";

const disciplineColors: Record<Discipline, string> = {
  Breathwork: "#0BA89A",
  Meditation: "#6BAA3E",
  Yoga: "#D4940A",
  Somatic: "#E8603A",
  Reiki: "#C026A0",
};

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

function getWeekBounds(anchor: string): { start: string; end: string; label: string } {
  const d = new Date(anchor + "T00:00:00");
  const day = d.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  const mon = new Date(d);
  mon.setDate(d.getDate() + diffToMon);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  const iso = (dt: Date) => dt.toISOString().slice(0, 10);
  const fmt = (dt: Date) =>
    dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return { start: iso(mon), end: iso(sun), label: `${fmt(mon)} – ${fmt(sun)}` };
}

function dayLabel(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const anchor = new Date(TODAY + "T00:00:00");
  const diff = Math.round((d.getTime() - anchor.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === -1) return "Yesterday";
  if (diff === 1) return "Tomorrow";
  return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

export default function TodaySchedule() {
  const { start, end, label } = getWeekBounds(TODAY);

  const sessions = teacherSessions
    .filter((s) => s.date >= start && s.date <= end && s.status !== "cancelled")
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  // Group by date
  const days: Record<string, typeof sessions> = {};
  for (const s of sessions) {
    if (!days[s.date]) days[s.date] = [];
    days[s.date].push(s);
  }
  const sortedDates = Object.keys(days).sort();

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5 flex flex-col h-full min-h-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-lg text-neutral-900">
          This Week&apos;s Schedule
        </h3>
        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
          <Calendar size={13} />
          {label}
        </span>
      </div>

      {sessions.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6 text-center">
          No sessions this week. Enjoy your time!
        </p>
      ) : (
        <div className="overflow-y-auto flex-1 min-h-0 pr-1 space-y-4">
          {sortedDates.map((date) => (
            <div key={date}>
              <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-neutral-400 mb-2">
                {dayLabel(date)}
              </p>
              <div className="space-y-2">
                {days[date].map((session) => {
                  const bgClass = hashColor(session.clientInitials);
                  return (
                    <div
                      key={session.id}
                      className="flex items-start gap-3 rounded-xl border border-neutral-100 p-4"
                    >
                      <div
                        className={`h-10 w-10 shrink-0 rounded-full ${bgClass} flex items-center justify-center text-white text-sm font-semibold`}
                      >
                        {session.clientInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-neutral-900">
                          {session.clientName}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span
                            className="inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white"
                            style={{ backgroundColor: disciplineColors[session.discipline] }}
                          >
                            {session.discipline}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-neutral-500">
                            <Clock size={12} />
                            {session.time} &ndash; {session.endTime}
                          </span>
                        </div>
                        <div className="mt-2">
                          {session.status === "completed" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-lime-sage/10 px-2.5 py-0.5 text-xs font-medium text-lime-sage">
                              <CheckCircle2 size={12} />
                              Completed
                            </span>
                          ) : session.status === "pending" ? (
                            <span className="inline-flex rounded-full bg-bright-amber/10 px-2.5 py-0.5 text-xs font-medium text-bright-amber">
                              Pending
                            </span>
                          ) : (
                            <button className="rounded-full bg-energy-gradient px-[20px] py-[7px] text-xs font-semibold text-white transition-opacity hover:opacity-90">
                              Join Session
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
