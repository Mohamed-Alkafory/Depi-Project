 
import { supabase } from "@/lib/supabase";

export const ordersApi = {
  // User: get my orders with items + plan images
  async getMyOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(
          *,
          plans:plan_id(cover_image)
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Admin: get all orders
  async getAllOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(
          *,
          plans:plan_id(cover_image)
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  },

  // Get single order
  async getOrderById(id) {
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items(
          *,
          plans:plan_id(cover_image, title, price, area, bedrooms, bathrooms)
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  // Admin: update order status
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Admin: update payment status
  async updatePaymentStatus(id, payment_status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ payment_status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
 
  async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    
    if (error) throw error;
    return { success: true, id };
  },
};
