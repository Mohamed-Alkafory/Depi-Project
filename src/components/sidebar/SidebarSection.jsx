const EASE = "cubic-bezier(0.165,0.85,0.45,1)";

export function SidebarSectionLabel({ label, collapsed }) {
  if (!label) return null;
  return (
    <div
      className="px-4 pt-4 pb-1"
      style={{
        transition: `opacity 150ms ${EASE}`,
        opacity: collapsed ? 0 : 1,
      }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
        {label}
      </span>
    </div>
  );
}

export function SidebarDivider({ collapsed }) {
  return (
    <div
      className="mx-2 my-2 border-t border-sidebar-border"
      style={{
        transition: `opacity 150ms ${EASE}`,
        opacity: collapsed ? 0 : 1,
      }}
    />
  );
}
