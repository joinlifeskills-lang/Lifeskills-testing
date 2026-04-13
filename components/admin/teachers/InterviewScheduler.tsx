"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/ui/AdminCard";
import AdminButton from "@/components/admin/ui/AdminButton";
import { CalendarDays } from "lucide-react";

interface InterviewSchedulerProps {
  teacherName: string;
  onSchedule?: (date: string, notes: string) => void;
}

export default function InterviewScheduler({ teacherName, onSchedule }: InterviewSchedulerProps) {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSchedule = () => {
    if (date && onSchedule) {
      onSchedule(date, notes);
      setDate("");
      setNotes("");
    }
  };

  return (
    <AdminCard className="p-6">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays size={20} className="text-deep-sage" />
        <h3 className="font-display text-lg text-neutral-900">Schedule Interview</h3>
      </div>

      <p className="mb-4 text-sm text-neutral-700">
        Schedule an interview with <span className="font-semibold">{teacherName}</span>.
      </p>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Date &amp; Time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any pre-interview notes..."
            rows={3}
            className="w-full rounded-xl border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
          />
        </div>

        <AdminButton onClick={handleSchedule} disabled={!date}>
          Schedule Interview
        </AdminButton>
      </div>
    </AdminCard>
  );
}
