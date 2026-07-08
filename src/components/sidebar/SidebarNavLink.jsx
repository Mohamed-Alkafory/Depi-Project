import { NavLink } from "react-router-dom";

export function SidebarNavLink({ to, icon: Icon, label, collapsed }) {
  const baseClass = "group relative flex items-center justify-center w-full mx-auto rounded-xl transition-all duration-200";

  return (
    <NavLink
      to={to}
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
      {Icon && <Icon size={collapsed ? 20 : 22} strokeWidth={collapsed ? 2 : 2} />}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-2 z-[9999] w-max rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100 before:absolute before:left-[-4px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-gray-900">
          {label}
        </span>
      )}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}