// // src/features/profile/services/profileApi.js
// import { supabase } from "@/lib/supabase";

// export const profileApi = {
//   async getProfile(userId) {
//     const { data, error } = await supabase
//       .from("profiles")
//       .select("*")
//       .eq("id", userId)
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   async updateProfile(userId, updates) {
//     const { data, error } = await supabase
//       .from("profiles")
//       .update({ ...updates, updated_at: new Date().toISOString() })
//       .eq("id", userId)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   async uploadAvatar(file, userId) {
//     const path = `avatars/${userId}-${Date.now()}.${file.name.split(".").pop()}`;

//     const { error: uploadError } = await supabase.storage
//       .from("avatars")
//       .upload(path, file, { upsert: true });

//     if (uploadError) throw uploadError;

//     const { data } = supabase.storage.from("avatars").getPublicUrl(path);
//     return data.publicUrl;
//   },
// };
// src/features/profile/services/profileApi.js
import { supabase } from "@/lib/supabase";

export const profileApi = {
  async getProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  },

  async createProfile(profileData) {
    const { data, error } = await supabase
      .from("profiles")
      .insert(profileData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(userId, updates) {
    const { id, ...safeUpdates } = updates;

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...safeUpdates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async uploadAvatar(file, userId) {
    const path = `avatars/${userId}-${Date.now()}.${file.name.split(".").pop()}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    return data.publicUrl;
  },
};
