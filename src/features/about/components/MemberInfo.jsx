import { ArrowLeft, ArrowRight } from "lucide-react";
import { TEAM } from "../constants/teamData";

function NavButton({ onClick, ariaLabel, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        flex items-center justify-center
        w-14 h-14 md:w-16 md:h-16
        rounded-full
        border border-white/20
        bg-white/5
        backdrop-blur-xl
        text-white
        transition-all duration-300
        hover:bg-white
        hover:text-black
        hover:scale-110
        active:scale-95
      "
    >
      {children}
    </button>
  );
}

export function MemberInfo({ member, activeIndex, navigate }) {
  return (
    <div className="absolute bottom-8 left-5 md:bottom-16 md:left-16 z-40 max-w-[420px]">
      {/* Label */}
      <p className="text-[11px] uppercase tracking-[0.45em] text-teal-300 font-medium">
        HOMI TEAM
      </p>

      {/* Name */}
      <h3 className="mt-2 text-3xl md:text-[3.5rem] font-bold leading-[0.95] tracking-[-0.03em] text-white">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-5 uppercase tracking-[0.35em] text-white/70 text-xs md:text-sm font-semibold">
        {member.role}
      </p>

      {/* Divider */}
      <div className="w-24 h-px bg-teal-400/70 my-6" />

      {/* Description */}
      <p className="hidden md:block max-w-[380px] text-base leading-7 text-white/70 mb-10">
        {member.desc}
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <NavButton onClick={() => navigate("prev")} ariaLabel="Previous Member">
          <ArrowLeft size={24} strokeWidth={2.3} />
        </NavButton>

        <NavButton onClick={() => navigate("next")} ariaLabel="Next Member">
          <ArrowRight size={24} strokeWidth={2.3} />
        </NavButton>

        {/* Progress */}
        <div className="flex items-center gap-2 ml-5">
          {TEAM.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-10 h-[6px] bg-teal-400"
                  : "w-[6px] h-[6px] bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
