// src/features/plans/hooks/usePlan.js
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function usePlan(slug) {
  return useQuery({
    queryKey: ["plan", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select(
          `
          *,
          categories(id, name),
          plan_features(id, feature),
          plan_images(id, image_url, image_type, sort_order)
        `,
        )
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });
}
