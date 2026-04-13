"use client";

import { useState } from "react";
import { Plus, X, CalendarOff, Check } from "lucide-react";
import { weeklySchedule, blockedDates as initialBlocked, teacherProfile } from "@/lib/teacher/data";
import type { TimeSlot, BlockedDate } from "@/lib/teacher/types";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAY_ABBR = ["M", "T", "W", "T", "F", "S", "S"];

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

export default function AvailabilityEditor() {
  const [schedule, setSchedule] = useState<Record<string, TimeSlot[]>>({ ...weeklySchedule });
  const [blocked, setBlocked] = useState<BlockedDate[]>([...initialBlocked]);
  const [timezone, setTimezone] = useState(teacherProfile.timezone);
  const [selectedDay, setSelectedDay] = useState(0);
  const [addingBlocked, setAddingBlocked] = useState(false);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");

  // Desktop inline editing
  const [editingSlot, setEditingSlot] = useState<{ day: string; idx: number } | null>(null);
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  function openEdit(day: string, idx: number, slot: TimeSlot) {
    setEditingSlot({ day, idx });
    setEditStart(slot.start);
    setEditEnd(slot.end);
  }

  function saveEdit() {
    if (!editingSlot) return;
    updateSlot(editingSlot.day, editingSlot.idx, "start", editStart);
    updateSlot(editingSlot.day, editingSlot.idx, "end", editEnd);
    setEditingSlot(null);
  }

  function addSlot(day: string) {
    setSchedule((prev) => ({
      ...prev,
      [day]: [...(prev[day] || []), { start: "9:00 AM", end: "10:00 AM" }],
    }));
  }

  function removeSlot(day: string, idx: number) {
    if (editingSlot?.day === day && editingSlot?.idx === idx) setEditingSlot(null);
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
        <label className="mb-1.5 block text-sm font-medium text-neutral-700">Timezone</label>
        <select
          className={inputClass + " w-full max-w-xs"}
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/Denver">Mountain Time (MT)</option>
          <option value="America/Chicago">Central Time (CT)</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="Europe/London">GMT / London</option>
          <option value="Europe/Berlin">CET / Berlin</option>
          <option value="Asia/Tokyo">JST / Tokyo</option>
        </select>
      </div>

      {/* ── Weekly Schedule ── */}
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
        <h3 className="mb-1 font-display text-lg text-neutral-900">Weekly Availability</h3>
        <p className="mb-5 text-xs text-neutral-400">Click any time slot to edit its hours.</p>

        {/* Desktop grid */}
        <div className="hidden gap-2 md:grid md:grid-cols-7">
          {DAYS.map((day) => (
            <div key={day} className="space-y-2">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-neutral-500">
                {day.slice(0, 3)}
              </p>

              {(schedule[day] || []).map((slot, i) => {
                const isEditing =
                  editingSlot?.day === day && editingSlot?.idx === i;

                if (isEditing) {
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-electric-teal bg-white p-2 shadow-sm space-y-1.5"
                    >
                      <div>
                        <p className="mb-0.5 text-[10px] font-medium text-neutral-400">Start</p>
                        <select
                          value={editStart}
                          onChange={(e) => setEditStart(e.target.value)}
                          className="w-full rounded-md border border-neutral-200 px-1.5 py-1 text-[11px] text-neutral-900 outline-none focus:border-electric-teal"
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <p className="mb-0.5 text-[10px] font-medium text-neutral-400">End</p>
                        <select
                          value={editEnd}
                          onChange={(e) => setEditEnd(e.target.value)}
                          className="w-full rounded-md border border-neutral-200 px-1.5 py-1 text-[11px] text-neutral-900 outline-none focus:border-electric-teal"
                        >
                          {TIME_OPTIONS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-1 pt-0.5">
                        <button
                          onClick={saveEdit}
                          className="flex flex-1 items-center justify-center rounded-md bg-electric-teal py-1.5 text-[10px] font-semibold text-white"
                        >
                          <Check size={11} strokeWidth={3} />
                        </button>
                        <button
                          onClick={() => { removeSlot(day, i); }}
                          className="flex flex-1 items-center justify-center rounded-md border border-neutral-200 py-1.5 text-[10px] font-semibold text-neutral-400 hover:border-vivid-coral hover:text-vivid-coral transition-colors"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={i}
                    onClick={() => openEdit(day, i, slot)}
                    className="group relative cursor-pointer rounded-lg border border-electric-teal bg-electric-teal/10 px-2 py-2 text-xs text-neutral-700 transition-colors hover:bg-electric-teal/20"
                  >
                    <p className="font-semibold text-neutral-800">{slot.start}</p>
                    <p className="text-neutral-500">{slot.end}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSlot(day, i); }}
                      className="absolute -right-1.5 -top-1.5 hidden h-5 w-5 items-center justify-center rounded-full bg-white text-neutral-400 shadow hover:text-vivid-coral group-hover:flex"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}

              <button
                onClick={() => addSlot(day)}
                className="flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-neutral-300 py-2 text-xs text-neutral-500 transition-colors hover:border-electric-teal hover:text-electric-teal"
              >
                <Plus size={12} /> Add
              </button>
            </div>
          ))}
        </div>

        {/* Mobile day tabs */}
        <div className="md:hidden">
          <div className="mb-4 flex gap-1 rounded-xl bg-neutral-100 p-1">
            {DAYS.map((day, i) => (
              <button
                key={day}
                onClick={() => setSelectedDay(i)}
                className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-colors ${
                  selectedDay === i
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-500"
                }`}
              >
                {DAY_ABBR[i]}
              </button>
            ))}
          </div>

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
            <button
              onClick={() => addSlot(DAYS[selectedDay])}
              className="flex items-center gap-1.5 text-sm font-semibold text-electric-teal"
            >
              <Plus size={15} /> Add Time Slot
            </button>
          </div>
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
