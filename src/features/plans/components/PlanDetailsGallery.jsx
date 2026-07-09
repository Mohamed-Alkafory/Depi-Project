import { Play, ChevronLeft, ChevronRight, Maximize, Home } from "lucide-react";

const MAX_THUMBS = 5;

function formatCounter(n) {
  return String(n).padStart(2, "0");
}

export default function PlanDetailsGallery({
  images = [],
  mainImage,
  onImageChange,
  onLightboxOpen,
  hasVideoTour = false,
  statusBadge = null,
}) {
  const handlePrev = () => {
    onImageChange((mainImage - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onImageChange((mainImage + 1) % images.length);
  };

  const visibleThumbs = images.slice(0, MAX_THUMBS);
  const remaining = images.length - MAX_THUMBS;

  return (
    <section className="w-full">
      <div className="flex gap-3 md:gap-4 lg:gap-5">
        {/* ===== Main Image ===== */}
        <div className="relative flex-1 aspect-video rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-100 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.12)] group">
          {/* Status badge */}
          {statusBadge && (
            <div
              className={`absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold backdrop-blur-sm shadow-lg ${statusBadge.class}`}
            >
              {statusBadge.text}
            </div>
          )}

          {images[mainImage]?.image_url ? (
            <>
              <img
                key={mainImage}
                src={images[mainImage].image_url}
                alt=""
                className="w-full h-full object-cover gallery-fade-in transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />

              {/* Expand – desktop hover only */}
              {onLightboxOpen && (
                <button
                  onClick={onLightboxOpen}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-lg sm:rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 hidden sm:block"
                  aria-label="View fullscreen"
                >
                  <Maximize size={13} />
                </button>
              )}

              {/* Tour badge – offset if status badge exists */}
              {hasVideoTour && (
                <div
                  className={`absolute left-3 sm:left-4 z-10 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white/85 backdrop-blur-sm text-gray-900 text-[10px] sm:text-xs font-semibold rounded-lg shadow flex items-center gap-1.5 ${
                    statusBadge ? "top-10 sm:top-12" : "top-3 sm:top-4"
                  }`}
                >
                  <Play size={10} fill="currentColor" />
                  Tour
                </div>
              )}

              {/* Nav arrows – always visible on mobile, hover on desktop */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white/85 backdrop-blur-sm hover:bg-white text-gray-700 shadow-lg flex items-center justify-center transition-all hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 size-8 sm:size-10 rounded-full bg-white/85 backdrop-blur-sm hover:bg-white text-gray-700 shadow-lg flex items-center justify-center transition-all hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              {/* Play overlay (video tour) */}
              {hasVideoTour && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="size-14 sm:size-16 lg:size-20 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:bg-white/25 group-hover:scale-105 shadow-2xl shadow-black/20">
                    <Play size={24} className="text-white ml-0.5" fill="white" />
                  </div>
                </div>
              )}

              {/* Counter */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-black/45 backdrop-blur-sm text-white text-[10px] sm:text-xs font-medium rounded-lg">
                {formatCounter(mainImage + 1)} / {formatCounter(images.length)}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <Home size={48} />
            </div>
          )}
        </div>

        {/* ===== Thumbnails – Desktop Vertical (lg+) ===== */}
        {images.length > 1 && (
          <div className="hidden lg:flex flex-col gap-3 w-24 xl:w-28 flex-shrink-0">
            {visibleThumbs.map((img, i) => (
              <button
                key={i}
                onClick={() => onImageChange(i)}
                className={`flex-shrink-0 aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300 ${
                  i === mainImage
                    ? "ring-2 ring-teal-500 ring-offset-2 shadow-lg scale-[1.02]"
                    : "opacity-60 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <img
                  src={img.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {remaining > 0 && (
              <button
                onClick={() => onImageChange(MAX_THUMBS)}
                className="flex-shrink-0 aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold hover:bg-gray-300 transition-colors"
              >
                +{remaining}
              </button>
            )}
          </div>
        )}

        {/* ===== Thumbnails – Tablet Vertical (md–lg) ===== */}
        {images.length > 1 && (
          <div className="hidden md:flex lg:hidden flex-col gap-2 w-20 flex-shrink-0">
            {visibleThumbs.map((img, i) => (
              <button
                key={i}
                onClick={() => onImageChange(i)}
                className={`flex-shrink-0 aspect-[4/3] rounded-lg overflow-hidden transition-all duration-300 ${
                  i === mainImage
                    ? "ring-2 ring-teal-500 ring-offset-1 shadow-md scale-[1.02]"
                    : "opacity-60 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <img
                  src={img.image_url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
            {remaining > 0 && (
              <button
                onClick={() => onImageChange(MAX_THUMBS)}
                className="flex-shrink-0 aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-semibold hover:bg-gray-300 transition-colors"
              >
                +{remaining}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===== Thumbnails – Mobile Horizontal (<md) ===== */}
      {images.length > 1 && (
        <div className="md:hidden mt-3 flex gap-2 overflow-x-auto overflow-y-hidden pt-1 pb-2 scrollbar-hide -mx-1 px-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onImageChange(i)}
              className={`flex-shrink-0 w-[68px] h-[52px] rounded-lg overflow-hidden transition-all duration-300 ${
                i === mainImage
                  ? "ring-2 ring-teal-500"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={img.image_url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
