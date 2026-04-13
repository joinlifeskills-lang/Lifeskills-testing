import Link from "next/link";
import { Star } from "lucide-react";
import {
  Teacher,
  disciplineTagColors,
  disciplineGradient,
} from "@/lib/teachers";
import type { Discipline } from "@/lib/teachers";

const badgeColors: Record<string, string> = {
  "Top Teacher": "#0BA89A",
  New: "#6BAA3E",
  "Most Booked": "#F0A500",
};

interface ExploreTeacherCardProps {
  teacher: Teacher;
}

export default function ExploreTeacherCard({ teacher }: ExploreTeacherCardProps) {
  const primaryDiscipline = teacher.disciplines[0] as Discipline;
  const gradient = disciplineGradient[primaryDiscipline];

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6 flex flex-col">
      {/* Avatar + badge */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="h-14 w-14 rounded-full flex items-center justify-center text-white font-semibold text-lg"
          style={{ background: gradient }}
        >
          {teacher.initials}
        </div>
        {teacher.badge && (
          <span
            className="px-2.5 py-0.5 rounded-full text-white text-xs font-semibold"
            style={{ backgroundColor: badgeColors[teacher.badge] }}
          >
            {teacher.badge}
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-lg text-neutral-900 mb-2">
        {teacher.name}
      </h3>

      {/* Discipline tags */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {teacher.disciplines.map((d) => {
          const colors = disciplineTagColors[d];
          return (
            <span
              key={d}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: colors.bg, color: colors.text }}
            >
              {d}
            </span>
          );
        })}
      </div>

      {/* Rating + sessions */}
      <div className="flex items-center gap-1.5 text-sm mb-2">
        <Star size={14} className="text-bright-amber fill-bright-amber" />
        <span className="font-medium text-neutral-900">{teacher.rating}</span>
        <span className="text-neutral-400">
          ({teacher.sessions} sessions)
        </span>
      </div>

      {/* Price */}
      <p className="text-sm font-semibold text-neutral-700 mb-2">
        ${teacher.price}/session
      </p>

      {/* Bio */}
      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2 mb-5 flex-1">
        {teacher.tagline}
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        <Link
          href={`/find-a-teacher/${teacher.slug}`}
          className="flex-1 text-center py-2.5 rounded-full font-semibold text-[0.88rem] border border-deep-sage text-deep-sage bg-transparent hover:bg-deep-sage/5 transition-colors"
        >
          View Profile
        </Link>
        <button className="flex-1 py-2.5 rounded-full font-semibold text-[0.88rem] bg-deep-sage text-white hover:bg-deep-sage-hover transition-colors">
          Book Intro Call
        </button>
      </div>
    </div>
  );
}
