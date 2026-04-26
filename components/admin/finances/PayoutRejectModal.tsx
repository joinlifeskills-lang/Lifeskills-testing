"use client";

import { useState } from "react";
import AdminModal from "@/components/admin/ui/AdminModal";
import AdminButton from "@/components/admin/ui/AdminButton";
import type { PayoutRequest } from "@/lib/admin/types";

interface PayoutRejectModalProps {
  open: boolean;
  onClose: () => void;
  payout: PayoutRequest | null;
  onConfirm: (id: string, reason: string) => void;
}

export default function PayoutRejectModal({ open, onClose, payout, onConfirm }: PayoutRejectModalProps) {
  const [reason, setReason] = useState("");

  if (!payout) return null;

  const handleConfirm = () => {
    onConfirm(payout.id, reason.trim());
    setReason("");
    onClose();
  };

  return (
    <AdminModal open={open} onClose={onClose} title="Reject Payout">
      <div className="space-y-4">
        <p className="text-sm text-neutral-700">
          Rejecting payout of <span className="font-semibold">${payout.amount.toLocaleString()}</span> for{" "}
          <span className="font-semibold">{payout.teacherName}</span>.
        </p>

        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">Rejection Reason</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Provide a reason for rejection..."
            rows={3}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <AdminButton variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </AdminButton>
          <AdminButton
            variant="reject"
            onClick={handleConfirm}
            disabled={!reason.trim()}
            className="flex-1"
          >
            Reject Payout
          </AdminButton>
        </div>
      </div>
    </AdminModal>
  );
}
