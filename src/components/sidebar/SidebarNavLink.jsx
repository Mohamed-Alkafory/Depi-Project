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
        collapsed
          ? `${baseClass} ${
              isActive
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:scale-105"
            }`
          : `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
              isActive
                ? "bg-teal-50 text-teal-700 border border-teal-200"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`
      }
      style={collapsed ? { aspectRatio: "1/1" } : undefined}
    >
      {Icon && (
        <Icon size={collapsed ? 20 : 22} strokeWidth={collapsed ? 2 : 2} />
      )}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 z-[9999] w-max rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 before:absolute before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-900">
          {label}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}
