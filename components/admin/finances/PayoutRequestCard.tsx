"use client";

import Avatar from "@/components/admin/ui/Avatar";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { PayoutRequest } from "@/lib/admin/types";

interface PayoutRequestCardProps {
  payout: PayoutRequest;
}

export default function PayoutRequestCard({ payout }: PayoutRequestCardProps) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={payout.teacherInitials} size="md" />
          <div>
            <p className="font-semibold text-neutral-900">{payout.teacherName}</p>
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

      {payout.status === "pending" && (
        <div className="flex gap-3">
          <AdminButton variant="approve" size="sm" onClick={() => {}} className="flex-1">
            Approve
          </AdminButton>
          <AdminButton variant="reject" size="sm" onClick={() => {}} className="flex-1">
            Reject
          </AdminButton>
        </div>
      )}
    </div>
  );
}
