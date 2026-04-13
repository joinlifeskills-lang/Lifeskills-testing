import Link from "next/link";
import { Star } from "lucide-react";
import { teachers, disciplineTagColors } from "@/lib/teachers";

// Teachers the member hasn't worked with
const workedWithSlugs = [
  "maya-reyes",
  "carlos-vega",
  "lena-park",
  "james-okafor",
  "anika-sharma",
  "kwame-mensah",
  "priya-nair",
];

const recommended = teachers
  .filter((t) => !workedWithSlugs.includes(t.slug))
  .slice(0, 3);

const bgColorMap: Record<string, string> = {
  "bg-electric-teal": "#0BA89A",
  "bg-vivid-coral": "#E8603A",
  "bg-bright-amber": "#F0A500",
  "bg-lime-sage": "#6BAA3E",
  "bg-deep-sage": "#2D4A3E",
};

export default function RecommendedTeachers() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommended.map((teacher) => (
        <div
          key={teacher.slug}
          className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center text-white font-semibold text-lg mb-3"
            style={{
              backgroundColor: bgColorMap[teacher.bgColor] || "#2D4A3E",
            }}
          >
            {teacher.initials}
          </div>

          <p className="font-semibold text-neutral-900">{teacher.name}</p>

          {/* Discipline tags */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-2">
            {teacher.disciplines.map((d) => {
              const tagColor = disciplineTagColors[d];
              return (
                <span
                  key={d}
                  className="px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: tagColor.bg,
                    color: tagColor.text,
                  }}
                >
                  {d}
                </span>
              );
            })}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-sm text-neutral-700">
            <Star size={14} className="text-bright-amber fill-bright-amber" />
            <span>{teacher.rating}</span>
          </div>

          {/* Price */}
          <p className="text-sm text-neutral-500 mt-1">
            From ${teacher.price}/session
          </p>

          {/* CTA */}
          <Link
            href={`/dashboard/explore/${teacher.slug}`}
            className="mt-4 border border-deep-sage text-deep-sage rounded-full py-[10px] px-[26px] text-[0.88rem] font-semibold hover:bg-deep-sage hover:text-white transition-colors"
          >
            View Profile
          </Link>
        </div>
      ))}
    </div>
  );
}
