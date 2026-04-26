"use client";

import { useState } from "react";
import { type Teacher, disciplineTagColors, disciplineGradient } from "@/lib/teachers";
import { MessageSquare } from "lucide-react";
import MessageSignupPrompt from "./MessageSignupPrompt";

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const gradient = disciplineGradient[teacher.disciplines[0]];
  const [showPrompt, setShowPrompt] = useState(false);

  const redirectUrl = `/login?redirect=${encodeURIComponent(`/customer-dashboard/messages?teacher=${teacher.slug}`)}`;

  return (
    <>
      <article className="w-full bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row overflow-hidden">
        {/* Avatar placeholder with play button */}
        <div
          className="relative w-full sm:w-52 h-48 sm:h-auto flex items-center justify-center flex-shrink-0"
          style={{ background: gradient }}
        >
          <span className="font-sans font-bold text-white/90 text-[2.2rem]">
            {teacher.initials}
          </span>
          <button
            type="button"
            aria-label={`Play introduction from ${teacher.name}`}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-colors cursor-pointer shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 1.5v11l9-5.5L3 1.5z" fill="white" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <h3 className="font-sans font-bold text-deep-sage text-[1.1rem] leading-tight mb-2">
            {teacher.name}
          </h3>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {teacher.disciplines.map((d) => {
              const colors = disciplineTagColors[d];
              return (
                <span
                  key={d}
                  className="inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.7rem] font-semibold"
                  style={{ backgroundColor: colors.bg, color: colors.text }}
                >
                  {d}
                </span>
              );
            })}
          </div>

          <div className="font-sans font-bold text-deep-sage text-[1.15rem] mb-2">
            ${teacher.price} <span className="font-normal text-[0.85rem] text-neutral-500">/ session</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4 text-[0.82rem] font-sans text-neutral-600">
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Available {teacher.nextAvailable}
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400" aria-hidden="true">
                <path d="M12 20V10" />
                <path d="M18 20V4" />
                <path d="M6 20v-4" />
              </svg>
              {teacher.yearsExperience} years experience
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {teacher.languages.join(", ")}
            </div>
          </div>

          <p className="font-sans text-[0.9rem] font-medium text-deep-sage leading-[1.5] mb-5">
            {teacher.tagline}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-auto">
            <a
              href={`/find-a-teacher/${teacher.slug}`}
              className="flex-1 text-center rounded-full border border-deep-sage text-deep-sage px-4 py-2.5 text-[0.82rem] font-semibold hover:bg-deep-sage/5 transition-colors"
            >
              View Profile
            </a>
            <a
              href={`/find-a-teacher/${teacher.slug}`}
              className="flex-1 text-center rounded-full bg-deep-sage text-white px-4 py-2.5 text-[0.82rem] font-semibold hover:opacity-90 transition-opacity"
            >
              Book Session
            </a>
            <button
              type="button"
              onClick={() => setShowPrompt(true)}
              className="flex items-center justify-center shrink-0 h-10 w-10 rounded-full border border-neutral-200 text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
              title={`Message ${teacher.name}`}
            >
              <MessageSquare size={17} />
            </button>
          </div>
        </div>
      </article>

      {showPrompt && (
        <MessageSignupPrompt
          teacherName={teacher.name.split(" ")[0]}
          redirectUrl={redirectUrl}
          onClose={() => setShowPrompt(false)}
        />
      )}
    </>
  );
}
