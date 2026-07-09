import { supabase } from "@/lib/supabase";

export const cartApi = {
  async getCart() {
    const { data, error } = await supabase
      .from("cart")
      .select(
        "id, plan_id, created_at, plans(id, title, price, cover_image, slug, status, area, bedrooms, bathrooms, floors)",
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async addToCart(planId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("You must be logged in");

    const { error } = await supabase
      .from("cart")
      .insert([{ user_id: user.id, plan_id: planId }]);

    if (error) {
      // Postgres unique_violation code — already in cart (unique(user_id, plan_id))
      if (error.code === "23505") throw new Error("Already in cart");
      throw error;
    }
  },

  async removeFromCart(planId) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id)
      .eq("plan_id", planId);
    if (error) throw error;
  },

  async clearCart() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("user_id", user.id);
    if (error) throw error;
  },
};
