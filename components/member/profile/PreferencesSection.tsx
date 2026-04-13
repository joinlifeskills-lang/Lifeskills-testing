"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { notificationPrefs, memberProfile } from "@/lib/member/data";
import type { Discipline } from "@/lib/teachers";

const sessionLengths = [30, 45, 60, 90];

const allDisciplines: Discipline[] = [
  "Breathwork",
  "Meditation",
  "Yoga",
  "Somatic",
  "Reiki",
];

const disciplineColors: Record<Discipline, string> = {
  Breathwork: "bg-electric-teal/10 text-electric-teal border-electric-teal/30",
  Meditation: "bg-deep-sage/10 text-deep-sage border-deep-sage/30",
  Yoga: "bg-lime-sage/10 text-lime-sage border-lime-sage/30",
  Somatic: "bg-bright-amber/10 text-bright-amber border-bright-amber/30",
  Reiki: "bg-pink-50 text-pink-600 border-pink-200",
};

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}

function ToggleSwitch({ enabled, onToggle, label }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-sm text-neutral-700">{label}</span>
      <button
        onClick={onToggle}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-electric-teal" : "bg-neutral-300"
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function PreferencesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [emailReminders, setEmailReminders] = useState(notificationPrefs.emailReminders);
  const [smsReminders, setSmsReminders] = useState(notificationPrefs.smsReminders);
  const [marketingEmails, setMarketingEmails] = useState(notificationPrefs.marketingEmails);
  const [sessionLength, setSessionLength] = useState(memberProfile.preferredSessionLength);
  const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(
    memberProfile.preferredDisciplines
  );

  const toggleDiscipline = (d: Discipline) => {
    setSelectedDisciplines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 md:cursor-default"
      >
        <h3 className="font-display text-lg text-neutral-900">Preferences</h3>
        <ChevronDown
          size={20}
          className={`text-neutral-400 transition-transform md:hidden ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Content */}
      <div className={`${isOpen ? "block" : "hidden"} md:block px-6 pb-6`}>
        {/* Notification toggles */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
            Notifications
          </h4>
          <div className="divide-y divide-neutral-100">
            <ToggleSwitch
              enabled={emailReminders}
              onToggle={() => setEmailReminders(!emailReminders)}
              label="Email Reminders"
            />
            <ToggleSwitch
              enabled={smsReminders}
              onToggle={() => setSmsReminders(!smsReminders)}
              label="SMS Reminders"
            />
            <ToggleSwitch
              enabled={marketingEmails}
              onToggle={() => setMarketingEmails(!marketingEmails)}
              label="Marketing Emails"
            />
          </div>
        </div>

        {/* Session preferences */}
        <div className="mt-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Session Preferences
          </h4>

          {/* Session length */}
          <p className="text-sm text-neutral-700 mb-2">Preferred session length</p>
          <div className="flex flex-wrap gap-2 mb-5">
            {sessionLengths.map((len) => (
              <button
                key={len}
                onClick={() => setSessionLength(len)}
                className={`rounded-full text-sm font-medium py-2 px-4 transition-colors ${
                  sessionLength === len
                    ? "bg-electric-teal text-white"
                    : "bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                {len} min
              </button>
            ))}
          </div>

          {/* Disciplines */}
          <p className="text-sm text-neutral-700 mb-2">Preferred disciplines</p>
          <div className="flex flex-wrap gap-2">
            {allDisciplines.map((d) => {
              const selected = selectedDisciplines.includes(d);
              return (
                <label
                  key={d}
                  className={`flex items-center gap-2 rounded-full border text-sm font-medium py-2 px-4 cursor-pointer transition-colors ${
                    selected
                      ? disciplineColors[d]
                      : "bg-neutral-50 text-neutral-500 border-neutral-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleDiscipline(d)}
                    className="sr-only"
                  />
                  <span
                    className={`h-3.5 w-3.5 rounded border flex items-center justify-center ${
                      selected
                        ? "border-current bg-current"
                        : "border-neutral-300"
                    }`}
                  >
                    {selected && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  {d}
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
