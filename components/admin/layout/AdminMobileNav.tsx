"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavItems } from "@/lib/admin/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  DollarSign,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  GraduationCap,
  DollarSign,
  MessageSquare,
};

interface AdminMobileNavProps {
  onMoreClick: () => void;
  moreOpen: boolean;
}

export default function AdminMobileNav({ onMoreClick, moreOpen }: AdminMobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin-dashboard") return pathname === "/admin-dashboard";
    return pathname.startsWith(href);
  };

  const isMoreActive =
    !moreOpen &&
    ["/admin-dashboard/members", "/admin-dashboard/sessions", "/admin-dashboard/reviews", "/admin-dashboard/analytics", "/admin-dashboard/settings"].some(
      (p) => pathname.startsWith(p)
    );

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-100 bg-white lg:hidden">
      <div className="flex items-center justify-around px-2 py-1">
        {mobileNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-2 text-[0.62rem] font-medium transition-colors ${
                active ? "text-electric-teal" : "text-neutral-500"
              }`}
            >
              {Icon && <Icon size={20} strokeWidth={active ? 2.5 : 2} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onMoreClick}
          className={`flex flex-col items-center gap-0.5 px-3 py-2 text-[0.62rem] font-medium transition-colors ${
            moreOpen || isMoreActive ? "text-electric-teal" : "text-neutral-500"
          }`}
        >
          <MoreHorizontal size={20} strokeWidth={moreOpen || isMoreActive ? 2.5 : 2} />
          <span>More</span>
        </button>
      </div>
    </nav>
  );
}
