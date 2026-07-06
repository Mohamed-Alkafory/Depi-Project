// import { Outlet } from "react-router-dom";

// export default function WebsiteLayout() {
//   return (
//     <>
//       {/* Navbar */}

//       <Outlet />

//       {/* Footer */}
//     </>
//   );
// // }
// // src/components/layout/WebsiteLayout.jsx
// import { Outlet, Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   Home,
//   LayoutGrid,
//   Heart,
//   ShoppingCart,
//   Calculator,
//   Menu,
//   X,
//   User,
//   LogIn,
// } from "lucide-react";
// import { useAuthStore } from "@/features/auth/store/authStore";

// export default function WebsiteLayout() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const location = useLocation();
//   const { user, isAuthenticated, logout } = useAuthStore();

//   const navLinks = [
//     { to: "/", label: "Home", icon: Home },
//     { to: "/plans", label: "Plans", icon: LayoutGrid },
//     { to: "/favorites", label: "Favorites", icon: Heart },
//     { to: "/cart", label: "Cart", icon: ShoppingCart },
//     { to: "/cost-calculator", label: "Calculator", icon: Calculator },
//   ];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo */}
//             <Link
//               to="/"
//               className="text-2xl font-bold text-teal-600 tracking-tight"
//             >
//               HOMI
//             </Link>

//             {/* Desktop Nav */}
//             <div className="hidden md:flex items-center gap-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.to}
//                   to={link.to}
//                   className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     isActive(link.to)
//                       ? "text-teal-600 bg-teal-50"
//                       : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
//                   }`}
//                 >
//                   <link.icon size={18} />
//                   {link.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Auth Buttons */}
//             <div className="hidden md:flex items-center gap-3">
//               {isAuthenticated ? (
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600">{user?.email}</span>
//                   <button
//                     onClick={logout}
//                     className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <Link
//                   to="/test-auth"
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
//                 >
//                   <LogIn size={16} />
//                   Sign In
//                 </Link>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Nav */}
//         {mobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 bg-white">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.to}
//                 to={link.to}
//                 onClick={() => setMobileMenuOpen(false)}
//                 className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
//                   isActive(link.to)
//                     ? "text-teal-600 bg-teal-50"
//                     : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
//                 }`}
//               >
//                 <link.icon size={18} />
//                 {link.label}
//               </Link>
//             ))}

//             {/* Mobile Auth */}
//             <div className="border-t border-gray-200 px-4 py-3">
//               {isAuthenticated ? (
//                 <button
//                   onClick={() => {
//                     logout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="flex items-center gap-2 text-sm font-medium text-red-600"
//                 >
//                   <User size={18} />
//                   Logout ({user?.email})
//                 </button>
//               ) : (
//                 <Link
//                   to="/test-auth"
//                   onClick={() => setMobileMenuOpen(false)}
//                   className="flex items-center gap-2 text-sm font-medium text-teal-600"
//                 >
//                   <LogIn size={18} />
//                   Sign In
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </nav>

//       {/* Content */}
//       <main className="min-h-[calc(100vh-4rem-4rem)]">
//         <Outlet />
//       </main>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//             <div className="text-xl font-bold text-teal-600">HOMI</div>
//             <div className="flex items-center gap-6 text-sm text-gray-500">
//               <Link
//                 to="/about"
//                 className="hover:text-teal-600 transition-colors"
//               >
//                 About
//               </Link>
//               <Link
//                 to="/contact"
//                 className="hover:text-teal-600 transition-colors"
//               >
//                 Contact
//               </Link>
//               <Link
//                 to="/plans"
//                 className="hover:text-teal-600 transition-colors"
//               >
//                 Plans
//               </Link>
//             </div>
//             <p className="text-sm text-gray-400">
//               © 2026 HOMI. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
// src/components/layout/WebsiteLayout.jsx
import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Home, Info, Mail, Menu, X, LogIn } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";

export default function WebsiteLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-teal-600 tracking-tight"
            >
              HOMI
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.to)
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                  }`}
                >
                  <link.icon size={18} />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/plans"
                    className="px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                  >
                    Go to Plans
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/test-auth"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-600 hover:text-teal-600 hover:bg-teal-50"
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-200 px-4 py-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/plans"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-teal-600 mb-2"
                  >
                    Go to Plans
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/test-auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-teal-600"
                >
                  <LogIn size={18} />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Content */}
      <main className="min-h-[calc(100vh-4rem-4rem)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-bold text-teal-600">HOMI</div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link
                to="/about"
                className="hover:text-teal-600 transition-colors"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:text-teal-600 transition-colors"
              >
                Contact
              </Link>
              <Link
                to="/plans"
                className="hover:text-teal-600 transition-colors"
              >
                Plans
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2026 HOMI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
