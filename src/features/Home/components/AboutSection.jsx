import { ABOUT_SERVICES } from "../constants";

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

export default function AboutSection() {
  return (
    <section id="about" className="bg-[var(--body-bg)] py-24">
      <div className="max-w-[1280px] mx-auto px-16 grid grid-cols-[1fr_1.1fr_0.9fr] gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col">
          <SectionEyebrow icon="fa-solid fa-location-crosshairs">
            About Homi
          </SectionEyebrow>

          <h2 className="mb-5 text-[36px] font-bold leading-[1.15] -tracking-[0.5px] text-[var(--heading)] font-[var(--first-font)]">
            Delivering Exceptional <br />
            <span className="text-[var(--brand-primary)]">
              Architectural Solutions.
            </span>
          </h2>

          <p className="mb-6 max-w-[380px] text-[15px] leading-[1.75] text-[var(--paragraph)] font-[var(--second-font)]">
            Homi is an architectural platform that connects you with
            professional home designs and engineering solutions. We make the
            journey of building your dream home simpler — from choosing the right
            design to understanding your construction budget.
          </p>

          <ul className="list-none p-0 m-0 mb-8 flex flex-col gap-2.5">
            {[
              "Professional Architectural Designs",
              "Engineering Support",
              "Smart Cost Estimation",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-[14px] font-medium text-[var(--body-text)] font-[var(--second-font)]"
              >
                <i className="fa-solid fa-check w-5 h-5 rounded-full bg-[var(--brand-primary)] text-white inline-flex items-center justify-center text-[9px] shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="group relative inline-flex items-center gap-2.5 self-start bg-[var(--brand-primary)] text-white font-semibold text-[14px] px-7 py-3.5 rounded-lg overflow-hidden transition-[gap] duration-300 hover:gap-3.5 font-[var(--second-font)]"
          >
            <span className="absolute inset-0 bg-[var(--brand-primary-hover)] -translate-x-[101%] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
            <span className="relative z-10">Homi Team</span>
            <i className="fa-solid fa-arrow-right relative z-10" />
          </a>
        </div>

        {/* Center - Images */}
        <div className="relative h-[440px]">
          <div className="absolute top-0 left-0 w-3/4 h-full rounded-2xl overflow-hidden shadow-2xl group">
            <img
              src="/src/assets/img4.avif"
              alt="Modern architectural exterior"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="absolute -bottom-5 right-0 w-[52%] h-[55%] rounded-2xl overflow-hidden border-4 border-[var(--body-bg)] shadow-2xl group">
            <img
              src="/src/assets/img2.jpg"
              alt="Interior design detail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="absolute bottom-9 -left-3 z-10 bg-[var(--brand-primary)] text-white rounded-xl px-5 py-4 flex flex-col items-center shadow-xl shadow-[var(--brand-primary)]/30">
            <span className="text-[30px] font-bold leading-none -tracking-[0.5px] font-[var(--first-font)]">
              25
            </span>
            <span className="mt-1 text-[11px] font-medium text-center opacity-90 font-[var(--second-font)]">
              Years Of Experience
            </span>
          </div>
        </div>

        {/* Right - Service Cards */}
        <div className="flex flex-col gap-4">
          {ABOUT_SERVICES.map((s, i) => (
            <div
              key={i}
              className="group flex items-start gap-4 bg-[var(--section-bg)] border border-[var(--border)] rounded-xl p-5 transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg hover:shadow-[var(--brand-primary)]/10 hover:translate-x-1 cursor-default"
            >
              <div className="w-11 h-11 rounded-xl bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-[var(--brand-primary)] group-hover:border-[var(--brand-primary)]">
                <i
                  className={cn(
                    s.icon,
                    "text-[17px] text-[var(--brand-primary)] transition-colors duration-300 group-hover:text-white",
                  )}
                />
              </div>
              <div>
                <h4 className="mb-1 text-[15px] font-semibold text-[var(--heading)] font-[var(--first-font)]">
                  {s.title}
                </h4>
                <p className="text-[13px] leading-[1.6] text-[var(--paragraph)] font-[var(--second-font)]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
