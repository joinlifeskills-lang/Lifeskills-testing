"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import MemberTopBar from "@/components/member/layout/MemberTopBar";
import SessionCard from "@/components/member/sessions/SessionCard";
import { memberSessions } from "@/lib/member/data";

type TabValue = "upcoming" | "past" | "cancelled";

const tabs: { label: string; value: TabValue }[] = [
  { label: "Upcoming", value: "upcoming" },
  { label: "Past", value: "past" },
  { label: "Cancelled", value: "cancelled" },
];

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<TabValue>("upcoming");

  const upcoming = useMemo(
    () =>
      memberSessions
        .filter((s) => s.status === "confirmed")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    []
  );

  const past = useMemo(
    () =>
      memberSessions
        .filter((s) => s.status === "completed")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const cancelled = useMemo(
    () =>
      memberSessions
        .filter((s) => s.status === "cancelled")
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );

  const counts: Record<TabValue, number> = {
    upcoming: upcoming.length,
    past: past.length,
    cancelled: cancelled.length,
  };

  const filtered =
    activeTab === "upcoming"
      ? upcoming
      : activeTab === "past"
      ? past
      : cancelled;

  const emptyMessages: Record<TabValue, string> = {
    upcoming: "No upcoming sessions",
    past: "No past sessions yet",
    cancelled: "No cancelled sessions",
  };

  return (
    <>
      <MemberTopBar />

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Tab bar */}
        <div className="flex gap-1 overflow-x-auto rounded-xl bg-neutral-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.value
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[0.65rem] font-bold ${
                  activeTab === tab.value
                    ? "bg-deep-sage text-white"
                    : "bg-neutral-300/50 text-neutral-500"
                }`}
              >
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        {/* Session list */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 text-center">
            <p className="text-neutral-500 text-sm">{emptyMessages[activeTab]}</p>
            {activeTab === "upcoming" && (
              <Link
                href="/customer-dashboard/explore"
                className="inline-block mt-4 bg-deep-sage text-white rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-deep-sage-hover transition-colors"
              >
                Find a Teacher
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </div>

    </>
  );
}
