// export function DescriptionStep({ register }) {
//   return (
//     <div className="space-y-4">
//       <div>
//         <label className="block text-[13px] font-medium text-white/70 mb-1">
//           Short Description
//         </label>
//         <input
//           {...register("short_description")}
//           className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//           placeholder="Brief summary for cards..."
//         />
//       </div>
//       <div>
//         <label className="block text-[13px] font-medium text-white/70 mb-1">
//           Long Description
//         </label>
//         <textarea
//           {...register("long_description")}
//           rows={6}
//           className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors resize-none"
//           placeholder="Detailed description for plan detail page..."
//         />
//       </div>
//     </div>
//   );
// }

export function DescriptionStep({ register }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1">
          Short Description
        </label>
        <input
          {...register("short_description")}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
          placeholder="Brief summary for cards..."
        />
      </div>
      <div>
        <label className="block text-[13px] font-medium text-gray-600 mb-1">
          Long Description
        </label>
        <textarea
          {...register("long_description")}
          rows={6}
          className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors resize-none"
          placeholder="Detailed description for plan detail page..."
        />
      </div>
    </div>
  );
}
