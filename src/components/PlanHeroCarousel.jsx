// src/components/PlanHeroCarousel.jsx
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STRIPS = 8;
const EASE = [0.65, 0, 0.35, 1];

const stripVariants = (s) => ({
  enter: (dir) => ({ y: dir > 0 ? "102%" : "-102%" }),
  center: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE, delay: s * 0.055 },
  },
  exit: (dir) => ({
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
    <div className="relative flex h-[65vh] w-full items-center justify-center overflow-hidden bg-gray-50 py-6">
      {/* Card Container - أصغر + rounded أقل */}
      <div className="relative h-full w-[min(1000px,94%)] overflow-hidden rounded-2xl bg-gray-200 shadow-xl">
        {/* Sliced Image Animation */}
        <AnimatePresence initial={false} custom={dir}>
          <motion.div
            key={index}
            className="absolute inset-0 flex"
            custom={dir}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {Array.from({ length: STRIPS }).map((_, s) => (
              <div key={s} className="h-full flex-1 overflow-hidden">
                <motion.div
                  className="h-full w-full"
                  custom={dir}
                  variants={stripVariants(s)}
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: `${STRIPS * 100}% 100%`,
                    backgroundPosition: `${(s / (STRIPS - 1)) * 100}% 50%`,
                  }}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay - أخف */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        {/* Content - Bottom Left */}
        <div className="absolute bottom-5 left-6 text-white">
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
              <h3 className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight">
                {slide.title}
              </h3>
              <p className="mt-1 text-lg font-medium text-teal-400">
                {slide.price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* View Plan Button - Center Bottom */}
        {slide.link && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <button
              onClick={() => navigate(slide.link)}
              className="px-5 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white rounded-full text-sm font-medium transition-colors border border-white/20"
            >
              View Plan →
            </button>
          </div>
        )}

        {/* Navigation Arrows - Bottom Right */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => paginate(-1)}
            className="grid size-8 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => paginate(1)}
            className="grid size-8 place-items-center rounded-full border border-white/25 text-white/80 backdrop-blur-sm transition-colors hover:bg-white hover:text-black"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Dots - Top Left */}
        <div className="absolute left-6 top-5 flex gap-1.5">
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
  );
}
