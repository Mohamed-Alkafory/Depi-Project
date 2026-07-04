import { Outlet } from "react-router-dom";
import ClaudeSidebar from "@/components/pixel-perfect/claude-sidebar";

// import Navbar from "./Navbar";
// import Footer from "./Footer";

export function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <ClaudeSidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
}
