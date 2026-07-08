import {
  Ruler,
  Maximize,
  Building2,
  Anvil,
  Package,
  Layers,
  Shovel,
  BrickWall,
  HardHat,
} from "lucide-react";
import CalculateButton from "./CalculateButton";

const MATERIAL_ICONS = {
  iron: { icon: Anvil, label: "Iron Price" },
  cement: { icon: Package, label: "Cement Price" },
  gravel: { icon: Layers, label: "Gravel Price" },
  sand: { icon: Shovel, label: "Sand Price" },
  brick: { icon: BrickWall, label: "Brick Price" },
  labor: { icon: HardHat, label: "Labor Price" },
};

export default function BasicDataSection({
  dimensions,
  setDimensions,
  floors,
  setFloors,
  hasTopFloor,
  setHasTopFloor,
  prices,
  setPrices,
  onCalculate,
  area,
}) {
  const inputClass =
    "peer w-full bg-transparent px-11 py-3 text-gray-900 placeholder:text-gray-400 outline-none transition-all";

  return (
    <div className="space-y-6">
      {/* Land Dimensions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Land Dimensions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Length */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md focus-within:border-teal-500 focus-within:shadow-[0_8px_30px_-12px_rgba(13,148,136,0.35)] focus-within:ring-2 focus-within:ring-teal-500/20">
            <Ruler
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-teal-600"
            />
            <label className="block text-xs font-medium text-gray-500 mb-0.5 pt-3 px-11 transition-colors group-focus-within:text-teal-600">
              Length (m)
            </label>
            <input
              type="number"
              placeholder="Enter length"
              min="0"
              value={dimensions.length}
              onChange={(e) =>
                setDimensions((d) => ({
                  ...d,
                  length: e.target.value,
                }))
              }
              className={inputClass}
            />
          </div>

          {/* Width */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md focus-within:border-teal-500 focus-within:shadow-[0_8px_30px_-12px_rgba(13,148,136,0.35)] focus-within:ring-2 focus-within:ring-teal-500/20">
            <Maximize
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-teal-600"
            />
            <label className="block text-xs font-medium text-gray-500 mb-0.5 pt-3 px-11 transition-colors group-focus-within:text-teal-600">
              Width (m)
            </label>
            <input
              type="number"
              placeholder="Enter width"
              min="0"
              value={dimensions.width}
              onChange={(e) =>
                setDimensions((d) => ({
                  ...d,
                  width: e.target.value,
                }))
              }
              className={inputClass}
            />
          </div>

          {/* Floors */}
          <div className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md focus-within:border-teal-500 focus-within:shadow-[0_8px_30px_-12px_rgba(13,148,136,0.35)] focus-within:ring-2 focus-within:ring-teal-500/20">
            <Building2
              size={18}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-teal-600"
            />
            <label className="block text-xs font-medium text-gray-500 mb-0.5 pt-3 px-11 transition-colors group-focus-within:text-teal-600">
              Floors
            </label>
            <input
              type="number"
              placeholder="Number of floors"
              min="0"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-4">
          <span className="text-sm text-gray-600">
            Total Area:{" "}
            <span className="font-bold text-gray-900">
              {area > 0 ? `${area} m²` : "—"}
            </span>
          </span>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={hasTopFloor}
              onChange={(e) => setHasTopFloor(e.target.checked)}
              className="w-5 h-5 accent-teal-600"
            />
            Has top/attic floor
          </label>
        </div>
      </div>

      {/* Material Prices */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Material Prices
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(prices).map(([key, value]) => {
            const IconComp = MATERIAL_ICONS[key]?.icon ?? Package;
            const displayLabel = MATERIAL_ICONS[key]?.label ?? `${key} Price`;
            return (
              <div
                key={key}
                className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md focus-within:border-teal-500 focus-within:shadow-[0_8px_30px_-12px_rgba(13,148,136,0.35)] focus-within:ring-2 focus-within:ring-teal-500/20"
              >
                <IconComp
                  size={18}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-teal-600"
                />
                <label className="block text-xs font-medium capitalize text-gray-500 mb-0.5 pt-3 px-11 transition-colors group-focus-within:text-teal-600">
                  {displayLabel}
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  placeholder={`${key} price`}
                  value={value === "" ? "" : String(value)}
                  onChange={(e) => {
                    const raw = e.target.value;
                    if (raw === "") {
                      setPrices((p) => ({ ...p, [key]: "" }));
                      return;
                    }
                    const normalized = raw.replace(/[^\d.]/g, "");
                    const num = Number(normalized);
                    if (!Number.isNaN(num)) {
                      setPrices((p) => ({ ...p, [key]: num }));
                    }
                  }}
                  className={inputClass}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Calculate Button */}
      <CalculateButton onClick={onCalculate} />
    </div>
  );
}
