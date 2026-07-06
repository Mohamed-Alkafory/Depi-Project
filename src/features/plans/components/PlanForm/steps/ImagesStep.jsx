// import { motion, AnimatePresence } from "framer-motion";
// import { X, Upload } from "lucide-react";
// import { IMAGE_TYPES } from "../constants";

// export function ImagesStep({
//   images,
//   uploading,
//   handleImageUpload,
//   removeImage,
//   setImageType,
// }) {
//   return (
//     <div className="space-y-4">
//       <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-[var(--brand-primary)]/50 transition-colors">
//         <input
//           type="file"
//           multiple
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//           id="image-upload"
//         />
//         <label htmlFor="image-upload" className="cursor-pointer">
//           <Upload className="w-8 h-8 text-white/30 mx-auto mb-2" />
//           <p className="text-[13px] text-white/50">Click to upload images</p>
//           <p className="text-[11px] text-white/30">PNG, JPG up to 10MB</p>
//         </label>
//         {uploading && (
//           <div className="mt-4 flex items-center justify-center gap-2">
//             <div className="w-4 h-4 border-2 border-white/20 border-t-[var(--brand-primary)] rounded-full animate-spin" />
//             <span className="text-[12px] text-white/50">Uploading...</span>
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-3 gap-3">
//         <AnimatePresence>
//           {images.map((img, index) => (
//             <motion.div
//               key={img.url || index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="relative aspect-square rounded-lg overflow-hidden bg-white/5 group"
//             >
//               <img
//                 src={img.url}
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeImage(index)}
//                 className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
//               >
//                 <X className="w-3 h-3" />
//               </button>
//               <select
//                 value={img.type}
//                 onChange={(e) => setImageType(index, e.target.value)}
//                 className="absolute bottom-2 left-2 right-2 bg-black/60 text-white text-[11px] rounded px-2 py-1 outline-none"
//               >
//                 {IMAGE_TYPES.map((t) => (
//                   <option key={t.value} value={t.value}>
//                     {t.label}
//                   </option>
//                 ))}
//               </select>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { IMAGE_TYPES } from "../constants";

export function ImagesStep({
  images,
  uploading,
  handleImageUpload,
  removeImage,
  setImageType,
}) {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors bg-gray-50">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload" className="cursor-pointer">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-[13px] text-gray-600">Click to upload images</p>
          <p className="text-[11px] text-gray-400">PNG, JPG up to 10MB</p>
        </label>
        {uploading && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-300 border-t-teal-600 rounded-full animate-spin" />
            <span className="text-[12px] text-gray-500">Uploading...</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <AnimatePresence>
          {images.map((img, index) => (
            <motion.div
              key={img.url || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200 group"
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500/90 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
              <select
                value={img.type}
                onChange={(e) => setImageType(index, e.target.value)}
                className="absolute bottom-2 left-2 right-2 bg-white/90 text-gray-800 text-[11px] rounded px-2 py-1 outline-none border border-gray-200"
              >
                {IMAGE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
