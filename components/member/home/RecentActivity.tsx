import { Video, Star, Trophy, Calendar } from "lucide-react";
import { activityFeed } from "@/lib/member/data";

const typeConfig: Record<
  string,
  { icon: React.ElementType; color: string; bgColor: string }
> = {
  session: { icon: Video, color: "#0BA89A", bgColor: "#0BA89A1A" },
  review: { icon: Star, color: "#F0A500", bgColor: "#F0A5001A" },
  milestone: { icon: Trophy, color: "#E8603A", bgColor: "#E8603A1A" },
  booking: { icon: Calendar, color: "#6BAA3E", bgColor: "#6BAA3E1A" },
};

export default function RecentActivity() {
  const items = activityFeed.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 md:p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Recent Activity
      </h3>
      <ul className="space-y-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;
          const formattedDate = new Date(item.date).toLocaleDateString(
            "en-US",
            { month: "short", day: "numeric" }
          );

          return (
            <li key={item.id} className="flex items-start gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon size={15} style={{ color: config.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900">{item.message}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {formattedDate}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
