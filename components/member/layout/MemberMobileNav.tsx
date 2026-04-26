"use client";

import { useState } from "react";
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
  Menu,
  X,
} from "lucide-react";

const coreNavItems = [
  { label: "Home", href: "/customer-dashboard", icon: Home },
  { label: "Sessions", href: "/customer-dashboard/sessions", icon: Calendar },
  { label: "My Journey", href: "/customer-dashboard/journey", icon: TrendingUp },
  { label: "Messages", href: "/customer-dashboard/messages", icon: MessageSquare },
];

const menuItems = [
  { label: "Explore Teachers", href: "/customer-dashboard/explore", icon: Search },
  { label: "Profile", href: "/customer-dashboard/profile", icon: User },
];

export default function MemberMobileNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isMenuActive =
    pathname.startsWith("/customer-dashboard/explore") ||
    pathname.startsWith("/customer-dashboard/profile");

  return (
    <>
      {/* Bottom nav bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-100 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {coreNavItems.map((item) => {
            const isActive =
              item.href === "/customer-dashboard"
                ? pathname === "/customer-dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 py-1 px-3 text-[0.65rem] font-medium transition-colors ${
                  isActive ? "text-deep-sage" : "text-neutral-400"
                }`}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 text-[0.65rem] font-medium transition-colors ${
              isMenuActive ? "text-deep-sage" : "text-neutral-400"
            }`}
          >
            <Menu size={22} strokeWidth={isMenuActive ? 2.5 : 1.8} />
            <span>More</span>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-up sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Handle + close */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="h-1 w-10 rounded-full bg-neutral-200 mx-auto absolute left-1/2 -translate-x-1/2 top-3" />
          <span className="font-display text-base text-neutral-900">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pb-8 pt-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-colors ${
                  isActive
                    ? "bg-deep-sage/10 text-deep-sage font-semibold"
                    : "text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[0.95rem]">{item.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-neutral-100" />

          <button
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4 w-full px-4 py-3.5 rounded-xl text-vivid-coral hover:bg-vivid-coral/5 transition-colors"
          >
            <LogOut size={20} strokeWidth={1.8} />
            <span className="text-[0.95rem] font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
