"use client";

import { CreditCard, Building2 } from "lucide-react";
import PayoutMethodManager from "./PayoutMethodManager";
import type { TeacherPayoutSettings as PayoutSettingsType, PayoutMethodType } from "@/lib/teacher/types";

interface PayoutSettingsProps {
  settings: PayoutSettingsType;
  pendingBalance: number;
  onUpdateSettings: (settings: PayoutSettingsType) => void;
  onRequestEarlyPayout: () => void;
}

const METHOD_ICONS: Record<PayoutMethodType, React.ReactNode> = {
  stripe: <CreditCard size={16} className="text-[#635BFF]" />,
  paypal: <span className="text-xs font-bold text-[#003087]">P</span>,
  bank: <Building2 size={16} className="text-neutral-600" />,
};

const METHOD_LABELS: Record<PayoutMethodType, string> = {
  stripe: "Stripe",
  paypal: "PayPal",
  bank: "Bank Transfer",
};

export default function PayoutSettings({
  settings,
  pendingBalance,
  onUpdateSettings,
  onRequestEarlyPayout,
}: PayoutSettingsProps) {
  const hasDefault = settings.methods.some((m) => m.type === settings.defaultMethod);

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Payout Settings
      </h3>

      {/* Default method & status */}
      {hasDefault && (
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-50">
            {METHOD_ICONS[settings.defaultMethod]}
          </div>
          <span className="text-sm font-medium text-neutral-900">
            {METHOD_LABELS[settings.defaultMethod]}
          </span>
          <span className="h-2 w-2 rounded-full bg-[#0BA89A]" />
          <span className="text-xs text-[#0BA89A] font-medium">Connected</span>
        </div>
      )}

      {/* Pending payout summary */}
      <div className="mb-5 rounded-xl bg-neutral-50 p-3">
        <p className="text-xs text-neutral-500">Pending Payout</p>
        <p className="text-lg font-bold text-neutral-900">
          ${pendingBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Payment method manager */}
      <PayoutMethodManager settings={settings} onUpdate={onUpdateSettings} />

      {/* Early payout button */}
      <div className="mt-5">
        <button
          onClick={onRequestEarlyPayout}
          disabled={pendingBalance <= 0 || !hasDefault}
          className="w-full rounded-full bg-deep-sage px-[26px] py-[10px] text-[0.88rem] font-semibold text-white hover:bg-deep-sage-hover disabled:opacity-50 transition-colors"
        >
          Request Early Payout
        </button>
      </div>
    </div>
  );
}
