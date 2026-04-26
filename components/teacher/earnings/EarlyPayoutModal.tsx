"use client";

import { useState } from "react";
import { X, Clock, AlertCircle } from "lucide-react";
import type { PayoutMethodType } from "@/lib/teacher/types";

interface EarlyPayoutModalProps {
  open: boolean;
  onClose: () => void;
  pendingBalance: number;
  defaultMethod: PayoutMethodType;
  onSubmit: (amount: number) => void;
}

export default function EarlyPayoutModal({
  open,
  onClose,
  pendingBalance,
  defaultMethod,
  onSubmit,
}: EarlyPayoutModalProps) {
  const [amount, setAmount] = useState("");

  if (!open) return null;

  const numAmount = parseFloat(amount) || 0;
  const isValid = numAmount > 0 && numAmount <= pendingBalance;
  const isBank = defaultMethod === "bank";

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit(numAmount);
    setAmount("");
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">Request Early Payout</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">Available Balance</p>
            <p className="text-xl font-bold text-neutral-900">
              ${pendingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-neutral-400">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                max={pendingBalance}
                step="0.01"
                className="w-full rounded-lg border border-neutral-200 py-2 pl-7 pr-3 text-sm outline-none focus:border-deep-sage focus:ring-1 focus:ring-deep-sage"
              />
            </div>
            {numAmount > pendingBalance && (
              <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                <AlertCircle size={12} />
                Exceeds available balance
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2">
            <Clock size={16} className="text-amber-600 shrink-0" />
            <div>
              <p className="text-xs font-medium text-amber-800">
                {isBank
                  ? "Estimated delivery: 3-7 business days"
                  : "Estimated delivery: 24-48 hours"}
              </p>
              <p className="text-xs text-amber-600">
                Via {defaultMethod === "stripe" ? "Stripe" : defaultMethod === "paypal" ? "PayPal" : "Bank Transfer"}
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex-1 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className="flex-1 rounded-full bg-deep-sage px-4 py-2.5 text-sm font-semibold text-white hover:bg-deep-sage-hover disabled:opacity-50 transition-colors"
            >
              Request Payout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
