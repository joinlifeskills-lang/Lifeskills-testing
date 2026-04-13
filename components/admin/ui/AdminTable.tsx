"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Column<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface AdminTableProps {
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRowClick?: (item: any) => void;
  keyField: string;
}

export default function AdminTable({
  columns,
  data,
  onRowClick,
  keyField,
}: AdminTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  return (
    <>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 ${
                    col.sortable ? "cursor-pointer select-none hover:text-neutral-900" : ""
                  } ${col.className || ""}`}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.sortable && sortKey === col.key && (
                      sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr
                key={item[keyField] as string}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                className={`border-b border-neutral-50 transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-neutral-50" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3.5 text-sm ${col.className || ""}`}>
                    {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="space-y-3 md:hidden">
        {sorted.map((item) => (
          <div
            key={item[keyField] as string}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
            className={`rounded-xl border border-neutral-100 bg-white p-4 ${
              onRowClick ? "cursor-pointer active:bg-neutral-50" : ""
            }`}
          >
            {columns
              .filter((c) => !c.hideOnMobile)
              .map((col) => (
                <div key={col.key} className="flex items-center justify-between py-1">
                  <span className="text-xs font-medium text-neutral-500">{col.label}</span>
                  <span className="text-sm text-neutral-900">
                    {col.render ? col.render(item) : (item[col.key] as React.ReactNode)}
                  </span>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}
