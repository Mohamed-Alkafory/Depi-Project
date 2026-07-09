// // "use client";

// // import { useRef, useEffect, useState, useMemo } from "react";
// // import { useAllOrders } from "@/features/orders/hooks/useOrders";
// // import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// // import { useCategories } from "@/features/plans/hooks/useCategories";
// // import {
// //   Package,
// //   ShoppingCart,
// //   DollarSign,
// //   Clock,
// //   CheckCircle,
// //   ArrowUpRight,
// //   ArrowDownRight,
// //   Calendar,
// //   ChevronDown,
// //   Zap,
// //   FileText,
// //   CreditCard,
// //   Download,
// //   Eye,
// //   Users,
// //   Star,
// // } from "lucide-react";
// // import gsap from "gsap";

// // // ==================== MOCK ACTIVITY DATA ====================
// // const MOCK_ACTIVITIES = [
// //   {
// //     id: 1,
// //     action: "New order placed",
// //     detail: "Order #1242 — Villa Plan Premium",
// //     time: "2 min ago",
// //     type: "order",
// //     icon: ShoppingCart,
// //     color: "bg-sky-50 text-sky-600",
// //   },
// //   {
// //     id: 2,
// //     action: "Plan updated",
// //     detail: "Modern Duplex v2.1 published",
// //     time: "15 min ago",
// //     type: "plan",
// //     icon: FileText,
// //     color: "bg-violet-50 text-violet-600",
// //   },
// //   {
// //     id: 3,
// //     action: "Payment received",
// //     detail: "EGP 45,000 — Order #1240",
// //     time: "1 hour ago",
// //     type: "payment",
// //     icon: CreditCard,
// //     color: "bg-emerald-50 text-emerald-600",
// //   },
// //   {
// //     id: 4,
// //     action: "New user registered",
// //     detail: "Ahmed Hassan — Cairo, Egypt",
// //     time: "2 hours ago",
// //     type: "user",
// //     icon: Users,
// //     color: "bg-amber-50 text-amber-600",
// //   },
// //   {
// //     id: 5,
// //     action: "Plan trending",
// //     detail: "Luxury Villa — 234 views today",
// //     time: "3 hours ago",
// //     type: "view",
// //     icon: Eye,
// //     color: "bg-rose-50 text-rose-600",
// //   },
// //   {
// //     id: 6,
// //     action: "Review submitted",
// //     detail: "5★ rating on Modern Apartment",
// //     time: "5 hours ago",
// //     type: "review",
// //     icon: Star,
// //     color: "bg-yellow-50 text-yellow-600",
// //   },
// // ];

// // // ==================== SVG CHARTS ====================
// // const MiniSparkline = ({ data, color = "#14B8A6", height = 32 }) => {
// //   const max = Math.max(...data);
// //   const min = Math.min(...data);
// //   const range = max - min || 1;
// //   const points = data
// //     .map((v, i) => {
// //       const x = (i / (data.length - 1)) * 100;
// //       const y = 90 - ((v - min) / range) * 80;
// //       return `${x},${y}`;
// //     })
// //     .join(" ");

// //   return (
// //     <svg
// //       viewBox="0 0 100 100"
// //       preserveAspectRatio="none"
// //       className="w-full"
// //       style={{ height }}
// //     >
// //       <defs>
// //         <linearGradient
// //           id={`spark-${color.replace("#", "")}`}
// //           x1="0"
// //           y1="0"
// //           x2="0"
// //           y2="1"
// //         >
// //           <stop offset="0%" stopColor={color} stopOpacity="0.25" />
// //           <stop offset="100%" stopColor={color} stopOpacity="0" />
// //         </linearGradient>
// //       </defs>
// //       <polygon
// //         points={`0,100 ${points} 100,100`}
// //         fill={`url(#spark-${color.replace("#", "")})`}
// //       />
// //       <polyline
// //         points={points}
// //         fill="none"
// //         stroke={color}
// //         strokeWidth="2"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       />
// //       <circle
// //         cx={points.split(" ").pop()?.split(",")[0]}
// //         cy={points.split(" ").pop()?.split(",")[1]}
// //         r="2"
// //         fill={color}
// //       />
// //     </svg>
// //   );
// // };

// // const RevenueChart = ({ data }) => {
// //   const max = Math.max(...data.map((d) => d.revenue));
// //   const chartRef = useRef(null);

// //   useEffect(() => {
// //     if (chartRef.current) {
// //       gsap.fromTo(
// //         chartRef.current.querySelectorAll(".bar-fill"),
// //         { scaleY: 0 },
// //         {
// //           scaleY: 1,
// //           duration: 1.2,
// //           stagger: 0.1,
// //           ease: "power3.out",
// //           delay: 0.5,
// //         },
// //       );
// //     }
// //   }, [data]);

// //   return (
// //     <div
// //       ref={chartRef}
// //       className="flex items-end justify-between gap-3 h-52 px-2 pt-4"
// //     >
// //       {data.map((item, i) => {
// //         const height = max > 0 ? (item.revenue / max) * 100 : 0;
// //         return (
// //           <div
// //             key={i}
// //             className="flex-1 flex flex-col items-center gap-3 group cursor-pointer relative"
// //           >
// //             <div className="relative w-full flex justify-center h-40 items-end">
// //               <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0F172A] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl transform translate-y-1 group-hover:translate-y-0">
// //                 EGP {item.revenue.toLocaleString()}
// //                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#0F172A] rotate-45" />
// //               </div>
// //               <div
// //                 className="bar-fill w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#0F172A] via-[#14B8A6] to-[#2DD4BF] origin-bottom transition-all duration-300 group-hover:from-[#0F172A] group-hover:via-[#5EEAD4] group-hover:to-[#99F6E4] group-hover:shadow-lg group-hover:shadow-teal-500/20"
// //                 style={{ height: `${height}%` }}
// //               />
// //               <div
// //                 className="absolute w-2 h-2 rounded-full bg-[#0F172A]/30 border-2 border-white"
// //                 style={{ bottom: `${Math.min((item.orders / 30) * 100, 90)}%` }}
// //               />
// //             </div>
// //             <span className="text-[11px] text-slate-400 font-medium">
// //               {item.month}
// //             </span>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// // const DonutChart = ({ data }) => {
// //   const total = data.reduce((sum, d) => sum + d.value, 0);
// //   const chartRef = useRef(null);
// //   const radius = 40;
// //   const circumference = 2 * Math.PI * radius;
// //   let currentOffset = 0;

// //   useEffect(() => {
// //     if (chartRef.current) {
// //       gsap.fromTo(
// //         chartRef.current.querySelectorAll(".donut-segment"),
// //         { strokeDashoffset: circumference },
// //         {
// //           strokeDashoffset: 0,
// //           duration: 1.5,
// //           stagger: 0.15,
// //           ease: "power3.out",
// //           delay: 0.3,
// //         },
// //       );
// //     }
// //   }, [data]);

// //   return (
// //     <div className="relative w-44 h-44 mx-auto">
// //       <svg
// //         viewBox="0 0 100 100"
// //         className="w-full h-full -rotate-90"
// //         ref={chartRef}
// //       >
// //         <circle
// //           cx="50"
// //           cy="50"
// //           r={radius}
// //           fill="none"
// //           stroke="#F1F5F9"
// //           strokeWidth="12"
// //         />
// //         {data.map((item, i) => {
// //           const segmentLength = (item.value / total) * circumference;
// //           const offset = currentOffset;
// //           currentOffset += segmentLength;
// //           return (
// //             <circle
// //               key={i}
// //               cx="50"
// //               cy="50"
// //               r={radius}
// //               fill="none"
// //               stroke={item.color}
// //               strokeWidth="12"
// //               strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
// //               strokeDashoffset={-offset}
// //               strokeLinecap="round"
// //               className="donut-segment transition-all duration-300 hover:stroke-width-[14] cursor-pointer"
// //             />
// //           );
// //         })}
// //       </svg>
// //       <div className="absolute inset-0 flex flex-col items-center justify-center">
// //         <span className="text-2xl font-bold text-[#0F172A]">{total}</span>
// //         <span className="text-[10px] text-slate-400 font-medium">
// //           Total Plans
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };

// // // ==================== STAT CARD ====================
// // const StatCard = ({ stat, index }) => {
// //   const cardRef = useRef(null);
// //   const [trend] = useState(() => (Math.random() > 0.3 ? "up" : "down"));
// //   const [trendValue] = useState(() => Math.floor(Math.random() * 20) + 3);

// //   useEffect(() => {
// //     if (cardRef.current) {
// //       gsap.fromTo(
// //         cardRef.current,
// //         { y: 40, opacity: 0 },
// //         {
// //           y: 0,
// //           opacity: 1,
// //           duration: 0.6,
// //           delay: index * 0.08,
// //           ease: "power3.out",
// //         },
// //       );
// //     }
// //   }, [index]);

// //   const sparkData = useMemo(
// //     () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 60) + 20),
// //     [],
// //   );

// //   return (
// //     <div
// //       ref={cardRef}
// //       className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
// //     >
// //       <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-slate-50/80 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //       <div className="flex items-start justify-between mb-3">
// //         <div
// //           className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
// //         >
// //           <stat.icon size={20} strokeWidth={2} />
// //         </div>
// //         <div
// //           className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
// //         >
// //           {trend === "up" ? (
// //             <ArrowUpRight size={13} />
// //           ) : (
// //             <ArrowDownRight size={13} />
// //           )}
// //           {trendValue}%
// //         </div>
// //       </div>
// //       <p className="text-2xl font-bold text-[#0F172A] mb-0.5 tracking-tight">
// //         {stat.value}
// //       </p>
// //       <p className="text-xs text-slate-500 font-medium mb-3">{stat.label}</p>
// //       <MiniSparkline data={sparkData} color={stat.sparkColor} />
// //     </div>
// //   );
// // };

// // // ==================== DATE FILTER ====================
// // const DateFilter = ({ value, onChange }) => {
// //   const [open, setOpen] = useState(false);
// //   const options = [
// //     { label: "Last 7 days", value: "7d" },
// //     { label: "Last 30 days", value: "30d" },
// //     { label: "Last 3 months", value: "3m" },
// //     { label: "Last 6 months", value: "6m" },
// //     { label: "This year", value: "1y" },
// //   ];

// //   return (
// //     <div className="relative">
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:border-slate-300 transition-all"
// //       >
// //         <Calendar size={16} className="text-slate-400" />
// //         <span className="font-medium">
// //           {options.find((o) => o.value === value)?.label}
// //         </span>
// //         <ChevronDown
// //           size={14}
// //           className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
// //         />
// //       </button>
// //       {open && (
// //         <>
// //           <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
// //           <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 z-40 py-1.5 overflow-hidden">
// //             {options.map((opt) => (
// //               <button
// //                 key={opt.value}
// //                 onClick={() => {
// //                   onChange(opt.value);
// //                   setOpen(false);
// //                 }}
// //                 className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt.value ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
// //               >
// //                 {opt.label}
// //               </button>
// //             ))}
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // // ==================== EXPORT MODAL ====================
// // const ExportModal = ({ isOpen, onClose }) => {
// //   const [format, setFormat] = useState("pdf");
// //   const [loading, setLoading] = useState(false);

// //   if (!isOpen) return null;

// //   const handleExport = async () => {
// //     setLoading(true);
// //     setTimeout(() => {
// //       setLoading(false);
// //       onClose();
// //       alert(`Report exported as ${format.toUpperCase()}!`);
// //     }, 1500);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center">
// //       <div
// //         className="absolute inset-0 bg-black/30 backdrop-blur-sm"
// //         onClick={onClose}
// //       />
// //       <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
// //         <h3 className="text-lg font-bold text-[#0F172A] mb-1">Export Report</h3>
// //         <p className="text-sm text-slate-500 mb-5">
// //           Choose your preferred export format
// //         </p>
// //         <div className="grid grid-cols-3 gap-3 mb-6">
// //           {["pdf", "csv", "excel"].map((f) => (
// //             <button
// //               key={f}
// //               onClick={() => setFormat(f)}
// //               className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${format === f ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-100 hover:border-slate-200 text-slate-600"}`}
// //             >
// //               <FileText size={24} />
// //               <span className="text-xs font-semibold uppercase">{f}</span>
// //             </button>
// //           ))}
// //         </div>
// //         <div className="flex gap-3">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             onClick={handleExport}
// //             disabled={loading}
// //             className="flex-1 py-2.5 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
// //           >
// //             {loading ? (
// //               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
// //             ) : (
// //               <>
// //                 <Download size={16} /> Export
// //               </>
// //             )}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ==================== MAIN COMPONENT ====================
// // export default function AdminOverview() {
// //   const sectionRef = useRef(null);
// //   const [dateRange, setDateRange] = useState("30d");
// //   const [exportOpen, setExportOpen] = useState(false);
// //   const [mounted, setMounted] = useState(false);

// //   // Use existing hooks from your project
// //   const { data: orders, isLoading: ordersLoading } = useAllOrders();
// //   const { data: plans, isLoading: plansLoading } = usePlansAdmin();
// //   const { data: categories, isLoading: categoriesLoading } = useCategories();

// //   const isLoading = ordersLoading || plansLoading || categoriesLoading;

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     if (!mounted || !sectionRef.current || isLoading) return;
// //     const ctx = gsap.context(() => {
// //       gsap.fromTo(
// //         ".admin-header",
// //         { y: -20, opacity: 0 },
// //         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
// //       );
// //       gsap.fromTo(
// //         ".charts-row",
// //         { y: 40, opacity: 0 },
// //         { y: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: "power3.out" },
// //       );
// //       gsap.fromTo(
// //         ".bottom-row",
// //         { y: 40, opacity: 0 },
// //         { y: 0, opacity: 1, duration: 0.7, delay: 0.6, ease: "power3.out" },
// //       );
// //     }, sectionRef);
// //     return () => ctx.revert();
// //   }, [mounted, isLoading]);

// //   // Compute stats from real data
// //   const totalOrders = orders?.length || 0;
// //   const totalRevenue =
// //     orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
// //   const pendingOrders =
// //     orders?.filter((o) => o.status === "pending").length || 0;
// //   const completedOrders =
// //     orders?.filter((o) => o.status === "completed" || o.status === "paid")
// //       .length || 0;
// //   const totalPlans = plans?.length || 0;

// //   // Category distribution from real plans + categories
// //   const categoryData = useMemo(() => {
// //     if (!plans?.length || !categories?.length) {
// //       return [
// //         { name: "Villa", value: 35, color: "#14B8A6" },
// //         { name: "Apartment", value: 28, color: "#0EA5E9" },
// //         { name: "Duplex", value: 20, color: "#8B5CF6" },
// //         { name: "Studio", value: 12, color: "#F59E0B" },
// //         { name: "Other", value: 5, color: "#EF4444" },
// //       ];
// //     }

// //     const counts = {};
// //     plans.forEach((plan) => {
// //       const cat = categories.find((c) => c.id === plan.category_id);
// //       const name = cat?.name || "Other";
// //       counts[name] = (counts[name] || 0) + 1;
// //     });

// //     const colors = [
// //       "#14B8A6",
// //       "#0EA5E9",
// //       "#8B5CF6",
// //       "#F59E0B",
// //       "#EF4444",
// //       "#10B981",
// //       "#EC4899",
// //     ];
// //     const total = Object.values(counts).reduce((a, b) => a + b, 0);

// //     return Object.entries(counts).map(([name, value], i) => ({
// //       name,
// //       value: Math.round((value / total) * 100) || 1,
// //       color: colors[i % colors.length],
// //     }));
// //   }, [plans, categories]);

// //   // Revenue by month from real orders
// //   const revenueData = useMemo(() => {
// //     if (!orders?.length) {
// //       return [
// //         { month: "Jan", revenue: 45000, orders: 12 },
// //         { month: "Feb", revenue: 52000, orders: 18 },
// //         { month: "Mar", revenue: 38000, orders: 14 },
// //         { month: "Apr", revenue: 61000, orders: 22 },
// //         { month: "May", revenue: 55000, orders: 19 },
// //         { month: "Jun", revenue: 72000, orders: 28 },
// //         { month: "Jul", revenue: 68000, orders: 25 },
// //       ];
// //     }

// //     const monthly = {};
// //     const monthNames = [
// //       "Jan",
// //       "Feb",
// //       "Mar",
// //       "Apr",
// //       "May",
// //       "Jun",
// //       "Jul",
// //       "Aug",
// //       "Sep",
// //       "Oct",
// //       "Nov",
// //       "Dec",
// //     ];
// //     orders.forEach((order) => {
// //       const date = new Date(order.created_at || Date.now());
// //       const key = monthNames[date.getMonth()];
// //       if (!monthly[key]) monthly[key] = { revenue: 0, orders: 0 };
// //       monthly[key].revenue += order.total_amount || 0;
// //       monthly[key].orders += 1;
// //     });

// //     return monthNames
// //       .map((m) => ({
// //         month: m,
// //         revenue: monthly[m]?.revenue || 0,
// //         orders: monthly[m]?.orders || 0,
// //       }))
// //       .filter((d) => d.revenue > 0 || d.orders > 0);
// //   }, [orders]);

// //   const stats = [
// //     {
// //       label: "Total Orders",
// //       value: totalOrders,
// //       icon: ShoppingCart,
// //       color: "bg-sky-50 text-sky-600",
// //       sparkColor: "#0EA5E9",
// //     },
// //     {
// //       label: "Total Revenue",
// //       value: `EGP ${totalRevenue.toLocaleString()}`,
// //       icon: DollarSign,
// //       color: "bg-emerald-50 text-emerald-600",
// //       sparkColor: "#10B981",
// //     },
// //     {
// //       label: "Pending",
// //       value: pendingOrders,
// //       icon: Clock,
// //       color: "bg-amber-50 text-amber-600",
// //       sparkColor: "#F59E0B",
// //     },
// //     {
// //       label: "Completed",
// //       value: completedOrders,
// //       icon: CheckCircle,
// //       color: "bg-teal-50 text-teal-600",
// //       sparkColor: "#14B8A6",
// //     },
// //     {
// //       label: "Total Plans",
// //       value: totalPlans,
// //       icon: Package,
// //       color: "bg-violet-50 text-violet-600",
// //       sparkColor: "#8B5CF6",
// //     },
// //   ];

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
// //         <div className="flex flex-col items-center gap-3">
// //           <div className="w-10 h-10 border-3 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
// //           <p className="text-sm text-slate-500 font-medium">
// //             Loading dashboard...
// //           </p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div ref={sectionRef} className="min-h-screen bg-[#F8FAFC] py-8">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6">
// //         {/* Header */}
// //         <div className="admin-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
// //           <div>
// //             <div className="flex items-center gap-2 mb-1.5">
// //               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
// //               <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
// //                 Live Dashboard
// //               </span>
// //             </div>
// //             <h1
// //               className="text-2xl sm:text-3xl font-bold text-[#0F172A]"
// //               style={{ fontFamily: "Montserrat, sans-serif" }}
// //             >
// //               Overview
// //             </h1>
// //             <p
// //               className="text-sm text-slate-500 mt-1"
// //               style={{ fontFamily: "Manrope, sans-serif" }}
// //             >
// //               Welcome back! Here&apos;s what&apos;s happening with your platform
// //               today.
// //             </p>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <DateFilter value={dateRange} onChange={setDateRange} />
// //             <button
// //               onClick={() => setExportOpen(true)}
// //               className="flex items-center gap-2 bg-[#0F172A] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#1E293B] transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
// //             >
// //               <Zap size={16} />
// //               Export Report
// //             </button>
// //           </div>
// //         </div>

// //         {/* Stats Grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
// //           {stats.map((stat, i) => (
// //             <StatCard key={i} stat={stat} index={i} />
// //           ))}
// //         </div>

// //         {/* Charts Row */}
// //         <div className="charts-row grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
// //           <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
// //             <div className="flex items-center justify-between mb-2">
// //               <div>
// //                 <h3
// //                   className="text-lg font-bold text-[#0F172A]"
// //                   style={{ fontFamily: "Montserrat, sans-serif" }}
// //                 >
// //                   Revenue Overview
// //                 </h3>
// //                 <p className="text-xs text-slate-500 mt-0.5">
// //                   Monthly revenue & order count
// //                 </p>
// //               </div>
// //               <div className="flex items-center gap-4">
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-3 h-3 rounded-full bg-[#14B8A6]" />
// //                   <span className="text-xs text-slate-500 font-medium">
// //                     Revenue
// //                   </span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-3 h-3 rounded-full bg-[#0F172A]/20" />
// //                   <span className="text-xs text-slate-500 font-medium">
// //                     Orders
// //                   </span>
// //                 </div>
// //               </div>
// //             </div>
// //             <RevenueChart data={revenueData} />
// //           </div>

// //           <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
// //             <div className="mb-6">
// //               <h3
// //                 className="text-lg font-bold text-[#0F172A]"
// //                 style={{ fontFamily: "Montserrat, sans-serif" }}
// //               >
// //                 Plan Categories
// //               </h3>
// //               <p className="text-xs text-slate-500 mt-0.5">
// //                 Distribution by type
// //               </p>
// //             </div>
// //             <DonutChart data={categoryData} />
// //             <div className="mt-6 space-y-2.5">
// //               {categoryData.map((cat, i) => (
// //                 <div
// //                   key={i}
// //                   className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
// //                 >
// //                   <div className="flex items-center gap-2.5">
// //                     <div
// //                       className="w-3 h-3 rounded-full"
// //                       style={{ backgroundColor: cat.color }}
// //                     />
// //                     <span className="text-sm text-slate-600 font-medium">
// //                       {cat.name}
// //                     </span>
// //                   </div>
// //                   <span className="text-sm font-bold text-[#0F172A]">
// //                     {cat.value}%
// //                   </span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Row */}
// //         <div className="bottom-row grid grid-cols-1 lg:grid-cols-3 gap-6">
// //           {/* Recent Orders */}
// //           <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
// //             <div className="mb-6">
// //               <h3
// //                 className="text-lg font-bold text-[#0F172A]"
// //                 style={{ fontFamily: "Montserrat, sans-serif" }}
// //               >
// //                 Recent Orders
// //               </h3>
// //               <p className="text-xs text-slate-500 mt-0.5">
// //                 Latest transactions from your customers
// //               </p>
// //             </div>
// //             <div className="space-y-2">
// //               {orders?.slice(0, 5).map((order) => (
// //                 <div
// //                   key={order.id}
// //                   className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
// //                 >
// //                   <div className="flex items-center gap-4">
// //                     <div
// //                       className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
// //                         order.status === "completed" || order.status === "paid"
// //                           ? "bg-emerald-50 text-emerald-600"
// //                           : order.status === "pending"
// //                             ? "bg-amber-50 text-amber-600"
// //                             : "bg-slate-50 text-slate-600"
// //                       }`}
// //                     >
// //                       <Package size={18} />
// //                     </div>
// //                     <div>
// //                       <p className="font-bold text-[#0F172A] text-sm">
// //                         Order #{order.id?.toString().slice(-4)}
// //                       </p>
// //                       <p className="text-xs text-slate-500 mt-0.5">
// //                         {order.full_name || "Customer"}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className="font-bold text-[#0F172A] text-sm">
// //                       EGP {order.total_amount?.toLocaleString()}
// //                     </p>
// //                     <span
// //                       className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold mt-1.5 uppercase tracking-wide ${
// //                         order.status === "completed" || order.status === "paid"
// //                           ? "bg-emerald-50 text-emerald-600"
// //                           : order.status === "pending"
// //                             ? "bg-amber-50 text-amber-600"
// //                             : "bg-slate-50 text-slate-500"
// //                       }`}
// //                     >
// //                       {order.status}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))}
// //               {(!orders || orders.length === 0) && (
// //                 <div className="text-center py-8 text-slate-400 text-sm">
// //                   No orders yet
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Activity Feed */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
// //             <div className="mb-6">
// //               <h3
// //                 className="text-lg font-bold text-[#0F172A]"
// //                 style={{ fontFamily: "Montserrat, sans-serif" }}
// //               >
// //                 Activity Feed
// //               </h3>
// //               <p className="text-xs text-slate-500 mt-0.5">
// //                 Real-time platform updates
// //               </p>
// //             </div>
// //             <div className="space-y-0 relative">
// //               <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
// //               {MOCK_ACTIVITIES.map((activity) => (
// //                 <div
// //                   key={activity.id}
// //                   className="flex items-start gap-4 relative pb-5 last:pb-0 group cursor-pointer"
// //                 >
// //                   <div
// //                     className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-110 ${activity.color}`}
// //                   >
// //                     <activity.icon size={16} />
// //                   </div>
// //                   <div className="flex-1 min-w-0 pt-0.5">
// //                     <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors">
// //                       {activity.action}
// //                     </p>
// //                     <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
// //                       {activity.detail}
// //                     </p>
// //                     <p className="text-[10px] text-slate-400 mt-1 font-medium">
// //                       {activity.time}
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
// //     </div>
// //   );
// // }
// "use client";

// import { useRef, useEffect, useState, useMemo } from "react";
// import { useAllOrders } from "@/features/orders/hooks/useOrders";
// import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// import { useCategories } from "@/features/plans/hooks/useCategories";
// import {
//   Package,
//   ShoppingCart,
//   DollarSign,
//   Clock,
//   CheckCircle,
//   ArrowUpRight,
//   ArrowDownRight,
//   Calendar,
//   ChevronDown,
//   Zap,
//   FileText,
//   CreditCard,
//   Download,
//   Eye,
//   Users,
//   Star,
// } from "lucide-react";
// import gsap from "gsap";

// // ==================== MOCK ACTIVITIES (for variety) ====================
// const MOCK_ACTIVITIES = [
//   {
//     id: "mock-1",
//     action: "Plan updated",
//     detail: "Modern Duplex v2.1 published",
//     time: "15 min ago",
//     type: "plan",
//     icon: FileText,
//     color: "bg-violet-50 text-violet-600",
//   },
//   {
//     id: "mock-2",
//     action: "New user registered",
//     detail: "Ahmed Hassan — Cairo, Egypt",
//     time: "2 hours ago",
//     type: "user",
//     icon: Users,
//     color: "bg-amber-50 text-amber-600",
//   },
//   {
//     id: "mock-3",
//     action: "Plan trending",
//     detail: "Luxury Villa — 234 views today",
//     time: "3 hours ago",
//     type: "view",
//     icon: Eye,
//     color: "bg-rose-50 text-rose-600",
//   },
// ];

// // ==================== SVG CHARTS ====================
// const MiniSparkline = ({ data, color = "#14B8A6", height = 32 }) => {
//   const max = Math.max(...data);
//   const min = Math.min(...data);
//   const range = max - min || 1;
//   const points = data
//     .map((v, i) => {
//       const x = (i / (data.length - 1)) * 100;
//       const y = 90 - ((v - min) / range) * 80;
//       return `${x},${y}`;
//     })
//     .join(" ");

//   return (
//     <svg
//       viewBox="0 0 100 100"
//       preserveAspectRatio="none"
//       className="w-full"
//       style={{ height }}
//     >
//       <defs>
//         <linearGradient
//           id={`spark-${color.replace("#", "")}`}
//           x1="0"
//           y1="0"
//           x2="0"
//           y2="1"
//         >
//           <stop offset="0%" stopColor={color} stopOpacity="0.25" />
//           <stop offset="100%" stopColor={color} stopOpacity="0" />
//         </linearGradient>
//       </defs>
//       <polygon
//         points={`0,100 ${points} 100,100`}
//         fill={`url(#spark-${color.replace("#", "")})`}
//       />
//       <polyline
//         points={points}
//         fill="none"
//         stroke={color}
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle
//         cx={points.split(" ").pop()?.split(",")[0]}
//         cy={points.split(" ").pop()?.split(",")[1]}
//         r="2"
//         fill={color}
//       />
//     </svg>
//   );
// };

// const RevenueChart = ({ data }) => {
//   const max = Math.max(...data.map((d) => d.revenue));
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       gsap.fromTo(
//         chartRef.current.querySelectorAll(".bar-fill"),
//         { scaleY: 0 },
//         {
//           scaleY: 1,
//           duration: 1.2,
//           stagger: 0.1,
//           ease: "power3.out",
//           delay: 0.5,
//         },
//       );
//     }
//   }, [data]);

//   return (
//     <div
//       ref={chartRef}
//       className="flex items-end justify-between gap-3 h-52 px-2 pt-4"
//     >
//       {data.map((item, i) => {
//         const height = max > 0 ? (item.revenue / max) * 100 : 0;
//         return (
//           <div
//             key={i}
//             className="flex-1 flex flex-col items-center gap-3 group cursor-pointer relative"
//           >
//             <div className="relative w-full flex justify-center h-40 items-end">
//               <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0F172A] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl transform translate-y-1 group-hover:translate-y-0">
//                 EGP {item.revenue.toLocaleString()}
//                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#0F172A] rotate-45" />
//               </div>
//               <div
//                 className="bar-fill w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#0F172A] via-[#14B8A6] to-[#2DD4BF] origin-bottom transition-all duration-300 group-hover:from-[#0F172A] group-hover:via-[#5EEAD4] group-hover:to-[#99F6E4] group-hover:shadow-lg group-hover:shadow-teal-500/20"
//                 style={{ height: `${height}%` }}
//               />
//               <div
//                 className="absolute w-2 h-2 rounded-full bg-[#0F172A]/30 border-2 border-white"
//                 style={{ bottom: `${Math.min((item.orders / 30) * 100, 90)}%` }}
//               />
//             </div>
//             <span className="text-[11px] text-slate-400 font-medium">
//               {item.month}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// const DonutChart = ({ data }) => {
//   const total = data.reduce((sum, d) => sum + d.value, 0);
//   const chartRef = useRef(null);
//   const radius = 40;
//   const circumference = 2 * Math.PI * radius;
//   let currentOffset = 0;

//   useEffect(() => {
//     if (chartRef.current) {
//       gsap.fromTo(
//         chartRef.current.querySelectorAll(".donut-segment"),
//         { strokeDashoffset: circumference },
//         {
//           strokeDashoffset: 0,
//           duration: 1.5,
//           stagger: 0.15,
//           ease: "power3.out",
//           delay: 0.3,
//         },
//       );
//     }
//   }, [data]);

//   return (
//     <div className="relative w-44 h-44 mx-auto">
//       <svg
//         viewBox="0 0 100 100"
//         className="w-full h-full -rotate-90"
//         ref={chartRef}
//       >
//         <circle
//           cx="50"
//           cy="50"
//           r={radius}
//           fill="none"
//           stroke="#F1F5F9"
//           strokeWidth="12"
//         />
//         {data.map((item, i) => {
//           const segmentLength = (item.value / total) * circumference;
//           const offset = currentOffset;
//           currentOffset += segmentLength;
//           return (
//             <circle
//               key={i}
//               cx="50"
//               cy="50"
//               r={radius}
//               fill="none"
//               stroke={item.color}
//               strokeWidth="12"
//               strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
//               strokeDashoffset={-offset}
//               strokeLinecap="round"
//               className="donut-segment transition-all duration-300 hover:stroke-width-[14] cursor-pointer"
//             />
//           );
//         })}
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="text-2xl font-bold text-[#0F172A]">{total}</span>
//         <span className="text-[10px] text-slate-400 font-medium">
//           Total Plans
//         </span>
//       </div>
//     </div>
//   );
// };

// // ==================== STAT CARD ====================
// const StatCard = ({ stat, index }) => {
//   const cardRef = useRef(null);
//   const [trend] = useState(() => (Math.random() > 0.3 ? "up" : "down"));
//   const [trendValue] = useState(() => Math.floor(Math.random() * 20) + 3);

//   useEffect(() => {
//     if (cardRef.current) {
//       gsap.fromTo(
//         cardRef.current,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.6,
//           delay: index * 0.08,
//           ease: "power3.out",
//         },
//       );
//     }
//   }, [index]);

//   const sparkData = useMemo(
//     () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 60) + 20),
//     [],
//   );

//   return (
//     <div
//       ref={cardRef}
//       className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
//     >
//       <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-slate-50/80 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//       <div className="flex items-start justify-between mb-3">
//         <div
//           className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
//         >
//           <stat.icon size={20} strokeWidth={2} />
//         </div>
//         <div
//           className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
//         >
//           {trend === "up" ? (
//             <ArrowUpRight size={13} />
//           ) : (
//             <ArrowDownRight size={13} />
//           )}
//           {trendValue}%
//         </div>
//       </div>
//       <p className="text-2xl font-bold text-[#0F172A] mb-0.5 tracking-tight">
//         {stat.value}
//       </p>
//       <p className="text-xs text-slate-500 font-medium mb-3">{stat.label}</p>
//       <MiniSparkline data={sparkData} color={stat.sparkColor} />
//     </div>
//   );
// };

// // ==================== DATE FILTER ====================
// const DateFilter = ({ value, onChange }) => {
//   const [open, setOpen] = useState(false);
//   const options = [
//     { label: "Last 7 days", value: "7d" },
//     { label: "Last 30 days", value: "30d" },
//     { label: "Last 3 months", value: "3m" },
//     { label: "Last 6 months", value: "6m" },
//     { label: "This year", value: "1y" },
//   ];

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 bg-white rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 hover:border-slate-300 transition-all"
//       >
//         <Calendar size={16} className="text-slate-400" />
//         <span className="font-medium">
//           {options.find((o) => o.value === value)?.label}
//         </span>
//         <ChevronDown
//           size={14}
//           className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
//         />
//       </button>
//       {open && (
//         <>
//           <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
//           <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/50 z-40 py-1.5 overflow-hidden">
//             {options.map((opt) => (
//               <button
//                 key={opt.value}
//                 onClick={() => {
//                   onChange(opt.value);
//                   setOpen(false);
//                 }}
//                 className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${value === opt.value ? "bg-teal-50 text-teal-700 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
//               >
//                 {opt.label}
//               </button>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== EXPORT MODAL ====================
// const ExportModal = ({ isOpen, onClose }) => {
//   const [format, setFormat] = useState("pdf");
//   const [loading, setLoading] = useState(false);

//   if (!isOpen) return null;

//   const handleExport = async () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       onClose();
//       alert(`Report exported as ${format.toUpperCase()}!`);
//     }, 1500);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div
//         className="absolute inset-0 bg-black/30 backdrop-blur-sm"
//         onClick={onClose}
//       />
//       <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
//         <h3 className="text-lg font-bold text-[#0F172A] mb-1">Export Report</h3>
//         <p className="text-sm text-slate-500 mb-5">
//           Choose your preferred export format
//         </p>
//         <div className="grid grid-cols-3 gap-3 mb-6">
//           {["pdf", "csv", "excel"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFormat(f)}
//               className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${format === f ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-100 hover:border-slate-200 text-slate-600"}`}
//             >
//               <FileText size={24} />
//               <span className="text-xs font-semibold uppercase">{f}</span>
//             </button>
//           ))}
//         </div>
//         <div className="flex gap-3">
//           <button
//             onClick={onClose}
//             className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleExport}
//             disabled={loading}
//             className="flex-1 py-2.5 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
//           >
//             {loading ? (
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <>
//                 <Download size={16} /> Export
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== MAIN COMPONENT ====================
// export default function AdminOverview() {
//   const sectionRef = useRef(null);
//   const [dateRange, setDateRange] = useState("30d");
//   const [exportOpen, setExportOpen] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   // Use existing hooks from your project
//   const { data: orders, isLoading: ordersLoading } = useAllOrders();
//   const { data: plans, isLoading: plansLoading } = usePlansAdmin();
//   const { data: categories, isLoading: categoriesLoading } = useCategories();

//   const isLoading = ordersLoading || plansLoading || categoriesLoading;

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted || !sectionRef.current || isLoading) return;
//     const ctx = gsap.context(() => {
//       gsap.fromTo(
//         ".admin-header",
//         { y: -20, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
//       );
//       gsap.fromTo(
//         ".charts-row",
//         { y: 40, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: "power3.out" },
//       );
//       gsap.fromTo(
//         ".bottom-row",
//         { y: 40, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.7, delay: 0.6, ease: "power3.out" },
//       );
//     }, sectionRef);
//     return () => ctx.revert();
//   }, [mounted, isLoading]);

//   // Compute stats from real data
//   const totalOrders = orders?.length || 0;
//   const totalRevenue =
//     orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
//   const pendingOrders =
//     orders?.filter((o) => o.status === "pending").length || 0;
//   const completedOrders =
//     orders?.filter((o) => o.status === "completed" || o.status === "paid")
//       .length || 0;
//   const totalPlans = plans?.length || 0;

//   // Category distribution from real plans + categories
//   const categoryData = useMemo(() => {
//     if (!plans?.length || !categories?.length) {
//       return [
//         { name: "Villa", value: 35, color: "#14B8A6" },
//         { name: "Apartment", value: 28, color: "#0EA5E9" },
//         { name: "Duplex", value: 20, color: "#8B5CF6" },
//         { name: "Studio", value: 12, color: "#F59E0B" },
//         { name: "Other", value: 5, color: "#EF4444" },
//       ];
//     }

//     const counts = {};
//     plans.forEach((plan) => {
//       const cat = categories.find((c) => c.id === plan.category_id);
//       const name = cat?.name || "Other";
//       counts[name] = (counts[name] || 0) + 1;
//     });

//     const colors = [
//       "#14B8A6",
//       "#0EA5E9",
//       "#8B5CF6",
//       "#F59E0B",
//       "#EF4444",
//       "#10B981",
//       "#EC4899",
//     ];
//     const total = Object.values(counts).reduce((a, b) => a + b, 0);

//     return Object.entries(counts).map(([name, value], i) => ({
//       name,
//       value: Math.round((value / total) * 100) || 1,
//       color: colors[i % colors.length],
//     }));
//   }, [plans, categories]);

//   // Revenue by month from real orders
//   const revenueData = useMemo(() => {
//     if (!orders?.length) {
//       return [
//         { month: "Jan", revenue: 45000, orders: 12 },
//         { month: "Feb", revenue: 52000, orders: 18 },
//         { month: "Mar", revenue: 38000, orders: 14 },
//         { month: "Apr", revenue: 61000, orders: 22 },
//         { month: "May", revenue: 55000, orders: 19 },
//         { month: "Jun", revenue: 72000, orders: 28 },
//         { month: "Jul", revenue: 68000, orders: 25 },
//       ];
//     }

//     const monthly = {};
//     const monthNames = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];
//     orders.forEach((order) => {
//       const date = new Date(order.created_at || Date.now());
//       const key = monthNames[date.getMonth()];
//       if (!monthly[key]) monthly[key] = { revenue: 0, orders: 0 };
//       monthly[key].revenue += order.total_amount || 0;
//       monthly[key].orders += 1;
//     });

//     return monthNames
//       .map((m) => ({
//         month: m,
//         revenue: monthly[m]?.revenue || 0,
//         orders: monthly[m]?.orders || 0,
//       }))
//       .filter((d) => d.revenue > 0 || d.orders > 0);
//   }, [orders]);

//   // Hybrid Activity Feed: 3 real orders + 3 mock
//   const activities = useMemo(() => {
//     const realActivities =
//       orders?.slice(0, 3).map((order) => ({
//         id: `order-${order.id}`,
//         action:
//           order.status === "completed" || order.status === "paid"
//             ? "Payment received"
//             : "New order placed",
//         detail: `Order #${order.id?.toString().slice(-4)} — EGP ${order.total_amount?.toLocaleString()}`,
//         time: order.created_at
//           ? (() => {
//               const diff = Date.now() - new Date(order.created_at).getTime();
//               const mins = Math.floor(diff / 60000);
//               const hours = Math.floor(diff / 3600000);
//               if (mins < 1) return "Just now";
//               if (mins < 60) return `${mins} min ago`;
//               if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
//               return new Date(order.created_at).toLocaleDateString("en-GB", {
//                 day: "numeric",
//                 month: "short",
//               });
//             })()
//           : "Recently",
//         type:
//           order.status === "completed" || order.status === "paid"
//             ? "payment"
//             : "order",
//         icon:
//           order.status === "completed" || order.status === "paid"
//             ? CreditCard
//             : ShoppingCart,
//         color:
//           order.status === "completed" || order.status === "paid"
//             ? "bg-emerald-50 text-emerald-600"
//             : "bg-sky-50 text-sky-600",
//       })) || [];

//     return [...realActivities, ...MOCK_ACTIVITIES];
//   }, [orders]);

//   const stats = [
//     {
//       label: "Total Orders",
//       value: totalOrders,
//       icon: ShoppingCart,
//       color: "bg-sky-50 text-sky-600",
//       sparkColor: "#0EA5E9",
//     },
//     {
//       label: "Total Revenue",
//       value: `EGP ${totalRevenue.toLocaleString()}`,
//       icon: DollarSign,
//       color: "bg-emerald-50 text-emerald-600",
//       sparkColor: "#10B981",
//     },
//     {
//       label: "Pending",
//       value: pendingOrders,
//       icon: Clock,
//       color: "bg-amber-50 text-amber-600",
//       sparkColor: "#F59E0B",
//     },
//     {
//       label: "Completed",
//       value: completedOrders,
//       icon: CheckCircle,
//       color: "bg-teal-50 text-teal-600",
//       sparkColor: "#14B8A6",
//     },
//     {
//       label: "Total Plans",
//       value: totalPlans,
//       icon: Package,
//       color: "bg-violet-50 text-violet-600",
//       sparkColor: "#8B5CF6",
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-10 h-10 border-3 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
//           <p className="text-sm text-slate-500 font-medium">
//             Loading dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div ref={sectionRef} className="min-h-screen bg-[#F8FAFC] py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         {/* Header */}
//         <div className="admin-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//           <div>
//             <div className="flex items-center gap-2 mb-1.5">
//               <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//               <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
//                 Live Dashboard
//               </span>
//             </div>
//             <h1
//               className="text-2xl sm:text-3xl font-bold text-[#0F172A]"
//               style={{ fontFamily: "Montserrat, sans-serif" }}
//             >
//               Overview
//             </h1>
//             <p
//               className="text-sm text-slate-500 mt-1"
//               style={{ fontFamily: "Manrope, sans-serif" }}
//             >
//               Welcome back! Here&apos;s what&apos;s happening with your platform
//               today.
//             </p>
//           </div>
//           <div className="flex items-center gap-3">
//             <DateFilter value={dateRange} onChange={setDateRange} />
//             <button
//               onClick={() => setExportOpen(true)}
//               className="flex items-center gap-2 bg-[#0F172A] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#1E293B] transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95"
//             >
//               <Zap size={16} />
//               Export Report
//             </button>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//           {stats.map((stat, i) => (
//             <StatCard key={i} stat={stat} index={i} />
//           ))}
//         </div>

//         {/* Charts Row */}
//         <div className="charts-row grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
//             <div className="flex items-center justify-between mb-2">
//               <div>
//                 <h3
//                   className="text-lg font-bold text-[#0F172A]"
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   Revenue Overview
//                 </h3>
//                 <p className="text-xs text-slate-500 mt-0.5">
//                   Monthly revenue & order count
//                 </p>
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-[#14B8A6]" />
//                   <span className="text-xs text-slate-500 font-medium">
//                     Revenue
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 rounded-full bg-[#0F172A]/20" />
//                   <span className="text-xs text-slate-500 font-medium">
//                     Orders
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <RevenueChart data={revenueData} />
//           </div>

//           <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
//             <div className="mb-6">
//               <h3
//                 className="text-lg font-bold text-[#0F172A]"
//                 style={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 Plan Categories
//               </h3>
//               <p className="text-xs text-slate-500 mt-0.5">
//                 Distribution by type
//               </p>
//             </div>
//             <DonutChart data={categoryData} />
//             <div className="mt-6 space-y-2.5">
//               {categoryData.map((cat, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
//                 >
//                   <div className="flex items-center gap-2.5">
//                     <div
//                       className="w-3 h-3 rounded-full"
//                       style={{ backgroundColor: cat.color }}
//                     />
//                     <span className="text-sm text-slate-600 font-medium">
//                       {cat.name}
//                     </span>
//                   </div>
//                   <span className="text-sm font-bold text-[#0F172A]">
//                     {cat.value}%
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row */}
//         <div className="bottom-row grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Recent Orders */}
//           <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
//             <div className="mb-6">
//               <h3
//                 className="text-lg font-bold text-[#0F172A]"
//                 style={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 Recent Orders
//               </h3>
//               <p className="text-xs text-slate-500 mt-0.5">
//                 Latest transactions from your customers
//               </p>
//             </div>
//             <div className="space-y-2">
//               {orders?.slice(0, 5).map((order) => (
//                 <div
//                   key={order.id}
//                   className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div
//                       className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
//                         order.status === "completed" || order.status === "paid"
//                           ? "bg-emerald-50 text-emerald-600"
//                           : order.status === "pending"
//                             ? "bg-amber-50 text-amber-600"
//                             : "bg-slate-50 text-slate-600"
//                       }`}
//                     >
//                       <Package size={18} />
//                     </div>
//                     <div>
//                       <p className="font-bold text-[#0F172A] text-sm">
//                         Order #{order.id?.toString().slice(-4)}
//                       </p>
//                       <p className="text-xs text-slate-500 mt-0.5">
//                         {order.full_name || "Customer"}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-bold text-[#0F172A] text-sm">
//                       EGP {order.total_amount?.toLocaleString()}
//                     </p>
//                     <span
//                       className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold mt-1.5 uppercase tracking-wide ${
//                         order.status === "completed" || order.status === "paid"
//                           ? "bg-emerald-50 text-emerald-600"
//                           : order.status === "pending"
//                             ? "bg-amber-50 text-amber-600"
//                             : "bg-slate-50 text-slate-500"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//               {(!orders || orders.length === 0) && (
//                 <div className="text-center py-8 text-slate-400 text-sm">
//                   No orders yet
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Activity Feed (Hybrid: 3 real + 3 mock) */}
//           <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
//             <div className="mb-6">
//               <h3
//                 className="text-lg font-bold text-[#0F172A]"
//                 style={{ fontFamily: "Montserrat, sans-serif" }}
//               >
//                 Activity Feed
//               </h3>
//               <p className="text-xs text-slate-500 mt-0.5">
//                 Real-time platform updates
//               </p>
//             </div>
//             <div className="space-y-0 relative">
//               <div className="absolute left-[21px] top-3 bottom-3 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent" />
//               {activities.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex items-start gap-4 relative pb-5 last:pb-0 group cursor-pointer"
//                 >
//                   <div
//                     className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 z-10 border-2 border-white shadow-sm transition-transform group-hover:scale-110 ${activity.color}`}
//                   >
//                     <activity.icon size={16} />
//                   </div>
//                   <div className="flex-1 min-w-0 pt-0.5">
//                     <p className="text-sm font-bold text-[#0F172A] group-hover:text-[#14B8A6] transition-colors">
//                       {activity.action}
//                     </p>
//                     <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
//                       {activity.detail}
//                     </p>
//                     <p className="text-[10px] text-slate-400 mt-1 font-medium">
//                       {activity.time}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
//     </div>
//   );
// }
"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useAllOrders } from "@/features/orders/hooks/useOrders";
import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
import { useCategories } from "@/features/plans/hooks/useCategories";
import {
  Package,
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  FileText,
  Download,
} from "lucide-react";
import gsap from "gsap";

// ==================== SVG CHARTS ====================
const MiniSparkline = ({ data, color = "#14B8A6", height = 32 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 90 - ((v - min) / range) * 80;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
    >
      <defs>
        <linearGradient
          id={`spark-${color.replace("#", "")}`}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,100 ${points} 100,100`}
        fill={`url(#spark-${color.replace("#", "")})`}
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={points.split(" ").pop()?.split(",")[0]}
        cy={points.split(" ").pop()?.split(",")[1]}
        r="2"
        fill={color}
      />
    </svg>
  );
};

const RevenueChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.revenue));
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current.querySelectorAll(".bar-fill"),
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.5,
        },
      );
    }
  }, [data]);

  return (
    <div
      ref={chartRef}
      className="flex items-end justify-between gap-3 h-52 px-2 pt-4"
    >
      {data.map((item, i) => {
        const height = max > 0 ? (item.revenue / max) * 100 : 0;
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-3 group cursor-pointer relative"
          >
            <div className="relative w-full flex justify-center h-40 items-end">
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#0F172A] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl transform translate-y-1 group-hover:translate-y-0 pointer-events-none">
                EGP {item.revenue.toLocaleString()}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#0F172A] rotate-45" />
              </div>
              <div
                className="bar-fill w-full max-w-[36px] rounded-t-lg bg-gradient-to-t from-[#0F172A] via-[#14B8A6] to-[#2DD4BF] origin-bottom transition-all duration-300 group-hover:from-[#0F172A] group-hover:via-[#5EEAD4] group-hover:to-[#99F6E4] group-hover:shadow-lg group-hover:shadow-teal-500/20"
                style={{ height: `${height}%` }}
              />
              <div
                className="absolute w-2 h-2 rounded-full bg-[#0F172A]/30 border-2 border-white"
                style={{ bottom: `${Math.min((item.orders / 30) * 100, 90)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {item.month}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const DonutChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const chartRef = useRef(null);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  useEffect(() => {
    if (chartRef.current) {
      gsap.fromTo(
        chartRef.current.querySelectorAll(".donut-segment"),
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        },
      );
    }
  }, [data]);

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full -rotate-90"
        ref={chartRef}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="12"
        />
        {data.map((item, i) => {
          const segmentLength = (item.value / total) * circumference;
          const offset = currentOffset;
          currentOffset += segmentLength;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth="12"
              strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
              strokeDashoffset={-offset}
              strokeLinecap="round"
              className="donut-segment transition-all duration-300 hover:stroke-width-[14] cursor-pointer"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-[#0F172A]">{total}</span>
        <span className="text-[10px] text-slate-400 font-medium">
          Total Plans
        </span>
      </div>
    </div>
  );
};

// ==================== STAT CARD ====================
const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const [trend] = useState(() => (Math.random() > 0.3 ? "up" : "down"));
  const [trendValue] = useState(() => Math.floor(Math.random() * 20) + 3);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.08,
          ease: "power3.out",
        },
      );
    }
  }, [index]);

  const sparkData = useMemo(
    () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 60) + 20),
    [],
  );

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:shadow-slate-200/40 hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-slate-50/80 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
        >
          <stat.icon size={20} strokeWidth={2} />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={13} />
          ) : (
            <ArrowDownRight size={13} />
          )}
          {trendValue}%
        </div>
      </div>
      <p className="text-2xl font-bold text-[#0F172A] mb-0.5 tracking-tight">
        {stat.value}
      </p>
      <p className="text-xs text-slate-500 font-medium mb-3">{stat.label}</p>
      <MiniSparkline data={sparkData} color={stat.sparkColor} />
    </div>
  );
};

// ==================== EXPORT MODAL ====================
const ExportModal = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState("pdf");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleExport = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      alert(`Report exported as ${format.toUpperCase()}!`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-bold text-[#0F172A] mb-1">Export Report</h3>
        <p className="text-sm text-slate-500 mb-5">
          Choose your preferred export format
        </p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {["pdf", "csv", "excel"].map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${format === f ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-100 hover:border-slate-200 text-slate-600"}`}
            >
              <FileText size={24} />
              <span className="text-xs font-semibold uppercase">{f}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#0F172A] text-white font-medium hover:bg-[#1E293B] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Download size={16} /> Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
export default function AdminOverview() {
  const sectionRef = useRef(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { data: orders, isLoading: ordersLoading } = useAllOrders();
  const { data: plans, isLoading: plansLoading } = usePlansAdmin();
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  const isLoading = ordersLoading || plansLoading || categoriesLoading;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current || isLoading) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".admin-header",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      );
      gsap.fromTo(
        ".charts-row",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.4, ease: "power3.out" },
      );
      gsap.fromTo(
        ".bottom-row",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.6, ease: "power3.out" },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [mounted, isLoading]);

  const totalOrders = orders?.length || 0;
  const totalRevenue =
    orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0;
  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length || 0;
  const completedOrders =
    orders?.filter((o) => o.status === "completed" || o.status === "paid")
      .length || 0;
  const totalPlans = plans?.length || 0;

  const categoryData = useMemo(() => {
    if (!plans?.length || !categories?.length) {
      return [
        { name: "Villa", value: 35, color: "#14B8A6" },
        { name: "Apartment", value: 28, color: "#0EA5E9" },
        { name: "Duplex", value: 20, color: "#8B5CF6" },
        { name: "Studio", value: 12, color: "#F59E0B" },
        { name: "Other", value: 5, color: "#EF4444" },
      ];
    }
    const counts = {};
    plans.forEach((plan) => {
      const cat = categories.find((c) => c.id === plan.category_id);
      const name = cat?.name || "Other";
      counts[name] = (counts[name] || 0) + 1;
    });
    const colors = [
      "#14B8A6",
      "#0EA5E9",
      "#8B5CF6",
      "#F59E0B",
      "#EF4444",
      "#10B981",
      "#EC4899",
    ];
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value: Math.round((value / total) * 100) || 1,
      color: colors[i % colors.length],
    }));
  }, [plans, categories]);

  const revenueData = useMemo(() => {
    if (!orders?.length) {
      return [
        { month: "Jan", revenue: 45000, orders: 12 },
        { month: "Feb", revenue: 52000, orders: 18 },
        { month: "Mar", revenue: 38000, orders: 14 },
        { month: "Apr", revenue: 61000, orders: 22 },
        { month: "May", revenue: 55000, orders: 19 },
        { month: "Jun", revenue: 72000, orders: 28 },
        { month: "Jul", revenue: 68000, orders: 25 },
      ];
    }
    const monthly = {};
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    orders.forEach((order) => {
      const date = new Date(order.created_at || Date.now());
      const key = monthNames[date.getMonth()];
      if (!monthly[key]) monthly[key] = { revenue: 0, orders: 0 };
      monthly[key].revenue += order.total_amount || 0;
      monthly[key].orders += 1;
    });
    return monthNames
      .map((m) => ({
        month: m,
        revenue: monthly[m]?.revenue || 0,
        orders: monthly[m]?.orders || 0,
      }))
      .filter((d) => d.revenue > 0 || d.orders > 0);
  }, [orders]);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      color: "bg-sky-50 text-sky-600",
      sparkColor: "#0EA5E9",
    },
    {
      label: "Total Revenue",
      value: `EGP ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
      sparkColor: "#10B981",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      sparkColor: "#F59E0B",
    },
    {
      label: "Completed",
      value: completedOrders,
      icon: CheckCircle,
      color: "bg-teal-50 text-teal-600",
      sparkColor: "#14B8A6",
    },
    {
      label: "Total Plans",
      value: totalPlans,
      icon: Package,
      color: "bg-violet-50 text-violet-600",
      sparkColor: "#8B5CF6",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="admin-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest">
                Live Dashboard
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#0F172A]"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Overview
            </h1>
            <p
              className="text-sm text-slate-500 mt-1"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Welcome back! Here&apos;s what&apos;s happening with your platform
              today.
            </p>
          </div>
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-2 bg-[#0F172A] text-white rounded-xl px-5 py-2.5 text-sm font-semibold hover:bg-[#1E293B] transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 self-start sm:self-auto"
          >
            <Zap size={16} />
            Export Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="charts-row grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3
                  className="text-lg font-bold text-[#0F172A]"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Revenue Overview
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Monthly revenue & order count
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#14B8A6]" />
                  <span className="text-xs text-slate-500 font-medium">
                    Revenue
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#0F172A]/20" />
                  <span className="text-xs text-slate-500 font-medium">
                    Orders
                  </span>
                </div>
              </div>
            </div>
            <RevenueChart data={revenueData} />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="mb-6">
              <h3
                className="text-lg font-bold text-[#0F172A]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Plan Categories
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribution by type
              </p>
            </div>
            <DonutChart data={categoryData} />
            <div className="mt-6 space-y-2.5">
              {categoryData.map((cat, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 rounded-lg px-2 py-1.5 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-slate-600 font-medium">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#0F172A]">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Full Width Recent Orders */}
        <div className="bottom-row">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="mb-6">
              <h3
                className="text-lg font-bold text-[#0F172A]"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                Recent Orders
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Latest transactions from your customers
              </p>
            </div>
            <div className="space-y-2">
              {orders?.slice(0, 5).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 hover:bg-slate-50 transition-all group cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        order.status === "completed" || order.status === "paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : order.status === "pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      <Package size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-[#0F172A] text-sm">
                        Order #{order.id?.toString().slice(-4)}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {order.full_name || "Customer"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#0F172A] text-sm">
                      EGP {order.total_amount?.toLocaleString()}
                    </p>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold mt-1.5 uppercase tracking-wide ${
                        order.status === "completed" || order.status === "paid"
                          ? "bg-emerald-50 text-emerald-600"
                          : order.status === "pending"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {(!orders || orders.length === 0) && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  No orders yet
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ExportModal isOpen={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}
