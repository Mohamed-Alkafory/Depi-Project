// // // src/features/auth/components/AuthInput.jsx
// // import { forwardRef, useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";

// // export const AuthInput = forwardRef(function AuthInput(
// //   { icon: Icon, type = "text", placeholder, error, ...props },
// //   ref,
// // ) {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isFocused, setIsFocused] = useState(false);
// //   const isPassword = type === "password";
// //   const inputType = isPassword ? (showPassword ? "text" : "password") : type;

// //   return (
// //     <div className="relative">
// //       <Icon
// //         className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 z-10 ${
// //           isFocused ? "text-white" : "text-white/40"
// //         }`}
// //       />
// //       <input
// //         ref={ref}
// //         type={inputType}
// //         placeholder={placeholder}
// //         onFocus={(e) => {
// //           setIsFocused(true);
// //           props.onFocus?.(e);
// //         }}
// //         onBlur={(e) => {
// //           setIsFocused(false);
// //           props.onBlur?.(e);
// //         }}
// //         className={`dark-input w-full bg-white/5 text-white placeholder:text-white/30 h-10 pl-10 pr-10 rounded-lg text-sm outline-none transition-all ${
// //           error
// //             ? "border border-red-500/50 focus:border-red-500"
// //             : "border border-transparent focus:border-white/20"
// //         }`}
// //         {...props}
// //       />
// //       {isPassword && (
// //         <div
// //           onClick={() => setShowPassword(!showPassword)}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
// //         >
// //           {showPassword ? (
// //             <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
// //           ) : (
// //             <EyeOff className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
// //           )}
// //         </div>
// //       )}
// //       {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
// //     </div>
// //   );
// // });

// // // src/features/auth/components/AuthInput.jsx
// // import { forwardRef, useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";

// // export const AuthInput = forwardRef(function AuthInput(
// //   { icon: Icon, type = "text", placeholder, error, ...props },
// //   ref,
// // ) {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isFocused, setIsFocused] = useState(false);
// //   const isPassword = type === "password";
// //   const inputType = isPassword ? (showPassword ? "text" : "password") : type;

// //   return (
// //     <div className="relative">
// //       <Icon
// //         // 🎨 WHITE THEME: icon color flips for a light background
// //         className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 z-10 ${
// //           isFocused ? "text-gray-900" : "text-gray-400"
// //         }`}
// //       />
// //       <input
// //         // 🐛 BUG FIX: {...props} moved BEFORE the explicit onFocus/onBlur below.
// //         // It was placed after them before, so react-hook-form's own onBlur
// //         // (from {...register(...)}) silently overwrote ours, and the icon
// //         // never went back to its "unfocused" color after leaving the field.
// //         {...props}
// //         ref={ref}
// //         type={inputType}
// //         placeholder={placeholder}
// //         onFocus={(e) => {
// //           setIsFocused(true);
// //           props.onFocus?.(e);
// //         }}
// //         onBlur={(e) => {
// //           setIsFocused(false);
// //           props.onBlur?.(e);
// //         }}
// //         // 🎨 WHITE THEME: dark-on-white text/background instead of white-on-dark
// //         // className={`w-full bg-black/5 text-gray-900 placeholder:text-gray-400 h-10 pl-10 pr-10 rounded-lg text-sm outline-none transition-all ${
// //         //   error
// //         //     ? "border border-red-500/50 focus:border-red-500"
// //         //     : "border border-transparent focus:border-black/20"
// //         // }`}
// //         // في AuthInput.jsx، عدّلي كلاس الـ input:
// //         className={` dark-input w-full bg-black/5 text-gray-900 placeholder:text-gray-400 h-10 pl-10 pr-10 rounded-lg text-sm outline-none transition-all ${
// //           error
// //             ? "border border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
// //             : "border border-transparent focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20"
// //         }`}
// //       />
// //       {isPassword && (
// //         <div
// //           onClick={() => setShowPassword(!showPassword)}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
// //         >
// //           {showPassword ? (
// //             // 🎨 WHITE THEME
// //             <Eye className="w-4 h-4 text-gray-400 hover:text-gray-900 transition-colors" />
// //           ) : (
// //             <EyeOff className="w-4 h-4 text-gray-400 hover:text-gray-900 transition-colors" />
// //           )}
// //         </div>
// //       )}
// //       {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
// //     </div>
// //   );
// // });

// // import { forwardRef, useState } from "react";
// // import { Eye, EyeOff } from "lucide-react";

// // export const AuthInput = forwardRef(function AuthInput(
// //   { icon: Icon, type = "text", placeholder, error, ...props },
// //   ref,
// // ) {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [isFocused, setIsFocused] = useState(false);
// //   const isPassword = type === "password";
// //   const inputType = isPassword ? (showPassword ? "text" : "password") : type;

// //   return (
// //     <div className="relative">
// //       {/* Icon - Lucide React Component */}
// //       {Icon && (
// //         <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
// //           <Icon
// //             size={16}
// //             className={`transition-all duration-300 ${
// //               isFocused ? "text-[#0D7377]" : "text-gray-400"
// //             }`}
// //           />
// //         </div>
// //       )}

// //       <input
// //         {...props}
// //         ref={ref}
// //         type={inputType}
// //         placeholder={placeholder}
// //         onFocus={(e) => {
// //           setIsFocused(true);
// //           props.onFocus?.(e);
// //         }}
// //         onBlur={(e) => {
// //           setIsFocused(false);
// //           props.onBlur?.(e);
// //         }}
// //         className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 h-11 pl-10 pr-10 rounded-xl text-sm outline-none transition-all border ${
// //           error
// //             ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
// //             : "border-gray-200 focus:border-[#0D7377] focus:ring-2 focus:ring-[#0D7377]/20"
// //         }`}
// //       />

// //       {/* Password toggle - Lucide React */}
// //       {isPassword && (
// //         <button
// //           type="button"
// //           onClick={() => setShowPassword(!showPassword)}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1"
// //         >
// //           {showPassword ? (
// //             <Eye
// //               size={16}
// //               className="text-gray-400 hover:text-gray-600 transition-colors"
// //             />
// //           ) : (
// //             <EyeOff
// //               size={16}
// //               className="text-gray-400 hover:text-gray-600 transition-colors"
// //             />
// //           )}
// //         </button>
// //       )}

// //       {/* Error message */}
// //       {error && <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>}
// //     </div>
// //   );
// // });

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export const AuthInput = forwardRef(function AuthInput(
  { icon: Icon, type = "text", placeholder, error, ...props },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="relative">
      {/* ✅ Icon - محطوط في div مع absolute */}
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Icon
            size={18}
            className={`transition-all duration-300 ${
              isFocused ? "text-[#0D7377]" : "text-gray-400"
            }`}
          />
        </div>
      )}

      <input
        {...props}
        ref={ref}
        type={inputType}
        placeholder={placeholder}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        className={`w-full bg-gray-50 text-gray-900 placeholder:text-gray-400 h-12 pl-11 pr-11 rounded-xl text-sm outline-none transition-all border ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-200 focus:border-[#0D7377] focus:ring-2 focus:ring-[#0D7377]/20"
        }`}
      />

      {/* ✅ Password toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {showPassword ? (
            <Eye
              size={18}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            />
          ) : (
            <EyeOff
              size={18}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            />
          )}
        </button>
      )}

      {error && <p className="text-xs text-red-500 mt-1.5 ml-1">{error}</p>}
    </div>
  );
});
