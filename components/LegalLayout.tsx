import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

type Section = { id: string; label: string };

export default function LegalLayout({
  title,
  lastUpdated,
  sections,
  children,
}: {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-warm-sand min-h-screen">
        <div className="max-w-5xl mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-24">

          {/* Attorney notice */}
          <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-10 text-left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-500 flex-shrink-0 mt-0.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <p className="font-sans text-[0.82rem] text-amber-700 leading-[1.5]">
              This document is a working draft. Lifeskills recommends review by a licensed attorney before relying on it for legal compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-start">

            {/* Sidebar TOC */}
            <div className="md:sticky md:top-28">
              <div className="bg-white rounded-2xl border border-black/8 p-5">
                <p className="font-sans font-semibold text-[0.72rem] text-neutral-400 uppercase tracking-wide mb-3">
                  Contents
                </p>
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="font-sans text-[0.82rem] text-neutral-600 hover:text-deep-sage transition-colors no-underline py-0.5"
                    >
                      {s.label}
                    </a>
                  ))}
                </nav>
                <div className="h-px bg-black/8 my-4" />
                <div className="flex flex-col gap-1.5">
                  <Link href="/terms" className="font-sans text-[0.78rem] text-neutral-500 hover:text-deep-sage transition-colors no-underline">Terms of Service</Link>
                  <Link href="/privacy" className="font-sans text-[0.78rem] text-neutral-500 hover:text-deep-sage transition-colors no-underline">Privacy Policy</Link>
                  <Link href="/refund-policy" className="font-sans text-[0.78rem] text-neutral-500 hover:text-deep-sage transition-colors no-underline">Refund Policy</Link>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="bg-white rounded-2xl border border-black/8 p-8 md:p-10">
              <h1 className="font-display font-normal text-deep-sage text-[2rem] md:text-[2.4rem] leading-[1.1] mb-2">
                {title}
              </h1>
              <p className="font-sans text-[0.8rem] text-neutral-400 mb-8">
                Last updated: {lastUpdated}
              </p>
              <div className="prose-legal">
                {children}
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
