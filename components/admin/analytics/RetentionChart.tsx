"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AdminCard from "@/components/admin/ui/AdminCard";

const cohortColors: Record<string, string> = {
  oct: "#0BA89A",
  nov: "#2D4A3E",
  dec: "#E8603A",
  jan: "#F0A500",
  feb: "#6BAA3E",
  mar: "#0BA89A",
};

const cohortLabels: Record<string, string> = {
  oct: "Oct 2025",
  nov: "Nov 2025",
  dec: "Dec 2025",
  jan: "Jan 2026",
  feb: "Feb 2026",
  mar: "Mar 2026",
};

interface RetentionChartProps {
  data: Array<Record<string, string | number | null>>;
}

export default function RetentionChart({ data }: RetentionChartProps) {
  const cohortKeys = Object.keys(cohortLabels);

  return (
    <AdminCard className="p-6">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">Cohort Retention</h3>
      <p className="mb-4 text-sm text-neutral-500">
        Percentage of members still active after each month
      </p>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#737373" }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              tickFormatter={(v: number) => `${v}%`}
              width={45}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "none",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
              formatter={(value, name) => [
                `${value}%`,
                cohortLabels[name as string] || name,
              ]}
            />
            <Legend
              formatter={(value: string) => cohortLabels[value] || value}
              iconType="circle"
              wrapperStyle={{ fontSize: 12 }}
            />
            {cohortKeys.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={cohortColors[key]}
                strokeWidth={2}
                dot={{ r: 4, fill: cohortColors[key], stroke: "#fff", strokeWidth: 2 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  );
}
