import { Download, CreditCard, Building2 } from "lucide-react";
import type { Payout, PayoutStatus, PayoutMethodType } from "@/lib/teacher/types";

const STATUS_STYLES: Record<PayoutStatus, string> = {
  completed: "bg-[#0BA89A]/10 text-[#0BA89A]",
  processing: "bg-[#F0A500]/10 text-[#F0A500]",
  approved: "bg-[#6BAA3E]/10 text-[#6BAA3E]",
  denied: "bg-[#E8603A]/10 text-[#E8603A]",
};

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

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

export default function PayoutHistory({ payouts }: { payouts: Payout[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Payout History
      </h3>

      <div className="space-y-3">
        {payouts.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-neutral-100 px-4 py-3"
          >
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm font-medium text-neutral-900">
                {formatCurrency(p.amount)}
              </p>
              <p className="text-xs text-neutral-500">
                {formatDate(p.date)}
              </p>
              <div className="flex items-center gap-1.5">
                {METHOD_ICONS[p.method]}
                <span className="text-xs text-neutral-500">
                  {METHOD_LABELS[p.method]}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {p.type === "early" && (
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  Early
                </span>
              )}
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[p.status]}`}
              >
                {p.status}
              </span>
              <button className="text-neutral-400 hover:text-neutral-600 transition-colors">
                <Download size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
