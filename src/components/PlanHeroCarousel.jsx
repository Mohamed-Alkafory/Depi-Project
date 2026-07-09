// src/components/PlanHeroCarousel.jsx
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STRIPS = 8;
const EASE = [0.65, 0, 0.35, 1];

const clip = (s) =>
  `inset(0 ${100 - (s + 1) * (100 / STRIPS)}% 0 ${s * (100 / STRIPS)}%)`;

const stripVariants = (s) => ({
  enter: (dir) => ({ clipPath: clip(s), y: dir > 0 ? "102%" : "-102%" }),
  center: {
    clipPath: clip(s),
    y: "0%",
    transition: { duration: 0.7, ease: EASE, delay: s * 0.055 },
  },
  exit: (dir) => ({
    clipPath: clip(s),
    y: dir > 0 ? "-102%" : "102%",
    transition: { duration: 0.7, ease: EASE, delay: s * 0.055 },
  }),
});

export default function PlanHeroCarousel({ slides = [] }) {
  const [[index, dir], setState] = useState([0, 1]);
  const navigate = useNavigate();

  const paginate = useCallback(
    (d) => {
      setState(([i]) => [(i + d + slides.length) % slides.length, d]);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => paginate(1), 4200);
    return () => clearInterval(id);
  }, [index, paginate, slides.length]);

  const slide = slides[index];

  if (!slide) return null;

  return (
    <div className="bg-gray-50 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-[35vh] min-h-[240px] w-full items-center justify-center overflow-hidden rounded-2xl bg-gray-200 sm:h-[40vh] sm:min-h-[300px] lg:h-[45vh]">
        {/* Image */}
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{ willChange: "transform" }}
            custom={dir}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {Array.from({ length: STRIPS }).map((_, s) => (
              <motion.div
                key={s}
                className="absolute inset-0"
                custom={dir}
                variants={stripVariants(s)}
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        {/* Content - Bottom Left */}
        <div className="absolute bottom-3 left-4 text-white sm:bottom-5 sm:left-6">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.6, ease: EASE, delay: 0.35 },
              }}
              exit={{ y: -14, opacity: 0, transition: { duration: 0.3 } }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/70">
                {slide.tag}
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                {slide.title}
              </h3>
              <p className="mt-1 text-base font-medium text-teal-400 sm:text-lg">
                {slide.price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Plan Button - Top Right */}
        {slide.link && (
          <div className="absolute right-4 top-3">
            <button
              onClick={() => navigate(slide.link)}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white rounded-full text-[11px] font-medium transition-colors border border-white/25 sm:px-5 sm:py-2 sm:text-sm"
            >
              View Plan →
            </button>
          </div>
        )}

        {/* Navigation Arrows - Bottom Right */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 sm:bottom-5 sm:right-6 sm:gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => paginate(-1)}
            className="grid size-7 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:size-8"
          >
            <ChevronLeft className="size-3 sm:size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => paginate(1)}
            className="grid size-7 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black sm:size-8"
          >
            <ChevronRight className="size-3 sm:size-4" />
          </button>
        </div>

        {/* Dots - Top Left */}
        <div className="absolute left-4 top-3 flex gap-1.5 sm:left-6 sm:top-5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => paginate(i - index)}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index
                  ? "w-6 bg-white"
                  : "w-2.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
        </div>
      </div>
  );
}
