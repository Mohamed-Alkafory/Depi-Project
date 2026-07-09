import { motion } from "framer-motion";
import Hero from "@/features/Home/components/Hero/Hero";
import BeforeAfterSection from "@/features/Home/components/BeforeAfterSection";
import StackingCardsParallax from "@/features/about/components/pixel-perfect/stacking-cards-parallax";
import TestimonialSection from "@/features/Home/components/TestimonialSection";
import PropertyCarousel from "@/features/Home/components/PropertyCarousel";
import planImg from "/src/assets/images/plans/1.png";
import homeImg from "/src/assets/images/homes/Picture_1.avif";

const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TestimonialSection
        quote="We believe every home tells a story. Our mission is to help you write yours with spaces that inspire and comfort."
        authorName="Sarah Mitchell"
        authorTitle="Founder & Lead Architect"
        authorImage="/src/assets/images/homes/Picture_2.avif"
        topImage="/src/assets/images/homes/Picture_3.avif"
        bottomImage="/src/assets/images/homes/Picture_4.avif"
        backgroundColor="#f6f8fa"
      />
      
      <BeforeAfterSection
        image={planImg}
        imageB={homeImg}
        badge="FROM VISION TO REALITY"
        title="Build Your Dream Home with Confidence"
        description="Design, visualize, and plan every detail of your future home from the first sketch to construction."
      />
      <motion.div {...fadeUp}>
        <PropertyCarousel
          backgroundColor="#ffffff"
          sectionPadding="100px 0"
        />
      </motion.div>
      <StackingCardsParallax />
    </>
  );
}
