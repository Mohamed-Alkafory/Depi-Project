// src/features/plans/components/PlanSpecs.jsx
import {
  Ruler,
  BedDouble,
  Bath,
  Building2,
  Car,
  Calendar,
  Tag,
  CircleDot,
} from "lucide-react";

const SPEC_ICONS = {
  area: Ruler,
  bedrooms: BedDouble,
  bathrooms: Bath,
  floors: Building2,
  garage: Car,
  year_built: Calendar,
  style: Tag,
  status: CircleDot,
};

export default function PlanSpecs({ plan, compact = false }) {
  const specs = [
    {
      key: "area",
      label: "Area",
      value: plan.area ? `${plan.area} m²` : null,
      icon: SPEC_ICONS.area,
    },
    {
      key: "bedrooms",
      label: "Bedrooms",
      value: plan.bedrooms || null,
      icon: SPEC_ICONS.bedrooms,
    },
    {
      key: "bathrooms",
      label: "Bathrooms",
      value: plan.bathrooms || null,
      icon: SPEC_ICONS.bathrooms,
    },
    {
      key: "floors",
      label: "Floors",
      value: plan.floors || null,
      icon: SPEC_ICONS.floors,
    },
    {
      key: "garage",
      label: "Garage",
      value: plan.garage ? `${plan.garage} cars` : null,
      icon: SPEC_ICONS.garage,
    },
    {
      key: "year_built",
      label: "Year Built",
      value: plan.year_built || null,
      icon: SPEC_ICONS.year_built,
    },
    {
      key: "style",
      label: "Style",
      value: plan.style || null,
      icon: SPEC_ICONS.style,
    },
    {
      key: "status",
      label: "Status",
      value: plan.status ? plan.status.replace("_", " ") : null,
      icon: SPEC_ICONS.status,
    },
  ].filter((s) => s.value !== null);

  if (compact) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {specs.slice(0, 5).map((spec) => (
          <div key={spec.key} className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal-50">
              <spec.icon size={18} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400">
                {spec.label}
              </span>
              <span className="text-sm font-semibold text-neutral-800 capitalize">
                {spec.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-neutral-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specs.map((spec) => (
          <div key={spec.key} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-teal-50">
              <spec.icon size={20} className="text-teal-600" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                {spec.label}
              </span>
              <span className="text-base font-semibold text-neutral-800 capitalize">
                {spec.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
