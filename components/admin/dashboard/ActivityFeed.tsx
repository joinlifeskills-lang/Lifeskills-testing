import { activityFeed } from "@/lib/admin/dashboard";
import AdminCard from "@/components/admin/ui/AdminCard";
import { Video, UserPlus, Star, Banknote, GraduationCap } from "lucide-react";

const typeIcons: Record<string, React.ReactNode> = {
  session: <Video size={14} />,
  signup: <UserPlus size={14} />,
  review: <Star size={14} />,
  payout: <Banknote size={14} />,
  teacher: <GraduationCap size={14} />,
};

const typeColors: Record<string, string> = {
  session: "bg-electric-teal/10 text-electric-teal",
  signup: "bg-lime-sage/10 text-lime-sage",
  review: "bg-bright-amber/10 text-bright-amber",
  payout: "bg-deep-sage/10 text-deep-sage",
  teacher: "bg-vivid-coral/10 text-vivid-coral",
};

export default function ActivityFeed() {
  return (
    <AdminCard className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900">Recent Activity</h3>
      <div className="space-y-1">
        {activityFeed.map((item) => (
          <div key={item.id} className="flex items-start gap-3 rounded-lg px-2 py-2.5">
            <div className={`mt-0.5 rounded-lg p-1.5 ${typeColors[item.type]}`}>
              {typeIcons[item.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-700">{item.message}</p>
              <p className="text-[0.65rem] text-neutral-400">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </AdminCard>
  );
}
