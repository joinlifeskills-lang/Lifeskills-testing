"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavGroups } from "@/lib/admin/navigation";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Video,
  Star,
  BarChart3,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  GraduationCap,
  Users,
  Video,
  Star,
  BarChart3,
  DollarSign,
  MessageSquare,
  Settings,
};

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin-dashboard") return pathname === "/admin-dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[260px] flex-col bg-deep-sage lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6">
        <img src="/Logo.svg" alt="Lifeskills" className="h-7 w-auto brightness-0 invert" />
        <span className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
          Admin
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {adminNavGroups.map((group) => (
          <div key={group.title} className="mb-4">
            <p className="mb-1 px-3 text-[0.68rem] font-semibold uppercase tracking-wider text-white/50">
              {group.title}
            </p>
            {group.items.map((item) => {
              const Icon = iconMap[item.icon];
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[0.88rem] font-medium transition-colors ${
                    active
                      ? "border-l-2 border-electric-teal bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {Icon && <Icon size={20} />}
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded-full bg-vivid-coral px-2 py-0.5 text-[0.68rem] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Admin profile */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-electric-teal text-sm font-bold text-white">
            AO
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Admin Owner</p>
            <p className="text-xs text-white/50">Platform Admin</p>
          </div>
          <button className="text-white/50 transition-colors hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}
