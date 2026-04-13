"use client";

import { useState, useMemo } from "react";
import AdminTopBar from "@/components/admin/layout/AdminTopBar";
import AdminTabs from "@/components/admin/ui/AdminTabs";
import TeacherTable from "@/components/admin/teachers/TeacherTable";
import ApplicationReview from "@/components/admin/teachers/ApplicationReview";
import InterviewScheduler from "@/components/admin/teachers/InterviewScheduler";
import { adminTeachers } from "@/lib/admin/teachers";
import { AdminTeacher, ApplicationStatus } from "@/lib/admin/types";

export default function TeachersPage() {
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

  const handleRowClick = (teacher: AdminTeacher) => {
    setSelectedTeacher(teacher);
  };

  const handleApprove = (id: string) => {
    // In a real app, this would call an API
    console.log("Approved teacher:", id);
    setSelectedTeacher(null);
  };

  const handleReject = (id: string, reason: string) => {
    // In a real app, this would call an API
    console.log("Rejected teacher:", id, "Reason:", reason);
    setSelectedTeacher(null);
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

        {/* Application Review Panel (for pending teachers) */}
        {selectedTeacher && selectedTeacher.status === "pending" && (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
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

        {/* Detail panel for non-pending teachers */}
        {selectedTeacher && selectedTeacher.status !== "pending" && (
          <div className="mt-6">
            <ApplicationReview teacher={selectedTeacher} />
          </div>
        )}
      </div>
    </>
  );
}
