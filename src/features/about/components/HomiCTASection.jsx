"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HomiCTASection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white py-16 md:py-20 lg:py-24"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.6) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating Teal Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: ["-50%", "-48%", "-52%", "-50%"],
          y: ["-50%", "-52%", "-48%", "-50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Secondary Glow */}
      <motion.div
        className="absolute top-1/3 right-1/4 pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-[250px] h-[250px] rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 60%)",
          }}
        />
      </motion.div>

      {/* Floating Geometric Elements */}
      <motion.div
        className="absolute top-[12%] left-[8%] pointer-events-none"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="opacity-25"
        >
          <rect
            x="2"
            y="2"
            width="44"
            height="44"
            rx="6"
            stroke="#14B8A6"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[15%] right-[10%] pointer-events-none"
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="opacity-20"
        >
          <circle cx="20" cy="20" r="18" stroke="#14B8A6" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[20%] right-[6%] pointer-events-none"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="80"
          height="3"
          viewBox="0 0 80 3"
          fill="none"
          className="opacity-20"
        >
          <line
            x1="0"
            y1="1.5"
            x2="80"
            y2="1.5"
            stroke="#14B8A6"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-[25%] left-[12%] pointer-events-none"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="3"
          height="60"
          viewBox="0 0 3 60"
          fill="none"
          className="opacity-20"
        >
          <line
            x1="1.5"
            y1="0"
            x2="1.5"
            y2="60"
            stroke="#14B8A6"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-[32px] bg-[#0F172A] p-8 md:p-14 lg:p-16 shadow-[0_25px_80px_rgba(0,0,0,0.12)]"
        >
          {/* Card Inner Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center top, rgba(20, 184, 166, 0.1) 0%, transparent 60%)",
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Small Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#14B8A6]"
            >
              Ready to Build
            </motion.span>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-5 text-3xl font-semibold leading-snug tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Start Your Construction Journey
              <br />
              With <span className="text-[#14B8A6]">Confidence.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mb-10 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
            >
              HOMI helps homeowners, engineers, and contractors estimate costs,
              calculate materials, and plan every construction phase before
              building begins.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-4 sm:flex-row sm:gap-5"
            >
              {/* Primary Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-full bg-[#14B8A6] px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#0D9488] hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] mt-3"
                onClick={() => navigate("/Pricing")}
              >
                Start Planning
              </motion.button>

              {/* Secondary Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-full border border-slate-600 bg-transparent px-10 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-[#14B8A6] hover:text-[#14B8A6] mt-3"
                onClick={() => navigate("/Contact")}
              >
                <span className="relative z-10">Contact Us</span>
                <div
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.1), transparent)",
                  }}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
