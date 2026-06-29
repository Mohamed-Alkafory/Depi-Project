import { useEffect, useState } from "react";

const STATS = [
  { label: "FIRST BLUEPRINT", value: "09/2025" },
  { label: "FOUNDATION", value: "02/2025" },
  { label: "LEAD ARCHITECT", value: "HOMI TEAM" },
  { label: "PATENTS", value: "Depi & EYOUTH" },
];

export default function HomiStatsBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#2D3436",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {STATS.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `all 600ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms`,
              }}
            >
              <p
                style={{
                  fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#95A5A6",
                  marginBottom: "0.5rem",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: "#81ECEC",
                  lineHeight: 1.2,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
