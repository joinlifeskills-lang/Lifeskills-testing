"use client";

import { useState, useMemo } from "react";
import {
  Check,
  Flame,
  Plus,
  Trash2,
  X,
  Send,
  MessageCircle,
  Heart,
} from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import {
  calculateGoalProgress,
  FREQUENCY_LABEL,
  type SubGoalFrequency,
  type JourneyGoal,
} from "@/lib/journey/types";
import type { TeacherClient } from "@/lib/teacher/types";

/* ════════════════════════════════════════
   Section 1 — Today's Practices (read-only)
   Same layout as customer but no toggle
   ════════════════════════════════════════ */

function WeeklyStreak({ goals }: { goals: JourneyGoal[] }) {
  const activeGoals = goals.filter((g) => g.status === "active");
  const allSg = activeGoals.flatMap((g) => g.subGoals);
  const today = new Date().toISOString().slice(0, 10);
  const labels = ["S", "M", "T", "W", "T", "F", "S"];

  const days: { date: string; done: boolean; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const isToday = ds === today;
    const done = isToday
      ? allSg.length > 0 && allSg.every((s) => s.completedToday)
      : allSg.length > 0 && allSg.every((s) => s.completionHistory.includes(ds));
    days.push({ date: ds, done, isToday });
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {days.map((day) => {
        const dow = new Date(day.date + "T12:00:00").getDay();
        return (
          <div key={day.date} className="flex flex-col items-center gap-1.5">
            <span className="font-sans text-[0.6rem] font-semibold text-neutral-500 uppercase">
              {labels[dow]}
            </span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                day.done
                  ? "bg-electric-teal"
                  : day.isToday
                  ? "border-2 border-electric-teal"
                  : "border-2 border-neutral-300"
              }`}
            >
              {day.done && <Check size={13} className="text-white" strokeWidth={3} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ClientPracticesView({ clientId }: { clientId: string }) {
  const { goals } = useJourneyStore();
  const clientGoals = goals.filter(
    (g) => g.clientId === clientId && g.status === "active"
  );
  const allSg = clientGoals.flatMap((g) => g.subGoals);
  const doneCount = allSg.filter((s) => s.completedToday).length;
  const allDone = allSg.length > 0 && doneCount === allSg.length;

  return (
    <section className="h-full flex flex-col">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex-1 flex flex-col">
        <h2 className="font-display text-2xl text-deep-sage text-center mb-6">
          Today&apos;s Practices
        </h2>

        <div className="mb-6 pb-5 border-b border-neutral-100">
          <WeeklyStreak goals={clientGoals} />
          <p className="font-sans text-xs text-neutral-500 text-center mt-3">
            {doneCount} of {allSg.length} complete today
          </p>
        </div>

        {allDone && (
          <div className="bg-lime-sage/12 rounded-2xl p-5 mb-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-lime-sage/20 flex items-center justify-center flex-shrink-0">
              <Check size={18} className="text-lime-sage" strokeWidth={3} />
            </div>
            <div>
              <p className="font-display text-base text-deep-sage">All done for today</p>
              <p className="font-sans text-xs text-neutral-500">Client completed all practices.</p>
            </div>
          </div>
        )}

        <div className="space-y-3 flex-1">
          {clientGoals.map((goal) =>
            goal.subGoals.map((sg) => (
              <div
                key={sg.id}
                className={`rounded-2xl p-5 transition-all duration-300 ${
                  sg.completedToday ? "bg-deep-sage" : "bg-warm-sand/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-sans text-sm font-medium leading-snug ${
                        sg.completedToday ? "text-white" : "text-neutral-900"
                      }`}
                    >
                      {sg.title}
                    </p>
                    <p
                      className={`font-sans text-[0.65rem] mt-0.5 ${
                        sg.completedToday ? "text-white/50" : "text-neutral-500"
                      }`}
                    >
                      {FREQUENCY_LABEL[sg.frequency]}
                    </p>
                  </div>
                  {/* Read-only status indicator */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      sg.completedToday ? "bg-white/20" : "border-[2.5px] border-neutral-300"
                    }`}
                  >
                    {sg.completedToday && (
                      <Check size={18} className="text-white" strokeWidth={3} />
                    )}
                  </div>
                </div>
              </div>
            ))
          )}

          {allSg.length === 0 && (
            <div className="text-center py-6">
              <p className="font-sans text-sm text-neutral-500">
                No practices assigned yet. Add daily practices under this client&apos;s goals.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   Section 2 — Client's Goals (teacher manages tasks)
   Same layout as customer GoalsSection but with CRUD
   ════════════════════════════════════════ */

function ClientGoalsManager({ clientId }: { clientId: string }) {
  const store = useJourneyStore();
  const clientGoals = store.goals.filter(
    (g) =>
      g.clientId === clientId &&
      g.status !== "pending_acceptance" &&
      g.status !== "flagged"
  );

  const [addingTaskForGoal, setAddingTaskForGoal] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskFreq, setNewTaskFreq] = useState<SubGoalFrequency>("daily");

  const handleAddTask = (goalId: string) => {
    const t = newTaskTitle.trim();
    if (!t) return;
    store.addSubGoal(goalId, t, newTaskFreq);
    setNewTaskTitle("");
    setNewTaskFreq("daily");
    setAddingTaskForGoal(null);
  };

  return (
    <section className="h-full flex flex-col">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex-1">
        <h2 className="font-display text-2xl text-deep-sage mb-6">
          Client&apos;s Goals
        </h2>

        <div className="space-y-4">
          {clientGoals.map((goal) => {
            const progress = calculateGoalProgress(goal.subGoals);
            return (
              <div key={goal.id} className="bg-warm-sand/30 rounded-2xl p-5">
                <h3 className="font-display text-lg text-deep-sage mb-3">
                  {goal.title}
                </h3>

                {goal.subGoals.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-sans text-xs font-medium text-neutral-500">Progress</span>
                      <span className="font-sans text-sm font-bold text-electric-teal">{progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-electric-teal rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Tasks with management */}
                {goal.subGoals.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {goal.subGoals.map((sg) => (
                      <div key={sg.id} className="flex items-center gap-3 group/task">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            sg.completedToday ? "bg-electric-teal" : "border-[1.5px] border-neutral-300"
                          }`}
                        >
                          {sg.completedToday && <Check size={11} className="text-white" strokeWidth={3} />}
                        </div>
                        <span className="font-sans text-sm flex-1 text-neutral-700">{sg.title}</span>
                        <span className="font-sans text-[0.6rem] text-neutral-500 hidden sm:block">
                          {FREQUENCY_LABEL[sg.frequency]}
                        </span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Flame size={12} className="text-bright-amber" fill="#F0A500" />
                          <span className="font-sans text-xs font-bold text-bright-amber">{sg.currentStreak}</span>
                        </div>
                        <button
                          onClick={() => store.deleteSubGoal(goal.id, sg.id)}
                          className="p-0.5 text-neutral-300 hover:text-vivid-coral opacity-0 group-hover/task:opacity-100 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add task */}
                {goal.status === "active" && (
                  <>
                    {addingTaskForGoal === goal.id ? (
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <input
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="New daily practice..."
                          className="flex-1 min-w-[140px] font-sans text-xs bg-white rounded-lg px-3 py-2 outline-none"
                          autoFocus
                          onKeyDown={(e) => { if (e.key === "Enter") handleAddTask(goal.id); }}
                        />
                        <select
                          value={newTaskFreq}
                          onChange={(e) => setNewTaskFreq(e.target.value as SubGoalFrequency)}
                          className="font-sans text-xs bg-white rounded-lg px-2.5 py-2 outline-none"
                        >
                          <option value="daily">Daily</option>
                          <option value="3x_week">3x/week</option>
                          <option value="weekly">Weekly</option>
                        </select>
                        <button
                          onClick={() => handleAddTask(goal.id)}
                          disabled={!newTaskTitle.trim()}
                          className="font-sans font-semibold text-xs px-3.5 py-2 rounded-full bg-deep-sage text-white disabled:opacity-40 transition-opacity"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => { setAddingTaskForGoal(null); setNewTaskTitle(""); }}
                          className="text-neutral-500 hover:text-neutral-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingTaskForGoal(goal.id)}
                        className="flex items-center gap-1.5 font-sans text-xs font-medium text-electric-teal hover:text-deep-sage transition-colors"
                      >
                        <Plus size={14} /> Add practice
                      </button>
                    )}
                  </>
                )}

                {goal.subGoals.length === 0 && goal.status !== "active" && (
                  <p className="font-sans text-xs text-neutral-500">
                    No daily practices yet.
                  </p>
                )}
              </div>
            );
          })}

          {clientGoals.length === 0 && (
            <div className="text-center py-4">
              <p className="font-sans text-sm text-neutral-500">
                This client hasn&apos;t set any goals yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   Section 3 — Reflections + Session Notes
   Mirrors customer's Daily Reflection layout:
   Desktop: session notes left, reflection feed right
   ════════════════════════════════════════ */

interface SessionNote {
  id: string;
  date: string;
  text: string;
}

function ReflectionsFeed({
  clientId,
  clientName,
  clientInitials,
}: {
  clientId: string;
  clientName: string;
  clientInitials: string;
}) {
  const { entries, addJournalComment } = useJourneyStore();
  const clientEntries = useMemo(
    () => entries.filter((e) => e.clientId === clientId),
    [entries, clientId]
  );

  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [likes, setLikes] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleComment = (entryId: string) => {
    const t = commentText.trim();
    if (!t) return;
    addJournalComment(entryId, t);
    setCommentText("");
    setCommentingId(null);
  };

  const renderEntry = (entry: typeof clientEntries[0]) => (
    <div key={entry.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      <div className="p-5 lg:p-6">
        {/* Client post */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[0.55rem] font-sans font-bold">{clientInitials}</span>
          </div>
          <div>
            <p className="font-sans text-sm font-semibold text-neutral-900">{clientName}</p>
            <p className="font-sans text-[0.6rem] text-neutral-500">
              {new Date(entry.createdAt + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric",
              })}
            </p>
          </div>
        </div>
        <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.content}</p>

        {/* Like + Comment actions on client post */}
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-neutral-100">
          <button
            onClick={() => toggleLike(entry.id)}
            className={`flex items-center gap-1.5 font-sans text-[0.65rem] font-medium transition-colors ${
              likes.has(entry.id) ? "text-vivid-coral" : "text-neutral-500 hover:text-vivid-coral"
            }`}
          >
            <Heart size={12} fill={likes.has(entry.id) ? "#E8603A" : "none"} strokeWidth={2} />
            {likes.has(entry.id) ? "Liked" : "Like"}
          </button>
          {!entry.teacherComment && (
            <button
              onClick={() => setCommentingId(commentingId === entry.id ? null : entry.id)}
              className="flex items-center gap-1.5 font-sans text-[0.65rem] font-medium text-neutral-500 hover:text-electric-teal transition-colors"
            >
              <MessageCircle size={12} />
              Comment
            </button>
          )}
        </div>
      </div>

      {/* Teacher comment or comment input */}
      <div className="px-5 lg:px-6 pb-4">
        {entry.teacherComment ? (
          <div className="pl-5 border-l-[3px] border-electric-teal ml-4">
            <div className="bg-electric-teal/5 rounded-2xl p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-electric-teal flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[0.5rem] font-sans font-bold">MR</span>
                </div>
                <div>
                  <p className="font-sans text-xs font-semibold text-neutral-900">You</p>
                  <p className="font-sans text-[0.55rem] text-neutral-500">
                    {entry.teacherCommentAt &&
                      new Date(entry.teacherCommentAt + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
              </div>
              <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.teacherComment}</p>
            </div>
          </div>
        ) : commentingId === entry.id ? (
          <div className="pl-5 border-l-[3px] border-electric-teal/30 ml-4">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-electric-teal flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-[0.45rem] font-sans font-bold">MR</span>
              </div>
              <div className="flex-1 flex items-end gap-2">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a note to your client..."
                  rows={2}
                  className="flex-1 font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-3 outline-none resize-none transition-colors focus:bg-warm-sand/70"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment(entry.id);
                    }
                  }}
                />
                <button
                  onClick={() => handleComment(entry.id)}
                  disabled={!commentText.trim()}
                  className="p-2.5 rounded-full bg-deep-sage text-white disabled:opacity-30 hover:bg-deep-sage-hover transition-colors flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );

  return (
    <>
      {clientEntries.length > 0 ? (
        <div className="space-y-4">
          {clientEntries.map((entry) => renderEntry(entry))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="font-sans text-sm text-neutral-300">
            No reflections from this client yet.
          </p>
        </div>
      )}
    </>
  );
}

function SessionNotesPanel({
  initialNotes,
  clientName,
}: {
  initialNotes: SessionNote[];
  clientName: string;
}) {
  const [notes, setNotes] = useState<SessionNote[]>(initialNotes);
  const [showAdd, setShowAdd] = useState(false);
  const [newNote, setNewNote] = useState("");

  const handleAdd = () => {
    const t = newNote.trim();
    if (!t) return;
    setNotes([
      { id: `sn-${Date.now()}`, date: new Date().toISOString().slice(0, 10), text: t },
      ...notes,
    ]);
    setNewNote("");
    setShowAdd(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display text-lg text-deep-sage">{clientName}&apos;s Reflections</h3>
        </div>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 font-sans text-xs font-medium text-electric-teal hover:text-deep-sage transition-colors"
          >
            <Plus size={14} /> Add note
          </button>
        )}
      </div>

      {showAdd && (
        <div className="bg-warm-sand/40 rounded-2xl p-4 mb-4">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Session observations, plans, follow-ups..."
            rows={3}
            className="w-full font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-white rounded-xl p-3 outline-none resize-none"
            autoFocus
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleAdd}
              disabled={!newNote.trim()}
              className="font-sans font-semibold text-xs px-4 py-2 rounded-full text-white disabled:opacity-40 transition-all"
              style={{ background: "linear-gradient(135deg, #E8603A 0%, #F0A500 100%)" }}
            >
              Save note
            </button>
            <button
              onClick={() => { setShowAdd(false); setNewNote(""); }}
              className="font-sans text-xs text-neutral-500 hover:text-neutral-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3 flex-1 overflow-y-auto">
        {notes.map((note) => (
          <div key={note.id} className="bg-warm-sand/40 rounded-2xl p-4">
            <p className="font-sans text-[0.6rem] font-medium text-neutral-500 mb-1.5">
              {new Date(note.date + "T12:00:00").toLocaleDateString("en-US", {
                weekday: "short", month: "short", day: "numeric",
              })}
            </p>
            <p className="font-sans text-sm text-neutral-700 leading-relaxed">{note.text}</p>
          </div>
        ))}
        {notes.length === 0 && !showAdd && (
          <div className="text-center py-6">
            <p className="font-sans text-xs text-neutral-500">No session notes yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   Main Component
   ════════════════════════════════════════ */

export default function IndividualClientJourney({
  client,
}: {
  client: TeacherClient;
}) {
  const clientNotes: SessionNote[] = (client.notes || []).map((n) => ({
    id: n.id,
    date: n.date,
    text: n.text,
  }));

  return (
    <div>
      {/* Top row: Practices left, Goals right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-7">
          <ClientPracticesView clientId={client.id} />
        </div>
        <div className="lg:col-span-5">
          <ClientGoalsManager clientId={client.id} />
        </div>
      </div>

      {/* Bottom row: Reflections — full width */}
      <div className="mt-8 lg:mt-12">
        <h2 className="font-display text-2xl text-deep-sage mb-5">
          {client.name}&apos;s Reflections
        </h2>
        <ReflectionsFeed
          clientId={client.id}
          clientName={client.name}
          clientInitials={client.initials}
        />
      </div>
    </div>
  );
}
