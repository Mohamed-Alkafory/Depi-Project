// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { plansApi } from "@/features/plans/services/plansApi";

// // Get all plans (admin)
// export function usePlansAdmin() {
//   return useQuery({
//     queryKey: ["plans", "admin"],
//     queryFn: plansApi.getAllAdmin,
//   });
// }

// // Create plan
// export function useCreatePlan() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: plansApi.create,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["plans", "admin"] });
//       toast.success("Plan created successfully");
//     },
//     onError: (err) => {
//       toast.error(err.message || "Failed to create plan");
//     },
//   });
// }

// // Update plan
// export function useEditPlan() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }) => plansApi.update(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["plans", "admin"] });
//       toast.success("Plan updated successfully");
//     },
//     onError: (err) => {
//       toast.error(err.message || "Failed to update plan");
//     },
//   });
// }

// // Delete plan
// export function useDeletePlan() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: plansApi.delete,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["plans", "admin"] });
//       toast.success("Plan deleted successfully");
//     },
//     onError: (err) => {
//       toast.error(err.message || "Failed to delete plan");
//     },
//   });
// }

// // Duplicate plan
// export function useDuplicatePlan() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: plansApi.duplicate,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["plans", "admin"] });
//       toast.success("Plan duplicated successfully");
//     },
//     onError: (err) => {
//       toast.error(err.message || "Failed to duplicate plan");
//     },
//   });
// }

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { plansApi } from "../services/plansApi";

export function usePlansAdmin() {
  return useQuery({
    queryKey: ["plans-admin"],
    queryFn: plansApi.getPlansAdmin,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: plansApi.getCategories,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: plansApi.createPlan,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["plans-admin"] }),
  });
}

export function useEditPlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => plansApi.editPlan(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["plans-admin"] }),
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: plansApi.deletePlan,
    onSuccess: () => {
      toast.success("Plan deleted");
      queryClient.invalidateQueries({ queryKey: ["plans-admin"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDuplicatePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: plansApi.duplicatePlan,
    onSuccess: () => {
      toast.success("Plan duplicated");
      queryClient.invalidateQueries({ queryKey: ["plans-admin"] });
    },
    onError: (err) => toast.error(err.message),
  });
}
