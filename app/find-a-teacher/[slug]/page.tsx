import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import BookingCard from "@/components/ui/BookingCard";
import { teachers, disciplineTagColors, disciplineGradient } from "@/lib/teachers";
import MessageTeacherButton from "@/components/ui/MessageTeacherButton";

export function generateStaticParams() {
  return teachers.map((t) => ({ slug: t.slug }));
}

const helpTags = ["Stress", "Anxiety", "Burnout", "Sleep", "Focus", "Emotional Regulation", "Self-discovery"];

const expectations = [
  "A grounding 60-minute session tailored to where you are today",
  "Practical tools you can use between sessions",
  "A safe, judgement-free space to explore what's holding you back",
];

export default async function TeacherProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const teacher = teachers.find((t) => t.slug === slug);

  if (!teacher) return notFound();

  const gradient = disciplineGradient[teacher.disciplines[0]];

  return (
    <>
      <Nav />
      <main className="bg-warm-sand">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-28 md:pb-20">
          <div className="flex flex-col md:flex-row gap-10 md:gap-12">
            {/* Left column — content */}
            <div className="flex-1 min-w-0">
              <FadeIn>
                {/* Photo placeholder */}
                <div
                  className="relative w-full rounded-2xl flex items-center justify-center mb-8"
                  style={{ background: gradient, height: 400 }}
                >
                  <span className="font-sans font-bold text-white/80 text-[4rem]">
                    {teacher.initials}
                  </span>
                  <button
                    type="button"
                    aria-label={`Play introduction from ${teacher.name}`}
                    className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/35 transition-colors cursor-pointer shadow-md"
                  >
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 1.5v11l9-5.5L3 1.5z" fill="white" />
                    </svg>
                  </button>
                </div>

                {/* Name */}
                <h1 className="font-display font-normal text-deep-sage text-[2rem] md:text-[2.8rem] leading-[1.12] mb-4">
                  {teacher.name}
                </h1>

                {/* Discipline tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.disciplines.map((d) => {
                    const colors = disciplineTagColors[d];
                    return (
                      <span
                        key={d}
                        className="inline-block rounded-full px-3 py-1 font-sans text-[0.78rem] font-semibold"
                        style={{ backgroundColor: colors.bg, color: colors.text }}
                      >
                        {d}
                      </span>
                    );
                  })}
                </div>

                {/* Available badge + Message */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-6 font-sans text-[0.85rem] text-neutral-600">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                    Available {teacher.nextAvailable}
                  </div>
                  <MessageTeacherButton teacherName={teacher.name} teacherSlug={teacher.slug} />
                </div>

                {/* Bio */}
                <p className="font-sans text-[1rem] md:text-[1.05rem] text-neutral-600 leading-[1.7] mb-10">
                  {teacher.tagline}
                </p>

                {/* What to expect */}
                <div className="mb-10">
                  <h2 className="font-display font-normal text-deep-sage text-[1.4rem] md:text-[1.6rem] mb-4">
                    What to expect
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {expectations.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-[0.92rem] text-neutral-600 leading-[1.6]">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="#0BA89A" strokeWidth="2" />
                          <path d="M8 12l3 3 5-5" stroke="#0BA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* I can help you with */}
                <div className="mb-10">
                  <h2 className="font-display font-normal text-deep-sage text-[1.4rem] md:text-[1.6rem] mb-4">
                    I can help you with
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {helpTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block rounded-full px-4 py-1.5 font-sans text-[0.82rem] font-medium bg-warm-sand text-deep-sage"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* My approach */}
                <div className="mb-6">
                  <h2 className="font-display font-normal text-deep-sage text-[1.4rem] md:text-[1.6rem] mb-4">
                    My approach
                  </h2>
                  <p className="font-display italic text-neutral-600 text-[1.05rem] md:text-[1.15rem] leading-[1.6]">
                    &ldquo;I meet you exactly where you are — no forcing, no fixing, just presence and gentle guidance toward the calm that already lives inside you.&rdquo;
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Right column — booking card */}
            <div className="w-full md:w-[360px] flex-shrink-0">
              <BookingCard
                price={teacher.price}
                nextAvailable={teacher.nextAvailable}
                slug={teacher.slug}
                teacherName={teacher.name}
                teacherInitials={teacher.initials}
                gradient={gradient}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
