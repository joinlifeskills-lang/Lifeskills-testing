"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AdminCard from "@/components/admin/ui/AdminCard";
import type { TimeSeriesPoint } from "@/lib/admin/types";

interface GrowthChartProps {
  data: TimeSeriesPoint[];
  title: string;
  color: string;
  valuePrefix?: string;
}

export default function GrowthChart({ data, title, color, valuePrefix = "$" }: GrowthChartProps) {
  const gradientId = `gradient-${title.replace(/\s/g, "-").toLowerCase()}`;

  return (
    <AdminCard className="p-6">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">{title}</h3>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) =>
                valuePrefix === "$" ? `$${(v / 1000).toFixed(0)}k` : v.toLocaleString()
              }
              width={50}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
              formatter={(value) => [
                `${valuePrefix === "$" ? "$" : ""}${Number(value).toLocaleString()}`,
                title,
              ]}
              labelFormatter={(label) => String(label)}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 5, fill: color, stroke: "#fff", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  );
}
