// src/pages/PlanDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlan } from "@/features/plans/hooks/usePlan";
import {
  useIsFavorite,
  useToggleFavorite,
} from "@/features/favorites/hooks/useFavorites";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import PlanSpecs from "@/features/plans/components/PlanSpecs";
import {
  Heart,
  ShoppingCart,
  ArrowLeft,
  Share2,
  Loader2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Bed,
  Bath,
  Maximize,
  Layers,
  Check,
  MapPin,
  Calendar,
  Home,
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

  const [mainImage, setMainImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const statusConfig = {
    available: {
      badge: null,
      canFavorite: true,
      canAddToCart: true,
      buttonText: "Add to Cart",
      buttonClass:
        "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30",
    },
    sold_out: {
      badge: {
        text: "Sold Out",
        class: "bg-red-500/90 text-white backdrop-blur-sm",
      },
      canFavorite: false,
      canAddToCart: false,
      buttonText: "Sold Out",
      buttonClass: "bg-gray-200 text-gray-400 cursor-not-allowed",
    },
    coming_soon: {
      badge: {
        text: "Coming Soon",
        class: "bg-amber-500/90 text-white backdrop-blur-sm",
      },
      canFavorite: true,
      canAddToCart: false,
      buttonText: "Notify Me",
      buttonClass:
        "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/30",
    },
  };

  const status = plan
    ? statusConfig[plan.status] || statusConfig.available
    : statusConfig.available;

  const allImages =
    plan?.plan_images?.length > 0
      ? plan.plan_images.sort((a, b) => a.sort_order - b.sort_order)
      : plan?.cover_image
        ? [{ image_url: plan.cover_image, image_type: "exterior" }]
        : [];

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const nextImage = () => {
    setMainImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setMainImage((prev) => (prev - 1 + allImages.length) % allImages.length);
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
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button
          onClick={() => navigate("/plans")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Images (3 columns) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-xl group">
              {status.badge && (
                <div
                  className={`absolute top-5 left-5 z-10 px-4 py-2 rounded-full text-sm font-bold ${status.badge.class}`}
                >
                  {status.badge.text}
                </div>
              )}

              {allImages[mainImage]?.image_url ? (
                <>
                  <img
                    src={allImages[mainImage].image_url}
                    alt={plan.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Expand button */}
                  <button
                    onClick={() => setLightbox(true)}
                    className="absolute top-5 right-5 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0"
                  >
                    <Maximize size={18} />
                  </button>

                  {/* Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Counter */}
                  <div className="absolute bottom-5 right-5 px-4 py-2 bg-black/60 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                    {mainImage + 1} / {allImages.length}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <Home size={48} />
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden transition-all duration-300 ${
                      index === mainImage
                        ? "ring-3 ring-teal-500 ring-offset-2 shadow-lg scale-105"
                        : "opacity-50 hover:opacity-80 hover:scale-105"
                    }`}
                  >
                    <img
                      src={img.image_url}
                      alt={`${plan.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                <MapPin size={14} />
                <span>{plan.categories?.name}</span>
                <span className="text-gray-300">•</span>
                <span>{plan.style}</span>
              </div>

              <h1 className="text-2xl lg:text-xl font-semibold text-gray-900 leading-tight mb-4">
                {plan.title}
              </h1>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-teal-600">
                  {formatPrice(plan.price)}
                </span>
                {plan.original_price && plan.original_price > plan.price && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(plan.original_price)}
                  </span>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Maximize size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="font-bold text-gray-900">{plan.area} m²</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Bed size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bedrooms</p>
                  <p className="font-bold text-gray-900">{plan.bedrooms}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Bath size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Bathrooms</p>
                  <p className="font-bold text-gray-900">{plan.bathrooms}</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
                  <Layers size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Floors</p>
                  <p className="font-bold text-gray-900">{plan.floors}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {status.canAddToCart ? (
                <button
                  onClick={() => addToCart(plan)}
                  className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] ${status.buttonClass}`}
                >
                  <ShoppingCart size={22} />
                  {status.buttonText}
                </button>
              ) : (
                <button
                  disabled
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-lg ${status.buttonClass}`}
                >
                  {status.buttonText}
                </button>
              )}

              <div className="flex gap-3">
                {status.canFavorite && (
                  <button
                    onClick={() => toggleFavorite(plan)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border-2 font-semibold transition-all ${
                      isFav
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                    }`}
                  >
                    <Heart size={20} fill={isFav ? "currentColor" : "none"} />
                    {isFav ? "Saved" : "Save"}
                  </button>
                )}

                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold transition-all bg-white"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
                About this plan
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {plan.long_description ||
                  plan.short_description ||
                  "No description available."}
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        {plan.plan_features?.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {plan.plan_features.map((f) => (
                <div
                  key={f.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check size={16} className="text-teal-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {f.feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Specifications */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Specifications
          </h2>
          <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100">
            <PlanSpecs plan={plan} />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && allImages[mainImage] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all"
          >
            <ChevronRight size={32} />
          </button>

          <img
            src={allImages[mainImage].image_url}
            alt={plan.title}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-medium">
            {mainImage + 1} / {allImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
