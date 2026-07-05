import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import ClaudeSidebar from "@/components/pixel-perfect/claude-sidebar";

// import Navbar from "./Navbar";
// import Footer from "./Footer";

export function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col md:h-screen md:overflow-hidden md:flex-row">
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-3 top-3 z-40 grid size-10 place-items-center rounded-xl bg-white shadow-lg md:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} className="text-neutral-700" />
      </button>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-[18rem] bg-white shadow-2xl">
            <ClaudeSidebar onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:h-screen">
        <ClaudeSidebar />
      </div>

      <main className="flex-1 pt-14 md:pt-0 md:overflow-y-auto md:h-screen">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
