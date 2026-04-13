import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import EarningsSummaryHeader from "@/components/teacher/earnings/EarningsSummaryHeader";
import EarningsChart from "@/components/teacher/earnings/EarningsChart";
import SessionEarningsTable from "@/components/teacher/earnings/SessionEarningsTable";
import PayoutHistory from "@/components/teacher/earnings/PayoutHistory";
import PayoutSettings from "@/components/teacher/earnings/PayoutSettings";
import {
  earningsSummary,
  weeklyEarnings,
  monthlyEarnings,
  yearlyEarnings,
  sessionEarnings,
  payoutHistory,
} from "@/lib/teacher/data";

export default function EarningsPage() {
  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8 space-y-6">
        <h2 className="font-display text-2xl text-neutral-900">Earnings</h2>
        <EarningsSummaryHeader summary={earningsSummary} />
        <SessionEarningsTable earnings={sessionEarnings} />
        <PayoutHistory payouts={payoutHistory} />
        <EarningsChart
          weeklyData={weeklyEarnings}
          monthlyData={monthlyEarnings}
          yearlyData={yearlyEarnings}
        />
        <PayoutSettings />
      </div>
    </>
  );
}
