"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CtaSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const content = contentRef.current;
      if (!section || !container || !content) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(container, {
        y: 50,
        opacity: 0,
        scale: 0.98,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        content.children,
        {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5",
      );

      // Floating shapes - more subtle
      gsap.to(".cta-shape", {
        y: -8,
        rotation: 2,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 1.5,
          from: "random",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg, #0F172A 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Gradient Orbs - smaller */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/4 h-56 w-56 rounded-full opacity-15 blur-[80px] sm:h-64 sm:w-64"
        style={{
          background: "radial-gradient(circle, #14B8A6, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full opacity-10 blur-[100px] sm:h-80 sm:w-80"
        style={{
          background: "radial-gradient(circle, #0EA5E9, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Main Dark Container - smaller padding */}
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-3xl bg-[#0F172A] px-6 py-12 shadow-2xl sm:px-10 sm:py-16 lg:px-16 lg:py-20"
          style={{
            boxShadow:
              "0 20px 60px -15px rgba(15, 23, 42, 0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
          }}
        >
          {/* Decorative Floating Geometric Shapes - smaller and more subtle */}
          <div className="cta-shape pointer-events-none absolute -top-4 -right-4 h-20 w-20 rotate-12 rounded-xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm sm:h-28 sm:w-28 sm:rounded-2xl" />
          <div className="cta-shape pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 -rotate-6 rounded-lg border border-[#14B8A6]/[0.06] bg-[#14B8A6]/[0.02] backdrop-blur-sm sm:h-24 sm:w-24 sm:rounded-xl" />
          <div className="cta-shape pointer-events-none absolute top-1/3 right-6 hidden h-14 w-14 -translate-y-1/2 rotate-45 rounded-lg border border-white/[0.04] bg-white/[0.015] backdrop-blur-sm lg:block" />
          <div className="cta-shape pointer-events-none absolute bottom-1/4 left-1/4 hidden h-10 w-10 rotate-12 rounded-md border border-[#14B8A6]/[0.05] bg-[#14B8A6]/[0.015] backdrop-blur-sm lg:block" />

          {/* Inner Gradient Glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(20,184,166,0.06) 0%, transparent 55%), radial-gradient(ellipse at 70% 80%, rgba(14,165,233,0.04) 0%, transparent 55%)",
            }}
          />

          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-10 mx-auto max-w-2xl text-center"
          >
            {/* Label */}
            <span className="mb-5 inline-block rounded-full border border-[#14B8A6]/15 bg-[#14B8A6]/[0.08] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#14B8A6] sm:mb-6 sm:px-5 sm:py-2 sm:text-xs">
              Ready to Build
            </span>

            {/* Heading - smaller */}
            <h2
              className="mb-5 text-2xl font-semibold leading-tight tracking-tight text-white sm:mb-6 sm:text-3xl lg:text-4xl"
              style={{
                fontFamily: "var(--font-heading), Montserrat, sans-serif",
              }}
            >
              Build Your Dream Home{" "}
              <span className="text-[#14B8A6]">With Confidence.</span>
            </h2>

            {/* Description - tighter */}
            <p
              className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-slate-400 sm:mb-10 sm:text-base"
              style={{ fontFamily: "var(--font-body), Manrope, sans-serif" }}
            >
              Explore premium house plans, estimate your construction cost,
              customize your future home, and manage your project from one
              intelligent platform.
            </p>

            {/* Buttons - smaller padding */}
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              {/* Primary Button */}
              <Link
                to="/plans"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#14B8A6] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] hover:brightness-110 sm:px-8 sm:py-4"
              >
                <span className="relative z-10">Explore House Plans</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                />
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/cost-calculator"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-[#14B8A6]/25 hover:bg-white/[0.08] hover:text-[#14B8A6] sm:px-8 sm:py-4"
              >
                <Calculator size={16} />
                Estimate Cost
              </Link>
            </div>
          </div>

          {/* Bottom Decorative Line */}
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#14B8A6]/20 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
