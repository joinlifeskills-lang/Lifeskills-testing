"use client";

import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import type { TeacherClient, TeacherSession, ClientMilestone } from "@/lib/teacher/types";
import type { Discipline } from "@/lib/teachers";

const DISCIPLINE_COLORS: Record<Discipline, string> = {
  Breathwork: "#0BA89A",
  Meditation: "#6BAA3E",
  Yoga: "#D4940A",
  Somatic: "#E8603A",
  Reiki: "#C026A0",
};

const DISCIPLINE_TAG_COLORS: Record<Discipline, string> = {
  Breathwork: "bg-electric-teal/10 text-electric-teal",
  Meditation: "bg-lime-sage/10 text-lime-sage",
  Yoga: "bg-bright-amber/10 text-bright-amber",
  Somatic: "bg-vivid-coral/10 text-vivid-coral",
  Reiki: "bg-pink-100 text-pink-600",
};

const AVATAR_COLORS = [
  "bg-electric-teal",
  "bg-lime-sage",
  "bg-bright-amber",
  "bg-vivid-coral",
  "bg-deep-sage",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function deriveMilestones(
  client: TeacherClient,
  sessions: TeacherSession[]
): ClientMilestone[] {
  const completed = sessions
    .filter((s) => s.status === "completed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const uniqueDisciplines = new Set(completed.map((s) => s.discipline));

  const milestones: ClientMilestone[] = [
    {
      title: "First session",
      achieved: completed.length >= 1,
      date: completed[0]?.date,
    },
    {
      title: "5th session",
      achieved: completed.length >= 5,
      date: completed[4]?.date,
    },
    {
      title: "10th session",
      achieved: completed.length >= 10,
      date: completed[9]?.date,
    },
    {
      title: "Tried 2 disciplines",
      achieved: uniqueDisciplines.size >= 2,
      date:
        uniqueDisciplines.size >= 2
          ? completed.find((s) => {
              const seen = new Set<string>();
              for (const c of completed) {
                seen.add(c.discipline);
                if (seen.size >= 2) return c.id === s.id;
              }
              return false;
            })?.date
          : undefined,
    },
    {
      title: "3 months active",
      achieved:
        completed.length >= 2 &&
        new Date(completed[completed.length - 1].date).getTime() -
          new Date(completed[0].date).getTime() >=
          90 * 24 * 60 * 60 * 1000,
    },
  ];

  return milestones;
}

interface IndividualJourneyProps {
  client: TeacherClient;
  sessions: TeacherSession[];
}

export default function IndividualJourney({
  client,
  sessions,
}: IndividualJourneyProps) {
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const disciplineCounts: Partial<Record<Discipline, number>> = {};
  for (const s of completedSessions) {
    disciplineCounts[s.discipline] = (disciplineCounts[s.discipline] || 0) + 1;
  }
  const disciplineEntries = Object.entries(disciplineCounts).sort(
    ([, a], [, b]) => b - a
  ) as [Discipline, number][];

  const uniqueDisciplineCount = new Set(
    completedSessions.map((s) => s.discipline)
  ).size;

  const milestones = deriveMilestones(client, sessions);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className={`${avatarColor(client.name)} flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white`}
        >
          {client.initials}
        </div>
        <div>
          <h2 className="font-display text-2xl text-neutral-900">
            {client.name}
          </h2>
          <p className="text-sm text-neutral-500">
            Client since {client.memberSince}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5">
          <p className="text-2xl font-bold text-neutral-900">
            {completedSessions.length}
          </p>
          <p className="text-sm text-neutral-500">Sessions Completed</p>
        </div>
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5">
          <p className="text-2xl font-bold text-neutral-900">
            {uniqueDisciplineCount}
          </p>
          <p className="text-sm text-neutral-500">Disciplines Practiced</p>
        </div>
      </div>

      {/* Discipline breakdown for this client */}
      {disciplineEntries.length > 0 && (
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
          <h3 className="font-display text-lg text-neutral-900 mb-4">
            Discipline Breakdown
          </h3>
          <div className="space-y-3">
            {disciplineEntries.map(([discipline, count]) => {
              const pct = Math.round(
                (count / completedSessions.length) * 100
              );
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
                  <div className="h-2.5 w-full rounded-full bg-neutral-100">
                    <div
                      className="h-2.5 rounded-full transition-all"
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
      )}

      {/* Milestones */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <h3 className="font-display text-lg text-neutral-900 mb-4">
          Milestones
        </h3>
        <div className="flex flex-wrap gap-2">
          {milestones.map((m) => (
            <span
              key={m.title}
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                m.achieved
                  ? "bg-electric-teal/10 text-electric-teal"
                  : "bg-neutral-100 text-neutral-300"
              }`}
            >
              {m.title}
              {m.achieved && m.date && (
                <span className="ml-1 opacity-60">{m.date}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Session timeline */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <h3 className="font-display text-lg text-neutral-900 mb-4">
          Session Timeline
        </h3>
        {sortedSessions.length === 0 ? (
          <p className="text-sm text-neutral-500">No sessions yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-3 rounded-xl border border-neutral-100 p-3"
              >
                <div className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: DISCIPLINE_COLORS[session.discipline] }} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={`${DISCIPLINE_TAG_COLORS[session.discipline]} rounded-full px-2 py-0.5 text-[10px] font-medium`}
                    >
                      {session.discipline}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {session.date}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-700">
                    {session.time} &middot; {session.duration} min &middot;{" "}
                    <span
                      className={`font-medium ${
                        session.status === "completed"
                          ? "text-lime-sage"
                          : session.status === "cancelled"
                          ? "text-vivid-coral"
                          : "text-bright-amber"
                      }`}
                    >
                      {session.status}
                    </span>
                  </p>
                  {session.hasNotes && (
                    <div className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                      <FileText size={12} />
                      <span>Has notes</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Teacher notes */}
      {client.notes.length > 0 && (
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
          <h3 className="font-display text-lg text-neutral-900 mb-4">
            Teacher Notes
          </h3>
          <div className="space-y-3">
            {[...client.notes]
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl border border-neutral-100 p-3"
                >
                  <p className="text-xs text-neutral-400 mb-1">{note.date}</p>
                  <p className="text-sm text-neutral-700">{note.text}</p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
