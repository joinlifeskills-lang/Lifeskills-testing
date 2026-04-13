"use client";

import { X, Sparkles } from "lucide-react";
import type { JourneyMilestone } from "@/lib/journey/types";

interface Props {
  milestone: JourneyMilestone;
  onDismiss: () => void;
}

export default function MilestoneBanner({ milestone, onDismiss }: Props) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-deep-gradient px-6 py-5 shadow-[0_8px_32px_rgba(45,74,62,0.3)]">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 15% 50%, rgba(11,168,154,0.18) 0%, transparent 60%)" }}
      />

      <div className="relative flex items-start gap-4">
        <div className="mt-0.5 h-11 w-11 shrink-0 rounded-full bg-bright-amber/20 flex items-center justify-center">
          <Sparkles size={22} className="text-bright-amber" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            A moment worth noting
          </p>
          <p className="font-display text-xl leading-snug text-white">
            {milestone.message}
          </p>
        </div>

        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="mt-0.5 h-8 w-8 shrink-0 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X size={14} className="text-white/60" />
        </button>
      </div>
    </div>
  );
}
