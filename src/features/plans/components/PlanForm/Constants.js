// export const STEPS = [
//   {
//     id: "basic",
//     label: "Basic Info",
//     fields: [
//       "title",
//       "slug",
//       "category_id",
//       "style",
//       "status",
//       "price",
//       "is_featured",
//     ],
//   },
//   {
//     id: "specs",
//     label: "Specifications",
//     fields: ["area", "bedrooms", "bathrooms", "floors", "garage", "year_built"],
//   },
//   {
//     id: "description",
//     label: "Description",
//     fields: ["short_description", "long_description"],
//   },
//   { id: "features", label: "Features", fields: [] },
//   { id: "images", label: "Images", fields: [] },
// ];

// export const STATUS_OPTIONS = [
//   { value: "draft", label: "Draft" },
//   { value: "available", label: "Available" },
//   { value: "sold_out", label: "Sold Out" },
//   { value: "coming_soon", label: "Coming Soon" },
// ];

// export const STYLE_OPTIONS = [
//   "Modern",
//   "Classic",
//   "Mediterranean",
//   "Contemporary",
//   "Traditional",
//   "Minimalist",
// ];

// export const IMAGE_TYPES = [
//   { value: "exterior", label: "Exterior" },
//   { value: "interior", label: "Interior" },
//   { value: "floorplan", label: "Floor Plan" },
//   { value: "gallery", label: "Gallery" },
// ];

// // Sensible defaults for a brand-new plan (used by the "create" flow).
// export function buildDefaultValues(plan) {
//   return {
//     title: plan?.title || "",
//     // FIX (root cause of "Save Changes" throwing "Slug is required" while
//     // editing): this key was completely missing before. In edit mode the
//     // slug input is disabled and the auto-generate-from-title effect is
//     // skipped (it only runs when !isEditing), so with no default value the
//     // field stayed empty and Zod blocked the submit before any request
//     // ever reached the server. That's also why images/features looked like
//     // they "didn't save" — the whole submit never went through, not just
//     // price/images.
//     slug: plan?.slug || "",
//     category_id: plan?.category_id || "",
//     style: plan?.style || "Modern",
//     status: plan?.status || "draft",
//     price: plan?.price || "",
//     area: plan?.area || "",
//     bedrooms: plan?.bedrooms || "",
//     bathrooms: plan?.bathrooms || "",
//     floors: plan?.floors || "1",
//     garage: plan?.garage || "0",
//     year_built: plan?.year_built
//       ? String(plan.year_built)
//       : String(new Date().getFullYear()),
//     short_description: plan?.short_description || "",
//     long_description: plan?.long_description || "",
//     is_featured: plan?.is_featured || false,
//   };
// }
export const STEPS = [
  {
    id: "basic",
    label: "Basic Info",
    fields: [
      "title",
      "slug",
      "category_id",
      "style",
      "status",
      "price",
      "is_featured",
    ],
  },
  {
    id: "specs",
    label: "Specifications",
    fields: ["area", "bedrooms", "bathrooms", "floors", "garage", "year_built"],
  },
  {
    id: "description",
    label: "Description",
    fields: ["short_description", "long_description"],
  },
  { id: "features", label: "Features", fields: [] },
  { id: "images", label: "Images", fields: [] },
];

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "available", label: "Available" },
  { value: "sold_out", label: "Sold Out" },
  { value: "coming_soon", label: "Coming Soon" },
];

export const STYLE_OPTIONS = [
  "Modern",
  "Classic",
  "Mediterranean",
  "Contemporary",
  "Traditional",
  "Minimalist",
];

export const IMAGE_TYPES = [
  { value: "exterior", label: "Exterior" },
  { value: "interior", label: "Interior" },
  { value: "floorplan", label: "Floor Plan" },
  { value: "gallery", label: "Gallery" },
];

export function buildDefaultValues(plan) {
  return {
    title: plan?.title || "",
    slug: plan?.slug || "",
    category_id: plan?.category_id || "",
    style: plan?.style || "Modern",
    status: plan?.status || "draft",
    price: plan?.price || "",
    area: plan?.area || "",
    bedrooms: plan?.bedrooms || "",
    bathrooms: plan?.bathrooms || "",
    floors: plan?.floors || "1",
    garage: plan?.garage || "0",
    year_built: plan?.year_built
      ? String(plan.year_built)
      : String(new Date().getFullYear()),
    short_description: plan?.short_description || "",
    long_description: plan?.long_description || "",
    is_featured: plan?.is_featured || false,
  };
}
