import {
  Sparkles,
  Trophy,
  Palette,
  Clock,
  Flame,
  Award,
  Star,
  Zap,
  Lock,
  Check,
  type LucideIcon,
} from "lucide-react";
import { milestones } from "@/lib/member/data";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Trophy,
  Palette,
  Clock,
  Flame,
  Award,
  Star,
  Zap,
};

const iconColors: Record<string, string> = {
  Sparkles: "#F0A500",
  Trophy: "#E8603A",
  Palette: "#6B5BAA",
  Clock: "#0BA89A",
  Flame: "#E8603A",
  Award: "#F0A500",
  Star: "#D4940A",
  Zap: "#0BA89A",
};

export default function MilestoneBadges() {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-5">
        Milestones
      </h3>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
        {milestones.map((m) => {
          const Icon = iconMap[m.icon] || Sparkles;
          const color = iconColors[m.icon] || "#2D4A3E";

          return (
            <div
              key={m.id}
              className={`flex flex-col items-center shrink-0 w-20 ${
                !m.earned ? "opacity-40" : ""
              }`}
            >
              {/* Badge circle */}
              <div className="relative">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: m.earned ? `${color}15` : "#EBEBEB",
                  }}
                >
                  {m.earned ? (
                    <Icon size={24} style={{ color }} />
                  ) : (
                    <Lock size={20} className="text-neutral-400" />
                  )}
                </div>
                {m.earned && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-lime-sage flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
              </div>
              <span className="mt-2 text-xs font-medium text-neutral-700 text-center leading-tight">
                {m.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
