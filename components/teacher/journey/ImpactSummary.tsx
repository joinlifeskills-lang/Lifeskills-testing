import { Users, Trophy, BarChart3, Heart } from "lucide-react";
import { teacherClients } from "@/lib/teacher/data";

export default function ImpactSummary() {
  const totalClients = teacherClients.length;
  const totalSessions = teacherClients.reduce((sum, c) => sum + c.totalSessions, 0);
  const avgSessions = Math.round((totalSessions / totalClients) * 10) / 10;

  const stats = [
    {
      label: "Total Clients",
      value: totalClients,
      icon: Users,
      color: "bg-electric-teal",
    },
    {
      label: "Total Sessions",
      value: totalSessions,
      icon: Trophy,
      color: "bg-lime-sage",
    },
    {
      label: "Avg Sessions/Client",
      value: avgSessions,
      icon: BarChart3,
      color: "bg-bright-amber",
    },
    {
      label: "Retention Rate",
      value: "78%",
      sublabel: "rebook",
      icon: Heart,
      color: "bg-vivid-coral",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5"
        >
          <div
            className={`${stat.color} inline-flex h-10 w-10 items-center justify-center rounded-full text-white`}
          >
            <stat.icon size={20} />
          </div>
          <p className="mt-3 text-2xl font-bold text-neutral-900">
            {stat.value}
            {"sublabel" in stat && (
              <span className="ml-1 text-sm font-normal text-neutral-500">
                {stat.sublabel}
              </span>
            )}
          </p>
          <p className="text-sm text-neutral-500">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
