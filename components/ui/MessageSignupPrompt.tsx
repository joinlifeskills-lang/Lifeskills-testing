"use client";

import { MessageSquare, X } from "lucide-react";

interface MessageSignupPromptProps {
  teacherName: string;
  onClose: () => void;
  redirectUrl: string;
}

export default function MessageSignupPrompt({
  teacherName,
  onClose,
  redirectUrl,
}: MessageSignupPromptProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
        >
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-electric-teal/10">
          <MessageSquare size={26} className="text-electric-teal" />
        </div>
        <h3 className="mb-6 font-display text-lg text-neutral-900">
          Create an account to message {teacherName}
        </h3>
        <a
          href={redirectUrl}
          className="block w-full rounded-full bg-deep-sage px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Create Free Account
        </a>
      </div>
    </div>
  );
}
