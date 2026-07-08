// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { motion } from "framer-motion";
// // import {
// //   Mail,
// //   Lock,
// //   User,
// //   ArrowRight,
// //   AlertCircle,
// //   CheckCircle,
// // } from "lucide-react";
// // import { useSignup } from "@/features/auth/hooks/useSignup";
// // import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
// // import { signupSchema } from "@/features/auth/schemas/signupSchema";
// // import { AuthInput } from "./AuthInput";
// // import { AuthButton } from "./AuthButton";
// // import { AuthDivider } from "./AuthDivider";
// // import { GoogleIcon } from "./GoogleIcon";

// // export function SignUpForm({ onSwitchMode }) {
// //   const { mutate: signup, isPending: isSignupPending } = useSignup();
// //   const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();
// //   const [error, setError] = useState(null);
// //   const [success, setSuccess] = useState(false);

// //   const isPending = isSignupPending || isGooglePending;

// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     resolver: zodResolver(signupSchema),
// //   });

// //   const onSubmit = (data) => {
// //     setError(null);
// //     signup(data, {
// //       onSuccess: () => setSuccess(true),
// //       onError: (err) => setError(err.message),
// //     });
// //   };

// //   const handleGoogle = () => {
// //     setError(null);
// //     googleLogin(undefined, {
// //       onError: (err) => setError(err.message),
// //     });
// //   };

// //   if (success) {
// //     return (
// //       <motion.div
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={{ opacity: 1, scale: 1 }}
// //         className="text-center py-8 relative z-10"
// //       >
// //         <motion.div
// //           initial={{ scale: 0 }}
// //           animate={{ scale: 1 }}
// //           transition={{ type: "spring", delay: 0.2 }}
// //           className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
// //         >
// //           <CheckCircle className="w-8 h-8 text-green-400" />
// //         </motion.div>
// //         <h2 className="text-xl font-bold text-white mb-2">Account Created!</h2>
// //         <p className="text-white/60 text-sm mb-6">
// //           Check your email to confirm your account.
// //         </p>
// //         <button
// //           onClick={onSwitchMode}
// //           className="text-white/80 hover:text-white text-sm underline"
// //         >
// //           Go to Sign In
// //         </button>
// //       </motion.div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: 20 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       exit={{ opacity: 0, x: -20 }}
// //       transition={{ duration: 0.3 }}
// //       className="relative z-10"
// //     >
// //       {/* Header */}
// //       <div className="text-center space-y-1 mb-6">
// //         <motion.div
// //           initial={{ scale: 0.5, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           transition={{ type: "spring", duration: 0.5 }}
// //           className="mx-auto w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-3 overflow-hidden"
// //         >
// //           <img
// //             src="/logo.png"
// //             alt="Logo"
// //             className="w-15 h-15 object-contain"
// //             onError={(e) => {
// //               e.target.style.display = "none";
// //             }}
// //           />
// //         </motion.div>
// //         <h2 className="text-sm font-medium text-white/70 tracking-wider">
// //           Homi
// //         </h2>
// //         <h1 className="text-xl font-bold text-white">Create Account</h1>
// //         <p className="text-white/60 text-xs">Join us today</p>
// //       </div>

// //       {/* Error */}
// //       {(error || errors.root) && (
// //         <motion.div
// //           initial={{ opacity: 0, y: -10 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-2"
// //         >
// //           <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
// //           <p className="text-xs text-red-300">
// //             {error || errors.root?.message}
// //           </p>
// //         </motion.div>
// //       )}

// //       {/* Form */}
// //       <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
// //         <motion.div
// //           initial={{ opacity: 0, height: 0 }}
// //           animate={{ opacity: 1, height: "auto" }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           <AuthInput
// //             icon={User}
// //             type="text"
// //             placeholder="Full name"
// //             error={errors.fullName?.message}
// //             {...register("fullName")}
// //           />
// //         </motion.div>

// //         <AuthInput
// //           icon={Mail}
// //           type="email"
// //           placeholder="Email address"
// //           error={errors.email?.message}
// //           {...register("email")}
// //         />

// //         <AuthInput
// //           icon={Lock}
// //           type="password"
// //           placeholder="Password"
// //           error={errors.password?.message}
// //           {...register("password")}
// //         />

// //         <motion.div
// //           initial={{ opacity: 0, height: 0 }}
// //           animate={{ opacity: 1, height: "auto" }}
// //           transition={{ duration: 0.3 }}
// //         >
// //           <AuthInput
// //             icon={Lock}
// //             type="password"
// //             placeholder="Confirm password"
// //             error={errors.confirmPassword?.message}
// //             {...register("confirmPassword")}
// //           />
// //         </motion.div>

// //         <AuthButton loading={isPending}>
// //           Create Account <ArrowRight className="w-3 h-3" />
// //         </AuthButton>
// //       </form>

// //       <AuthDivider />

// //       {/* Google */}
// //       <AuthButton variant="google" onClick={handleGoogle} loading={isPending}>
// //         <GoogleIcon size={16} />
// //         <span className="text-white/80 text-xs">Sign up with Google</span>
// //       </AuthButton>

// //       {/* Toggle */}
// //       <motion.p
// //         className="text-center text-xs text-white/60 pt-3"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ delay: 0.5 }}
// //       >
// //         Already have an account?{" "}
// //         <button
// //           onClick={onSwitchMode}
// //           className="text-white hover:text-white/70 font-medium hover:underline transition-all"
// //         >
// //           Sign in
// //         </button>
// //       </motion.p>
// //     </motion.div>
// //   );
// }
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useSignup } from "@/features/auth/hooks/useSignup";
import { useGoogleLogin } from "@/features/auth/hooks/useGoogleLogin";
import { signupSchema } from "@/features/auth/schemas/signupSchema";
import { AuthInput } from "./AuthInput";
import { AuthButton } from "./AuthButton";
import { AuthDivider } from "./AuthDivider";
import { GoogleIcon } from "./GoogleIcon";

export function SignUpForm({ onSwitchMode }) {
  const { mutate: signup, isPending: isSignupPending } = useSignup();
  const { mutate: googleLogin, isPending: isGooglePending } = useGoogleLogin();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isPending = isSignupPending || isGooglePending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data) => {
    setError(null);
    signup(data, {
      onSuccess: () => setSuccess(true),
      onError: (err) => setError(err.message),
    });
  };

  const handleGoogle = () => {
    setError(null);
    googleLogin(undefined, {
      onError: (err) => setError(err.message),
    });
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-500" />
        </motion.div>
        {/* 🎨 WHITE THEME */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Account Created!
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Check your email to confirm your account.
        </p>
        <button
          onClick={onSwitchMode}
          className="text-gray-700 hover:text-gray-900 text-sm underline"
        >
          Go to Sign In
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="relative z-10"
    >
      {/* Header */}
      <div className="text-center space-y-1 mb-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          // 🎨 WHITE THEME
          className="mx-auto w-16 h-16 rounded-full border border-black/10 flex items-center justify-center mb-3 overflow-hidden"
        >
          {/* 🐛 NOTE: "/logo.png" here vs "/homi-logo.png" in SignInForm — same
              filename mismatch flagged there. Pick one real file. */}
          <img
            src="/homi-logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </motion.div>
        {/* 🎨 WHITE THEME */}
        <h2 className="text-lg font-medium text-gray-500 tracking-wider">
          Homi
        </h2>
        <h1 className="text-xl font-bold text-gray-900">Create Account</h1>
        <p className="text-gray-500 text-xs">Join us today</p>
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <AuthInput
            icon={User}
            type="text"
            placeholder="Full name"
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </motion.div>

        <AuthInput
          icon={Mail}
          type="email"
          placeholder="Email address"
          error={errors.email?.message}
          {...register("email")}
        />

        <AuthInput
          icon={Lock}
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register("password")}
        />

        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <AuthInput
            icon={Lock}
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
        </motion.div>

        <AuthButton loading={isPending}>
          Create Account <ArrowRight className="w-3 h-3" />
        </AuthButton>
      </form>

      <AuthDivider />

      {/* Google */}
      <AuthButton variant="google" onClick={handleGoogle} loading={isPending}>
        <GoogleIcon size={16} />
        {/* 🎨 WHITE THEME */}
        <span className="text-gray-700 text-xs">Sign up with Google</span>
      </AuthButton>

      {/* Toggle */}
      <motion.p
        // 🎨 WHITE THEME
        className="text-center text-xs text-gray-500 pt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Already have an account?{" "}
        <button
          onClick={onSwitchMode}
          // 🎨 WHITE THEME
          className="text-gray-900 hover:text-gray-600 font-medium hover:underline transition-all"
        >
          Sign in
        </button>
      </motion.p>
    </motion.div>
  );
}
