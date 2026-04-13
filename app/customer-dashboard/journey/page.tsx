"use client";

import MemberTopBar from "@/components/member/layout/MemberTopBar";
import DailyWellnessQuote from "@/components/member/journey/DailyWellnessQuote";
import TodaysPractices from "@/components/member/journey/TodaysPractices";
import GoalsSection from "@/components/member/journey/GoalsSection";
import DailyJournal from "@/components/member/journey/DailyJournal";

const CLIENT_ID = "cl-1";

export default function JourneyPage() {
  return (
    <div className="min-h-screen bg-warm-sand">
      <MemberTopBar />

      <div className="px-4 py-8 lg:px-8 max-w-3xl mx-auto">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="font-display text-3xl text-deep-sage">My Journey</h1>
          <p className="mt-1 text-sm text-neutral-500">Welcome back, Sarah.</p>
        </div>

        {/* Daily wellness quote — always visible */}
        <div className="mb-10">
          <DailyWellnessQuote />
        </div>

        {/* Main sections */}
        <div className="space-y-10">
          <TodaysPractices clientId={CLIENT_ID} />
          <GoalsSection clientId={CLIENT_ID} />
          <DailyJournal clientId={CLIENT_ID} />
        </div>
      </div>
    </div>
  );
}
