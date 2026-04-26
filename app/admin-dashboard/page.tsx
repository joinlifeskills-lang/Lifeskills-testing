import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import StatCard from "@/components/admin/ui/StatCard";
import RevenueChart from "@/components/admin/dashboard/RevenueChart";
import PendingActions from "@/components/admin/dashboard/PendingActions";
import ActivityFeed from "@/components/admin/dashboard/ActivityFeed";
import QuickStats from "@/components/admin/dashboard/QuickStats";
import { dashboardMetrics } from "@/lib/admin/dashboard";
import { DollarSign, Users, Video, GraduationCap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign size={20} />,
  Users: <Users size={20} />,
  Video: <Video size={20} />,
  GraduationCap: <GraduationCap size={20} />,
};

export default function AdminDashboard() {
  return (
    <>
      <AdminTopBar title="Dashboard" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Metrics */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dashboardMetrics.map((m) => (
            <StatCard
              key={m.label}
              icon={iconMap[m.icon]}
              value={m.value}
              label={m.label}
              change={m.change}
              trend={m.trend}
            />
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: chart + activity */}
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-2">
            <RevenueChart />
            <ActivityFeed />
          </div>
          {/* Right column: pending actions + quick stats */}
          <div className="flex min-w-0 flex-col gap-6">
            <PendingActions />
            <QuickStats />
          </div>
        </div>
      </div>
    </>
  );
}
