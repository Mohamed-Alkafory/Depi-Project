import { TEAM } from "../constants/teamData";
import { useCarousel } from "../hooks/useCarousel";
import { CarouselCard } from "./CarouselCard";
import { SocialLinks } from "./SocialLinks";
import { MemberInfo } from "./MemberInfo";

function GrainOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-20 opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: "220px 220px",
        backgroundRepeat: "repeat",
      }}
    />
  );
}

export default function HomiTeamSection() {
  const { activeIndex, isMobile, navigate, getRole, activeMember } =
    useCarousel();

  return (
    <section
      className="relative isolate w-full overflow-hidden "
      style={{
        height: "clamp(680px, 88vh, 920px)",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: TEAM[activeIndex].bg,
        transition: "background-color 800ms ease",
      }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black/15 z-0" />

      <div
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25 transition-all duration-700"
        style={{
          background: TEAM[activeIndex].bg,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-[1]" />

      <GrainOverlay />

      <div className="relative z-30 h-full">
        {/* Ghost Text */}
        <div
          className="absolute inset-x-0 flex justify-center pointer-events-none select-none"
          style={{
            top: "10%",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(90px,18vw,250px)",
              lineHeight: 1,
              color: "#fff",
              opacity: 0.08,
              whiteSpace: "nowrap",
              letterSpacing: "-0.03em",
            }}
          >
            OUR TEAM
          </h1>
        </div>

        {/* Carousel */}
        <div className="absolute inset-0 z-10">
          {TEAM.map((member, index) => (
            <CarouselCard
              key={member.id ?? index}
              member={member}
              role={getRole(index)}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Social */}
        {activeMember && (
          <SocialLinks member={activeMember} isMobile={isMobile} />
        )}

        {/* Member Info */}
        {activeMember && (
          <MemberInfo
            member={activeMember}
            activeIndex={activeIndex}
            navigate={navigate}
          />
        )}
      </div>
    </section>
  );
}
