"use client";

import { CreditCard, Building2 } from "lucide-react";
import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { PayoutRequest, PayoutMethodType } from "@/lib/admin/types";

interface PayoutRequestCardProps {
  payout: PayoutRequest;
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

export default function PayoutRequestCard({ payout, onApprove, onReject }: PayoutRequestCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={payout.teacherInitials} size="md" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-neutral-900">{payout.teacherName}</p>
              {payout.type === "early" && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  EARLY
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500">{payout.period}</p>
          </div>
        </div>
        <StatusBadge status={payout.status} />
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-neutral-500">Amount</p>
          <p className="text-lg font-bold text-neutral-900">${payout.amount.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Sessions</p>
          <p className="text-lg font-bold text-neutral-900">{payout.sessionsCount}</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500">Requested</p>
          <p className="text-sm font-medium text-neutral-700">{payout.requestDate}</p>
        </div>
      </div>

      {/* Payment method */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-neutral-50 px-3 py-2">
        {METHOD_ICONS[payout.payoutMethod]}
        <span className="text-xs text-neutral-600">{METHOD_LABELS[payout.payoutMethod]}</span>
      </div>

      {payout.type === "early" && payout.reason && (
        <div className="mb-4 rounded-lg bg-amber-50 px-3 py-2">
          <p className="text-xs text-amber-700">{payout.reason}</p>
        </div>
      )}

      {payout.status === "pending" && (
        <div className="flex gap-3">
          <AdminButton variant="approve" size="sm" onClick={() => onApprove?.(payout)} className="flex-1">
            Approve
          </AdminButton>
          <AdminButton variant="reject" size="sm" onClick={() => onReject?.(payout)} className="flex-1">
            Reject
          </AdminButton>
        </div>
      )}
    </div>
  );
}
