"use client";

import AdminCard from "@/components/admin/ui/AdminCard";
import type { FunnelStep } from "@/lib/admin/types";

const barColors = ["#0BA89A", "#2D4A3E", "#E8603A", "#F0A500", "#6BAA3E"];

interface FunnelChartProps {
  data: FunnelStep[];
}

export default function FunnelChart({ data }: FunnelChartProps) {
  const maxValue = data[0]?.value ?? 1;

  return (
    <AdminCard className="p-6">
      <h3 className="mb-6 text-base font-semibold text-neutral-900">Conversion Funnel</h3>
      <div className="space-y-4">
        {data.map((step, i) => {
          const widthPct = Math.max((step.value / maxValue) * 100, 8);
          return (
            <div key={step.label}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-700">{step.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-900">
                    {step.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-neutral-500">({step.percentage}%)</span>
                </div>
              </div>
              <div className="h-8 w-full rounded-lg bg-neutral-100">
                <div
                  className="flex h-full items-center rounded-lg px-3 transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: barColors[i % barColors.length],
                  }}
                >
                  {widthPct > 20 && (
                    <span className="text-xs font-semibold text-white">
                      {step.percentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AdminCard>
  );
}
