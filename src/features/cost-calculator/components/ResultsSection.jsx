import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  RotateCcw,
  Download,
  Printer,
  Share2,
  Home,
  Building2,
  Layers,
  TreePalm,
  Wrench,
  Package,
  Anvil,
  BrickWall,
  Shovel,
  HardHat,
  ClipboardList,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Calendar,
  Gauge,
  FileText,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function formatEGP(n) {
  return Math.round(n).toLocaleString("en-US") + " EGP";
}

/* ---------- animated count-up (respects reduced-motion) ---------- */
function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    let raf;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ---------- tiny deterministic sparkline (decorative only) ---------- */
function sparkPoints(seed, endValue) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const pts = [];
  let v = endValue * 0.55;
  for (let i = 0; i < 7; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const noise = (h % 100) / 100;
    v = Math.max(v + (noise - 0.4) * endValue * 0.18, endValue * 0.15);
    pts.push(v);
  }
  pts.push(endValue);
  return pts;
}

function Sparkline({ seed, value, strokeClassName }) {
  const data = useMemo(() => sparkPoints(seed, value || 1), [seed, value]);
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 72;
      const y = 26 - ((d - min) / (max - min || 1)) * 20 - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width="72" height="26" viewBox="0 0 72 26" className="overflow-visible">
      <polyline
        points={pts}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={strokeClassName}
      />
    </svg>
  );
}

/* ---------- meta / styling maps ---------- */
const MATERIAL_META = {
  cement: { icon: Package, unit: "ton", accent: "from-slate-500 to-slate-700", ring: "ring-slate-200", glow: "shadow-slate-300/40", stroke: "stroke-slate-500" },
  iron: { icon: Anvil, unit: "ton", accent: "from-zinc-600 to-zinc-800", ring: "ring-zinc-200", glow: "shadow-zinc-300/40", stroke: "stroke-zinc-600" },
  gravel: { icon: Layers, unit: "m³", accent: "from-amber-500 to-orange-600", ring: "ring-amber-200", glow: "shadow-amber-300/40", stroke: "stroke-amber-500" },
  sand: { icon: Shovel, unit: "m³", accent: "from-yellow-400 to-amber-500", ring: "ring-yellow-200", glow: "shadow-yellow-300/40", stroke: "stroke-yellow-500" },
  brick: { icon: BrickWall, unit: "1000 pcs", accent: "from-rose-500 to-red-600", ring: "ring-rose-200", glow: "shadow-rose-300/40", stroke: "stroke-rose-500" },
  labor: { icon: HardHat, unit: "—", accent: "from-teal-500 to-cyan-600", ring: "ring-teal-200", glow: "shadow-teal-300/40", stroke: "stroke-teal-500" },
};

const BREAKDOWN_META = {
  Foundations: { icon: Home, accent: "from-teal-500 to-emerald-600", chip: "text-teal-700 bg-teal-50", pie: "#0d9488", desc: "Footings & substructure" },
  Floors: { icon: Building2, accent: "from-blue-500 to-indigo-600", chip: "text-blue-700 bg-blue-50", pie: "#2563eb", desc: "Columns, slabs & masonry" },
  "Top Floor (50%)": { icon: TreePalm, accent: "from-amber-500 to-orange-600", chip: "text-amber-700 bg-amber-50", pie: "#f59e0b", desc: "Roof-level extension" },
  Attachments: { icon: Wrench, accent: "from-violet-500 to-purple-600", chip: "text-violet-700 bg-violet-50", pie: "#7c3aed", desc: "Fittings & site works" },
};

export default function ResultsSection({ results, onBack, onReset }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const animatedTotal = useCountUp(results.total);

  const breakdownItems = [
    { label: "Foundations", value: results.foundations },
    { label: `Floors × ${results.floors}`, value: results.floorCost * results.floors, key: "Floors" },
    results.hasTopFloor && { label: "Top Floor (50%)", value: results.topFloor },
    { label: "Attachments", value: results.attachment },
  ].filter(Boolean);

  const maxBreakdown = Math.max(...breakdownItems.map((i) => i.value));

  const pieData = useMemo(
    () =>
      breakdownItems.map((item) => ({
        name: item.label,
        value: item.value,
        color: (BREAKDOWN_META[item.key ?? item.label] ?? BREAKDOWN_META.Attachments).pie,
      })),
    [results]
  );

  const barData = useMemo(
    () =>
      Object.entries(results.quantities).map(([key, value]) => ({
        name: key,
        value: Number(value.toFixed(2)),
      })),
    [results]
  );

  const calcDate = useMemo(
    () => new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    []
  );

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Construction Cost Estimate",
          text: `Estimated cost: ${formatEGP(results.total)}`,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      /* user cancelled share — no-op */
    }
  };

  return (
    <div className="bg-slate-50 rounded-[24px] p-4 md:p-8 -m-4 md:-m-8">
      <style>{`
        @keyframes rs-fade-up { from { opacity:0; transform:translateY(14px);} to {opacity:1; transform:translateY(0);} }
        .rs-in { animation: rs-fade-up .6s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .rs-in { animation: none; } }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 rs-in">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-teal-600/10 flex items-center justify-center">
            <ClipboardList size={20} className="text-teal-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Cost Estimate</h2>
            <p className="text-xs text-gray-500">Your project cost breakdown</p>
          </div>
        </div>
        <button
          onClick={onReset}
          className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-white transition-colors motion-reduce:transition-none"
          title="Reset"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 xl:gap-8 items-start">
        {/* ============ MAIN COLUMN ============ */}
        <div className="space-y-8 min-w-0">
          {/* ---------- HERO COST CARD ---------- */}
          <div
            className="relative overflow-hidden rounded-[24px] p-7 md:p-10 text-white shadow-[0_30px_80px_-24px_rgba(13,148,136,0.55)] rs-in"
            style={{
              background:
                "linear-gradient(135deg, #0d9488 0%, #0f766e 45%, #155e75 100%)",
            }}
          >
            {/* glass reflection sweep */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.16) 45%, transparent 60%)",
              }}
            />
            <div className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={13} /> Calculation completed
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full">
                  <Gauge size={13} /> Live market pricing
                </span>
              </div>

              <div className="flex items-center gap-2 text-white/80">
                <TrendingUp size={16} />
                <span className="text-sm font-medium tracking-wide">Total Estimated Cost</span>
              </div>

              <p className="mt-3 text-4xl md:text-6xl font-bold tracking-tight tabular-nums">
                {formatEGP(animatedTotal)}
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 text-sm bg-white/15 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                  <Home size={14} /> {results.area} m²
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm bg-white/15 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                  <Building2 size={14} /> {results.floors} Floor{results.floors > 1 ? "s" : ""}
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm bg-white/15 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full">
                  <Sparkles size={14} /> Roof {results.hasTopFloor ? "Included" : "Standard"}
                </span>
              </div>
            </div>
          </div>

          {/* ---------- COST BREAKDOWN ---------- */}
          <div className="rs-in" style={{ animationDelay: "80ms" }}>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Cost Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {breakdownItems.map((item, idx) => {
                const meta = BREAKDOWN_META[item.key ?? item.label] ?? BREAKDOWN_META.Attachments;
                const Icon = meta.icon;
                const pct = Math.round((item.value / results.total) * 100);
                const barPct = Math.round((item.value / maxBreakdown) * 100);
                return (
                  <div
                    key={item.label}
                    className="group relative bg-white/80 backdrop-blur-xl rounded-[20px] p-5 border border-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_18px_44px_-16px_rgba(15,23,42,0.22)] hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    style={{ transitionDelay: `${idx * 40}ms` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-lg`}
                        >
                          <Icon size={19} className="text-white" />
                        </div>
                        <div>
                          <span className="text-sm font-semibold text-gray-800 block">
                            {item.label}
                          </span>
                          <span className="text-[11px] text-gray-400">{meta.desc}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${meta.chip}`}>
                        {pct}%
                      </span>
                    </div>

                    <p className="mt-4 text-2xl font-bold text-gray-900 tracking-tight tabular-nums">
                      {formatEGP(item.value)}
                    </p>

                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${meta.accent} transition-all duration-1000 ease-out motion-reduce:transition-none`}
                        style={{ width: mounted ? `${barPct}%` : "0%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- MATERIAL QUANTITIES ---------- */}
          <div className="rs-in" style={{ animationDelay: "140ms" }}>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">
              Material Quantities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.quantities).map(([key, value]) => {
                const meta = MATERIAL_META[key] ?? MATERIAL_META.labor;
                const Icon = meta.icon;
                return (
                  <div
                    key={key}
                    className={`group relative overflow-hidden bg-white/80 backdrop-blur-xl rounded-[20px] border border-white ring-1 ring-transparent hover:${meta.ring} shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] hover:shadow-lg ${meta.glow} hover:-translate-y-1 transition-all duration-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0`}
                  >
                    <div className={`h-1 w-full bg-gradient-to-r ${meta.accent}`} />
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.accent} flex items-center justify-center shadow-lg`}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <Sparkline seed={key} value={value} strokeClassName={meta.stroke} />
                      </div>

                      <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        {key}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <p className="mt-1 text-3xl font-bold text-gray-900 tracking-tight tabular-nums">
                          {value.toFixed(2)}
                        </p>
                        <span className="text-xs font-medium text-gray-400">{meta.unit}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- CHARTS ---------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rs-in" style={{ animationDelay: "200ms" }}>
            <div className="bg-white/80 backdrop-blur-xl rounded-[20px] border border-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] p-5">
              <h4 className="text-sm font-bold text-gray-800 mb-1">Cost Distribution</h4>
              <p className="text-xs text-gray-400 mb-2">Share of total by category</p>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    animationDuration={900}
                  >
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <ReTooltip
                    formatter={(v) => formatEGP(v)}
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
                {pieData.map((d) => (
                  <span key={d.name} className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                    {d.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-[20px] border border-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] p-5">
              <h4 className="text-sm font-bold text-gray-800 mb-1">Material Consumption</h4>
              <p className="text-xs text-gray-400 mb-2">Quantity per material</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <ReTooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
                  />
                  <Bar dataKey="value" fill="#0d9488" radius={[8, 8, 0, 0]} animationDuration={900} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ---------- DOWNLOAD SECTION ---------- */}
          <div
            className="relative overflow-hidden rounded-[24px] border border-white bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] p-6 md:p-8 rs-in"
            style={{ animationDelay: "260ms" }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30 shrink-0">
                <FileText size={32} className="text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-base font-bold text-gray-900">Export your report</h4>
                <p className="text-sm text-gray-500 mt-0.5">
                  Download a full breakdown of costs and material quantities to share with your team.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <Download size={16} /> Export PDF
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  title="Print"
                >
                  <Printer size={16} />
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center w-11 h-11 rounded-2xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onBack}
            className="xl:hidden w-full py-3.5 rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} /> Edit Data
          </button>
        </div>

        {/* ============ RIGHT STICKY PANEL ============ */}
        <aside className="xl:sticky xl:top-6 rs-in" style={{ animationDelay: "100ms" }}>
          <div className="relative overflow-hidden rounded-[24px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_60px_-24px_rgba(15,23,42,0.25)]">
            <div className="p-6 bg-gradient-to-br from-teal-600 to-cyan-700 text-white relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <p className="text-xs font-medium text-white/80 tracking-wide relative">Project Summary</p>
              <p className="text-2xl font-bold mt-1 relative tabular-nums">{formatEGP(results.total)}</p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-[11px] font-semibold bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full relative">
                <CheckCircle2 size={12} /> Completed
              </span>
            </div>

            <div className="p-5 space-y-1">
              {[
                { icon: Home, label: "Building Area", value: `${results.area} m²` },
                { icon: Building2, label: "Number of Floors", value: results.floors },
                {
                  icon: Sparkles,
                  label: "Roof Status",
                  value: results.hasTopFloor ? "Included" : "Standard",
                },
                { icon: Calendar, label: "Calculation Date", value: calcDate },
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0"
                >
                  <span className="flex items-center gap-2 text-xs text-gray-500">
                    <row.icon size={14} className="text-teal-600" />
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="p-5 pt-0 space-y-2">
              <button
                onClick={onBack}
                className="hidden xl:flex w-full py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 font-semibold text-sm hover:bg-gray-50 hover:border-gray-300 transition-all items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> Edit Data
              </button>
              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-semibold text-sm transition-all shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 flex items-center justify-center gap-2"
              >
                <Download size={16} /> Save PDF
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}