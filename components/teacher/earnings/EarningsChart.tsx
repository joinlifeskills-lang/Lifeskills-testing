"use client";

import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyEarning } from "@/lib/teacher/types";

type TimeView = "week" | "month" | "year";

interface Props {
  weeklyData: MonthlyEarning[];
  monthlyData: MonthlyEarning[];
  yearlyData: MonthlyEarning[];
}

const VIEW_CONFIG: Record<TimeView, { label: string }> = {
  week: { label: "Week" },
  month: { label: "Month" },
  year: { label: "Year" },
};

function formatCurrency(value: number) {
  if (value >= 1000) {
    return "$" + (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1) + "k";
  }
  return "$" + value.toLocaleString("en-US", { minimumFractionDigits: 0 });
}

function getTotal(data: MonthlyEarning[]) {
  return data.reduce((sum, d) => sum + d.amount, 0);
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-neutral-100 px-3 py-2.5 min-w-[90px]">
        <p className="text-[11px] text-neutral-400 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-neutral-900">
          ${payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>
    );
  }
  return null;
}

export default function EarningsChart({ weeklyData, monthlyData, yearlyData }: Props) {
  const [view, setView] = useState<TimeView>("month");

  const dataMap: Record<TimeView, MonthlyEarning[]> = {
    week: weeklyData,
    month: monthlyData,
    year: yearlyData,
  };

  const data = dataMap[view];
  const total = getTotal(data);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-neutral-400 uppercase tracking-wide mb-2">
              Earnings Over Time
            </p>
            <span className="font-display text-3xl font-bold text-deep-sage leading-none">
              {formatCurrency(total)}
            </span>
          </div>

          {/* Toggle pills */}
          <div className="flex bg-neutral-100 rounded-xl p-1 gap-0.5 shrink-0">
            {(["week", "month", "year"] as TimeView[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-150 ${
                  view === v
                    ? "bg-white text-neutral-900 shadow-sm"
                    : "text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {VIEW_CONFIG[v].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 px-1 pb-3 pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 12, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0BA89A" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#0BA89A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#a3a3a3", fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
              dy={6}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "#0BA89A", strokeWidth: 1, strokeDasharray: "4 3", opacity: 0.5 }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#0BA89A"
              strokeWidth={2.5}
              fill="url(#earningsGradient)"
              dot={false}
              activeDot={{
                r: 4.5,
                fill: "#0BA89A",
                strokeWidth: 2.5,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
