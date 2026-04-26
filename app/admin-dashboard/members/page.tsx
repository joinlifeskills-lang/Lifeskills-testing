"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import SearchInput from "@/components/admin/ui/SearchInput";
import FilterBar from "@/components/admin/ui/FilterBar";
import Pagination from "@/components/admin/ui/Pagination";
import MemberTable from "@/components/admin/members/MemberTable";
import { members } from "@/lib/admin/members";
import { Member, MemberStatus } from "@/lib/admin/types";

const ITEMS_PER_PAGE = 10;

const statusOptions: { label: string; value: MemberStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Banned", value: "banned" },
];

export default function MembersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<MemberStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let result = members;

    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const activeFilterCount = statusFilter !== "all" ? 1 : 0;

  const handleRowClick = (member: Member) => {
    router.push(`/admin-dashboard/members/${member.id}`);
  };

  return (
    <>
      <AdminTopBar title="Members" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Search + Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <SearchInput
            value={search}
            onChange={(v) => {
              setSearch(v);
              setCurrentPage(1);
            }}
            placeholder="Search members by name or email..."
            className="w-full sm:max-w-sm"
          />
          <FilterBar activeCount={activeFilterCount}>
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setStatusFilter(opt.value);
                  setCurrentPage(1);
                }}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  statusFilter === opt.value
                    ? "bg-deep-sage text-white"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </FilterBar>
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:p-6">
          <MemberTable members={paginated} onRowClick={handleRowClick} />
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-neutral-500">
              No members found.
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
