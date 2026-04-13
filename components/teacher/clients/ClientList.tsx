"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronDown } from "lucide-react";
import type { TeacherClient } from "@/lib/teacher/types";

const DISCIPLINE_COLORS: Record<string, string> = {
  Breathwork: "bg-[#0BA89A]/10 text-[#0BA89A]",
  Meditation: "bg-[#6BAA3E]/10 text-[#6BAA3E]",
  Yoga: "bg-[#D4940A]/10 text-[#D4940A]",
  Somatic: "bg-[#E8603A]/10 text-[#E8603A]",
};

const AVATAR_COLORS = [
  "bg-[#0BA89A]",
  "bg-[#6BAA3E]",
  "bg-[#D4940A]",
  "bg-[#E8603A]",
  "bg-[#6B5BAA]",
  "bg-deep-sage",
];

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type SortOption = "recent" | "sessions" | "alpha";

export default function ClientList({ clients }: { clients: TeacherClient[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("recent");
  const [sortOpen, setSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    recent: "Most Recent",
    sessions: "Most Sessions",
    alpha: "Alphabetical",
  };

  const filtered = useMemo(() => {
    let list = clients.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "recent") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.lastSessionDate).getTime() -
          new Date(a.lastSessionDate).getTime()
      );
    } else if (sort === "sessions") {
      list = [...list].sort((a, b) => b.totalSessions - a.totalSessions);
    } else {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [clients, search, sort]);

  return (
    <div className="space-y-4">
      {/* Search + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            placeholder="Search clients by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 hover:border-neutral-300"
          >
            {sortLabels[sort]}
            <ChevronDown size={16} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-xl border border-neutral-100 bg-white py-1 shadow-lg">
              {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setSort(key);
                    setSortOpen(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 ${
                    sort === key ? "font-medium text-electric-teal" : "text-neutral-700"
                  }`}
                >
                  {sortLabels[key]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Sessions</th>
                <th className="px-6 py-3">Last Session</th>
                <th className="px-6 py-3">Disciplines</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-neutral-50 last:border-0 hover:bg-neutral-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColor(
                          client.name
                        )}`}
                      >
                        {client.initials}
                      </div>
                      <span className="font-medium text-neutral-900">
                        {client.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {client.totalSessions}
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-700">
                    {formatDate(client.lastSessionDate)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {client.disciplines.map((d) => (
                        <span
                          key={d}
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            DISCIPLINE_COLORS[d] ?? "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/teacher/clients/${client.id}`}
                      className="inline-block rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage transition-colors hover:bg-deep-sage hover:text-white"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="px-6 py-12 text-center text-sm text-neutral-500">
              No clients found.
            </p>
          )}
        </div>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden">
        {filtered.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${avatarColor(
                    client.name
                  )}`}
                >
                  {client.initials}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{client.name}</p>
                  <p className="text-xs text-neutral-500">
                    {client.totalSessions} sessions &middot; Last{" "}
                    {formatDate(client.lastSessionDate)}
                  </p>
                </div>
              </div>
              <Link
                href={`/teacher/clients/${client.id}`}
                className="shrink-0 rounded-full border border-deep-sage px-4 py-1.5 text-xs font-semibold text-deep-sage"
              >
                View
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {client.disciplines.map((d) => (
                <span
                  key={d}
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    DISCIPLINE_COLORS[d] ?? "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">
            No clients found.
          </p>
        )}
      </div>
    </div>
  );
}
