"use client";

import { Bell } from "lucide-react";

interface AdminTopBarProps {
  title: string;
}

export default function AdminTopBar({ title }: AdminTopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-100 bg-warm-sand/80 backdrop-blur-sm">
      {/* Desktop */}
      <div className="hidden items-center justify-between px-8 py-4 lg:flex">
        <h1 className="font-display text-2xl text-neutral-900">{title}</h1>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900">
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-vivid-coral" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-teal text-sm font-bold text-white">
            AO
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="Lifeskills" className="h-6 w-auto" />
          <span className="rounded-md bg-deep-sage px-1.5 py-0.5 text-[0.6rem] font-semibold text-white">
            Admin
          </span>
        </div>
        <button className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-white hover:text-neutral-900">
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-vivid-coral" />
        </button>
      </div>
    </header>
  );
}
