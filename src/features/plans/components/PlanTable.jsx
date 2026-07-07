// // import { useState } from "react";
// // import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// // import { PlanRow } from "./PlanRow";
// // import { PlanForm } from "./PlanForm";

// // export function PlanTable() {
// //   const { data: plans, isLoading, error } = usePlansAdmin();
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [editingPlan, setEditingPlan] = useState(null);
// //   // ← هل ده بيطبع؟

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
// //         <div className="w-8 h-8 border-2 border-gray-200 border-t-teal-600 rounded-full animate-spin" />
// //         <p className="text-[13px] text-gray-400">Loading plans...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="flex flex-col items-center justify-center h-64 gap-3">
// //         <p className="text-red-500 text-[14px]">Failed to load plans</p>
// //         <button
// //           onClick={() => window.location.reload()}
// //           className="text-[13px] text-teal-600 hover:underline"
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
// //         <h2 className="text-[20px] font-bold text-gray-900">
// //           Plans Management
// //         </h2>
// //         <button
// //           onClick={() => {
// //             handleCreate();
// //           }}
// //           className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[14px] font-medium transition-colors"
// //         >
// //           Add New Plan
// //         </button>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
// //         <table className="w-full">
// //           <thead>
// //             <tr className="border-b border-gray-200 bg-gray-50">
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">
// //                 Image
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
// //                 Title
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
// //                 Category
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
// //                 Price
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
// //                 Status
// //               </th>
// //               <th className="text-left text-[12px] font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-12">
// //                 {/* Actions */}
// //               </th>
// //             </tr>
// //           </thead>
// //           <tbody className="divide-y divide-gray-100">
// //             {plans?.length === 0 ? (
// //               <tr>
// //                 <td colSpan={6} className="px-4 py-12 text-center">
// //                   <p className="text-gray-400 text-[14px]">No plans found</p>
// //                   <button
// //                     onClick={handleCreate}
// //                     className="mt-2 text-[13px] text-teal-600 hover:underline"
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

// // src/pages/admin/PlanTable.jsx
// import { useState } from "react";
// import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
// import { PlanRow } from "./PlanRow";
// import { PlanForm } from "./PlanForm";
// import { Plus, LayoutGrid, List, Search } from "lucide-react";

// export function PlanTable() {
//   const { data: plans, isLoading, error } = usePlansAdmin();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingPlan, setEditingPlan] = useState(null);
//   const [viewMode, setViewMode] = useState("list"); // "list" | "grid"
//   const [search, setSearch] = useState("");

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

//   const filteredPlans =
//     plans?.filter(
//       (plan) =>
//         plan.title?.toLowerCase().includes(search.toLowerCase()) ||
//         plan.category?.toLowerCase().includes(search.toLowerCase()),
//     ) || [];

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
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <h2 className="text-xl font-bold text-gray-900">Plans Management</h2>
//         <button
//           onClick={handleCreate}
//           className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
//         >
//           <Plus size={16} />
//           Add New Plan
//         </button>
//       </div>

//       {/* Search + View Toggle */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search
//             size={16}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search plans..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
//           />
//         </div>
//         <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1">
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2 rounded-lg transition-colors ${
//               viewMode === "list"
//                 ? "bg-teal-100 text-teal-600"
//                 : "text-gray-400 hover:text-gray-600"
//             }`}
//           >
//             <List size={18} />
//           </button>
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2 rounded-lg transition-colors ${
//               viewMode === "grid"
//                 ? "bg-teal-100 text-teal-600"
//                 : "text-gray-400 hover:text-gray-600"
//             }`}
//           >
//             <LayoutGrid size={18} />
//           </button>
//         </div>
//       </div>

//       {/* Desktop: Table */}
//       <div className="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[600px]">
//             <thead>
//               <tr className="border-b border-gray-200 bg-gray-50">
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">
//                   Image
//                 </th>
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                   Title
//                 </th>
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                   Category
//                 </th>
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                   Price
//                 </th>
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
//                   Status
//                 </th>
//                 <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-12">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {filteredPlans.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="px-4 py-12 text-center">
//                     <p className="text-gray-400 text-sm">No plans found</p>
//                     <button
//                       onClick={handleCreate}
//                       className="mt-2 text-sm text-teal-600 hover:underline"
//                     >
//                       Create your first plan
//                     </button>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredPlans.map((plan) => (
//                   <PlanRow
//                     key={plan.id}
//                     plan={plan}
//                     onEdit={() => handleEdit(plan)}
//                   />
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile/Tablet: Grid Cards */}
//       <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {filteredPlans.length === 0 ? (
//           <div className="col-span-full bg-white border border-gray-200 rounded-xl p-8 text-center">
//             <p className="text-gray-400 text-sm">No plans found</p>
//             <button
//               onClick={handleCreate}
//               className="mt-2 text-sm text-teal-600 hover:underline"
//             >
//               Create your first plan
//             </button>
//           </div>
//         ) : (
//           filteredPlans.map((plan) => (
//             <PlanCard
//               key={plan.id}
//               plan={plan}
//               onEdit={() => handleEdit(plan)}
//             />
//           ))
//         )}
//       </div>

//       {/* Modal */}
//       {isModalOpen && <PlanForm plan={editingPlan} onClose={handleClose} />}
//     </div>
//   );
// }

// // ✅ Mobile Card Component
// function PlanCard({ plan, onEdit }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//       <div className="flex items-start gap-3 mb-3">
//         <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
//           {plan.cover_image ? (
//             <img
//               src={plan.cover_image}
//               alt={plan.title}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
//               No Image
//             </div>
//           )}
//         </div>
//         <div className="flex-1 min-w-0">
//           <h3 className="font-semibold text-gray-900 text-sm truncate">
//             {plan.title}
//           </h3>
//           <p className="text-xs text-gray-500 mt-0.5">{plan.category}</p>
//           <p className="text-sm font-bold text-teal-600 mt-1">
//             EGP {plan.price?.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       <div className="flex items-center justify-between">
//         <span
//           className={`text-xs font-medium px-2.5 py-1 rounded-full ${
//             plan.is_active
//               ? "bg-green-100 text-green-700"
//               : "bg-gray-100 text-gray-600"
//           }`}
//         >
//           {plan.is_active ? "Active" : "Inactive"}
//         </span>
//         <button
//           onClick={onEdit}
//           className="text-sm text-teal-600 hover:text-teal-700 font-medium"
//         >
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// }

// src/pages/admin/PlanTable.jsx
import { useState } from "react";
import { usePlansAdmin } from "@/features/plans/hooks/usePlansAdmin";
import { PlanRow } from "./PlanRow";
import { PlanForm } from "./PlanForm";
import { Plus, Search } from "lucide-react";

export function PlanTable() {
  const { data: plans, isLoading, error } = usePlansAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredPlans =
    plans?.filter(
      (plan) =>
        plan.title?.toLowerCase().includes(search.toLowerCase()) ||
        plan.category?.toLowerCase().includes(search.toLowerCase()),
    ) || [];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Plans Management</h2>
        <button
          onClick={handleCreate}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add New Plan
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search plans..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Table - Responsive */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-16">
                  Image
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Title
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3 w-12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPlans.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-gray-400 text-sm">No plans found</p>
                    <button
                      onClick={handleCreate}
                      className="mt-2 text-sm text-teal-600 hover:underline"
                    >
                      Create your first plan
                    </button>
                  </td>
                </tr>
              ) : (
                filteredPlans.map((plan) => (
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

        {/* Mobile: Stacked Rows */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredPlans.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <p className="text-gray-400 text-sm">No plans found</p>
              <button
                onClick={handleCreate}
                className="mt-2 text-sm text-teal-600 hover:underline"
              >
                Create your first plan
              </button>
            </div>
          ) : (
            filteredPlans.map((plan) => (
              <MobilePlanRow
                key={plan.id}
                plan={plan}
                onEdit={() => handleEdit(plan)}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <PlanForm plan={editingPlan} onClose={handleClose} />}
    </div>
  );
}

// ✅ Mobile Row Component
function MobilePlanRow({ plan, onEdit }) {
  return (
    <div className="p-4">
      <div className="flex items-start gap-3">
        {/* Image */}
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
          {plan.cover_image ? (
            <img
              src={plan.cover_image}
              alt={plan.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
              No
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">
                {plan.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">{plan.category}</p>
            </div>
            <button
              onClick={onEdit}
              className="text-xs text-teal-600 hover:text-teal-700 font-medium flex-shrink-0"
            >
              Edit
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-bold text-teal-600">
              EGP {plan.price?.toLocaleString()}
            </p>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                plan.is_active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {plan.is_active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
