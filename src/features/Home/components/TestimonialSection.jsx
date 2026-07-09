// src/components/TestimonialSection.jsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  {
    value: 10,
    suffix: "+",
    label: "years",
    description: "We have been working with clients since 2014",
  },
  {
    value: 500,
    suffix: "+",
    label: "projects",
    description: "Successfully delivered on time and on budget",
  },
  {
    value: 98,
    suffix: "%",
    label: "satisfaction",
    description: "Clients would hire us again — most already have",
  },
];

const TestimonialSection = ({
  quote = "I built my team around one rule — don't leave until the client is happy. Every person on my crew takes your project personally, not just professionally.",
  authorName = "Robert Williams",
  authorTitle = "CEO of Homi",
  authorImage = "/images/ceo.jpg",
  topImage = "/images/work-1.jpg",
  bottomImage = "/images/work-2.jpg",
  backgroundColor = "#f8f9fa",
}) => {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const quoteRef = useRef(null);
  const imagesRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // Animate images
      gsap.from(imagesRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate quote
      gsap.from(quoteRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Counter animation for stats
      const statElements = statsRef.current?.querySelectorAll(".stat-number");
      statElements?.forEach((el) => {
        const target = parseInt(el.dataset.value, 10);
        const suffix = el.dataset.suffix || "";

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: function () {
              el.innerText = Math.round(this.targets()[0].innerText) + suffix;
            },
          },
        );
      });

      // Animate stat labels
      gsap.from(statsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full" style={{ backgroundColor }}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        {/* Top: Images + Quote */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Images Column */}
          <div ref={imagesRef} className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={topImage}
                alt="Team at work"
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={bottomImage}
                alt="Team collaboration"
                className="h-48 w-full object-cover sm:h-56"
              />
            </div>
          </div>

          {/* Quote Column */}
          <div ref={quoteRef} className="flex flex-col justify-center">
            <blockquote>
              <p
                className="text-2xl font-medium leading-relaxed text-[var(--paragraph)] sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                "{quote}"
              </p>
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src={authorImage}
                  alt={authorName}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p
                  className="text-sm font-semibold text-[var(--heading)]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {authorName}
                </p>
                <p
                  className="text-sm text-[var(--paragraph)]"
                  style={{ fontFamily: "Manrope, sans-serif" }}
                >
                  {authorTitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Stats */}
        <div
          ref={statsRef}
          className="mt-16 grid grid-cols-1 gap-8 border-t border-[var(--border)] pt-16 sm:grid-cols-3 sm:gap-12 lg:mt-24 lg:pt-24"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="stat-number text-4xl font-bold text-[var(--brand-primary)] sm:text-5xl lg:text-6xl"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                  data-value={stat.value}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
              </div>
              <p
                className="mt-5 text-lg font-semibold leading-snug text-[var(--heading)]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {stat.label}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed text-[var(--paragraph)]"
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;