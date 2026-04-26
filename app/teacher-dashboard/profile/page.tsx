"use client";

import { useState } from "react";
import TeacherTopBar from "@/components/teacher/layout/TeacherTopBar";
import PublicProfile from "@/components/teacher/profile/PublicProfile";
import AvailabilityEditor from "@/components/teacher/profile/AvailabilityEditor";
import ReviewsDisplay from "@/components/teacher/profile/ReviewsDisplay";
import TeacherCertifications from "@/components/teacher/profile/TeacherCertifications";

const TABS = ["Public Profile", "Certifications", "Availability", "Reviews & Ratings"] as const;

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0]);

  return (
    <>
      <TeacherTopBar />
      <div className="p-4 md:p-6 lg:p-8">
        <h2 className="mb-4 font-display text-2xl text-neutral-900">Profile</h2>

        {/* Tab bar */}
        <div className="mb-6 inline-flex rounded-xl bg-neutral-100 p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "Public Profile" && <PublicProfile />}
        {activeTab === "Certifications" && <TeacherCertifications />}
        {activeTab === "Availability" && <AvailabilityEditor />}
        {activeTab === "Reviews & Ratings" && <ReviewsDisplay />}
      </div>
    </>
  );
}
