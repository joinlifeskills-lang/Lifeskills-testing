import Button from "./ui/Button";

export default function Pricing() {
  return (
    <section className="bg-white relative z-30">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20 flex flex-col items-center gap-7 text-center">
        <p className="font-display font-normal text-deep-sage text-[1.4rem] sm:text-[1.75rem] md:text-[2.25rem] leading-[1.35]">
          Affordable pricing, starting from{" "}
          <span className="text-bright-amber">$60</span>
          <span className="text-deep-sage"> per session</span>
        </p>
        <Button href="/find-a-teacher" variant="secondary">
          Book a Free Intro Call
        </Button>
      </div>
    </section>
  );
}
