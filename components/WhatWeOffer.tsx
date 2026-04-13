"use client";

import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";

type Offering = {
  title: string;
  description?: string;
  gradientId: string;
  stops: { offset: string; color: string }[];
  path: React.ReactNode;
  extra?: React.ReactNode;
  noOverlay?: boolean;
};

const offerings: Offering[] = [
  {
    title: "Breathwork",
    description: "Learn to calm your nervous system with your breath.",
    gradientId: "offer-grad-1",
    stops: [
      { offset: "0%", color: "#60A5FA" },
      { offset: "100%", color: "#2563EB" },
    ],
    path: (
      <path d="M12 32c4-6 8-6 12 0s8 6 12 0" fill="none" stroke="url(#offer-grad-1)" strokeWidth="2.5" strokeLinecap="round" />
    ),
    extra: (
      <path d="M12 22c4-6 8-6 12 0s8 6 12 0" fill="none" stroke="url(#offer-grad-1)" strokeWidth="2.5" strokeLinecap="round" />
    ),
  },
  {
    title: "Meditation",
    description: "Train your mind to settle, focus, and let go.",
    gradientId: "offer-grad-2",
    stops: [
      { offset: "0%", color: "#A855F7" },
      { offset: "100%", color: "#6366F1" },
    ],
    path: (
      <>
        <circle cx="24" cy="10" r="3.5" fill="none" stroke="url(#offer-grad-2)" strokeWidth="2.5" />
        <path d="M24 15 C 20 19 14 27 9 37 L 39 37 C 34 27 28 19 24 15 Z" fill="none" stroke="url(#offer-grad-2)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Yoga",
    description: "Conscious movement that puts you back in control.",
    gradientId: "offer-grad-3",
    stops: [
      { offset: "0%", color: "#E8603A" },
      { offset: "100%", color: "#F0A500" },
    ],
    path: (
      <>
        <circle cx="24" cy="12" r="3.5" fill="none" stroke="url(#offer-grad-3)" strokeWidth="2.5" />
        <path d="M24 16v10 M24 26l-8 12 M24 26l8 12 M14 22l10 2 10-2" fill="none" stroke="url(#offer-grad-3)" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Somatic",
    description: "Release tension stored in the body, from the inside out.",
    gradientId: "offer-grad-4",
    stops: [
      { offset: "0%", color: "#0BA89A" },
      { offset: "100%", color: "#6BAA3E" },
    ],
    path: (
      <>
        <circle cx="24" cy="10" r="3.5" fill="none" stroke="url(#offer-grad-4)" strokeWidth="2.5" />
        <path d="M24 14 L24 30" fill="none" stroke="url(#offer-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M14 20 L34 20" fill="none" stroke="url(#offer-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M24 30 L16 40 M24 30 L32 40" fill="none" stroke="url(#offer-grad-4)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M8 14 Q 4 20, 8 26" fill="none" stroke="url(#offer-grad-4)" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M5 11 Q 0 20, 5 29" fill="none" stroke="url(#offer-grad-4)" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
        <path d="M40 14 Q 44 20, 40 26" fill="none" stroke="url(#offer-grad-4)" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M43 11 Q 48 20, 43 29" fill="none" stroke="url(#offer-grad-4)" strokeWidth="1.4" strokeLinecap="round" opacity="0.4" />
      </>
    ),
  },
  {
    title: "Spiritual Guidance",
    description: "Explore meaning, purpose, and a deeper connection to yourself.",
    gradientId: "offer-grad-5",
    stops: [
      { offset: "0%", color: "#E8603A" },
      { offset: "100%", color: "#A855F7" },
    ],
    path: (
      <>
        <path d="M24 36 C 22 28, 20 22, 24 14 C 28 22, 26 28, 24 36 Z" fill="none" stroke="url(#offer-grad-5)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M24 36 C 18 30, 12 26, 10 20 C 16 16, 22 22, 24 36 Z" fill="none" stroke="url(#offer-grad-5)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M24 36 C 30 30, 36 26, 38 20 C 32 16, 26 22, 24 36 Z" fill="none" stroke="url(#offer-grad-5)" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M24 36 C 16 32, 8 34, 6 38 C 12 32, 20 32, 24 36 Z" fill="none" stroke="url(#offer-grad-5)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" opacity="0.75" />
        <path d="M24 36 C 32 32, 40 34, 42 38 C 36 32, 28 32, 24 36 Z" fill="none" stroke="url(#offer-grad-5)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" opacity="0.75" />
        <path d="M24 36 L24 42" fill="none" stroke="url(#offer-grad-5)" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Reiki",
    description: "Channel healing energy to restore balance and calm.",
    gradientId: "offer-grad-6",
    stops: [
      { offset: "0%", color: "#A78BFA" },
      { offset: "100%", color: "#EC4899" },
    ],
    path: (
      <>
        <circle cx="24" cy="24" r="6" fill="none" stroke="url(#offer-grad-6)" strokeWidth="2" />
        <line x1="24" y1="10" x2="24" y2="16" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="32" x2="24" y2="38" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="24" x2="16" y2="24" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="32" y1="24" x2="38" y2="24" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14.1" y1="14.1" x2="18.3" y2="18.3" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="29.7" y1="29.7" x2="33.9" y2="33.9" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="33.9" y1="14.1" x2="29.7" y2="18.3" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="18.3" y1="29.7" x2="14.1" y2="33.9" stroke="url(#offer-grad-6)" strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  },
];

function OfferingCard({ item }: { item: Offering }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="relative bg-white rounded-2xl border border-black/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.05)] overflow-hidden cursor-pointer aspect-square flex flex-col items-center justify-center p-6 select-none"
      onMouseEnter={() => !item.noOverlay && setActive(true)}
      onMouseLeave={() => !item.noOverlay && setActive(false)}
      onClick={() => !item.noOverlay && setActive((v) => !v)}
    >
      {/* Default state — icon + title */}
      <div
        className="flex flex-col items-center gap-4 transition-all duration-300"
        style={{ opacity: active ? 0 : 1, transform: active ? "translateY(-8px)" : "translateY(0)" }}
      >
        <svg width="56" height="56" viewBox="0 0 48 48" aria-hidden="true">
          <defs>
            <linearGradient id={item.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              {item.stops.map((s) => (
                <stop key={s.offset} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
          </defs>
          {item.path}
          {item.extra}
        </svg>
        <h3 className="font-sans font-bold text-[1.05rem] text-neutral-900 text-center leading-tight">
          {item.title}
        </h3>
      </div>

      {/* Hover overlay — description (skipped for noOverlay cards) */}
      {!item.noOverlay && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-300"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(12px)",
            pointerEvents: active ? "auto" : "none",
          }}
        >
          <div className="absolute inset-0 bg-deep-sage/[0.92] rounded-2xl" />
          <div className="relative text-center">
            <p className="font-sans font-semibold text-[0.75rem] text-[#F5F0E8]/60 uppercase tracking-widest mb-2">
              {item.title}
            </p>
            <p className="font-sans text-[0.97rem] text-[#F5F0E8] leading-[1.6]">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WhatWeOffer() {
  return (
    <section className="bg-white rounded-t-[32px] md:rounded-t-[48px] -mt-6 md:-mt-10 relative z-[42]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <SectionTitle>Tools that change how you feel</SectionTitle>
        </div>

        {/* 2-col grid — 6 cards, 3 rows */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {offerings.slice(0, 6).map((item) => (
            <OfferingCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
