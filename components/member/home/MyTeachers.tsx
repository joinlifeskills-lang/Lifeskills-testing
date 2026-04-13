import Link from "next/link";
import { Plus } from "lucide-react";

const myTeachers = [
  { name: "Maya Reyes", initials: "MR", bgColor: "#0BA89A", slug: "maya-reyes" },
  { name: "Carlos Vega", initials: "CV", bgColor: "#E8603A", slug: "carlos-vega" },
  { name: "Lena Park", initials: "LP", bgColor: "#6BAA3E", slug: "lena-park" },
  { name: "James Okafor", initials: "JO", bgColor: "#F0A500", slug: "james-okafor" },
  { name: "Anika Sharma", initials: "AS", bgColor: "#2D4A3E", slug: "anika-sharma" },
  { name: "Kwame Mensah", initials: "KM", bgColor: "#0BA89A", slug: "kwame-mensah" },
  { name: "Priya Nair", initials: "PN", bgColor: "#E8603A", slug: "priya-nair" },
];

export default function MyTeachers() {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
      <div className="flex gap-4">
        {myTeachers.map((teacher) => (
          <Link
            key={teacher.slug}
            href={`/dashboard/explore/${teacher.slug}`}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div
              className="h-14 w-14 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              style={{ backgroundColor: teacher.bgColor }}
            >
              {teacher.initials}
            </div>
            <span className="text-xs text-neutral-700 font-medium max-w-[60px] text-center truncate">
              {teacher.name.split(" ")[0]}
            </span>
          </Link>
        ))}

        {/* Find new */}
        <Link
          href="/customer-dashboard/explore"
          className="flex flex-col items-center gap-1.5 shrink-0"
        >
          <div className="h-14 w-14 rounded-full border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 hover:border-electric-teal hover:text-electric-teal transition-colors">
            <Plus size={22} />
          </div>
          <span className="text-xs text-neutral-500 font-medium">
            Find new
          </span>
        </Link>
      </div>
    </div>
  );
}
