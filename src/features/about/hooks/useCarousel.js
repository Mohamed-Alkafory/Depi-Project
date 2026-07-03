import { useState, useEffect, useCallback } from "react";
import { TEAM } from "../constants/teamData";

export function useCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload all team images on mount
  useEffect(() => {
    TEAM.forEach((member) => {
      const img = new Image();
      img.src = member.src;
    });
  }, []);

  // Track viewport width for responsive styles
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useCallback(
    (dir) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next"
          ? (prev + 1) % TEAM.length
          : (prev + TEAM.length - 1) % TEAM.length,
      );
      setTimeout(() => setIsAnimating(false), 850);
    },
    [isAnimating],
  );

  // Derive each card's positional role from activeIndex
  const getRole = (index) => {
    const left = (activeIndex + TEAM.length - 1) % TEAM.length;
    const right = (activeIndex + 1) % TEAM.length;
    if (index === activeIndex) return "center";
    if (index === left) return "left";
    if (index === right) return "right";
    return "back";
  };

  return {
    activeIndex,
    isMobile,
    navigate,
    getRole,
    activeMember: TEAM[activeIndex],
  };
}
