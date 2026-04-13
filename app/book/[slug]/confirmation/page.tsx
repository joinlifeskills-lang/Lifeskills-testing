import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{
    teacherName?: string;
    date?: string;
    time?: string;
    price?: string;
  }>;
}) {
  const { teacherName = "your teacher", date = "", time = "", price = "" } = await searchParams;

  return (
    <>
      <Nav />
      <main className="bg-deep-sage min-h-screen flex items-center justify-center px-5 py-24">
        <div className="w-full max-w-lg">
          <div className="bg-[#F5F0E8] rounded-2xl p-10 flex flex-col items-center text-center">

            {/* Checkmark */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-7 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #2D4A3E, #1E3A2E)" }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="font-display font-normal text-deep-sage text-[2.2rem] mb-2">
              Booking confirmed!
            </h1>
            <p className="font-sans text-neutral-600 text-[1rem] mb-2">
              Thank you for booking with us — we&apos;re so glad you&apos;re here.
            </p>
            <p className="font-sans text-neutral-400 text-[0.88rem] mb-8">
              A confirmation has been sent to your email.
            </p>

            {/* Purchase details card */}
            <div className="w-full bg-white rounded-xl border border-black/8 p-6 mb-6 text-left">
              <h2 className="font-sans font-semibold text-[0.72rem] text-neutral-400 uppercase tracking-wide mb-4">
                Booking details
              </h2>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <div>
                    <p className="font-sans text-[0.72rem] text-neutral-400">Teacher</p>
                    <p className="font-sans font-semibold text-[0.92rem] text-neutral-800">{teacherName}</p>
                  </div>
                </div>
                {date && (
                  <div className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0 mt-0.5" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <div>
                      <p className="font-sans text-[0.72rem] text-neutral-400">Date</p>
                      <p className="font-sans font-semibold text-[0.92rem] text-neutral-800">{date}</p>
                    </div>
                  </div>
                )}
                {time && (
                  <div className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0 mt-0.5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <div>
                      <p className="font-sans text-[0.72rem] text-neutral-400">Time</p>
                      <p className="font-sans font-semibold text-[0.92rem] text-neutral-800">{time} · 60 min</p>
                    </div>
                  </div>
                )}
                {price && (
                  <div className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-deep-sage flex-shrink-0 mt-0.5" aria-hidden="true">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                    </svg>
                    <div>
                      <p className="font-sans text-[0.72rem] text-neutral-400">Total paid</p>
                      <p className="font-sans font-semibold text-[0.92rem] text-neutral-800">${price}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Refund notice */}
            <div className="w-full flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 mb-8 text-left">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <p className="font-sans text-[0.82rem] text-amber-700 leading-[1.5]">
                <span className="font-semibold">Free cancellation available</span> up to 24 hours before your session. After that, sessions are non-refundable.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center rounded-full font-sans font-semibold text-[0.92rem] px-6 py-[12px] text-white transition-all no-underline hover:opacity-90"
              style={{ background: "#2D4A3E" }}
            >
              Back to home
            </Link>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
