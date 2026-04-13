import Link from "next/link";
import { Search } from "lucide-react";
import MemberTopBar from "@/components/member/layout/MemberTopBar";
import WelcomeBanner from "@/components/member/home/WelcomeBanner";
import UpcomingSessionCard from "@/components/member/home/UpcomingSessionCard";
import QuickStats from "@/components/member/home/QuickStats";
import MyTeachers from "@/components/member/home/MyTeachers";
import RecentActivity from "@/components/member/home/RecentActivity";

export default function DashboardPage() {
  return (
    <>
      <MemberTopBar />

      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <WelcomeBanner />
        <UpcomingSessionCard />
        <QuickStats />

        {/* My Teachers */}
        <section>
          <h2 className="font-display text-lg text-neutral-900 mb-3">
            My Teachers
          </h2>
          <MyTeachers />
        </section>

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
