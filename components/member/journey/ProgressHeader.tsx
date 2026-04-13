import { Flame } from "lucide-react";
import { memberStats } from "@/lib/member/data";

export default function ProgressHeader() {
  const total = memberStats.totalSessions;
  const goal = 25;
  const progress = total / goal;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Progress ring */}
        <div className="relative shrink-0">
          <svg width="128" height="128" viewBox="0 0 128 128">
            {/* Background ring */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#EBEBEB"
              strokeWidth="8"
            />
            {/* Progress ring */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              fill="none"
              stroke="#0BA89A"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 64 64)"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-neutral-900">{total}</span>
            <span className="text-xs text-neutral-500">of {goal}</span>
          </div>
        </div>

        {/* Text stats */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-3xl font-bold text-neutral-900">{total}</p>
          <p className="text-sm text-neutral-500 mt-0.5">sessions completed</p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            {/* Streak badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-vivid-coral/10 text-vivid-coral text-sm font-semibold">
              <Flame size={16} />
              {memberStats.currentStreak} week streak
            </span>

            {/* Total hours */}
            <span className="text-sm text-neutral-500">
              {memberStats.totalHours} hours total
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
