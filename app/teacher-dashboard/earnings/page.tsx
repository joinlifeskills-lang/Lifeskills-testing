"use client";

import { useState } from "react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import EarningsSummaryHeader from "@/components/teacher/earnings/EarningsSummaryHeader";
import EarningsChart from "@/components/teacher/earnings/EarningsChart";
import SessionEarningsTable from "@/components/teacher/earnings/SessionEarningsTable";
import PayoutHistory from "@/components/teacher/earnings/PayoutHistory";
import PayoutSettings from "@/components/teacher/earnings/PayoutSettings";
import EarlyPayoutModal from "@/components/teacher/earnings/EarlyPayoutModal";
import {
  earningsSummary,
  weeklyEarnings,
  monthlyEarnings,
  yearlyEarnings,
  sessionEarnings,
  payoutHistory as initialPayoutHistory,
  teacherPayoutSettings as initialPayoutSettings,
} from "@/lib/teacher/data";
import type { TeacherPayoutSettings, Payout } from "@/lib/teacher/types";

export default function EarningsPage() {
  const [payoutSettings, setPayoutSettings] = useState<TeacherPayoutSettings>(initialPayoutSettings);
  const [payouts, setPayouts] = useState<Payout[]>(initialPayoutHistory);
  const [showEarlyModal, setShowEarlyModal] = useState(false);

  const handleEarlyPayout = (amount: number) => {
    const newPayout: Payout = {
      id: `po-early-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      amount,
      method: payoutSettings.defaultMethod,
      status: "processing",
      type: "early",
    };
    setPayouts([newPayout, ...payouts]);
  };

  return (
    <>
      <TeacherTopBar />
      <div className="px-4 py-6 lg:px-8 space-y-6">
        <h2 className="font-display text-2xl text-neutral-900">Earnings</h2>
        <EarningsSummaryHeader summary={earningsSummary} />
        <SessionEarningsTable earnings={sessionEarnings} />
        <PayoutHistory payouts={payouts} />
        <EarningsChart
          weeklyData={weeklyEarnings}
          monthlyData={monthlyEarnings}
          yearlyData={yearlyEarnings}
        />
        <PayoutSettings
          settings={payoutSettings}
          pendingBalance={earningsSummary.pendingPayout}
          onUpdateSettings={setPayoutSettings}
          onRequestEarlyPayout={() => setShowEarlyModal(true)}
        />
      </div>
      <EarlyPayoutModal
        open={showEarlyModal}
        onClose={() => setShowEarlyModal(false)}
        pendingBalance={earningsSummary.pendingPayout}
        defaultMethod={payoutSettings.defaultMethod}
        onSubmit={handleEarlyPayout}
      />
    </>
  );
}
