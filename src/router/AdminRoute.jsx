// // // // // src/components/routes/AdminRoute.jsx
// // // // import { Navigate } from "react-router-dom";
// // // // import { useUser } from "@/features/auth/hooks/useUser";

// // // // export default function AdminRoute({ children }) {
// // // //   const { data: profile, isLoading } = useUser();

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-screen">
// // // //         <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   // لو مفيش profile أو الـ role مش admin
// // // //   if (!profile || profile.role !== "admin") {
// // // //     return <Navigate to="/" replace />;
// // // //   }

// // // //   return children;
// // // // }

// // // import { Navigate } from "react-router-dom";
// // // import { useAuthStore } from "@/features/auth/store/authStore";
// // // import { useUser } from "@/features/auth/hooks/useUser";

// // // export function AdminRoute({ children }) {
// // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // //   const loading = useAuthStore((s) => s.loading);
// // //   const { data: profile, isLoading: profileLoading } = useUser();

// // //   if (loading || profileLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAuthenticated) {
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   if (profile?.role !== "admin") {
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   return children;
// // // }

// // // src/router/AdminRoute.jsx
// // // import { Navigate } from "react-router-dom";
// // // import { useAuthStore } from "@/features/auth/store/authStore"; // ← تأكد إنه موجود
// // // import { useUser } from "@/features/auth/hooks/useUser"; // ← وتأكد إنه شغال

// // // export function AdminRoute({ children }) {
// // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // //   const user = useAuthStore((s) => s.user); // ← لو مستخدمه
// // //   const loading = useAuthStore((s) => s.loading);
// // //   const { data: profile, isLoading: profileLoading } = useUser();

// // //   // DEBUG
// // //   console.log("=== AdminRoute Debug ===");
// // //   console.log("isAuthenticated:", isAuthenticated);
// // //   console.log("loading:", loading);
// // //   console.log("profileLoading:", profileLoading);
// // //   console.log("profile:", profile);
// // //   console.log("role:", profile?.role);
// // //   console.log("======================");

// // //   if (loading || profileLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAuthenticated) {
// // //     console.log("❌ Not authenticated, redirecting to home");
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   if (profile?.role !== "admin") {
// // //     console.log("❌ Not admin, role is:", profile?.role);
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   console.log("✅ Admin access granted");
// // //   return children;
// // // }

// // // import { Outlet, Navigate } from "react-router-dom";
// // // import { useAuthStore } from "@/features/auth/store/authStore";
// // // import { useUser } from "@/features/auth/hooks/useUser";

// // // export function AdminRoute() {
// // //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// // //   const loading = useAuthStore((s) => s.loading);
// // //   const { data: profile, isLoading: profileLoading } = useUser();

// // //   console.log("=== AdminRoute Debug ===");
// // //   console.log("isAuthenticated:", isAuthenticated);
// // //   console.log("loading:", loading);
// // //   console.log("profileLoading:", profileLoading);
// // //   console.log("profile:", profile);
// // //   console.log("role:", profile?.role);
// // //   console.log("======================");

// // //   if (loading || profileLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   if (!isAuthenticated) {
// // //     console.log("❌ Not authenticated, redirecting to home");
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   if (profile?.role !== "admin") {
// // //     console.log("❌ Not admin, role is:", profile?.role);
// // //     return <Navigate to="/" replace />;
// // //   }

// // //   console.log("✅ Admin access granted");
// // //   return <Outlet />;
// // // }

// // // src/components/AdminRoute.jsx
// // import { Navigate } from "react-router-dom";
// // import { useAuthStore } from "@/features/auth/store/authStore";
// // import { useProfile } from "@/features/profile/hooks/useProfile";

// // export function AdminRoute({ children }) {
// //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// //   const loading = useAuthStore((s) => s.loading);

// //   // ✅ استخدم useProfile بدل useUser
// //   const { profile, isLoading: profileLoading } = useProfile();

// //   console.log("=== AdminRoute Debug ===");
// //   console.log("isAuthenticated:", isAuthenticated);
// //   console.log("loading:", loading);
// //   console.log("profileLoading:", profileLoading);
// //   console.log("profile:", profile);
// //   console.log("role:", profile?.role);
// //   console.log("======================");

// //   if (loading || profileLoading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   if (!isAuthenticated) {
// //     console.log("❌ Not authenticated");
// //     return <Navigate to="/test-auth" replace />;
// //   }

// //   // ✅ نستخدم profile?.role من profiles table
// //   if (profile?.role !== "admin") {
// //     console.log("❌ Not admin, role is:", profile?.role);
// //     return <Navigate to="/" replace />;
// //   }

// //   console.log("✅ Admin access granted");
// //   return children;
// // }

// // src/router/AdminRoute.jsx
// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "@/features/auth/store/authStore";
// import { useProfile } from "@/features/profile/hooks/useProfile";

// export function AdminRoute({ children }) {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const loading = useAuthStore((s) => s.loading);
//   const { profile, isLoading: profileLoading } = useProfile();

//   if (loading || profileLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/test-auth" replace />;
//   }

//   if (profile?.role !== "admin") {
//     return <Navigate to="/" replace />;
//   }

//   return children; // ← مهم: نرجع children مش Outlet
// }
// src/router/AdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";

export function AdminRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  const { profile, isLoading: profileLoading } = useProfile();

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="size-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/test-auth" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ← مهم: Outlet مش children
}
