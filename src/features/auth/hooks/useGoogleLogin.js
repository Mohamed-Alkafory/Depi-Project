import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/services/authApi";

export function useGoogleLogin() {
  return useMutation({
    mutationFn: authApi.signInWithGoogle,
  });
}
