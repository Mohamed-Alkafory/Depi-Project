// // import { Link, useLocation } from "react-router-dom";
// // import { SidebarMenuItem } from "@/components/ui/sidebar";

// // const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

// // export function SidebarNavLink({ to, icon: Icon, label, collapsed, isPrefix }) {
// //   const { pathname } = useLocation();
// //   const isActive = isPrefix ? pathname.startsWith(to) : pathname === to;

// //   return (
// //     <SidebarMenuItem className="list-none!">
// //       <Link
// //         to={to}
// //         className={`group relative flex h-9 w-full items-center rounded-lg px-4 text-sm transition-colors duration-75 active:scale-[0.99] overflow-hidden ${
// //           isActive
// //             ? "bg-sidebar-accent text-sidebar-accent-foreground"
// //             : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
// //         }`}
// //       >
// //         <div className="flex w-full -translate-x-2 items-center gap-3">
// //           <span className="grid size-5 shrink-0 place-items-center text-sidebar-foreground">
// //             <Icon size={16} />
// //           </span>
// //           <span
// //             className="flex-1 truncate text-left"
// //             style={{
// //               transition: `opacity 150ms ${EASE}`,
// //               opacity: collapsed ? 0 : 1,
// //             }}
// //           >
// //             {label}
// //           </span>
// //         </div>
// //       </Link>
// //     </SidebarMenuItem>
// //   );
// // }
// // src/components/sidebar/SidebarNavLink.jsx
// import { NavLink } from "react-router-dom";

// export function SidebarNavLink({ to, icon: Icon, label, collapsed }) {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
//           isActive
//             ? "bg-teal-50 text-teal-700 border border-teal-200"
//             : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
//         }`
//       }
//     >
//       {Icon && <Icon size={18} />}
//       {!collapsed && <span>{label}</span>}
//     </NavLink>
//   );
// }
// src/components/sidebar/SidebarNavLink.jsx
import { NavLink } from "react-router-dom";
import { useAuthStore } from "@/features/auth/store/authStore";

export function SidebarNavLink({
  to,
  icon: Icon,
  label,
  collapsed,
  protected: isProtected,
}) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const openModal = useAuthStore((s) => s.openModal);

  const handleClick = (e) => {
    if (isProtected && !isAuthenticated) {
      e.preventDefault();
      openModal("signin", to);
    }
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
          isActive
            ? "bg-teal-50 text-teal-700 border border-teal-200"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`
      }
    >
      {Icon && <Icon size={18} />}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
