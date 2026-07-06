import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/features/auth/services/authApi";
import { useAuthStore } from "@/features/auth/store/authStore";

export function useLogout() {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: authApi.signOut,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}
