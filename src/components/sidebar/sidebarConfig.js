// // src/components/sidebar/sidebarConfig.js
// import {
//   LayoutGrid,
//   Info,
//   Phone,
//   Heart,
//   ShoppingCart,
//   Calculator,
//   Settings,
//   BarChart3,
//   Users,
//   MessageSquare,
//   Package,
//   ClipboardList,
// } from "lucide-react";

// // ✅ User Sections (تظهر للـ User بس - من غير Company)
// export const USER_NAV_SECTIONS = [
//   {
//     label: "PLANS",
//     items: [
//       { to: "/plans", label: "Plans", icon: LayoutGrid },
//       { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
//     ],
//   },
//   {
//     label: "USER",
//     items: [
//       { to: "/favorites", label: "Favourite", icon: Heart },
//       { to: "/cart", label: "Cart", icon: ShoppingCart },
//       { to: "/orders", label: "My Orders", icon: ClipboardList },
//     ],
//   },
// ];

// // ✅ Public Sections (تظهر للـ User بس - Company)
// export const PUBLIC_NAV_SECTIONS = [
//   {
//     label: "COMPANY",
//     items: [
//       { to: "/about", label: "About", icon: Info },
//       { to: "/contact", label: "Contact Us", icon: Phone },
//     ],
//   },
// ];

// // ✅ Admin Extra Sections (بس للأدمن)
// export const ADMIN_EXTRA_SECTIONS = [
//   {
//     label: "DASHBOARD",
//     items: [
//       { to: "/admin/overview", label: "Overview", icon: BarChart3 },
//       { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
//       { to: "/admin/orders", label: "Orders", icon: Package },
//     ],
//   },
//   {
//     label: "MANAGEMENT",
//     items: [
//       { to: "/admin/plans", label: "Plans Management", icon: Settings },
//       { to: "/admin/users", label: "Users", icon: Users },
//     ],
//   },
// ];
// src/components/sidebar/sidebarConfig.js
import {
  LayoutGrid,
  Info,
  Phone,
  Heart,
  ShoppingCart,
  Calculator,
  Settings,
  BarChart3,
  Users,
  MessageSquare,
  Package,
  ClipboardList,
} from "lucide-react";

// ✅ Public — أي حد يقدر يشوفها
export const PUBLIC_NAV_SECTIONS = [
  {
    label: "PLANS",
    items: [
      { to: "/plans", label: "Plans", icon: LayoutGrid },
      { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
    ],
  },
  {
    label: "COMPANY",
    items: [
      { to: "/about", label: "About", icon: Info },
      { to: "/contact", label: "Contact Us", icon: Phone },
    ],
  },
];

// ✅ Protected — لازم login
export const PROTECTED_NAV_SECTIONS = [
  {
    label: "USER",
    items: [
      { to: "/favorites", label: "Favourite", icon: Heart, protected: true },
      { to: "/cart", label: "Cart", icon: ShoppingCart, protected: true },
      {
        to: "/orders",
        label: "My Orders",
        icon: ClipboardList,
        protected: true,
      },
    ],
  },
];

// ✅ Admin — لازم login + admin
export const ADMIN_EXTRA_SECTIONS = [
  {
    label: "DASHBOARD",
    items: [
      {
        to: "/admin/overview",
        label: "Overview",
        icon: BarChart3,
        protected: true,
      },
      {
        to: "/admin/contacts",
        label: "Messages",
        icon: MessageSquare,
        protected: true,
      },
      { to: "/admin/orders", label: "Orders", icon: Package, protected: true },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      {
        to: "/admin/plans",
        label: "Plans Management",
        icon: Settings,
        protected: true,
      },
      { to: "/admin/users", label: "Users", icon: Users, protected: true },
    ],
  },
];
