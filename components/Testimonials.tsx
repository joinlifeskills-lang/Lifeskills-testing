"use client";

import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";

const testimonials = [
  {
    initials: "S.R.",
    name: "Sofia R.",
    quote:
      "After just a few sessions I started sleeping better and feeling more like myself. My teacher genuinely listens and adapts to what I need.",
  },
  {
    initials: "J.M.",
    name: "James M.",
    quote:
      "I was skeptical at first, but the free intro call convinced me. The 1-on-1 format made all the difference — no scripted sessions, just real support.",
  },
  {
    initials: "A.K.",
    name: "Amara K.",
    quote:
      "Lifeskills gave me practical tools I actually use every day. I feel calmer at work and more present with my family.",
  },
];

function Stars() {
  return (
    <div className="flex gap-[3px] mb-4" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 1.5l1.75 3.55 3.92.57-2.84 2.77.67 3.91L8 10.27l-3.5 1.83.67-3.91L2.33 5.62l3.92-.57L8 1.5z"
            fill="#F0A500"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <article className="bg-white rounded-2xl border border-black/[0.05] shadow-[0_2px_16px_rgba(0,0,0,0.05)] p-7 md:p-8 flex flex-col h-full">
      <Stars />
      <p className="font-sans text-[0.97rem] text-neutral-700 leading-[1.6] mb-6 flex-1">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-deep-sage flex items-center justify-center shrink-0">
          <span className="font-sans font-semibold text-[0.78rem] text-white tracking-wide">
            {t.initials}
          </span>
        </div>
        <span className="font-sans font-semibold text-[0.9rem] text-neutral-900">
          {t.name}
        </span>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const isFirst = index === 0;
  const isLast = index === testimonials.length - 1;

  return (
    <section className="bg-warm-sand rounded-t-[32px] md:rounded-t-[48px] -mt-6 md:-mt-10 relative z-[50]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <SectionTitle>What our members say</SectionTitle>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative px-6">
          <TestimonialCard t={testimonials[index]} />
          <button
            type="button"
            onClick={() => setIndex((i) => i - 1)}
            disabled={isFirst}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-deep-sage transition-opacity disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M11 14l-5-5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            disabled={isLast}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-black/10 bg-white flex items-center justify-center text-deep-sage transition-opacity disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-7">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
