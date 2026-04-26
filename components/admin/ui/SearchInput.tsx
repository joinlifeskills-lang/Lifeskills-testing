"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 placeholder:max-md:text-transparent focus:border-deep-sage focus:outline-none focus:ring-1 focus:ring-deep-sage"
      />
      {!value && (
        <span className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm text-neutral-400 md:hidden">
          Search
        </span>
      )}
    </div>
  );
}
