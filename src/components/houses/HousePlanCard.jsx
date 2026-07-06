// // "use client";
// // import {
// //   Heart,
// //   Ruler,
// //   BedDouble,
// //   Bath,
// //   Building2,
// //   ShoppingCart,
// // } from "lucide-react";
// // import { useFavorites } from "@/store/useFavorites";
// // import { useCart } from "@/store/useCart"; // ← لو عندك cart store

// // function formatPrice(price) {
// //   if (!price) return "EGP 0";
// //   return `EGP ${Number(price).toLocaleString("en-EG")}`;
// // }

// // export default function HousePlanCard({ plan }) {
// //   const favoriteIds = useFavorites((s) => s.favoriteIds);
// //   const toggleFavorite = useFavorites((s) => s.toggleFavorite);
// //   const isFav = favoriteIds.includes(plan.id);

// //   const addToCart = useCart((s) => s.addToCart); // ← لو عندك cart store

// //   const coverImage =
// //     plan.cover_image ||
// //     plan.plan_images?.find((img) => img.image_type === "cover")?.image_url ||
// //     plan.plan_images?.[0]?.image_url;

// //   const totalArea = plan.area || 0;
// //   const bedrooms = plan.bedrooms || 0;
// //   const bathrooms = plan.bathrooms || 0;
// //   const floors = plan.floors || 1;
// //   const price = plan.price || 0;

// //   // ✅ Status configs
// //   const statusConfig = {
// //     available: {
// //       badge: null, // مفيش badge
// //       canFavorite: true,
// //       canAddToCart: true,
// //     },
// //     sold_out: {
// //       badge: { text: "Sold Out", class: "bg-red-100 text-red-700" },
// //       canFavorite: false, // ❌ مينفعش يضيف للمفضلة
// //       canAddToCart: false,
// //     },
// //     coming_soon: {
// //       badge: { text: "Coming Soon", class: "bg-yellow-100 text-yellow-700" },
// //       canFavorite: true, // ✅ يقدر يضيف للمفضلة عشان يستنى
// //       canAddToCart: false,
// //     },
// //   };

// //   const status = statusConfig[plan.status] || statusConfig.available;

// //   return (
// //     <div className="group w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-gray-100 relative">
// //       {/* Status Badge */}
// //       {status.badge && (
// //         <div
// //           className={`absolute top-3 left-3 z-20 px-2 py-1 rounded-full text-[11px] font-medium ${status.badge.class}`}
// //         >
// //           {status.badge.text}
// //         </div>
// //       )}

// //       <div className="relative overflow-hidden">
// //         {coverImage ? (
// //           <img
// //             src={coverImage}
// //             alt={plan.title}
// //             className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
// //           />
// //         ) : (
// //           <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-neutral-400">
// //             <Building2 size={32} />
// //           </div>
// //         )}

// //         {/* Favorite Button */}
// //         {status.canFavorite && (
// //           <button
// //             onClick={() => toggleFavorite(plan.id)}
// //             aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
// //             className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
// //               isFav
// //                 ? "bg-white/90 text-red-500 hover:bg-white"
// //                 : "bg-white/90 text-neutral-600 hover:bg-white hover:text-red-500"
// //             }`}
// //           >
// //             <Heart size={16} fill={isFav ? "currentColor" : "none"} />
// //           </button>
// //         )}

// //         {/* Sold Out Overlay */}
// //         {plan.status === "sold_out" && (
// //           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
// //             <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
// //               SOLD OUT
// //             </span>
// //           </div>
// //         )}
// //       </div>

// //       <div className="flex flex-col gap-3 p-4">
// //         <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
// //           {plan.title}
// //         </h3>

// //         <p className="text-lg font-bold text-neutral-900">
// //           {formatPrice(price)}
// //         </p>

// //         <div className="h-px bg-neutral-100" />

// //         <div className="grid grid-cols-2 gap-y-3 gap-x-4">
// //           <div className="flex items-center gap-2.5">
// //             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
// //               <Ruler size={14} className="text-teal-600" />
// //             </span>
// //             <div className="flex flex-col">
// //               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
// //                 Area
// //               </span>
// //               <span className="text-xs font-semibold text-neutral-800">
// //                 {totalArea} m&sup2;
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2.5">
// //             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
// //               <BedDouble size={14} className="text-teal-600" />
// //             </span>
// //             <div className="flex flex-col">
// //               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
// //                 Beds
// //               </span>
// //               <span className="text-xs font-semibold text-neutral-800">
// //                 {bedrooms}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2.5">
// //             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
// //               <Bath size={14} className="text-teal-600" />
// //             </span>
// //             <div className="flex flex-col">
// //               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
// //                 Baths
// //               </span>
// //               <span className="text-xs font-semibold text-neutral-800">
// //                 {bathrooms}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-2.5">
// //             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
// //               <Building2 size={14} className="text-teal-600" />
// //             </span>
// //             <div className="flex flex-col">
// //               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
// //                 Floors
// //               </span>
// //               <span className="text-xs font-semibold text-neutral-800">
// //                 {floors}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Add to Cart Button */}
// //         {status.canAddToCart ? (
// //           <button
// //             onClick={() => addToCart(plan)}
// //             className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
// //           >
// //             <ShoppingCart size={16} />
// //             Add to Cart
// //           </button>
// //         ) : plan.status === "sold_out" ? (
// //           <button
// //             disabled
// //             className="w-full mt-2 bg-gray-200 text-gray-400 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
// //           >
// //             Sold Out
// //           </button>
// //         ) : plan.status === "coming_soon" ? (
// //           <button
// //             disabled
// //             className="w-full mt-2 bg-yellow-100 text-yellow-700 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
// //           >
// //             Coming Soon
// //           </button>
// //         ) : null}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";
// import { Link } from "react-router-dom";
// import {
//   Heart,
//   Ruler,
//   BedDouble,
//   Bath,
//   Building2,
//   ShoppingCart,
// } from "lucide-react";
// import { useFavorites } from "@/store/useFavorites";
// import { useCart } from "@/store/useCart";

// function formatPrice(price) {
//   if (!price) return "EGP 0";
//   return `EGP ${Number(price).toLocaleString("en-EG")}`;
// }

// export default function HousePlanCard({ plan }) {
//   const favoriteIds = useFavorites((s) => s.favoriteIds);
//   const toggleFavorite = useFavorites((s) => s.toggleFavorite);
//   const isFav = favoriteIds.includes(plan.id);

//   const addToCart = useCart((s) => s.addToCart);

//   const coverImage =
//     plan.cover_image ||
//     plan.plan_images?.find((img) => img.image_type === "cover")?.image_url ||
//     plan.plan_images?.[0]?.image_url;

//   const totalArea = plan.area || 0;
//   const bedrooms = plan.bedrooms || 0;
//   const bathrooms = plan.bathrooms || 0;
//   const floors = plan.floors || 1;
//   const price = plan.price || 0;

//   const statusConfig = {
//     available: {
//       badge: null,
//       canFavorite: true,
//       canAddToCart: true,
//     },
//     sold_out: {
//       badge: { text: "Sold Out", class: "bg-red-100 text-red-700" },
//       canFavorite: false,
//       canAddToCart: false,
//     },
//     coming_soon: {
//       badge: { text: "Coming Soon", class: "bg-yellow-100 text-yellow-700" },
//       canFavorite: true,
//       canAddToCart: false,
//     },
//   };

//   const status = statusConfig[plan.status] || statusConfig.available;

//   return (
//     <Link
//       to={`/plans/${plan.slug}`}
//       className="group w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-gray-100 relative block"
//     >
//       {status.badge && (
//         <div
//           className={`absolute top-3 left-3 z-20 px-2 py-1 rounded-full text-[11px] font-medium ${status.badge.class}`}
//         >
//           {status.badge.text}
//         </div>
//       )}

//       <div className="relative overflow-hidden">
//         {coverImage ? (
//           <img
//             src={coverImage}
//             alt={plan.title}
//             className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-neutral-400">
//             <Building2 size={32} />
//           </div>
//         )}

//         {/* Favorite Button */}
//         {status.canFavorite && (
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               toggleFavorite(plan.id);
//             }}
//             aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
//             className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
//               isFav
//                 ? "bg-white/90 text-red-500 hover:bg-white"
//                 : "bg-white/90 text-neutral-600 hover:bg-white hover:text-red-500"
//             }`}
//           >
//             <Heart size={16} fill={isFav ? "currentColor" : "none"} />
//           </button>
//         )}

//         {plan.status === "sold_out" && (
//           <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
//             <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
//               SOLD OUT
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-col gap-3 p-4">
//         <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
//           {plan.title}
//         </h3>

//         <p className="text-lg font-bold text-neutral-900">
//           {formatPrice(price)}
//         </p>

//         <div className="h-px bg-neutral-100" />

//         <div className="grid grid-cols-2 gap-y-3 gap-x-4">
//           <div className="flex items-center gap-2.5">
//             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
//               <Ruler size={14} className="text-teal-600" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
//                 Area
//               </span>
//               <span className="text-xs font-semibold text-neutral-800">
//                 {totalArea} m&sup2;
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2.5">
//             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
//               <BedDouble size={14} className="text-teal-600" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
//                 Beds
//               </span>
//               <span className="text-xs font-semibold text-neutral-800">
//                 {bedrooms}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2.5">
//             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
//               <Bath size={14} className="text-teal-600" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
//                 Baths
//               </span>
//               <span className="text-xs font-semibold text-neutral-800">
//                 {bathrooms}
//               </span>
//             </div>
//           </div>

//           <div className="flex items-center gap-2.5">
//             <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
//               <Building2 size={14} className="text-teal-600" />
//             </span>
//             <div className="flex flex-col">
//               <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
//                 Floors
//               </span>
//               <span className="text-xs font-semibold text-neutral-800">
//                 {floors}
//               </span>
//             </div>
//           </div>
//         </div>

//         {status.canAddToCart ? (
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               addToCart(plan);
//             }}
//             className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
//           >
//             <ShoppingCart size={16} />
//             Add to Cart
//           </button>
//         ) : plan.status === "sold_out" ? (
//           <button
//             disabled
//             className="w-full mt-2 bg-gray-200 text-gray-400 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
//           >
//             Sold Out
//           </button>
//         ) : plan.status === "coming_soon" ? (
//           <button
//             disabled
//             className="w-full mt-2 bg-yellow-100 text-yellow-700 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
//           >
//             Coming Soon
//           </button>
//         ) : null}
//       </div>
//     </Link>
//   );
// }
"use client";
import { Link } from "react-router-dom";
import {
  Heart,
  Ruler,
  BedDouble,
  Bath,
  Building2,
  ShoppingCart,
} from "lucide-react";
import {
  useIsFavorite,
  useToggleFavorite,
} from "@/features/favorites/hooks/useFavorites";
import { useAddToCart } from "@/features/cart/hooks/useCart";

function formatPrice(price) {
  if (!price) return "EGP 0";
  return `EGP ${Number(price).toLocaleString("en-EG")}`;
}

export default function HousePlanCard({ plan }) {
  const isFav = useIsFavorite(plan.id);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { mutate: addToCart } = useAddToCart();

  const coverImage =
    plan.cover_image ||
    plan.plan_images?.find((img) => img.image_type === "cover")?.image_url ||
    plan.plan_images?.[0]?.image_url;

  const totalArea = plan.area || 0;
  const bedrooms = plan.bedrooms || 0;
  const bathrooms = plan.bathrooms || 0;
  const floors = plan.floors || 1;
  const price = plan.price || 0;

  const statusConfig = {
    available: { badge: null, canFavorite: true, canAddToCart: true },
    sold_out: {
      badge: { text: "Sold Out", class: "bg-red-100 text-red-700" },
      canFavorite: false,
      canAddToCart: false,
    },
    coming_soon: {
      badge: { text: "Coming Soon", class: "bg-yellow-100 text-yellow-700" },
      canFavorite: true,
      canAddToCart: false,
    },
  };

  const status = statusConfig[plan.status] || statusConfig.available;

  return (
    <Link
      to={`/plans/${plan.slug}`}
      className="group w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-gray-100 relative block"
    >
      {status.badge && (
        <div
          className={`absolute top-3 left-3 z-20 px-2 py-1 rounded-full text-[11px] font-medium ${status.badge.class}`}
        >
          {status.badge.text}
        </div>
      )}

      <div className="relative overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt={plan.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-neutral-400">
            <Building2 size={32} />
          </div>
        )}

        {status.canFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(plan);
            }}
            aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
            className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
              isFav
                ? "bg-white/90 text-red-500 hover:bg-white"
                : "bg-white/90 text-neutral-600 hover:bg-white hover:text-red-500"
            }`}
          >
            <Heart size={16} fill={isFav ? "currentColor" : "none"} />
          </button>
        )}

        {plan.status === "sold_out" && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
          {plan.title}
        </h3>
        <p className="text-lg font-bold text-neutral-900">
          {formatPrice(price)}
        </p>
        <div className="h-px bg-neutral-100" />

        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
              <Ruler size={14} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Area
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {totalArea} m&sup2;
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
              <BedDouble size={14} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Beds
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {bedrooms}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
              <Bath size={14} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Baths
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {bathrooms}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100">
              <Building2 size={14} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-medium uppercase tracking-wide text-neutral-400">
                Floors
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {floors}
              </span>
            </div>
          </div>
        </div>

        {status.canAddToCart ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(plan);
            }}
            className="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        ) : plan.status === "sold_out" ? (
          <button
            disabled
            className="w-full mt-2 bg-gray-200 text-gray-400 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            Sold Out
          </button>
        ) : plan.status === "coming_soon" ? (
          <button
            disabled
            className="w-full mt-2 bg-yellow-100 text-yellow-700 py-2 rounded-lg text-sm font-medium cursor-not-allowed"
          >
            Coming Soon
          </button>
        ) : null}
      </div>
    </Link>
  );
}
