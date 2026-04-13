"use client";

import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { teacherClients } from "@/lib/teacher/data";
import type { Discipline } from "@/lib/teachers";

const DISCIPLINE_COLORS: Record<Discipline, string> = {
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

export default function ClientProgressList() {
  const [search, setSearch] = useState("");

  const filtered = teacherClients.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Client Progress
      </h3>

      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
        />
        <input
          type="text"
          placeholder="Search clients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border border-neutral-100 bg-neutral-100/50 py-2 pl-9 pr-4 text-sm text-neutral-900 outline-none transition-colors focus:border-electric-teal focus:bg-white"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((client) => {
          const progressWidth = Math.min((client.totalSessions / 10) * 100, 100);
          return (
            <Link
              key={client.id}
              href={`/teacher/journey/${client.id}`}
              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-warm-sand/50"
            >
              <div
                className={`${avatarColor(client.name)} flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white`}
              >
                {client.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="truncate font-medium text-neutral-900 text-sm">
                    {client.name}
                  </p>
                  <span className="ml-2 shrink-0 text-xs text-neutral-500">
                    {client.lastSessionDate}
                  </span>
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-neutral-500">
                    {client.totalSessions} sessions
                  </span>
                  {client.disciplines.map((d) => (
                    <span
                      key={d}
                      className={`${DISCIPLINE_COLORS[d]} rounded-full px-2 py-0.5 text-[10px] font-medium`}
                    >
                      {d}
                    </span>
                  ))}
                </div>

                <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-100">
                  <div
                    className="h-1.5 rounded-full bg-electric-teal transition-all"
                    style={{ width: `${progressWidth}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-neutral-500">
            No clients match your search.
          </p>
        )}
      </div>
    </div>
  );
}
