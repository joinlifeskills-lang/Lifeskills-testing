import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import TeacherFilteredList from "@/components/ui/TeacherFilteredList";

export default function FindATeacherPage() {
  return (
    <>
      <Nav />
      <main className="bg-warm-sand">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-[68px] md:pt-[76px] pb-14 md:pb-20">
          {/* Headline */}
          <FadeIn>
            <h1 className="font-display font-normal text-deep-sage text-[1.9rem] md:text-[2.8rem] lg:text-[3.2rem] leading-[1.12] mb-3 md:mb-5 text-center text-balance">
              Find a teacher
            </h1>
          </FadeIn>

          {/* Filter + Teacher list */}
          <TeacherFilteredList />
        </div>
      </main>
      <Footer />
    </>
  );
}
