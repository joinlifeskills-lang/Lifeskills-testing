import Button from "./ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-warm-sand">

      {/* Sage organic bloom — top left */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at -5% 10%, rgba(45,74,62,0.22) 0%, rgba(45,74,62,0.10) 35%, transparent 62%)" }}
      />

      {/* Amber warmth wash — bottom right */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 105% 95%, rgba(240,165,0,0.20) 0%, rgba(232,96,58,0.10) 35%, transparent 60%)" }}
      />

      {/* Teal accent — top right, subtle */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"
        style={{ background: "radial-gradient(ellipse at 108% 5%, rgba(11,168,154,0.14) 0%, transparent 45%)" }}
      />

      {/* Central orb — desktop */}
      <div className="pointer-events-none absolute inset-0 hidden md:flex items-center justify-center" aria-hidden="true">
        <div className="relative w-[min(176vw,1280px)] aspect-square" style={{ transform: "translateY(-100px)" }}>
          {/* Wide sage halo */}
          <div className="absolute inset-0 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(45,74,62,0.16) 0%, rgba(11,168,154,0.10) 45%, transparent 72%)" }}
          />
          {/* Warm amber mid-glow */}
          <div className="absolute inset-[20%] rounded-full blur-[70px]"
            style={{ background: "radial-gradient(circle, rgba(240,165,0,0.28) 0%, rgba(232,96,58,0.14) 48%, transparent 78%)" }}
          />
          {/* Luminous warm core */}
          <div className="absolute inset-[38%] rounded-full blur-[40px]"
            style={{ background: "radial-gradient(circle, rgba(255,245,210,0.90) 0%, rgba(240,165,0,0.45) 50%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* Central orb — mobile */}
      <div className="pointer-events-none absolute inset-0 flex md:hidden items-center justify-center" aria-hidden="true">
        <div className="relative w-[2760vw] aspect-square" style={{ transform: "translateY(-60px)" }}>
          {/* Wide sage halo */}
          <div className="absolute inset-0 rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(45,74,62,0.16) 0%, rgba(11,168,154,0.10) 45%, transparent 72%)" }}
          />
          {/* Warm amber mid-glow */}
          <div className="absolute inset-[20%] rounded-full blur-[70px]"
            style={{ background: "radial-gradient(circle, rgba(240,165,0,0.68) 0%, rgba(232,96,58,0.40) 48%, transparent 78%)" }}
          />
          {/* Luminous warm core */}
          <div className="absolute inset-[38%] rounded-full blur-[40px]"
            style={{ background: "radial-gradient(circle, rgba(255,253,220,1.0) 0%, rgba(255,230,80,0.85) 35%, rgba(240,165,0,0.75) 65%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* Seamless fade into bg-white next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 z-10"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #ffffff 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-20 md:pt-32 pb-24 md:pb-40">
        <div className="max-w-[900px] mx-auto text-center">
          <h1 className="font-display font-normal text-deep-sage text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1.14] md:leading-[1.1] mb-5 md:mb-7 text-balance">
            <span className="block">Peace of mind is a skill.</span>
            <span className="block italic text-deep-sage">
              We teach it.
            </span>
          </h1>
          <p className="font-sans text-[0.98rem] sm:text-[1.05rem] md:text-[1.2rem] text-neutral-700 leading-[1.55] mb-7 md:mb-10 max-w-[560px] mx-auto px-2">
            <span className="block">Live 1-on-1 online sessions with certified</span>
            <span className="block">mind-body coaches.</span>
          </p>
          <div className="flex justify-center">
            <Button
              href="/find-a-teacher"
              variant="nav"
              className="md:text-[1rem] md:px-9 md:py-[14px]"
            >
              Book a Free Intro Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
