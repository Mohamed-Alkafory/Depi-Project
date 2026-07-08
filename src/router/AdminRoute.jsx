// // // src/router/AdminRoute.jsx
// // import { Navigate, Outlet } from "react-router-dom";
// // import { useAuthStore } from "@/features/auth/store/authStore";
// // import { useProfile } from "@/features/profile/hooks/useProfile";

// // export function AdminRoute() {
// //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// //   const loading = useAuthStore((s) => s.loading);
// //   const { profile, isLoading: profileLoading } = useProfile();

// //   if (loading || profileLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) {
// //     return <Navigate to="/test-auth" replace />;
// //   }

// //   if (profile?.role !== "admin") {
// //     return <Navigate to="/" replace />;
// //   }

// //   return <Outlet />; // ← مهم: Outlet مش children
// // }
// // src/router/AdminRoute.jsx
// import { useEffect } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuthStore } from "@/features/auth/store/authStore";
// import { useProfile } from "@/features/profile/hooks/useProfile";

// export function AdminRoute() {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const loading = useAuthStore((s) => s.loading);
//   const openModal = useAuthStore((s) => s.openModal);
//   const { profile, isLoading: profileLoading } = useProfile();

//   useEffect(() => {
//     if (!loading && !isAuthenticated) {
//       openModal("signin", window.location.pathname);
//     }
//   }, [loading, isAuthenticated, openModal]);

//   if (loading || profileLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
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
//             onClick={() => openModal("signin", window.location.pathname)}
//             className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
//           >
//             Sign In
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (profile?.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// }
// src/router/AdminRoute.jsx
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";

export function AdminRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  const openModal = useAuthStore((s) => s.openModal);
  const { profile, isLoading: profileLoading } = useProfile();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      openModal("signin", window.location.pathname);
    }
  }, [loading, isAuthenticated, openModal]);

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
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
            onClick={() => openModal("signin", window.location.pathname)}
            className="px-6 py-2 bg-[#008080] text-white rounded-full text-sm font-medium hover:bg-[#006D6D] transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
