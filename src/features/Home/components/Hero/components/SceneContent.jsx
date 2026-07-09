import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { RevealWords, RevealChars, RevealLine } from "./RevealText";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25, delayChildren: 0.3 },
  },
};

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

function HeadingLineWords({ words }) {
  return words.map((segment, j) => {
    const isTeal = segment.color === "teal";
    return (
      <span
        key={j}
        className={
          isTeal
            ? "font-playfair italic font-bold text-[#19C7C2]"
            : "font-playfair font-bold text-white"
        }
      >
        {segment.font === "serif" ? (
          <RevealChars text={segment.text} className="inline" baseDelay={0.8} />
        ) : (
          <RevealWords text={segment.text} />
        )}
      </span>
    );
  });
}

export function SceneContent({ scene }) {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeVariants}>
        <RevealLine index={0}>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#19C7C2]/80">
            <span className="inline-block w-6 h-px bg-[#19C7C2]/60" />
            {scene.badge}
          </span>
        </RevealLine>
      </motion.div>

      <motion.div variants={fadeVariants} className="mt-2 sm:mt-3">
        {scene.heading.map((line, i) => (
          <RevealLine key={i} index={i}>
            <h1 className="text-[clamp(1.75rem,5.5vw,3.625rem)] sm:text-[clamp(2.375rem,4.5vw,3.625rem)] font-bold leading-[1.08] tracking-[-0.02em]">
              <HeadingLineWords words={line} />
            </h1>
          </RevealLine>
        ))}
      </motion.div>

      <motion.div variants={fadeVariants} className="mt-3 sm:mt-[22px]">
        <RevealLine index={scene.heading.length}>
          <p className="max-w-[85vw] font-light leading-relaxed text-[#c9ced6] text-sm sm:max-w-[520px] sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            {scene.description.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                <RevealWords text={line} />
              </span>
            ))}
          </p>
        </RevealLine>
      </motion.div>

      {scene.cta && (
        <motion.div variants={fadeVariants} className="mt-4 sm:mt-6">
          <RevealLine index={scene.heading.length + 2}>
            <Link
              to={scene.ctaTo || "/"}
              className="group inline-flex items-center gap-3 rounded-full bg-[#19C7C2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#19C7C2]/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#19C7C2]/30 active:scale-100 sm:px-8 sm:py-4"
            >
              {scene.cta}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </RevealLine>
        </motion.div>
      )}
    </motion.div>
  );
}

export function FinalSceneContent({ scene }) {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeVariants}>
        <RevealLine index={0}>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#19C7C2]/80">
            <span className="inline-block w-6 h-px bg-[#19C7C2]/60" />
            {scene.badge}
          </span>
        </RevealLine>
      </motion.div>

      <motion.div variants={fadeVariants} className="mt-2 sm:mt-3">
        {scene.heading.map((line, i) => (
          <RevealLine key={i} index={i}>
            <h1 className="text-[clamp(1.75rem,5.5vw,3.625rem)] sm:text-[clamp(2.375rem,4.5vw,3.625rem)] font-bold leading-[1.08] tracking-[-0.02em]">
              <HeadingLineWords words={line} />
            </h1>
          </RevealLine>
        ))}
      </motion.div>

      <motion.div variants={fadeVariants} className="mt-3 sm:mt-[22px]">
        <RevealLine index={scene.heading.length}>
          <p className="max-w-[85vw] font-light leading-relaxed text-[#c9ced6] text-sm sm:max-w-[520px] sm:text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
            {scene.description.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                <RevealWords text={line} />
              </span>
            ))}
          </p>
        </RevealLine>
      </motion.div>

      {scene.buttons && (
        <motion.div variants={fadeVariants} className="mt-4 sm:mt-6">
          <RevealLine index={scene.heading.length + 2}>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              {scene.buttons.map((btn, idx) => (
                <Link
                  key={btn.label}
                  to={btn.to}
                  className={
                    idx === 0
                      ? "group inline-flex items-center justify-center gap-3 rounded-full bg-[#19C7C2] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#19C7C2]/20 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#19C7C2]/30 active:scale-100 sm:px-8 sm:py-4"
                      : "group relative inline-flex items-center justify-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-100 sm:px-8 sm:py-4 overflow-hidden"
                  }
                >
                  {idx !== 0 && (
                    <span className="absolute inset-0 -translate-x-full rounded-full bg-white transition-transform duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                  )}
                  <span className={idx === 0 ? "" : "relative z-10 transition-colors duration-300 group-hover:text-[#1a1a1a]"}>
                    {btn.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className={idx === 0 ? "transition-transform duration-300 group-hover:translate-x-1" : "relative z-10 transition-colors duration-300 group-hover:text-[#1a1a1a] group-hover:translate-x-1"}
                  />
                </Link>
              ))}
            </div>
          </RevealLine>
        </motion.div>
      )}
    </motion.div>
  );
}
