import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  change: number;
  trend: "up" | "down";
}

export default function StatCard({ icon, value, label, change, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-deep-sage/10 text-deep-sage">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-semibold ${
            trend === "up" ? "text-lime-sage" : "text-vivid-coral"
          }`}
        >
          {trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-neutral-900">{value}</p>
      <p className="mt-0.5 text-sm text-neutral-500">{label}</p>
    </div>
  );
}
