// src/features/plans/components/ImageGallery.jsx
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const TABS = [
  { key: "exterior", label: "Exterior" },
  { key: "interior", label: "Interior" },
  { key: "floorplan", label: "Floor Plans" },
  { key: "gallery", label: "Gallery" },
];

export default function ImageGallery({ images }) {
  const [activeTab, setActiveTab] = useState("exterior");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Group images by type
  const grouped = images.reduce((acc, img) => {
    const type = img.image_type || "gallery";
    if (!acc[type]) acc[type] = [];
    acc[type].push(img);
    return acc;
  }, {});

  // Sort each group by sort_order
  Object.keys(grouped).forEach((key) => {
    grouped[key].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  });

  // Get current tab images
  const currentImages = grouped[activeTab] || [];

  // Lightbox handlers
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % currentImages.length);
  };
  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length,
    );
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const count = grouped[tab.key]?.length || 0;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? "bg-teal-600 text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span
                  className={`ml-2 text-xs ${activeTab === tab.key ? "text-teal-100" : "text-neutral-400"}`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Images Grid */}
      {currentImages.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentImages.map((img, index) => (
            <button
              key={img.id}
              onClick={() => openLightbox(index)}
              className="aspect-square rounded-xl overflow-hidden bg-neutral-100 hover:opacity-90 transition-opacity"
            >
              <img
                src={img.image_url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-neutral-200">
          <p className="text-neutral-400">No images in this category</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && currentImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          autoFocus
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          {currentImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Image */}
          <img
            src={currentImages[lightboxIndex].image_url}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {currentImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {lightboxIndex + 1} / {currentImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
