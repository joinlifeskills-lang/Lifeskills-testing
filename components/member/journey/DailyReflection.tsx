"use client";

import { useState, useMemo } from "react";
import { Send, MessageCircle, Heart } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";

interface ThreadReply {
  id: string;
  author: "customer" | "teacher";
  name: string;
  initials: string;
  text: string;
  timestamp: string;
}

export default function DailyReflection({ clientId }: { clientId: string }) {
  const { entries, addJournalEntry } = useJourneyStore();
  const clientEntries = useMemo(
    () => entries.filter((e) => e.clientId === clientId),
    [entries, clientId]
  );

  const [content, setContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [threads, setThreads] = useState<Record<string, ThreadReply[]>>({});

  const handlePost = () => {
    const t = content.trim();
    if (!t) return;
    addJournalEntry(clientId, t);
    setContent("");
  };

  const handleReply = (entryId: string) => {
    const t = replyText.trim();
    if (!t) return;
    setThreads((prev) => ({
      ...prev,
      [entryId]: [
        ...(prev[entryId] || []),
        {
          id: `r-${Date.now()}`,
          author: "customer",
          name: "Sarah",
          initials: "SC",
          text: t,
          timestamp: "Just now",
        },
      ],
    }));
    setReplyText("");
    setReplyingTo(null);
  };

  const toggleLike = (id: string) => {
    setLikes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /* ── Shared post card renderer ── */
  const renderPost = (entry: typeof clientEntries[0]) => {
    const entryReplies = threads[entry.id] || [];
    const teacherCommentLiked = likes.has(`tc-${entry.id}`);

    return (
      <div key={entry.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Main post */}
        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[0.55rem] font-sans font-bold">SC</span>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-neutral-900">Sarah Chen</p>
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

        {/* Teacher comment */}
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
                      Your teacher
                      {entry.teacherCommentAt &&
                        ` \u00B7 ${new Date(entry.teacherCommentAt + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed">{entry.teacherComment}</p>

                {/* Like / Reply on teacher comment only */}
                <div className="flex items-center gap-5 mt-3">
                  <button
                    onClick={() => toggleLike(`tc-${entry.id}`)}
                    className={`flex items-center gap-1.5 font-sans text-[0.65rem] font-medium transition-colors ${
                      teacherCommentLiked ? "text-vivid-coral" : "text-neutral-500 hover:text-vivid-coral"
                    }`}
                  >
                    <Heart size={12} fill={teacherCommentLiked ? "#E8603A" : "none"} strokeWidth={2} />
                    {teacherCommentLiked ? "Liked" : "Like"}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === entry.id ? null : entry.id)}
                    className="flex items-center gap-1.5 font-sans text-[0.65rem] font-medium text-neutral-500 hover:text-electric-teal transition-colors"
                  >
                    <MessageCircle size={12} />
                    Reply
                  </button>
                </div>
              </div>

              {/* Thread replies */}
              {entryReplies.length > 0 && (
                <div className="mt-2 space-y-2">
                  {entryReplies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`rounded-2xl p-3.5 ${
                        reply.author === "customer" ? "bg-warm-sand/60" : "bg-electric-teal/5"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            reply.author === "customer" ? "bg-deep-sage" : "bg-electric-teal"
                          }`}
                        >
                          <span className="text-white text-[0.45rem] font-sans font-bold">{reply.initials}</span>
                        </div>
                        <span className="font-sans text-xs font-semibold text-neutral-900">{reply.name}</span>
                        <span className="font-sans text-[0.55rem] text-neutral-500">{reply.timestamp}</span>
                      </div>
                      <p className="font-sans text-sm text-neutral-700 leading-relaxed">{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reply input */}
        {replyingTo === entry.id && (
          <div className="px-5 lg:px-6 pb-4">
            <div className="flex items-start gap-3 ml-9">
              <div className="w-7 h-7 rounded-full bg-deep-sage flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-[0.45rem] font-sans font-bold">SC</span>
              </div>
              <div className="flex-1 flex items-end gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="flex-1 font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-3 outline-none resize-none transition-colors focus:bg-warm-sand/70"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleReply(entry.id);
                    }
                  }}
                />
                <button
                  onClick={() => handleReply(entry.id)}
                  disabled={!replyText.trim()}
                  className="p-2.5 rounded-full bg-deep-sage text-white disabled:opacity-30 hover:bg-deep-sage-hover transition-colors flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section>
      {/* ── Desktop: compose left + feed right ── */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="grid grid-cols-12">
            {/* Left — compose */}
            <div className="col-span-4 p-8 border-r border-neutral-100 flex flex-col">
              <h2 className="font-display text-2xl text-deep-sage mb-2">
                Daily Reflection
              </h2>
              <p className="font-display text-base text-deep-sage/70 mb-5">
                What did you notice today?
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write freely. There is no right or wrong here..."
                rows={6}
                className="flex-1 w-full font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-4 outline-none resize-none transition-colors duration-200 focus:bg-warm-sand/70"
              />
              <div className="flex justify-start mt-4">
                <button
                  onClick={handlePost}
                  disabled={!content.trim()}
                  className="flex items-center gap-2 font-sans font-semibold text-sm px-6 py-2.5 rounded-full text-white bg-deep-sage hover:bg-deep-sage-hover transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                >
                  <Send size={14} />
                  Post
                </button>
              </div>
            </div>

            {/* Right — feed */}
            <div className="col-span-8 p-6 max-h-[600px] overflow-y-auto space-y-4">
              {clientEntries.length > 0 ? (
                clientEntries.map((entry) => renderPost(entry))
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="font-sans text-sm text-neutral-300">
                    Your reflections will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="lg:hidden">
        <h2 className="font-display text-2xl text-deep-sage mb-6">
          Daily Reflection
        </h2>

        {/* Compose */}
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 mb-4">
          <p className="font-display text-base text-deep-sage mb-3">
            What did you notice today?
          </p>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write freely..."
            rows={3}
            className="w-full font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-4 outline-none resize-none transition-colors duration-200 focus:bg-warm-sand/70"
          />
          <div className="flex justify-start mt-3">
            <button
              onClick={handlePost}
              disabled={!content.trim()}
              className="flex items-center gap-2 font-sans font-semibold text-sm px-6 py-2.5 rounded-full text-white bg-deep-sage hover:bg-deep-sage-hover transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
            >
              <Send size={14} />
              Post
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-4">
          {clientEntries.map((entry) => renderPost(entry))}
        </div>
      </div>
    </section>
  );
}
