"use client";

import { CreditCard, Building2 } from "lucide-react";
import AdminTable, { type Column } from "@/components/admin/ui/AdminTable";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { PayoutRequest, PayoutMethodType } from "@/lib/admin/types";

interface PayoutTableProps {
  data: PayoutRequest[];
  showActions?: boolean;
  onApprove?: (payout: PayoutRequest) => void;
  onReject?: (payout: PayoutRequest) => void;
}

const METHOD_ICONS: Record<PayoutMethodType, React.ReactNode> = {
  stripe: <CreditCard size={14} className="text-[#635BFF]" />,
  paypal: <span className="text-[10px] font-bold text-[#003087]">P</span>,
  bank: <Building2 size={14} className="text-neutral-500" />,
};

const METHOD_LABELS: Record<PayoutMethodType, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
  bank: "Bank",
};

export default function PayoutTable({ data, showActions = false, onApprove, onReject }: PayoutTableProps) {
  const columns: Column<PayoutRequest & Record<string, unknown>>[] = [
    {
      key: "teacherName",
      label: "Teacher",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar initials={item.teacherInitials as string} size="sm" />
          <div className="flex items-center gap-2">
            <span className="font-medium text-neutral-900">{item.teacherName as string}</span>
            {(item as PayoutRequest).type === "early" && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                EARLY
              </span>
            )}
          </div>
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
      key: "payoutMethod",
      label: "Method",
      hideOnMobile: true,
      render: (item) => {
        const method = (item as PayoutRequest).payoutMethod;
        return (
          <div className="flex items-center gap-1.5">
            {METHOD_ICONS[method]}
            <span className="text-xs text-neutral-600">{METHOD_LABELS[method]}</span>
          </div>
        );
      },
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
            <AdminButton variant="approve" size="sm" onClick={() => onApprove?.(item as PayoutRequest)}>
              Approve
            </AdminButton>
            <AdminButton variant="reject" size="sm" onClick={() => onReject?.(item as PayoutRequest)}>
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
