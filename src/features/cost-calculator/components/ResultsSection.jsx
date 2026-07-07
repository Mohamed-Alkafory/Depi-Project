import { ArrowLeft, RotateCcw, Download, Home } from "lucide-react";

function formatEGP(n) {
  return Math.round(n).toLocaleString("en-US") + " EGP";
}

export default function ResultsSection({ results, onBack, onReset }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Cost Estimate</h2>
        <div className="flex gap-2">
          <button
            onClick={onReset}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Total Card */}
      <div className="bg-teal-600 rounded-2xl p-6 text-white">
        <p className="text-sm opacity-80">Total Estimated Cost</p>
        <p className="text-4xl font-bold mt-2">{formatEGP(results.total)}</p>
        <div className="flex gap-4 mt-4 text-sm opacity-80">
          <span className="flex items-center gap-1">
            <Home size={14} /> {results.area} m²
          </span>
          <span>
            {results.floors} Floor{results.floors > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Foundations", value: results.foundations, icon: "🏗️" },
          {
            label: `Floors × ${results.floors}`,
            value: results.floorCost * results.floors,
            icon: "🏢",
          },
          results.hasTopFloor && {
            label: "Top Floor (50%)",
            value: results.topFloor,
            icon: "🏠",
          },
          { label: "Attachments", value: results.attachment, icon: "🔧" },
        ]
          .filter(Boolean)
          .map((item) => (
            <div
              key={item.label}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-lg">{item.icon}</span>
              </div>
              <p className="text-lg font-bold text-gray-900 mt-1">
                {formatEGP(item.value)}
              </p>
            </div>
          ))}
      </div>

      {/* Material Quantities */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">
          Material Quantities
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(results.quantities).map(([key, value]) => (
            <div
              key={key}
              className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-gray-500 uppercase">{key}</p>
                <p className="text-lg font-bold text-gray-900">
                  {value.toFixed(2)}
                </p>
              </div>
              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                {key === "cement" || key === "iron"
                  ? "ton"
                  : key === "brick"
                    ? "1000 pcs"
                    : "m³"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Edit Data
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Save PDF
        </button>
      </div>
    </div>
  );
}
