import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/services/authApi";

export function useLogin() {
  return useMutation({
    mutationFn: authApi.signIn,
  });
}
