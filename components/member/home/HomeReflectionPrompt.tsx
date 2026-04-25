"use client";

import { useState } from "react";
import { Send } from "lucide-react";
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

  // If already reflected today, show the entry
  if (todayEntry) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6 h-full">
        <h3 className="font-display text-lg text-neutral-900 mb-3">
          Today&apos;s Reflection
        </h3>
        <p className="font-sans text-sm text-neutral-700 leading-relaxed">
          {todayEntry.content}
        </p>
        {todayEntry.teacherComment && (
          <div className="mt-3 pl-3 border-l-[2.5px] border-electric-teal">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-full bg-electric-teal flex items-center justify-center">
                <span className="text-white text-[0.4rem] font-sans font-bold">MR</span>
              </div>
              <span className="font-sans text-xs font-semibold text-neutral-700">Maya</span>
            </div>
            <p className="font-sans text-xs text-neutral-700 leading-relaxed">
              {todayEntry.teacherComment}
            </p>
          </div>
        )}
      </div>
    );
  }

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
        rows={3}
        className="w-full font-sans text-sm text-neutral-700 placeholder:text-neutral-300 bg-warm-sand/40 rounded-xl p-3 outline-none resize-none transition-colors duration-200 focus:bg-warm-sand/70"
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
