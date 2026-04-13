"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileMoreItems } from "@/lib/admin/navigation";
import { Users, Video, Star, BarChart3, Settings, X } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Users,
  Video,
  Star,
  BarChart3,
  Settings,
};

interface AdminMobileSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminMobileSheet({ open, onClose }: AdminMobileSheetProps) {
  const pathname = usePathname();

  const isActive = (href: string) => pathname.startsWith(href);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 lg:hidden"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white pb-20 lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm font-semibold text-neutral-900">More</p>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-neutral-500 hover:bg-neutral-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-3 pb-4">
          {mobileMoreItems.map((item) => {
            const Icon = iconMap[item.icon];
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[0.88rem] font-medium transition-colors ${
                  active
                    ? "bg-deep-sage/5 text-deep-sage"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {Icon && <Icon size={20} />}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
