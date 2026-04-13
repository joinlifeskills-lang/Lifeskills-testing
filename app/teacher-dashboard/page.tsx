import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import TeacherWelcome from "@/components/teacher/home/TeacherWelcome";
import TodaySchedule from "@/components/teacher/home/TodaySchedule";
import PendingActions from "@/components/teacher/home/PendingActions";
import TeacherQuickStats from "@/components/teacher/home/TeacherQuickStats";

export default function TeacherHomePage() {
  return (
    <>
      <TeacherTopBar />
      <div className="p-4 md:p-5 lg:p-6 space-y-4">
        <TeacherWelcome />
        <TeacherQuickStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[420px]">
          <TodaySchedule />
          <PendingActions />
        </div>
      </div>
    </>
  );
}
