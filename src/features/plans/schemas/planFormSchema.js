import { z } from "zod";

// z.coerce.number() accepts either a string ("500000") or an actual number
// and converts it — this is what fixes the year_built bug from before
// (a default value that was a JS number instead of a string) and avoids
// the whole class of "expected string, received number" errors for good.
export const planFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug is required"),
  category_id: z.string().uuid("Please select a category"),
  style: z.string().optional(),
  status: z.enum(["draft", "available", "sold_out", "coming_soon"]),
  // FIX: these were all commented out. z.object() strips any key that
  // isn't defined in its shape, so with these missing, price/area/etc.
  // never reached the submitted `data` at all — not as null, just absent
  // — which is why the Supabase request never even included a "price"
  // column and Postgres rejected it as a NOT NULL violation.
  price: z.coerce.number().min(0, "Price must be positive"),
  area: z.coerce.number().positive("Area must be greater than 0"),
  bedrooms: z.coerce.number().int().min(0, "Bedrooms can't be negative"),
  bathrooms: z.coerce.number().min(0, "Bathrooms can't be negative"),
  floors: z.coerce.number().int().min(1, "At least 1 floor"),
  garage: z.coerce.number().int().min(0).optional(),
  year_built: z.coerce.number().int().optional(),
  short_description: z.string().optional(),
  long_description: z.string().optional(),
  is_featured: z.boolean().optional(),
});
