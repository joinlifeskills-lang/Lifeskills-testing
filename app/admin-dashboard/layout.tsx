"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminMobileNav from "@/components/admin/layout/AdminMobileNav";
import AdminMobileSheet from "@/components/admin/layout/AdminMobileSheet";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-sand">
      <AdminSidebar />
      <AdminMobileSheet open={moreOpen} onClose={() => setMoreOpen(false)} />

      <main className="pb-20 lg:ml-[260px] lg:pb-0">
        {children}
      </main>

      <AdminMobileNav
        onMoreClick={() => setMoreOpen((v) => !v)}
        moreOpen={moreOpen}
      />
    </div>
  );
}
