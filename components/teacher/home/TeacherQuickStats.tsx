import { teacherStats } from "@/lib/teacher/data";
import { Video, DollarSign, Star, Users } from "lucide-react";

const stats = [
  {
    label: "Sessions This Week",
    value: teacherStats.sessionsThisWeek.toString(),
    icon: Video,
    color: "bg-electric-teal",
  },
  {
    label: "Earnings This Month",
    value: `$${teacherStats.earningsThisMonth.toLocaleString()}`,
    icon: DollarSign,
    color: "bg-lime-sage",
  },
  {
    label: "Avg Rating",
    value: teacherStats.avgRating.toString(),
    icon: Star,
    color: "bg-bright-amber",
  },
  {
    label: "Active Clients",
    value: teacherStats.activeClients.toString(),
    icon: Users,
    color: "bg-deep-sage",
  },
];

export default function TeacherQuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-4 md:p-5"
          >
            <div
              className={`h-10 w-10 rounded-full ${stat.color} flex items-center justify-center text-white mb-3`}
            >
              <Icon size={20} />
            </div>
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-0.5">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
}
