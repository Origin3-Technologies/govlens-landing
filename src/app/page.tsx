import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PilotCTA from "@/components/PilotCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <HowItWorks />
          <Features />
        </ScrollReveal>
        <PilotCTA />
      </main>
      <Footer />
    </>
  );
}
