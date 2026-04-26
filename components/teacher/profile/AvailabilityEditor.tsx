"use client";

import { useState, useEffect } from "react";
import { Plus, X, CalendarOff, Globe } from "lucide-react";
import { weeklySchedule, blockedDates as initialBlocked, teacherProfile } from "@/lib/teacher/data";
import type { TimeSlot, BlockedDate } from "@/lib/teacher/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_ABBR = ["M", "T", "W", "T", "F", "S", "S"];

const TIMEZONES = [
  { value: "Pacific/Honolulu", label: "Hawaii (HST)" },
  { value: "America/Anchorage", label: "Alaska (AKST)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Halifax", label: "Atlantic Time (AT)" },
  { value: "America/Sao_Paulo", label: "Brasilia (BRT)" },
  { value: "America/Argentina/Buenos_Aires", label: "Argentina (ART)" },
  { value: "Atlantic/Reykjavik", label: "Iceland (GMT)" },
  { value: "Europe/London", label: "London (GMT/BST)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Europe/Berlin", label: "Berlin (CET)" },
  { value: "Europe/Madrid", label: "Madrid (CET)" },
  { value: "Europe/Rome", label: "Rome (CET)" },
  { value: "Europe/Athens", label: "Athens (EET)" },
  { value: "Europe/Moscow", label: "Moscow (MSK)" },
  { value: "Africa/Cairo", label: "Cairo (EET)" },
  { value: "Africa/Johannesburg", label: "Johannesburg (SAST)" },
  { value: "Africa/Lagos", label: "Lagos (WAT)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Karachi", label: "Karachi (PKT)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Dhaka", label: "Dhaka (BST)" },
  { value: "Asia/Bangkok", label: "Bangkok (ICT)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Shanghai", label: "China (CST)" },
  { value: "Asia/Hong_Kong", label: "Hong Kong (HKT)" },
  { value: "Asia/Seoul", label: "Seoul (KST)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Perth", label: "Perth (AWST)" },
  { value: "Australia/Adelaide", label: "Adelaide (ACST)" },
  { value: "Australia/Sydney", label: "Sydney (AEST)" },
  { value: "Pacific/Auckland", label: "Auckland (NZST)" },
];

/** Half-hour increments from 5:00 AM to 11:30 PM */
function buildTimeOptions(): string[] {
  const times: string[] = [];
  for (let h = 5; h <= 23; h++) {
    for (const m of [0, 30]) {
      const h12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? "AM" : "PM";
      times.push(`${h12}:${m === 0 ? "00" : "30"} ${ampm}`);
    }
  }
  return times;
}
const TIME_OPTIONS = buildTimeOptions();

function getCurrentTimeInTz(tz: string): string {
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

function getTzAbbr(tz: string): string {
  try {
    return new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      timeZoneName: "short",
    }).split(" ").pop() ?? "";
  } catch {
    return "";
  }
}

export default function AvailabilityEditor() {
  const [schedule, setSchedule] = useState<Record<string, TimeSlot[]>>({ ...weeklySchedule });
  const [blocked, setBlocked] = useState<BlockedDate[]>([...initialBlocked]);
  const [timezone, setTimezone] = useState(teacherProfile.timezone);
  const [selectedDay, setSelectedDay] = useState(0);
  const [addingBlocked, setAddingBlocked] = useState(false);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInTz(teacherProfile.timezone));

  useEffect(() => {
    setCurrentTime(getCurrentTimeInTz(timezone));
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeInTz(timezone));
    }, 30000);
    return () => clearInterval(interval);
  }, [timezone]);

  function addSlot(day: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "9:00 AM", end: "10:00 AM" }],
    }));
  }

  function removeSlot(day: string, idx: number) {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== idx),
    }));
  }

  function updateSlot(day: string, idx: number, field: "start" | "end", value: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day].map((s, i) => (i === idx ? { ...s, [field]: value } : s)),
    }));
  }

  function addBlockedDate() {
    if (!newBlockedDate) return;
    setBlocked((prev) => [...prev, { date: newBlockedDate, reason: newBlockedReason }]);
    setNewBlockedDate("");
    setNewBlockedReason("");
    setAddingBlocked(false);
  }

  function removeBlocked(idx: number) {
    setBlocked((prev) => prev.filter((_, i) => i !== idx));
  }

  const inputClass =
    "rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-900 outline-none focus:border-electric-teal transition-colors";

  return (
    <div className="space-y-6">
      {/* ── Timezone ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <label className="mb-1 block text-sm font-medium text-neutral-700">Your Timezone</label>
        <p className="mb-3 text-xs text-neutral-400">
          All availability times are shown in your timezone. Clients will see them converted to their local time automatically.
        </p>
        <select
          className={inputClass + " w-full max-w-sm"}
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          {TIMEZONES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-electric-teal/5 px-4 py-2.5">
          <Globe size={15} className="shrink-0 text-electric-teal" />
          <span className="text-sm text-neutral-700">
            Your current time: <span className="font-semibold">{currentTime}</span>{" "}
            <span className="text-neutral-400">({getTzAbbr(timezone)})</span>
          </span>
        </div>
      </div>

      {/* ── Weekly Schedule ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <h3 className="mb-1 font-display text-lg text-neutral-900">Weekly Availability</h3>
        <p className="mb-5 text-xs text-neutral-400">Set your available hours for each day of the week.</p>

        {/* Day tabs */}
        <div className="mb-4 flex gap-1 rounded-xl bg-neutral-100 p-1">
          {DAYS.map((day, i) => {
            const slotCount = (schedule[day] || []).length;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`relative flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                  selectedDay === i
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500"
                }`}
              >
                <span className="hidden sm:inline">{day.slice(0, 3)}</span>
                <span className="sm:hidden">{DAY_ABBR[i]}</span>
                {slotCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-electric-teal text-[9px] font-bold text-white">
                    {slotCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected day slots */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-neutral-700">{DAYS[selectedDay]}</p>
          {(schedule[DAYS[selectedDay]] || []).map((slot, i) => (
            <div key={i} className="flex items-center gap-2">
              <select
                value={slot.start}
                onChange={(e) => updateSlot(DAYS[selectedDay], i, "start", e.target.value)}
                className={inputClass + " flex-1"}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="text-xs text-neutral-400">–</span>
              <select
                value={slot.end}
                onChange={(e) => updateSlot(DAYS[selectedDay], i, "end", e.target.value)}
                className={inputClass + " flex-1"}
              >
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <button
                onClick={() => removeSlot(DAYS[selectedDay], i)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-vivid-coral/10 hover:text-vivid-coral"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          {(schedule[DAYS[selectedDay]] || []).length === 0 && (
            <p className="py-3 text-center text-sm text-neutral-400">No availability set for {DAYS[selectedDay]}</p>
          )}

          <button
            onClick={() => addSlot(DAYS[selectedDay])}
            className="flex items-center gap-1.5 text-sm font-semibold text-electric-teal"
          >
            <Plus size={15} /> Add Time Slot
          </button>
        </div>
      </div>

      {/* ── Blocked Dates ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg text-neutral-900">Blocked Dates</h3>
          <button
            onClick={() => setAddingBlocked(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-electric-teal"
          >
            <Plus size={15} /> Add Blocked Date
          </button>
        </div>

        {addingBlocked && (
          <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-neutral-200 p-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">Date</label>
              <input
                type="date"
                className={inputClass}
                value={newBlockedDate}
                onChange={(e) => setNewBlockedDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-xs font-medium text-neutral-500">Reason</label>
              <input
                className={inputClass + " w-full"}
                value={newBlockedReason}
                onChange={(e) => setNewBlockedReason(e.target.value)}
                placeholder="Optional reason"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={addBlockedDate}
                className="rounded-full bg-energy-gradient px-4 py-2 text-xs font-semibold text-white"
              >
                Add
              </button>
              <button
                onClick={() => setAddingBlocked(false)}
                className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {blocked.length === 0 ? (
          <p className="text-sm text-neutral-500">No blocked dates.</p>
        ) : (
          <div className="space-y-2">
            {blocked.map((b, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg bg-neutral-50 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <CalendarOff size={16} className="text-vivid-coral" />
                  <div>
                    <p className="text-sm font-medium text-neutral-900">{b.date}</p>
                    {b.reason && <p className="text-xs text-neutral-500">{b.reason}</p>}
                  </div>
                </div>
                <button
                  onClick={() => removeBlocked(i)}
                  className="text-neutral-400 transition-colors hover:text-vivid-coral"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <button className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white transition-opacity hover:opacity-90">
          Save Availability
        </button>
      </div>
    </div>
  );
}
