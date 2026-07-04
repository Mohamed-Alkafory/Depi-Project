import { Routes, Route } from "react-router-dom";

import { Layout } from "../components/layout/Layout";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contact } from "../pages/Contact";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import { Pricing } from "../pages/Pricing";
import { Favorites } from "../pages/Favorites";
import { NotFound } from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="cart" element={<Cart />} />

        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
