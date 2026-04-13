"use client";

import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import PlatformConfig from "@/components/admin/settings/PlatformConfig";
import NotificationTemplates from "@/components/admin/settings/NotificationTemplates";
import DangerZone from "@/components/admin/settings/DangerZone";

export default function SettingsPage() {
  return (
    <>
      <AdminTopBar title="Settings" />
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        <PlatformConfig />
        <NotificationTemplates />
        <DangerZone />
      </div>
    </>
  );
}
