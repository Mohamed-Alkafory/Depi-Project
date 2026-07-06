// // import { motion } from "framer-motion";

// // export function ConfirmDialog({
// //   title,
// //   message,
// //   onConfirm,
// //   onCancel,
// //   isLoading,
// // }) {
// //   return (
// //     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
// //       <motion.div
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         exit={{ opacity: 0 }}
// //         className="absolute inset-0 bg-black/60 backdrop-blur-sm"
// //         onClick={onCancel}
// //       />
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.95 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         exit={{ opacity: 0, scale: 0.95 }}
// //         className="relative w-full max-w-sm bg-gray-900 border border-white/10 rounded-2xl shadow-2xl p-6"
// //       >
// //         <h3 className="text-[16px] font-bold text-white mb-2">{title}</h3>
// //         <p className="text-[13px] text-white/50 mb-6">{message}</p>
// //         <div className="flex justify-end gap-2">
// //           <button
// //             type="button"
// //             onClick={onCancel}
// //             className="px-4 py-2 rounded-lg text-[13px] font-medium text-white/60 hover:bg-white/5"
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="button"
// //             onClick={onConfirm}
// //             disabled={isLoading}
// //             className="px-4 py-2 rounded-lg text-[13px] font-medium bg-red-500/90 hover:bg-red-500 text-white disabled:opacity-50"
// //           >
// //             {isLoading ? "Deleting..." : "Delete"}
// //           </button>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // }

// import { motion } from "framer-motion";

// export function ConfirmDialog({
//   title,
//   message,
//   onConfirm,
//   onCancel,
//   isLoading,
// }) {
//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/40 backdrop-blur-sm"
//         onClick={onCancel}
//       />
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl p-6"
//       >
//         <h3 className="text-[16px] font-bold text-gray-900 mb-2">{title}</h3>
//         <p className="text-[13px] text-gray-500 mb-6">{message}</p>
//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={onConfirm}
//             disabled={isLoading}
//             className="px-4 py-2 rounded-lg text-[13px] font-medium bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 transition-colors"
//           >
//             {isLoading ? "Deleting..." : "Delete"}
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
import { motion } from "framer-motion";

export function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-2xl p-6"
      >
        <h3 className="text-[16px] font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-[13px] text-gray-500 mb-6">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-[13px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg text-[13px] font-medium bg-red-500 hover:bg-red-600 text-white disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
