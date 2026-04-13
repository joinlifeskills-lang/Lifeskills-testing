"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { teacherNotificationPrefs } from "@/lib/teacher/data";
import type { TeacherNotificationPrefs } from "@/lib/teacher/types";

const PREF_LABELS: { key: keyof TeacherNotificationPrefs; label: string; description: string }[] = [
  { key: "newBookingEmail", label: "New Booking Email", description: "Receive an email when a client books a session" },
  { key: "sessionReminder", label: "Session Reminder", description: "Get reminded 15 minutes before each session" },
  { key: "newMessage", label: "New Message", description: "Notification when a client sends you a message" },
  { key: "newReview", label: "New Review", description: "Notification when a client leaves a review" },
  { key: "marketingEmails", label: "Marketing Emails", description: "Receive updates about Lifeskills features and tips" },
];

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all ${
        on ? "bg-electric-teal" : "bg-neutral-300"
      }`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
        style={{ height: 18, width: 18 }}
      />
    </button>
  );
}

export default function TeacherNotifications() {
  const [prefs, setPrefs] = useState<TeacherNotificationPrefs>({ ...teacherNotificationPrefs });
  const [expanded, setExpanded] = useState(true);

  function toggle(key: keyof TeacherNotificationPrefs) {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-6 py-5 md:cursor-default"
      >
        <h3 className="font-display text-lg text-neutral-900">Notifications</h3>
        <span className="md:hidden">
          {expanded ? <ChevronUp size={18} className="text-neutral-400" /> : <ChevronDown size={18} className="text-neutral-400" />}
        </span>
      </button>

      <div className={`px-6 pb-6 ${expanded ? "block" : "hidden"} md:block`}>
        <div className="divide-y divide-neutral-100">
          {PREF_LABELS.map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div className="pr-4">
                <p className="text-sm font-medium text-neutral-900">{label}</p>
                <p className="text-xs text-neutral-500">{description}</p>
              </div>
              <Toggle on={prefs[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
