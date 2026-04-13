import MemberTopBar from "@/components/member/layout/MemberTopBar";
import TeacherFilteredList from "@/components/ui/TeacherFilteredList";

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-warm-sand">
      <MemberTopBar />
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-6 md:py-10">
        <h1 className="font-display font-normal text-deep-sage text-[1.9rem] md:text-[2.8rem] leading-[1.12] mb-5 md:mb-7 text-center">
          Find a Teacher
        </h1>
        <TeacherFilteredList />
      </div>
    </div>
  );
}
