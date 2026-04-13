import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import AccountInfo from "@/components/teacher/settings/AccountInfo";
import TeacherNotifications from "@/components/teacher/settings/TeacherNotifications";
import TeacherSupport from "@/components/teacher/settings/TeacherSupport";
import TeacherDangerZone from "@/components/teacher/settings/TeacherDangerZone";

export default function SettingsPage() {
  return (
    <>
      <TeacherTopBar />
      <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-6 lg:p-8">
        <h2 className="font-display text-2xl text-neutral-900">Settings</h2>
        <AccountInfo />
        <TeacherNotifications />
        <TeacherSupport />
        <TeacherDangerZone />
      </div>
    </>
  );
}
