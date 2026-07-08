import Hero from "@/features/Home/components/Hero/Hero";
import HowItWorksSection from "../features/home/components/HowItWorksSection";
import AboutSection from "../features/home/components/AboutSection";
import ServicesSection from "../features/home/components/ServicesSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
    </>
  );
}
