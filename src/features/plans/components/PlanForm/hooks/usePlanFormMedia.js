import { useState } from "react";
import { toast } from "sonner";
import { plansApi } from "@/features/plans/services/plansApi";

/**
 * Owns the two pieces of PlanForm state that live OUTSIDE react-hook-form:
 * features (tags) and images (uploaded files). These are merged into the
 * payload manually in onSubmit — see index.jsx.
 *
 * Kept as a separate hook so this state/logic isn't tangled with form
 * validation and step-navigation concerns in the main component.
 */
export function usePlanFormMedia(plan) {
  const [features, setFeatures] = useState(
    plan?.plan_features?.map((f) => f.feature) || [],
  );
  const [newFeature, setNewFeature] = useState("");

  const [images, setImages] = useState(
    (plan?.plan_images || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((img) => ({
        url: img.image_url,
        type: img.image_type,
        sort_order: img.sort_order,
      })),
  );
  const [uploading, setUploading] = useState(false);

  const addFeature = () => {
    const value = newFeature.trim();
    if (value && !features.includes(value)) {
      setFeatures((prev) => [...prev, value]);
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      for (const file of files) {
        // NOTE: flat `${Date.now()}-${filename}` path, not `plans/<slug>/...`.
        // Known/flagged simplification from the previous session — the plan's
        // slug/id doesn't exist yet while still filling the "Create" wizard.
        // Fine functionally; revisit only if tidier Storage browsing matters.
        const path = `${Date.now()}-${file.name}`;
        await plansApi.uploadImage(file, path);
        const url = plansApi.getImageUrl(path);
        setImages((prev) => [
          ...prev,
          { url, path, type: "gallery", sort_order: prev.length },
        ]);
      }
      toast.success("Images uploaded successfully");
    } catch (err) {
      toast.error("Failed to upload images");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const setImageType = (index, type) => {
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, type } : img)),
    );
  };

  return {
    features,
    newFeature,
    setNewFeature,
    addFeature,
    removeFeature,
    images,
    uploading,
    handleImageUpload,
    removeImage,
    setImageType,
  };
}
