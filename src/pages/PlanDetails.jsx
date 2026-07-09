// src/pages/PlanDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePlan } from "@/features/plans/hooks/usePlan";
import {
  useIsFavorite,
  useToggleFavorite,
} from "@/features/favorites/hooks/useFavorites";
import { useAddToCart } from "@/features/cart/hooks/useCart";
import PlanDetailsGallery from "@/features/plans/components/PlanDetailsGallery";
import { toast } from "sonner";
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
  MapPin,
  ArrowRight,
  Ruler,
  BedDouble,
  Building2,
  Car,
  Calendar,
  Tag,
  CircleDot,
  HelpCircle,
} from "lucide-react";

const SPECS_META = [
  { key: "area", label: "Area", value: (p) => (p.area ? `${p.area} m²` : null), icon: Ruler },
  { key: "bedrooms", label: "Bedrooms", value: (p) => p.bedrooms || null, icon: BedDouble },
  { key: "bathrooms", label: "Bathrooms", value: (p) => p.bathrooms || null, icon: Bath },
  { key: "floors", label: "Floors", value: (p) => p.floors || null, icon: Building2 },
  { key: "garage", label: "Garage", value: (p) => (p.garage ? `${p.garage} cars` : null), icon: Car },
  { key: "year_built", label: "Year Built", value: (p) => p.year_built || null, icon: Calendar },
  { key: "style", label: "Style", value: (p) => p.style || null, icon: Tag },
  { key: "status", label: "Status", value: (p) => (p.status ? p.status.replace("_", " ") : null), icon: CircleDot },
];

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
      toast.success("Link copied to clipboard!");
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
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <button
          onClick={() => navigate("/plans")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm"
        >
          <ArrowLeft size={16} />
          Back to Plans
        </button>
      </motion.div>

      {/* Gallery Section – Full Width */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <PlanDetailsGallery
          images={allImages}
          mainImage={mainImage}
          onImageChange={setMainImage}
          onLightboxOpen={() => setLightbox(true)}
          statusBadge={status.badge}
        />
      </motion.div>

      {/* ===== Details Section – Two-Column Layout ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-12 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8">

          {/* ===== LEFT COLUMN (70%) ===== */}
          <div className="space-y-8">

            {/* ---- About This Plan Card ---- */}
            <motion.div
              className="bg-white rounded-[18px] shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600 mb-3">
                About This Plan
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {plan.title}
              </h1>
              <p className="text-gray-600 leading-[1.8] text-[15px]">
                {plan.long_description || plan.short_description || "No description available."}
              </p>
            </motion.div>

            {/* ---- Specifications Card ---- */}
            <motion.div
              className="bg-white rounded-[18px] shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-600 mb-6">
                Specifications
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {SPECS_META.map((spec, i) => {
                  const val = spec.value(plan);
                  if (!val) return null;
                  const Icon = spec.icon;
                  return (
                    <div key={spec.key}>
                      <div className={`flex items-center gap-4 py-4 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                        <div className="size-11 rounded-xl border border-gray-200 flex items-center justify-center flex-shrink-0 bg-white">
                          <Icon size={18} className="text-teal-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-400">
                            {spec.label}
                          </p>
                          <p className="text-base font-bold text-gray-900 capitalize truncate">
                            {val}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ---- Bottom CTA Banner ---- */}
            <motion.div
              className="rounded-[18px] bg-gradient-to-br from-teal-600 to-teal-700 shadow-[0_8px_32px_-8px_rgba(13,148,136,0.35)] p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <div className="flex items-start gap-4">
                <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                  <HelpCircle size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg sm:text-xl">Need modifications?</p>
                  <p className="text-teal-100 text-sm leading-relaxed mt-1">
                    Customize this plan to fit your needs.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate("/contact")}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-teal-700 font-bold text-sm transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
              >
                Start Modification
                <ArrowRight size={18} />
              </button>
            </motion.div>

          </div>

          {/* ===== RIGHT COLUMN (30%) – Sticky Purchase Card ===== */}
          <motion.div
            className="lg:sticky lg:top-6 self-start space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="bg-white rounded-[18px] shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] p-6">

              {/* Category + Type */}
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="font-medium text-gray-500">{plan.categories?.name || "Property"}</span>
                <span className="text-gray-300">•</span>
                <span>{plan.style || "Plan"}</span>
              </div>

              {/* Plan Name */}
              <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                {plan.title}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-teal-600">
                  {formatPrice(plan.price)}
                </span>
                {plan.original_price && plan.original_price > plan.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(plan.original_price)}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Highlights */}
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-3">
                Property Highlights
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: Maximize, label: "Area", value: `${plan.area || "—"} m²` },
                  { icon: Bed, label: "Bedrooms", value: plan.bedrooms || "—" },
                  { icon: Bath, label: "Bathrooms", value: plan.bathrooms || "—" },
                  { icon: Layers, label: "Floors", value: plan.floors || "—" },
                ].map((h) => (
                  <div key={h.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-md bg-teal-50 flex items-center justify-center">
                        <h.icon size={13} className="text-teal-600" />
                      </div>
                      <span className="text-sm text-gray-500">{h.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{h.value}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4" />

              {/* Add to Cart */}
              {status.canAddToCart ? (
                <button
                  onClick={() => addToCart(plan)}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-bold text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30"
                >
                  <ShoppingCart size={20} />
                  Add this plan
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-4 px-6 rounded-2xl font-bold text-base bg-gray-200 text-gray-400 cursor-not-allowed"
                >
                  {status.buttonText}
                </button>
              )}

              {/* Save / Share */}
              <div className="flex gap-3 mt-4">
                {status.canFavorite && (
                  <button
                    onClick={() => toggleFavorite(plan)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl border-2 font-semibold text-sm transition-all ${
                      isFav
                        ? "border-red-200 bg-red-50 text-red-500"
                        : "border-gray-200 hover:border-gray-300 text-gray-600 bg-white"
                    }`}
                  >
                    <Heart size={17} fill={isFav ? "currentColor" : "none"} />
                    {isFav ? "Saved" : "Save"}
                  </button>
                )}
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-2xl border-2 border-gray-200 hover:border-gray-300 text-gray-600 font-semibold text-sm transition-all bg-white"
                >
                  <Share2 size={17} />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

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
