"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "./ui/SectionTitle";

const steps = [
  {
    n: "1",
    title: "Find the right teacher",
    description:
      "Whether you're looking for healing or to build lasting skills for peace of mind — browse certified teachers and book free intro calls until you find the one that feels right.",
  },
  {
    n: "2",
    title: "Book your first session",
    description:
      "Once you've found your teacher, schedule your first live session in minutes.",
  },
  {
    n: "3",
    title: "Leave feeling better",
    description:
      "Every session ends with you calmer, clearer, and equipped with real skills you can carry with you for life.",
  },
];

function BrowseScreen() {
  const teachers = [
    { initials: "MC", name: "Maya Chen", skill: "Breathwork & Meditation", rating: "5.0", bg: "#2D4A3E", featured: true },
    { initials: "JO", name: "James Obi", skill: "Somatic Healing", rating: "4.9", bg: "#0BA89A", featured: false },
    { initials: "SR", name: "Sarah Ross", skill: "Yoga & Guidance", rating: "5.0", bg: "#E8603A", featured: false },
  ];
  return (
    <div className="flex flex-col h-full bg-[#F5F0E8]">
      <div className="bg-white px-4 py-3 border-b border-black/[0.07]">
        <p className="text-[0.52rem] text-[#7A7A7A] font-sans uppercase tracking-widest mb-1.5">Lifeskills</p>
        <div className="bg-[#F5F0E8] rounded-xl px-3 py-2 flex items-center gap-2">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#7A7A7A" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="#7A7A7A" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-[0.55rem] text-[#7A7A7A] font-sans">Find a teacher…</span>
        </div>
      </div>
      <div className="flex-1 px-3 py-3 flex flex-col gap-2 overflow-hidden">
        <p className="text-[0.5rem] font-semibold text-[#7A7A7A] font-sans uppercase tracking-widest px-1 mb-0.5">
          Certified Teachers
        </p>
        {teachers.map((t) => (
          <div
            key={t.name}
            className={`bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border ${
              t.featured ? "border-[#2D4A3E]/25" : "border-transparent"
            }`}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: t.bg }}
            >
              <span className="text-white text-[0.55rem] font-bold font-sans">{t.initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[0.6rem] font-bold text-[#1A1A1A] font-sans">{t.name}</p>
              <p className="text-[0.52rem] text-[#7A7A7A] font-sans truncate">{t.skill}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-0.5">
                <svg width="7" height="7" viewBox="0 0 16 16">
                  <path
                    d="M8 1.5l1.75 3.55 3.92.57-2.84 2.77.67 3.91L8 10.27l-3.5 1.83.67-3.91L2.33 5.62l3.92-.57L8 1.5z"
                    fill="#F0A500"
                  />
                </svg>
                <span className="text-[0.52rem] text-[#4A4A4A] font-sans font-semibold">{t.rating}</span>
              </div>
              {t.featured && (
                <span className="text-[0.44rem] text-[#2D4A3E] font-sans font-bold bg-[#2D4A3E]/10 px-1.5 py-0.5 rounded-full">
                  Free Intro
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 pb-4">
        <div className="w-full bg-[#2D4A3E] text-white text-[0.58rem] font-bold font-sans py-2.5 rounded-xl text-center">
          Book Free Intro Call →
        </div>
      </div>
    </div>
  );
}

function BookScreen() {
  const dayLabels = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [6, 7, 8, 9, 10, 11, 12];
  const times = ["9:00 AM", "11:00 AM", "2:00 PM", "4:30 PM"];
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-white px-4 py-3 border-b border-black/[0.07]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#2D4A3E] flex items-center justify-center shrink-0">
            <span className="text-white text-[0.48rem] font-bold font-sans">MC</span>
          </div>
          <div>
            <p className="text-[0.6rem] font-bold text-[#1A1A1A] font-sans">Maya Chen</p>
            <p className="text-[0.5rem] text-[#7A7A7A] font-sans">Breathwork · 60 min</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 flex-1">
        <p className="text-[0.5rem] font-bold text-[#7A7A7A] font-sans uppercase tracking-widest mb-2">
          April 2026
        </p>
        <div className="grid grid-cols-7 mb-3">
          {dayLabels.map((d, i) => (
            <p key={i} className="text-center text-[0.45rem] text-[#B8B8B8] font-sans py-0.5">
              {d}
            </p>
          ))}
          {dates.map((d) => (
            <div
              key={d}
              className={`w-6 h-6 mx-auto rounded-full flex items-center justify-center text-[0.5rem] font-sans ${
                d === 11
                  ? "bg-[#2D4A3E] text-white font-bold"
                  : d === 9 || d === 10
                  ? "text-[#B8B8B8]"
                  : "text-[#1A1A1A]"
              }`}
            >
              {d}
            </div>
          ))}
        </div>
        <p className="text-[0.5rem] font-bold text-[#7A7A7A] font-sans uppercase tracking-widest mb-2">
          Available times
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {times.map((t) => (
            <div
              key={t}
              className={`text-center py-2 rounded-xl border text-[0.52rem] font-semibold font-sans ${
                t === "11:00 AM"
                  ? "bg-[#2D4A3E] text-white border-[#2D4A3E]"
                  : "border-[#EBEBEB] text-[#4A4A4A]"
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 pb-4">
        <div className="w-full bg-[#F0A500] text-white text-[0.58rem] font-bold font-sans py-2.5 rounded-xl text-center">
          Confirm Booking →
        </div>
      </div>
    </div>
  );
}

function SessionScreen() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/iphone_session.jpeg"
        alt="Live session"
        fill
        className="object-cover"
        style={{ objectPosition: "50% 30%", transform: "scale(1.55)", transformOrigin: "50% 35%" }}
      />
    </div>
  );
}

const screens = [<BrowseScreen key="browse" />, <BookScreen key="book" />, <SessionScreen key="session" />];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="bg-deep-gradient rounded-t-[32px] md:rounded-t-[48px] -mt-6 md:-mt-10 relative z-20"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-14 md:mb-20">
          <SectionTitle tone="dark">How Lifeskills works</SectionTitle>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-10">
          {/* Step cards */}
          <ol className="flex-1 flex flex-col gap-4">
            {steps.map((step, i) => (
              <li
                key={step.n}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`relative flex gap-6 items-start px-7 py-6 rounded-2xl cursor-pointer transition-all duration-300 border select-none ${
                  active === i
                    ? "bg-warm-sand border-warm-sand"
                    : "bg-warm-sand/70 border-warm-sand/40 hover:bg-warm-sand/85"
                }`}
              >
                {/* Amber accent bar */}
                <div
                  className={`absolute left-0 top-5 bottom-5 w-[3px] rounded-full transition-all duration-300 ${
                    active === i ? "opacity-100 bg-bright-amber" : "opacity-0 bg-bright-amber"
                  }`}
                />
                <span
                  className={`font-display text-[2.4rem] leading-none shrink-0 transition-colors duration-300 ${
                    active === i ? "text-bright-amber" : "text-neutral-300"
                  }`}
                >
                  {step.n}
                </span>
                <div>
                  <h3
                    className="font-sans font-bold text-[1.15rem] mb-1.5 text-deep-sage"
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`font-sans text-[0.95rem] leading-[1.6] transition-colors duration-300 ${
                      active === i ? "text-neutral-700" : "text-neutral-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Phone mockup — hidden on mobile */}
          <div className="hidden md:flex flex-shrink-0 justify-center">
            <div className="relative">
              {/* Glow blob behind phone */}
              <div className="absolute -inset-8 rounded-[48px] bg-white/[0.04] blur-xl -z-10" />
              {/* Phone shell */}
              <div className="w-[260px] h-[530px] rounded-[42px] bg-[#111] p-[3px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] ring-1 ring-white/[0.08]">
                <div className="w-full h-full rounded-[40px] overflow-hidden bg-white flex flex-col">
                  {/* Status bar */}
                  <div className="flex-shrink-0 h-7 bg-white flex items-center justify-between px-5 z-10">
                    <span className="text-[0.48rem] font-bold text-[#1A1A1A] font-sans">9:41</span>
                    <div className="flex items-center gap-1">
                      {/* Signal bars */}
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="#1A1A1A">
                        <rect x="0" y="6" width="2" height="3" rx="0.5" />
                        <rect x="3.3" y="4" width="2" height="5" rx="0.5" />
                        <rect x="6.6" y="2" width="2" height="7" rx="0.5" />
                        <rect x="9.9" y="0" width="2" height="9" rx="0.5" />
                      </svg>
                      {/* Battery */}
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <rect x="0.5" y="0.5" width="13" height="7" rx="1.5" stroke="#1A1A1A" strokeWidth="1" />
                        <rect x="1.5" y="1.5" width="10" height="5" rx="0.8" fill="#1A1A1A" />
                        <path d="M14.5 2.5v3" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Dynamic screen with slide transition */}
                  <div className="flex-1 overflow-hidden relative">
                    {screens.map((screen, i) => (
                      <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                          active === i
                            ? "opacity-100 translate-y-0"
                            : active > i
                            ? "opacity-0 -translate-y-3 pointer-events-none"
                            : "opacity-0 translate-y-3 pointer-events-none"
                        }`}
                      >
                        {screen}
                      </div>
                    ))}
                  </div>

                  {/* Home indicator */}
                  <div className="flex-shrink-0 h-5 bg-white flex items-center justify-center">
                    <div className="w-16 h-[3px] rounded-full bg-[#1A1A1A]/15" />
                  </div>
                </div>
              </div>

              {/* Step dot indicators */}
              <div className="flex justify-center gap-2 mt-5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      active === i ? "w-5 h-2 bg-bright-amber" : "w-2 h-2 bg-white/25"
                    }`}
                    aria-label={`Step ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
