"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const cards = [
  {
    title: "The Vision",
    description:
      "Every remarkable home begins with a vision. We listen to your ideas, understand your lifestyle, and transform your dream into an architectural concept.",
    color: "#FFFFFF",
    image: "/about/story_1.jpg",
  },
  {
    title: "Blueprint & Planning",
    description:
      "Our architects create precise plans and technical drawings to ensure every detail is thoughtfully designed before construction begins.",
    color: "#F0F9F8",
    image: "/about/story_2.jpg",
  },
  {
    title: "3D Visualization",
    description:
      "We transform architectural drawings into realistic 3D visualizations, allowing you to experience your future home before it is built.",
    color: "#DDF0EE",
    image: "/about/story_3.jpg",
  },
  {
    title: "Construction",
    description:
      "Every phase is supervised with precision, ensuring quality craftsmanship from the foundation to the final finishing touches.",
    color: "#C3E8E3",
    image: "/about/story_4.jpg",
  },
  {
    title: "Your Dream Home",
    description:
      "The journey ends with a timeless home designed to inspire comfort, elegance, and unforgettable everyday living.",
    color: "#A8DDD6",
    image: "/about/story_5.jpg",
  },
];

function Card({
  i,
  title,
  description,
  image,
  color,
  progress,
  range,
  targetScale,
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center px-4 md:px-8">
      <motion.div
        style={{
          scale,
          backgroundColor: color,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative flex w-[92%] max-w-[1200px] flex-col rounded-[30px] p-6 md:p-10 lg:h-[600px] lg:flex-row lg:p-12 shadow-[0_25px_80px_rgba(0,0,0,.12)] origin-top"
      >
        {/* Text */}
        <div className="flex h-full w-full lg:w-2/5 flex-col justify-center">
          <span className="text-s uppercase tracking-[0.45em] text-cyan-800 mb-5">
            Step {String(i + 1).padStart(2, "0")}
          </span>

          <h2 className="mt-5 text-3xl font-bold text-slate-900 lg:text-4xl !text-[#0F172A]">
            {title}
          </h2>

          <div className="mt-5 h-[2px] w-20 bg-[#14B8A6]" />

          <p className="mt-8 text-base leading-8 text-neutral-700">
            {description}
          </p>
        </div>

        {/* Image */}
        <div className="mt-8 w-full lg:mt-0 lg:ml-12 lg:w-[58%] ">
          <div className="h-[260px] overflow-hidden rounded-[24px] md:h-[380px] lg:h-full ">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCardsParallax() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // ✅ قللنا الـ padding العلوي والسفلي (كان pt-20/28 و pb-16/20/24)
    // عشان السكشن يبقى قريب من اللي فوقه وتحته، مش سايب فراغ كبير
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative bg-white pb-20 sm:pb-24 lg:pb-32 mb-12 sm:mb-16 lg:mb-20"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-4xl px-4 pb-8 pt-8 text-center sm:pt-10">
        <div className="mb-5 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-teal-500/40" />

          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-500">
            HOW IT WORKS
          </span>

          <div className="h-px w-16 bg-teal-500/40" />
        </div>

        <h2
          className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          style={{ color: "#1E293B" }}
        >
          Your Journey
          <br />
          <span
            style={{
              color: "#14B8A6",
              display: "block",
              marginTop: "1rem",
            }}
          >
            From Idea to Reality.
          </span>
        </h2>
      </div>

      {/* Cards */}
      <div
        className="pt-12 sm:pt-16 lg:pt-20"
        style={{
          height: `${cards.length * 100}vh`,
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={card.title}
            {...card}
            i={i}
            progress={scrollYProgress}
            range={[i / cards.length, 1]}
            targetScale={1 - (cards.length - i) * 0.05}
          />
        ))}
      </div>
    </section>
  );
}
