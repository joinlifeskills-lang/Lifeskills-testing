"use client";

import AdminCard from "@/components/admin/ui/AdminCard";
import AdminTable, { type Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { TeacherBalance } from "@/lib/admin/types";

interface TeacherBalancesTableProps {
  balances: TeacherBalance[];
  onCreatePayout?: (teacherId: string) => void;
}

function formatCurrency(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TeacherBalancesTable({ balances, onCreatePayout }: TeacherBalancesTableProps) {
  const columns: Column<TeacherBalance & Record<string, unknown>>[] = [
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
      key: "completedSessions",
      label: "Sessions",
      sortable: true,
      hideOnMobile: true,
      render: (item) => <span className="text-neutral-700">{item.completedSessions as number}</span>,
    },
    {
      key: "grossAmount",
      label: "Gross",
      sortable: true,
      hideOnMobile: true,
      render: (item) => <span className="text-neutral-700">{formatCurrency(item.grossAmount as number)}</span>,
    },
    {
      key: "platformFee",
      label: "Fee (15%)",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-neutral-500">{formatCurrency(item.platformFee as number)}</span>
      ),
    },
    {
      key: "netAmount",
      label: "Net Owed",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-neutral-900">{formatCurrency(item.netAmount as number)}</span>
      ),
    },
    {
      key: "payoutMethod",
      label: "Method",
      hideOnMobile: true,
      render: (item) => (
        <span className="text-xs text-neutral-500">{item.payoutMethod as string}</span>
      ),
    },
    {
      key: "actions",
      label: "",
      render: (item) => (
        <AdminButton
          variant="primary"
          size="sm"
          onClick={() => onCreatePayout?.(item.teacherId as string)}
        >
          Create Payout
        </AdminButton>
      ),
    },
  ];

  return (
    <AdminCard className="p-6">
      <h3 className="mb-4 text-base font-semibold text-neutral-900">Teachers Awaiting Payout</h3>
      <AdminTable
        columns={columns}
        data={balances}
        keyField="teacherId"
      />
    </AdminCard>
  );
}
