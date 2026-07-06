// import { Routes, Route } from "react-router-dom";

// import WebsiteLayout from "../components/layout/WebsiteLayout";
// import DashboardLayout from "../components/layout/DashboardLayout";

// import Home from "../pages/Home";
// import { About } from "../pages/About";
// import { Contact } from "../pages/Contact";
// import { Cart } from "../pages/Cart";
// import { Checkout } from "../pages/Checkout";
// import { Plans } from "../pages/Plans";
// import { Favorites } from "../pages/Favorites";
// import { NotFound } from "../pages/NotFound";
// import { ProtectedRoute } from "./ProtectedRoute";
// import CostCalculatorPage from "../pages/CostCalculatorPage";
// import { TestAuthPage } from "../pages/TestAuthPage";
// import { AuthCallback } from "../pages/AuthCallback";

// // Admin
// import { AdminRoute } from "./AdminRoute";
// import { PlansManagement } from "../pages/admin/PlansManagement";

// export function AppRouter() {
//   return (
//     <Routes>
//       {/* Auth Callback */}
//       <Route path="/auth/callback" element={<AuthCallback />} />

//       {/* Website */}
//       <Route element={<WebsiteLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="test-auth" element={<TestAuthPage />} />
//       </Route>

//       {/* Dashboard */}
//       <Route element={<DashboardLayout />}>
//         <Route path="plans" element={<Plans />} />
//         <Route path="cost-calculator" element={<CostCalculatorPage />} />
//         <Route path="cart" element={<Cart />} />

//         <Route
//           path="favorites"
//           element={
//             <ProtectedRoute>
//               <Favorites />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Admin */}
//       <Route element={<AdminRoute />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="admin/plans" element={<PlansManagement />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// // src/router/AppRouter.jsx
// import { Routes, Route } from "react-router-dom";

// import WebsiteLayout from "../components/layout/WebsiteLayout";
// import DashboardLayout from "../components/layout/DashboardLayout";

// import Home from "../pages/Home";
// import { About } from "../pages/About";
// import { Contact } from "../pages/Contact";
// import { Cart } from "../pages/Cart";
// import { Checkout } from "../pages/Checkout";
// import { Plans } from "../pages/Plans";
// import { Favorites } from "../pages/Favorites";
// import { NotFound } from "../pages/NotFound";
// import { ProtectedRoute } from "./ProtectedRoute";
// import CostCalculatorPage from "../pages/CostCalculatorPage";
// import { TestAuthPage } from "../pages/TestAuthPage";
// import { AuthCallback } from "../pages/AuthCallback";
// import PlanDetails from "../pages/PlanDetails";

// // Admin
// import { AdminRoute } from "./AdminRoute";
// import { PlansManagement } from "../pages/admin/PlansManagement";
// import Profile from "@/pages/Profile";

// export function AppRouter() {
//   return (
//     <Routes>
//       {/* Auth Callback */}
//       <Route path="/auth/callback" element={<AuthCallback />} />

//       {/* Website */}
//       <Route element={<WebsiteLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="test-auth" element={<TestAuthPage />} />
//       </Route>

//       {/* Dashboard - كل حاجة مع sidebar */}
//       <Route element={<DashboardLayout />}>
//         <Route path="plans" element={<Plans />} />
//         <Route path="plans/:slug" element={<PlanDetails />} />
//         <Route path="cost-calculator" element={<CostCalculatorPage />} />
//         <Route path="cart" element={<Cart />} />
//         <Route path="profile" element={<Profile />} />

//         <Route
//           path="favorites"
//           element={
//             <ProtectedRoute>
//               <Favorites />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Admin */}
//       <Route element={<AdminRoute />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="admin/plans" element={<PlansManagement />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
// src/router/AppRouter.jsx
import { Routes, Route } from "react-router-dom";

import WebsiteLayout from "../components/layout/WebsiteLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

import Home from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Plans } from "../pages/Plans";
import { Favorites } from "../pages/Favorites";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import CostCalculatorPage from "../pages/CostCalculatorPage";
import { TestAuthPage } from "../pages/TestAuthPage";
import { AuthCallback } from "../pages/AuthCallback";
import PlanDetails from "../pages/PlanDetails";
import Profile from "../pages/Profile"; // ← جديد

// Admin
import { AdminRoute } from "./AdminRoute";
import { PlansManagement } from "../pages/admin/PlansManagement";

// export function AppRouter() {
//   return (
//     <Routes>
//       {/* Auth Callback */}
//       <Route path="/auth/callback" element={<AuthCallback />} />

//       {/* Website */}
//       <Route element={<WebsiteLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="test-auth" element={<TestAuthPage />} />
//       </Route>

//       {/* Dashboard */}
//       <Route element={<DashboardLayout />}>
//         <Route path="plans" element={<Plans />} />
//         <Route path="plans/:slug" element={<PlanDetails />} />
//         <Route path="profile" element={<Profile />} /> {/* ← جديد */}
//         <Route path="cost-calculator" element={<CostCalculatorPage />} />
//         <Route path="cart" element={<Cart />} />
//         <Route
//           path="favorites"
//           element={
//             <ProtectedRoute>
//               <Favorites />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* Admin */}
//       <Route element={<AdminRoute />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="admin/plans" element={<PlansManagement />} />
//         </Route>
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// export function AppRouter() {
//   return (
//     <Routes>
//       {/* Auth Callback */}
//       <Route path="/auth/callback" element={<AuthCallback />} />

//       {/* Website */}
//       <Route element={<WebsiteLayout />}>
//         <Route index element={<Home />} />
//         <Route path="about" element={<About />} />
//         <Route path="contact" element={<Contact />} />
//         <Route path="test-auth" element={<TestAuthPage />} />
//       </Route>

//       {/* Dashboard */}
//       <Route element={<DashboardLayout />}>
//         <Route path="plans" element={<Plans />} />
//         <Route path="plans/:slug" element={<PlanDetails />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="cost-calculator" element={<CostCalculatorPage />} />
//         <Route path="cart" element={<Cart />} />
//         <Route
//           path="favorites"
//           element={
//             <ProtectedRoute>
//               <Favorites />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="checkout"
//           element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           }
//         />
//       </Route>

//       {/* ✅ Admin - استخدم element مش nested routes */}
//       <Route
//         path="admin/plans"
//         element={
//           <AdminRoute>
//             <DashboardLayout>
//               <PlansManagement />
//             </DashboardLayout>
//           </AdminRoute>
//         }
//       />

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }
export function AppRouter() {
  return (
    <Routes>
      {/* Auth Callback */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Website */}
      <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="test-auth" element={<TestAuthPage />} />
      </Route>

      {/* Dashboard - User routes */}
      <Route element={<DashboardLayout />}>
        <Route path="plans" element={<Plans />} />
        <Route path="plans/:slug" element={<PlanDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cost-calculator" element={<CostCalculatorPage />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* ✅ Admin - nested routes with Outlet */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="admin/plans" element={<PlansManagement />} />
          {/* <Route path="admin/overview" element={<AdminOverview />} /> */}
          {/* <Route path="admin/contacts" element={<AdminContacts />} /> */}
          {/* <Route path="admin/users" element={<AdminUsers />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
