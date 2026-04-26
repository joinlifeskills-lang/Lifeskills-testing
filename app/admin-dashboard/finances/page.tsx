"use client";

import { useState, useMemo } from "react";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import AdminTabs from "@/components/admin/ui/AdminTabs";
import SearchInput from "@/components/admin/ui/SearchInput";
import Pagination from "@/components/admin/ui/Pagination";
import AdminCard from "@/components/admin/ui/AdminCard";
import RevenueOverview from "@/components/admin/finances/RevenueOverview";
import TeacherBalancesTable from "@/components/admin/finances/TeacherBalancesTable";
import PayoutTable from "@/components/admin/finances/PayoutTable";
import RefundTable from "@/components/admin/finances/RefundTable";
import PayoutRequestCard from "@/components/admin/finances/PayoutRequestCard";
import PayoutApprovalModal from "@/components/admin/finances/PayoutApprovalModal";
import PayoutRejectModal from "@/components/admin/finances/PayoutRejectModal";
import {
  financialOverview,
  payoutRequests as initialPayoutRequests,
  teacherBalances,
  refunds,
} from "@/lib/admin/finances";
import type { PayoutRequest } from "@/lib/admin/types";

const ITEMS_PER_PAGE = 8;

export default function FinancesPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>(initialPayoutRequests);
  const [approveTarget, setApproveTarget] = useState<PayoutRequest | null>(null);
  const [rejectTarget, setRejectTarget] = useState<PayoutRequest | null>(null);

  const pendingCount = payoutRequests.filter((p) => p.status === "pending").length;

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Payouts", value: "payouts" },
    { label: "Payout Requests", value: "requests", count: pendingCount },
    { label: "Refunds", value: "refunds", count: refunds.filter((r) => r.status === "pending").length },
  ];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
    setSearch("");
  };

  const handleApprove = (id: string) => {
    setPayoutRequests((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "completed" as const } : p))
    );
  };

  const handleReject = (id: string, _reason: string) => {
    setPayoutRequests((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "failed" as const } : p))
    );
  };

  const completedPayouts = useMemo(() => {
    let filtered = payoutRequests.filter((p) => p.status === "completed");
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.teacherName.toLowerCase().includes(q));
    }
    return filtered;
  }, [search, payoutRequests]);

  const pendingPayouts = useMemo(() => {
    let filtered = payoutRequests.filter((p) => p.status === "pending" || p.status === "processing");
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter((p) => p.teacherName.toLowerCase().includes(q));
    }
    // Sort early requests first
    return filtered.sort((a, b) => {
      if (a.type === "early" && b.type !== "early") return -1;
      if (a.type !== "early" && b.type === "early") return 1;
      return 0;
    });
  }, [search, payoutRequests]);

  const filteredRefunds = useMemo(() => {
    if (!search) return refunds;
    const q = search.toLowerCase();
    return refunds.filter(
      (r) =>
        r.memberName.toLowerCase().includes(q) ||
        r.teacherName.toLowerCase().includes(q)
    );
  }, [search]);

  const getCurrentData = () => {
    switch (activeTab) {
      case "payouts":
        return completedPayouts;
      case "requests":
        return pendingPayouts;
      case "refunds":
        return filteredRefunds;
      default:
        return [];
    }
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const paginatedData = currentData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-warm-sand">
      <AdminTopBar title="Finances" />
      <div className="space-y-6 p-4 lg:p-8">
        <AdminTabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

        {activeTab === "overview" && (
          <>
            <RevenueOverview overview={financialOverview} />
            <TeacherBalancesTable balances={teacherBalances} />
          </>
        )}

        {activeTab === "payouts" && (
          <AdminCard className="p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-semibold text-neutral-900">Completed Payouts</h3>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search teachers..."
                className="w-full sm:w-64"
              />
            </div>
            <PayoutTable data={paginatedData as typeof completedPayouts} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </AdminCard>
        )}

        {activeTab === "requests" && (
          <>
            {/* Desktop table */}
            <div className="hidden md:block">
              <AdminCard className="p-6">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-base font-semibold text-neutral-900">Payout Requests</h3>
                  <SearchInput
                    value={search}
                    onChange={setSearch}
                    placeholder="Search teachers..."
                    className="w-full sm:w-64"
                  />
                </div>
                <PayoutTable
                  data={paginatedData as typeof pendingPayouts}
                  showActions
                  onApprove={(p) => setApproveTarget(p)}
                  onReject={(p) => setRejectTarget(p)}
                />
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
              </AdminCard>
            </div>

            {/* Mobile cards */}
            <div className="space-y-4 md:hidden">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search teachers..."
              />
              {paginatedData.map((payout) => (
                <PayoutRequestCard
                  key={(payout as PayoutRequest).id}
                  payout={payout as PayoutRequest}
                  onApprove={(p) => setApproveTarget(p)}
                  onReject={(p) => setRejectTarget(p)}
                />
              ))}
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}

        {activeTab === "refunds" && (
          <AdminCard className="p-6">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-semibold text-neutral-900">Refund Requests</h3>
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Search members or teachers..."
                className="w-full sm:w-72"
              />
            </div>
            <RefundTable data={paginatedData as typeof filteredRefunds} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </AdminCard>
        )}
      </div>

      <PayoutApprovalModal
        open={!!approveTarget}
        onClose={() => setApproveTarget(null)}
        payout={approveTarget}
        onConfirm={handleApprove}
      />
      <PayoutRejectModal
        open={!!rejectTarget}
        onClose={() => setRejectTarget(null)}
        payout={rejectTarget}
        onConfirm={handleReject}
      />
    </div>
  );
}
