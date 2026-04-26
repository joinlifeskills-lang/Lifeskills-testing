"use client";

import { useState } from "react";
import Link from "next/link";
import { Send, ArrowRight } from "lucide-react";
import { useJourneyStore } from "@/lib/journey/useJourneyStore";

const CLIENT_ID = "cl-1";

export default function HomeReflectionPrompt() {
  const { entries, addJournalEntry } = useJourneyStore();
  const [content, setContent] = useState("");

  const today = new Date().toISOString().slice(0, 10);
  const todayEntry = entries.find(
    (e) => e.clientId === CLIENT_ID && e.createdAt === today
  );

  const handlePost = () => {
    const t = content.trim();
    if (!t) return;
    addJournalEntry(CLIENT_ID, t);
    setContent("");
  };

  const isCelebrationEntry =
    todayEntry?.content.includes("All practices complete for today");

  // Celebration state — show congrats + reflection prompt
  if (todayEntry && isCelebrationEntry) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6 h-full flex flex-col">
        {/* Celebration header */}
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">
            <span>&#127881;</span> <span>&#128170;</span> <span>&#127882;</span>
          </div>
          <h3 className="font-display text-xl text-deep-sage mb-1">
            You did it!
          </h3>
          <p className="font-sans text-sm text-neutral-500">
            All practices complete for today. Take a moment to reflect — how do you feel?
          </p>
        </div>

        {/* Reflection input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write freely..."
          className="w-full flex-1 min-h-[60px] font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-3 outline-none resize-none transition-colors duration-200 focus:bg-warm-sand/70"
        />
        <div className="flex justify-start mt-3">
          <button
            onClick={handlePost}
            disabled={!content.trim()}
            className="flex items-center gap-2 font-sans font-semibold text-sm px-5 py-2 rounded-full text-white bg-deep-sage hover:bg-deep-sage-hover transition-all duration-200 disabled:opacity-40"
          >
            <Send size={13} />
            Post
          </button>
        </div>
      </div>
    );
  }

  // Already reflected today — show the most recent user-written entry + View my journey
  if (todayEntry) {
    // Find the latest non-auto-generated entry for today
    const userEntry = entries.find(
      (e) =>
        e.clientId === CLIENT_ID &&
        e.createdAt === today &&
        !e.content.includes("All practices complete for today")
    );
    const displayEntry = userEntry || todayEntry;

    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] h-full flex flex-col overflow-hidden">
        {/* Deep sage header */}
        <div className="bg-deep-sage px-5 py-4 md:px-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">&#9998;&#65039;</span>
            <h3 className="font-display text-base text-white">
              Today&apos;s Reflection
            </h3>
          </div>
          <p className="font-sans text-[0.65rem] text-white/50">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          <div className="bg-warm-sand/40 rounded-xl p-4 flex-1 mb-3">
            <p className="font-sans text-sm text-neutral-700 leading-relaxed italic">
              &ldquo;{displayEntry.content}&rdquo;
            </p>
          </div>

          {displayEntry.teacherComment && (
            <div className="pl-3 border-l-[2.5px] border-electric-teal mb-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-full bg-electric-teal flex items-center justify-center">
                  <span className="text-white text-[0.4rem] font-sans font-bold">MR</span>
                </div>
                <span className="font-sans text-xs font-semibold text-neutral-700">Maya</span>
              </div>
              <p className="font-sans text-xs text-neutral-700 leading-relaxed">
                {displayEntry.teacherComment}
              </p>
            </div>
          )}

          <Link
            href="/customer-dashboard/journey"
            className="flex items-center justify-center gap-2 mt-auto pt-3 border-t border-neutral-100 font-sans text-sm font-medium text-electric-teal hover:text-deep-sage transition-colors"
          >
            View my journey
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  // Default — write a reflection
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6 h-full flex flex-col">
      <h3 className="font-display text-lg text-neutral-900 mb-1">
        Daily Reflection
      </h3>
      <p className="font-sans text-xs text-neutral-500 mb-3">
        What did you notice today?
      </p>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write freely..."
        className="w-full flex-1 min-h-[80px] font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-3 outline-none resize-none transition-colors duration-200 focus:bg-warm-sand/70"
      />
      <div className="flex justify-start mt-3">
        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className="flex items-center gap-2 font-sans font-semibold text-sm px-5 py-2 rounded-full text-white bg-deep-sage hover:bg-deep-sage-hover transition-all duration-200 disabled:opacity-40"
        >
          <Send size={13} />
          Post
        </button>
      </div>
    </div>
  );
}
