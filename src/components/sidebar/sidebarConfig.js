// // import {
// //   Building2,
// //   FileText,
// //   Wallet,
// //   Phone,
// //   Info,
// //   Heart,
// //   ShoppingCart,
// //   CreditCard,
// //   LayoutDashboard,
// //   Settings,
// // } from "lucide-react";

// // export const NAV_SECTIONS = [
// //   {
// //     label: "Plans",
// //     items: [
// //       { to: "/plans", icon: Building2, label: "Plans" },
// //       {
// //         to: "/plan-details",
// //         icon: FileText,
// //         label: "Plan Details",
// //         isPrefix: true,
// //       },
// //       { to: "/pricing", icon: Wallet, label: "Pricing" },
// //       { to: "/about", icon: Info, label: "About" },
// //       { to: "/contact", icon: Phone, label: "Contact Us" },
// //     ],
// //   },
// //   {
// //     items: [
// //       { to: "/favorites", icon: Heart, label: "Favourite" },
// //       { to: "/cart", icon: ShoppingCart, label: "Cart" },
// //       { to: "/payment-method", icon: CreditCard, label: "Payment Method" },
// //     ],
// //   },
// // ];

// // export const ADMIN_SECTION = {
// //   label: "Admin Setting",
// //   items: [
// //     { to: "/admin/overview", icon: LayoutDashboard, label: "Overview" },
// //     { to: "/admin/plans", icon: Settings, label: "Plans Management" },
// //   ],
// // };

// // // src/components/sidebar/sidebarConfig.js
// // import {
// //   LayoutGrid,
// //   Info,
// //   Phone,
// //   Heart,
// //   ShoppingCart,
// //   CreditCard,
// //   Calculator, // ← جديد
// //   Settings,
// // } from "lucide-react";

// // export const NAV_SECTIONS = [
// //   {
// //     label: "PLANS",
// //     items: [
// //       { to: "/plans", label: "Plans", icon: LayoutGrid },
// //       { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
// //       { to: "/pricing", label: "Pricing", icon: CreditCard },
// //     ],
// //   },
// //   {
// //     label: "COMPANY",
// //     items: [
// //       { to: "/about", label: "About", icon: Info },
// //       { to: "/contact", label: "Contact Us", icon: Phone },
// //     ],
// //   },
// //   {
// //     label: "USER",
// //     items: [
// //       { to: "/favorites", label: "Favourite", icon: Heart },
// //       { to: "/cart", label: "Cart", icon: ShoppingCart },
// //       { to: "/payment-method", label: "Payment Method", icon: CreditCard },
// //     ],
// //   },
// // ];

// // export const ADMIN_SECTION = {
// //   label: "ADMIN",
// //   items: [{ to: "/admin/plans", label: "Plans Management", icon: Settings }],
// // };

// // src/components/sidebar/sidebarConfig.js
// import {
//   LayoutGrid,
//   Info,
//   Phone,
//   Heart,
//   ShoppingCart,
//   CreditCard,
//   Calculator,
//   Settings,
//   BarChart3, // ← Overview icon
//   FileText, // ← Plans icon
//   Users, // ← Users icon
//   MessageSquare, // ← Contacts icon
// } from "lucide-react";

// // ✅ User Sidebar
// export const USER_NAV_SECTIONS = [
//   {
//     label: "PLANS",
//     items: [
//       { to: "/plans", label: "Plans", icon: LayoutGrid },
//       { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
//       { to: "/pricing", label: "Pricing", icon: CreditCard },
//     ],
//   },
//   {
//     label: "COMPANY",
//     items: [
//       { to: "/about", label: "About", icon: Info },
//       { to: "/contact", label: "Contact Us", icon: Phone },
//     ],
//   },
//   {
//     label: "USER",
//     items: [
//       { to: "/favorites", label: "Favourite", icon: Heart },
//       { to: "/cart", label: "Cart", icon: ShoppingCart },
//       { to: "/payment-method", label: "Payment Method", icon: CreditCard },
//     ],
//   },
// ];

// // ✅ Admin Sidebar
// export const ADMIN_NAV_SECTIONS = [
//   {
//     label: "DASHBOARD",
//     items: [
//       { to: "/admin/overview", label: "Overview", icon: BarChart3 },
//       { to: "/plans", label: "Plans", icon: LayoutGrid },
//       { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
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

// // // ❌ شيلنا ADMIN_SECTION لأننا هنستخدم ADMIN_NAV_SECTIONS كامل

// // // src/components/sidebar/sidebarConfig.js
// // import {
// //   LayoutGrid,
// //   Info,
// //   Phone,
// //   Heart,
// //   ShoppingCart,
// //   CreditCard,
// //   Calculator,
// //   Settings,
// //   BarChart3,
// //   FileText,
// //   Users,
// //   MessageSquare,
// // } from "lucide-react";

// // // ✅ User Sidebar
// // export const USER_NAV_SECTIONS = [
// //   {
// //     label: "PLANS",
// //     items: [
// //       { to: "/plans", label: "Plans", icon: LayoutGrid },
// //       { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
// //       { to: "/pricing", label: "Pricing", icon: CreditCard },
// //     ],
// //   },
// //   {
// //     label: "COMPANY",
// //     items: [
// //       { to: "/about", label: "About", icon: Info },
// //       { to: "/contact", label: "Contact Us", icon: Phone },
// //     ],
// //   },
// //   {
// //     label: "USER",
// //     items: [
// //       { to: "/favorites", label: "Favourite", icon: Heart },
// //       { to: "/cart", label: "Cart", icon: ShoppingCart },
// //       { to: "/payment-method", label: "Payment Method", icon: CreditCard },
// //     ],
// //   },
// // ];

// // // ✅ Admin Sidebar
// // export const ADMIN_NAV_SECTIONS = [
// //   {
// //     label: "DASHBOARD",
// //     items: [
// //       { to: "/admin/overview", label: "Overview", icon: BarChart3 },
// //       { to: "/plans", label: "Plans", icon: LayoutGrid },
// //       { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
// //     ],
// //   },
// //   {
// //     label: "MANAGEMENT",
// //     items: [
// //       { to: "/admin/plans", label: "Plans Management", icon: Settings },
// //       { to: "/admin/users", label: "Users", icon: Users },
// //     ],
// //   },
// // ];

// // // ❌ شيلنا ADMIN_SECTION القديم
// // // export const ADMIN_SECTION = { ... };
// // src/components/sidebar/sidebarConfig.js
// // import {
// //   LayoutGrid,
// //   Info,
// //   Phone,
// //   Heart,
// //   ShoppingCart,
// //   CreditCard,
// //   Calculator,
// //   Settings,
// //   BarChart3,
// //   Users,
// //   MessageSquare,
// // } from "lucide-react";

// // // ✅ User Sidebar
// // export const USER_NAV_SECTIONS = [
// //   {
// //     label: "PLANS",
// //     items: [
// //       { to: "/plans", label: "Plans", icon: LayoutGrid },
// //       { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
// //       { to: "/pricing", label: "Pricing", icon: CreditCard },
// //     ],
// //   },
// //   {
// //     label: "COMPANY",
// //     items: [
// //       { to: "/about", label: "About", icon: Info },
// //       { to: "/contact", label: "Contact Us", icon: Phone },
// //     ],
// //   },
// //   {
// //     label: "USER",
// //     items: [
// //       { to: "/favorites", label: "Favourite", icon: Heart },
// //       { to: "/cart", label: "Cart", icon: ShoppingCart },
// //       { to: "/payment-method", label: "Payment Method", icon: CreditCard },
// //     ],
// //   },
// // ];

// // // ✅ Admin Sidebar
// // export const ADMIN_NAV_SECTIONS = [
// //   {
// //     label: "DASHBOARD",
// //     items: [
// //       { to: "/admin/overview", label: "Overview", icon: BarChart3 },
// //       { to: "/plans", label: "Plans", icon: LayoutGrid },
// //       { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
// //     ],
// //   },
// //   {
// //     label: "MANAGEMENT",
// //     items: [
// //       { to: "/admin/plans", label: "Plans Management", icon: Settings },
// //       { to: "/admin/users", label: "Users", icon: Users },
// //     ],
// //   },
// // ];

// src/components/sidebar/sidebarConfig.js
import {
  LayoutGrid,
  Info,
  Phone,
  Heart,
  ShoppingCart,
  CreditCard,
  Calculator,
  Settings,
  BarChart3,
  Users,
  MessageSquare,
} from "lucide-react";

// ✅ User Sidebar (الأساسي للكل)
export const USER_NAV_SECTIONS = [
  {
    label: "PLANS",
    items: [
      { to: "/plans", label: "Plans", icon: LayoutGrid },
      { to: "/cost-calculator", label: "Cost Calculator", icon: Calculator },
      { to: "/pricing", label: "Pricing", icon: CreditCard },
    ],
  },
  {
    label: "COMPANY",
    items: [
      { to: "/about", label: "About", icon: Info },
      { to: "/contact", label: "Contact Us", icon: Phone },
    ],
  },
  {
    label: "USER",
    items: [
      { to: "/favorites", label: "Favourite", icon: Heart },
      { to: "/cart", label: "Cart", icon: ShoppingCart },
      { to: "/payment-method", label: "Payment Method", icon: CreditCard },
    ],
  },
];

// ✅ Admin Extra Sections (بس اللي هتتضاف في الآخر للأدمن)
export const ADMIN_EXTRA_SECTIONS = [
  {
    label: "DASHBOARD",
    items: [
      { to: "/admin/overview", label: "Overview", icon: BarChart3 },
      { to: "/admin/contacts", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { to: "/admin/plans", label: "Plans Management", icon: Settings },
      { to: "/admin/users", label: "Users", icon: Users },
    ],
  },
];
