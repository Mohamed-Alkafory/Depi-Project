 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../services/ordersApi";
import { toast } from "sonner";

export function useMyOrders() {
  return useQuery({
    queryKey: ["orders", "my"],
    queryFn: ordersApi.getMyOrders,
  });
}

export function useAllOrders() {
  return useQuery({
    queryKey: ["orders", "all"],
    queryFn: ordersApi.getAllOrders,
  });
}

export function useOrder(id) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => ordersApi.getOrderById(id),
    enabled: !!id,
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => ordersApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Status updated");
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payment_status }) =>
      ordersApi.updatePaymentStatus(id, payment_status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Payment status updated");
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete order");
    },
  });
}
