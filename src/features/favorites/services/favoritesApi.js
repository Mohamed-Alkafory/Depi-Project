import { supabase } from "@/lib/supabase";

export const favoritesApi = {
  async getFavorites() {
    const { data, error } = await supabase
      .from("favorites")
      .select(
        "id, plan_id, created_at, plans(id, title, price, cover_image, slug, status)",
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async addFavorite(planId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be logged in");

    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: user.id, plan_id: planId }]);
    if (error && error.code !== "23505") throw error; // 23505 = already favorited, ignore
  },

  async removeFavorite(planId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("plan_id", planId);
    if (error) throw error;
  },
};
