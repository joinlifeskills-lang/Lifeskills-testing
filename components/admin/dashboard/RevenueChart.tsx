"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { revenueChartData } from "@/lib/admin/dashboard";
import AdminCard from "@/components/admin/ui/AdminCard";

export default function RevenueChart() {
  return (
    <AdminCard className="p-5">
      <h3 className="mb-4 text-sm font-semibold text-neutral-900">Revenue Trend</h3>
      <div className="h-[200px] sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueChartData} margin={{ right: 16 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0BA89A" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0BA89A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#7A7A7A" }} axisLine={false} tickLine={false} />
            <YAxis
              tick={{ fontSize: 12, fill: "#7A7A7A" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0BA89A"
              strokeWidth={2.5}
              fill="url(#revenueGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AdminCard>
  );
}
