import Hero from "@/features/Home/components/Hero/Hero";

import AboutSection from "../features/home/components/AboutSection";
import ServicesSection from "../features/home/components/ServicesSection";
import StackingCardsParallax from "@/features/about/components/pixel-perfect/stacking-cards-parallax";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <StackingCardsParallax />
    </>
  );
}
