import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import housePlans from "@/assets/data/houses.json";
import HousePlanCard from "@/components/houses/HousePlanCard";
import Reveal from "@/components/ui/Reveal";

const allTypes = [...new Set(housePlans.map((p) => p.filters?.plan_type).filter(Boolean))];
const allStyles = [...new Set(housePlans.map((p) => p.filters?.style).filter(Boolean))];
const allBedrooms = [...new Set(housePlans.map((p) => p.filters?.bedrooms).filter(Boolean))].sort();
const allFloors = [...new Set(housePlans.map((p) => p.filters?.floors).filter(Boolean))].sort();

function FilterSelect({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export const Plans = () => {
  const [type, setType] = useState("");
  const [style, setStyle] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [floors, setFloors] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const filtered = useMemo(() => {
    return housePlans.filter((p) => {
      if (type && p.filters?.plan_type !== type) return false;
      if (style && p.filters?.style !== style) return false;
      if (bedrooms && String(p.filters?.bedrooms) !== bedrooms) return false;
      if (floors && String(p.filters?.floors) !== floors) return false;
      if (priceMin && p.price_egp < Number(priceMin)) return false;
      if (priceMax && p.price_egp > Number(priceMax)) return false;
      return true;
    });
  }, [type, style, bedrooms, floors, priceMin, priceMax]);

  const hasFilters = type || style || bedrooms || floors || priceMin || priceMax;

  function clearFilters() {
    setType("");
    setStyle("");
    setBedrooms("");
    setFloors("");
    setPriceMin("");
    setPriceMax("");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Reveal>
        <h1 className="mb-6 text-3xl font-bold text-neutral-900">Our House Plans</h1>
      </Reveal>

      <Reveal>
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <FilterSelect label="Type" value={type} onChange={setType} options={allTypes} />
        <FilterSelect label="Style" value={style} onChange={setStyle} options={allStyles} />
        <FilterSelect label="Bedrooms" value={bedrooms} onChange={setBedrooms} options={allBedrooms} />
        <FilterSelect label="Floors" value={floors} onChange={setFloors} options={allFloors} />

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="number"
              placeholder="Min price"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-28 rounded-lg border border-neutral-200 bg-white py-2 pl-8 pr-3 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
            />
          </div>
          <span className="text-sm text-neutral-400">&ndash;</span>
          <input
            type="number"
            placeholder="Max price"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="w-28 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
          />
        </div>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
          >
            <X size={14} />
            Clear
          </button>
        )}
      </div>
      </Reveal>

      <Reveal>
        <p className="mb-4 text-sm text-neutral-500">{filtered.length} plan{filtered.length !== 1 ? "s" : ""} found</p>
      </Reveal>

      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 0.07}>
            <HousePlanCard plan={plan} />
          </Reveal>
        ))}
      </div>
    </div>
  );
};
