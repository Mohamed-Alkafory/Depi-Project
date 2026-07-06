// import { useState } from "react";
// import { MoreVertical, Copy, Pencil, Trash2 } from "lucide-react";
// import {
//   useDeletePlan,
//   useDuplicatePlan,
// } from "@/features/plans/hooks/usePlansAdmin";

// export function PlanRow({ plan, onEdit }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();
//   const { mutate: duplicatePlan, isPending: isDuplicating } =
//     useDuplicatePlan();

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this plan?")) {
//       deletePlan(plan.id);
//     }
//     setShowMenu(false);
//   };

//   const handleDuplicate = () => {
//     duplicatePlan(plan);
//     setShowMenu(false);
//   };

//   const statusColors = {
//     draft: "bg-gray-500/20 text-gray-400",
//     available: "bg-green-500/20 text-green-400",
//     sold_out: "bg-red-500/20 text-red-400",
//     coming_soon: "bg-yellow-500/20 text-yellow-400",
//   };

//   // لو بيحذف، نخلي الـ row شفاف مع spinner
//   if (isDeleting) {
//     return (
//       <tr className="border-b border-white/5 opacity-50">
//         <td colSpan={6} className="px-4 py-6 text-center">
//           <div className="flex items-center justify-center gap-2 text-white/40">
//             <div className="w-4 h-4 border-2 border-white/20 border-t-red-400 rounded-full animate-spin" />
//             <span className="text-[13px]">Deleting...</span>
//           </div>
//         </td>
//       </tr>
//     );
//   }

//   return (
//     <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
//       {/* Thumbnail */}
//       <td className="px-4 py-3">
//         <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5">
//           {plan.cover_image ? (
//             <img
//               src={plan.cover_image}
//               alt={plan.title}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px]">
//               No img
//             </div>
//           )}
//         </div>
//       </td>

//       {/* Title */}
//       <td className="px-4 py-3">
//         <div className="text-[14px] font-medium text-white">{plan.title}</div>
//         <div className="text-[12px] text-white/40">{plan.slug}</div>
//       </td>

//       {/* Category */}
//       <td className="px-4 py-3">
//         <span className="text-[12px] text-white/60">
//           {plan.categories?.name || "N/A"}
//         </span>
//       </td>

//       {/* Price */}
//       <td className="px-4 py-3">
//         <span className="text-[14px] font-medium text-white">
//           ${plan.price?.toLocaleString()}
//         </span>
//       </td>

//       {/* Status */}
//       <td className="px-4 py-3">
//         <span
//           className={`inline-flex px-2 py-1 rounded-full text-[11px] font-medium ${statusColors[plan.status] || statusColors.draft}`}
//         >
//           {plan.status}
//         </span>
//       </td>

//       {/* Actions */}
//       <td className="px-4 py-3 relative">
//         <button
//           onClick={() => setShowMenu(!showMenu)}
//           disabled={isDuplicating}
//           className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/60 disabled:opacity-50"
//         >
//           {isDuplicating ? (
//             <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
//           ) : (
//             <MoreVertical className="w-4 h-4" />
//           )}
//         </button>

//         {/* Dropdown */}
//         {showMenu && (
//           <>
//             <div
//               className="fixed inset-0 z-10"
//               onClick={() => setShowMenu(false)}
//             />
//             <div className="absolute right-4 top-full mt-1 w-40 bg-gray-900 border border-white/10 rounded-xl shadow-xl z-20 py-1">
//               <button
//                 onClick={handleDuplicate}
//                 disabled={isDuplicating}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-white/80 hover:bg-white/5 transition-colors disabled:opacity-50"
//               >
//                 <Copy className="w-3.5 h-3.5" />
//                 {isDuplicating ? "Duplicating..." : "Duplicate"}
//               </button>
//               <button
//                 onClick={() => {
//                   onEdit();
//                   setShowMenu(false);
//                 }}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-white/80 hover:bg-white/5 transition-colors"
//               >
//                 <Pencil className="w-3.5 h-3.5" />
//                 Edit
//               </button>
//               <div className="h-px bg-white/10 my-1" />
//               <button
//                 onClick={handleDelete}
//                 className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-red-400 hover:bg-red-500/10 transition-colors"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//                 Delete
//               </button>
//             </div>
//           </>
//         )}
//       </td>
//     </tr>
//   );
// }
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical, Pencil, Trash2, Copy } from "lucide-react";
import { useDeletePlan, useDuplicatePlan } from "../hooks/usePlansAdmin";
import { ConfirmDialog } from "./ConfirmDialog";

const MENU_WIDTH = 160;
const MENU_HEIGHT_ESTIMATE = 140;
const GAP = 4;

export function PlanRow({ plan, onEdit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuContentRef = useRef(null);

  const { mutate: deletePlan, isPending: isDeleting } = useDeletePlan();
  const { mutate: duplicatePlan } = useDuplicatePlan();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        menuContentRef.current &&
        !menuContentRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openUpward = spaceBelow < MENU_HEIGHT_ESTIMATE + GAP;

      setMenuPos({
        top: openUpward
          ? rect.top - MENU_HEIGHT_ESTIMATE - GAP
          : rect.bottom + GAP,
        left: rect.right - MENU_WIDTH,
      });
    }
    setMenuOpen((v) => !v);
  };

  const statusColors = {
    available: "bg-green-50 text-green-700 border border-green-200",
    draft: "bg-gray-100 text-gray-600 border border-gray-200",
    sold_out: "bg-red-50 text-red-700 border border-red-200",
    coming_soon: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* Thumbnail */}
      <td className="px-4 py-3">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          {plan.cover_image ? (
            <img
              src={plan.cover_image}
              alt={plan.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px]">
              No img
            </div>
          )}
        </div>
      </td>

      {/* Title */}
      <td className="px-4 py-3">
        <p className="text-[14px] font-semibold text-gray-900">{plan.title}</p>
        <p className="text-[12px] text-gray-400">{plan.slug}</p>
      </td>

      {/* Category */}
      <td className="px-4 py-3 text-[13px] text-gray-600">
        {plan.categories?.name ?? "—"}
      </td>

      {/* Price */}
      <td className="px-4 py-3 text-[14px] font-semibold text-gray-900">
        ${Number(plan.price).toLocaleString()}
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex px-3 py-1 rounded-full text-[12px] font-medium ${statusColors[plan.status] || statusColors.draft}`}
        >
          {plan.status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3 relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleMenu}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
      </td>

      {menuOpen &&
        createPortal(
          <div
            ref={menuContentRef}
            style={{
              position: "fixed",
              top: menuPos.top,
              left: menuPos.left,
              width: MENU_WIDTH,
            }}
            className="z-50 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden"
          >
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onEdit(plan);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Pencil className="w-3.5 h-3.5 text-gray-500" /> Edit
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                duplicatePlan(plan);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-gray-500" /> Duplicate
            </button>
            <div className="h-px bg-gray-100" />
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setConfirmOpen(true);
              }}
              className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>,
          document.body,
        )}

      {confirmOpen && (
        <ConfirmDialog
          title="Delete this plan?"
          message={`"${plan.title}" and all its images/features will be permanently removed.`}
          isLoading={isDeleting}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() =>
            deletePlan(plan.id, { onSuccess: () => setConfirmOpen(false) })
          }
        />
      )}
    </tr>
  );
}
