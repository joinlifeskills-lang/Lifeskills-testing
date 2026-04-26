"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import AdminTabs from "@/components/admin/ui/AdminTabs";
import TeacherTable from "@/components/admin/teachers/TeacherTable";
import ApplicationReview from "@/components/admin/teachers/ApplicationReview";
import TeacherActiveDetail from "@/components/admin/teachers/TeacherActiveDetail";
import InterviewScheduler from "@/components/admin/teachers/InterviewScheduler";
import { adminTeachers } from "@/lib/admin/teachers";
import { AdminTeacher, ApplicationStatus } from "@/lib/admin/types";
import { X } from "lucide-react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function TeachersPage() {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<ApplicationStatus>("pending");
  const [selectedTeacher, setSelectedTeacher] = useState<AdminTeacher | null>(null);

  const counts = useMemo(() => {
    const c = { pending: 0, active: 0, suspended: 0, rejected: 0 };
    adminTeachers.forEach((t) => c[t.status]++);
    return c;
  }, []);

  const tabs = [
    { label: "Pending", value: "pending", count: counts.pending },
    { label: "Active", value: "active", count: counts.active },
    { label: "Suspended", value: "suspended", count: counts.suspended },
    { label: "Rejected", value: "rejected", count: counts.rejected },
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value as ApplicationStatus);
    setSelectedTeacher(null);
  };

  const handleRowClick = useCallback(
    (teacher: AdminTeacher) => {
      if (isMobile) {
        router.push(`/admin-dashboard/teachers/${teacher.id}`);
      } else {
        setSelectedTeacher(teacher);
      }
    },
    [isMobile, router]
  );

  const closeModal = () => setSelectedTeacher(null);

  const handleApprove = (id: string) => {
    console.log("Approved teacher:", id);
    setSelectedTeacher(null);
  };

  const handleReject = (id: string, reason: string) => {
    console.log("Rejected teacher:", id, "Reason:", reason);
    setSelectedTeacher(null);
  };

  const handleSuspend = (id: string, reason: string) => {
    console.log("Suspended teacher:", id, "Reason:", reason);
    setSelectedTeacher(null);
  };

  const handleUnsuspend = (id: string) => {
    console.log("Unsuspended teacher:", id);
    setSelectedTeacher(null);
  };

  const handleMessage = (id: string, message: string) => {
    console.log("Message to teacher:", id, "Message:", message);
  };

  return (
    <>
      <AdminTopBar title="Teachers" />
      <div className="p-4 md:p-6 lg:p-8">
        {/* Tabs */}
        <div className="mb-6">
          <AdminTabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
        </div>

        {/* Table */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(0,0,0,0.08)] md:p-6">
          <TeacherTable
            teachers={adminTeachers}
            activeTab={activeTab}
            onRowClick={handleRowClick}
          />
        </div>
      </div>

      {/* ── Desktop-only: Teacher Detail Modal ── */}
      {selectedTeacher && !isMobile && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeModal}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-12 pb-12">
            <div
              className="relative w-full max-w-4xl rounded-2xl bg-warm-sand shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-neutral-600 shadow-sm backdrop-blur-sm hover:bg-white hover:text-neutral-900 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="p-6 lg:p-8">
                {selectedTeacher.status === "pending" && (
                  <div className="grid min-w-0 gap-6 lg:grid-cols-3">
                    <div className="min-w-0 lg:col-span-2">
                      <ApplicationReview
                        teacher={selectedTeacher}
                        onApprove={handleApprove}
                        onReject={handleReject}
                      />
                    </div>
                    <div>
                      <InterviewScheduler
                        teacherName={selectedTeacher.name}
                        onSchedule={(date, notes) => {
                          console.log("Scheduled interview:", date, notes);
                        }}
                      />
                    </div>
                  </div>
                )}

                {(selectedTeacher.status === "active" || selectedTeacher.status === "suspended") && (
                  <TeacherActiveDetail
                    teacher={selectedTeacher}
                    onSuspend={handleSuspend}
                    onUnsuspend={handleUnsuspend}
                    onMessage={handleMessage}
                  />
                )}

                {selectedTeacher.status === "rejected" && (
                  <ApplicationReview teacher={selectedTeacher} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
