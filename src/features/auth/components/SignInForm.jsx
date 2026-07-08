// // // import { useState } from "react";
// // // import { useForm } from "react-hook-form";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // import { motion } from "framer-motion";
// // // import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
// // // import { useLogin } from "@/features/auth/hooks/useLogin";
// // // import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
// // // import { loginSchema } from "@/features/auth/schemas/loginSchema";
// // // import { AuthInput } from "./AuthInput";
// // // import { AuthButton } from "./AuthButton";
// // // import { AuthDivider } from "./AuthDivider";
// // // import { GoogleIcon } from "./GoogleIcon";

// // // export function SignInForm({ onSwitchMode, onSuccess }) {
// // //   const { mutate: login, isPending: isLoginPending } = useLogin();
// // //   const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();
// // //   const [error, setError] = useState(null);

// // //   const isPending = isLoginPending || isGooglePending;

// // //   const {
// // //     register,
// // //     handleSubmit,
// // //     formState: { errors },
// // //   } = useForm({
// // //     resolver: zodResolver(loginSchema),
// // //   });

// // //   const onSubmit = (data) => {
// // //     setError(null);
// // //     login(data, {
// // //       onSuccess: () => onSuccess?.(),
// // //       onError: (err) => setError(err.message),
// // //     });
// // //   };

// // //   const handleGoogle = () => {
// // //     setError(null);
// // //     googleLogin(undefined, {
// // //       onError: (err) => setError(err.message),
// // //     });
// // //   };

// // //   return (
// // //     <motion.div
// // //       initial={{ opacity: 0, x: -20 }}
// // //       animate={{ opacity: 1, x: 0 }}
// // //       exit={{ opacity: 0, x: 20 }}
// // //       transition={{ duration: 0.3 }}
// // //       className="relative z-10"
// // //     >
// // //       {/* Header */}
// // //       <div className="text-center space-y-1 mb-6">
// // //         <motion.div
// // //           initial={{ scale: 0.5, opacity: 0 }}
// // //           animate={{ scale: 1, opacity: 1 }}
// // //           transition={{ type: "spring", duration: 0.5 }}
// // //           className="mx-auto w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-3 overflow-hidden"
// // //         >
// // //           <img
// // //             src="/homi-logo.png"
// // //             alt="Logo"
// // //             className="w-10 h-10 object-contain"
// // //             onError={(e) => {
// // //               e.target.style.display = "none";
// // //             }}
// // //           />
// // //         </motion.div>
// // //         <h2 className="text-sm font-medium text-white/70 tracking-wider">
// // //           Homi
// // //         </h2>
// // //         <h1 className="text-xl font-bold text-white">Welcome Back</h1>
// // //         <p className="text-white/60 text-xs">Sign in to continue</p>
// // //       </div>

// // //       {/* Error */}
// // //       {(error || errors.root) && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: -10 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
// // //         >
// // //           <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
// // //           <p className="text-xs text-red-300">
// // //             {error || errors.root?.message}
// // //           </p>
// // //         </motion.div>
// // //       )}

// // //       {/* Form */}
// // //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
// // //         <AuthInput
// // //           icon={Mail}
// // //           type="email"
// // //           placeholder="Email address"
// // //           error={errors.email?.message}
// // //           {...register("email")}
// // //         />
// // //         <AuthInput
// // //           icon={Lock}
// // //           type="password"
// // //           placeholder="Password"
// // //           error={errors.password?.message}
// // //           {...register("password")}
// // //         />

// // //         <AuthButton loading={isPending}>
// // //           Sign In <ArrowRight className="w-3 h-3" />
// // //         </AuthButton>
// // //       </form>

// // //       <AuthDivider />

// // //       {/* Google */}
// // //       <AuthButton variant="google" onClick={handleGoogle} loading={isPending}>
// // //         <GoogleIcon size={16} />
// // //         <span className="text-white/80 text-xs">Sign in with Google</span>
// // //       </AuthButton>

// // //       {/* Toggle */}
// // //       <motion.p
// // //         className="text-center text-xs text-white/60 pt-3"
// // //         initial={{ opacity: 0 }}
// // //         animate={{ opacity: 1 }}
// // //         transition={{ delay: 0.5 }}
// // //       >
// // //         Don&apos;t have an account?{" "}
// // //         <button
// // //           onClick={onSwitchMode}
// // //           className="text-white hover:text-white/70 font-medium hover:underline transition-all"
// // //         >
// // //           Sign up
// // //         </button>
// // //       </motion.p>
// // //     </motion.div>
// // //   );
// // // }

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { loginSchema } from "@/features/auth/schemas/loginSchema";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthDivider } from "./AuthDivider";
import { GoogleIcon } from "./GoogleIcon";

export function SignInForm({ onSwitchMode, onSuccess }) {
  const { mutate: login, isPending: isLoginPending } = useLogin();
  const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();
  const [error, setError] = useState(null);

  const isPending = isLoginPending || isGooglePending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setError(null);
    login(data, {
      onSuccess: () => onSuccess?.(),
      onError: (err) => setError(err.message),
    });
  };

  const handleGoogle = () => {
    setError(null);
    googleLogin(undefined, {
      onError: (err) => setError(err.message),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      {/* Header */}
      <div className="text-center space-y-1 mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          // 🎨 WHITE THEME: logo circle border flipped from white/10 to black/10
          className="mx-auto w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-3 overflow-hidden"
        >
          {/* 🐛 NOTE: still "/homi-logo.png" here vs "/logo.png" in SignUpForm.
              Pick ONE filename that actually exists in /public and use it in
              both forms — left as "/homi-logo.png" for now, change if wrong. */}
          <img
            src="/homi-logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </motion.div>
        {/* 🎨 WHITE THEME: all text-white/x → gray-scale equivalents below */}
        <h2 className="text-lg font-medium text-gray-500 tracking-wider">
          Homi
        </h2>
        <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-500 text-xs">Sign in to continue</p>
      </div>

      {/* Error */}
      {(error || errors.root) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-500">
            {error || errors.root?.message}
          </p>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <AuthInput
          icon={Mail}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
          {...register("email")}
        />
        {/* <AuthInput
          icon={Mail} // ← Lucide icon component
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}
        <AuthInput
          icon={Lock}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <AuthButton loading={isPending}>
          Sign In <ArrowRight className="w-3 h-3" />
        </AuthButton>
      </form>

      <AuthDivider />

      {/* Google */}
      <AuthButton variant="google" onClick={handleGoogle} loading={isPending}>
        <GoogleIcon size={16} />
        {/* 🎨 WHITE THEME */}
        <span className="text-gray-700 text-xs">Sign in with Google</span>
      </AuthButton>

      {/* Toggle */}
      <motion.p
        // 🎨 WHITE THEME
        className="text-center text-xs text-gray-500 pt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Don&apos;t have an account?{" "}
        <button
          onClick={onSwitchMode}
          // 🎨 WHITE THEME
          className="text-gray-900 hover:text-gray-600 font-medium hover:underline transition-all"
        >
          Sign up
        </button>
      </motion.p>
    </motion.div>
  );
}
