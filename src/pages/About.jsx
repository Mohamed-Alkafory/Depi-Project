import { HomiTeamSection } from "@/features/about";
import AboutIntro from "@/features/about/components/AboutIntro";
import HomiAboutSection from "@/features/about/components/HomiAboutSection";
import HomiBlueprintSection from "@/features/about/components/HomiBlueprintSection";
import HomiStatsBar from "@/features/about/components/HomiStatsBar";
import IntroSection from "@/features/about/components/IntroSection";

export const About = () => {
  return (
    <>
      <AboutIntro />
      <HomiStatsBar />
      <HomiAboutSection />
      <HomiBlueprintSection />
      <div className="min-h-screen bg-[#0F0F0F]">
        <IntroSection />
        <HomiTeamSection />
      </div>
    </>
  );
};
