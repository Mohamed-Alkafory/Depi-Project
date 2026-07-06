// // src/pages/Cart.jsx
// import { useCart } from "@/store/useCart";
// import { usePlans } from "@/features/plans/hooks/usePlans"; // relative path
// import { CartItem } from "@/components/cart/CartItem";
// import { ShoppingCart } from "lucide-react";

// export function Cart() {
//   const { items, removeFromCart, clearCart } = useCart();
//   const { data: plans } = usePlans();

//   // ✅ نتأكد إن كل item لسه available
//   const validItems = items.filter((item) => {
//     const currentPlan = plans?.find((p) => p.id === item.id);
//     return currentPlan?.status === "available";
//   });

//   const removedItems = items.length - validItems.length;
//   const total = validItems.reduce(
//     (sum, item) => sum + Number(item.price || 0),
//     0,
//   );

//   return (
//     <div className="mx-auto max-w-3xl px-4 py-8">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//           <ShoppingCart size={24} className="text-teal-600" />
//           Cart
//         </h1>
//         {validItems.length > 0 && (
//           <button
//             onClick={clearCart}
//             className="text-sm text-red-500 hover:text-red-600 transition-colors"
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {removedItems > 0 && (
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
//           <p className="text-yellow-700 text-sm">
//             {removedItems} item(s) were removed because they are no longer
//             available.
//           </p>
//         </div>
//       )}

//       {validItems.length === 0 ? (
//         <div className="text-center py-16">
//           <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
//           <p className="text-gray-500">Your cart is empty</p>
//         </div>
//       ) : (
//         <>
//           <div className="space-y-4">
//             {validItems.map((item) => (
//               <CartItem key={item.id} item={item} onRemove={removeFromCart} />
//             ))}
//           </div>

//           {/* Total */}
//           <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">
//                 Total ({validItems.length} items)
//               </span>
//               <span className="text-xl font-bold text-gray-900">
//                 EGP {total.toLocaleString("en-EG")}
//               </span>
//             </div>
//             <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors">
//               Proceed to Checkout
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// src/pages/Cart.jsx
import {
  useCartQuery,
  useRemoveFromCart,
  useClearCart,
} from "@/features/cart/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { ShoppingCart } from "lucide-react";

export function Cart() {
  const { data: items, isLoading } = useCartQuery();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: clearCart } = useClearCart();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-gray-400">
        Loading cart...
      </div>
    );
  }

  // Each cart row carries its live plan data via the join, so this filter
  // reflects the plan's *current* status, not whatever it was when added.
  const validItems = (items || []).filter(
    (item) => item.plans?.status === "available",
  );
  const removedCount = (items?.length || 0) - validItems.length;

  const total = validItems.reduce(
    (sum, item) => sum + Number(item.plans?.price || 0),
    0,
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <ShoppingCart size={24} className="text-teal-600" />
          Cart
        </h1>
        {validItems.length > 0 && (
          <button
            onClick={() => clearCart()}
            className="text-sm text-red-500 hover:text-red-600 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {removedCount > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-700 text-sm">
            {removedCount} item(s) were removed because they are no longer
            available.
          </p>
        </div>
      )}

      {validItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {validItems.map((item) => (
              <CartItem
                key={item.id}
                item={{ ...item.plans, cartRowId: item.id }}
                onRemove={() => removeFromCart(item.plan_id)}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">
                Total ({validItems.length} items)
              </span>
              <span className="text-xl font-bold text-gray-900">
                EGP {total.toLocaleString("en-EG")}
              </span>
            </div>
            <button className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
