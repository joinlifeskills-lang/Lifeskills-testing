"use client";

import { useState } from "react";
import { CreditCard, Building2, CheckCircle2, Loader2 } from "lucide-react";
import AdminModal from "@/components/admin/ui/AdminModal";
import AdminButton from "@/components/admin/ui/AdminButton";
import Avatar from "@/components/admin/ui/Avatar";
import type { PayoutRequest, PayoutMethodType } from "@/lib/admin/types";

interface PayoutApprovalModalProps {
  open: boolean;
  onClose: () => void;
  payout: PayoutRequest | null;
  onConfirm: (id: string) => void;
}

const METHOD_CONFIG: Record<PayoutMethodType, { icon: React.ReactNode; label: string }> = {
  stripe: { icon: <CreditCard size={16} className="text-[#635BFF]" />, label: "Stripe" },
  paypal: { icon: <span className="text-xs font-bold text-[#003087]">P</span>, label: "PayPal" },
  bank: { icon: <Building2 size={16} className="text-neutral-600" />, label: "Bank Transfer" },
};

export default function PayoutApprovalModal({ open, onClose, payout, onConfirm }: PayoutApprovalModalProps) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  if (!payout) return null;

  const method = METHOD_CONFIG[payout.payoutMethod];

  const handleConfirm = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
      setTimeout(() => {
        onConfirm(payout.id);
        setDone(false);
        onClose();
      }, 800);
    }, 2000);
  };

  return (
    <AdminModal open={open} onClose={onClose} title="Approve Payout">
      {done ? (
        <div className="flex flex-col items-center gap-3 py-6">
          <CheckCircle2 size={48} className="text-[#0BA89A]" />
          <p className="text-sm font-medium text-neutral-900">Payout Processed Successfully</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar initials={payout.teacherInitials} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-neutral-900">{payout.teacherName}</span>
                {payout.type === "early" && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                    EARLY
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-500">{payout.period}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-xl bg-neutral-50 p-3">
            <div>
              <p className="text-xs text-neutral-500">Amount</p>
              <p className="text-lg font-bold text-neutral-900">${payout.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-500">Sessions</p>
              <p className="text-lg font-bold text-neutral-900">{payout.sessionsCount}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-neutral-100 px-3 py-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-50">
              {method.icon}
            </div>
            <div>
              <p className="text-xs text-neutral-500">Payment Method</p>
              <p className="text-sm font-medium text-neutral-900">{method.label}</p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <AdminButton variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </AdminButton>
            <AdminButton
              variant="approve"
              onClick={handleConfirm}
              disabled={processing}
              className="flex-1"
            >
              {processing ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Processing...
                </span>
              ) : (
                "Confirm & Process"
              )}
            </AdminButton>
          </div>
        </div>
      )}
    </AdminModal>
  );
}
