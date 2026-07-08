// // src/components/sidebar/AppSidebar.jsx
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { PanelLeftClose, PanelLeft, X } from "lucide-react";
// import {
//   Sidebar,
//   SidebarProvider,
//   SidebarHeader,
//   SidebarContent,
//   SidebarFooter,
//   SidebarMenu,
// } from "@/components/ui/sidebar";
// import { useAuthStore } from "@/features/auth/store/authStore";
// import { useProfile } from "@/features/profile/hooks/useProfile";
// import { SidebarNavLink } from "./SidebarNavLink";
// import { SidebarSectionLabel, SidebarDivider } from "./SidebarSection";
// import { SidebarUser } from "./SidebarUser";
// // ✅ استورد الـ 3
// import {
//   USER_NAV_SECTIONS,
//   PUBLIC_NAV_SECTIONS,
//   ADMIN_EXTRA_SECTIONS,
// } from "./sidebarConfig";

// const EASE = "cubic-bezier(0.165,0.85,0.45,1)";
// const DURATION = 300;
// const EXPANDED = "18rem";
// const COLLAPSED = "3.3rem";

// export default function AppSidebar({ onClose }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const user = useAuthStore((s) => s.user);
//   const authLoading = useAuthStore((s) => s.loading);

//   const profileQuery = useProfile();
//   const profile = profileQuery?.data || profileQuery?.profile || null;
//   const isProfileLoading = profileQuery?.isLoading || false;

//   const widthStyle = {
//     width: collapsed ? COLLAPSED : EXPANDED,
//     transition: `width ${DURATION}ms ${EASE}`,
//   };

//   const fadeStyle = {
//     transition: `opacity 150ms ${EASE}`,
//     opacity: collapsed ? 0 : 1,
//     pointerEvents: collapsed ? "none" : "auto",
//   };

//   const isAdmin = profile?.role === "admin";

//   return (
//     <div className="relative flex h-full">
//       <SidebarProvider
//         defaultOpen
//         className="min-h-0! h-full w-fit"
//         style={{ "--sidebar-width": EXPANDED }}
//       >
//         <div className="shrink-0 overflow-hidden" style={widthStyle}>
//           <Sidebar
//             collapsible="none"
//             className="flex h-full w-full! flex-col bg-white text-gray-800 border-r border-gray-200"
//             style={{ transition: `background-color 35ms ${EASE}` }}
//           >
//             {/* Header */}
//             <SidebarHeader className="relative flex-row! w-full items-center gap-0! p-2! pt-2 h-12 shrink-0 border-b border-gray-100">
//               <Link
//                 to="/"
//                 className="flex items-center gap-1.5 pl-2 h-8 overflow-clip hover:opacity-80 transition-opacity"
//                 style={fadeStyle}
//               >
//                 <img src="/Homi logo2.png" alt="Homi" className="h-8 w-auto" />
//               </Link>

//               {onClose && (
//                 <button
//                   onClick={onClose}
//                   className="absolute right-2 top-2 z-10 grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 md:hidden"
//                 >
//                   <X size={18} />
//                 </button>
//               )}

//               <button
//                 onClick={() => setCollapsed((c) => !c)}
//                 className="absolute right-2 top-2 z-10 hidden md:grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
//               >
//                 {collapsed ? (
//                   <PanelLeft size={18} />
//                 ) : (
//                   <PanelLeftClose size={18} />
//                 )}
//               </button>
//             </SidebarHeader>

//             {/* Content */}
//             <SidebarContent className="gap-0! pt-2 overflow-x-hidden!">
//               {authLoading || isProfileLoading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="size-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
//                 </div>
//               ) : (
//                 <>
//                   {/* ✅ User Sections (للكل) */}
//                   {USER_NAV_SECTIONS.map((section, i) => (
//                     <div key={i}>
//                       {section.label && (
//                         <SidebarSectionLabel
//                           label={section.label}
//                           collapsed={collapsed}
//                         />
//                       )}
//                       <SidebarMenu className="gap-px! px-2">
//                         {section.items.map((item) => (
//                           <SidebarNavLink
//                             key={item.to}
//                             {...item}
//                             collapsed={collapsed}
//                           />
//                         ))}
//                       </SidebarMenu>
//                       {i < USER_NAV_SECTIONS.length - 1 && (
//                         <SidebarDivider collapsed={collapsed} />
//                       )}
//                     </div>
//                   ))}

//                   {/* ✅ Public Sections (About, Contact) - بس للـ User مش Admin */}
//                   {!isAdmin &&
//                     PUBLIC_NAV_SECTIONS.map((section, i) => (
//                       <div key={`public-${i}`}>
//                         <SidebarDivider collapsed={collapsed} />
//                         {section.label && (
//                           <SidebarSectionLabel
//                             label={section.label}
//                             collapsed={collapsed}
//                           />
//                         )}
//                         <SidebarMenu className="gap-px! px-2">
//                           {section.items.map((item) => (
//                             <SidebarNavLink
//                               key={item.to}
//                               {...item}
//                               collapsed={collapsed}
//                             />
//                           ))}
//                         </SidebarMenu>
//                       </div>
//                     ))}

//                   {/* ✅ Admin Extra Sections (بس للأدمن) */}
//                   {isAdmin && (
//                     <>
//                       <SidebarDivider collapsed={collapsed} />
//                       {ADMIN_EXTRA_SECTIONS.map((section, i) => (
//                         <div key={`admin-${i}`}>
//                           {section.label && (
//                             <SidebarSectionLabel
//                               label={section.label}
//                               collapsed={collapsed}
//                             />
//                           )}
//                           <SidebarMenu className="gap-px! px-2">
//                             {section.items.map((item) => (
//                               <SidebarNavLink
//                                 key={item.to}
//                                 {...item}
//                                 collapsed={collapsed}
//                               />
//                             ))}
//                           </SidebarMenu>
//                           {i < ADMIN_EXTRA_SECTIONS.length - 1 && (
//                             <SidebarDivider collapsed={collapsed} />
//                           )}
//                         </div>
//                       ))}
//                     </>
//                   )}
//                 </>
//               )}
//             </SidebarContent>

//             {/* Footer */}
//             <SidebarFooter className="p-0! gap-0! border-t border-gray-200 mt-auto bg-gray-50">
//               <SidebarUser collapsed={collapsed} />
//             </SidebarFooter>
//           </Sidebar>
//         </div>
//       </SidebarProvider>
//     </div>
//   );
// }
// src/components/sidebar/AppSidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { PanelLeftClose, PanelLeft, X } from "lucide-react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { SidebarNavLink } from "./SidebarNavLink";
import { SidebarSectionLabel, SidebarDivider } from "./SidebarSection";
import { SidebarUser } from "./SidebarUser";
import {
  PUBLIC_NAV_SECTIONS,
  PROTECTED_NAV_SECTIONS,
  ADMIN_EXTRA_SECTIONS,
} from "./sidebarConfig";

const EASE = "cubic-bezier(0.165,0.85,0.45,1)";
const DURATION = 300;
const EXPANDED = "18rem";
const COLLAPSED = "3.3rem";

export default function AppSidebar({ onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const authLoading = useAuthStore((s) => s.loading);

  const profileQuery = useProfile();
  const profile = profileQuery?.data || profileQuery?.profile || null;
  const isProfileLoading = profileQuery?.isLoading || false;

  const widthStyle = {
    width: collapsed ? COLLAPSED : EXPANDED,
    transition: `width ${DURATION}ms ${EASE}`,
  };

  const fadeStyle = {
    transition: `opacity 150ms ${EASE}`,
    opacity: collapsed ? 0 : 1,
    pointerEvents: collapsed ? "none" : "auto",
  };

  const isAdmin = profile?.role === "admin";

  return (
    <div className="relative flex h-full">
      <SidebarProvider
        defaultOpen
        className="min-h-0! h-full w-fit"
        style={{ "--sidebar-width": EXPANDED }}
      >
        <div className="shrink-0 overflow-hidden" style={widthStyle}>
          <Sidebar
            collapsible="none"
            className="flex h-full w-full! flex-col bg-white text-gray-800 border-r border-gray-200"
            style={{ transition: `background-color 35ms ${EASE}` }}
          >
            {/* Header */}
            <SidebarHeader className="relative flex-row! w-full items-center gap-0! p-2! pt-2 h-12 shrink-0 border-b border-gray-100">
              <Link
                to="/"
                className="flex items-center gap-1.5 pl-2 h-8 overflow-clip hover:opacity-80 transition-opacity"
                style={fadeStyle}
              >
                <img src="/Homi logo2.png" alt="Homi" className="h-8 w-auto" />
              </Link>

              {onClose && (
                <button
                  onClick={onClose}
                  className="absolute right-2 top-2 z-10 grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 md:hidden"
                >
                  <X size={18} />
                </button>
              )}

              <button
                onClick={() => setCollapsed((c) => !c)}
                className="absolute right-2 top-2 z-10 hidden md:grid size-8 cursor-pointer place-items-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                {collapsed ? (
                  <PanelLeft size={18} />
                ) : (
                  <PanelLeftClose size={18} />
                )}
              </button>
            </SidebarHeader>

            {/* Content */}
            <SidebarContent className="gap-0! pt-2 overflow-x-hidden!">
              {authLoading || isProfileLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="size-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <>
                  {/* ✅ Public Sections (أي حد) */}
                  {PUBLIC_NAV_SECTIONS.map((section, i) => (
                    <div key={i}>
                      {section.label && (
                        <SidebarSectionLabel
                          label={section.label}
                          collapsed={collapsed}
                        />
                      )}
                      <SidebarMenu className="gap-px! px-2">
                        {section.items.map((item) => (
                          <SidebarNavLink
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            label={item.label}
                            collapsed={collapsed}
                          />
                        ))}
                      </SidebarMenu>
                      {i < PUBLIC_NAV_SECTIONS.length - 1 && (
                        <SidebarDivider collapsed={collapsed} />
                      )}
                    </div>
                  ))}

                  {/* ✅ Protected Sections (لازم login) */}
                  {PROTECTED_NAV_SECTIONS.map((section, i) => (
                    <div key={`protected-${i}`}>
                      <SidebarDivider collapsed={collapsed} />
                      {section.label && (
                        <SidebarSectionLabel
                          label={section.label}
                          collapsed={collapsed}
                        />
                      )}
                      <SidebarMenu className="gap-px! px-2">
                        {section.items.map((item) => (
                          <SidebarNavLink
                            key={item.to}
                            to={item.to}
                            icon={item.icon}
                            label={item.label}
                            collapsed={collapsed}
                            protected={item.protected} // ← مهم
                          />
                        ))}
                      </SidebarMenu>
                    </div>
                  ))}

                  {/* ✅ Admin Sections (لازم login + admin) */}
                  {isAdmin && (
                    <>
                      <SidebarDivider collapsed={collapsed} />
                      {ADMIN_EXTRA_SECTIONS.map((section, i) => (
                        <div key={`admin-${i}`}>
                          {section.label && (
                            <SidebarSectionLabel
                              label={section.label}
                              collapsed={collapsed}
                            />
                          )}
                          <SidebarMenu className="gap-px! px-2">
                            {section.items.map((item) => (
                              <SidebarNavLink
                                key={item.to}
                                to={item.to}
                                icon={item.icon}
                                label={item.label}
                                collapsed={collapsed}
                                protected={item.protected} // ← مهم
                              />
                            ))}
                          </SidebarMenu>
                          {i < ADMIN_EXTRA_SECTIONS.length - 1 && (
                            <SidebarDivider collapsed={collapsed} />
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="p-0! gap-0! border-t border-gray-200 mt-auto bg-gray-50">
              <SidebarUser collapsed={collapsed} />
            </SidebarFooter>
          </Sidebar>
        </div>
      </SidebarProvider>
    </div>
  );
}
