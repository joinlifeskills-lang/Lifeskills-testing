"use client";

import { useState } from "react";
const coaches = [1, 2, 3, 4, 5, 6];
const DESKTOP_VISIBLE = 3;

function CoachCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-black/[0.06] bg-white flex flex-col aspect-[3/4]">
      <div className="flex-1 bg-neutral-100 flex items-center justify-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="18" r="9" fill="#D4D4D4" />
          <path d="M6 42c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="#D4D4D4" />
        </svg>
      </div>
      <div className="px-4 py-3 border-t border-black/[0.05] flex items-center justify-center">
        <a
          href="/find-a-teacher"
          className="font-sans text-[0.82rem] font-semibold text-deep-sage hover:text-deep-sage-hover transition-colors no-underline"
        >
          View Profile
        </a>
      </div>
    </div>
  );
}

function ArrowBtn({
  dir,
  onClick,
  disabled,
  className = "",
}: {
  dir: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className={`w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-deep-sage transition-opacity disabled:opacity-30 ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        {dir === "left" ? (
          <path d="M11 14l-5-5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function Coaches() {
  const [mobileIdx, setMobileIdx] = useState(0);
  const [desktopIdx, setDesktopIdx] = useState(0);
  const desktopMax = coaches.length - DESKTOP_VISIBLE;

  return (
    <section className="bg-warm-sand rounded-t-[32px] md:rounded-t-[48px] -mt-6 md:-mt-10 relative z-[35]">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-14 md:py-20">
        <div className="mb-10 md:mb-12">
          <h2 className="font-display font-normal text-deep-sage text-[1.75rem] md:text-[2rem] leading-[1.25] text-center">
            Guided by vetted, experienced and trusted coaches who&rsquo;ve walked the path.
          </h2>
        </div>

        {/* Mobile: one card at a time */}
        <div className="md:hidden relative px-6">
          <CoachCard />
          <ArrowBtn
            dir="left"
            onClick={() => setMobileIdx((i) => i - 1)}
            disabled={mobileIdx === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          />
          <ArrowBtn
            dir="right"
            onClick={() => setMobileIdx((i) => i + 1)}
            disabled={mobileIdx === coaches.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          />
        </div>

        {/* Desktop: 3 cards at a time */}
        <div className="hidden md:block relative px-8">
          <div className="grid grid-cols-3 gap-5">
            {coaches.slice(desktopIdx, desktopIdx + DESKTOP_VISIBLE).map((id) => (
              <CoachCard key={id} />
            ))}
          </div>
          <ArrowBtn
            dir="left"
            onClick={() => setDesktopIdx((i) => i - 1)}
            disabled={desktopIdx === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2"
          />
          <ArrowBtn
            dir="right"
            onClick={() => setDesktopIdx((i) => i + 1)}
            disabled={desktopIdx === desktopMax}
            className="absolute right-0 top-1/2 -translate-y-1/2"
          />
        </div>


      </div>
    </section>
  );
}
