// src/components/cart/CartItem.jsx
import { X, Ruler, BedDouble, Bath } from "lucide-react";

export function CartItem({ item, onRemove }) {
  const coverImage = item.cover_image || item.plan_images?.[0]?.image_url;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
        {coverImage ? (
          <img
            src={coverImage}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-gray-900 truncate">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500">
              {item.categories?.name || "N/A"}
            </p>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Ruler size={12} /> {item.area || 0} m²
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={12} /> {item.bedrooms || 0}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={12} /> {item.bathrooms || 0}
          </span>
        </div>

        <p className="mt-2 text-lg font-bold text-teal-600">
          EGP {Number(item.price).toLocaleString("en-EG")}
        </p>
      </div>
    </div>
  );
}
