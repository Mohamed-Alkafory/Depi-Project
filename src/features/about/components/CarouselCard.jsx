const TRANSITION =
  "transform 850ms cubic-bezier(0.23,1,0.32,1), filter 850ms cubic-bezier(0.23,1,0.32,1), opacity 850ms cubic-bezier(0.23,1,0.32,1), left 850ms cubic-bezier(0.23,1,0.32,1), bottom 850ms cubic-bezier(0.23,1,0.32,1), width 850ms cubic-bezier(0.23,1,0.32,1), height 850ms cubic-bezier(0.23,1,0.32,1)";

function getRoleStyles(role, isMobile) {
  const base = {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: TRANSITION,
    willChange: "transform, filter, opacity",
    transform: "translateX(-50%)",
  };

  switch (role) {
    case "center":
      return {
        ...base,
        left: "50%",
        top: "50%",
        width: isMobile ? "min(78vw,270px)" : "min(31vw,360px)",
        height: isMobile ? "64%" : "74%",
        transform: "translate(-50%, -50%) scale(1)",
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
      };

    case "left":
      return {
        ...base,
        left: isMobile ? "18%" : "27%",
        bottom: isMobile ? "28%" : "13%",
        height: isMobile ? "19%" : "31%",
        transform: "translateX(-50%) scale(.9)",
        filter: "blur(1.5px)",
        opacity: 0.55,
        zIndex: 10,
      };

    case "right":
      return {
        ...base,
        left: isMobile ? "82%" : "73%",
        bottom: isMobile ? "28%" : "13%",
        height: isMobile ? "19%" : "31%",
        transform: "translateX(-50%) scale(.9)",
        filter: "blur(1.5px)",
        opacity: 0.55,
        zIndex: 10,
      };

    case "back":
      return {
        ...base,
        left: "50%",
        bottom: isMobile ? "28%" : "13%",
        height: isMobile ? "15%" : "24%",
        transform: "translateX(-50%) scale(.82)",
        filter: "blur(6px)",
        opacity: 0.22,
        zIndex: 5,
      };

    default:
      return base;
  }
}

export function CarouselCard({ member, role, isMobile }) {
  const styles = getRoleStyles(role, isMobile);

  const isCenter = role === "center";

  return (
    <div style={styles}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: isMobile ? "20px" : "28px",
          background: "#1b1b1b",
          border: isCenter
            ? "1px solid rgba(255,255,255,.14)"
            : "1px solid rgba(255,255,255,.06)",
          boxShadow: isCenter
            ? "0 40px 80px rgba(0,0,0,.45)"
            : "0 20px 40px rgba(0,0,0,.25)",
          transition: TRANSITION,
        }}
      >
        {/* Glow */}
        {isCenter && (
          <div
            style={{
              position: "absolute",
              inset: "-20%",
              background:
                "radial-gradient(circle, rgba(0,128,128,.35) 0%, transparent 70%)",
              filter: "blur(60px)",
              zIndex: 1,
            }}
          />
        )}

        {/* Image */}
        <img
          src={member.src}
          alt={member.name}
          draggable={false}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: isCenter ? "scale(1.03)" : "scale(1)",
            transition: "transform .8s ease",
            userSelect: "none",
            display: "block",
          }}
        />

        {/* Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 3,
            background:
              "linear-gradient(to top, rgba(0,0,0,.28), transparent 45%)",
          }}
        />

        {/* Active Ring */}
        {isCenter && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: isMobile ? "20px" : "28px",
              border: "1px solid rgba(255,255,255,.18)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );
}
