import SlNav from "@/components/schoollens/Nav";
import SlHero from "@/components/schoollens/Hero";
import SlProofStrip from "@/components/schoollens/ProofStrip";
import SlProblem from "@/components/schoollens/Problem";
import SlHowItWorks from "@/components/schoollens/HowItWorks";
import SlFeatures from "@/components/schoollens/Features";
import SlWhy from "@/components/schoollens/Why";
import SlPilotCTA from "@/components/schoollens/PilotCTA";
import SlFAQ from "@/components/schoollens/FAQ";
import SlFooter from "@/components/schoollens/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function SchoolLensPage() {
  return (
    <>
      <SlNav />
      <main>
        <SlHero />
        <SlProofStrip />
        <ScrollReveal>
          <SlProblem />
          <SlHowItWorks />
          <SlFeatures />
          <SlWhy />
        </ScrollReveal>
        <SlPilotCTA />
        <ScrollReveal>
          <SlFAQ />
        </ScrollReveal>
      </main>
      <SlFooter />
    </>
  );
}
