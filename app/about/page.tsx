"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/ui/Button";

const values = [
  {
    title: "Real connection",
    description:
      "Every session is live and one-on-one. No pre-recorded videos, no chatbots. A real human who sees you, hears you, and meets you where you are.",
  },
  {
    title: "Skills over coping",
    description:
      "We teach you how to consciously create and maintain the emotional states you want — so you stop being dependent on external systems and become your own source of peace.",
  },
  {
    title: "Teachers taught by life",
    description:
      "Our coaches have walked the path themselves. They teach from experience, not textbooks. That's what makes the difference.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden min-h-[520px] md:min-h-[640px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/aboutus_hero_image.jpeg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-5 md:px-8 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
            <FadeIn>
              <h1 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] text-balance">
                We believe in a world where every individual is empowered to live their best life.
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* ── Mission ── */}
        <section className="bg-deep-sage">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] text-balance">
                Our mission is to equip individuals with the tools to transform inner turmoil into lasting inner peace.
              </h2>
            </FadeIn>
          </div>
        </section>

        {/* ── Core Thesis ── */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-deep-sage text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] text-balance text-center mb-10 md:mb-12">
                The problem we see
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16">
                <p className="font-sans text-[0.95rem] md:text-[1.1rem] text-neutral-700 leading-[1.7]">
                  Traditional mental health care treats symptoms, not root causes.
                  People are suffering because nobody taught them how their own
                  mind actually works. If you understand the mechanism, you can
                  operate it.
                </p>
                <p className="font-sans text-[0.95rem] md:text-[1.1rem] text-neutral-700 leading-[1.7]">
                  Lifeskills teaches people the skill of self-regulation — how
                  to consciously create and maintain the emotional states they
                  want — so they stop being dependent on external systems and
                  become their own source of peace.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── What Makes Us Different ── */}
        <section className="bg-deep-gradient">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-14 md:mb-16 text-balance text-center">
                What makes us different
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {values.map((v, i) => (
                <FadeIn key={v.title} delay={i * 80}>
                  <div className="flex flex-col h-full border-t border-white/20 pt-8">
                    <span className="font-sans text-[0.7rem] font-bold tracking-[0.12em] uppercase text-white/40 mb-4">
                      0{i + 1}
                    </span>
                    <h3 className="font-display font-normal text-white text-[1.5rem] md:text-[1.7rem] leading-[1.2] mb-4">
                      {v.title}
                    </h3>
                    <p className="font-sans text-[0.95rem] text-white/70 leading-[1.7]">
                      {v.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── For Teachers ── */}
        <section className="bg-warm-sand">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <div className="flex flex-col md:flex-row md:items-center md:gap-20">
                <h2 className="font-display font-normal text-deep-sage text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] text-balance md:flex-1 mb-8 md:mb-0 shrink-0">
                  Built for teachers, too.
                </h2>
                <div className="md:flex-1 flex flex-col gap-6 items-start">
                  <p className="font-sans text-[0.95rem] md:text-[1.1rem] text-neutral-700 leading-[1.7]">
                    Lifeskills gives experienced coaches a home — a platform where
                    they can focus on what they do best: teaching. We handle the
                    scheduling, payments, and connections so they can show up fully
                    for every session.
                  </p>
                  <Button href="/become-a-teacher" variant="secondary">
                    Become a Teacher
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-energy-gradient">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-8 text-balance">
                Peace of mind starts here.
              </h2>
              <Button href="/find-a-teacher" variant="white">
                Get Started
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
