import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import WhyGovLens from "@/components/WhyGovLens";
import PilotCTA from "@/components/PilotCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProofStrip />
        <ScrollReveal>
          <Problem />
          <HowItWorks />
          <Features />
          <WhyGovLens />
        </ScrollReveal>
        <PilotCTA />
        <ScrollReveal>
          <FAQ />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
