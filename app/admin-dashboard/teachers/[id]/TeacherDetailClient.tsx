"use client";

import { useRouter } from "next/navigation";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import ApplicationReview from "@/components/admin/teachers/ApplicationReview";
import TeacherActiveDetail from "@/components/admin/teachers/TeacherActiveDetail";
import InterviewScheduler from "@/components/admin/teachers/InterviewScheduler";
import { adminTeachers } from "@/lib/admin/teachers";
import { ArrowLeft } from "lucide-react";

export default function TeacherDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const teacher = adminTeachers.find((t) => t.id === id);

  if (!teacher) {
    router.push("/admin-dashboard/teachers");
    return null;
  }

  const goBack = () => router.push("/admin-dashboard/teachers");

  const handleApprove = (tid: string) => {
    console.log("Approved teacher:", tid);
    goBack();
  };

  const handleReject = (tid: string, reason: string) => {
    console.log("Rejected teacher:", tid, "Reason:", reason);
    goBack();
  };

  const handleSuspend = (tid: string, reason: string) => {
    console.log("Suspended teacher:", tid, "Reason:", reason);
    goBack();
  };

  const handleUnsuspend = (tid: string) => {
    console.log("Unsuspended teacher:", tid);
    goBack();
  };

  const handleMessage = (tid: string, message: string) => {
    console.log("Message to teacher:", tid, "Message:", message);
  };

  return (
    <>
      <AdminTopBar title={teacher.name} />
      <div className="p-4 md:p-6 lg:p-8">
        <button
          onClick={goBack}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Back to Teachers
        </button>

        {teacher.status === "pending" && (
          <div className="grid min-w-0 gap-6 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <ApplicationReview
                teacher={teacher}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
            <div>
              <InterviewScheduler
                teacherName={teacher.name}
                onSchedule={(date, notes) => {
                  console.log("Scheduled interview:", date, notes);
                }}
              />
            </div>
          </div>
        )}

        {(teacher.status === "active" || teacher.status === "suspended") && (
          <TeacherActiveDetail
            teacher={teacher}
            onSuspend={handleSuspend}
            onUnsuspend={handleUnsuspend}
            onMessage={handleMessage}
          />
        )}

        {teacher.status === "rejected" && (
          <ApplicationReview teacher={teacher} />
        )}
      </div>
    </>
  );
}
