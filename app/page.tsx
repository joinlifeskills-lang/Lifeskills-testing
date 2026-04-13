import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyLifeskills from "@/components/WhyLifeskills";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import Coaches from "@/components/Coaches";
import Testimonials from "@/components/Testimonials";
import WhatWeOffer from "@/components/WhatWeOffer";
import FAQ from "@/components/FAQ";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhyLifeskills />
        <HowItWorks />
        <Pricing />
        <Coaches />
        <WhatWeOffer />
        <Testimonials />
        <CtaBanner />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
