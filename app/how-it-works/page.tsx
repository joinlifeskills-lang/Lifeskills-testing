"use client";

import { useState } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/ui/Button";
import TeacherVetting from "@/components/TeacherVetting";

const steps = [
  {
    number: "1",
    title: "Find the right teacher",
    body: "Whether you're looking for healing or to build lasting skills for peace of mind — browse certified teachers and book free intro calls until you find the one that feels right.",
    image: "/teacher_profile_ui.png",
    imageStyle: { objectPosition: "50% 0%" },
  },
  {
    number: "2",
    title: "Book your first session",
    body: "Once you've found your teacher, schedule your first live session in minutes.",
    image: "/book_session_ui.png",
    imageStyle: { objectPosition: "50% 0%" },
  },
  {
    number: "3",
    title: "Leave feeling better",
    body: "Every session ends with you calmer, clearer, and equipped with real skills you can carry with you for life.",
    image: "/iphone_session.jpeg",
    imageStyle: { objectPosition: "50% 30%", transform: "scale(1.55)", transformOrigin: "50% 35%" },
  },
];

const tools = [
  {
    label: "Breathwork",
    text: "Learn to regulate your nervous system in real time — calm anxiety, shift your state, and breathe your way back to centre.",
  },
  {
    label: "Meditation",
    text: "Train your mind for stillness and clarity. Build a practice that actually sticks.",
  },
  {
    label: "Somatic Healing",
    text: "Release tension, stress, and stored emotion held in the body — gently and at your own pace.",
  },
  {
    label: "Movement & Yoga",
    text: "Reconnect with your body through guided movement. Build ease, presence, and strength from the inside out.",
  },
  {
    label: "Emotional Regulation",
    text: "Learn to navigate difficult emotions with skill — so they move through you instead of running you.",
  },
  {
    label: "Reiki",
    text: "Channel healing energy to release blockages, restore balance, and leave feeling deeply at ease.",
  },
];

const faqs = [
  {
    q: "Is this therapy?",
    a: "No. Lifeskills teachers are certified mind-body coaches. We teach self-regulation skills \u2014 we don\u2019t treat conditions or make diagnoses.",
  },
  {
    q: "How long is a session?",
    a: "Typically 45\u201360 minutes, guided by your teacher.",
  },
  {
    q: "What if the fit isn\u2019t right?",
    a: "Switch anytime. No awkward conversations, no fees.",
  },
  {
    q: "What platform do sessions happen on?",
    a: "Live video, directly through the app.",
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Nav />
      <main>
        {/* ── Section 1: Hero ── */}
        <section className="relative overflow-hidden min-h-[520px] md:min-h-[640px] flex items-center">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/man_breathwork.jpeg')" }}
            aria-hidden="true"
          />
          {/* Overlay for text legibility */}
          <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

          {/* Content */}
          <div className="relative z-10 w-full max-w-3xl mx-auto px-5 md:px-8 pt-32 md:pt-44 pb-20 md:pb-28 text-center">
            <FadeIn>
              <h1 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] text-balance">
                Wellbeing is something you can learn
              </h1>
            </FadeIn>
          </div>
        </section>

        {/* ── Section 2: What we offer ── */}
        <section className="bg-warm-sand">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <div className="text-center mb-14 md:mb-16">
                <h2 className="font-display font-normal text-deep-sage text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-5 text-balance">
                  Tools for wellbeing and healing
                </h2>
                <p className="font-sans text-[0.95rem] md:text-[1.05rem] text-neutral-600 leading-[1.7] max-w-[520px] mx-auto">
                  Every session teaches you something real — a skill you can use the moment it ends, and carry with you for life.
                </p>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {tools.map((tool, i) => (
                <FadeIn key={tool.label} delay={i * 60} className="h-full">
                  <div className="bg-white rounded-2xl px-6 py-6 h-full">
                    <p className="font-sans font-semibold text-deep-sage text-[1rem] mb-2">
                      {tool.label}
                    </p>
                    <p className="font-sans text-[0.88rem] text-neutral-600 leading-[1.65]">
                      {tool.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 3: Steps ── */}
        <section className="bg-white">
          <div className="max-w-6xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <div className="flex flex-col gap-20 md:gap-28">
              {steps.map((step, i) => {
                const flip = i % 2 !== 0;
                return (
                  <FadeIn key={step.number} delay={i * 60}>
                    <div
                      className={`flex flex-col ${
                        flip ? "md:flex-row-reverse" : "md:flex-row"
                      } items-center gap-10 md:gap-16`}
                    >
                      {/* Text side */}
                      <div className="flex-1 min-w-0 text-center md:text-left">
                        <div className="inline-flex items-center gap-3 mb-4">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-deep-sage text-white text-[0.85rem] font-sans font-semibold inline-flex items-center justify-center">
                            {step.number}
                          </div>
                          <h2 className="font-display font-normal text-deep-sage text-[1.55rem] md:text-[2rem] leading-[1.2]">
                            {step.title}
                          </h2>
                        </div>
                        <p className="font-sans text-[0.95rem] md:text-[1rem] text-neutral-700 leading-[1.65] max-w-[440px] mx-auto md:mx-0">
                          {step.body}
                        </p>
                      </div>

                      {/* Phone mockup */}
                      <div className="flex-1 w-full min-w-0 flex justify-center">
                        <div className="relative">
                          <div className="absolute -inset-8 rounded-[48px] bg-black/[0.03] blur-xl -z-10" />
                          <div className="w-[240px] h-[490px] rounded-[42px] bg-[#111] p-[3px] shadow-[0_32px_80px_rgba(0,0,0,0.22)] ring-1 ring-white/[0.08]">
                            <div className="w-full h-full rounded-[40px] overflow-hidden bg-white flex flex-col">
                              {/* Status bar */}
                              <div className="flex-shrink-0 h-7 bg-white flex items-center justify-between px-5 z-10">
                                <span className="text-[0.48rem] font-bold text-[#1A1A1A] font-sans">9:41</span>
                                <div className="flex items-center gap-1">
                                  <svg width="12" height="9" viewBox="0 0 12 9" fill="#1A1A1A">
                                    <rect x="0" y="6" width="2" height="3" rx="0.5" />
                                    <rect x="3.3" y="4" width="2" height="5" rx="0.5" />
                                    <rect x="6.6" y="2" width="2" height="7" rx="0.5" />
                                    <rect x="9.9" y="0" width="2" height="9" rx="0.5" />
                                  </svg>
                                  <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                                    <rect x="0.5" y="0.5" width="13" height="7" rx="1.5" stroke="#1A1A1A" strokeWidth="1" />
                                    <rect x="1.5" y="1.5" width="10" height="5" rx="0.8" fill="#1A1A1A" />
                                    <path d="M14.5 2.5v3" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
                                  </svg>
                                </div>
                              </div>
                              {/* Screen image */}
                              <div className="flex-1 relative overflow-hidden">
                                <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  className="object-cover object-top"
                                  style={step.imageStyle}
                                />
                              </div>
                              {/* Home indicator */}
                              <div className="flex-shrink-0 h-5 bg-white flex items-center justify-center">
                                <div className="w-16 h-[3px] rounded-full bg-[#1A1A1A]/15" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        <TeacherVetting />

        {/* ── Section 4: CTA ── */}
        <section className="bg-energy-gradient">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-8 text-balance">
                Your best days start here.
              </h2>
              <Button href="/find-a-teacher" variant="white">
                Start with a Free Intro Call
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* ── Section 5: FAQ ── */}
        <section className="bg-deep-gradient">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[2rem] md:text-[3rem] lg:text-[3.5rem] leading-[1.12] mb-12 md:mb-14 text-center">
                Common questions
              </h2>
            </FadeIn>
            <div className="flex flex-col">
              {faqs.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <FadeIn key={item.q} delay={i * 60}>
                    <div className="border-b border-white/15">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-6 py-5 md:py-6 cursor-pointer text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-sans font-semibold text-[1rem] md:text-[1.05rem] text-white">
                          {item.q}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/40 flex items-center justify-center transition-transform duration-200 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10">
                            <path
                              d="M5 0v10 M0 5h10"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-200 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100 pb-5"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-sans text-[0.92rem] text-white/70 leading-[1.6] max-w-[600px]">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
