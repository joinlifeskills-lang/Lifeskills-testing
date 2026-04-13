"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/ui/Button";

const steps = [
  {
    number: "01",
    title: "Apply",
    description: "Fill out and submit a short application.",
    image: "/apply_image.jpeg",
    imageClass: "object-cover object-center",
  },
  {
    number: "02",
    title: "Meet with us",
    description: "We\u2019ll hop on a live video call to see if we\u2019re the right fit for each other.",
    image: "/iphone_session.jpeg",
    imageClass: "object-cover object-center scale-110",
  },
  {
    number: "03",
    title: "Start earning",
    description: "Empower people and get paid.",
    image: "/payment_recieved.jpeg",
    imageClass: "object-cover object-center scale-150 translate-y-4",
  },
];

const features = [
  { title: "Set your own rates", description: "You decide what you charge." },
  { title: "Flexible schedule", description: "Teach when it works for you." },
  { title: "Weekly payouts", description: "Get paid every week, reliably." },
];

const faqs = [
  { q: "How do I get paid?", a: "Via wire transfer to your bank account or PayPal, every week." },
  { q: "Can I set my own rates?", a: "Yes. You set what you charge per session." },
  { q: "What kind of students will I be teaching?", a: "People looking to learn mind-body practices and build real self-regulation skills." },
  { q: "How flexible is the schedule?", a: "Completely. You teach when you want, as much as you want." },
];

const disciplines = ["Breathwork", "Meditation", "Yoga", "Somatic", "Other"];

const experienceOptions = [
  { value: "1-2", label: "1\u20132 years" },
  { value: "new", label: "Just certified / brand new" },
  { value: "3-5", label: "3\u20135 years" },
  { value: "6-10", label: "6\u201310 years" },
  { value: "10+", label: "10+ years" },
];

const inputBase =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 font-sans text-[0.95rem] text-neutral-900 placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-deep-sage/40 transition-shadow";

export default function BecomeATeacherPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [otherDiscipline, setOtherDiscipline] = useState("");

  function toggleDiscipline(d: string) {
    setSelectedDisciplines((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedDisciplines.length === 0) {
      alert("Please select at least one discipline.");
      return;
    }
    router.push("/become-a-teacher/thank-you");
  }

  return (
    <>
      <Nav />
      <main>
        {/* ── Section 1: Hero ── */}
        {/* Mobile: background image */}
        <section className="relative bg-warm-sand">
          <div
            className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/become_teacher.jpeg')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 md:hidden bg-black/40" aria-hidden="true" />

          <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8 pt-28 md:pt-36 pb-16 md:pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
              {/* Left — copy */}
              <FadeIn>
                <div className="text-center md:text-left">
                  <h1 className="font-display font-normal text-white md:text-deep-sage text-[2rem] md:text-[3.2rem] lg:text-[3.8rem] leading-[1.12] mb-10 text-balance">
                    Make a living by helping people live their best lives.
                  </h1>
                  <Button href="#apply" variant="nav">
                    Apply Now
                  </Button>
                </div>
              </FadeIn>

              {/* Right — image (desktop only) */}
              <FadeIn delay={100}>
                <div className="hidden md:block">
                  <img
                    src="/become_teacher.jpeg"
                    alt="Teacher meditating in a sunlit room"
                    className="w-full rounded-[20px] md:rounded-[28px] object-cover aspect-[4/5]"
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Infinite scrolling ticker */}
          <div className="relative z-10 overflow-hidden border-t border-black/5 md:border-black/5 py-4">
            <div className="flex animate-ticker whitespace-nowrap">
              {Array.from({ length: 20 }).map((_, i) => (
                <span
                  key={i}
                  className="font-display text-white md:text-deep-sage text-[0.95rem] md:text-[1.05rem] mx-4 select-none flex-shrink-0"
                >
                  Apply Now&ensp;&bull;
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 2: How It Works ── */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-deep-sage text-[1.8rem] md:text-[2.75rem] lg:text-[3.2rem] leading-[1.12] mb-14 md:mb-16 text-center text-balance">
                How it works
              </h2>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {steps.map((s, i) => (
                <FadeIn key={s.number} delay={i * 80}>
                  <div className="bg-warm-sand rounded-[20px] overflow-hidden h-full flex flex-col">
                    <div className="aspect-[3/2] relative overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className={s.imageClass}
                      />
                    </div>
                    <div className="px-5 pb-5 pt-3 text-center flex-1 flex flex-col items-center">
                      <div className="inline-flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-deep-sage text-white font-sans text-[0.75rem] font-semibold">
                          {i + 1}
                        </span>
                        <h3 className="font-display font-normal text-deep-sage text-[1.25rem] md:text-[1.4rem] leading-[1.2]">
                          {s.title}
                        </h3>
                      </div>
                      <p className="font-sans text-[0.92rem] text-neutral-700 leading-[1.65]">
                        {s.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={300}>
              <div className="text-center mt-12">
                <Button href="#apply" variant="nav">
                  Apply Now
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>


        {/* ── Section 4: Dashboard Preview ── */}
        <section className="bg-white">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-deep-sage text-[1.8rem] md:text-[2.75rem] lg:text-[3.2rem] leading-[1.12] mb-14 md:mb-16 text-center text-balance">
                Teacher dashboard, built for you
              </h2>
            </FadeIn>
            <FadeIn delay={60}>
              <div className="relative max-w-3xl mx-auto mb-14 md:mb-16 rounded-[20px] md:rounded-[28px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)]">
                <img
                  src="/teacher_dashboard.png"
                  alt="Teacher dashboard preview"
                  className="w-full object-cover object-top"
                />
                {/* Fade-out overlay — bottom two-thirds fades to white */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 text-center">
              {features.map((f, i) => (
                <FadeIn key={f.title} delay={i * 80}>
                  <h3 className="font-display font-normal text-deep-sage text-[1.15rem] md:text-[1.3rem] leading-[1.2] mb-2">
                    {f.title}
                  </h3>
                  <p className="font-sans text-[0.92rem] text-neutral-700 leading-[1.65] max-w-[300px] mx-auto">
                    {f.description}
                  </p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 5: Application Form ── */}
        <section id="apply" className="bg-deep-sage scroll-mt-16">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-10 md:py-14">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[1.8rem] md:text-[2.75rem] lg:text-[3.2rem] leading-[1.12] mb-8 md:mb-10 text-center text-balance">
                Apply to teach
              </h2>
            </FadeIn>

              <FadeIn>
                <form
                  onSubmit={handleSubmit}
                  className="max-w-4xl mx-auto flex flex-col gap-5"
                >
                  {/* Row 1: Full name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Full name <span className="text-bright-amber">*</span>
                      </label>
                      <input id="fullName" name="fullName" type="text" required className={inputBase} placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Email <span className="text-bright-amber">*</span>
                      </label>
                      <input id="email" name="email" type="email" required className={inputBase} placeholder="jane@example.com" />
                    </div>
                  </div>

                  {/* Row 2: Phone + Country */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Phone <span className="text-bright-amber">*</span>
                      </label>
                      <input id="phone" name="phone" type="tel" required className={inputBase} placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label htmlFor="country" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Country <span className="text-bright-amber">*</span>
                      </label>
                      <input id="country" name="country" type="text" required className={inputBase} placeholder="United States" />
                    </div>
                  </div>

                  {/* Full width: Disciplines */}
                  <fieldset>
                    <legend className="block font-sans text-[0.88rem] font-medium text-white mb-2">
                      Disciplines <span className="text-bright-amber">*</span>
                    </legend>
                    <div className="flex flex-wrap gap-3">
                      {disciplines.map((d) => (
                        <label key={d} className="flex items-center gap-2 font-sans text-[0.92rem] text-white cursor-pointer select-none">
                          <input
                            type="checkbox"
                            name="disciplines"
                            value={d}
                            checked={selectedDisciplines.includes(d)}
                            onChange={() => toggleDiscipline(d)}
                            className="w-4 h-4 rounded border-white/30 text-white accent-white"
                          />
                          {d}
                        </label>
                      ))}
                    </div>
                    {selectedDisciplines.includes("Other") && (
                      <input
                        type="text"
                        name="otherDiscipline"
                        value={otherDiscipline}
                        onChange={(e) => setOtherDiscipline(e.target.value)}
                        className={inputBase + " mt-3"}
                        placeholder="What other disciplines do you practice?"
                      />
                    )}
                  </fieldset>

                  {/* Row 3: Experience + Instagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="experience" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Years of experience <span className="text-white/60 font-normal">(optional)</span>
                      </label>
                      <select id="experience" name="experience" className={inputBase}>
                        {experienceOptions.map((o) => (
                          <option key={o.value} value={o.value} disabled={!o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="instagram" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                        Instagram <span className="text-white/60 font-normal">(optional)</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-sans text-[0.95rem] text-neutral-400 select-none">@</span>
                        <input id="instagram" name="instagram" type="text" className={inputBase + " pl-9"} placeholder="yourhandle" />
                      </div>
                    </div>
                  </div>

                  {/* Full width: Bio */}
                  <div>
                    <label htmlFor="bio" className="block font-sans text-[0.88rem] font-medium text-white mb-1.5">
                      Short bio <span className="text-white/60 font-normal">(optional)</span>
                    </label>
                    <textarea id="bio" name="bio" rows={3} className={inputBase + " resize-y"} placeholder="Tell us a bit about yourself and what drives you to teach" />
                  </div>

                  {/* Full width: Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center whitespace-nowrap rounded-full font-sans font-semibold text-[0.95rem] tracking-[0.01em] px-[26px] py-[13px] transition-all duration-200 ease-out cursor-pointer bg-white text-deep-sage border-0 hover:bg-warm-sand hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
                    >
                      Submit application
                    </button>
                  </div>
                </form>
              </FadeIn>
          </div>
        </section>

        {/* ── Section 6: CTA ── */}
        <section className="bg-energy-gradient">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28 text-center">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[1.8rem] md:text-[2.75rem] leading-[1.15] mb-5 max-w-[520px] mx-auto text-balance">
                Your knowledge can change lives.
              </h2>
              <p className="font-sans text-[0.95rem] md:text-[1.1rem] text-white/85 leading-[1.7] mb-8">
                Start by applying. It takes less than 5 minutes.
              </p>
              <Button href="#apply" variant="white">
                Apply Now
              </Button>
            </FadeIn>
          </div>
        </section>

        {/* ── Section 7: FAQ ── */}
        <section className="bg-deep-gradient">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-20 md:py-28">
            <FadeIn>
              <h2 className="font-display font-normal text-white text-[1.8rem] md:text-[2.5rem] leading-[1.15] mb-12 md:mb-14 text-center">
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
