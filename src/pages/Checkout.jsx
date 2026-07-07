// src/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartQuery, useClearCart } from "@/features/cart/hooks/useCart";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  ArrowLeft,
  Phone,
  User,
  Mail,
  FileText,
  CheckCircle,
  Package,
  Download,
  Clock,
  MapPin,
} from "lucide-react";

export function Checkout() {
  const navigate = useNavigate();
  const { data: items, isLoading: cartLoading } = useCartQuery();
  const { mutate: clearCart } = useClearCart();
  const user = useAuthStore((s) => s.user);
  const { profile } = useProfile();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    phone: profile?.phone || "",
    email: user?.email || "",
    address: "",
    city: "",
    notes: "",
  });

  const validItems = (items || []).filter(
    (item) => item.plans?.status === "available",
  );

  const total = validItems.reduce(
    (sum, item) => sum + Number(item.plans?.price || 0),
    0,
  );

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validItems.length) {
      toast.error("Cart is empty");
      return;
    }

    setLoading(true);
    let createdOrder = null;

    try {
      // 1) Create order header
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          status: "pending",
          payment_method: "cod",
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          // city: formData.city,
          notes: formData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;
      createdOrder = order;

      // 2) Create order_items for each plan
      const orderItems = validItems.map((item) => ({
        order_id: order.id,
        plan_id: item.plan_id,
        plan_title: item.plans.title,
        plan_price: item.plans.price,
        quantity: 1,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3) Clear cart (removes the "cart" rows in Supabase + invalidates the query)
      clearCart();

      setStep(3);
      toast.success("Order submitted successfully!");
    } catch (error) {
      console.error("Checkout error:", error);
      // Roll back the order header if items failed, so we don't leave an
      // empty/broken order behind in the admin's orders list.
      if (createdOrder) {
        await supabase.from("orders").delete().eq("id", createdOrder.id);
      }
      toast.error(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty cart
  if (!validItems.length && step !== 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some house plans to get started.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Browse House Plans
          </button>
        </div>
      </div>
    );
  }

  // Success
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Order Received!
          </h2>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">
              What happens next?
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-3">
                <Clock
                  size={16}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span>Our team will review your order within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  size={16}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span>We'll call you to confirm details and payment</span>
              </li>
              <li className="flex items-start gap-3">
                <Download
                  size={16}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  After payment, you'll receive the full plan files via email
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FileText
                  size={16}
                  className="text-teal-600 mt-0.5 flex-shrink-0"
                />
                <span>
                  Includes: Floor plans, 3D renders, material list, and
                  construction guide
                </span>
              </li>
            </ul>
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/orders")}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate("/plans")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse More Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Cart</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-teal-50 text-teal-700">
                <FileText size={14} />
                Plan Purchase
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <User size={20} className="text-teal-600" />
                  Contact Information
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  We'll use this to send your plan files
                </p>
              </div>

              {/* id here is what the sidebar's submit button links to via form="checkout-form" */}
              <form
                id="checkout-form"
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone
                        size={16}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="+20 123 456 7890"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      readOnly
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Plan files will be sent to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3.5 top-3.5 text-gray-400"
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Street, building, area..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    placeholder="Cairo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                    placeholder="Any specific requirements or questions..."
                  />
                </div>
              </form>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Package size={20} className="text-teal-600" />
                  What's Included
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: FileText,
                      title: "Floor Plans",
                      desc: "Detailed architectural drawings",
                    },
                    {
                      icon: Download,
                      title: "3D Renders",
                      desc: "High-quality visualizations",
                    },
                    {
                      icon: FileText,
                      title: "Material List",
                      desc: "Complete BOM for construction",
                    },
                    {
                      icon: FileText,
                      title: "Construction Guide",
                      desc: "Step-by-step building instructions",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} className="text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
                <p className="text-sm text-gray-500">
                  {validItems.length} plan(s)
                </p>
              </div>

              <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                {validItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.plans.cover_image}
                        alt={item.plans.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {item.plans.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.plans.area} m² • {item.plans.bedrooms} beds •{" "}
                        {item.plans.style}
                      </p>
                      <p className="text-teal-600 font-bold mt-1">
                        EGP {item.plans.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    EGP {total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-green-600 font-medium">Digital</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-teal-600">
                    EGP {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Submit Order
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-3">
                  We'll contact you within 24 hours to confirm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
