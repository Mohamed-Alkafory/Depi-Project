import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../../public/photo_2026-06-30_08-39-40-removebg-preview.png";
import V from "../../../assets/1.mp4";
import { CLIENTS, NAV_LINKS } from "../constants";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Map nav links to section IDs
const LINK_TO_SECTION = {
  'Home': { id: 'home', scrollToTop: true },
  'About Us': { id: 'about' },
  'Services': { id: 'services' },
  'Portfolio': { id: 'portfolio' },
  'Process': { id: 'process' },
};

export default function HeroSection() {
  const [activeLink, setActiveLink] = useState("Home");
  const [loaded, setLoaded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();

  // Entrance animation
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    if (isScrolling) return;

    const sectionIds = ['home', 'about', 'services', 'portfolio', 'process'];

    const observer = new IntersectionObserver(
      (entries) => {
        let mostVisible = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            mostVisible = entry.target.id;
            maxRatio = entry.intersectionRatio;
          }
        });

        if (mostVisible) {
          const nameMap = {
            'home': 'Home',
            'about': 'About Us',
            'services': 'Services',
            'portfolio': 'Portfolio',
            'process': 'Process',
          };
          const newLink = nameMap[mostVisible];
          if (newLink) {
            setActiveLink(newLink);
          }
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1.0],
        rootMargin: '-80px 0px -60% 0px',
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isScrolling]);

  // Handle nav link click - smooth scroll
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    const target = LINK_TO_SECTION[link];
    if (!target) return;

    setActiveLink(link);
    setIsScrolling(true);

    if (target.scrollToTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    // Re-enable observer after scroll animation
    setTimeout(() => setIsScrolling(false), 1500);
  };

  return (
    <header id="home" className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={V}
        autoPlay
        muted
        playsInline
      />

      <div className="relative z-10 w-full h-full flex flex-col bg-black/35">
        {/* Navbar */}
        <div
          className={cn(
            "px-6 pt-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            loaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8",
          )}
        >
          <nav className="w-[min(920px,90%)] mx-auto flex items-center justify-between border border-white/10 bg-white/10 backdrop-blur-xl rounded-full pl-5 pr-2 py-2 shadow-xl">
            <img
              src={logo}
              alt="Homi Logo"
              className="h-9 w-auto object-contain shrink-0"
            />

            <ul className="hidden md:flex flex-1 justify-center gap-1 list-none m-0 p-0">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={`#${LINK_TO_SECTION[link]?.id || ''}`}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={cn(
                      "block text-[14px] font-medium px-4 py-2.5 rounded-full whitespace-nowrap transition-colors duration-300 font-[var(--second-font)]",
                      activeLink === link
                        ? "bg-white text-[var(--brand-secondary)]"
                        : "text-white/85 hover:text-white hover:bg-white/10",
                    )}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <button className="shrink-0 bg-[var(--brand-primary)] text-white border-0 px-6 py-2.5 rounded-full font-semibold text-[13px] tracking-wide cursor-pointer transition-transform duration-300 hover:scale-[1.04] font-[var(--second-font)]">
              Sign In
            </button>
          </nav>
        </div>

        {/* Hero Row */}
        <div
          className={cn(
            "flex-1 flex items-center justify-between gap-16 px-16 pb-20 transition-all duration-700 delay-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
          )}
        >
          {/* Left - Text */}
          <div className="flex-1 flex flex-col justify-center max-w-[560px]">
            <span className="block mb-5 text-[11px] font-semibold uppercase tracking-[3px] text-[var(--brand-primary-light)] font-[var(--second-font)]">
              Architecture &amp; Design
            </span>

            <h1 className="mb-6 text-[52px] font-extrabold leading-[1.1] -tracking-[1px] text-white font-[var(--first-font)]">
              Design Your{" "}
              <span className="text-[var(--brand-primary-light)]">
                Dream Home
              </span>{" "}
              With Confidence
            </h1>

            <p className="mb-9 max-w-[420px] text-[15px] leading-[1.75] text-white/65 font-[var(--second-font)]">
              Explore professionally designed homes, customize your favorite
              plans, and estimate your building cost — all in one place.
            </p>

            <div className="flex gap-3">
              <button className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[var(--brand-primary)] text-white border border-[var(--brand-primary)] font-medium text-[14px] cursor-pointer transition-transform duration-300 hover:scale-[1.02] font-[var(--second-font)]">
                <span>Explore Plans</span>
                <span className="w-7 h-7 rounded-full border border-white/40 inline-flex items-center justify-center text-[13px] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
              <button className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-transparent text-white border border-white/50 font-medium text-[14px] cursor-pointer overflow-hidden transition-colors duration-300 hover:text-[var(--brand-secondary)] font-[var(--second-font)]">
                <span className="absolute inset-0 bg-white -translate-x-[101%] transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
                <span className="relative z-10" onClick={() => navigate('/cost-calculator')}>Calculate Cost</span>
                <span className="relative z-10 w-7 h-7 rounded-full border border-white/40 inline-flex items-center justify-center text-[13px] transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>
            </div>
          </div>

          {/* Right - Stats & Marquee */}
          <div className="w-[400px] shrink-0 flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-7 shadow-xl">
              <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div>
                  <div className="text-[28px] font-bold leading-none -tracking-[0.5px] text-white font-[var(--first-font)]">
                    150+
                  </div>
                  <div className="mt-1 text-[13px] text-white/50 font-[var(--second-font)]">
                    Projects Delivered
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <div className="flex justify-between mb-2 text-[13px] text-white/55 font-[var(--second-font)]">
                  <span>Client Satisfaction</span>
                  <span className="text-white font-semibold">98%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-white to-white/50" />
                </div>
              </div>

              <div className="h-px bg-white/10 mb-5" />

              <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center text-center gap-2">
                {[
                  ["5+", "Years"],
                  ["24/7", "Support"],
                  ["100%", "Quality"],
                ].map(([val, label], i) => (
                  <>
                    {i > 0 && (
                      <div key={`d${i}`} className="w-px h-8 bg-white/10" />
                    )}
                    <div key={val} className="flex flex-col gap-1">
                      <span className="text-[17px] font-bold text-white font-[var(--first-font)]">
                        {val}
                      </span>
                      <span className="text-[10px] text-white/45 uppercase tracking-wider font-[var(--second-font)]">
                        {label}
                      </span>
                    </div>
                  </>
                ))}
              </div>

              <div className="flex gap-2 mt-5 flex-wrap">
                <div className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-medium text-white/75 uppercase tracking-wider font-[var(--second-font)]">
                  <span className="relative inline-flex w-2 h-2">
                    <span className="absolute inset-0 rounded-full bg-emerald-400/75 animate-ping" />
                    <span className="relative inline-block w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                  Active
                </div>
                <div className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-1.5 rounded-full text-[10px] font-medium text-white/75 uppercase tracking-wider font-[var(--second-font)]">
                  ★ Premium
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl pt-5 pb-5 overflow-hidden">
              <p className="px-6 mb-4 text-[12px] tracking-wide text-white/45 font-[var(--second-font)]">
                Trusted by Industry Leaders
              </p>
              <div
                className="overflow-hidden"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
              >
                <div className="flex gap-8 whitespace-nowrap animate-marquee">
                  {[...CLIENTS, ...CLIENTS, ...CLIENTS].map((client, i) => (
                    <span
                      key={i}
                      className="text-[14px] font-bold text-white/80 hover:text-white transition-colors cursor-default shrink-0 font-[var(--first-font)]"
                    >
                      {client}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
