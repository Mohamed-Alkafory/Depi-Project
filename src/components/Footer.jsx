// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/features/auth/store/authStore";

function HouseIllustration() {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -right-20 top-1/2 -translate-y-1/2 h-[500px] w-auto opacity-[0.08]"
      aria-hidden="true"
    >
      <path
        d="M380 120 L520 220 L520 480 L380 480 L380 320 L300 260 L220 320 L220 480 L80 480 L80 220 L220 120 Z"
        stroke="white"
        strokeWidth="0.8"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="300"
        y1="260"
        x2="300"
        y2="200"
        stroke="white"
        strokeWidth="0.6"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="260"
        y1="230"
        x2="260"
        y2="180"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="340"
        y1="230"
        x2="340"
        y2="180"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="140"
        y="300"
        width="40"
        height="80"
        stroke="white"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="340"
        y="350"
        width="25"
        height="130"
        stroke="white"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="420"
        y="380"
        width="60"
        height="40"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <rect
        x="420"
        y="430"
        width="60"
        height="50"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="100"
        y1="200"
        x2="100"
        y2="160"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="100"
        y1="160"
        x2="180"
        y2="110"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="180"
        y1="110"
        x2="180"
        y2="140"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M200 480 L200 420 Q200 400 220 400 L260 400"
        stroke="white"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <circle
        cx="460"
        cy="260"
        r="20"
        stroke="white"
        strokeWidth="0.4"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <circle
        cx="460"
        cy="260"
        r="8"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <line
        x1="460"
        y1="240"
        x2="460"
        y2="220"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="460"
        y1="280"
        x2="460"
        y2="300"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="440"
        y1="260"
        x2="420"
        y2="260"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />
      <line
        x1="480"
        y1="260"
        x2="500"
        y2="260"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M320 380 Q360 370 380 390"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
      <path
        d="M350 400 Q370 395 390 410"
        stroke="white"
        strokeWidth="0.3"
        vectorEffect="non-scaling-stroke"
        fill="none"
      />
    </svg>
  );
}

const quickLinks = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Plans", to: "/plans" },
  { name: "Contact", to: "/contact" },
];

const servicesLinks = [
  { name: "Cost Calculator", to: "/cost-calculator" },
  { name: "Favorites", to: "/favorites" },
  { name: "Cart", to: "/cart" },
];

const exploreLinks = [
  { name: "Profile", to: "/profile" },
  { name: "Orders", to: "/orders" },
];

const socialIcons = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    path: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z m0 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z m-5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z m0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z m5-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
  },
  {
    name: "X",
    href: "https://x.com",
    path: "M4 4l5.5 7.2L4 20h2l4.5-6.2L14.5 20H20l-5.8-7.7L19.5 4h-2l-4.2 5.8L9.5 4H4z",
  },
];

const contactInfo = [
  { icon: Mail, label: "Email", value: "Homi@gmail.com" },
  { icon: Phone, label: "Phone", value: "+20 100 123 4567" },
  { icon: MapPin, label: "Location", value: "Cairo, Egypt" },
];

const footerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const footerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div
        style={{
          background: "linear-gradient(180deg, #008080 0%, #00736F 100%)",
        }}
      >
        {/* ✅ غيرت pt-20 → pt-12 و pb-[60px] → pb-8 */}
        <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
          <HouseIllustration />
          {/* ✅ غيرت gap-16 → gap-10 */}
          <motion.div
            className="relative z-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5"
            variants={footerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div variants={footerItem} className="flex flex-col">
              <Link to="/" className="inline-flex w-fit -mt-4">
                <img
                  src="/Homi logo2.png"
                  alt="HOMI"
                  className="h-11 w-auto brightness-0 invert mb-4"
                />
              </Link>
              {/* ✅ غيرت mt-6 → mt-4 */}
              <p
                className="mt-4 text-sm leading-[1.8]"
                style={{ color: "rgba(255,255,255,0.80)" }}
              >
                HOMI is a premium platform for architectural house designs,
                floor plans, and AI-powered home visualization.
              </p>
              {/* ✅ غيرت mt-8 → mt-5 */}
              <div className="mt-5 flex items-center gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-[3px] hover:bg-white hover:text-[#008080] hover:shadow-[0_10px_25px_rgba(255,255,255,0.18)]"
                    style={{
                      backgroundColor: "transparent",
                      border: "1px solid rgba(255,255,255,0.20)",
                      color: "white",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={footerItem}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Quick Links
              </h3>
              {/* ✅ غيرت mt-7 → mt-5 و space-y-[18px] → space-y-3 */}
              <ul className="mt-5 space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={footerItem}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Services
              </h3>
              {/* ✅ غيرت mt-7 → mt-5 و space-y-[18px] → space-y-3 */}
              <ul className="mt-5 space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={footerItem}>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                Explore
              </h3>
              {/* ✅ غيرت mt-7 → mt-5 و space-y-[18px] → space-y-3 */}
              <ul className="mt-5 space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
                      style={{ color: "rgba(255,255,255,0.80)" }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* ✅ غيرت gap-6 → gap-4 */}
            <motion.div variants={footerItem} className="flex flex-col gap-4">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">
                  Contact
                </h3>
                {/* ✅ غيرت mt-7 → mt-5 و space-y-[18px] → space-y-3 */}
                <ul className="mt-5 space-y-3">
                  {contactInfo.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <item.icon
                        size={15}
                        className="mt-0.5 shrink-0"
                        style={{ color: "rgba(255,255,255,0.60)" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: "rgba(255,255,255,0.80)" }}
                      >
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
                style={{
                  background: "#F4FCFB",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
                }}
              >
                <h4 className="text-sm font-bold" style={{ color: "#006D6D" }}>
                  Get Started
                </h4>
                <p className="mt-2 text-xs" style={{ color: "#4B5563" }}>
                  Explore our plans and find your dream design.
                </p>
                <Link
                  to="/plans"
                  className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.97]"
                  style={{ backgroundColor: "#008080" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#006D6D")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#008080")
                  }
                >
                  View Plans
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <div className="mx-auto max-w-7xl px-4 py-[22px] text-center sm:px-6 lg:px-8">
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              &copy; 2026 HOMI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
