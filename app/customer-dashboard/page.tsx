import Link from "next/link";
import { Search } from "lucide-react";
import MemberTopBar from "@/components/member/layout/MemberTopBar";
import WelcomeBanner from "@/components/member/home/WelcomeBanner";
import UpcomingSessionCard from "@/components/member/home/UpcomingSessionCard";
import NeedsAttention from "@/components/member/home/NeedsAttention";
import HomePractices from "@/components/member/home/HomePractices";
import HomeReflectionPrompt from "@/components/member/home/HomeReflectionPrompt";
import RecentActivity from "@/components/member/home/RecentActivity";

export default function DashboardPage() {
  return (
    <>
      <MemberTopBar />

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <WelcomeBanner />

        {/* Next Session + Needs Attention side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <UpcomingSessionCard />
          </div>
          <div className="lg:col-span-5">
            <NeedsAttention />
          </div>
        </div>

        {/* Today's Practices + Daily Reflection side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7">
            <HomePractices />
          </div>
          <div className="lg:col-span-5">
            <HomeReflectionPrompt />
          </div>
        </div>

        <RecentActivity />

        {/* Mobile Explore CTA */}
        <Link
          href="/customer-dashboard/explore"
          className="flex lg:hidden items-center justify-center gap-2 bg-deep-sage rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-5 text-white font-semibold hover:bg-deep-sage-hover transition-colors"
        >
          <Search size={20} />
          <span>Explore Teachers</span>
        </Link>
      </div>
    </>
  );
}
