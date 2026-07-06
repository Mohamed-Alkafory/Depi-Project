// export function SpecificationsStep({ register, errors }) {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Area (m²) *
//           </label>
//           <input
//             {...register("area")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="250"
//           />
//           {errors.area && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.area.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Bedrooms *
//           </label>
//           <input
//             {...register("bedrooms")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="4"
//           />
//           {errors.bedrooms && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.bedrooms.message}
//             </p>
//           )}
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Bathrooms *
//           </label>
//           <input
//             {...register("bathrooms")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="3"
//           />
//           {errors.bathrooms && (
//             <p className="text-[11px] text-red-400 mt-1">
//               {errors.bathrooms.message}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-4">
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Floors
//           </label>
//           <input
//             {...register("floors")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="2"
//           />
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Garage Spots
//           </label>
//           <input
//             {...register("garage")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder="2"
//           />
//         </div>
//         <div>
//           <label className="block text-[13px] font-medium text-white/70 mb-1">
//             Year Built
//           </label>
//           <input
//             {...register("year_built")}
//             type="number"
//             className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//             placeholder={String(new Date().getFullYear())}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export function SpecificationsStep({ register, errors }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Area (m²) *
          </label>
          <input
            {...register("area")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="250"
          />
          {errors.area && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.area.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Bedrooms *
          </label>
          <input
            {...register("bedrooms")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="4"
          />
          {errors.bedrooms && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.bedrooms.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Bathrooms *
          </label>
          <input
            {...register("bathrooms")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="3"
          />
          {errors.bathrooms && (
            <p className="text-[11px] text-red-500 mt-1">
              {errors.bathrooms.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Floors
          </label>
          <input
            {...register("floors")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="2"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Garage Spots
          </label>
          <input
            {...register("garage")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder="2"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-gray-600 mb-1">
            Year Built
          </label>
          <input
            {...register("year_built")}
            type="number"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
            placeholder={String(new Date().getFullYear())}
          />
        </div>
      </div>
    </div>
  );
}
