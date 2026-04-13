"use client";

import { useState } from "react";
import TeacherSidebar from "@/components/teacher/layout/TeacherSidebar";
import TeacherMobileNav from "@/components/teacher/layout/TeacherMobileNav";
import TeacherMobileSheet from "@/components/teacher/layout/TeacherMobileSheet";

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-sand">
      <TeacherSidebar />
      <TeacherMobileSheet open={moreOpen} onClose={() => setMoreOpen(false)} />

      <main className="pb-20 lg:ml-[260px] lg:pb-0">
        {children}
      </main>

      <TeacherMobileNav
        onMoreClick={() => setMoreOpen((v) => !v)}
        moreOpen={moreOpen}
      />
    </div>
  );
}
