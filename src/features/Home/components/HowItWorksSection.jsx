import { HOW_IT_WORKS_STEPS } from "../constants";

function SectionEyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 mb-5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[var(--brand-primary)] font-[var(--second-font)]">
      {children}
    </span>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="services" className="bg-[var(--body-bg)] py-24 pb-28 sm:pb-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-16">
        {/* Header */}
        <div className="text-center mb-20 sm:mb-16">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="text-[36px] font-bold leading-[1.15] -tracking-[0.5px] text-[var(--heading)] font-[var(--first-font)]">
            Your Dream Home In{" "}
            <span className="text-[var(--brand-primary)]">3 Simple Steps</span>
          </h2>
        </div>

        {/* Content: Image + Steps */}
        <div className="flex items-center gap-16">
          {/* Left - Image Placeholder */}
          <div className="flex-1 relative">
            <img
              src="/src/assets/img4.avif"
              alt="How Homi Works"
              className="w-full h-[480px] object-cover rounded-3xl shadow-2xl"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[var(--brand-primary)]/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-[var(--brand-primary)]/20 rounded-2xl -z-10" />
          </div>

          {/* Right - Steps */}
          <div className="flex-1 flex flex-col gap-8 relative">
            {/* Vertical Line */}
            <div className="absolute left-[28px] top-8 bottom-8 w-px bg-[var(--border)]" />

            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <div key={i} className="relative flex gap-6 group">
                {/* Icon Circle */}
                <div className="relative z-10 shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-lg shadow-[var(--brand-primary)]/20 transition-transform duration-300 group-hover:scale-110">
                    <i className={`${step.icon} text-xl`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[13px] font-bold text-[var(--brand-primary)] font-[var(--first-font)]">
                      {step.number}
                    </span>
                    <h3 className="text-[18px] font-bold text-[var(--heading)] font-[var(--first-font)]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-[14px] leading-[1.7] text-[var(--paragraph)] font-[var(--second-font)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
