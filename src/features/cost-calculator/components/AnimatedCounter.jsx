import useCountUp from "../hooks/useCountUp";

function formatEGP(n) {
  return Math.round(n).toLocaleString("en-US") + " EGP";
}

/**
 * Animated counting display for a cost value.
 *
 * @param {number} value     Target value to count up to (EGP).
 * @param {any}    activeKey Re-trigger the animation when this changes
 *                           (e.g. a step id or results object).
 */
export default function AnimatedCounter({ value, activeKey }) {
  const current = useCountUp(value ?? 0, { duration: 1100, activeKey });
  return <>{formatEGP(current)}</>;
}
