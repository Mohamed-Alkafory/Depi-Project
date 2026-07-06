import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { cartApi } from "../services/cartApi";
import { useAuthStore } from "@/features/auth/store/authStore";

// The cart query is keyed only by ["cart"], no user id in the key — because
// it's only ever `enabled` while a session exists, and React Query already
// refetches on window focus / after mutations. If a different user logs in,
// the auth listener flips `isAuthenticated` false-then-true which re-enables
// this query fresh anyway.
export function useCartQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    enabled: isAuthenticated,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (plan) => {
      if (plan.status === "sold_out") throw new Error("This plan is sold out");
      if (plan.status === "coming_soon")
        throw new Error("This plan is coming soon");
      return cartApi.addToCart(plan.id);
    },
    onSuccess: () => {
      toast.success("Added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err) => toast.error(err.message),
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}
