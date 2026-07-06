// // src/pages/PlanDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { usePlan } from "@/features/plans/hooks/usePlan";
// import { useFavorites } from "@/store/useFavorites";
// import { useCart } from "@/store/useCart";
// import ImageGallery from "@/features/plans/components/ImageGallery";
// import PlanSpecs from "@/features/plans/components/PlanSpecs";
// import {
//   Heart,
//   ShoppingCart,
//   ArrowLeft,
//   Share2,
//   Loader2,
//   AlertCircle,
// } from "lucide-react";

// function formatPrice(price) {
//   if (!price) return "EGP 0";
//   return `EGP ${Number(price).toLocaleString("en-EG")}`;
// }

// export default function PlanDetails() {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const { data: plan, isLoading, error } = usePlan(slug);

//   const favoriteIds = useFavorites((s) => s.favoriteIds);
//   const toggleFavorite = useFavorites((s) => s.toggleFavorite);
//   const addToCart = useCart((s) => s.addToCart);

//   const isFav = plan ? favoriteIds.includes(plan.id) : false;

//   // Status configs
//   const statusConfig = {
//     available: {
//       badge: null,
//       canFavorite: true,
//       canAddToCart: true,
//       buttonText: "Add to Cart",
//       buttonClass: "bg-teal-600 hover:bg-teal-700 text-white",
//     },
//     sold_out: {
//       badge: { text: "Sold Out", class: "bg-red-100 text-red-700" },
//       canFavorite: false,
//       canAddToCart: false,
//       buttonText: "Sold Out",
//       buttonClass: "bg-gray-200 text-gray-400 cursor-not-allowed",
//     },
//     coming_soon: {
//       badge: { text: "Coming Soon", class: "bg-yellow-100 text-yellow-700" },
//       canFavorite: true,
//       canAddToCart: false,
//       buttonText: "Coming Soon",
//       buttonClass: "bg-yellow-100 text-yellow-700 cursor-not-allowed",
//     },
//   };

//   const status = plan
//     ? statusConfig[plan.status] || statusConfig.available
//     : statusConfig.available;

//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       // ممكن تضيف toast هنا
//       alert("Link copied to clipboard!");
//     } catch (err) {
//       console.error("Failed to copy:", err);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <Loader2 className="size-8 animate-spin text-teal-600" />
//       </div>
//     );
//   }

//   if (error || !plan) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
//         <AlertCircle className="size-12 text-red-500" />
//         <h2 className="text-xl font-bold text-neutral-900">Plan not found</h2>
//         <button
//           onClick={() => navigate("/plans")}
//           className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
//         >
//           <ArrowLeft size={18} />
//           Back to Plans
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-neutral-50 pb-16">
//       {/* Back Button */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
//         <button
//           onClick={() => navigate("/plans")}
//           className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
//         >
//           <ArrowLeft size={16} />
//           Back to Plans
//         </button>
//       </div>

//       {/* Hero Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//           {/* Image */}
//           <div className="relative">
//             {status.badge && (
//               <div
//                 className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium ${status.badge.class}`}
//               >
//                 {status.badge.text}
//               </div>
//             )}
//             <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
//               {plan.cover_image ? (
//                 <img
//                   src={plan.cover_image}
//                   alt={plan.title}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <div className="flex items-center justify-center h-full text-neutral-400">
//                   No Image Available
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Info */}
//           <div className="flex flex-col gap-6">
//             <div>
//               <div className="flex items-center gap-3 mb-2">
//                 <span className="text-sm text-neutral-500">
//                   {plan.categories?.name} • {plan.style}
//                 </span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
//                 {plan.title}
//               </h1>
//             </div>

//             <p className="text-3xl font-bold text-teal-600">
//               {formatPrice(plan.price)}
//             </p>

//             {/* Quick Specs */}
//             <PlanSpecs plan={plan} compact />

//             {/* Actions */}
//             <div className="flex flex-wrap gap-3">
//               {status.canAddToCart ? (
//                 <button
//                   onClick={() => addToCart(plan)}
//                   className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
//                 >
//                   <ShoppingCart size={18} />
//                   {status.buttonText}
//                 </button>
//               ) : (
//                 <button
//                   disabled
//                   className={`flex-1 min-w-[160px] py-3 px-6 rounded-xl font-medium ${status.buttonClass}`}
//                 >
//                   {status.buttonText}
//                 </button>
//               )}

//               {status.canFavorite && (
//                 <button
//                   onClick={() => toggleFavorite(plan.id)}
//                   className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 font-medium transition-all ${
//                     isFav
//                       ? "border-red-200 bg-red-50 text-red-500"
//                       : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
//                   }`}
//                 >
//                   <Heart size={18} fill={isFav ? "currentColor" : "none"} />
//                   {isFav ? "Saved" : "Save"}
//                 </button>
//               )}

//               <button
//                 onClick={handleShare}
//                 className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 text-neutral-600 font-medium transition-all"
//               >
//                 <Share2 size={18} />
//                 Share
//               </button>
//             </div>

//             {/* Description */}
//             <div className="space-y-3">
//               <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
//                 Description
//               </h3>
//               <p className="text-neutral-600 leading-relaxed">
//                 {plan.long_description ||
//                   plan.short_description ||
//                   "No description available."}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Gallery Section */}
//       {plan.plan_images?.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//           <h2 className="text-xl font-bold text-neutral-900 mb-6">Gallery</h2>
//           <ImageGallery images={plan.plan_images} />
//         </div>
//       )}

//       {/* Features */}
//       {plan.plan_features?.length > 0 && (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//           <h2 className="text-xl font-bold text-neutral-900 mb-6">Features</h2>
//           <div className="flex flex-wrap gap-2">
//             {plan.plan_features.map((f) => (
//               <span
//                 key={f.id}
//                 className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100"
//               >
//                 {f.feature}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Full Specs */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//         <h2 className="text-xl font-bold text-neutral-900 mb-6">
//           Specifications
//         </h2>
//         <PlanSpecs plan={plan} />
//       </div>
//     </div>
//   );
// }

// src/pages/PlanDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { usePlan } from "@/features/plans/hooks/usePlan";
import {
  useIsFavorite,
  useToggleFavorite,
} from "@/features/favorites/hooks/useFavorites";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import ImageGallery from "@/features/plans/components/ImageGallery";
import PlanSpecs from "@/features/plans/components/PlanSpecs";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Loader2,
  AlertCircle,
} from "lucide-react";

function formatPrice(price) {
  if (!price) return "EGP 0";
  return `EGP ${Number(price).toLocaleString("en-EG")}`;
}

export default function PlanDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: plan, isLoading, error } = usePlan(slug);

  const isFav = useIsFavorite(plan?.id);
  const { mutate: toggleFavorite } = useToggleFavorite();
  const { mutate: addToCart } = useAddToCart();

  // Status configs
  const statusConfig = {
    available: {
      badge: null,
      canFavorite: true,
      canAddToCart: true,
      buttonText: "Add to Cart",
      buttonClass: "bg-teal-600 hover:bg-teal-700 text-white",
    },
    sold_out: {
      badge: { text: "Sold Out", class: "bg-red-100 text-red-700" },
      canFavorite: false,
      canAddToCart: false,
      buttonText: "Sold Out",
      buttonClass: "bg-gray-200 text-gray-400 cursor-not-allowed",
    },
    coming_soon: {
      badge: { text: "Coming Soon", class: "bg-yellow-100 text-yellow-700" },
      canFavorite: true,
      canAddToCart: false,
      buttonText: "Coming Soon",
      buttonClass: "bg-yellow-100 text-yellow-700 cursor-not-allowed",
    },
  };

  const status = plan
    ? statusConfig[plan.status] || statusConfig.available
    : statusConfig.available;

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="size-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="size-12 text-red-500" />
        <h2 className="text-xl font-bold text-neutral-900">Plan not found</h2>
        <button
          onClick={() => navigate("/plans")}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back to Plans
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate("/plans")}
          className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative">
            {status.badge && (
              <div
                className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-sm font-medium ${status.badge.class}`}
              >
                {status.badge.text}
              </div>
            )}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
              {plan.cover_image ? (
                <img
                  src={plan.cover_image}
                  alt={plan.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-neutral-400">
                  No Image Available
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-neutral-500">
                  {plan.categories?.name} • {plan.style}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight">
                {plan.title}
              </h1>
            </div>

            <p className="text-3xl font-bold text-teal-600">
              {formatPrice(plan.price)}
            </p>

            {/* Quick Specs */}
            <PlanSpecs plan={plan} compact />

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {status.canAddToCart ? (
                <button
                  onClick={() => addToCart(plan)}
                  className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
                >
                  <ShoppingCart size={18} />
                  {status.buttonText}
                </button>
              ) : (
                <button
                  disabled
                  className={`flex-1 min-w-[160px] py-3 px-6 rounded-xl font-medium ${status.buttonClass}`}
                >
                  {status.buttonText}
                </button>
              )}

              {status.canFavorite && (
                <button
                  onClick={() => toggleFavorite(plan)}
                  className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 font-medium transition-all ${
                    isFav
                      ? "border-red-200 bg-red-50 text-red-500"
                      : "border-neutral-200 hover:border-neutral-300 text-neutral-600"
                  }`}
                >
                  <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                  {isFav ? "Saved" : "Save"}
                </button>
              )}

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 text-neutral-600 font-medium transition-all"
              >
                <Share2 size={18} />
                Share
              </button>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
                Description
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {plan.long_description ||
                  plan.short_description ||
                  "No description available."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {plan.plan_images?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Gallery</h2>
          <ImageGallery images={plan.plan_images} />
        </div>
      )}

      {/* Features */}
      {plan.plan_features?.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Features</h2>
          <div className="flex flex-wrap gap-2">
            {plan.plan_features.map((f) => (
              <span
                key={f.id}
                className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-100"
              >
                {f.feature}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Full Specs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">
          Specifications
        </h2>
        <PlanSpecs plan={plan} />
      </div>
    </div>
  );
}
