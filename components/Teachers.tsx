"use client";

import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import TeacherCard from "./ui/TeacherCard";
import { teachers } from "@/lib/teachers";

export default function Teachers() {
  const [index, setIndex] = useState(0);
  const total = teachers.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <SectionTitle>
            Guided by people who&rsquo;ve walked the path
          </SectionTitle>
        </div>
        <div className="relative max-w-[720px] mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {teachers.map((teacher) => (
                <div key={teacher.name} className="w-full flex-shrink-0 px-1">
                  <TeacherCard teacher={teacher} />
                </div>
              ))}
            </div>
          </div>

          {/* Prev arrow */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous teacher"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full w-11 h-11 rounded-full bg-white border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M15 6l-6 6 6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Next arrow */}
          <button
            type="button"
            onClick={next}
            aria-label="Next teacher"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full w-11 h-11 rounded-full bg-white border border-black/10 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex items-center justify-center text-deep-sage hover:bg-deep-sage hover:text-white transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teachers.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to ${t.name}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-deep-sage" : "w-2 bg-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
