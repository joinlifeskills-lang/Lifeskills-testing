"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavItems } from "@/lib/teacher/navigation";
import { pendingBookings } from "@/lib/teacher/data";
import {
  Home,
  Video,
  Users,
  MessageSquare,
  MoreHorizontal,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Video,
  Users,
  MessageSquare,
};

interface TeacherMobileNavProps {
  onMoreClick: () => void;
  moreOpen: boolean;
}

export default function TeacherMobileNav({ onMoreClick, moreOpen }: TeacherMobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/teacher-dashboard") return pathname === "/teacher-dashboard";
    return pathname.startsWith(href);
  };

  const isMoreActive =
    !moreOpen &&
    ["/teacher-dashboard/earnings", "/teacher-dashboard/journey", "/teacher-dashboard/profile", "/teacher-dashboard/settings"].some(
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
              className={`relative flex flex-col items-center gap-0.5 px-3 py-2 text-[0.62rem] font-medium transition-colors ${
                active ? "text-electric-teal" : "text-neutral-500"
              }`}
            >
              <div className="relative">
                {Icon && <Icon size={20} strokeWidth={active ? 2.5 : 2} />}
                {item.href === "/teacher-dashboard/sessions" && pendingBookings.length > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[14px] rounded-full bg-bright-amber px-1 text-center text-[0.5rem] font-bold leading-[14px] text-white">
                    {pendingBookings.length}
                  </span>
                )}
              </div>
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
