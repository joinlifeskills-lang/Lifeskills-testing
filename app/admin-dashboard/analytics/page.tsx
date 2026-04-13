import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import GrowthChart from "@/components/admin/analytics/GrowthChart";
import FunnelChart from "@/components/admin/analytics/FunnelChart";
import DisciplinePopularity from "@/components/admin/analytics/DisciplinePopularity";
import RetentionChart from "@/components/admin/analytics/RetentionChart";
import {
  userGrowthData,
  sessionGrowthData,
  revenueGrowthData,
  funnelData,
  disciplineMetrics,
  retentionData,
} from "@/lib/admin/analytics";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-warm-sand">
      <AdminTopBar title="Analytics" />
      <div className="space-y-6 p-4 lg:p-8">
        {/* Growth charts row */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <GrowthChart
            data={userGrowthData}
            title="User Growth"
            color="#0BA89A"
            valuePrefix=""
          />
          <GrowthChart
            data={sessionGrowthData}
            title="Session Growth"
            color="#2D4A3E"
            valuePrefix=""
          />
          <GrowthChart
            data={revenueGrowthData}
            title="Revenue Growth"
            color="#6BAA3E"
            valuePrefix="$"
          />
        </div>

        {/* Funnel + Discipline side by side */}
        <div className="grid gap-6 lg:grid-cols-2">
          <FunnelChart data={funnelData} />
          <DisciplinePopularity data={disciplineMetrics} />
        </div>

        {/* Retention full width */}
        <RetentionChart data={retentionData} />
      </div>
    </div>
  );
}
