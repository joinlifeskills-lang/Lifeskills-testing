"use client";

import { useState, useMemo } from "react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import TeacherSessionCard from "@/components/teacher/sessions/TeacherSessionCard";
import RequestCard from "@/components/teacher/sessions/RequestCard";
import { teacherSessions, pendingBookings } from "@/lib/teacher/data";

const TODAY = "2026-04-09";

type Tab = "requests" | "today" | "upcoming" | "past" | "cancelled";

const tabs: { key: Tab; label: string }[] = [
  { key: "requests", label: "Requests" },
  { key: "today", label: "Today" },
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

export default function TeacherSessionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("requests");

  const todaySessions = useMemo(
    () =>
      teacherSessions
        .filter((s) => s.date === TODAY && s.status !== "cancelled")
        .sort((a, b) => a.time.localeCompare(b.time)),
    []
  );

  const upcomingSessions = useMemo(
    () =>
      teacherSessions
        .filter((s) => s.date > TODAY && s.status === "confirmed")
        .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    []
  );

  const pastSessions = useMemo(
    () =>
      teacherSessions
        .filter((s) => s.status === "completed")
        .sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const cancelledSessions = useMemo(
    () =>
      teacherSessions
        .filter((s) => s.status === "cancelled")
        .sort((a, b) => b.date.localeCompare(a.date)),
    []
  );

  const counts: Record<Tab, number> = {
    requests: pendingBookings.length,
    today: todaySessions.length,
    upcoming: upcomingSessions.length,
    past: pastSessions.length,
    cancelled: cancelledSessions.length,
  };

  const sessionsMap: Record<Exclude<Tab, "requests">, typeof teacherSessions> = {
    today: todaySessions,
    upcoming: upcomingSessions,
    past: pastSessions,
    cancelled: cancelledSessions,
  };

  const emptyMessages: Record<Tab, string> = {
    requests: "No new session requests.",
    today: "No sessions scheduled for today.",
    upcoming: "No upcoming sessions.",
    past: "No past sessions yet.",
    cancelled: "No cancelled sessions.",
  };

  const currentSessions = activeTab !== "requests" ? sessionsMap[activeTab] : [];

  // Check if there's a live/imminent confirmed session today
  const hasLiveSession = todaySessions.some(
    (s) => s.status === "confirmed" || s.status === "in_progress"
  );

  return (
    <>
      <TeacherTopBar />
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <h2 className="font-display text-xl text-neutral-900">Sessions</h2>

        {/* Tabs */}
        <div className="inline-flex rounded-xl bg-neutral-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 text-xs ${
                  tab.key === "requests" && counts.requests > 0
                    ? "text-bright-amber font-semibold"
                    : "text-neutral-400"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        {/* Sessions list */}
        {activeTab === "requests" ? (
          pendingBookings.length === 0 ? (
            <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 text-center">
              <p className="text-sm text-neutral-500">{emptyMessages.requests}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <RequestCard key={booking.id} booking={booking} />
              ))}
            </div>
          )
        ) : currentSessions.length === 0 ? (
          <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 text-center">
            <p className="text-sm text-neutral-500">{emptyMessages[activeTab]}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentSessions.map((session) => (
              <TeacherSessionCard key={session.id} session={session} />
            ))}
          </div>
        )}

        {/* Sticky mobile Join Session */}
        {hasLiveSession && (
          <div className="fixed bottom-20 left-0 right-0 z-40 px-4 lg:hidden">
            <button className="w-full rounded-full bg-energy-gradient py-3 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90">
              Join Session
            </button>
          </div>
        )}
      </div>
    </>
  );
}
