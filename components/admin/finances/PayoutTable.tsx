"use client";

import AdminTable, { type Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { PayoutRequest } from "@/lib/admin/types";

interface PayoutTableProps {
  data: PayoutRequest[];
  showActions?: boolean;
}

export default function PayoutTable({ data, showActions = false }: PayoutTableProps) {
  const columns: Column<PayoutRequest & Record<string, unknown>>[] = [
    {
      key: "teacherName",
      label: "Teacher",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar initials={item.teacherInitials as string} size="sm" />
          <span className="font-medium text-neutral-900">{item.teacherName as string}</span>
        </div>
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
      key: "period",
      label: "Period",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-700">{item.period as string}</span>
      ),
    },
    {
      key: "sessionsCount",
      label: "Sessions",
      sortable: true,
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-700">{item.sessionsCount as number}</span>
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
  ];

  if (showActions) {
    columns.push({
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
    });
  }

  return (
    <AdminTable
      columns={columns}
      data={data}
      keyField="id"
    />
  );
}
