"use client";

import MemberTopBar from "@/components/member/layout/MemberTopBar";
import TodaysPractices from "@/components/member/journey/TodaysPractices";
import GoalsSection from "@/components/member/journey/GoalsSection";
import DailyReflection from "@/components/member/journey/DailyReflection";

const CLIENT_ID = "cl-1";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-warm-sand">
      <MemberTopBar />

      <div className="px-4 py-8 lg:px-8 xl:px-12 max-w-[1400px] mx-auto">
        {/* Desktop: two columns — Practices left, Goals right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7">
            <TodaysPractices clientId={CLIENT_ID} />
          </div>
          <div className="lg:col-span-5">
            <GoalsSection clientId={CLIENT_ID} />
          </div>
        </div>

        {/* Full-width reflection feed below */}
        <div className="mt-8 lg:mt-12">
          <DailyReflection clientId={CLIENT_ID} />
        </div>
      </div>
    </div>
  );
}
