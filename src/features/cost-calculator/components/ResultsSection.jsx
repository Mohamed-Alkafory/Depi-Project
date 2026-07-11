import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, RotateCcw, Download, Printer, Share2,
  Home, Building2, Layers, TreePalm, Wrench, Package,
  Anvil, BrickWall, Shovel, ClipboardList, TrendingUp,
  Sparkles, CheckCircle2, Gauge, FileText,
} from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip as ReTooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

function formatEGP(n) {
  return Math.round(n).toLocaleString("en-US") + " EGP";
}

function useCountUp(target, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setValue(target); return; }
    let raf, start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

/* ── sparkline ── */
function sparkPoints(seed, endValue) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const pts = []; let v = endValue * 0.55;
  for (let i = 0; i < 7; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    v = Math.max(v + ((h % 100) / 100 - 0.4) * endValue * 0.18, endValue * 0.15);
    pts.push(v);
  }
  pts.push(endValue); return pts;
}
function Sparkline({ seed, value, color = "#0d9488" }) {
  const data = useMemo(() => sparkPoints(seed, value || 1), [seed, value]);
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) =>
    `${(i / (data.length - 1)) * 64},${22 - ((d - min) / (max - min || 1)) * 18}`
  ).join(" ");
  return (
    <svg width="64" height="22" viewBox="0 0 64 22" className="overflow-visible opacity-70">
      <polyline points={pts} fill="none" strokeWidth="2" strokeLinecap="round"
        strokeLinejoin="round" stroke={color} />
    </svg>
  );
}

/* ── meta maps ── */
const MATERIAL_META = {
  cement: { icon: Package,   unit: "ton",      bags: true,  color: "#64748b", accent: "from-slate-500 to-slate-700",  bg: "bg-slate-50",  border: "border-slate-200" },
  iron:   { icon: Anvil,     unit: "ton",      bags: false, color: "#52525b", accent: "from-zinc-500 to-zinc-700",    bg: "bg-zinc-50",   border: "border-zinc-200"  },
  gravel: { icon: Layers,    unit: "m³",       bags: false, color: "#f59e0b", accent: "from-amber-500 to-orange-500", bg: "bg-amber-50",  border: "border-amber-200" },
  sand:   { icon: Shovel,    unit: "m³",       bags: false, color: "#eab308", accent: "from-yellow-400 to-amber-500", bg: "bg-yellow-50", border: "border-yellow-200"},
  brick:  { icon: BrickWall, unit: "1000 pcs", bags: false, color: "#f43f5e", accent: "from-rose-500 to-red-600",     bg: "bg-rose-50",   border: "border-rose-200"  },
};

const BREAKDOWN_META = {
  Foundations: { icon: Home,      accent: "from-teal-500 to-emerald-500",   chip: "text-teal-700 bg-teal-50 ring-1 ring-teal-200",   pie: "#0d9488", desc: "Footings & substructure",   glow: "shadow-teal-200"   },
  Floors:      { icon: Building2, accent: "from-blue-500 to-indigo-500",    chip: "text-blue-700 bg-blue-50 ring-1 ring-blue-200",   pie: "#2563eb", desc: "Columns, slabs & masonry",  glow: "shadow-blue-200"   },
  "Top Floor": { icon: TreePalm,  accent: "from-amber-400 to-orange-500",   chip: "text-amber-700 bg-amber-50 ring-1 ring-amber-200",pie: "#f59e0b", desc: "Roof-level penthouse",       glow: "shadow-amber-200"  },
  Attachments: { icon: Wrench,    accent: "from-violet-500 to-purple-600",  chip: "text-violet-700 bg-violet-50 ring-1 ring-violet-200", pie: "#7c3aed", desc: "Fittings & site works", glow: "shadow-violet-200" },
};

export default function ResultsSection({ results, onBack, onReset }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const animatedTotal = useCountUp(results.total);

  const breakdownItems = [
    { key: "Foundations", label: "Foundations",              value: results.foundations               },
    { key: "Floors",      label: `Floors × ${results.floors}`, value: results.floorCost * results.floors },
    results.hasTopFloor &&
    { key: "Top Floor",   label: "Top Floor (Penthouse)",    value: results.topFloor                  },
    { key: "Attachments", label: "Attachments",              value: results.attachment                },
  ].filter(Boolean);

  const maxBreakdown = Math.max(...breakdownItems.map((i) => i.value));

  const pieData = useMemo(() =>
    breakdownItems.map((item) => ({
      name: item.label, value: item.value,
      color: (BREAKDOWN_META[item.key] ?? BREAKDOWN_META.Attachments).pie,
    })), [results]);

  const barData = useMemo(() =>
    Object.entries(results.quantities).map(([key, value]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: Number(value.toFixed(2)),
    })), [results]);

  const handleShare = async () => {
    try {
      navigator.share
        ? await navigator.share({ title: "Cost Estimate", text: formatEGP(results.total) })
        : await navigator.clipboard.writeText(window.location.href);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <style>{`
        @keyframes rs-up { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .rs-in { animation: rs-up .55s cubic-bezier(.22,1,.36,1) both }
        @media(prefers-reduced-motion:reduce){.rs-in{animation:none}}
      `}</style>

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between rs-in">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center shadow-inner shadow-teal-100">
            <ClipboardList size={20} className="text-teal-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Cost Estimate</h2>
            <p className="text-xs text-gray-400 mt-0.5">Your project cost breakdown</p>
          </div>
        </div>
        <button onClick={onReset}
          className="p-2.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100/80 hover:shadow-sm transition-all"
          title="Reset">
          <RotateCcw size={17} />
        </button>
      </div>

      {/* ── HERO CARD ── */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white rs-in
        shadow-[0_32px_64px_-16px_rgba(13,148,136,0.5),0_8px_24px_-8px_rgba(13,148,136,0.3)]"
        style={{ background: "linear-gradient(135deg,#0f766e 0%,#0d9488 40%,#0891b2 100%)" }}>

        {/* glass sweep */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(120deg,transparent 35%,rgba(255,255,255,0.12) 50%,transparent 65%)" }} />
        {/* blobs */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl" />
        {/* noise texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        <div className="relative">
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1.5 rounded-full shadow-sm">
              <CheckCircle2 size={12} /> Calculation completed
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/75 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Gauge size={12} /> Live market pricing
            </span>
          </div>

          <div className="flex items-center gap-2 text-white/70 mb-2">
            <TrendingUp size={15} />
            <span className="text-xs font-semibold tracking-widest uppercase">Total Estimated Cost</span>
          </div>
          <p className="text-4xl md:text-5xl font-bold tracking-tight tabular-nums drop-shadow-sm">
            {formatEGP(animatedTotal)}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { icon: Home,      label: `${results.area} m²` },
              { icon: Building2, label: `${results.floors} Floor${results.floors !== 1 ? "s" : ""}` },
              { icon: Sparkles,  label: results.hasTopFloor ? "Penthouse Included" : "Standard Roof" },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-sm bg-white/12 backdrop-blur-sm border border-white/15 px-3.5 py-1.5 rounded-full shadow-sm hover:bg-white/20 transition-colors">
                <Icon size={13} /> {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── COST BREAKDOWN ── */}
      <div className="rs-in" style={{ animationDelay: "70ms" }}>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-4">Cost Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {breakdownItems.map((item, idx) => {
            const meta = BREAKDOWN_META[item.key] ?? BREAKDOWN_META.Attachments;
            const Icon = meta.icon;
            const pct = Math.round((item.value / results.total) * 100);
            const barPct = Math.round((item.value / maxBreakdown) * 100);
            return (
              <div key={item.key}
                className={`group relative bg-white rounded-2xl p-5 border border-gray-100
                  shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08),0_1px_3px_-1px_rgba(0,0,0,0.04)]
                  hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12),0_4px_12px_-4px_${meta.glow}/40]
                  hover:-translate-y-1 transition-all duration-300`}
                style={{ transitionDelay: `${idx * 35}ms` }}>

                {/* top accent bar */}
                <div className={`absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${meta.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${meta.accent} flex items-center justify-center
                      shadow-[0_4px_12px_-4px_rgba(0,0,0,0.25)] group-hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] transition-shadow`}>
                      <Icon size={18} className="text-white drop-shadow" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-800 block leading-tight">{item.label}</span>
                      <span className="text-[11px] text-gray-400 mt-0.5 block">{meta.desc}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${meta.chip} shadow-sm`}>{pct}%</span>
                </div>

                <p className="text-2xl font-bold text-gray-900 tabular-nums mb-3 tracking-tight">{formatEGP(item.value)}</p>

                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${meta.accent} transition-all duration-1000 ease-out`}
                    style={{ width: mounted ? `${barPct}%` : "0%", transitionDelay: `${idx * 80}ms` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MATERIAL QUANTITIES ── */}
      <div className="rs-in" style={{ animationDelay: "130ms" }}>
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.18em] mb-4">Material Quantities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(results.quantities).map(([key, value]) => {
            const meta = MATERIAL_META[key] ?? MATERIAL_META.cement;
            const Icon = meta.icon;
            const extra = key === "cement" ? `${Math.round(value * 20)} bags`
                        : key === "brick"  ? `${Math.round(value * 1000)} pcs` : null;
            return (
              <div key={key}
                className={`group relative overflow-hidden bg-white rounded-2xl border ${meta.border}
                  shadow-[0_2px_8px_-2px_rgba(0,0,0,0.07)]
                  hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.12)]
                  hover:-translate-y-1 transition-all duration-300`}>

                {/* top color bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${meta.accent}`} />

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.accent} flex items-center justify-center
                      shadow-[0_4px_10px_-4px_rgba(0,0,0,0.25)]`}>
                      <Icon size={15} className="text-white" />
                    </div>
                    <Sparkline seed={key} value={value} color={meta.color} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 capitalize mb-1">{key}</p>
                  <p className="text-xl font-bold text-gray-900 tabular-nums leading-none">{value.toFixed(2)}</p>
                  <p className="text-[11px] text-gray-400 mt-1">{meta.unit}</p>
                  {extra && <p className="text-[11px] font-semibold text-teal-600 mt-1">{extra}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 rs-in" style={{ animationDelay: "190ms" }}>
        <div className="bg-white rounded-2xl border border-gray-100 p-5
          shadow-[0_2px_8px_-2px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] transition-shadow">
          <h4 className="text-sm font-bold text-gray-800">Cost Distribution</h4>
          <p className="text-xs text-gray-400 mt-0.5 mb-3">Share of total by category</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={48} outerRadius={78} paddingAngle={3} animationDuration={900}>
                {pieData.map((e, i) => <Cell key={i} fill={e.color} stroke="none" />)}
              </Pie>
              <ReTooltip formatter={(v) => formatEGP(v)}
                contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {pieData.map((d) => (
              <span key={d.name} className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5
          shadow-[0_2px_8px_-2px_rgba(0,0,0,0.07)] hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] transition-shadow">
          <h4 className="text-sm font-bold text-gray-800">Material Consumption</h4>
          <p className="text-xs text-gray-400 mt-0.5 mb-3">Quantity per material</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={barData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <ReTooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 8px 24px -8px rgba(0,0,0,0.15)" }} />
              <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} animationDuration={900} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── EXPORT ── */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-6 rs-in
        shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]"
        style={{ animationDelay: "240ms" }}>
        {/* soft teal glow bg */}
        <div className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 bg-teal-50 rounded-full blur-3xl opacity-60" />
        <div className="relative flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center
            shadow-[0_8px_20px_-6px_rgba(13,148,136,0.5)] shrink-0">
            <FileText size={22} className="text-white drop-shadow" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-gray-900">Export your report</h4>
            <p className="text-xs text-gray-500 mt-0.5">Download a full breakdown of costs and material quantities.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm
              transition-all shadow-[0_4px_14px_-4px_rgba(13,148,136,0.6)] hover:shadow-[0_8px_20px_-6px_rgba(13,148,136,0.7)] hover:-translate-y-0.5">
              <Download size={15} /> Export PDF
            </button>
            <button onClick={handleShare}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 bg-white text-gray-500
              hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all" title="Share">
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}