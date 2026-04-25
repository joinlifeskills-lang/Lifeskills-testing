"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import type { TeacherClient } from "@/lib/teacher/types";

const AVATAR_COLORS = ["#0BA89A", "#6BAA3E", "#D4940A", "#E8603A", "#6B5BAA", "#2D4A3E"];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}


interface ClientInfo {
  client: TeacherClient;
  activeGoal: string | null;
  allSg: { completedToday: boolean; completionHistory: string[] }[];
  doneCount: number;
  allDone: boolean;
  hasPractices: boolean;
  unreplied: number;
  hasDraftGoal: boolean;
  lastEntryDate: string | null;
  needsAttention: boolean;
  attentionReason: string | null;
}

export default function ClientJourneyList({ clients }: { clients: TeacherClient[] }) {
  const { goals, entries } = useJourneyStore();
  const [search, setSearch] = useState("");

  const clientInfos: ClientInfo[] = useMemo(() => {
    return clients.map((client) => {
      const clientGoals = goals.filter((g) => g.clientId === client.id && g.status === "active");
      const activeGoal = clientGoals[0]?.title ?? null;
      const allSg = clientGoals.flatMap((g) => g.subGoals);
      const doneCount = allSg.filter((sg) => sg.completedToday).length;
      const allDone = allSg.length > 0 && doneCount === allSg.length;
      const hasPractices = allSg.length > 0;

      const clientEntries = entries.filter((e) => e.clientId === client.id);
      const unreplied = clientEntries.filter((e) => !e.teacherComment).length;
      const lastEntryDate = clientEntries[0]?.createdAt ?? null;

      const hasDraftGoal = goals.some((g) => g.clientId === client.id && g.status === "draft");

      // Needs attention logic
      let needsAttention = false;
      let attentionReason: string | null = null;

      if (unreplied > 0) {
        needsAttention = true;
        attentionReason = unreplied === 1 ? "Journal entry needs a reply" : `${unreplied} entries need replies`;
      } else if (hasDraftGoal) {
        needsAttention = true;
        attentionReason = "Goal draft waiting";
      } else if (hasPractices && !allDone && doneCount === 0) {
        needsAttention = true;
        attentionReason = "No practices completed today";
      }

      return { client, activeGoal, allSg, doneCount, allDone, hasPractices, unreplied, hasDraftGoal, lastEntryDate, needsAttention, attentionReason };
    });
  }, [clients, goals, entries]);

  const filtered = useMemo(() => {
    let list = clientInfos.filter((ci) =>
      ci.client.name.toLowerCase().includes(search.toLowerCase())
    );

    list = [...list].sort((a, b) => a.client.name.localeCompare(b.client.name));

    return list;
  }, [clientInfos, search]);

  // 7-day streak dots
  function StreakDots({ ci }: { ci: ClientInfo }) {
    const today = new Date().toISOString().slice(0, 10);
    const dots: boolean[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().slice(0, 10);
      const isToday = ds === today;
      const done = isToday
        ? ci.allSg.length > 0 && ci.allSg.every((s) => s.completedToday)
        : ci.allSg.length > 0 && ci.allSg.every((s) => s.completionHistory.includes(ds));
      dots.push(done);
    }
    return (
      <div className="flex items-center gap-1">
        {dots.map((done, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${done ? "bg-electric-teal" : "bg-neutral-300"}`}
          />
        ))}
      </div>
    );
  }

  function StatusPill({ ci }: { ci: ClientInfo }) {
    if (!ci.hasPractices) {
      return (
        <span className="font-sans text-[0.6rem] font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-500">
          No practices set
        </span>
      );
    }
    if (ci.allDone) {
      return (
        <span className="font-sans text-[0.6rem] font-semibold px-2 py-0.5 rounded-full bg-electric-teal/10 text-electric-teal">
          Active
        </span>
      );
    }
    return (
      <span className="font-sans text-[0.6rem] font-semibold px-2 py-0.5 rounded-full bg-bright-amber/10 text-bright-amber">
        Not yet today
      </span>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          placeholder="Search clients by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-[0_4px_24px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-electric-teal/30"
        />
      </div>

      {/* All Clients grid */}
      <div>
        <p className="font-sans text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
          All Clients
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((ci) => (
            <Link
              key={ci.client.id}
              href={`/teacher-dashboard/clients/${ci.client.id}/client-journey`}
              className="bg-white rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: getAvatarColor(ci.client.name) }}
                >
                  {ci.client.initials}
                </div>
                <p className="font-sans text-sm font-semibold text-deep-sage truncate">
                  {ci.client.name}
                </p>
              </div>

              {/* Active goal */}
              {ci.activeGoal ? (
                <p className="font-display text-sm text-deep-sage/80 italic leading-snug mb-3 line-clamp-2">
                  {ci.activeGoal}
                </p>
              ) : (
                <p className="font-sans text-xs text-neutral-300 italic mb-3">
                  No active goals
                </p>
              )}

              {/* 7-day streak + status */}
              <div className="flex items-center justify-between">
                <StreakDots ci={ci} />
                <StatusPill ci={ci} />
              </div>

              {/* Last journal */}
              {ci.lastEntryDate && (
                <p className="font-sans text-[0.6rem] text-neutral-500 mt-3">
                  Last reflection:{" "}
                  {new Date(ci.lastEntryDate + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">
            No clients found.
          </p>
        )}
      </div>
    </div>
  );
}
