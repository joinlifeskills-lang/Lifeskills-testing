import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { teachers, disciplineTagColors, disciplineGradient } from "@/lib/teachers";
import CheckoutForm from "./CheckoutForm";

export function generateStaticParams() {
  return teachers.map((t) => ({ slug: t.slug }));
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ date?: string; time?: string }>;
}) {
  const { slug } = await params;
  const { date = "", time = "" } = await searchParams;

  const teacher = teachers.find((t) => t.slug === slug);
  if (!teacher) return notFound();

  const gradient = disciplineGradient[teacher.disciplines[0]];
  const displayDate = date ? formatDate(date) : "No date selected";
  const displayTime = time ? decodeURIComponent(time) : "No time selected";
  const bookingFee = 0;
  const total = teacher.price + bookingFee;

  return (
    <>
      <Nav />
      <main className="bg-warm-sand min-h-screen">
        <div className="max-w-5xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-28 md:pb-20">

          {/* Single unified card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr]">

              {/* Left panel — Order Summary */}
              <div className="p-7 md:p-10 border-b border-black/8 md:border-b-0 md:border-r md:border-black/8">

                {/* Teacher avatar */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center"
                    style={{ background: gradient }}
                  >
                    <span className="font-sans font-bold text-white/90 text-[1.4rem]">
                      {teacher.initials}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display font-normal text-deep-sage text-[1.3rem] leading-tight mb-1.5">
                      {teacher.name}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      {teacher.disciplines.map((d) => {
                        const colors = disciplineTagColors[d];
                        return (
                          <span
                            key={d}
                            className="inline-block rounded-full px-2.5 py-0.5 font-sans text-[0.72rem] font-semibold"
                            style={{ backgroundColor: colors.bg, color: colors.text }}
                          >
                            {d}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="font-sans text-[0.88rem] text-neutral-600 leading-[1.6] line-clamp-2 mb-5">
                  {teacher.tagline}
                </p>

                <hr className="border-black/8 mb-5" />

                {/* Booking details */}
                <div className="mb-5">
                  <h3 className="font-sans font-semibold text-[0.72rem] text-neutral-400 uppercase tracking-wide mb-3">
                    Your booking
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 font-sans text-[0.88rem] text-neutral-700">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0" aria-hidden="true">
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                      {displayDate}
                    </div>
                    <div className="flex items-center gap-2.5 font-sans text-[0.88rem] text-neutral-700">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {displayTime}
                    </div>
                    <div className="flex items-center gap-2.5 font-sans text-[0.88rem] text-neutral-700">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0" aria-hidden="true">
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
                        <path d="M15 9H9v6h6V9z" />
                      </svg>
                      60 min session
                    </div>
                  </div>
                </div>

                <hr className="border-black/8 mb-5" />

                {/* Price breakdown */}
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex justify-between font-sans text-[0.88rem] text-neutral-600">
                    <span>Session fee</span>
                    <span>${teacher.price}</span>
                  </div>
                  <div className="flex justify-between font-sans font-bold text-[1rem] text-deep-sage mt-1">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>

                {/* Secure checkout */}
                <div className="flex items-center gap-1.5 font-sans text-[0.75rem] text-neutral-400">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 018 0v4" />
                  </svg>
                  Secure checkout
                </div>
              </div>

              {/* Right panel — Checkout form */}
              <div className="p-7 md:p-10">
                <h1 className="font-display font-normal text-deep-sage text-[1.6rem] mb-6">
                  Complete your booking
                </h1>
                <CheckoutForm
                  teacherName={teacher.name}
                  date={displayDate}
                  time={displayTime}
                  price={total}
                />
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
