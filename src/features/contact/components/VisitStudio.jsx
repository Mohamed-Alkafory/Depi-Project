const VisitStudio = () => {
  return (
    <section className="max-w-container mx-auto px-6 md:px-desktop-margin pb-section-gap">
      <div className="group relative h-[360px] md:h-[500px] w-full rounded-lg overflow-hidden">

        {/* Background image with hover-scale effect */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDF3hEQ2KPR00RcyPt2f-zAZnAq35ruVge4icLH9UfXGyIFHZ1mCDNudTQFjA51nDW4oRtNnZuWxjQ8EBo_GoR3fhhKiaaUvElA0TTUSIJWTtSewSQuCivNhmIUouIMiav9qJ72TCuKn3AvhClf1gT1nQTXP5e3xbcDmM-GkfKvOk47AvZXZ5yoUkRai9oGkaYokPVjmKZbP8UnGjHFGvo7yi5Q7FPcfad5UmxLmp3KXWC6WiMreTazdj2aSPNfg4ik52XFYRUlujIj')",
          }}
        />

        {/* Glassmorphism overlay card */}
        <div
          className="absolute bottom-8 left-8 right-8 md:left-12 md:right-auto md:w-[400px] p-8 rounded-sm shadow-[0_25px_50px_rgba(0,0,0,0.12)]"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(255,255,255,0.40)',
            border: '1px solid rgba(255,255,255,0.30)',
          }}
        >
          <h3 className="font-headline text-2xl font-semibold text-on-surface mb-2">
            Visit Our Studio
          </h3>
          <p className="font-body text-base leading-relaxed text-on-surface-variant mb-6">
            Experience our design process firsthand. We welcome visitors to explore our
            gallery of previous works and ongoing blueprints.
          </p>
          <a
            href="#directions"
            className="group/btn inline-flex items-center gap-2 text-primary font-body text-sm font-semibold tracking-[0.1em] no-underline transition-[gap] duration-300 hover:gap-3"
          >
            GET DIRECTIONS
            <span
              className="material-symbols-outlined transition-transform duration-300 group-hover/btn:translate-x-[2px] group-hover/btn:-translate-y-[2px]"
              style={{ fontSize: '20px', fontVariationSettings: "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24" }}
            >
              north_east
            </span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default VisitStudio;