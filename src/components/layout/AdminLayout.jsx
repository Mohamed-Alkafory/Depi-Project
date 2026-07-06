// // src/layouts/AdminLayout.jsx
// import { Outlet } from "react-router-dom";
// import AppSidebar from "@/components/sidebar/AppSidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex h-screen bg-[var(--body-bg)]">
//       <AppSidebar />
//       <main className="flex-1 overflow-auto p-8">
//         <Outlet /> // ← هنا بيظهر الـ PlansManagement
//       </main>
//     </div>
//   );
// }
import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useUser } from "@/features/auth/hooks/useUser";

export function AdminRoute() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const loading = useAuthStore((s) => s.loading);
  const { data: profile, isLoading: profileLoading } = useUser();

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // ← الفرق الوحيد: Outlet بدل children
}
