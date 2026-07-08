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
// import Profile from "../pages/Profile";

// // Orders
// import OrdersPage from "../pages/OrdersPage";
// import OrderDetails from "../pages/OrderDetails";

// // Admin
// import { AdminRoute } from "./AdminRoute";
// import { PlansManagement } from "../pages/admin/PlansManagement";
// import AdminOverview from "../pages/admin/AdminOverview";
// import AdminContacts from "../pages/admin/AdminContacts";
// import AdminUsers from "../pages/admin/AdminUsers";
// import AdminOrders from "../pages/admin/AdminOrders";

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

//       {/* Dashboard - User routes */}
//       <Route element={<DashboardLayout />}>
//         <Route path="plans" element={<Plans />} />
//         <Route path="plans/:slug" element={<PlanDetails />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="cost-calculator" element={<CostCalculatorPage />} />
//         <Route path="cart" element={<Cart />} />
//         <Route path="orders" element={<OrdersPage />} />
//         <Route path="orders/:id" element={<OrderDetails />} />
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

//       {/* ✅ Admin - nested routes with Outlet */}
//       <Route element={<AdminRoute />}>
//         <Route element={<DashboardLayout />}>
//           <Route path="admin/overview" element={<AdminOverview />} />
//           <Route path="admin/plans" element={<PlansManagement />} />
//           <Route path="admin/contacts" element={<AdminContacts />} />
//           <Route path="admin/users" element={<AdminUsers />} />
//           <Route path="admin/orders" element={<AdminOrders />} />
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
// import { TestAuthPage } from "../pages/TestAuthPage";
import { AuthCallback } from "../pages/AuthCallback";
import PlanDetails from "../pages/PlanDetails";
import Profile from "../pages/Profile";

// Orders
import OrdersPage from "../pages/OrdersPage";
import OrderDetails from "../pages/OrderDetails";

// Admin
import { AdminRoute } from "./AdminRoute";
import { PlansManagement } from "../pages/admin/PlansManagement";
import AdminOverview from "../pages/admin/AdminOverview";
import AdminContacts from "../pages/admin/AdminContacts";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminOrders from "../pages/admin/AdminOrders";

export function AppRouter() {
  return (
    <Routes>
      {/* Auth Callback */}
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Website — Public pages (مع Navbar + Footer فقط) */}
      <Route element={<WebsiteLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        {/* <Route path="test-auth" element={<TestAuthPage />} /> */}
      </Route>

      {/* Dashboard — User pages (مع Navbar + Sidebar + Footer) */}
      <Route element={<DashboardLayout />}>
        {/* Public في Dashboard (مش محتاج login) */}
        <Route path="plans" element={<Plans />} />
        <Route path="plans/:slug" element={<PlanDetails />} />
        <Route path="cost-calculator" element={<CostCalculatorPage />} />

        {/* Protected في Dashboard */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
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

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="admin/overview" element={<AdminOverview />} />
          <Route path="admin/plans" element={<PlansManagement />} />
          <Route path="admin/contacts" element={<AdminContacts />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
