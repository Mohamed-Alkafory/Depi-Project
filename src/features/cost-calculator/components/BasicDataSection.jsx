import { ArrowRight } from "lucide-react";

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
  return (
    <div className="space-y-6">
      {/* Land Dimensions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Land Dimensions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Floors
            </label>
            <input
              type="number"
              placeholder="Number of floors"
              min="0"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400"
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
          {Object.entries(prices).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key} Price
              </label>
              <input
                type="number"
                placeholder={`${key} price`}
                min="0"
                value={value}
                onChange={(e) =>
                  setPrices((p) => ({
                    ...p,
                    [key]: e.target.value === "" ? "" : Number(e.target.value),
                  }))
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all placeholder:text-gray-400"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={onCalculate}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
      >
        Calculate Cost
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
