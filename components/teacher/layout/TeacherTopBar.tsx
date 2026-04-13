"use client";

import { Bell } from "lucide-react";

export default function TeacherTopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-warm-sand/80 backdrop-blur-sm lg:hidden">
      {/* Mobile only — desktop greeting lives inside the Welcome card */}
      <div className="flex items-center justify-between px-4 py-3">
        <img src="/Logo.svg" alt="Lifeskills" className="h-6 w-auto" />
        <button className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-vivid-coral" />
        </button>
      </div>
    </header>
  );
}
