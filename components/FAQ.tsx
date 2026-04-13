import SectionTitle from "./ui/SectionTitle";

const faqs = [
  {
    q: "What is LifeSkills?",
    a: "LifeSkills is a live coaching platform where you learn mind-body practices like breathwork, meditation, and yoga with an experienced teacher, one-on-one. We teach you the skill of self-regulation so you can create lasting peace of mind on your own.",
  },
  {
    q: "How is this different from therapy or meditation apps?",
    a: "Therapy often focuses on talking through problems. Apps give you pre-recorded content. LifeSkills gives you a real teacher who works with you live to build practical skills you carry with you for life. It's not about coping — it's about learning to operate your own mind and body.",
  },
  {
    q: "How does a live session work?",
    a: "You meet your teacher over video for a live, one-on-one session. They'll talk with you about where you are, then guide you through a practice tailored to your needs. You leave every session with something you can use on your own.",
  },
  {
    q: "Who are the professionals? Are they certified?",
    a: "Our teachers are certified practitioners in breathwork, meditation, yoga, and other mind-body disciplines. Every teacher is vetted for experience, credentials, and their ability to connect and teach effectively.",
  },
  {
    q: "Do I need any prior experience?",
    a: "None. Our teachers work with complete beginners and experienced practitioners alike. Every session meets you exactly where you are.",
  },
  {
    q: "Can I try it before committing?",
    a: "Yes. Book a free intro call with any teacher to see if it's the right fit. No pressure, no commitment.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-warm-sand">
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <SectionTitle>Frequently asked questions</SectionTitle>
        </div>
        <div className="flex flex-col">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group border-b border-black/10 py-5 md:py-6"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none font-sans font-semibold text-[1.02rem] md:text-[1.08rem] text-neutral-900 marker:hidden">
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 rounded-full border border-deep-sage flex items-center justify-center transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10">
                    <path
                      d="M5 0v10 M0 5h10"
                      stroke="#2D4A3E"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 font-sans text-[0.95rem] text-neutral-700 leading-[1.6] max-w-[720px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
