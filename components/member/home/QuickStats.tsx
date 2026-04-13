import { CheckCircle, Flame, Clock, Calendar } from "lucide-react";
import { memberStats } from "@/lib/member/data";

const stats = [
  {
    label: "Total Sessions",
    value: memberStats.totalSessions,
    icon: CheckCircle,
    color: "#0BA89A",
    bgColor: "#0BA89A1A",
  },
  {
    label: "Week Streak",
    value: memberStats.currentStreak,
    icon: Flame,
    color: "#E8603A",
    bgColor: "#E8603A1A",
  },
  {
    label: "Hours Practiced",
    value: memberStats.totalHours,
    icon: Clock,
    color: "#F0A500",
    bgColor: "#F0A5001A",
  },
  {
    label: "Next Session",
    value: `In ${memberStats.nextSessionIn}`,
    icon: Calendar,
    color: "#6BAA3E",
    bgColor: "#6BAA3E1A",
  },
];

export default function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5"
          >
            <div
              className="h-10 w-10 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: stat.bgColor }}
            >
              <Icon size={20} style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
