// src/features/plans/hooks/usePlans.js
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function usePlans({ admin = false } = {}) {
  return useQuery({
    queryKey: ["plans", { admin }],
    queryFn: async () => {
      let query = supabase
        .from("plans")
        .select(
          `
          *,
          categories(id, name),
          plan_features(id, feature),
          plan_images(id, image_url, image_type, sort_order)
        `,
        )
        .order("created_at", { ascending: false });

      // Website: available + sold_out + coming_soon
      // Admin: كل حاجة
      if (!admin) {
        query = query.in("status", ["available", "sold_out", "coming_soon"]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}
