"use client";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Building2,
  Phone,
  Info,
  Heart,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const EASE = "cubic-bezier(0.165,0.85,0.45,1)";
const DURATION = 300;
const EXPANDED = "18rem";
const COLLAPSED = "3.3rem";

export default function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { label: "Home", icon: <House size={16} />, path: "/" },
    { label: "Plans", icon: <Building2 size={16} />, path: "/pricing" },
    { label: "Favorites", icon: <Heart size={16} />, path: "/favorites" },
    { label: "Contact Us", icon: <Phone size={16} />, path: "/contact" },
    { label: "About Us", icon: <Info size={16} />, path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="relative flex h-full">
      <SidebarProvider
        defaultOpen
        className="min-h-0! h-full w-fit"
        style={{ "--sidebar-width": EXPANDED }}
      >
        <div
          className="shrink-0 overflow-hidden"
          style={{
            width: collapsed ? COLLAPSED : EXPANDED,
            transition: `width ${DURATION}ms ${EASE}`,
          }}
        >
          <Sidebar
            collapsible="none"
            className="flex h-full w-full! flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border"
            style={{ transition: `background-color 35ms ${EASE}` }}
          >
            <SidebarHeader className="relative flex-row! w-full items-center gap-0! p-2! pt-2 h-12 shrink-0">
              <div
                className="flex items-center gap-1.5 pl-2 h-8 overflow-clip"
                style={{
                  transition: `opacity 150ms ${EASE}`,
                  opacity: collapsed ? 0 : 1,
                  pointerEvents: collapsed ? "none" : "auto",
                }}
              >
                <img src="/Homi logo2.png" alt="Homi" className="h-8 w-auto" />
              </div>
              <button
                type="button"
                aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
                title={collapsed ? "Open sidebar" : "Close sidebar"}
                onClick={() => setCollapsed((c) => !c)}
                className="absolute right-2 top-2 z-10 grid size-8 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors duration-150 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
              </button>
            </SidebarHeader>

            <SidebarContent className="gap-0! pt-2 overflow-x-hidden!">
              <SidebarMenu className="gap-px! px-2">
                {navItems.map((it) => (
                  <SidebarMenuItem key={it.label} className="list-none!">
                    <Link
                      to={it.path}
                      className={`group relative flex h-9 w-full items-center rounded-lg px-4 text-sm transition-colors duration-75 active:scale-[0.99] overflow-hidden ${
                        isActive(it.path)
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <div className="flex w-full -translate-x-2 items-center gap-3">
                        <span className="grid size-5 shrink-0 place-items-center text-sidebar-foreground">
                          {it.icon}
                        </span>
                        <span
                          className="flex-1 truncate text-left"
                          style={{
                            transition: `opacity 150ms ${EASE}`,
                            opacity: collapsed ? 0 : 1,
                          }}
                        >
                          {it.label}
                        </span>
                      </div>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-0! gap-0! border-t border-sidebar-border mt-auto">
              <button
                className="group flex h-16 w-full items-center gap-3 px-2 transition-colors duration-150 hover:bg-sidebar-accent/50 overflow-hidden"
                aria-label="User menu"
              >
                <div className="flex w-full items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-sidebar-primary text-sm font-semibold text-sidebar-primary-foreground">
                    U
                  </div>
                  <div
                    className="flex flex-1 flex-col items-start min-w-0"
                    style={{
                      transition: `opacity 150ms ${EASE}`,
                      opacity: collapsed ? 0 : 1,
                    }}
                  >
                    <span className="truncate text-sm font-medium">
                      User Name
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">
                      Logged in
                    </span>
                  </div>
                </div>
              </button>

              <div className="border-t border-sidebar-border" />

              <button
                className="group flex h-12 w-full items-center gap-3 px-4 transition-colors duration-150 hover:bg-red-500/10 overflow-hidden text-red-500 hover:text-red-400"
                aria-label="Log out"
              >
                <LogOut size={16} className="shrink-0" />
                <span
                  className="text-sm"
                  style={{
                    transition: `opacity 150ms ${EASE}`,
                    opacity: collapsed ? 0 : 1,
                  }}
                >
                  Log out
                </span>
              </button>
            </SidebarFooter>
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  );
}
