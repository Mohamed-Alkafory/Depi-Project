import { useEffect, useRef, useState } from "react";

export default function HomiAboutSection() {
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
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        backgroundColor: "#F8F9FA",
        fontFamily: "'Inter', sans-serif",
      }}
      className="relative w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 800,
                color: "#2D3436",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.5rem",
              }}
            >
              Innovative
              <br />
              craftsmanship
            </h2>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                color: "#636E72",
                lineHeight: 1.7,
                marginBottom: "1.5rem",
                maxWidth: "480px",
              }}
            >
              HOMI is a unique design-build studio designed to elevate living
              spaces. Each project is handcrafted with meticulous attention to
              detail, resulting in a rare and timeless product.
            </p>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                color: "#636E72",
                lineHeight: 1.7,
                marginBottom: "2rem",
                maxWidth: "480px",
              }}
            >
              Born from carefully repurposed technical fibers, it is reimagined
              into a noble material that is both soft to the touch and visually
              striking. Our work stands out for its rich texture, vibrant tones,
              and ability to tell a unique story.
            </p>

            {/* Progress bar */}
            <div
              style={{
                width: "100%",
                maxWidth: "300px",
                height: "2px",
                backgroundColor: "#DFE6E9",
                marginBottom: "2rem",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: isVisible ? "60%" : "0%",
                  backgroundColor: "#00B894",
                  transition: "width 1200ms cubic-bezier(0.4, 0, 0.2, 1) 400ms",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "60%",
                  top: "-3px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00B894",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 400ms ease 1400ms",
                }}
              />
            </div>

            {/* Quote */}
            <div
              style={{
                borderLeft: "3px solid #00B894",
                paddingLeft: "1.25rem",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1) 600ms",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
                  color: "#2D3436",
                  fontStyle: "italic",
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                "Every project that incorporates Homi becomes a work of art,
                shaped by craftsmanship that values authenticity and the
                elegance of the hand's gesture."
              </p>
            </div>
          </div>

          {/* Right: Image Card */}
          <div
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(40px)",
              transition: "all 800ms cubic-bezier(0.4, 0, 0.2, 1) 200ms",
            }}
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.15)",
              }}
            >
              <img
                src="/images/about-project.png"
                alt="The Glass Pavilion"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "4 / 3",
                  objectFit: "cover",
                  display: "block",
                }}
              />

              {/* Floating label card */}
              <div
                style={{
                  position: "absolute",
                  bottom: "1.5rem",
                  left: "1.5rem",
                  right: "1.5rem",
                  backgroundColor: "rgba(255, 255, 255, 0.92)",
                  backdropFilter: "blur(12px)",
                  borderRadius: "16px",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(0.7rem, 1vw, 0.85rem)",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#00B894",
                    marginBottom: "0.4rem",
                  }}
                >
                  DESIGN PHASE
                </p>
                <p
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                    fontWeight: 700,
                    color: "#2D3436",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  The Glass Pavilion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
