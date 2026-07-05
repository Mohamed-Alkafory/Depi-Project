function formatEGP(n) {
    return Math.round(n).toLocaleString("en-US") + " EGP";
}

const QUANTITY_UNITS = {
    cement: "ton",
    iron: "ton",
    gravel: "m³",
    sand: "m³",
    brick: "1000 pcs",
};

export default function ResultsSection({ results, onBack, onNext }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-bold text-[var(--heading)]">Results & Quantities</h1>
                <p className="text-xs text-[var(--paragraph)] mt-1">
                    Structural cost breakdown for a {results.area} m² area
                </p>
            </div>

            {/* Total */}
            <div className="bg-[var(--brand-primary)] rounded-xl p-6 text-white">
                <p className="text-xs opacity-80">Total Structural Cost</p>
                <p className="text-3xl font-bold mt-1">{formatEGP(results.total)}</p>
            </div>

            {/* Breakdown */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-5">
                <h2 className="text-sm font-semibold text-[var(--heading)] mb-4">Cost Breakdown</h2>
                <div className="flex flex-col divide-y divide-[var(--border)]">
                    {[
                        ["Foundations", results.foundations],
                        [`Floor cost × ${results.floors}`, results.floorCost * results.floors],
                        results.hasTopFloor ? ["Top floor (50%)", results.topFloor] : null,
                        ["Attachments", results.attachment],
                    ]
                        .filter(Boolean)
                        .map(([label, value]) => (
                            <div key={label} className="flex justify-between py-2.5 text-sm">
                                <span className="text-[var(--paragraph)]">{label}</span>
                                <span className="font-medium text-[var(--heading)]">{formatEGP(value)}</span>
                            </div>
                        ))}
                </div>
            </div>

            {/* Quantities table */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-5">
                <h2 className="text-sm font-semibold text-[var(--heading)] mb-4">Material Quantities</h2>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-xs text-[var(--muted)] border-b border-[var(--border)]">
                            <th className="pb-2 font-medium">Material</th>
                            <th className="pb-2 font-medium">Quantity</th>
                            <th className="pb-2 font-medium">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(results.quantities).map(([key, value]) => (
                            <tr key={key} className="border-b border-[var(--border)] last:border-0">
                                <td className="py-2 capitalize text-[var(--body-text)]">{key}</td>
                                <td className="py-2 font-medium text-[var(--heading)]">{value.toFixed(2)}</td>
                                <td className="py-2 text-[var(--paragraph)]">{QUANTITY_UNITS[key]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--body-text)] text-sm font-semibold hover:bg-[var(--body-bg)] transition-colors"
                >
                    ← Back
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="px-6 py-2.5 rounded-full bg-[var(--brand-primary)] text-white text-sm font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
                >
                    Continue to Finishing →
                </button>
            </div>
        </div>
    );
}