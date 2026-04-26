"use client";

import { useState, useMemo } from "react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";
import {
  calculateGoalProgress,
  FREQUENCY_LABEL,
} from "@/lib/journey/types";
import type { JourneyGoal } from "@/lib/journey/types";
import { teacherClients } from "@/lib/teacher/data";
import { Member } from "@/lib/admin/types";
import {
  Check,
  Flame,
  Heart,
  MessageCircle,
  Send,
  Shield,
} from "lucide-react";

/* Map admin members to journey clientIds via name matching */
function findClientId(member: Member): string | null {
  const client = teacherClients.find(
    (c) => c.name === member.name || c.initials === member.initials
  );
  return client?.id ?? null;
}

/* ═══════════════════════════════════════
   Weekly Streak — read-only version of customer's
   ═══════════════════════════════════════ */
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

/* ═══════════════════════════════════════
   Today's Practices — read-only mirror
   ═══════════════════════════════════════ */
function AdminPracticesView({ clientId }: { clientId: string }) {
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
                className="rounded-2xl p-5 min-h-[72px]"
                style={{
                  backgroundColor: sg.completedToday ? "#2D4A3E" : "rgba(245,240,232,0.5)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-sans text-sm font-medium leading-snug"
                      style={{ color: sg.completedToday ? "#FFFFFF" : "#1A1A1A" }}
                    >
                      {sg.title}
                    </p>
                    <p
                      className="font-sans text-[0.65rem] mt-0.5"
                      style={{ color: sg.completedToday ? "rgba(255,255,255,0.5)" : "#7A7A7A" }}
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
                No practices assigned yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Goals — read-only mirror of customer GoalsSection
   ═══════════════════════════════════════ */
function AdminGoalsView({ clientId }: { clientId: string }) {
  const { goals } = useJourneyStore();
  const clientGoals = goals.filter(
    (g) =>
      g.clientId === clientId &&
      g.status !== "pending_acceptance" &&
      g.status !== "flagged"
  );

  return (
    <section className="h-full flex flex-col">
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 lg:p-8 flex-1">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl text-deep-sage">Goals</h2>
          <span className="font-sans text-xs text-neutral-500">
            {clientGoals.length}/3
          </span>
        </div>

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

                {goal.subGoals.length > 0 && (
                  <div className="space-y-2">
                    {goal.subGoals.map((sg) => (
                      <div key={sg.id} className="flex items-center gap-3">
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
                      </div>
                    ))}
                  </div>
                )}

                {goal.subGoals.length === 0 && (
                  <p className="font-sans text-xs text-neutral-500">
                    No daily practices assigned yet.
                  </p>
                )}
              </div>
            );
          })}

          {clientGoals.length === 0 && (
            <div className="text-center py-4">
              <p className="font-sans text-sm text-neutral-500">
                This member hasn&apos;t set any goals yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Daily Reflections — mirrors customer feed,
   shows teacher comments, admin can comment
   ═══════════════════════════════════════ */
function AdminReflectionsFeed({
  clientId,
  memberName,
  memberInitials,
}: {
  clientId: string;
  memberName: string;
  memberInitials: string;
}) {
  const { entries, addAdminComment } = useJourneyStore();
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
    addAdminComment(entryId, t);
    setCommentText("");
    setCommentingId(null);
  };

  if (clientEntries.length === 0) {
    return (
      <section>
        <h2 className="font-display text-2xl text-deep-sage mb-5">
          Daily Reflections
        </h2>
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8">
          <p className="font-sans text-sm text-neutral-400 text-center">
            No reflections from this member yet.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl text-deep-sage mb-5">
        Daily Reflections
      </h2>

      <div className="space-y-4">
        {clientEntries.map((entry) => (
          <div key={entry.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
            {/* Client post */}
            <div className="p-5 lg:p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[0.55rem] font-sans font-bold">{memberInitials}</span>
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-neutral-900">{memberName}</p>
                  <p className="font-sans text-[0.6rem] text-neutral-500">
                    {new Date(entry.createdAt + "T12:00:00").toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.content}</p>
            </div>

            {/* Teacher comment (read-only for admin) */}
            {entry.teacherComment && (
              <div className="px-5 lg:px-6 pb-4">
                <div className="pl-5 border-l-[3px] border-electric-teal ml-4">
                  <div className="bg-electric-teal/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-full bg-electric-teal flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-[0.5rem] font-sans font-bold">MR</span>
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-neutral-900">Maya Reyes</p>
                        <p className="font-sans text-[0.55rem] text-neutral-500">
                          Teacher
                          {entry.teacherCommentAt &&
                            ` \u00B7 ${new Date(entry.teacherCommentAt + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                        </p>
                      </div>
                    </div>
                    <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.teacherComment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Admin comment (already posted) */}
            {entry.adminComment && (
              <div className="px-5 lg:px-6 pb-4">
                <div className="pl-5 border-l-[3px] border-deep-sage ml-4">
                  <div className="bg-deep-sage/5 rounded-2xl p-4">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-7 h-7 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0">
                        <Shield size={11} className="text-white" />
                      </div>
                      <div>
                        <p className="font-sans text-xs font-semibold text-neutral-900">Admin</p>
                        {entry.adminCommentAt && (
                          <p className="font-sans text-[0.55rem] text-neutral-500">
                            {new Date(entry.adminCommentAt + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.adminComment}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Like + Admin comment action bar */}
            <div className="px-5 lg:px-6 pb-4">
              <div className="flex items-center gap-5 pt-2 border-t border-neutral-100">
                <button
                  onClick={() => toggleLike(entry.id)}
                  className={`flex items-center gap-1.5 font-sans text-[0.65rem] font-medium transition-colors ${
                    likes.has(entry.id) ? "text-vivid-coral" : "text-neutral-500 hover:text-vivid-coral"
                  }`}
                >
                  <Heart size={12} fill={likes.has(entry.id) ? "#E8603A" : "none"} strokeWidth={2} />
                  {likes.has(entry.id) ? "Liked" : "Like"}
                </button>
                {!entry.adminComment && (
                  <button
                    onClick={() => setCommentingId(commentingId === entry.id ? null : entry.id)}
                    className="flex items-center gap-1.5 font-sans text-[0.65rem] font-medium text-neutral-500 hover:text-deep-sage transition-colors"
                  >
                    <MessageCircle size={12} />
                    Comment
                  </button>
                )}
              </div>
            </div>

            {/* Admin comment input */}
            {!entry.adminComment && commentingId === entry.id && (
              <div className="px-5 lg:px-6 pb-5">
                <div className="pl-5 border-l-[3px] border-deep-sage/30 ml-4">
                  <div className="flex items-start gap-2">
                    <div className="w-7 h-7 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield size={10} className="text-white" />
                    </div>
                    <div className="flex-1 flex items-end gap-2">
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write an admin comment..."
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
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════
   Main Component — mirrors customer journey layout
   ═══════════════════════════════════════ */
export default function MemberJourney({ member }: { member: Member }) {
  const clientId = findClientId(member);

  if (!clientId) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 text-center">
        <p className="font-sans text-sm text-neutral-400">
          No journey data available for this member. They may not have started working with a teacher yet.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Top row: Practices left, Goals right — same grid as customer journey */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-7">
          <AdminPracticesView clientId={clientId} />
        </div>
        <div className="lg:col-span-5">
          <AdminGoalsView clientId={clientId} />
        </div>
      </div>

      {/* Full-width reflection feed below — same as customer */}
      <div className="mt-8 lg:mt-12">
        <AdminReflectionsFeed
          clientId={clientId}
          memberName={member.name}
          memberInitials={member.initials}
        />
      </div>
    </div>
  );
}
