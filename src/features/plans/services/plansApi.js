// // import { supabase } from "@/lib/supabase";

// // export const plansApi = {
// //   // Admin: get all plans (all statuses)
// //   getAllAdmin: async () => {
// //     const { data, error } = await supabase
// //       .from("plans")
// //       .select(
// //         `
// //         *,
// //         categories (name)
// //       `,
// //       )
// //       .order("created_at", { ascending: false });

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Admin: create plan
// //   create: async (planData) => {
// //     const { data, error } = await supabase
// //       .from("plans")
// //       .insert(planData)
// //       .select()
// //       .single();

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Admin: update plan
// //   update: async (id, planData) => {
// //     const { data, error } = await supabase
// //       .from("plans")
// //       .update(planData)
// //       .eq("id", id)
// //       .select()
// //       .single();

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Admin: delete plan
// //   delete: async (id) => {
// //     const { error } = await supabase.from("plans").delete().eq("id", id);

// //     if (error) throw error;
// //   },

// //   // Admin: duplicate plan
// //   duplicate: async (plan) => {
// //     const { id, slug, created_at, updated_at, ...rest } = plan;
// //     const newSlug = `${slug}-copy-${Date.now()}`;

// //     const { data, error } = await supabase
// //       .from("plans")
// //       .insert({ ...rest, slug: newSlug, title: `${rest.title} (Copy)` })
// //       .select()
// //       .single();

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Upload image to Storage
// //   uploadImage: async (file, path) => {
// //     const { data, error } = await supabase.storage
// //       .from("plans")
// //       .upload(path, file, { upsert: true });

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Get public URL
// //   getImageUrl: (path) => {
// //     const { data } = supabase.storage.from("plans").getPublicUrl(path);
// //     return data.publicUrl;
// //   },

// //   // Delete image from Storage
// //   deleteImage: async (path) => {
// //     const { error } = await supabase.storage.from("plans").remove([path]);

// //     if (error) throw error;
// //   },

// //   // Get plan images
// //   getPlanImages: async (planId) => {
// //     const { data, error } = await supabase
// //       .from("plan_images")
// //       .select("*")
// //       .eq("plan_id", planId)
// //       .order("sort_order", { ascending: true });

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Add plan image record
// //   addPlanImage: async (imageData) => {
// //     const { data, error } = await supabase
// //       .from("plan_images")
// //       .insert(imageData)
// //       .select()
// //       .single();

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Delete plan image record
// //   deletePlanImage: async (id) => {
// //     const { error } = await supabase.from("plan_images").delete().eq("id", id);

// //     if (error) throw error;
// //   },

// //   // Get plan features
// //   getPlanFeatures: async (planId) => {
// //     const { data, error } = await supabase
// //       .from("plan_features")
// //       .select("*")
// //       .eq("plan_id", planId);

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Add plan feature
// //   addPlanFeature: async (planId, feature) => {
// //     const { data, error } = await supabase
// //       .from("plan_features")
// //       .insert({ plan_id: planId, feature })
// //       .select()
// //       .single();

// //     if (error) throw error;
// //     return data;
// //   },

// //   // Delete plan feature
// //   deletePlanFeature: async (id) => {
// //     const { error } = await supabase
// //       .from("plan_features")
// //       .delete()
// //       .eq("id", id);

// //     if (error) throw error;
// //   },
// // };

// import { supabase } from "@/lib/supabase";

// export const plansApi = {
//   async getCategories() {
//     const { data, error } = await supabase
//       .from("categories")
//       .select("id, name")
//       .order("name");
//     if (error) throw error;
//     return data;
//   },

//   // Admin list: everything, including drafts, with related rows joined in.
//   async getPlansAdmin() {
//     const { data, error } = await supabase
//       .from("plans")
//       .select(
//         "*, categories(id, name), plan_features(id, feature), plan_images(id, image_url, image_type, sort_order)",
//       )
//       .order("created_at", { ascending: false });
//     if (error) throw error;
//     return data;
//   },

//   async uploadImage(file, path) {
//     const { error } = await supabase.storage
//       .from("plans")
//       .upload(path, file, { upsert: true });
//     if (error) throw error;
//     return path;
//   },

//   getImageUrl(path) {
//     const { data } = supabase.storage.from("plans").getPublicUrl(path);
//     return data.publicUrl;
//   },

//   async createPlan({ features = [], images = [], ...planData }) {
//     // First image (in whatever order the admin left them) becomes the
//     // card thumbnail, so PlanTable never has to join plan_images just to
//     // render a row.
//     const cover_image = images[0]?.url ?? null;

//     const { data: plan, error } = await supabase
//       .from("plans")
//       .insert([{ ...planData, cover_image }])
//       .select()
//       .single();
//     if (error) throw error;

//     if (features.length) {
//       const { error: fErr } = await supabase
//         .from("plan_features")
//         .insert(features.map((feature) => ({ plan_id: plan.id, feature })));
//       if (fErr) throw fErr;
//     }

//     if (images.length) {
//       const { error: iErr } = await supabase.from("plan_images").insert(
//         images.map((img, index) => ({
//           plan_id: plan.id,
//           image_url: img.url,
//           image_type: img.type,
//           sort_order: img.sort_order ?? index,
//         })),
//       );
//       if (iErr) throw iErr;
//     }

//     return plan;
//   },

//   // Edit replaces features/images wholesale — simplest correct behavior
//   // for a "save this form" action. The old plan_features/plan_images rows
//   // for this plan are deleted and re-inserted from what's currently in
//   // the form's state.
//   async editPlan(id, { features = [], images = [], ...planData }) {
//     const cover_image = images[0]?.url ?? planData.cover_image ?? null;

//     const { data: plan, error } = await supabase
//       .from("plans")
//       .update({ ...planData, cover_image })
//       .eq("id", id)
//       .select()
//       .single();
//     if (error) throw error;

//     const { error: delFErr } = await supabase
//       .from("plan_features")
//       .delete()
//       .eq("plan_id", id);
//     if (delFErr) throw delFErr;
//     if (features.length) {
//       const { error: fErr } = await supabase
//         .from("plan_features")
//         .insert(features.map((feature) => ({ plan_id: id, feature })));
//       if (fErr) throw fErr;
//     }

//     const { error: delIErr } = await supabase
//       .from("plan_images")
//       .delete()
//       .eq("plan_id", id);
//     if (delIErr) throw delIErr;
//     if (images.length) {
//       const { error: iErr } = await supabase.from("plan_images").insert(
//         images.map((img, index) => ({
//           plan_id: id,
//           image_url: img.url,
//           image_type: img.type,
//           sort_order: img.sort_order ?? index,
//         })),
//       );
//       if (iErr) throw iErr;
//     }

//     return plan;
//   },

//   async deletePlan(id) {
//     const { error } = await supabase.from("plans").delete().eq("id", id);
//     if (error) throw error;
//   },

//   async duplicatePlan(plan) {
//     const {
//       id,
//       created_at,
//       updated_at,
//       categories,
//       plan_features,
//       plan_images,
//       ...rest
//     } = plan;
//     const newSlug = `${rest.slug}-copy-${Date.now()}`;

//     const { data: newPlan, error } = await supabase
//       .from("plans")
//       .insert([
//         {
//           ...rest,
//           slug: newSlug,
//           title: `${rest.title} (Copy)`,
//           status: "draft",
//         },
//       ])
//       .select()
//       .single();
//     if (error) throw error;

//     if (plan_features?.length) {
//       await supabase
//         .from("plan_features")
//         .insert(
//           plan_features.map((f) => ({
//             plan_id: newPlan.id,
//             feature: f.feature,
//           })),
//         );
//     }
//     if (plan_images?.length) {
//       await supabase.from("plan_images").insert(
//         plan_images.map((img) => ({
//           plan_id: newPlan.id,
//           image_url: img.image_url,
//           image_type: img.image_type,
//           sort_order: img.sort_order,
//         })),
//       );
//     }

//     return newPlan;
//   },
// };

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
