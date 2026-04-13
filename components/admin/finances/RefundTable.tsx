"use client";

import AdminTable, { type Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { Refund } from "@/lib/admin/types";

interface RefundTableProps {
  data: Refund[];
}

export default function RefundTable({ data }: RefundTableProps) {
  const columns: Column<Refund & Record<string, unknown>>[] = [
    {
      key: "memberName",
      label: "Member",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar initials={item.memberInitials as string} size="sm" />
          <span className="font-medium text-neutral-900">{item.memberName as string}</span>
        </div>
      ),
    },
    {
      key: "teacherName",
      label: "Teacher",
      sortable: true,
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-700">{item.teacherName as string}</span>
      ),
    },
    {
      key: "sessionDate",
      label: "Session Date",
      sortable: true,
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-500">{item.sessionDate as string}</span>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-neutral-900">
          ${(item.amount as number).toLocaleString()}
        </span>
      ),
    },
    {
      key: "reason",
      label: "Reason",
      hideOnMobile: true,
      className: "max-w-[200px]",
      render: (item) => (
        <span className="line-clamp-1 text-neutral-500">{item.reason as string}</span>
      ),
    },
    {
      key: "requestDate",
      label: "Request Date",
      sortable: true,
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-500">{item.requestDate as string}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => <StatusBadge status={item.status as string} />,
    },
    {
      key: "actions",
      label: "",
      render: (item) =>
        item.status === "pending" ? (
          <div className="flex items-center gap-2">
            <AdminButton variant="approve" size="sm" onClick={() => {}}>
              Approve
            </AdminButton>
            <AdminButton variant="reject" size="sm" onClick={() => {}}>
              Reject
            </AdminButton>
          </div>
        ) : null,
    },
  ];

  return (
    <AdminTable
      columns={columns}
      data={data}
      keyField="id"
    />
  );
}
