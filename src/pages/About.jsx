import { HomiTeamSection } from "@/features/about";
import AboutIntro from "@/features/about/components/AboutIntro";
import HomiAboutSection from "@/features/about/components/HomiAboutSection";
import HomiCTASection from "@/features/about/components/HomiCTASection";
import IntroSection from "@/features/about/components/IntroSection";
import StackingCardsParallax from "@/features/about/components/pixel-perfect/stacking-cards-parallax";
import WhyChooseHOMI from "@/features/about/components/WhyChooseHOMI";

export const About = () => {
  return (
    <>
      <AboutIntro />
      <HomiAboutSection />
      <WhyChooseHOMI />
      {/* <StackingCardsParallax /> */}
      <IntroSection />
      <HomiTeamSection />
      <HomiCTASection />
    </>
  );
};
