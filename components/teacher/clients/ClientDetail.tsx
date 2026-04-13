"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import type { TeacherClient, TeacherSession, ClientNote } from "@/lib/teacher/types";

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

export default function ClientDetail({
  client,
  sessions,
}: {
  client: TeacherClient;
  sessions: TeacherSession[];
}) {
  const [notes, setNotes] = useState<ClientNote[]>(client.notes);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  function handleSaveNote() {
    if (!noteText.trim()) return;
    const newNote: ClientNote = {
      id: `n-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      text: noteText.trim(),
    };
    setNotes([newNote, ...notes]);
    setNoteText("");
    setShowAddNote(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white ${avatarColor(
              client.name
            )}`}
          >
            {client.initials}
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl text-neutral-900">
              {client.name}
            </h2>
            <p className="text-sm text-neutral-500">
              Member since {formatDate(client.memberSince)} &middot;{" "}
              {client.totalSessions} sessions
            </p>
          </div>
        </div>

        {/* Discipline tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {client.disciplines.map((d) => (
            <span
              key={d}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                DISCIPLINE_COLORS[d] ?? "bg-neutral-100 text-neutral-600"
              }`}
            >
              {d}
            </span>
          ))}
        </div>

        {/* Quick actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white">
            Book a session
          </button>
          <button className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage">
            Send a message
          </button>
          <Link
            href={`/teacher-dashboard/clients/${client.id}/journey`}
            className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage"
          >
            View journey
          </Link>
        </div>
      </div>

      {/* Session history */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <h3 className="font-display text-lg text-neutral-900 mb-4">
          Session History
        </h3>
        {sortedSessions.length === 0 ? (
          <p className="text-sm text-neutral-500">No sessions yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedSessions.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      {formatDate(s.date)}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {s.duration} min
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      DISCIPLINE_COLORS[s.discipline] ??
                      "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {s.discipline}
                  </span>
                </div>
                {s.hasNotes && (
                  <FileText size={16} className="text-neutral-400" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Private Notes */}
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg text-neutral-900">
            Private Notes
          </h3>
          {!showAddNote && (
            <button
              onClick={() => setShowAddNote(true)}
              className="flex items-center gap-1.5 rounded-full border border-deep-sage px-4 py-2 text-xs font-semibold text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
            >
              <Plus size={14} />
              Add Note
            </button>
          )}
        </div>

        {showAddNote && (
          <div className="mb-4 space-y-3 rounded-xl border border-neutral-200 p-4">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a private note about this client..."
              rows={3}
              className="w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-electric-teal focus:outline-none focus:ring-1 focus:ring-electric-teal"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNote}
                className="rounded-full bg-energy-gradient px-[26px] py-[10px] text-[0.88rem] font-semibold text-white"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowAddNote(false);
                  setNoteText("");
                }}
                className="rounded-full border border-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-deep-sage"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {sortedNotes.length === 0 && !showAddNote ? (
          <p className="text-sm text-neutral-500">No notes yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedNotes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl border border-neutral-100 px-4 py-3"
              >
                <p className="text-xs font-medium text-neutral-500 mb-1">
                  {formatDate(note.date)}
                </p>
                <p className="text-sm text-neutral-700">{note.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
