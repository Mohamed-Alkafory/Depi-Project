// // import { useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";

// // export function AuthInput({
// //   icon: Icon,
// //   type = "text",
// //   placeholder,
// //   value,
// //   onChange,
// //   onFocus,
// //   onBlur,
// //   required = false,
// // }) {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isFocused, setIsFocused] = useState(false);
// //   const isPassword = type === "password";
// //   const inputType = isPassword ? (showPassword ? "text" : "password") : type;

// //   return (
// //     <div className="relative">
// //       <Icon
// //         className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 ${
// //           isFocused ? "text-white" : "text-white/40"
// //         }`}
// //       />
// //       <input
// //         type={inputType}
// //         placeholder={placeholder}
// //         value={value}
// //         onChange={onChange}
// //         onFocus={(e) => {
// //           setIsFocused(true);
// //           onFocus?.(e);
// //         }}
// //         onBlur={(e) => {
// //           setIsFocused(false);
// //           onBlur?.(e);
// //         }}
// //         required={required}
// //         className="w-full bg-white/5 border border-transparent focus:border-white/20 text-white placeholder:text-white/30 h-10 pl-10 pr-10 rounded-lg text-sm outline-none transition-all"
// //       />
// //       {isPassword && (
// //         <div
// //           onClick={() => setShowPassword(!showPassword)}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
// //         >
// //           {showPassword ? (
// //             <Eye className="w-4 h-4 text-white/40 hover:text-white" />
// //           ) : (
// //             <EyeOff className="w-4 h-4 text-white/40 hover:text-white" />
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // src/features/auth/components/AuthDivider.jsx
// import { motion } from "framer-motion";

// export function AuthDivider() {
//   return (
//     <div className="relative flex items-center gap-4 py-4">
//       <div className="h-px flex-1 bg-white/10" />
//       <span className="text-xs text-white/40 uppercase tracking-wider">or</span>
//       <div className="h-px flex-1 bg-white/10" />
//     </div>
//   );
// }
// src/features/auth/components/AuthDivider.jsx
// 🐛 CLEANUP: this file previously had ~40 lines of a stale, commented-out
// copy of AuthInput.jsx pasted above the real component. Removed entirely —
// it did nothing and was just confusing to read.
// import { motion } from "framer-motion";

export function AuthDivider() {
  return (
    <div className="relative flex items-center gap-4 py-4">
      {/* 🎨 WHITE THEME: black/10 lines + gray text instead of white/10 + white/40 */}
      <div className="h-px flex-1 bg-black/10" />
      <span className="text-xs text-gray-400 uppercase tracking-wider">or</span>
      <div className="h-px flex-1 bg-black/10" />
    </div>
  );
}
