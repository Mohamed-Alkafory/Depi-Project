import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesApi } from "../services/favoritesApi";
import { useAuthStore } from "@/features/auth/store/authStore";

export function useFavoritesQuery() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return useQuery({
    queryKey: ["favorites"],
    queryFn: favoritesApi.getFavorites,
    enabled: isAuthenticated,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { data: favorites } = useFavoritesQuery();

  return useMutation({
    mutationFn: async (plan) => {
      const isFav = favorites?.some((f) => f.plan_id === plan.id);
      if (isFav) await favoritesApi.removeFavorite(plan.id);
      else await favoritesApi.addFavorite(plan.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });
}

// Convenience hook for a heart icon on a single plan card
export function useIsFavorite(planId) {
  const { data: favorites } = useFavoritesQuery();
  return favorites?.some((f) => f.plan_id === planId) ?? false;
}
