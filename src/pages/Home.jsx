import HeroSection from "../features/Home/components/HeroSection";
import HowItWorksSection from "../features/home/components/HowItWorksSection";
import AboutSection from "../features/home/components/AboutSection";
import ServicesSection from "../features/home/components/ServicesSection";
import FooterSection from "../features/home/components/FooterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <FooterSection />
    </>
  );
}

