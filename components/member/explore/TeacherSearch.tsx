"use client";

import { Search } from "lucide-react";

interface TeacherSearchProps {
  value: string;
  onChange: (v: string) => void;
}

export default function TeacherSearch({ value, onChange }: TeacherSearchProps) {
  return (
    <div className="relative w-full">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name, discipline, or keyword..."
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-electric-teal/30 focus:border-electric-teal transition-colors"
      />
    </div>
  );
}
