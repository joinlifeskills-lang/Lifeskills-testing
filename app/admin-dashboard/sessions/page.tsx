"use client";

import { useState, useMemo } from "react";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import AdminTabs from "@/components/admin/ui/AdminTabs";
import SearchInput from "@/components/admin/ui/SearchInput";
import Pagination from "@/components/admin/ui/Pagination";
import SessionTable from "@/components/admin/sessions/SessionTable";
import LiveIndicator from "@/components/admin/sessions/LiveIndicator";
import { sessions } from "@/lib/admin/sessions";
import { SessionStatus } from "@/lib/admin/types";

const ITEMS_PER_PAGE = 10;

export default function SessionsPage() {
  const [activeTab, setActiveTab] = useState<SessionStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const counts = useMemo(() => ({
    live: sessions.filter((s) => s.status === "live").length,
    upcoming: sessions.filter((s) => s.status === "upcoming").length,
    completed: sessions.filter((s) => s.status === "completed").length,
    cancelled: sessions.filter((s) => s.status === "cancelled").length,
  }), []);

  const tabs = [
    { label: "All", value: "all", count: sessions.length },
    { label: "Live", value: "live", count: counts.live },
    { label: "Upcoming", value: "upcoming", count: counts.upcoming },
    { label: "Completed", value: "completed", count: counts.completed },
    { label: "Cancelled", value: "cancelled", count: counts.cancelled },
  ];

  const filtered = useMemo(() => {
    let result = sessions;

    if (activeTab !== "all") {
      result = result.filter((s) => s.status === activeTab);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.teacherName.toLowerCase().includes(q) ||
          s.memberName.toLowerCase().includes(q) ||
          s.discipline.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <AdminTopBar title="Sessions" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Live indicator */}
        {counts.live > 0 && (
          <div className="mb-6">
            <LiveIndicator liveCount={counts.live} />
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <AdminTabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(v) => {
              setActiveTab(v as SessionStatus | "all");
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Search */}
        <div className="mb-6">
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v);
              setCurrentPage(1);
            }}
            placeholder="Search by teacher, member, or discipline..."
            className="w-full sm:max-w-sm"
          />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:p-6">
          <SessionTable sessions={paginated} />
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-500">
              No sessions found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
