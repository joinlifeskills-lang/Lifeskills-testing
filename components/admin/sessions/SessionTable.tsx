"use client";

import AdminTable, { Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { Session } from "@/lib/admin/types";

interface SessionTableProps {
  sessions: Session[];
  onRowClick?: (session: Session) => void;
}

export default function SessionTable({ sessions, onRowClick }: SessionTableProps) {
  const columns: Column<Session>[] = [
    {
      key: "teacherName",
      label: "Teacher",
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={s.teacherInitials} size="sm" />
          <span className="font-medium text-neutral-900">{s.teacherName}</span>
        </div>
      ),
    },
    {
      key: "memberName",
      label: "Member",
      sortable: true,
      render: (s) => (
        <div className="flex items-center gap-2.5">
          <Avatar initials={s.memberInitials} size="sm" />
          <span className="text-neutral-700">{s.memberName}</span>
        </div>
      ),
    },
    {
      key: "discipline",
      label: "Discipline",
      sortable: true,
      render: (s) => <span className="text-neutral-700">{s.discipline}</span>,
    },
    {
      key: "date",
      label: "Date & Time",
      sortable: true,
      hideOnMobile: true,
      render: (s) => (
        <div>
          <p className="text-neutral-900">{formatDate(s.date)}</p>
          <p className="text-xs text-neutral-500">{s.time}</p>
        </div>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      sortable: true,
      hideOnMobile: true,
      render: (s) => <span className="text-neutral-700">{s.duration} min</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (s) => (
        <div className="flex items-center gap-2">
          <StatusBadge status={s.status} />
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      sortable: true,
      render: (s) => <span className="font-medium text-neutral-900">${s.price}</span>,
    },
  ];

  return (
    <AdminTable
      columns={columns}
      data={sessions}
      onRowClick={onRowClick}
      keyField="id"
    />
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
