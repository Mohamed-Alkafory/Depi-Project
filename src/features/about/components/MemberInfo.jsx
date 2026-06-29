import { ArrowLeft, ArrowRight } from "lucide-react";
import { TEAM } from "../constants/teamData";

function NavButton({ onClick, ariaLabel, children }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        flex items-center justify-center
        w-12 h-12 md:w-14 md:h-14
        rounded-full
        border border-white/15
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
      <p className="text-[11px] uppercase tracking-[0.4em] text-teal-300 mb-3 font-medium">
        Team Member
      </p>

      {/* Name */}
      <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-4 uppercase tracking-[0.28em] text-white/60 text-xs md:text-sm font-semibold">
        {member.role}
      </p>

      {/* Divider */}
      <div className="w-20 h-px bg-teal-400/70 my-6" />

      {/* Description */}
      <p className="hidden md:block text-white/70 leading-8 text-[15px] mb-10">
        {member.desc}
      </p>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <NavButton onClick={() => navigate("prev")} ariaLabel="Previous Member">
          <ArrowLeft size={22} strokeWidth={2.4} />
        </NavButton>

        <NavButton onClick={() => navigate("next")} ariaLabel="Next Member">
          <ArrowRight size={22} strokeWidth={2.4} />
        </NavButton>

        {/* Progress */}
        <div className="flex items-center gap-2 ml-4">
          {TEAM.map((_, index) => (
            <div
              key={index}
              className={`rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "w-8 h-[6px] bg-teal-400"
                  : "w-[6px] h-[6px] bg-white/25"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
