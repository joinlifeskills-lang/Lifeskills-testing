"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import AdminCard from "@/components/admin/ui/AdminCard";
import type { DisciplineMetric } from "@/lib/admin/types";

const barColors = ["#0BA89A", "#2D4A3E", "#E8603A", "#F0A500", "#6BAA3E"];

interface DisciplinePopularityProps {
  data: DisciplineMetric[];
}

export default function DisciplinePopularity({ data }: DisciplinePopularityProps) {
  const chartData = data.map((d, i) => ({
    name: d.discipline,
    sessions: d.sessions,
    fill: barColors[i % barColors.length],
  }));

  return (
    <AdminCard className="p-6">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">Discipline Popularity</h3>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
              width={45}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
              formatter={(value) => [Number(value).toLocaleString(), "Sessions"]}
            />
            <Bar dataKey="sessions" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, i) => (
                <Cell key={entry.name} fill={barColors[i % barColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detail table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-100">
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Discipline
              </th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Sessions
              </th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Revenue
              </th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Growth
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={d.discipline} className="border-b border-neutral-50">
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: barColors[i] }}
                    />
                    <span className="text-sm font-medium text-neutral-900">{d.discipline}</span>
                  </div>
                </td>
                <td className="py-2.5 text-right text-sm text-neutral-700">
                  {d.sessions.toLocaleString()}
                </td>
                <td className="py-2.5 text-right text-sm text-neutral-700">
                  ${d.revenue.toLocaleString()}
                </td>
                <td className="py-2.5 text-right">
                  <span
                    className={`inline-flex items-center gap-1 text-sm font-semibold ${
                      d.growth >= 0 ? "text-lime-sage" : "text-vivid-coral"
                    }`}
                  >
                    {d.growth >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {d.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
