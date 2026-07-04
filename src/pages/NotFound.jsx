import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden flex items-center justify-center">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 via-white to-neutral-100" />

      {/* Decorative large faded 404 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[40vw] font-bold leading-none tracking-tighter text-neutral-100">
          404
        </span>
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Main 404 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
            className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-400 block"
          >
            404
          </motion.span>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-neutral-800">
            Page Not Found
          </h2>
          <p className="text-neutral-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Sorry, the page you are looking for does not exist or has been
            moved.
          </p>

          {/* Go Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="pt-6"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-full text-sm font-medium transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
