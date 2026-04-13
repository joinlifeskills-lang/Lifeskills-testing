"use client";

import { Filter, X } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  children: React.ReactNode;
  activeCount?: number;
}

export default function FilterBar({ children, activeCount = 0 }: FilterBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop inline */}
      <div className="hidden items-center gap-3 md:flex">{children}</div>

      {/* Mobile toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700"
        >
          <Filter size={16} />
          Filters
          {activeCount > 0 && (
            <span className="rounded-full bg-deep-sage px-1.5 py-0.5 text-[0.6rem] font-bold text-white">
              {activeCount}
            </span>
          )}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-50 bg-black/40" onClick={() => setOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white p-5 pb-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-neutral-900">Filters</p>
                <button onClick={() => setOpen(false)} className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100">
                  <X size={18} />
                </button>
              </div>
              <div className="space-y-3">{children}</div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
