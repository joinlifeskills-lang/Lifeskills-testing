import MemberTopBar from "@/components/member/layout/MemberTopBar";
import ProfileHeader from "@/components/member/profile/ProfileHeader";
import PersonalInfo from "@/components/member/profile/PersonalInfo";
import WellnessProfile from "@/components/member/profile/WellnessProfile";
import PaymentSection from "@/components/member/profile/PaymentSection";
import SupportSection from "@/components/member/profile/SupportSection";
import DangerZone from "@/components/member/profile/DangerZone";

export default function ProfilePage() {
  return (
    <>
      <MemberTopBar />
      <div className="p-4 md:p-6 lg:p-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          <ProfileHeader />
          <PersonalInfo />
          <WellnessProfile />
          <PaymentSection />
          <SupportSection />
          <DangerZone />
        </div>
      </div>
    </>
  );
}
