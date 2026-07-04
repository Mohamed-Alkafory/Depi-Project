"use client";
import { Heart, Ruler, BedDouble, Bath, Building2 } from "lucide-react";
import { useFavorites } from "@/store/useFavorites";

const imageModules = import.meta.glob("/src/assets/images/**/*.{avif,jpg,jpeg,png,gif,webp,svg}", {
  eager: true,
  query: { format: "url" },
  import: "default",
});

function resolveImage(path) {
  if (!path) return null;
  const key = path.startsWith("@/") ? path.replace("@", "/src") : path;
  return imageModules[key] || null;
}

function formatPrice(price) {
  return `EGP ${Number(price).toLocaleString("en-EG")}`;
}

export default function HousePlanCard({ plan }) {
  const mainImage = resolveImage(plan.images?.homes?.[0]);
  const favoriteIds = useFavorites((s) => s.favoriteIds);
  const toggleFavorite = useFavorites((s) => s.toggleFavorite);
  const isFav = favoriteIds.includes(plan.id);

  return (
    <div className="group w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative overflow-hidden">
        {mainImage ? (
          <img
            src={mainImage}
            alt={plan.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-neutral-100 text-neutral-400">
            No Image
          </div>
        )}

        <button
          onClick={() => toggleFavorite(plan.id)}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-3 top-3 grid size-8 place-items-center rounded-full backdrop-blur-sm transition-colors duration-200 ${
            isFav
              ? "bg-white/70 text-red-500 hover:bg-white"
              : "bg-white/70 text-neutral-600 hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart size={16} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-neutral-900">
          {plan.title}
        </h3>

        <p className="text-lg font-bold text-neutral-900">
          {formatPrice(plan.price_egp)}
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
                {plan.filters?.total_area_m2} m&sup2;
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
                {plan.filters?.bedrooms}
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
                {plan.filters?.bathrooms}
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
                {plan.filters?.floors}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
