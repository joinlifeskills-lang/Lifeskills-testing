"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { DollarSign, Wallet, ArrowDownCircle, Clock, RotateCcw } from "lucide-react";
import AdminCard from "@/components/admin/ui/AdminCard";
import StatCard from "@/components/admin/ui/StatCard";

const COLORS = ["#0BA89A", "#2D4A3E", "#F0A500"];

interface RevenueOverviewProps {
  overview: {
    totalRevenue: number;
    platformFees: number;
    teacherPayouts: number;
    pendingPayouts: number;
    refunds: number;
  };
}

export default function RevenueOverview({ overview }: RevenueOverviewProps) {
  const pieData = [
    { name: "Platform Fees", value: overview.platformFees },
    { name: "Teacher Payouts", value: overview.teacherPayouts },
    { name: "Pending Payouts", value: overview.pendingPayouts },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          icon={<DollarSign size={20} />}
          value={`$${overview.totalRevenue.toLocaleString()}`}
          label="Total Revenue"
          change={12.4}
          trend="up"
        />
        <StatCard
          icon={<Wallet size={20} />}
          value={`$${overview.platformFees.toLocaleString()}`}
          label="Platform Fees"
          change={10.2}
          trend="up"
        />
        <StatCard
          icon={<ArrowDownCircle size={20} />}
          value={`$${overview.teacherPayouts.toLocaleString()}`}
          label="Teacher Payouts"
          change={14.8}
          trend="up"
        />
        <StatCard
          icon={<Clock size={20} />}
          value={`$${overview.pendingPayouts.toLocaleString()}`}
          label="Pending Payouts"
          change={5.3}
          trend="down"
        />
        <StatCard
          icon={<RotateCcw size={20} />}
          value={`$${overview.refunds.toLocaleString()}`}
          label="Refunds"
          change={2.1}
          trend="down"
        />
      </div>

      {/* Pie chart */}
      <AdminCard className="p-6">
        <h3 className="mb-4 text-base font-semibold text-neutral-900">Revenue Breakdown</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  fontSize: 13,
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 13 }}
                formatter={(value: string) => (
                  <span className="text-sm text-neutral-700">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </AdminCard>
    </div>
  );
}
