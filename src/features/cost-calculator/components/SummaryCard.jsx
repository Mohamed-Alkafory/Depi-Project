import {
  Home,
  Building2,
  Layers,
  Wallet,
  RotateCcw,
  Download,
  ArrowLeft,
  ClipboardList,
} from "lucide-react";
import CalculateButton from "./CalculateButton";

function formatEGP(n) {
  return Math.round(n).toLocaleString("en-US") + " EGP";
}

const glassCard =
  "rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(13,148,136,0.18)]";

export default function SummaryCard({
  results,
  area,
  floors,
  hasTopFloor,
  onStart,
  onBack,
  onReset,
}) {
  const estimatedCost = results ? results.total : null;

  return (
    <div className="lg:sticky lg:top-6 space-y-4">
      {/* Header */}
      <div className={`${glassCard} p-5`}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-100/80 backdrop-blur flex items-center justify-center">
            <ClipboardList size={20} className="text-teal-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Summary</h2>
            <p className="text-xs text-gray-500">
              Live project snapshot
            </p>
          </div>
        </div>
      </div>

      {/* Stats grid (existing values only) */}
      <div className={`${glassCard} p-5 space-y-3`}>
        {/* Total Area */}
        <div className="flex items-center justify-between rounded-2xl bg-white/50 backdrop-blur px-4 py-3 border border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
              <Home size={16} className="text-teal-600" />
            </div>
            <span className="text-sm text-gray-600">Total Area</span>
          </div>
          <span className="text-base font-bold text-gray-900">
            {area > 0 ? `${area} m²` : "—"}
          </span>
        </div>

        {/* Number of Floors */}
        <div className="flex items-center justify-between rounded-2xl bg-white/50 backdrop-blur px-4 py-3 border border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
              <Building2 size={16} className="text-teal-600" />
            </div>
            <span className="text-sm text-gray-600">Number of Floors</span>
          </div>
          <span className="text-base font-bold text-gray-900">
            {floors || "—"}
          </span>
        </div>

        {/* Roof Status */}
        <div className="flex items-center justify-between rounded-2xl bg-white/50 backdrop-blur px-4 py-3 border border-white/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
              <Layers size={16} className="text-teal-600" />
            </div>
            <span className="text-sm text-gray-600">Roof Status</span>
          </div>
          <span
            className={`text-sm font-bold px-3 py-1 rounded-full ${
              hasTopFloor
                ? "bg-teal-100 text-teal-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {hasTopFloor ? "Included" : "Standard"}
          </span>
        </div>

        {/* Estimated Cost */}
        <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-teal-50/80 to-cyan-50/80 backdrop-blur px-4 py-4 border border-white/40 shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <Wallet size={16} className="text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Estimated Cost
            </span>
          </div>
          <span className="text-xl font-bold text-teal-700">
            {estimatedCost != null ? formatEGP(estimatedCost) : "—"}
          </span>
        </div>
      </div>

      {/* Actions */}
      {!results && (
        <div className={`${glassCard} p-5`}>
          <CalculateButton onClick={onStart} size="md" />
          <p className="text-center text-xs text-gray-500 mt-3">
            Fill the form on the left, then calculate to see the total.
          </p>
        </div>
      )}

      {results && (
        <div className={`${glassCard} p-5 space-y-3`}>
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3 rounded-2xl text-gray-700 font-medium bg-white/60 hover:bg-white border border-white/40 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Edit Data
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25"
            >
              <Download size={18} />
              Save PDF
            </button>
          </div>
          <button
            onClick={onReset}
            className="w-full py-2.5 rounded-2xl text-gray-500 font-medium hover:text-gray-700 hover:bg-white/40 border border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
