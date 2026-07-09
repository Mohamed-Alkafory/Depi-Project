"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3c.5 0 1 .2 1.4.6l7 7c.4.4.6.9.6 1.4s-.2 1-.6 1.4l-7 7c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6l-7-7C3.2 15 3 14.5 3 14s.2-1 .6-1.4l7-7C11 3.2 11.5 3 12 3z" />
        <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
      </svg>
    ),
    title: "AI Home Design",
    description: "Design Your Dream Home",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
        <path d="M12 12v6" />
      </svg>
    ),
    title: "Floor Plan to 3D",
    description: "Bring Your Floor Plan to Life",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Construction Cost Estimator",
    description: "Estimate Your Building Cost",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M8 7h8M8 11h6" />
      </svg>
    ),
    title: "Home Plan Library",
    description: "Browse Ready House Plans",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="2" />
        <path d="M19.1 4.9l-2.8 2.8M4.9 19.1l2.8-2.8M19.1 19.1l-2.8-2.8M4.9 4.9l2.8 2.8" />
      </svg>
    ),
    title: "Customize Your Design",
    description: "Tailor Every Detail",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    title: "End-to-End Guidance",
    description: "Build with Confidence",
  },
];

const BeforeAfterSection = ({
  image,
  imageB,
  title = "From 2D Plans to Stunning 3D Reality",
  description = "Our AI analyzes every detail of your floor plan and turns it into a realistic, beautifully furnished space in seconds.",
  labelBefore = "BEFORE",
  labelAfter = "AFTER",
  badge = "AI Transforms Your Ideas",
}) => {
  const containerRef = useRef(null);
  const [split, setSplit] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const percentage = (x / rect.width) * 100;
    setSplit(percentage);
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);

  const onMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    let start = 30;
    let end = 70;
    let current = start;
    let direction = 1;
    let raf;

    const animate = () => {
      if (isDragging) {
        raf = requestAnimationFrame(animate);
        return;
      }
      current += direction * 0.3;
      if (current >= end) direction = -1;
      if (current <= start) direction = 1;
      setSplit(current);
      raf = requestAnimationFrame(animate);
    };

    const timer = setTimeout(() => {
      animate();
    }, 1000);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [isDragging]);

  return (
    <section
      id="services"
      className="relative w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ✅ Header — زي الصورة (خطين + badge في النص) */}
        <div className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#008080]"
          >
            <span className="inline-block h-px w-12 bg-[#008080]/40" />
            {badge}
            <span className="inline-block h-px w-12 bg-[#008080]/40" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="max-w-4xl text-3xl font-bold leading-[1.15] tracking-tight text-[#008080] sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-heading), Montserrat, sans-serif",
            }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="mt-4 max-w-2xl text-base leading-relaxed text-[#6c757d] sm:text-lg"
            style={{ fontFamily: "var(--font-body), Manrope, sans-serif" }}
          >
            {description}
          </motion.p>
        </div>

        {/* Before/After Container */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          ref={containerRef}
          className="relative mx-auto w-full cursor-ew-resize select-none overflow-hidden rounded-2xl bg-[#f5f5f5] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          style={{ aspectRatio: "16 / 9", maxHeight: "600px" }}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
        >
          <img
            src={imageB}
            alt="After"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          <div
            className="absolute inset-0 h-full overflow-hidden"
            style={{ width: `${split}%` }}
          >
            <img
              src={image}
              alt="Before"
              className="h-full w-full object-cover"
              style={{ width: `${100 / (split / 100)}%`, maxWidth: "none" }}
              draggable={false}
            />
          </div>

          <div
            className="absolute top-0 bottom-0 z-10 w-[3px] cursor-ew-resize"
            style={{
              left: `${split}%`,
              transform: "translateX(-50%)",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 0 12px rgba(0,0,0,0.2)",
            }}
            onMouseDown={onMouseDown}
            onTouchStart={onMouseDown}
          >
            <div
              className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg sm:h-14 sm:w-14"
              style={{
                background: "white",
                border: "2px solid rgba(0,128,128,0.2)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="text-[#008080]"
              >
                <path
                  d="M6 3L2 9L6 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3L16 9L12 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 z-10">
            <span className="inline-block rounded-full border border-white/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#008080] shadow-lg backdrop-blur-sm sm:text-sm">
              {labelBefore}
            </span>
          </div>
          <div className="absolute bottom-6 right-6 z-10">
            <span className="inline-block rounded-full border border-white/20 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#008080] shadow-lg backdrop-blur-sm sm:text-sm">
              {labelAfter}
            </span>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-12 sm:mt-16"
        >
          <div className="relative">
            <div className="absolute top-7 left-[4%] right-[4%] hidden h-[2px] bg-[#e0f0f0] lg:block" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.25 + i * 0.08,
                  }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#008080] sm:h-16 sm:w-16"
                    style={{
                      border: "2px solid #e0f0f0",
                      boxShadow: "0 2px 12px rgba(0,128,128,0.08)",
                    }}
                  >
                    {step.icon}
                  </div>
                  <h4
                    className="mt-3 text-xs font-semibold text-[#008080] sm:text-sm"
                    style={{
                      fontFamily: "var(--font-heading), Montserrat, sans-serif",
                    }}
                  >
                    {step.title}
                  </h4>
                  <p
                    className="mt-1 text-[10px] leading-tight text-[#6c757d] sm:text-xs"
                    style={{
                      fontFamily: "var(--font-body), Manrope, sans-serif",
                    }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
