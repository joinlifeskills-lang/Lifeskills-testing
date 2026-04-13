"use client";

import FadeIn from "./FadeIn";

const steps = [
  {
    number: "1",
    title: "Application & Interview",
    description:
      "Every teacher completes a detailed application and a live video interview with our team before being considered.",
  },
  {
    number: "2",
    title: "Credential Verification",
    description:
      "We review certifications, licences, and training documents. Only qualified, experienced practitioners make it through.",
  },
  {
    number: "3",
    title: "Ongoing Monitoring",
    description:
      "Ratings, member feedback, and session completion rates are tracked continuously — and we act if standards slip.",
  },
];

export default function TeacherVetting() {
  return (
    <section className="bg-warm-sand">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <FadeIn>
          <h2 className="font-display font-normal text-deep-sage text-[1.8rem] md:text-[2.75rem] lg:text-[3.2rem] leading-[1.12] mb-14 md:mb-16 text-center max-w-[580px] mx-auto text-balance">
            Vetted teachers you can trust
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 80}>
              <div className="bg-white rounded-[20px] p-8 md:p-9 h-full shadow-[0_2px_16px_rgba(0,0,0,0.05)]">
                <div className="w-8 h-8 rounded-full bg-deep-sage text-white text-[0.85rem] font-sans font-semibold inline-flex items-center justify-center mb-5">
                  {step.number}
                </div>
                <h3 className="font-display font-normal text-deep-sage text-[1.2rem] md:text-[1.35rem] leading-[1.2] mb-3">
                  {step.title}
                </h3>
                <p className="font-sans text-[0.92rem] text-neutral-600 leading-[1.65]">
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
