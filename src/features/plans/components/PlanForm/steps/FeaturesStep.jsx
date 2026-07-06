// import { motion, AnimatePresence } from "framer-motion";
// import { Plus, Trash2, GripVertical } from "lucide-react";

// export function FeaturesStep({
//   features,
//   newFeature,
//   setNewFeature,
//   addFeature,
//   removeFeature,
// }) {
//   return (
//     <div className="space-y-4">
//       <div className="flex gap-2">
//         <input
//           value={newFeature}
//           onChange={(e) => setNewFeature(e.target.value)}
//           onKeyDown={(e) =>
//             e.key === "Enter" && (e.preventDefault(), addFeature())
//           }
//           className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[14px] text-white placeholder:text-white/30 focus:border-[var(--brand-primary)] outline-none transition-colors"
//           placeholder="Add a feature (e.g. Smart Home, Swimming Pool)"
//         />
//         <button
//           type="button"
//           onClick={addFeature}
//           className="bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//         </button>
//       </div>

//       <div className="space-y-2">
//         <AnimatePresence>
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2"
//             >
//               <GripVertical className="w-3 h-3 text-white/20" />
//               <span className="flex-1 text-[13px] text-white">{feature}</span>
//               <button
//                 type="button"
//                 onClick={() => removeFeature(index)}
//                 className="text-white/40 hover:text-red-400 transition-colors"
//               >
//                 <Trash2 className="w-3.5 h-3.5" />
//               </button>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         {features.length === 0 && (
//           <p className="text-center text-[13px] text-white/30 py-8">
//             No features added yet
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, GripVertical } from "lucide-react";

export function FeaturesStep({
  features,
  newFeature,
  setNewFeature,
  addFeature,
  removeFeature,
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={newFeature}
          onChange={(e) => setNewFeature(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addFeature())
          }
          className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 placeholder:text-gray-400 focus:border-teal-500 outline-none transition-colors"
          placeholder="Add a feature (e.g. Smart Home, Swimming Pool)"
        />
        <button
          type="button"
          onClick={addFeature}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2"
            >
              <GripVertical className="w-3 h-3 text-gray-400" />
              <span className="flex-1 text-[13px] text-gray-800">
                {feature}
              </span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {features.length === 0 && (
          <p className="text-center text-[13px] text-gray-400 py-8">
            No features added yet
          </p>
        )}
      </div>
    </div>
  );
}
