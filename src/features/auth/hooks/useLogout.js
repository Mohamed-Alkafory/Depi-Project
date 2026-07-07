// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { authApi } from "@/features/auth/services/authApi";
// import { useAuthStore } from "@/features/auth/store/authStore";

// export function useLogout() {
//   const queryClient = useQueryClient();
//   const clearAuth = useAuthStore((s) => s.clearAuth);

//   return useMutation({
//     mutationFn: authApi.signOut,
//     onSuccess: () => {
//       clearAuth();
//       queryClient.clear();
//     },
//   });
// }

// src/features/auth/hooks/useLogout.js
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
      // ✅ Reload بسيط — بيمسح كل حاجة ويرجع للـ home
      window.location.replace("/");
    },
  });
}
