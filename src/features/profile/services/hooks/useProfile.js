// src/features/profile/hooks/useProfile.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { profileApi } from "../services/profileApi";
import { useAuthStore } from "@/features/auth/store/authStore";

export function useProfile() {
  const user = useAuthStore((s) => s.user);
  const userId = user?.id;
  const queryClient = useQueryClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      try {
        return await profileApi.getProfile(userId);
      } catch (err) {
        if (err.code === "PGRST116") {
          return await profileApi.createProfile({
            id: userId,
            email: user.email,
            full_name: user.email,
            role: "user",
          });
        }
        throw err;
      }
    },
    enabled: !!userId,
  });

  const updateMutation = useMutation({
    mutationFn: (updates) => profileApi.updateProfile(userId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async ({ file, userId }) => {
      const avatarUrl = await profileApi.uploadAvatar(file, userId);
      await profileApi.updateProfile(userId, { avatar_url: avatarUrl });
      return avatarUrl;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", userId] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  // ✅ نرجع object دايماً حتى لو profile = null
  return {
    profile: profile || null,
    isLoading: isLoading && !!userId, // ← loading بس لو فيه userId
    error,
    updateProfile: updateMutation.mutate,
    uploadAvatar: uploadAvatarMutation.mutate,
    isUpdating: updateMutation.isPending || uploadAvatarMutation.isPending,
  };
}
