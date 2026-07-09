// import { useState, useMemo } from "react";
// import { Search, X } from "lucide-react";
// import { usePlans } from "@/features/plans/hooks/usePlans";
// import HousePlanCard from "@/components/houses/HousePlanCard";
// import Reveal from "@/components/ui/Reveal";

// function FilterSelect({ label, value, onChange, options }) {
//   return (
//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
//     >
//       <option value="">{label}</option>
//       {options.map((opt) => (
//         <option key={opt} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   );
// }

// export const Plans = () => {
//   const { data: plans, isLoading, error } = usePlans();

//   const [type, setType] = useState("");
//   const [style, setStyle] = useState("");
//   const [bedrooms, setBedrooms] = useState("");
//   const [floors, setFloors] = useState("");
//   const [priceMin, setPriceMin] = useState("");
//   const [priceMax, setPriceMax] = useState("");

//   // Build filter options from REAL data
//   const allTypes = useMemo(() => {
//     if (!plans) return [];
//     return [...new Set(plans.map((p) => p.categories?.name).filter(Boolean))];
//   }, [plans]);

//   const allStyles = useMemo(() => {
//     if (!plans) return [];
//     return [...new Set(plans.map((p) => p.style).filter(Boolean))];
//   }, [plans]);

//   const allBedrooms = useMemo(() => {
//     if (!plans) return [];
//     return [...new Set(plans.map((p) => p.bedrooms).filter(Boolean))].sort(
//       (a, b) => a - b,
//     );
//   }, [plans]);

//   const allFloors = useMemo(() => {
//     if (!plans) return [];
//     return [...new Set(plans.map((p) => p.floors).filter(Boolean))].sort(
//       (a, b) => a - b,
//     );
//   }, [plans]);

//   const filtered = useMemo(() => {
//     if (!plans) return [];
//     return plans.filter((p) => {
//       if (type && p.categories?.name !== type) return false;
//       if (style && p.style !== style) return false;
//       if (bedrooms && String(p.bedrooms) !== bedrooms) return false;
//       if (floors && String(p.floors) !== floors) return false;
//       if (priceMin && Number(p.price) < Number(priceMin)) return false;
//       if (priceMax && Number(p.price) > Number(priceMax)) return false;
//       return true;
//     });
//   }, [plans, type, style, bedrooms, floors, priceMin, priceMax]);

//   const hasFilters =
//     type || style || bedrooms || floors || priceMin || priceMax;

//   function clearFilters() {
//     setType("");
//     setStyle("");
//     setBedrooms("");
//     setFloors("");
//     setPriceMin("");
//     setPriceMax("");
//   }

//   if (isLoading) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex min-h-[400px] items-center justify-center">
//           <div className="w-8 h-8 border-2 border-neutral-200 border-t-teal-600 rounded-full animate-spin" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//         <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
//           <p className="text-red-500 text-sm">Failed to load plans</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="text-sm text-teal-600 hover:underline"
//           >
//             Try again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//       <Reveal>
//         <h1 className="mb-6 text-3xl font-bold text-neutral-900">
//           Our House Plans
//         </h1>
//       </Reveal>

//       <Reveal>
//         <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
//           <FilterSelect
//             label="Type"
//             value={type}
//             onChange={setType}
//             options={allTypes}
//           />
//           <FilterSelect
//             label="Style"
//             value={style}
//             onChange={setStyle}
//             options={allStyles}
//           />
//           <FilterSelect
//             label="Bedrooms"
//             value={bedrooms}
//             onChange={setBedrooms}
//             options={allBedrooms}
//           />
//           <FilterSelect
//             label="Floors"
//             value={floors}
//             onChange={setFloors}
//             options={allFloors}
//           />

//           <div className="flex items-center gap-2">
//             <div className="relative">
//               <Search
//                 size={14}
//                 className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400"
//               />
//               <input
//                 type="number"
//                 placeholder="Min price"
//                 value={priceMin}
//                 onChange={(e) => setPriceMin(e.target.value)}
//                 className="w-28 rounded-lg border border-neutral-200 bg-white py-2 pl-8 pr-3 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
//               />
//             </div>
//             <span className="text-sm text-neutral-400">&ndash;</span>
//             <input
//               type="number"
//               placeholder="Max price"
//               value={priceMax}
//               onChange={(e) => setPriceMax(e.target.value)}
//               className="w-28 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
//             />
//           </div>

//           {hasFilters && (
//             <button
//               onClick={clearFilters}
//               className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-700"
//             >
//               <X size={14} />
//               Clear
//             </button>
//           )}
//         </div>
//       </Reveal>

//       <Reveal>
//         <p className="mb-4 text-sm text-neutral-500">
//           {filtered.length} plan{filtered.length !== 1 ? "s" : ""} found
//         </p>
//       </Reveal>

//       <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//         {filtered.map((plan, i) => (
//           <Reveal key={plan.id} delay={i * 0.07}>
//             <HousePlanCard plan={plan} />
//           </Reveal>
//         ))}
//       </div>
//     </div>
//   );
// };
import { useState, useMemo } from "react";
import {
  Search, X, Home, BedDouble, Layers, FileText,
  Calculator, Filter, RefreshCw, ChevronDown,
} from "lucide-react";
import { usePlans } from "@/features/plans/hooks/usePlans";
import HousePlanCard from "@/components/houses/HousePlanCard";
import Reveal from "@/components/ui/Reveal";
import PlanHeroCarousel from "@/components/PlanHeroCarousel";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-700 outline-none transition-colors focus:border-neutral-400"
    >
      <option value="">{label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

export const Plans = () => {
  const { data: plans, isLoading, error } = usePlans();

  const [type, setType] = useState("");
  const [style, setStyle] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [floors, setFloors] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  // Build filter options from REAL data
  const allTypes = useMemo(() => {
    if (!plans) return [];
    return [...new Set(plans.map((p) => p.categories?.name).filter(Boolean))];
  }, [plans]);

  const allStyles = useMemo(() => {
    if (!plans) return [];
    return [...new Set(plans.map((p) => p.style).filter(Boolean))];
  }, [plans]);

  const allBedrooms = useMemo(() => {
    if (!plans) return [];
    return [...new Set(plans.map((p) => p.bedrooms).filter(Boolean))].sort(
      (a, b) => a - b,
    );
  }, [plans]);

  const allFloors = useMemo(() => {
    if (!plans) return [];
    return [...new Set(plans.map((p) => p.floors).filter(Boolean))].sort(
      (a, b) => a - b,
    );
  }, [plans]);

  const filtered = useMemo(() => {
    if (!plans) return [];
    return plans.filter((p) => {
      if (type && p.categories?.name !== type) return false;
      if (style && p.style !== style) return false;
      if (bedrooms && String(p.bedrooms) !== bedrooms) return false;
      if (floors && String(p.floors) !== floors) return false;
      if (priceMin && Number(p.price) < Number(priceMin)) return false;
      if (priceMax && Number(p.price) > Number(priceMax)) return false;
      return true;
    });
  }, [plans, type, style, bedrooms, floors, priceMin, priceMax]);

  const hasFilters =
    type || style || bedrooms || floors || priceMin || priceMax;

  function clearFilters() {
    setType("");
    setStyle("");
    setBedrooms("");
    setFloors("");
    setPriceMin("");
    setPriceMax("");
  }

  // ✅ Prepare slides for carousel (top 5 plans)
  const heroSlides = useMemo(() => {
    if (!plans || plans.length === 0) return [];
    return plans.slice(0, 5).map((p) => ({
      image:
        p.cover_image || p.plan_images?.[0]?.image_url || "/hero-fallback.jpg",
      title: p.title,
      tag: `${p.bedrooms || 0} Beds • ${p.bathrooms || 0} Baths • ${p.area || 0}m²`,
      price: `EGP ${p.price?.toLocaleString() || "0"}`,
      link: `/plans/${p.slug}`,
    }));
  }, [plans]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="w-8 h-8 border-2 border-neutral-200 border-t-teal-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
          <p className="text-red-500 text-sm">Failed to load plans</p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm text-teal-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PlanHeroCarousel slides={heroSlides} />

      {/* Section Title */}
    

      {/* Filter Bar */}
      <div className="mx-auto max-w-7xl px-4 mt-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-6 shadow-xl shadow-gray-200/60 sm:rounded-3xl sm:p-8">
          <div className="flex flex-wrap items-end gap-4">
            {/* Type */}
            <div className="min-w-[140px] flex-1">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Type
              </label>
              <div className="relative">
                <Home size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Types</option>
                  {allTypes.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Style */}
            <div className="min-w-[140px] flex-1">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Style
              </label>
              <div className="relative">
                <FileText size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Styles</option>
                  {allStyles.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Bedrooms */}
            <div className="min-w-[140px] flex-1">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Bedrooms
              </label>
              <div className="relative">
                <BedDouble size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Bedrooms</option>
                  {allBedrooms.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Floors */}
            <div className="min-w-[140px] flex-1">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Floors
              </label>
              <div className="relative">
                <Layers size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-teal-600" />
                <select
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-10 text-sm font-medium text-slate-700 outline-none transition-all focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">All Floors</option>
                  {allFloors.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Price Range */}
            <div className="min-w-[200px] flex-1">
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                Price range (EGP)
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Calculator size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
                <span className="text-gray-300">&mdash;</span>
                <div className="relative flex-1">
                  <Calculator size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                  />
                </div>
              </div>
            </div>

            {hasFilters && (
              <div className="flex w-full items-end justify-center sm:w-auto">
                <button
                  onClick={clearFilters}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
                >
                  <RefreshCw size={14} />
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results + Plans Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50">
            <Home size={20} className="text-teal-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-slate-800">
              {filtered.length} House Plan{filtered.length !== 1 ? "s" : ""} Found
            </p>
            <p className="text-sm text-gray-500">
              Showing 1 &ndash; {filtered.length} of {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.length > 0 ? (
            filtered.map((plan, i) => (
              <Reveal key={plan.id} delay={i * 0.07}>
                <HousePlanCard plan={plan} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500">No plans match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
