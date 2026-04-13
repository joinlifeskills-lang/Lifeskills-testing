"use client";

import MemberSidebar from "@/components/member/layout/MemberSidebar";
import MemberMobileNav from "@/components/member/layout/MemberMobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-warm-sand">
      <MemberSidebar />
      <main className="lg:ml-[260px] pb-20 lg:pb-0">{children}</main>
      <MemberMobileNav />
    </div>
  );
}
