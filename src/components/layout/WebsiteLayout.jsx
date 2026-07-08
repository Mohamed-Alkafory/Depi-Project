// // // // // import { Outlet, Link, useLocation } from "react-router-dom";
// // // // // import { useState, useEffect, useRef } from "react";
// // // // // import { Menu, X, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
// // // // // import { motion } from "framer-motion";
// // // // // import { useAuthStore } from "@/features/auth/store/authStore";

// // // // // export default function WebsiteLayout() {
// // // // //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// // // // //   const [pastHero, setPastHero] = useState(true);
// // // // //   const location = useLocation();
// // // // //   const observerRef = useRef(null);
// // // // //   const { user, isAuthenticated, logout } = useAuthStore();

// // // // //   const isHomePage = location.pathname === "/";

// // // // //   const navLinks = [
// // // // //     { to: "/", label: "Home" },
// // // // //     { to: "/about", label: "About" },
// // // // //     { to: "/#how-it-works", label: "How It Works" },
// // // // //     { to: "/#services", label: "Services" },
// // // // //     { to: "/plans", label: "Pricing" },
// // // // //     { to: "/contact", label: "Contact" },
// // // // //   ];

// // // // //   const isActive = (path) => {
// // // // //     if (path.startsWith("/#")) return false;
// // // // //     return location.pathname === path;
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     setMobileMenuOpen(false);
// // // // //   }, [location.pathname]);

// // // // //   useEffect(() => {
// // // // //     if (observerRef.current) {
// // // // //       observerRef.current.disconnect();
// // // // //       observerRef.current = null;
// // // // //     }

// // // // //     if (!isHomePage) {
// // // // //       setPastHero(true);
// // // // //       return;
// // // // //     }

// // // // //     setPastHero(false);

// // // // //     const raf = requestAnimationFrame(() => {
// // // // //       const main = document.querySelector("main");
// // // // //       if (!main) return;

// // // // //       const hero = main.firstElementChild;
// // // // //       if (!hero) return;

// // // // //       observerRef.current = new IntersectionObserver(
// // // // //         ([entry]) => {
// // // // //           setPastHero(!entry.isIntersecting);
// // // // //         },
// // // // //         { threshold: 0 },
// // // // //       );

// // // // //       observerRef.current.observe(hero);
// // // // //     });

// // // // //     return () => {
// // // // //       cancelAnimationFrame(raf);
// // // // //     };
// // // // //   }, [isHomePage]);

// // // // //   const linkClass = (path) =>
// // // // //     `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
// // // // //       isActive(path)
// // // // //         ? "text-[#008080]"
// // // // //         : pastHero
// // // // //           ? "text-[#1F2937] hover:text-[#008080]"
// // // // //           : "text-white/90 hover:text-white"
// // // // //     }`;

// // // // //   const activeUnderline = (path) =>
// // // // //     isActive(path) ? (
// // // // //       <span className="absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#008080]" />
// // // // //     ) : null;

// // // // //   const hoverUnderline =
// // // // //     "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-[#008080] after:transition-all after:duration-300 hover:after:w-5 hover:after:-translate-x-1/2";

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       <nav
// // // // //         className={`fixed top-0 left-0 z-50 w-full transition-all duration-[400ms] ${
// // // // //           pastHero
// // // // //             ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px]"
// // // // //             : "bg-transparent shadow-none"
// // // // //         }`}
// // // // //         style={{
// // // // //           backgroundColor: pastHero ? "rgba(255,255,255,0.88)" : "transparent",
// // // // //           borderBottom: pastHero ? "1px solid rgba(0,0,0,0.05)" : "none",
// // // // //         }}
// // // // //       >
// // // // //         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
// // // // //           <div className="flex h-20 items-center justify-between">
// // // // //             <Link to="/" className="flex-shrink-0">
// // // // //               <img
// // // // //                 src="/Homi logo2.png"
// // // // //                 alt="HOMI"
// // // // //                 className="h-[42px] w-auto object-contain"
// // // // //                 onError={(e) => {
// // // // //                   e.target.style.display = "none";
// // // // //                 }}
// // // // //               />
// // // // //             </Link>

// // // // //             <div className="hidden md:flex items-center gap-8">
// // // // //               {navLinks.map((link) => (
// // // // //                 <Link
// // // // //                   key={link.to}
// // // // //                   to={link.to}
// // // // //                   className={`${linkClass(link.to)} ${hoverUnderline}`}
// // // // //                 >
// // // // //                   {link.label}
// // // // //                   {activeUnderline(link.to)}
// // // // //                 </Link>
// // // // //               ))}
// // // // //             </div>

// // // // //             <div className="hidden md:flex items-center gap-4">
// // // // //               {isAuthenticated ? (
// // // // //                 <div className="flex items-center gap-3">
// // // // //                   <Link
// // // // //                     to="/plans"
// // // // //                     className={`text-sm font-medium transition-colors duration-300 ${
// // // // //                       pastHero
// // // // //                         ? "text-teal-600 hover:text-teal-700"
// // // // //                         : "text-white/80 hover:text-white"
// // // // //                     }`}
// // // // //                   >
// // // // //                     Go to Plans
// // // // //                   </Link>
// // // // //                   <button
// // // // //                     onClick={logout}
// // // // //                     className={`text-sm font-medium transition-colors duration-300 ${
// // // // //                       pastHero
// // // // //                         ? "text-red-500 hover:text-red-600"
// // // // //                         : "text-white/70 hover:text-white"
// // // // //                     }`}
// // // // //                   >
// // // // //                     Logout
// // // // //                   </button>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <Link
// // // // //                   to="/test-auth"
// // // // //                   className="group relative flex h-12 items-center gap-4 overflow-hidden rounded-full border border-[rgba(0,128,128,0.15)] bg-white pl-6 pr-[14px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] active:scale-[0.98]"
// // // // //                 >
// // // // //                   <div className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#008080] transition-transform duration-[350ms] ease-in-out group-hover:scale-x-100" />
// // // // //                   <span className="relative z-10 text-sm font-semibold text-[#1F2937] transition-colors duration-300 group-hover:text-white">
// // // // //                     Sign In
// // // // //                   </span>
// // // // //                   <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008080]">
// // // // //                     <ArrowRight
// // // // //                       size={16}
// // // // //                       className="text-white transition-transform duration-[350ms] ease-in-out group-hover:translate-x-[6px]"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </Link>
// // // // //               )}
// // // // //             </div>

// // // // //             <button
// // // // //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// // // // //               className={`md:hidden flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
// // // // //                 pastHero
// // // // //                   ? "text-[#1F2937] hover:bg-gray-100"
// // // // //                   : "text-white/90 hover:bg-white/10"
// // // // //               }`}
// // // // //             >
// // // // //               {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div
// // // // //           className={`fixed inset-0 top-0 z-40 flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-500 ${
// // // // //             mobileMenuOpen
// // // // //               ? "pointer-events-auto opacity-100"
// // // // //               : "pointer-events-none opacity-0"
// // // // //           } md:hidden`}
// // // // //         >
// // // // //           <div className="flex h-20 items-center justify-end px-4 sm:px-6">
// // // // //             <button
// // // // //               onClick={() => setMobileMenuOpen(false)}
// // // // //               className="flex items-center justify-center rounded-xl p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
// // // // //             >
// // // // //               <X size={22} />
// // // // //             </button>
// // // // //           </div>

// // // // //           <div className="flex flex-1 flex-col items-center justify-center gap-8">
// // // // //             {navLinks.map((link) => (
// // // // //               <Link
// // // // //                 key={link.to}
// // // // //                 to={link.to}
// // // // //                 onClick={() => setMobileMenuOpen(false)}
// // // // //                 className={`text-2xl font-medium tracking-wide transition-colors duration-300 ${
// // // // //                   isActive(link.to)
// // // // //                     ? "text-[#008080]"
// // // // //                     : "text-white/80 hover:text-white"
// // // // //                 }`}
// // // // //               >
// // // // //                 {link.label}
// // // // //               </Link>
// // // // //             ))}
// // // // //           </div>

// // // // //           <div className="border-t border-white/10 px-6 py-8">
// // // // //             {isAuthenticated ? (
// // // // //               <div className="flex flex-col gap-4">
// // // // //                 <Link
// // // // //                   to="/plans"
// // // // //                   onClick={() => setMobileMenuOpen(false)}
// // // // //                   className="w-full rounded-2xl border border-white/20 px-6 py-3.5 text-center text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
// // // // //                 >
// // // // //                   Go to Plans
// // // // //                 </Link>
// // // // //                 <button
// // // // //                   onClick={() => {
// // // // //                     logout();
// // // // //                     setMobileMenuOpen(false);
// // // // //                   }}
// // // // //                   className="w-full rounded-2xl bg-red-500/10 px-6 py-3.5 text-center text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
// // // // //                 >
// // // // //                   Logout
// // // // //                 </button>
// // // // //               </div>
// // // // //             ) : (
// // // // //               <Link
// // // // //                 to="/test-auth"
// // // // //                 onClick={() => setMobileMenuOpen(false)}
// // // // //                 className="group relative flex h-12 w-full items-center justify-center gap-4 overflow-hidden rounded-full border border-[rgba(0,128,128,0.15)] bg-white pl-6 pr-[14px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] active:scale-[0.98]"
// // // // //               >
// // // // //                 <div className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#008080] transition-transform duration-[350ms] ease-in-out group-hover:scale-x-100" />
// // // // //                 <span className="relative z-10 text-sm font-semibold text-[#1F2937] transition-colors duration-300 group-hover:text-white">
// // // // //                   Sign In
// // // // //                 </span>
// // // // //                 <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008080]">
// // // // //                   <ArrowRight
// // // // //                     size={16}
// // // // //                     className="text-white transition-transform duration-[350ms] ease-in-out group-hover:translate-x-[6px]"
// // // // //                   />
// // // // //                 </div>
// // // // //               </Link>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </nav>

// // // // //       <main className={`min-h-screen ${location.pathname !== "/" ? "pt-20" : ""}`}>
// // // // //         <Outlet />
// // // // //       </main>

// // // // //       <Footer />
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // function HouseIllustration() {
// // // // //   return (
// // // // //     <svg
// // // // //       viewBox="0 0 600 600"
// // // // //       fill="none"
// // // // //       xmlns="http://www.w3.org/2000/svg"
// // // // //       className="absolute -right-20 top-1/2 -translate-y-1/2 h-[500px] w-auto opacity-[0.08]"
// // // // //       aria-hidden="true"
// // // // //     >
// // // // //       <path
// // // // //         d="M380 120 L520 220 L520 480 L380 480 L380 320 L300 260 L220 320 L220 480 L80 480 L80 220 L220 120 Z"
// // // // //         stroke="white"
// // // // //         strokeWidth="0.8"
// // // // //         vectorEffect="non-scaling-stroke"
// // // // //       />
// // // // //       <line x1="300" y1="260" x2="300" y2="200" stroke="white" strokeWidth="0.6" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="260" y1="230" x2="260" y2="180" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="340" y1="230" x2="340" y2="180" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <rect x="140" y="300" width="40" height="80" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
// // // // //       <rect x="340" y="350" width="25" height="130" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
// // // // //       <rect x="420" y="380" width="60" height="40" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <rect x="420" y="430" width="60" height="50" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="100" y1="200" x2="100" y2="160" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="100" y1="160" x2="180" y2="110" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="180" y1="110" x2="180" y2="140" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
// // // // //       <path d="M200 480 L200 420 Q200 400 220 400 L260 400" stroke="white" strokeWidth="0.5" vectorEffect="non-scaling-stroke" fill="none" />
// // // // //       <circle cx="460" cy="260" r="20" stroke="white" strokeWidth="0.4" vectorEffect="non-scaling-stroke" fill="none" />
// // // // //       <circle cx="460" cy="260" r="8" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" />
// // // // //       <line x1="460" y1="240" x2="460" y2="220" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="460" y1="280" x2="460" y2="300" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="440" y1="260" x2="420" y2="260" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
// // // // //       <line x1="480" y1="260" x2="500" y2="260" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" />
// // // // //       <path d="M320 380 Q360 370 380 390" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" />
// // // // //       <path d="M350 400 Q370 395 390 410" stroke="white" strokeWidth="0.3" vectorEffect="non-scaling-stroke" fill="none" />
// // // // //     </svg>
// // // // //   );
// // // // // }

// // // // // const quickLinks = [
// // // // //   { name: "Home", to: "/" },
// // // // //   { name: "About", to: "/about" },
// // // // //   { name: "Plans", to: "/plans" },
// // // // //   { name: "Contact", to: "/contact" },
// // // // // ];

// // // // // const servicesLinks = [
// // // // //   { name: "Cost Calculator", to: "/cost-calculator" },
// // // // //   { name: "Favorites", to: "/favorites" },
// // // // //   { name: "Cart", to: "/cart" },
// // // // // ];

// // // // // const exploreLinks = [
// // // // //   { name: "Profile", to: "/profile" },
// // // // //   { name: "Orders", to: "/orders" },
// // // // // ];

// // // // // const socialIcons = [
// // // // //   {
// // // // //     name: "Facebook",
// // // // //     href: "https://facebook.com",
// // // // //     path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
// // // // //   },
// // // // //   {
// // // // //     name: "Instagram",
// // // // //     href: "https://instagram.com",
// // // // //     path: "M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z m0 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10z m-5 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8z m0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z m5-2.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
// // // // //   },
// // // // //   {
// // // // //     name: "X",
// // // // //     href: "https://x.com",
// // // // //     path: "M4 4l5.5 7.2L4 20h2l4.5-6.2L14.5 20H20l-5.8-7.7L19.5 4h-2l-4.2 5.8L9.5 4H4z",
// // // // //   },
// // // // // ];

// // // // // const contactInfo = [
// // // // //   { icon: Mail, label: "Email", value: "Homi@gmail.com" },
// // // // //   { icon: Phone, label: "Phone", value: "+20 100 123 4567" },
// // // // //   { icon: MapPin, label: "Location", value: "Cairo, Egypt" },
// // // // // ];

// // // // // const footerContainer = {
// // // // //   hidden: { opacity: 0 },
// // // // //   visible: {
// // // // //     opacity: 1,
// // // // //     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
// // // // //   },
// // // // // };

// // // // // const footerItem = {
// // // // //   hidden: { opacity: 0, y: 30 },
// // // // //   visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
// // // // // };

// // // // // // footer items
// // // // // function Footer() {
// // // // //   return (
// // // // //     <footer className="relative overflow-hidden">
// // // // //       <div
// // // // //         style={{
// // // // //           background: "linear-gradient(180deg, #008080 0%, #00736F 100%)",
// // // // //         }}
// // // // //       >
// // // // //         <div className="mx-auto max-w-7xl px-4 pt-20 pb-[60px] sm:px-6 lg:px-8">
// // // // //           <HouseIllustration />
// // // // //           <motion.div
// // // // //             className="relative z-10 grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-5"
// // // // //             variants={footerContainer}
// // // // //             initial="hidden"
// // // // //             whileInView="visible"
// // // // //             viewport={{ once: true, amount: 0.15 }}
// // // // //           >
// // // // //             <motion.div variants={footerItem} className="flex flex-col">
// // // // //               <Link to="/" className="inline-flex w-fit -mt-0.5">
// // // // //                 <img
// // // // //                   src="/Homi logo2.png"
// // // // //                   alt="HOMI"
// // // // //                   className="h-11 w-auto brightness-0 invert"
// // // // //                 />
// // // // //               </Link>
// // // // //               <p className="mt-6 text-sm leading-[1.8]" style={{ color: "rgba(255,255,255,0.80)" }}>
// // // // //                 HOMI is a premium platform for architectural house designs, floor
// // // // //                 plans, and AI-powered home visualization.
// // // // //               </p>
// // // // //               <div className="mt-8 flex items-center gap-3">
// // // // //                 {socialIcons.map((social) => (
// // // // //                   <a
// // // // //                     key={social.name}
// // // // //                     href={social.href}
// // // // //                     target="_blank"
// // // // //                     rel="noopener noreferrer"
// // // // //                     aria-label={social.name}
// // // // //                     className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-[3px] hover:bg-white hover:text-[#008080] hover:shadow-[0_10px_25px_rgba(255,255,255,0.18)]"
// // // // //                     style={{
// // // // //                       backgroundColor: "transparent",
// // // // //                       border: "1px solid rgba(255,255,255,0.20)",
// // // // //                       color: "white",
// // // // //                     }}
// // // // //                   >
// // // // //                     <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
// // // // //                       <path d={social.path} />
// // // // //                     </svg>
// // // // //                   </a>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </motion.div>

// // // // //             <motion.div variants={footerItem}>
// // // // //               <h3 className="text-sm font-bold uppercase tracking-widest text-white">
// // // // //                 Quick Links
// // // // //               </h3>
// // // // //               <ul className="mt-7 space-y-[18px]">
// // // // //                 {quickLinks.map((link) => (
// // // // //                   <li key={link.name}>
// // // // //                     <Link
// // // // //                       to={link.to}
// // // // //                       className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
// // // // //                       style={{ color: "rgba(255,255,255,0.80)" }}
// // // // //                     >
// // // // //                       {link.name}
// // // // //                     </Link>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </motion.div>

// // // // //             <motion.div variants={footerItem}>
// // // // //               <h3 className="text-sm font-bold uppercase tracking-widest text-white">
// // // // //                 Services
// // // // //               </h3>
// // // // //               <ul className="mt-7 space-y-[18px]">
// // // // //                 {servicesLinks.map((link) => (
// // // // //                   <li key={link.name}>
// // // // //                     <Link
// // // // //                       to={link.to}
// // // // //                       className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
// // // // //                       style={{ color: "rgba(255,255,255,0.80)" }}
// // // // //                     >
// // // // //                       {link.name}
// // // // //                     </Link>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </motion.div>

// // // // //             <motion.div variants={footerItem}>
// // // // //               <h3 className="text-sm font-bold uppercase tracking-widest text-white">
// // // // //                 Explore
// // // // //               </h3>
// // // // //               <ul className="mt-7 space-y-[18px]">
// // // // //                 {exploreLinks.map((link) => (
// // // // //                   <li key={link.name}>
// // // // //                     <Link
// // // // //                       to={link.to}
// // // // //                       className="relative text-sm transition-all duration-300 hover:text-white after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
// // // // //                       style={{ color: "rgba(255,255,255,0.80)" }}
// // // // //                     >
// // // // //                       {link.name}
// // // // //                     </Link>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </motion.div>

// // // // //             <motion.div variants={footerItem} className="flex flex-col gap-6">
// // // // //               <div>
// // // // //                 <h3 className="text-sm font-bold uppercase tracking-widest text-white">
// // // // //                   Contact
// // // // //                 </h3>
// // // // //                 <ul className="mt-7 space-y-[18px]">
// // // // //                   {contactInfo.map((item) => (
// // // // //                     <li key={item.label} className="flex items-start gap-3">
// // // // //                       <item.icon size={15} className="mt-0.5 shrink-0" style={{ color: "rgba(255,255,255,0.60)" }} />
// // // // //                       <span className="text-sm" style={{ color: "rgba(255,255,255,0.80)" }}>
// // // // //                         {item.value}
// // // // //                       </span>
// // // // //                     </li>
// // // // //                   ))}
// // // // //                 </ul>
// // // // //               </div>

// // // // //               <div
// // // // //                 className="rounded-[18px] p-5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
// // // // //                 style={{
// // // // //                   background: "#F4FCFB",
// // // // //                   border: "1px solid rgba(255,255,255,0.25)",
// // // // //                   boxShadow: "0 12px 35px rgba(0,0,0,0.08)",
// // // // //                 }}
// // // // //               >
// // // // //                 <h4 className="text-sm font-bold" style={{ color: "#006D6D" }}>Get Started</h4>
// // // // //                 <p className="mt-2 text-xs" style={{ color: "#4B5563" }}>
// // // // //                   Explore our plans and find your dream design.
// // // // //                 </p>
// // // // //                 <Link
// // // // //                   to="/plans"
// // // // //                   className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-[2px] hover:shadow-lg active:scale-[0.97]"
// // // // //                   style={{ backgroundColor: "#008080" }}
// // // // //                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#006D6D"}
// // // // //                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#008080"}
// // // // //                 >
// // // // //                   View Plans
// // // // //                   <ArrowRight size={14} />
// // // // //                 </Link>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </motion.div>
// // // // //         </div>

// // // // //         <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
// // // // //           <div className="mx-auto max-w-7xl px-4 py-[22px] text-center sm:px-6 lg:px-8">
// // // // //             <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
// // // // //               &copy; 2026 HOMI. All rights reserved.
// // // // //             </p>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </footer>
// // // // //   );
// // // // // }
// // // // import { Outlet, useLocation } from "react-router-dom";
// // // // import Navbar from "../Navbar";
// // // // import Footer from "../Footer";

// // // // export default function WebsiteLayout() {
// // // //   const location = useLocation();

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <Navbar />

// // // //       <main
// // // //         className={`min-h-screen ${location.pathname !== "/" ? "pt-20" : ""}`}
// // // //       >
// // // //         <Outlet />
// // // //       </main>

// // // //       <Footer />
// // // //     </div>
// // // //   );
// // // // }
// // // src/components/layout/WebsiteLayout.jsx
// // import { Outlet, useLocation } from "react-router-dom";
// // import Navbar from "../Navbar";
// // import Footer from "../Footer";

// // export default function WebsiteLayout() {
// //   const location = useLocation();

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />

// //       <main
// //         className={`min-h-screen ${location.pathname !== "/" ? "pt-20" : ""}`}
// //       >
// //         <Outlet />
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }
// // // في WebsiteLayout.jsx — أضف ScrollTrigger.refresh
// // import { useEffect } from "react";
// // import { Outlet, useLocation } from "react-router-dom";
// // import Navbar from "../Navbar";
// // import Footer from "../Footer";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";

// // export default function WebsiteLayout() {
// //   const location = useLocation();

// //   useEffect(() => {
// //     // Refresh ScrollTrigger بعد كل route change
// //     const timer = setTimeout(() => {
// //       ScrollTrigger.refresh(true);
// //     }, 150);
// //     return () => clearTimeout(timer);
// //   }, [location.pathname]);

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navbar />
// //       <main
// //         className={`min-h-screen ${location.pathname !== "/" ? "pt-20" : ""}`}
// //       >
// //         <Outlet />
// //       </main>
// //       <Footer />
// //     </div>
// //   );
// // }

// // في WebsiteLayout.jsx
// import { useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Navbar from "../Navbar";
// import Footer from "../Footer";

// const HOME_SCROLL_KEY = "home_scroll_position";

// export default function WebsiteLayout() {
//   const location = useLocation();
//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     if (isHome) {
//       const saved = parseInt(
//         sessionStorage.getItem(HOME_SCROLL_KEY) || "0",
//         10,
//       );

//       requestAnimationFrame(() => {
//         window.scrollTo(0, saved);
//         ScrollTrigger.refresh(true);
//       });
//     }
//   }, [isHome]);

//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       if (isHome) {
//         sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//       if (isHome) {
//         sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
//       }
//     };
//   }, [isHome]);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <main className={`min-h-screen ${!isHome ? "pt-20" : ""}`}>
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar";
import Footer from "../Footer";

const HOME_SCROLL_KEY = "home_scroll_position";

export default function WebsiteLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  // ✅ لما تدخل الـ Home، ارجع الـ Scroll Position المحفوظ
  useEffect(() => {
    if (isHome) {
      const saved = parseInt(
        sessionStorage.getItem(HOME_SCROLL_KEY) || "0",
        10,
      );

      // استنى شوية لحد ما الـ DOM يجهز
      const timer = setTimeout(() => {
        window.scrollTo(0, saved);
        ScrollTrigger.refresh(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isHome]);

  // ✅ لما تسيب الـ Home، احفظ الـ Scroll Position
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isHome) {
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (isHome) {
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
      }
    };
  }, [isHome]);

  // ✅ لما الـ route يتغير من Home لحاجة تانية، احفظ الـ position
  useEffect(() => {
    return () => {
      if (isHome) {
        sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY));
      }
    };
  }, [location.pathname, isHome]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className={`min-h-screen ${!isHome ? "pt-20" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
