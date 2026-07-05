const ContactDetails = () => {
  return (
    <div className="flex flex-col gap-12 py-8 lg:pl-12">

      {/* ── Contact info items ── */}
      <div className="flex flex-col">
        <h3 className="font-headline text-[32px] font-semibold leading-[1.3] text-primary mb-8">
          Contact Details
        </h3>

        <div className="flex flex-col gap-8">

          {/* Address */}
          <div className="group flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-[rgba(0,101,101,0.05)] flex items-center justify-center text-primary flex-shrink-0 transition-[background-color,color] duration-300 group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>location_on</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant">OFFICE ADDRESS</span>
              <p className="font-body text-lg font-normal leading-relaxed text-on-surface">
                123 Architectural Way,<br />
                Design District, CA 90210
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="group flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-[rgba(0,101,101,0.05)] flex items-center justify-center text-primary flex-shrink-0 transition-[background-color,color] duration-300 group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>mail</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant">EMAIL US</span>
              <a
                href="mailto:hello@homi.design"
                className="font-body text-lg font-normal leading-relaxed text-on-surface no-underline transition-colors duration-200 hover:text-primary"
              >
                hello@homi.design
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="group flex items-start gap-6">
            <div className="w-14 h-14 rounded-full bg-[rgba(0,101,101,0.05)] flex items-center justify-center text-primary flex-shrink-0 transition-[background-color,color] duration-300 group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined" style={{ fontSize: '22px', fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>call</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-body text-sm font-semibold tracking-[0.1em] text-on-surface-variant">PHONE NUMBER</span>
              <a
                href="tel:+1234567890"
                className="font-body text-lg font-normal leading-relaxed text-on-surface no-underline transition-colors duration-200 hover:text-primary"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Working Hours ── */}
      <div className="p-8 rounded-sm bg-[rgba(224,233,242,0.50)] border border-[rgba(189,201,200,0.20)]">
        <h4 className="font-headline text-2xl font-semibold text-on-surface mb-4">Working Hours</h4>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between font-body text-base text-on-surface-variant">
            <span>Mon - Fri</span>
            <span className="font-semibold text-on-surface">9:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between font-body text-base text-on-surface-variant">
            <span>Saturday</span>
            <span className="font-semibold text-on-surface">10:00 AM - 2:00 PM</span>
          </div>
          <div className="flex justify-between font-body text-base text-on-surface-variant">
            <span>Sunday</span>
            <span className="font-semibold text-primary italic">By Appointment</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ContactDetails;