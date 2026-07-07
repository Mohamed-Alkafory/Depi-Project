// src/pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import {
  useCartQuery,
  useRemoveFromCart,
  useClearCart,
} from "@/features/cart/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { ShoppingCart, ArrowRight, Trash2, Package } from "lucide-react";

export function Cart() {
  const navigate = useNavigate();
  const { data: items, isLoading } = useCartQuery();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const validItems = (items || []).filter(
    (item) => item.plans?.status === "available",
  );
  const removedCount = (items?.length || 0) - validItems.length;

  const total = validItems.reduce(
    (sum, item) => sum + Number(item.plans?.price || 0),
    0,
  );

  // Empty cart
  if (validItems.length === 0) {
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
            Looks like you haven't added any plans yet.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-medium transition-colors"
          >
            Browse Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <ShoppingCart size={20} className="text-teal-600" />
            </div>
            Shopping Cart
          </h1>
          <button
            onClick={() => clearCart()}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {removedCount > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 text-sm font-bold">!</span>
                </div>
                <p className="text-yellow-700 text-sm">
                  {removedCount} item(s) removed because they're no longer
                  available.
                </p>
              </div>
            )}

            {validItems.map((item) => (
              <CartItem
                key={item.id}
                item={{ ...item.plans, cartRowId: item.id }}
                onRemove={() => removeFromCart(item.plan_id)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Order Summary
                </h2>
                <p className="text-sm text-gray-500">
                  {validItems.length} items
                </p>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    EGP {total.toLocaleString("en-EG")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-teal-600">
                    EGP {total.toLocaleString("en-EG")}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
                <button
                  onClick={() => navigate("/plans")}
                  className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
