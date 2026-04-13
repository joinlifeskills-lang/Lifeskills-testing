"use client";

import { useMemo } from "react";
import type { SessionEarning, EarningStatus } from "@/lib/teacher/types";

const DISCIPLINE_COLORS: Record<string, string> = {
  Breathwork: "bg-[#0BA89A]/10 text-[#0BA89A]",
  Meditation: "bg-[#6BAA3E]/10 text-[#6BAA3E]",
  Yoga: "bg-[#D4940A]/10 text-[#D4940A]",
  Somatic: "bg-[#E8603A]/10 text-[#E8603A]",
};

const STATUS_STYLES: Record<EarningStatus, string> = {
  paid: "bg-[#0BA89A]/10 text-[#0BA89A]",
  pending: "bg-[#F0A500]/10 text-[#F0A500]",
  processing: "bg-neutral-100 text-neutral-500",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function SessionEarningsTable({
  earnings,
}: {
  earnings: SessionEarning[];
}) {
  const sorted = useMemo(
    () =>
      [...earnings].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [earnings]
  );

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
      <h3 className="font-display text-lg text-neutral-900 mb-4">
        Session Earnings
      </h3>

      {/* Desktop table */}
      <div className="hidden lg:block overflow-x-auto overflow-y-auto max-h-[260px]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-neutral-100 text-left text-xs font-medium uppercase tracking-wider text-neutral-500">
              <th className="pb-3 pr-4">Date</th>
              <th className="pb-3 pr-4">Client</th>
              <th className="pb-3 pr-4">Discipline</th>
              <th className="pb-3 pr-4">Duration</th>
              <th className="pb-3 pr-4">Amount</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((s) => (
              <tr
                key={s.id}
                className="border-b border-neutral-50 last:border-0"
              >
                <td className="py-3 pr-4 text-neutral-700">
                  {formatDate(s.date)}
                </td>
                <td className="py-3 pr-4 font-medium text-neutral-900">
                  {s.clientName}
                </td>
                <td className="py-3 pr-4">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      DISCIPLINE_COLORS[s.discipline] ??
                      "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {s.discipline}
                  </span>
                </td>
                <td className="py-3 pr-4 text-neutral-700">
                  {s.duration} min
                </td>
                <td className="py-3 pr-4 font-medium text-neutral-900">
                  ${s.amount.toFixed(2)}
                </td>
                <td className="py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 lg:hidden overflow-y-auto max-h-[260px]">
        {sorted.map((s) => (
          <div
            key={s.id}
            className="rounded-xl border border-neutral-100 p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-neutral-900">{s.clientName}</p>
                <p className="text-xs text-neutral-500">
                  {formatDate(s.date)} &middot; {s.duration} min
                </p>
              </div>
              <p className="font-medium text-neutral-900">
                ${s.amount.toFixed(2)}
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  DISCIPLINE_COLORS[s.discipline] ??
                  "bg-neutral-100 text-neutral-600"
                }`}
              >
                {s.discipline}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[s.status]}`}
              >
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
