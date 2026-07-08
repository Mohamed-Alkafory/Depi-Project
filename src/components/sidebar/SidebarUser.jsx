// // import { useNavigate, Link } from "react-router-dom";
// // import { LogOut } from "lucide-react";
// // import { useAuthStore } from "@/features/auth/store/authStore";
// // import { useUser } from "@/features/auth/hooks/useUser";
// // import { useLogout } from "@/features/auth/hooks/useLogout";

// // const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

// // export function SidebarUser({ collapsed }) {
// //   const navigate = useNavigate();
// //   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
// //   const user = useAuthStore((s) => s.user);
// //   const { data: profile, isLoading } = useUser();
// //   const { mutate: logout } = useLogout();

// //   const getInitial = () => {
// //     if (profile?.full_name) return profile.full_name.charAt(0).toUpperCase();
// //     if (user?.email) return user.email.charAt(0).toUpperCase();
// //     return "U";
// //   };

// //   const getDisplayName = () => {
// //     if (profile?.full_name) return profile.full_name;
// //     if (user?.email) return user.email.split("@")[0];
// //     return "User Name";
// //   };

// //   const fadeStyle = {
// //     transition: `opacity 150ms ${EASE}`,
// //     opacity: collapsed ? 0 : 1,
// //   };

// //   return (
// //     <div className="border-t border-sidebar-border mt-auto">
// //       {/* User Info */}
// //       <Link
// //         to="/profile"
// //         className="group flex h-16 w-full items-center gap-3 px-2 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden"
// //         aria-label="User menu"
// //       >
// //         <div className="flex w-full items-center gap-3">
// //           {profile?.avatar_url ? (
// //             <img
// //               src={profile.avatar_url}
// //               alt={getDisplayName()}
// //               className="size-9 shrink-0 rounded-full object-cover"
// //             />
// //           ) : (
// //             <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
// //               {getInitial()}
// //             </div>
// //           )}
// //           <div
// //             className="flex flex-1 flex-col items-start min-w-0"
// //             style={fadeStyle}
// //           >
// //             <span className="truncate text-sm font-medium">
// //               {isLoading ? "Loading..." : getDisplayName()}
// //             </span>
// //             <span className="truncate text-[11px] text-muted-foreground">
// //               {isAuthenticated ? "Logged in" : "Guest"}
// //             </span>
// //           </div>
// //         </div>
// //       </Link>

// //       <div className="border-t border-sidebar-border" />

// //       {/* Auth Action */}
// //       {isAuthenticated ? (
// //         <button
// //           onClick={() => logout()}
// //           className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-red-500/10 overflow-hidden text-red-500 hover:text-red-400"
// //           aria-label="Log out"
// //         >
// //           <LogOut size={16} className="shrink-0" />
// //           <span className="text-sm" style={fadeStyle}>
// //             Log out
// //           </span>
// //         </button>
// //       ) : (
// //         <button
// //           onClick={() => navigate("/test-auth")}
// //           className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden text-sidebar-foreground"
// //           aria-label="Sign in"
// //         >
// //           <LogOut size={16} className="shrink-0 rotate-180" />
// //           <span className="text-sm" style={fadeStyle}>
// //             Sign In
// //           </span>
// //         </button>
// //       )}
// //     </div>
// //   );
// // }
// // src/components/sidebar/SidebarUser.jsx
// import { useNavigate, Link } from "react-router-dom";
// import { LogOut } from "lucide-react";
// import { useAuthStore } from "@/features/auth/store/authStore";
// import { useProfile } from "@/features/profile/hooks/useProfile"; // ← جديد
// import { useLogout } from "@/features/auth/hooks/useLogout";

// const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

// export function SidebarUser({ collapsed }) {
//   const navigate = useNavigate();
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const user = useAuthStore((s) => s.user);
//   const { profile, isLoading } = useProfile(); // ← استخدم useProfile
//   const { mutate: logout } = useLogout();

//   const getInitial = () => {
//     if (profile?.full_name) return profile.full_name.charAt(0).toUpperCase();
//     if (user?.email) return user.email.charAt(0).toUpperCase();
//     return "U";
//   };

//   const getDisplayName = () => {
//     if (profile?.full_name) return profile.full_name;
//     if (user?.email) return user.email.split("@")[0];
//     return "User Name";
//   };

//   const fadeStyle = {
//     transition: `opacity 150ms ${EASE}`,
//     opacity: collapsed ? 0 : 1,
//   };

//   return (
//     <div className="border-t border-sidebar-border mt-auto">
//       {/* User Info */}
//       <Link
//         to="/profile"
//         className="group flex h-16 w-full items-center gap-3 px-2 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden"
//         aria-label="User menu"
//       >
//         <div className="flex w-full items-center gap-3">
//           {profile?.avatar_url ? (
//             <img
//               src={profile.avatar_url}
//               alt={getDisplayName()}
//               className="size-9 shrink-0 rounded-full object-cover"
//             />
//           ) : (
//             <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
//               {getInitial()}
//             </div>
//           )}
//           <div
//             className="flex flex-1 flex-col items-start min-w-0"
//             style={fadeStyle}
//           >
//             <span className="truncate text-sm font-medium">
//               {isLoading ? "Loading..." : getDisplayName()}
//             </span>
//             <span className="truncate text-[11px] text-muted-foreground">
//               {isAuthenticated ? "Logged in" : "Guest"}
//             </span>
//           </div>
//         </div>
//       </Link>

//       <div className="border-t border-sidebar-border" />

//       {/* Auth Action */}
//       {isAuthenticated ? (
//         <button
//           onClick={() => logout()}
//           className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-red-500/10 overflow-hidden text-red-500 hover:text-red-400"
//           aria-label="Log out"
//         >
//           <LogOut size={16} className="shrink-0" />
//           <span className="text-sm" style={fadeStyle}>
//             Log out
//           </span>
//         </button>
//       ) : (
//         <button
//           onClick={() => navigate("/test-auth")}
//           className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden text-sidebar-foreground"
//           aria-label="Sign in"
//         >
//           <LogOut size={16} className="shrink-0 rotate-180" />
//           <span className="text-sm" style={fadeStyle}>
//             Sign In
//           </span>
//         </button>
//       )}
//     </div>
//   );
// }
// src/components/sidebar/SidebarUser.jsx
import { useNavigate, Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";

const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

export function SidebarUser({ collapsed }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const openModal = useAuthStore((s) => s.openModal); // ← جديد
  const { profile, isLoading } = useProfile();
  const logout = useAuthStore((s) => s.logout); // ← استخدم من authStore مباشرة

  const getInitial = () => {
    if (profile?.full_name) return profile.full_name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.email) return user.email.split("@")[0];
    return "User Name";
  };

  const fadeStyle = {
    transition: `opacity 150ms ${EASE}`,
    opacity: collapsed ? 0 : 1,
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSignIn = () => {
    openModal("signin"); // ← يفتح المودال بدل ما يروح لـ /test-auth
  };

  return (
    <div className="border-t border-sidebar-border mt-auto">
      {/* User Info */}
      <Link
        to="/profile"
        className="group flex h-16 w-full items-center gap-3 px-2 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden"
        aria-label="User menu"
      >
        <div className="flex w-full items-center gap-3">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={getDisplayName()}
              className="size-9 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
              {getInitial()}
            </div>
          )}
          <div
            className="flex flex-1 flex-col items-start min-w-0"
            style={fadeStyle}
          >
            <span className="truncate text-sm font-medium">
              {isLoading ? "Loading..." : getDisplayName()}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {isAuthenticated ? "Logged in" : "Guest"}
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t border-sidebar-border" />

      {/* Auth Action */}
      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-red-500/10 overflow-hidden text-red-500 hover:text-red-400"
          aria-label="Log out"
        >
          <LogOut size={16} className="shrink-0" />
          <span className="text-sm" style={fadeStyle}>
            Log out
          </span>
        </button>
      ) : (
        <button
          onClick={handleSignIn} // ← غيرنا هنا
          className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden text-sidebar-foreground"
          aria-label="Sign in"
        >
          <LogOut size={16} className="shrink-0 rotate-180" />
          <span className="text-sm" style={fadeStyle}>
            Sign In
          </span>
        </button>
      )}
    </div>
  );
}
