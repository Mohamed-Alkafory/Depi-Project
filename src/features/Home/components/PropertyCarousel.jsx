// src/components/PropertyCarousel.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import img6 from "/src/assets/images/homes/Picture_6.avif";
import img7 from "/src/assets/images/homes/Picture_7.avif";
import img8 from "/src/assets/images/homes/Picture_8.avif";
import img9 from "/src/assets/images/homes/Picture_9.avif";

gsap.registerPlugin(useGSAP);

const PropertyCarousel = ({
  properties = [],
  cardWidth = 420,
  cardHeight = 340,
  gap = 24,
  speed = 60,
  mask = true,
  backgroundColor = "#0a0a0a",
  sectionPadding = "80px 0",
}) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: cardWidth, height: cardHeight });

  const items = properties.length > 0 ? properties : [
    {
      id: 1,
      number: "01",
      title: "Modest-Sized Three-Bed Farmhouse Plan",
      description: "Spacious design with natural light and open living spaces.",
      image: img6,
      accentColor: "#D4A853",
    },
    {
      id: 2,
      number: "02",
      title: "Luxury Retreat",
      description: "Timeless architecture with premium finishes and elegant details.",
      image: img7,
      accentColor: "#E85D75",
    },
    {
      id: 3,
      number: "03",
      title: "Minimal House",
      description: "Clean lines and simple forms for a peaceful lifestyle.",
      image: img8,
      accentColor: "#2DD4BF",
    },
    {
      id: 4,
      number: "04",
      title: "Farm House",
      description: "Warm and welcoming spaces made for family living.",
      image: img9,
      accentColor: "#818CF8",
    },
  ];

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setDimensions({ width: Math.min(cardWidth, 280), height: Math.min(cardHeight, 240) });
      else if (w < 1024) setDimensions({ width: Math.min(cardWidth, 360), height: Math.min(cardHeight, 290) });
      else setDimensions({ width: cardWidth, height: cardHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cardWidth, cardHeight]);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      const firstCard = track.children[0];
      const itemWidth = cardWidth + gap;
      const loopWidth = itemWidth * items.length;

      const wrapX = gsap.utils.wrap(-loopWidth, 0);
      const setX = gsap.quickSetter(track, "x", "px");
      let x = 0;

      let direction = 1;
      let boost = 0;

      const tick = (_time, deltaTime) => {
        boost *= 0.92;
        if (boost < 0.001) boost = 0;
        x -= direction * (1 + boost) * speed * (deltaTime / 1000);
        setX(wrapX(x));
      };
      gsap.ticker.add(tick);

      const onWheel = (e) => {
        e.preventDefault();
        if (e.deltaY !== 0) direction = e.deltaY > 0 ? 1 : -1;
        boost = gsap.utils.clamp(0, 40, boost + Math.abs(e.deltaY) * 0.02);
      };
      container.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        gsap.ticker.remove(tick);
        container.removeEventListener("wheel", onWheel);
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      id="plans"
      className="w-full px-4 sm:px-0"
      style={{
        backgroundColor,
        padding: sectionPadding,
      }}
    >
      <div
        ref={containerRef}
        className="w-full select-none overflow-hidden"
        style={
          mask
            ? {
                maskImage:
                  "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
              }
            : undefined
        }
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {[...items, ...items].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="group relative shrink-0 overflow-hidden rounded-3xl"
              style={{
                width: dimensions.width,
                height: dimensions.height,
                marginRight: gap,
              }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                draggable={false}
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    transparent 0%,
                    transparent 30%,
                    rgba(0,0,0,0.5) 55%,
                    rgba(0,0,0,0.9) 100%
                  )`,
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <span
                  className="mb-3 block h-1 w-10 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
                {/* Title */}
                <h3
                  className="text-xl font-bold leading-tight text-white sm:text-2xl"
                  style={{ fontFamily: "var(--first-font)" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className="mt-2 max-w-xs text-sm leading-relaxed text-white/60"
                  style={{ fontFamily: "var(--second-font)" }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyCarousel;