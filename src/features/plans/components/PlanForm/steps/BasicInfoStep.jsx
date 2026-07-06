// import { STATUS_OPTIONS, STYLE_OPTIONS } from "../constants";

// export function BasicInfoStep({ register, errors, isEditing, categories }) {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Title *
//           </label>
//           <input
//             {...register("title")}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="e.g. Modern Villa 001"
//           />
//           {errors.title && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.title.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Slug (auto)
//           </label>
//           <input
//             {...register("slug")}
//             disabled={isEditing}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white/50 placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors disabled:opacity-50"
//           />
//           {errors.slug && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.slug.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Category
//           </label>
//           <select
//             {...register("category_id")}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white focus:border-[var(--brand-primary)] outline-none transition-colors"
//           >
//             <option value="">Select category</option>
//             {categories?.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//           {errors.category_id && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.category_id.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Style
//           </label>
//           <select
//             {...register("style")}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white focus:border-[var(--brand-primary)] outline-none transition-colors"
//           >
//             {STYLE_OPTIONS.map((s) => (
//               <option key={s} value={s}>
//                 {s}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Status
//           </label>
//           <select
//             {...register("status")}
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white focus:border-[var(--brand-primary)] outline-none transition-colors"
//           >
//             {STATUS_OPTIONS.map((s) => (
//               <option key={s.value} value={s.value}>
//                 {s.label}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Price ($) *
//           </label>
//           <input
//             {...register("price")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="500000"
//           />
//           {errors.price && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.price.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="flex items-center gap-2">
//         <input
//           {...register("is_featured")}
//           type="checkbox"
//           id="is_featured"
//           className="w-4 h-4 rounded border-white/20 bg-white/5 text-[var(--brand-primary)] focus:ring-[var(--brand-primary)]"
//         />
//         <label htmlFor="is_featured" className="text-[13px] text-white/70">
//           Featured on homepage
//         </label>
//       </div>
//     </div>
//   );
// }
import { STATUS_OPTIONS, STYLE_OPTIONS } from "../constants";

export function BasicInfoStep({ register, errors, isEditing, categories }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Title *
          </label>
          <input
            {...register("title")}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-colors"
            placeholder="e.g. Modern Villa 001"
          />
          {errors.title && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Slug (auto)
          </label>
          <input
            {...register("slug")}
            disabled={isEditing}
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-500 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors disabled:opacity-50"
          />
          {errors.slug && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.slug.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Category
          </label>
          <select
            {...register("category_id")}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:border-teal-500 outline-none transition-colors"
          >
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.category_id.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Style
          </label>
          <select
            {...register("style")}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:border-teal-500 outline-none transition-colors"
          >
            {STYLE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:border-teal-500 outline-none transition-colors"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Price ($) *
          </label>
          <input
            {...register("price")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="500000"
          />
          {errors.price && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          {...register("is_featured")}
          type="checkbox"
          id="is_featured"
          className="w-4 h-4 rounded border-gray-300 bg-white text-teal-600 focus:ring-teal-500"
        />
        <label htmlFor="is_featured" className="text-[13px] text-gray-600">
          Featured on homepage
        </label>
      </div>
    </div>
  );
}
