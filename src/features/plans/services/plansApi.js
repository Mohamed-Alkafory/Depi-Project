import { supabase } from "@/lib/supabase";

export const plansApi = {
  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");
    if (error) throw error;
    return data;
  },

  // Admin list: everything, including drafts, with related rows joined in.
  async getPlansAdmin() {
    const { data, error } = await supabase
      .from("plans")
      .select(
        "*, categories(id, name), plan_features(id, feature), plan_images(id, image_url, image_type, sort_order)",
      )
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async uploadImage(file, path) {
    const { error } = await supabase.storage
      .from("plans")
      .upload(path, file, { upsert: true });
    if (error) throw error;
    return path;
  },

  getImageUrl(path) {
    const { data } = supabase.storage.from("plans").getPublicUrl(path);
    return data.publicUrl;
  },

  async createPlan({ features = [], images = [], ...planData }) {
    const cover_image = images[0]?.url ?? null;

    const { data: plan, error } = await supabase
      .from("plans")
      .insert([{ ...planData, cover_image }])
      .select()
      .single();
    if (error) throw error;

    if (features.length) {
      const { error: fErr } = await supabase
        .from("plan_features")
        .insert(features.map((feature) => ({ plan_id: plan.id, feature })));
      if (fErr) throw fErr;
    }

    if (images.length) {
      const { error: iErr } = await supabase.from("plan_images").insert(
        images.map((img, index) => ({
          plan_id: plan.id,
          image_url: img.url,
          image_type: img.type,
          sort_order: img.sort_order ?? index,
        })),
      );
      if (iErr) throw iErr;
    }

    return plan;
  },

  async editPlan(id, { features = [], images = [], ...planData }) {
    const cover_image = images[0]?.url ?? planData.cover_image ?? null;

    const { data: plan, error } = await supabase
      .from("plans")
      .update({ ...planData, cover_image })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    const { error: delFErr } = await supabase
      .from("plan_features")
      .delete()
      .eq("plan_id", id);
    if (delFErr) throw delFErr;
    if (features.length) {
      const { error: fErr } = await supabase
        .from("plan_features")
        .insert(features.map((feature) => ({ plan_id: id, feature })));
      if (fErr) throw fErr;
    }

    const { error: delIErr } = await supabase
      .from("plan_images")
      .delete()
      .eq("plan_id", id);
    if (delIErr) throw delIErr;
    if (images.length) {
      const { error: iErr } = await supabase.from("plan_images").insert(
        images.map((img, index) => ({
          plan_id: id,
          image_url: img.url,
          image_type: img.type,
          sort_order: img.sort_order ?? index,
        })),
      );
      if (iErr) throw iErr;
    }

    return plan;
  },

  async deletePlan(id) {
    const { error } = await supabase.from("plans").delete().eq("id", id);
    if (error) throw error;
  },

  async duplicatePlan(plan) {
    const {
      id,
      created_at,
      updated_at,
      categories,
      plan_features,
      plan_images,
      ...rest
    } = plan;

    // ✅ الحل: نعمل slug جديد من الـ title + timestamp
    const baseSlug = rest.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // استبدل أي حاجة مش حرف/رقم بـ -
      .replace(/^-+|-+$/g, ""); // شيل الـ - من الأول والآخر

    const newSlug = `${baseSlug}-copy-${Date.now()}`;

    const { data: newPlan, error } = await supabase
      .from("plans")
      .insert([
        {
          ...rest,
          slug: newSlug,
          title: `${rest.title} (Copy)`,
          status: "draft",
        },
      ])
      .select()
      .single();
    if (error) throw error;

    if (plan_features?.length) {
      await supabase.from("plan_features").insert(
        plan_features.map((f) => ({
          plan_id: newPlan.id,
          feature: f.feature,
        })),
      );
    }
    if (plan_images?.length) {
      await supabase.from("plan_images").insert(
        plan_images.map((img) => ({
          plan_id: newPlan.id,
          image_url: img.image_url,
          image_type: img.image_type,
          sort_order: img.sort_order,
        })),
      );
    }

    return newPlan;
  },
};
