import { useValidatedField } from "../hooks/useValidatedField";
import { FIELD_VALIDATORS } from "../utils/validators";
import { PRICE_FIELD_LABELS } from "../constants/prices";

// Reusable numeric field with built-in validation.
// The inline error <p> below is a placeholder — swap it for your
// ValidationMessage component once it's ready, wired to `error` and `clearInvalidValue`.
function NumberField({ label, value, validatorKey, onValidChange, unit }) {
    const field = useValidatedField({
        initialValue: value,
        validate: FIELD_VALIDATORS[validatorKey],
        onValidChange,
    });

    return (
        <div>
            <label className="block text-xs font-medium text-[var(--paragraph)] mb-1">
                {label} {unit && <span className="text-[var(--muted)]">({unit})</span>}
            </label>
            <input
                type="text"
                inputMode="decimal"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={field.onBlur}
                className={`w-full px-3 py-2 rounded-lg border text-sm bg-[var(--card-bg)] text-[var(--body-text)] outline-none transition-colors
          ${field.error
                        ? "border-[var(--error)]"
                        : "border-[var(--border)] focus:border-[var(--brand-primary)]"}`}
            />
            {field.error && (
                <p className="text-xs text-[var(--error)] mt-1">{field.error}</p>
            )}
        </div>
    );
}

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
    const updatePrice = (key) => (value) =>
        setPrices((p) => ({ ...p, [key]: Number(value) }));

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-bold text-[var(--heading)]">Basic Data</h1>
                <p className="text-xs text-[var(--paragraph)] mt-1">
                    Enter your land dimensions and material prices
                </p>
            </div>

            {/* Dimensions */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-5">
                <h2 className="text-sm font-semibold text-[var(--heading)] mb-4">Land Dimensions</h2>
                <div className="grid grid-cols-3 gap-4">
                    <NumberField
                        label="Length"
                        unit="m"
                        value={dimensions.length}
                        validatorKey="length"
                        onValidChange={(v) => setDimensions((d) => ({ ...d, length: Number(v) }))}
                    />
                    <NumberField
                        label="Width"
                        unit="m"
                        value={dimensions.width}
                        validatorKey="width"
                        onValidChange={(v) => setDimensions((d) => ({ ...d, width: Number(v) }))}
                    />
                    <NumberField
                        label="Floors"
                        value={floors}
                        validatorKey="floors"
                        onValidChange={(v) => setFloors(Number(v))}
                    />
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                    <span className="text-xs text-[var(--paragraph)]">
                        Total area: <span className="font-semibold text-[var(--heading)]">{area} m²</span>
                    </span>

                    <label className="flex items-center gap-2 text-xs text-[var(--paragraph)] cursor-pointer">
                        <input
                            type="checkbox"
                            checked={hasTopFloor}
                            onChange={(e) => setHasTopFloor(e.target.checked)}
                            className="accent-[var(--brand-primary)] w-4 h-4"
                        />
                        Has top/attic floor
                    </label>
                </div>
            </div>

            {/* Prices */}
            <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border)] p-5">
                <h2 className="text-sm font-semibold text-[var(--heading)] mb-4">Material Prices</h2>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(PRICE_FIELD_LABELS).map((key) => (
                        <NumberField
                            key={key}
                            label={PRICE_FIELD_LABELS[key]}
                            value={prices[key]}
                            validatorKey={key}
                            onValidChange={updatePrice(key)}
                        />
                    ))}
                </div>
            </div>

            <button
                type="button"
                onClick={onCalculate}
                className="self-end px-6 py-2.5 rounded-full bg-[var(--brand-primary)] text-white text-sm font-semibold hover:bg-[var(--brand-primary-hover)] transition-colors"
            >
                Calculate →
            </button>
        </div>
    );
}