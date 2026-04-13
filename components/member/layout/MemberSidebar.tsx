"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  TrendingUp,
  MessageSquare,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { sidebarNavItems } from "@/lib/member/navigation";
import { memberProfile } from "@/lib/member/data";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Calendar,
  TrendingUp,
  MessageSquare,
  Search,
  User,
};

export default function MemberSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-[260px] bg-deep-sage z-40">
      {/* Logo */}
      <div className="px-6 py-6">
        <Link href="/customer-dashboard">
          <img src="/Logo.svg" alt="Lifeskills" className="h-7 w-auto brightness-0 invert" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            item.href === "/customer-dashboard"
              ? pathname === "/customer-dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white border-l-[3px] border-electric-teal"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {Icon && <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="px-4 py-5 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-electric-teal flex items-center justify-center text-white text-sm font-semibold">
            {memberProfile.avatarInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">
              {memberProfile.firstName}
            </p>
            <button className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors">
              <LogOut size={12} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
