"use client";

import { useState } from "react";
import MessageSignupPrompt from "./MessageSignupPrompt";

interface MessageTeacherButtonProps {
  teacherName: string;
  teacherSlug: string;
}

export default function MessageTeacherButton({ teacherName, teacherSlug }: MessageTeacherButtonProps) {
  const [showPrompt, setShowPrompt] = useState(false);
  const redirectUrl = `/login?redirect=${encodeURIComponent(`/customer-dashboard/messages?teacher=${teacherSlug}`)}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setShowPrompt(true)}
        className="flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-1.5 text-[0.85rem] font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        Message {teacherName.split(" ")[0]}
      </button>

      {showPrompt && (
        <MessageSignupPrompt
          teacherName={teacherName.split(" ")[0]}
          redirectUrl={redirectUrl}
          onClose={() => setShowPrompt(false)}
        />
      )}
    </>
  );
}
