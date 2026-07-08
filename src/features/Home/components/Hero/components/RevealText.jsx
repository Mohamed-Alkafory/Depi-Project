import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

const wordVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96, filter: "blur(10px)", rotateX: 2 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 1.4,
      delay: i * 0.06,
      ease: easeOut,
    },
  }),
};

export function RevealWords({
  text,
  className = "",
  as: Tag = "span",
  baseDelay = 0,
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}

const charVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96, filter: "blur(12px)", rotateX: 2 },
  visible: ({ index, baseDelay = 0 }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 1.6,
      delay: baseDelay + index * 0.035,
      ease: easeOut,
    },
  }),
};

export function RevealChars({
  text,
  className = "",
  as: Tag = "span",
  baseDelay = 0,
}) {
  const chars = text.split("");
  return (
    <Tag className={className} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          custom={{ index: i, baseDelay }}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}

const lineVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      delay: i * 0.15,
      ease: easeOut,
    },
  }),
};

export function RevealLine({ children, className = "", index = 0 }) {
  return (
    <motion.div
      className={className}
      custom={index}
      variants={lineVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
