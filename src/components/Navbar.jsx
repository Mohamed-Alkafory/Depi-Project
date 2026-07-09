// // src/components/layout/Navbar.jsx
// import { motion } from "framer-motion";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import {
//   Menu,
//   X,
//   ArrowRight,
//   ChevronDown,
//   LayoutDashboard,
//   User,
//   Heart,
//   ShoppingCart,
//   Package,
//   Shield,
//   LogOut,
//   Mail,
// } from "lucide-react";
// import { useAuthStore } from "@/features/auth/store/authStore";
// import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
// import { AuthModal } from "@/features/auth/components/AuthModal";

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [pastHero, setPastHero] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const observerRef = useRef(null);
//   const userMenuRef = useRef(null);

//   const { user, profile, isAuthenticated, logout } = useAuthStore();
//   const isAdmin = useIsAdmin();

//   const isModalOpen = useAuthStore((s) => s.isModalOpen);
//   const modalMode = useAuthStore((s) => s.modalMode);
//   const redirectTo = useAuthStore((s) => s.redirectTo);
//   const openModal = useAuthStore((s) => s.openModal);
//   const closeModal = useAuthStore((s) => s.closeModal);

//   const isHomePage = location.pathname === "/";

//   const navLinks = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/#how-it-works", label: "How It Works" },
//     { to: "/#services", label: "Services" },
//     { to: "/plans", label: "Plans" },
//     { to: "/contact", label: "Contact" },
//   ];

//   const userMenuItems = isAdmin
//     ? [
//         { to: "/admin/overview", label: "Overview", icon: LayoutDashboard },
//         { to: "/admin/plans", label: "Plans Management", icon: Shield },
//         { to: "/admin/orders", label: "Orders", icon: Package },
//         { to: "/admin/contacts", label: "Contacts", icon: Mail },
//         { to: "/admin/users", label: "Users", icon: User },
//         { to: "/profile", label: "Account", icon: User },
//       ]
//     : [
//         { to: "/profile", label: "Account", icon: User },
//         { to: "/favorites", label: "Favorites", icon: Heart },
//         { to: "/cart", label: "Cart", icon: ShoppingCart },
//         { to: "/orders", label: "Orders", icon: Package },
//       ];

//   const isActive = (path) => {
//     if (path.startsWith("/#")) return false;
//     return location.pathname === path;
//   };

//   const handleHashClick = (to, e) => {
//     if (to.startsWith("/#")) {
//       const id = to.replace("/#", "");
//       const el = document.getElementById(id);
//       if (el) {
//         e.preventDefault();
//         el.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   useEffect(() => {
//     const hash = location.hash.replace("#", "");
//     if (hash) {
//       const el = document.getElementById(hash);
//       if (el) {
//         setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
//       }
//     }
//   }, [location]);

//   useEffect(() => {
//     setMobileMenuOpen(false);
//     setUserMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
//         setUserMenuOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (observerRef.current) {
//       observerRef.current.disconnect();
//       observerRef.current = null;
//     }

//     if (!isHomePage) {
//       setPastHero(true);
//       return;
//     }

//     setPastHero(false);

//     const raf = requestAnimationFrame(() => {
//       const main = document.querySelector("main");
//       if (!main) return;

//       const hero = main.firstElementChild;
//       if (!hero) return;

//       observerRef.current = new IntersectionObserver(
//         ([entry]) => {
//           setPastHero(!entry.isIntersecting);
//         },
//         { rootMargin: "-20% 0px 0px 0px", threshold: 0 },
//       );

//       observerRef.current.observe(hero);
//     });

//     return () => {
//       cancelAnimationFrame(raf);
//     };
//   }, [isHomePage]);

//   const linkClass = (path) =>
//     `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
//       isActive(path)
//         ? "text-[#008080]"
//         : pastHero
//           ? "text-[#1F2937] hover:text-[#008080]"
//           : "text-white/90 hover:text-white"
//     }`;

//   const activeUnderline = (path) =>
//     isActive(path) ? (
//       <span className="absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#008080]" />
//     ) : null;

//   const hoverUnderline =
//     "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-[#008080] after:transition-all after:duration-300 hover:after:w-5 hover:after:-translate-x-1/2";

//   const handleAuthSuccess = () => {
//     if (redirectTo) {
//       navigate(redirectTo);
//     }
//   };

//   const handleLogout = async () => {
//     await logout();
//     setUserMenuOpen(false);
//     navigate("/");
//   };

//   const avatarUrl = profile?.avatar_url;
//   const displayName =
//     profile?.full_name || user?.user_metadata?.full_name || user?.email;
//   const firstLetter = (user?.email?.[0] || "U").toUpperCase();

//   return (
//     <>
//       <motion.nav
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.4, delay: 0.1 }}
//         className={`fixed top-0 left-0 z-50 w-full transition-all duration-[400ms] ${
//           pastHero
//             ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px]"
//             : "bg-transparent shadow-none"
//         }`}
//         style={{
//           backgroundColor: pastHero ? "rgba(255,255,255,0.88)" : "transparent",
//           borderBottom: pastHero ? "1px solid rgba(0,0,0,0.05)" : "none",
//         }}
//       >
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="flex h-20 items-center justify-between">
//             <motion.div
//               initial={{ x: -40, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{
//                 duration: 0.6,
//                 ease: [0.16, 1, 0.3, 1],
//                 delay: 0.2,
//               }}
//             >
//               <Link to="/" className="flex-shrink-0">
//                 <img
//                   src="/Homi logo2.png"
//                   alt="HOMI"
//                   className="h-[42px] w-auto object-contain"
//                   onError={(e) => {
//                     e.target.style.display = "none";
//                   }}
//                 />
//               </Link>
//             </motion.div>

//             <motion.div
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{
//                 duration: 0.5,
//                 ease: [0.16, 1, 0.3, 1],
//                 delay: 0.35,
//               }}
//               className="hidden md:flex items-center gap-8"
//             >
//               {navLinks.map((link, i) => (
//                 <motion.div
//                   key={link.to}
//                   initial={{ y: -16, opacity: 0 }}
//                   animate={{ y: 0, opacity: 1 }}
//                   transition={{
//                     duration: 0.4,
//                     ease: [0.16, 1, 0.3, 1],
//                     delay: 0.35 + i * 0.08,
//                   }}
//                 >
//                   <Link
//                     to={link.to}
//                     onClick={(e) => handleHashClick(link.to, e)}
//                     className={`${linkClass(link.to)} ${hoverUnderline}`}
//                   >
//                     {link.label}
//                     {activeUnderline(link.to)}
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>

//             <motion.div
//               initial={{ x: 40, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{
//                 duration: 0.6,
//                 ease: [0.16, 1, 0.3, 1],
//                 delay: 0.2,
//               }}
//               className="hidden md:flex items-center gap-4"
//             >
//               {isAuthenticated ? (
//                 <div className="relative" ref={userMenuRef}>
//                   <button
//                     onClick={() => setUserMenuOpen((v) => !v)}
//                     className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
//                       pastHero
//                         ? "text-[#1F2937] hover:text-[#008080]"
//                         : "text-white/90 hover:text-white"
//                     }`}
//                   >
//                     {avatarUrl ? (
//                       <img
//                         src={avatarUrl}
//                         alt="Avatar"
//                         className="h-8 w-8 rounded-full object-cover"
//                       />
//                     ) : (
//                       <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#008080] text-xs font-semibold text-white">
//                         {firstLetter}
//                       </span>
//                     )}
//                     <span className="max-w-[120px] truncate">
//                       {displayName}
//                     </span>
//                     <ChevronDown
//                       size={16}
//                       className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
//                     />
//                   </button>

//                   {userMenuOpen && (
//                     <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
//                       {userMenuItems.map((item) => (
//                         <Link
//                           key={item.to}
//                           to={item.to}
//                           className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1F2937] transition-colors hover:bg-gray-50 hover:text-[#008080]"
//                         >
//                           <item.icon size={16} />
//                           {item.label}
//                         </Link>
//                       ))}
//                       <div className="my-1 border-t border-gray-100" />
//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
//                       >
//                         <LogOut size={16} />
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="flex items-center gap-3">
//                   <button
//                     onClick={() => openModal("signin")}
//                     className={`text-sm font-semibold transition-colors duration-300 ${
//                       pastHero
//                         ? "text-[#1F2937] hover:text-[#008080]"
//                         : "text-white/90 hover:text-white"
//                     }`}
//                   >
//                     Sign In
//                   </button>
//                   <button
//                     onClick={() => openModal("signup")}
//                     className="group relative flex h-12 items-center gap-4 overflow-hidden rounded-full border border-[rgba(0,128,128,0.15)] bg-white pl-6 pr-[14px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] active:scale-[0.98]"
//                   >
//                     <div className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#008080] transition-transform duration-[350ms] ease-in-out group-hover:scale-x-100" />
//                     <span className="relative z-10 text-sm font-semibold text-[#1F2937] transition-colors duration-300 group-hover:text-white">
//                       Sign Up
//                     </span>
//                     <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008080]">
//                       <ArrowRight
//                         size={16}
//                         className="text-white transition-transform duration-[350ms] ease-in-out group-hover:translate-x-[6px]"
//                       />
//                     </div>
//                   </button>
//                 </div>
//               )}
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{
//                 duration: 0.4,
//                 ease: [0.16, 1, 0.3, 1],
//                 delay: 0.45,
//               }}
//             >
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className={`md:hidden flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
//                   pastHero
//                     ? "text-[#1F2937] hover:bg-gray-100"
//                     : "text-white/90 hover:bg-white/10"
//                 }`}
//               >
//                 {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
//               </button>
//             </motion.div>
//           </div>
//         </div>

//         <div
//           className={`fixed inset-0 top-0 z-40 flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-500 ${
//             mobileMenuOpen
//               ? "pointer-events-auto opacity-100"
//               : "pointer-events-none opacity-0"
//           } md:hidden`}
//         >
//           <div className="flex h-20 items-center justify-end px-4 sm:px-6">
//             <button
//               onClick={() => setMobileMenuOpen(false)}
//               className="flex items-center justify-center rounded-xl p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
//             >
//               <X size={22} />
//             </button>
//           </div>

//           <div className="flex flex-1 flex-col items-center justify-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 onClick={(e) => {
//                   setMobileMenuOpen(false);
//                   handleHashClick(link.to, e);
//                 }}
//                 className={`text-2xl font-medium tracking-wide transition-colors duration-300 ${
//                   isActive(link.to)
//                     ? "text-[#008080]"
//                     : "text-white/80 hover:text-white"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {isAuthenticated &&
//               userMenuItems.map((item) => (
//                 <Link
//                   key={item.to}
//                   to={item.to}
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center gap-2 text-lg font-medium text-white/70 hover:text-white"
//                 >
//                   <item.icon size={18} />
//                   {item.label}
//                 </Link>
//               ))}
//           </div>

//           <div className="border-t border-white/10 px-6 py-8">
//             {isAuthenticated ? (
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setMobileMenuOpen(false);
//                 }}
//                 className="w-full rounded-2xl bg-red-500/10 px-6 py-3.5 text-center text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
//               >
//                 Logout
//               </button>
//             ) : (
//               <div className="flex flex-col gap-3">
//                 <button
//                   onClick={() => {
//                     openModal("signin");
//                     setMobileMenuOpen(false);
//                   }}
//                   className="w-full rounded-2xl border border-white/20 px-6 py-3.5 text-center text-sm font-medium text-white/90 hover:border-white/40"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   onClick={() => {
//                     openModal("signup");
//                     setMobileMenuOpen(false);
//                   }}
//                   className="w-full rounded-2xl bg-[#008080] px-6 py-3.5 text-center text-sm font-semibold text-white"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.nav>

//       <AuthModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         defaultMode={modalMode}
//         onSuccess={handleAuthSuccess}
//       />
//     </>
//   );
// }
// src/components/layout/Navbar.jsx
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  LayoutDashboard,
  User,
  Heart,
  ShoppingCart,
  Package,
  Shield,
  LogOut,
  Mail,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useIsAdmin } from "@/features/auth/hooks/useIsAdmin";
import { AuthModal } from "@/features/auth/components/AuthModal";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const userMenuRef = useRef(null);

  const { user, profile, isAuthenticated, logout } = useAuthStore();
  const isAdmin = useIsAdmin();

  const isModalOpen = useAuthStore((s) => s.isModalOpen);
  const modalMode = useAuthStore((s) => s.modalMode);
  const redirectTo = useAuthStore((s) => s.redirectTo);
  const openModal = useAuthStore((s) => s.openModal);
  const closeModal = useAuthStore((s) => s.closeModal);

  const isHomePage = location.pathname === "/";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/#how-it-works", label: "How It Works" },
    { to: "/#services", label: "Services" },
    { to: "/plans", label: "Plans" },
    { to: "/contact", label: "Contact" },
  ];

  const userMenuItems = isAdmin
    ? [
        { to: "/admin/overview", label: "Overview", icon: LayoutDashboard },
        { to: "/admin/plans", label: "Plans Management", icon: Shield },
        { to: "/admin/orders", label: "Orders", icon: Package },
        { to: "/admin/contacts", label: "Contacts", icon: Mail },
        { to: "/admin/users", label: "Users", icon: User },
        { to: "/profile", label: "Account", icon: User },
      ]
    : [
        { to: "/profile", label: "Account", icon: User },
        { to: "/favorites", label: "Favorites", icon: Heart },
        { to: "/cart", label: "Cart", icon: ShoppingCart },
        { to: "/orders", label: "Orders", icon: Package },
      ];

  const isActive = (path) => {
    if (path.startsWith("/#")) return false;
    return location.pathname === path;
  };

  const handleHashClick = (to, e) => {
    if (to.startsWith("/#")) {
      const id = to.replace("/#", "");
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
      }
    }
  }, [location]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!isHomePage) {
      setPastHero(true);
      return;
    }

    setPastHero(false);

    const raf = requestAnimationFrame(() => {
      const main = document.querySelector("main");
      if (!main) return;

      const hero = main.firstElementChild;
      if (!hero) return;

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          setPastHero(!entry.isIntersecting);
        },
        { rootMargin: "-20% 0px 0px 0px", threshold: 0 },
      );

      observerRef.current.observe(hero);
    });

    return () => {
      cancelAnimationFrame(raf);
    };
  }, [isHomePage]);

  const linkClass = (path) =>
    `relative text-sm font-medium tracking-wide transition-colors duration-300 ${
      isActive(path)
        ? "text-[#008080]"
        : pastHero
          ? "text-[#1F2937] hover:text-[#008080]"
          : "text-white/90 hover:text-white"
    }`;

  const activeUnderline = (path) =>
    isActive(path) ? (
      <span className="absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#008080]" />
    ) : null;

  const hoverUnderline =
    "after:absolute after:-bottom-1 after:left-1/2 after:h-[2px] after:w-0 after:rounded-full after:bg-[#008080] after:transition-all after:duration-300 hover:after:w-5 hover:after:-translate-x-1/2";

  const handleAuthSuccess = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const avatarUrl = profile?.avatar_url;
  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email;
  const firstLetter = (user?.email?.[0] || "U").toUpperCase();

  // ✅ لون الفاصل بيتغير حسب حالة الـ pastHero زي باقي عناصر الـ Navbar
  const dividerClass = pastHero ? "border-black/10" : "border-white/20";

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-[400ms] ${
          pastHero
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-[10px]"
            : "bg-transparent shadow-none"
        }`}
        style={{
          backgroundColor: pastHero ? "rgba(255,255,255,0.88)" : "transparent",
          borderBottom: pastHero ? "1px solid rgba(0,0,0,0.05)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[auto_1fr_auto] items-center h-20">
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
              }}
            >
              <Link to="/" className="flex-shrink-0">
                <img
                  src="/Homi logo2.png"
                  alt="HOMI"
                  className="h-[42px] w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.35,
              }}
              className="hidden md:flex items-center justify-center gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.35 + i * 0.08,
                  }}
                >
                  <Link
                    to={link.to}
                    onClick={(e) => handleHashClick(link.to, e)}
                    className={`${linkClass(link.to)} ${hoverUnderline}`}
                  >
                    {link.label}
                    {activeUnderline(link.to)}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center justify-end gap-3">
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2,
                }}
                // ✅ فاصل بصري (border-l) بيبيّن إن الجزء ده منطقة تانية
                // (User / Auth) عن الـ Navigation اللي جنبها
                // className={`hidden md:flex items-center gap-4 border-l ${dividerClass} pl-6 transition-colors duration-300`}
              >
                {isAuthenticated ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen((v) => !v)}
                      className={`flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                        pastHero
                          ? "text-[#1F2937] hover:text-[#008080]"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          alt="Avatar"
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#008080] text-xs font-semibold text-white">
                          {firstLetter}
                        </span>
                      )}
                      <span className="max-w-[120px] truncate">
                        {displayName}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-black/5 bg-white py-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1F2937] transition-colors hover:bg-gray-50 hover:text-[#008080]"
                          >
                            <item.icon size={16} />
                            {item.label}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-gray-100" />
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 transition-colors hover:bg-red-50"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openModal("signin")}
                      className={`text-sm font-semibold transition-colors duration-300 ${
                        pastHero
                          ? "text-[#1F2937] hover:text-[#008080]"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => openModal("signup")}
                      className="group relative flex h-12 items-center gap-4 overflow-hidden rounded-full border border-[rgba(0,128,128,0.15)] bg-white pl-6 pr-[14px] shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 origin-right scale-x-0 rounded-full bg-[#008080] transition-transform duration-[350ms] ease-in-out group-hover:scale-x-100" />
                      <span className="relative z-10 text-sm font-semibold text-[#1F2937] transition-colors duration-300 group-hover:text-white">
                        Sign Up
                      </span>
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#008080]">
                        <ArrowRight
                          size={16}
                          className="text-white transition-transform duration-[350ms] ease-in-out group-hover:translate-x-[6px]"
                        />
                      </div>
                    </button>
                  </div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.45,
                }}
              >
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`md:hidden flex items-center justify-center rounded-xl p-2.5 transition-all duration-300 ${
                    pastHero
                      ? "text-[#1F2937] hover:bg-gray-100"
                      : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 top-0 z-40 flex flex-col bg-black/95 backdrop-blur-xl transition-all duration-500 ${
            mobileMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          } md:hidden`}
        >
          <div className="flex h-20 items-center justify-end px-4 sm:px-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center rounded-xl p-2.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleHashClick(link.to, e);
                }}
                className={`text-2xl font-medium tracking-wide transition-colors duration-300 ${
                  isActive(link.to)
                    ? "text-[#008080]"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAuthenticated &&
              userMenuItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-white/70 hover:text-white"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
          </div>

          <div className="border-t border-white/10 px-6 py-8">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full rounded-2xl bg-red-500/10 px-6 py-3.5 text-center text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    openModal("signin");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-2xl border border-white/20 px-6 py-3.5 text-center text-sm font-medium text-white/90 hover:border-white/40"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openModal("signup");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-2xl bg-[#008080] px-6 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultMode={modalMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
}
