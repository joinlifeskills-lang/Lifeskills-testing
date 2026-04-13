import { quickStats } from "@/lib/admin/dashboard";
import AdminCard from "@/components/admin/ui/AdminCard";
import { Star, CheckCircle, Clock, Flame } from "lucide-react";

export default function QuickStats() {
  const stats = [
    { icon: <Star size={18} />, label: "Avg Rating", value: quickStats.avgSessionRating.toString(), color: "text-bright-amber" },
    { icon: <CheckCircle size={18} />, label: "Completion Rate", value: `${quickStats.completionRate}%`, color: "text-electric-teal" },
    { icon: <Clock size={18} />, label: "Avg Response", value: quickStats.avgResponseTime, color: "text-deep-sage" },
    { icon: <Flame size={18} />, label: "Top Discipline", value: quickStats.topDiscipline, color: "text-vivid-coral" },
  ];

  return (
    <AdminCard className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-neutral-50 p-3">
            <div className={`mb-2 ${s.color}`}>{s.icon}</div>
            <p className="text-lg font-bold text-neutral-900">{s.value}</p>
            <p className="text-xs text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
