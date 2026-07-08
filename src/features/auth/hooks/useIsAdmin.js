// src/features/auth/hooks/useIsAdmin.js
import { useAuthStore } from "@/features/auth/store/authStore";

export function useIsAdmin() {
  return useAuthStore((state) => state.isAdmin);
}
