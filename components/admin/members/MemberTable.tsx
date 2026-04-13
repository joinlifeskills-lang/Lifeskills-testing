"use client";

import AdminTable, { Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import { Member } from "@/lib/admin/types";

interface MemberTableProps {
  members: Member[];
  onRowClick?: (member: Member) => void;
}

export default function MemberTable({ members, onRowClick }: MemberTableProps) {
  const columns: Column<Member>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
      render: (m) => (
        <div className="flex items-center gap-3">
          <Avatar initials={m.initials} size="sm" />
          <span className="font-medium text-neutral-900">{m.name}</span>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
      hideOnMobile: true,
      render: (m) => <span className="text-neutral-700">{m.email}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (m) => <StatusBadge status={m.status} />,
    },
    {
      key: "totalSessions",
      label: "Sessions",
      sortable: true,
      hideOnMobile: true,
      render: (m) => <span className="text-neutral-700">{m.totalSessions}</span>,
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      sortable: true,
      render: (m) => (
        <span className="font-medium text-neutral-900">
          ${m.totalSpent.toLocaleString()}
        </span>
      ),
    },
    {
      key: "lastActive",
      label: "Last Active",
      sortable: true,
      hideOnMobile: true,
      render: (m) => (
        <span className="text-neutral-500">
          {new Date(m.lastActive).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "joinDate",
      label: "Join Date",
      sortable: true,
      hideOnMobile: true,
      render: (m) => (
        <span className="text-neutral-500">
          {new Date(m.joinDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  return (
    <AdminTable
      columns={columns}
      data={members}
      keyField="id"
      onRowClick={onRowClick}
    />
  );
}
