import { useState } from "react";

export default function FooterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed: ${email}`);
    setEmail("");
  };

  return (
    <footer id="process" className="bg-[var(--brand-secondary)] text-white">
      {/* Main Content — نفس Padding بتاع Hero */}
      <div className="px-16 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 font-[var(--first-font)] tracking-wide">
              Homi
            </h3>
            <p className="text-white/70 text-[14px] leading-[1.7] font-[var(--second-font)]">
              Your destination for modern architectural designs and smart building
              solutions.
            </p>
          </div>

          {/* Column 2 - Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 font-[var(--first-font)]">
              Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["Home", "About", "Services", "Designs", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-white/70 text-[14px] hover:text-[var(--brand-primary-light)] transition-colors duration-300 font-[var(--second-font)]"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-5 font-[var(--first-font)]">
              Contact
            </h4>
            <ul className="flex flex-col gap-3">
              {["Email", "Phone", "Location"].map((item) => (
                <li key={item}>
                  <span className="text-white/70 text-[14px] font-[var(--second-font)] cursor-pointer hover:text-[var(--brand-primary-light)] transition-colors duration-300">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-5 font-[var(--first-font)]">
              Subscribe to Newsletter
            </h4>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-[14px] font-[var(--second-font)] focus:outline-none focus:border-[var(--brand-primary)] transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-lg bg-white text-[var(--brand-secondary)] font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[var(--brand-primary)] hover:text-white font-[var(--second-font)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-[13px] font-[var(--second-font)]">
            © 2026 Homi. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {[
              { icon: "fa-brands fa-instagram", label: "Instagram" },
              { icon: "fa-brands fa-whatsapp", label: "WhatsApp" },
              { icon: "fa-brands fa-facebook", label: "Facebook" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[var(--brand-primary)] hover:text-white transition-all duration-300"
              >
                <i className={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
