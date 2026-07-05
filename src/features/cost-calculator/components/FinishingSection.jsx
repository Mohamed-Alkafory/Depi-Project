export default function FinishingSection({ onBack }) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-lg font-bold text-[var(--heading)]">Finishing</h1>
                <p className="text-xs text-[var(--paragraph)] mt-1">
                    Finishing cost calculation — coming next
                </p>
            </div>

            <div className="bg-[var(--card-bg)] rounded-xl border border-dashed border-[var(--border)] p-8 text-center">
                <p className="text-sm text-[var(--muted)]">
                    Finishing options and pricing logic not defined yet.
                </p>
            </div>

            <button
                type="button"
                onClick={onBack}
                className="self-start px-6 py-2.5 rounded-full border border-[var(--border)] text-[var(--body-text)] text-sm font-semibold hover:bg-[var(--body-bg)] transition-colors"
            >
                ← Back to Results
            </button>
        </div>
    );
}