import SectionTitle from "./ui/SectionTitle";

type Card = {
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
  image?: { src: string; alt: string };
  illustration?: (id: string) => React.ReactNode;
};

const cards: Card[] = [
  {
    title: "Learn to self-regulate",
    description:
      "Our certified coaches teach you breathwork, meditation, yoga, and more — practical skills to calm your nervous system and find peace from within.",
    image: {
      src: "/feel_calmer.jpeg",
      alt: "A woman sitting peacefully on a couch with her eyes closed",
    },
  },
  {
    title: "Guided natural healing",
    description:
      "Through somatic therapy, reiki, and other natural methods, our coaches guide you to release what's held in the body.",
    image: {
      src: "/somatic_healing.jpeg",
      alt: "A woman lying on a mat in a peaceful room with hands on her abdomen, practicing somatic relaxation",
    },
  },
  {
    title: "Human support",
    description:
      "Live 1-on-1 sessions and 24/7 messaging support with your teacher.",
    image: {
      src: "/human_support.jpeg",
      alt: "A woman on a video call with her coach from a cozy home office",
    },
  },
];

export default function WhyLifeskills() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28">
        <div className="mb-12 md:mb-16">
          <SectionTitle>We&rsquo;re here to help you find peace</SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {cards.map((card, i) => {
            const id = `why-illus-${i}`;
            return (
              <article
                key={card.title}
                className="bg-warm-sand rounded-2xl overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {card.image ? (
                    <img
                      src={card.image.src}
                      alt={card.image.alt}
                      className="w-full h-full object-cover object-right block"
                    />
                  ) : (
                    <svg
                      viewBox="0 0 200 160"
                      className="w-full h-full block"
                      preserveAspectRatio="xMidYMax slice"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={card.gradientFrom} />
                          <stop offset="100%" stopColor={card.gradientTo} />
                        </linearGradient>
                        <radialGradient id={`${id}-glow`} cx="50%" cy="45%" r="65%">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </radialGradient>
                      </defs>
                      <rect width="200" height="160" fill={`url(#${id})`} />
                      <rect width="200" height="160" fill={`url(#${id}-glow)`} />
                      {card.illustration?.(id)}
                    </svg>
                  )}
                </div>
                <div className="p-7 md:p-8">
                  <h3 className="font-sans font-bold text-[1.15rem] text-neutral-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="font-sans text-[0.95rem] text-neutral-700 leading-[1.55]">
                    {card.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
