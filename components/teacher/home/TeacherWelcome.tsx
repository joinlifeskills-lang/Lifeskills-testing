"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { teacherProfile, teacherSessions, pendingBookings } from "@/lib/teacher/data";

const TODAY = "2026-04-09";

export default function TeacherWelcome() {
  const todayCount = teacherSessions.filter(
    (s) => s.date === TODAY && s.status !== "cancelled"
  ).length;
  const pendingCount = pendingBookings.length;

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="rounded-2xl bg-deep-sage p-6 md:p-8">
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-display text-2xl text-white">
          {greeting}, {teacherProfile.firstName}!
        </h2>
        <div className="flex items-center gap-3 shrink-0 ml-4">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell size={20} className="text-white" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-vivid-coral ring-2 ring-deep-sage" />
          </button>
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-semibold">
            {teacherProfile.avatarInitials}
          </div>
        </div>
      </div>
      <p className="text-white/80 text-sm md:text-base">
        You have {todayCount} session{todayCount !== 1 ? "s" : ""} today and{" "}
        {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}.
      </p>
      <Link
        href="/teacher-dashboard/sessions"
        className="inline-block mt-4 bg-white text-deep-sage rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-white/90 transition-colors"
      >
        View Schedule
      </Link>
    </div>
  );
}
