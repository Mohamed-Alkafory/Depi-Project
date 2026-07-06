// // import { useState } from "react";
// // import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// // import { PlanRow } from "./PlanRow";
// // import { PlanForm } from "./PlanForm";

// // export function PlanTable() {
// //   const { data: plans, isLoading, error } = usePlansAdmin();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingPlan, setEditingPlan] = useState(null);

// //   const handleEdit = (plan) => {
// //     setEditingPlan(plan);
// //     setIsModalOpen(true);
// //   };

// //   const handleCreate = () => {
// //     setEditingPlan(null);
// //     setIsModalOpen(true);
// //   };

// //   const handleClose = () => {
// //     setIsModalOpen(false);
// //     setEditingPlan(null);
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-64 gap-3">
// //         <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
// //         <p className="text-[13px] text-white/40">Loading plans...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-64 gap-3">
// //         <p className="text-red-400 text-[14px]">Failed to load plans</p>
// //         <button
// //           onClick={() => window.location.reload()}
// //           className="text-[13px] text-[var(--brand-primary)] hover:underline"
// //         >
// //           Try again
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* Header */}
// //       <div className="flex items-center justify-between">
// //         <h2 className="text-[20px] font-bold text-white">Plans Management</h2>
// //         <button
// //           onClick={handleCreate}
// //           className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white px-4 py-2 rounded-lg text-[14px] font-medium transition-colors"
// //         >
// //           Add New Plan
// //         </button>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
// //         <table className="w-full">
// //           <thead>
// //             <tr className="border-b border-white/10">
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3 w-16">
// //                 Image
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3">
// //                 Title
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3">
// //                 Category
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3">
// //                 Price
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3">
// //                 Status
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-white/50 uppercase tracking-wider px-4 py-3 w-12">
// //                 {/* Actions */}
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {plans?.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="px-4 py-12 text-center">
// //                   <p className="text-white/40 text-[14px]">No plans found</p>
// //                   <button
// //                     onClick={handleCreate}
// //                     className="mt-2 text-[13px] text-[var(--brand-primary)] hover:underline"
// //                   >
// //                     Create your first plan
// //                   </button>
// //                 </td>
// //               </tr>
// //             ) : (
// //               plans?.map((plan) => (
// //                 <PlanRow
// //                   key={plan.id}
// //                   plan={plan}
// //                   onEdit={() => handleEdit(plan)}
// //                 />
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Modal */}
// //       {isModalOpen && <PlanForm plan={editingPlan} onClose={handleClose} />}
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// import { PlanRow } from "./PlanRow";
// import { PlanForm } from "./PlanForm";

// export function PlanTable() {
//   const { data: plans, isLoading, error } = usePlansAdmin();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);

//   const handleEdit = (plan) => {
//     setEditingPlan(plan);
//     setIsModalOpen(true);
//   };

//   const handleCreate = () => {
//     setEditingPlan(null);
//     setIsModalOpen(true);
//   };

//   const handleClose = () => {
//     setIsModalOpen(false);
//     setEditingPlan(null);
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 gap-3">
//         <div className="w-8 h-8 border-2 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
//         <p className="text-[13px] text-gray-400">Loading plans...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-64 gap-3">
//         <p className="text-red-500 text-[14px]">Failed to load plans</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="text-[13px] text-teal-600 hover:underline"
//         >
//           Try again
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-[20px] font-bold text-gray-900">
//           Plans Management
//         </h2>
//         <button
//           onClick={handleCreate}
//           className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[14px] font-medium transition-colors"
//         >
//           Add New Plan
//         </button>
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b border-gray-200 bg-gray-50">
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">
//                 Image
//               </th>
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                 Title
//               </th>
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                 Category
//               </th>
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                 Price
//               </th>
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                 Status
//               </th>
//               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-12">
//                 {/* Actions */}
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {plans?.length === 0 ? (
//               <tr>
//                 <td colSpan={6} className="px-4 py-12 text-center">
//                   <p className="text-gray-400 text-[14px]">No plans found</p>
//                   <button
//                     onClick={handleCreate}
//                     className="mt-2 text-[13px] text-teal-600 hover:underline"
//                   >
//                     Create your first plan
//                   </button>
//                 </td>
//               </tr>
//             ) : (
//               plans?.map((plan) => (
//                 <PlanRow
//                   key={plan.id}
//                   plan={plan}
//                   onEdit={() => handleEdit(plan)}
//                 />
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       {isModalOpen && <PlanForm plan={editingPlan} onClose={handleClose} />}
//     </div>
//   );
// }

import { useState } from "react";
import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
import { PlanRow } from "./PlanRow";
import { PlanForm } from "./PlanForm";

export function PlanTable() {
  const { data: plans, isLoading, error } = usePlansAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  console.log("🔥 PlanTable RENDERED"); // ← هل ده بيطبع؟

  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("plans:", plans);
  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
        <p className="text-[13px] text-gray-400">Loading plans...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-red-500 text-[14px]">Failed to load plans</p>
        <button
          onClick={() => window.location.reload()}
          className="text-[13px] text-teal-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[20px] font-bold text-gray-900">
          Plans Management
        </h2>
        <button
          onClick={() => {
            handleCreate();
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[14px] font-medium transition-colors"
        >
          Add New Plan
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">
                Image
              </th>
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                Title
              </th>
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                Category
              </th>
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                Price
              </th>
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                Status
              </th>
              <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-12">
                {/* Actions */}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {plans?.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <p className="text-gray-400 text-[14px]">No plans found</p>
                  <button
                    onClick={handleCreate}
                    className="mt-2 text-[13px] text-teal-600 hover:underline"
                  >
                    Create your first plan
                  </button>
                </td>
              </tr>
            ) : (
              plans?.map((plan) => (
                <PlanRow
                  key={plan.id}
                  plan={plan}
                  onEdit={() => handleEdit(plan)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && <PlanForm plan={editingPlan} onClose={handleClose} />}
    </div>
  );
}
