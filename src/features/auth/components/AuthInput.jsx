// src/features/auth/components/AuthInput.jsx
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
      <Icon
        className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all duration-300 z-10 ${
          isFocused ? "text-white" : "text-white/40"
        }`}
      />
      <input
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
        className={`dark-input w-full bg-white/5 text-white placeholder:text-white/30 h-10 pl-10 pr-10 rounded-lg text-sm outline-none transition-all ${
          error
            ? "border border-red-500/50 focus:border-red-500"
            : "border border-transparent focus:border-white/20"
        }`}
        {...props}
      />
      {isPassword && (
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
        >
          {showPassword ? (
            <Eye className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
          ) : (
            <EyeOff className="w-4 h-4 text-white/40 hover:text-white transition-colors" />
          )}
        </div>
      )}
      {error && <p className="text-xs text-red-400 mt-1 ml-1">{error}</p>}
    </div>
  );
});
