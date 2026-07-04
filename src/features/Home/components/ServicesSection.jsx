import { useState } from "react";
import { SLIDER_SERVICES } from "../constants";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SectionEyebrow({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[var(--brand-primary)] font-[var(--second-font)]">
      {icon && <i className={cn(icon, "text-[11px]")} />}
      {children}
    </span>
  );
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? SLIDER_SERVICES.length - 1 : i - 1));
  const next = () => setActive((i) => (i === SLIDER_SERVICES.length - 1 ? 0 : i + 1));

  return (
    <section id="portfolio" className="bg-[var(--section-bg)] border-t border-[var(--border)] py-24 px-16">
      <div className="text-center mb-14">
        <SectionEyebrow icon="fa-solid fa-location-crosshairs">
          <span className="flex">Our Services</span>
        </SectionEyebrow>
        <h2 className="text-[36px] font-bold leading-[1.15] -tracking-[0.5px] text-[var(--heading)] font-[var(--first-font)]">
          Everything You Need To{" "}
          <span className="text-[var(--brand-primary)]">Build Your Home</span>
        </h2>
      </div>

      <div className="flex gap-4 items-stretch max-w-[1100px] mx-auto mb-9 h-[380px]">
        <div
          className="flex-1 rounded-3xl bg-cover bg-center relative overflow-hidden shadow-2xl transition-[background-image] duration-500"
          style={{ backgroundImage: `url(${SLIDER_SERVICES[active].bg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1.5 mb-4 text-[12px] font-medium text-white tracking-wide font-[var(--second-font)]">
              <i
                className={cn(
                  SLIDER_SERVICES[active].icon,
                  "text-[13px] text-[var(--brand-primary-light)]",
                )}
              />
              <span>{SLIDER_SERVICES[active].tag}</span>
            </div>
            <h3 className="mb-3 text-[26px] font-bold leading-[1.2] -tracking-[0.5px] text-white font-[var(--first-font)]">
              {SLIDER_SERVICES[active].title}
            </h3>
            <p className="mb-6 max-w-[400px] text-[14px] leading-[1.65] text-white/75 font-[var(--second-font)]">
              {SLIDER_SERVICES[active].desc}
            </p>
            <button className="bg-white text-[var(--brand-secondary)] font-semibold text-[13px] tracking-wide px-6 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-[var(--brand-primary)] hover:text-white hover:scale-[1.03] font-[var(--second-font)]">
              See More
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-[140px] shrink-0">
          {SLIDER_SERVICES.map((s, i) => {
            if (i === active) return null;
            const isNext = i === (active + 1) % SLIDER_SERVICES.length;
            const isNext2 = i === (active + 2) % SLIDER_SERVICES.length;
            if (!isNext && !isNext2) return null;
            return (
              <button
                key={s.id}
                type="button"
                aria-label={`Show ${s.title}`}
                className="flex-1 rounded-2xl bg-cover bg-center relative overflow-hidden cursor-pointer transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] shadow-xl hover:scale-[1.03] border-0 p-0"
                style={{
                  backgroundImage: `url(${s.bg})`,
                  opacity: isNext ? 1 : 0.7,
                }}
                onClick={() => setActive(i)}
              >
                <span className="absolute inset-0 bg-black/30 transition-colors hover:bg-[var(--brand-primary)]/25" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-5">
        <button
          onClick={prev}
          aria-label="Previous service"
          className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--heading)] flex items-center justify-center cursor-pointer text-[13px] transition-all duration-300 hover:bg-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:text-white hover:scale-110 shadow-sm"
        >
          <i className="fa-solid fa-chevron-left" />
        </button>

        <div className="flex gap-2 items-center">
          {SLIDER_SERVICES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to service ${i + 1}`}
              className={cn(
                "h-2 rounded-full border-0 cursor-pointer transition-all duration-300",
                i === active
                  ? "w-7 bg-[var(--brand-primary)]"
                  : "w-2 bg-[var(--muted)]",
              )}
              onClick={() => setActive(i)}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next service"
          className="w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card-bg)] text-[var(--heading)] flex items-center justify-center cursor-pointer text-[13px] transition-all duration-300 hover:bg-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:text-white hover:scale-110 shadow-sm"
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>
    </section>
  );
}
