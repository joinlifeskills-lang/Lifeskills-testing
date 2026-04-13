import Button from "./ui/Button";

export default function CtaBanner() {
  return (
    <section className="bg-energy-gradient rounded-t-[32px] md:rounded-t-[48px] -mt-6 md:-mt-10 relative z-[60]">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 flex flex-col items-center text-center gap-7">
        <h2 className="font-display font-normal text-white text-[2rem] md:text-[2.75rem] leading-[1.15] max-w-[720px]">
          Peace of mind starts here
        </h2>
        <Button href="/find-a-teacher" variant="white">
          Find a teacher
        </Button>
      </div>
    </section>
  );
}
