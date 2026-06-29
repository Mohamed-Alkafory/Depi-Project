import { useEffect, useRef, useState } from "react";

export default function HomiBlueprintSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Dot pattern SVG as data URI
  const dotPattern = `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='%23B2BEC3' opacity='0.4'/%3E%3C/svg%3E")`;

  return (
    <div
      ref={sectionRef}
      style={{
        backgroundColor: "#EDF2F7",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
      }}
      className="relative w-full overflow-hidden"
    >
      {/* Left dot pattern */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none hidden lg:block"
        style={{
          left: 0,
          width: "80px",
          backgroundImage: dotPattern,
          backgroundSize: "20px 20px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1000ms ease 300ms",
        }}
      />

      {/* Right dot pattern */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none hidden lg:block"
        style={{
          right: 0,
          width: "80px",
          backgroundImage: dotPattern,
          backgroundSize: "20px 20px",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1000ms ease 300ms",
        }}
      />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-12 py-16 sm:py-24 text-center">
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "#2D3436",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "2.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          From Blueprint to Reality
        </h2>

        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            color: "#636E72",
            lineHeight: 1.8,
            marginBottom: "2rem",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1) 200ms",
          }}
        >
          The story of HOMI is that of a collective of architects and engineers
          driven by a passion for radical innovation. By reinventing the supply
          chain of building materials, we gave birth to a unique ecosystem that
          transforms raw elements into artistic and structural marvels.
        </p>

        <p
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
            color: "#636E72",
            lineHeight: 1.8,
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
          }}
        >
          From this inspiring idea, HOMI has grown into a creative studio based
          in the heart of the architectural district. With a large production
          workshop and a close-knit team, the studio continues to push the
          boundaries of innovation in sustainable design and precision
          engineering.
        </p>
      </div>
    </div>
  );
}
