import { motion } from "framer-motion";

export function AuthButton({
  loading,
  children,
  onClick,
  type = "submit",
  variant = "primary",
}) {
  const baseClass = "w-full relative group/button";

  // src/features/auth/components/AuthButton.jsx
  // أضف في الـ variants object:
  const variants = {
    primary: "bg-white text-black",
    google:
      "bg-white/5 text-white border border-white/10 hover:border-white/20",
    danger:
      "bg-red-500/20 text-red-300 border border-red-500/30 hover:border-red-500/50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={loading}
      className={baseClass}
    >
      {variant === "primary" && (
        <div className="absolute inset-0 bg-white/10 rounded-lg blur-lg opacity-0 group-hover/button:opacity-70 transition-opacity" />
      )}
      <div
        className={`relative overflow-hidden font-medium h-10 rounded-lg flex items-center justify-center ${variants[variant]}`}
      >
        {variant === "primary" && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -z-10"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
            style={{
              opacity: loading ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
        <span className="flex items-center gap-1 text-sm font-medium">
          {loading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            children
          )}
        </span>
      </div>
    </motion.button>
  );
}
