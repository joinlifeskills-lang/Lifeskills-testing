"use client";

import { useState, useMemo } from "react";
import AdminTable, { Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import SearchInput from "@/components/admin/ui/SearchInput";
import { AdminTeacher, ApplicationStatus } from "@/lib/admin/types";
import { disciplineTagColors, Discipline } from "@/lib/teachers";

interface TeacherTableProps {
  teachers: AdminTeacher[];
  activeTab: ApplicationStatus;
  onRowClick?: (teacher: AdminTeacher) => void;
}

export default function TeacherTable({ teachers, activeTab, onRowClick }: TeacherTableProps) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const byStatus = teachers.filter((t) => t.status === activeTab);
    if (!search.trim()) return byStatus;
    const q = search.toLowerCase();
    return byStatus.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.disciplines.some((d) => d.toLowerCase().includes(q))
    );
  }, [teachers, activeTab, search]);

  const columns: Column<AdminTeacher>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (t) => (
        <div className="flex items-center gap-3">
          <Avatar initials={t.initials} size="sm" />
          <div>
            <p className="font-medium text-neutral-900">{t.name}</p>
            <p className="text-xs text-neutral-500">{t.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "disciplines",
      label: "Disciplines",
      hideOnMobile: true,
      render: (t) => (
        <div className="flex flex-wrap gap-1">
          {t.disciplines.map((d) => {
            const colors = disciplineTagColors[d as Discipline];
            return (
              <span
                key={d}
                className="rounded-full px-2 py-0.5 text-[0.65rem] font-semibold"
                style={colors ? { backgroundColor: colors.bg, color: colors.text } : undefined}
              >
                {d}
              </span>
            );
          })}
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (t) => <StatusBadge status={t.status} />,
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      hideOnMobile: true,
      render: (t) => (
        <span className="text-neutral-700">{t.rating > 0 ? t.rating.toFixed(1) : "--"}</span>
      ),
    },
    {
      key: "sessions",
      label: "Sessions",
      sortable: true,
      hideOnMobile: true,
      render: (t) => <span className="text-neutral-700">{t.sessions.toLocaleString()}</span>,
    },
    {
      key: "revenue",
      label: "Revenue",
      sortable: true,
      hideOnMobile: true,
      render: (t) => (
        <span className="font-medium text-neutral-900">
          {t.revenue > 0 ? `$${t.revenue.toLocaleString()}` : "--"}
        </span>
      ),
    },
    {
      key: "applicationDate",
      label: "Applied",
      sortable: true,
      render: (t) => (
        <span className="text-neutral-500">
          {new Date(t.applicationDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Search teachers by name, email, or discipline..."
        className="max-w-sm"
      />
      <AdminTable
        columns={columns}
        data={filtered}
        keyField="id"
        onRowClick={onRowClick}
      />
      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-neutral-500">
          No teachers found.
        </p>
      )}
    </div>
  );
}
