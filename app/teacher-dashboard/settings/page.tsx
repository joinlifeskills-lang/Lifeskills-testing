"use client";

import { useState } from "react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import AccountInfo from "@/components/teacher/settings/AccountInfo";
import TeacherNotifications from "@/components/teacher/settings/TeacherNotifications";
import TeacherSupport from "@/components/teacher/settings/TeacherSupport";
import TeacherDangerZone from "@/components/teacher/settings/TeacherDangerZone";
import PayoutMethodManager from "@/components/teacher/earnings/PayoutMethodManager";
import { teacherPayoutSettings as initialPayoutSettings } from "@/lib/teacher/data";
import type { TeacherPayoutSettings } from "@/lib/teacher/types";

export default function SettingsPage() {
  const [payoutSettings, setPayoutSettings] = useState<TeacherPayoutSettings>(initialPayoutSettings);

  return (
    <>
      <TeacherTopBar />
      <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8">
        <h2 className="font-display text-2xl text-neutral-900">Settings</h2>
        <AccountInfo />
        <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-6">
          <h3 className="font-display text-lg text-neutral-900 mb-4">Payment Methods</h3>
          <PayoutMethodManager settings={payoutSettings} onUpdate={setPayoutSettings} />
        </div>
        <TeacherNotifications />
        <TeacherSupport />
        <TeacherDangerZone />
      </div>
    </>
  );
}
