// // import { useState } from "react";
// // import { Outlet } from "react-router-dom";
// // import { Menu } from "lucide-react";

// // import AppSidebar from "../sidebar/AppSidebar";

// // export default function DashboardLayout() {
// //   const [mobileOpen, setMobileOpen] = useState(false);

// //   return (
// //     // <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden">
// //     <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden bg-gray-900">
// //       {/* Mobile menu button */}
// //       <button
// //         onClick={() => setMobileOpen(true)}
// //         className="fixed left-3 top-3 z-40 grid size-10 place-items-center rounded-xl bg-white shadow-lg md:hidden"
// //       >
// //         <Menu size={20} />
// //       </button>

// //       {/* Mobile Sidebar */}
// //       {mobileOpen && (
// //         <div className="fixed inset-0 z-50 flex md:hidden">
// //           <div
// //             className="absolute inset-0 bg-black/40"
// //             onClick={() => setMobileOpen(false)}
// //           />
// //           <div className="relative h-full w-[18rem] bg-white shadow-2xl">
// //             <AppSidebar onClose={() => setMobileOpen(false)} />
// //           </div>
// //         </div>
// //       )}

// //       {/* Desktop Sidebar */}
// //       <div className="hidden md:flex md:h-screen">
// //         <AppSidebar />
// //       </div>

// //       {/* <main className="flex-1 pt-14 md:h-screen md:overflow-y-auto md:pt-0">
// //         <Outlet />
// //       </main> */}
// //       <main className="flex-1 pt-14 md:h-screen md:overflow-y-auto md:pt-0 bg-gray-900">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Menu } from "lucide-react";

// import AppSidebar from "../sidebar/AppSidebar";

// export default function DashboardLayout() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden bg-gray-50">
//       {/* Mobile menu button */}
//       <button
//         onClick={() => setMobileOpen(true)}
//         className="fixed left-3 top-3 z-40 grid size-10 place-items-center rounded-xl bg-white shadow-lg md:hidden"
//       >
//         <Menu size={20} className="text-gray-700" />
//       </button>

//       {/* Mobile Sidebar */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50 flex md:hidden">
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setMobileOpen(false)}
//           />
//           <div className="relative h-full w-[18rem] bg-white shadow-2xl">
//             <AppSidebar onClose={() => setMobileOpen(false)} />
//           </div>
//         </div>
//       )}

//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex md:h-screen">
//         <AppSidebar />
//       </div>

//       <main className="flex-1 pt-14 md:h-screen md:overflow-y-auto md:pt-0 bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
// src/components/layout/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { AuthModal } from "@/features/auth/components/AuthModal";
import AppSidebar from "../sidebar/AppSidebar";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Modal state
  const isModalOpen = useAuthStore((s) => s.isModalOpen);
  const modalMode = useAuthStore((s) => s.modalMode);
  const redirectTo = useAuthStore((s) => s.redirectTo);
  const closeModal = useAuthStore((s) => s.closeModal);
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:h-screen md:flex-row md:overflow-hidden bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-3 z-40 grid size-10 place-items-center rounded-xl bg-white shadow-lg md:hidden"
      >
        <Menu size={20} className="text-gray-700" />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative h-full w-[18rem] bg-white shadow-2xl">
            <AppSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:h-screen">
        <AppSidebar />
      </div>

      <main className="flex-1 pt-14 md:h-screen md:overflow-y-auto md:pt-0 bg-gray-50">
        <Outlet />
      </main>

      {/* ⬅️ AuthModal هنا كمان */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={closeModal}
        defaultMode={modalMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
