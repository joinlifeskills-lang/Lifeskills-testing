import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-warm-sand min-h-[calc(100vh-80px)] flex items-center">
          <div className="max-w-2xl mx-auto px-5 md:px-8 py-28 text-center">
            <p className="font-sans text-[0.72rem] font-bold tracking-[0.12em] uppercase text-deep-sage/50 mb-5">
              404
            </p>
            <h1 className="font-display font-normal text-deep-sage text-[2.2rem] md:text-[3.2rem] leading-[1.12] mb-5 text-balance">
              This page doesn&apos;t exist
            </h1>
            <p className="font-sans text-[0.95rem] md:text-[1.05rem] text-neutral-600 leading-[1.7] mb-10">
              The page you&apos;re looking for may have moved or never existed.
              Let&apos;s get you back on track.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button href="/" variant="primary">Go Home</Button>
              <Button href="/find-a-teacher" variant="secondary">Find a Teacher</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
