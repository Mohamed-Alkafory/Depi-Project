import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/services/authApi";

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signUp,
  });
}
