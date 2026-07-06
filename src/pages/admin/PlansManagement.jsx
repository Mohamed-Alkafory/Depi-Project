import { PlanTable } from "@/features/plans/components/PlanTable";

export function PlansManagement() {
  return (
    <div className="p-8">
      <PlanTable />
    </div>
  );
}

// import { PlanTable } from "@/features/plans/components/PlanTable";

// export function PlansManagement() {
//   console.log("🔥 PlansManagement RENDERED"); // ← هل ده بيطبع؟

//   return (
//     <div className="p-8 bg-red-500 min-h-screen">
//       {" "}
//       {/* ← خلفية حمرا عشان نتأكد */}
//       <h1 className="text-white text-2xl font-bold mb-4">TEST</h1>
//       <PlanTable />
//     </div>
//   );
// }
