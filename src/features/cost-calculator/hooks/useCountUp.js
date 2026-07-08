import { useEffect, useRef, useState } from "react";

/**
 * Smoothly counts up to `target` whenever `target` or `activeKey` changes.
 * Uses requestAnimationFrame with an easeOutExpo easing curve.
 * Returns the current numeric value (a float).
 *
 * @param {number} target   Final value to animate towards.
 * @param {object} opts
 * @param {number} opts.duration  Duration in ms (default 1200).
 * @param {any}    opts.activeKey Re-trigger the animation when this changes
 *                                (e.g. a step id). Defaults to `target`.
 */
function toKey(v) {
  return typeof v === "object" ? JSON.stringify(v) : v;
}

export default function useCountUp(target, opts = {}) {
  const { duration = 1200, activeKey = target } = opts;
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const key = toKey(activeKey);

  useEffect(() => {
    if (target == null || Number.isNaN(Number(target))) {
      setValue(0);
      return;
    }

    const to = Number(target);
    if (to === 0) {
      setValue(0);
      return;
    }

    let start = null;
    const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (timestamp) => {
      if (start == null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(to * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, duration, target]);

  return value;
}
