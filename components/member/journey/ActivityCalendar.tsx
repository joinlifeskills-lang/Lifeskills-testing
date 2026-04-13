"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { activityCalendar } from "@/lib/member/data";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export default function ActivityCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 3, 1)); // April 2026

  const activityDates = useMemo(() => {
    const set = new Set<string>();
    activityCalendar.forEach((d) => set.add(d.date));
    return set;
  }, []);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function nextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }

  // Build grid cells: leading blanks + days
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg text-neutral-900">Activity</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft size={18} className="text-neutral-500" />
          </button>
          <span className="text-sm font-medium text-neutral-700 min-w-[120px] text-center">
            {monthLabel}
          </span>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight size={18} className="text-neutral-500" />
          </button>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAY_LABELS.map((label, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-neutral-400 py-1"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;
          const hasSession = activityDates.has(dateStr);

          return (
            <div
              key={dateStr}
              className="flex flex-col items-center justify-center py-1.5"
            >
              <span className="text-sm text-neutral-700">{day}</span>
              <div className="h-1.5 mt-0.5">
                {hasSession && (
                  <div className="h-1.5 w-1.5 rounded-full bg-electric-teal" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
