import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HomiAboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Background Glow */}
      <div
        className="absolute -top-[200px] -right-[150px] w-[500px] h-[500px] rounded-full pointer-events-none blur-[20px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2
              className="mb-6 font-black leading-none text-black"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                color: "#111827",
              }}
            >
              Where Vision
              <br />
              Meets Construction
            </h2>

            <p
              className="text-gray-600 leading-[1.9] mb-8 max-w-[530px]"
              style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
            >
              HOMI simplifies the journey from an idea to a construction-ready
              plan. Our platform helps homeowners, architects, and contractors
              estimate materials, explore building solutions, and make informed
              decisions with confidence.
            </p>

            {/* Quote */}
            <motion.div
              className="border-l-4 border-teal-500 pl-6 pb-8 pt-4 mt-8 "
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
            >
              <p
                className="text-gray-800 italic font-medium leading-[1.6]"
                style={{ fontSize: "clamp(0.85rem, 1.3vw, 1rem)" }}
              >
                "Every successful building starts with accurate planning. HOMI
                transforms complex construction calculations into clear
                decisions you can trust."
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            <div className="relative rounded-[30px] overflow-hidden shadow-[0_40px_90px_rgba(15,23,42,0.15)]">
              <motion.img
                src="/about/about-1.jpg"
                alt="Modern architectural project"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                className="w-full h-auto object-cover block"
                style={{ aspectRatio: "4 / 3" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
