// // src/features/orders/services/ordersApi.js
// import { supabase } from "@/lib/supabase";

// export const ordersApi = {
//   // User: get my orders with items + plan images
//   async getMyOrders() {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser();
//     if (!user) throw new Error("Not authenticated");

//     const { data, error } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         order_items(
//           *,
//           plans:plan_id(cover_image)
//         )
//       `,
//       )
//       .eq("user_id", user.id)
//       .is("deleted_at", null)
//       .order("created_at", { ascending: false });

//     if (error) throw error;
//     return data;
//   },

//   // Admin: get all orders
//   async getAllOrders() {
//     const { data, error } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         order_items(
//           *,
//           plans:plan_id(cover_image)
//         )
//       `,
//       )
//       .is("deleted_at", null)
//       .order("created_at", { ascending: false });

//     if (error) {
//       console.error("getAllOrders error:", error);
//       throw error;
//     }
//     return data || [];
//   },

//   // Get single order
//   async getOrderById(id) {
//     const { data, error } = await supabase
//       .from("orders")
//       .select(
//         `
//         *,
//         order_items(
//           *,
//           plans:plan_id(cover_image, title, price, area, bedrooms, bathrooms)
//         )
//       `,
//       )
//       .eq("id", id)
//       .is("deleted_at", null)
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Admin: update order status
//   async updateStatus(id, status) {
//     const { data, error } = await supabase
//       .from("orders")
//       .update({ status })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Admin: update payment status
//   async updatePaymentStatus(id, payment_status) {
//     const { data, error } = await supabase
//       .from("orders")
//       .update({ payment_status })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Soft delete order (Admin or User)
//   async deleteOrder(id) {
//     const { data, error } = await supabase
//       .from("orders")
//       .update({ deleted_at: new Date().toISOString() })
//       .eq("id", id)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },
// };
// src/features/orders/services/ordersApi.js
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

  // ✅ User/Admin: delete order — من غير .single()!
  async deleteOrder(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    // ❌ شيلنا .select() و .single()

    if (error) throw error;
    return { success: true, id };
  },
};
