import { Anvil, Package, Layers, Shovel, BrickWall, TrendingUp } from "lucide-react";

const QTY_META = {
    cement: { icon: Package, unit: "ton", accent: "from-slate-400 to-slate-600" },
    iron: { icon: Anvil, unit: "ton", accent: "from-zinc-500 to-zinc-700" },
    gravel: { icon: Layers, unit: "m³", accent: "from-amber-500 to-orange-600" },
    sand: { icon: Shovel, unit: "m³", accent: "from-yellow-400 to-amber-500" },
    brick: { icon: BrickWall, unit: "1000 pcs", accent: "from-red-500 to-rose-600" },
};

function formatEGP(n) {
    return Math.round(n).toLocaleString("en-US") + " EGP";
}

export default function MaterialQuantitiesCard({ results }) {
    if (!results) return null;

    return (
        <div className="space-y-6">
            {/* Material Quantities */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-700 p-6 text-white shadow-[0_16px_40px_-16px_rgba(13,148,136,0.5)]">
                <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                <div className="relative flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-1.5 text-white/80 mb-1.5">
                            <TrendingUp size={14} />
                            <span className="text-xs font-medium tracking-wide">
                                Estimated Cost
                            </span>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold tracking-tight tabular-nums">
                            {formatEGP(results.total)}
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                    Material Quantities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(results.quantities).map(([key, value]) => {
                        const meta = QTY_META[key] ?? {
                            icon: Package,
                            unit: "",
                            accent: "from-teal-500 to-cyan-600",
                        };
                        const Icon = meta.icon;
                        return (
                            <div
                                key={key}
                                className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-sm`}
                                    >
                                        <Icon size={16} className="text-white" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-gray-400">
                                        {meta.unit}
                                    </span>
                                </div>
                                <p className="mt-3 text-xs font-medium capitalize text-gray-500">
                                    {key}
                                </p>
                                <p className="mt-0.5 text-xl font-bold text-gray-900 tracking-tight tabular-nums">
                                    {value.toFixed(2)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Estimated Cost */}
              
        </div>
    );
}