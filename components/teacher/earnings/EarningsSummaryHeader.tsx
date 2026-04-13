import type { EarningsSummary } from "@/lib/teacher/types";

function formatCurrency(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function EarningsSummaryHeader({ summary }: { summary: EarningsSummary }) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500 mb-1">Earnings this month</p>
          <p className="font-display text-4xl text-neutral-900">
            {formatCurrency(summary.thisMonth)}
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            Next payout: {formatDate(summary.nextPayoutDate)}
          </p>
        </div>
      </div>
    </div>
  );
}
