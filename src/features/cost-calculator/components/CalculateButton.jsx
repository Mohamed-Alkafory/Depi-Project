import { useState, useRef } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

export default function CalculateButton({
  onClick,
  label = "Calculate Cost",
  className = "",
  size = "lg",
}) {
  const [loading, setLoading] = useState(false);
  const [ripples, setRipples] = useState([]);
  const seqRef = useRef(0);
  const timerRef = useRef(null);

  const sizeClasses =
    size === "lg"
      ? "h-16 text-lg"
      : "h-14 text-base";

  const handleClick = (e) => {
    if (loading) return;

    // Ripple
    const rect = e.currentTarget.getBoundingClientRect();
    const id = seqRef.current++;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const sizeRipple = Math.max(rect.width, rect.height) * 2;
    setRipples((r) => [
      ...r,
      { id, x, y, size: sizeRipple },
    ]);
    setTimeout(() => {
      setRipples((r) => r.filter((rp) => rp.id !== id));
    }, 650);

    // Loading state — simulate a short premium delay before invoking the same handler.
    setLoading(true);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      onClick && onClick();
    }, 700);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`group relative overflow-hidden ${sizeClasses} w-full rounded-2xl font-bold text-white
        bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600
        shadow-[0_12px_30px_-8px_rgba(13,148,136,0.55)]
        hover:shadow-[0_18px_45px_-10px_rgba(13,148,136,0.7)]
        hover:-translate-y-0.5 active:translate-y-0
        transition-all duration-300 ease-out
        disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:translate-y-0
        flex items-center justify-center gap-2.5
        ${className}`}
    >
      {/* Glossy top highlight */}
      <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent opacity-70" />

      {/* Ripple layer */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cc-ripple"
          style={{
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
          }}
        />
      ))}

      {/* Content */}
      {loading ? (
        <span className="relative flex items-center gap-2.5">
          <Loader2 size={20} className="animate-spin" />
          Calculating...
        </span>
      ) : (
        <span className="relative flex items-center gap-2.5">
          {label}
          <ArrowRight
            size={size === "lg" ? 20 : 18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      )}
    </button>
  );
}
