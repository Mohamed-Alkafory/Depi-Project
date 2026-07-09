// // // // // // src/router/ProtectedRoute.jsx
// // // // // import { Navigate } from "react-router-dom";
// // // // // import { useAuthStore } from "@/features/auth/store/authStore";

// // // // // export function ProtectedRoute({ children }) {
// // // // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // // // //   const loading = useAuthStore((s) => s.loading);

// // // // //   // Wait for auth init
// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
// // // // //         <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   // Redirect to home if not authenticated
// // // // //   if (!isAuthenticated) {
// // // // //     return <Navigate to="/" replace />;
// // // // //   }

// // // // //   return children;
// // // // // }
// // // // // src/router/ProtectedRoute.jsx
// // // // import { useEffect } from "react";
// // // // import { useLocation } from "react-router-dom";
// // // // import { useAuthStore } from "@/features/auth/store/authStore";
// // // // import { useAuthModalStore } from "@/features/auth/store/authStore";

// // // // export function ProtectedRoute({ children }) {
// // // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // // //   const loading = useAuthStore((s) => s.loading);
// // // //   const openModal = useAuthModalStore((s) => s.openModal);
// // // //   const location = useLocation();

// // // //   useEffect(() => {
// // // //     if (!loading && !isAuthenticated) {
// // // //       // Open modal instead of redirecting, save current path for redirect after login
// // // //       openModal("signin", location.pathname);
// // // //     }
// // // //   }, [loading, isAuthenticated, openModal, location.pathname]);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
// // // //         <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (!isAuthenticated) {
// // // //     // Show placeholder while modal opens
// // // //     return (
// // // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <p className="text-gray-500 mb-4">
// // // //             Please sign in to access this page
// // // //           </p>
// // // //           <button
// // // //             onClick={() => openModal("signin", location.pathname)}
// // // //             className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
// // // //           >
// // // //             Sign In
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return children;
// // // // }
// // // // src/router/ProtectedRoute.jsx
// // // import { useEffect } from "react";
// // // import { useLocation } from "react-router-dom";
// // // import { useAuthStore } from "@/features/auth/store/authStore";

// // // export function ProtectedRoute({ children }) {
// // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // //   const loading = useAuthStore((s) => s.loading);
// // //   const openModal = useAuthStore((s) => s.openModal);
// // //   const location = useLocation();

// // //   useEffect(() => {
// // //     if (!loading && !isAuthenticated) {
// // //       openModal("signin", location.pathname);
// // //     }
// // //   }, [loading, isAuthenticated, openModal, location.pathname]);

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
// // //         <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAuthenticated) {
// // //     return (
// // //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <p className="text-gray-500 mb-4">
// // //             Please sign in to access this page
// // //           </p>
// // //           <button
// // //             onClick={() => openModal("signin", location.pathname)}
// // //             className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
// // //           >
// // //             Sign In
// // //           </button>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return children;
// // // }
// // // src/router/ProtectedRoute.jsx
// // import { useEffect } from "react";
// // import { useLocation } from "react-router-dom";
// // import { useAuthStore } from "@/features/auth/store/authStore";

// // export function ProtectedRoute({ children }) {
// //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// //   const loading = useAuthStore((s) => s.loading);
// //   const openModal = useAuthStore((s) => s.openModal);
// //   const location = useLocation();

// //   useEffect(() => {
// //     if (!loading && !isAuthenticated) {
// //       openModal("signin", location.pathname);
// //     }
// //   }, [loading, isAuthenticated, openModal, location.pathname]);

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
// //         <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-gray-500 mb-4">
// //             Please sign in to access this page
// //           </p>
// //           <button
// //             onClick={() => openModal("signin", location.pathname)}
// //             className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
// //           >
// //             Sign In
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return children;
// // }
// // src/router/ProtectedRoute.jsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useAuthStore } from "@/features/auth/store/authStore";

// export function ProtectedRoute({ children }) {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const loading = useAuthStore((s) => s.loading);
//   const openModal = useAuthStore((s) => s.openModal);
//   const location = useLocation();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       openModal("signin", location.pathname);
//     }
//   }, [loading, isAuthenticated, openModal, location.pathname]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-gray-500 mb-4">
//             Please sign in to access this page
//           </p>
//           <button
//             onClick={() => openModal("signin", location.pathname)}
//             className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return children;
// }
// src/router/ProtectedRoute.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  const openModal = useAuthStore((s) => s.openModal); // ✅ من نفس الـ authStore
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openModal("signin", location.pathname);
    }
  }, [loading, isAuthenticated, openModal, location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">
            Please sign in to access this page
          </p>
          <button
            onClick={() => openModal("signin", location.pathname)}
            className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return children;
}
