// // import { motion } from "framer-motion";

// // export function BackgroundEffects() {
// //   return (
// //     <>
// //       <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/20 via-cyan-600/40 to-cyan-700/20" />

// //       <div
// //         className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
// //         style={{
// //           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
// //           backgroundSize: "200px 200px",
// //         }}
// //       />

// //       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-cyan-400/20 blur-[80px]" />

// //       <motion.div
// //         className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-cyan-300/20 blur-[60px]"
// //         animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
// //         transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
// //       />

// //       <motion.div
// //         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-cyan-400/20 blur-[60px]"
// //         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
// //         transition={{
// //           duration: 6,
// //           repeat: Infinity,
// //           repeatType: "mirror",
// //           delay: 1,
// //         }}
// //       />

// //       <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40" />
// //       <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />
// //     </>
// //   );
// // }
// // 🎨 NOTE: this sits behind the modal (the page background), not inside
// // the white card, so it does NOT need to change for the white-card theme.
// // Left as-is; only touch this if you also want the page background lighter.
// import { motion } from "framer-motion";

// export function BackgroundEffects() {
//   return (
//     <>
//       <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/20 via-cyan-600/40 to-cyan-700/20" />

//       <div
//         className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
//           backgroundSize: "200px 200px",
//         }}
//       />

//       <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-cyan-400/20 blur-[80px]" />

//       <motion.div
//         className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-cyan-300/20 blur-[60px]"
//         animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.98, 1.02, 0.98] }}
//         transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
//       />

//       <motion.div
//         className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-cyan-400/20 blur-[60px]"
//         animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
//         transition={{
//           duration: 6,
//           repeat: Infinity,
//           repeatType: "mirror",
//           delay: 1,
//         }}
//       />

//       <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse opacity-40" />
//       <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-[100px] animate-pulse delay-1000 opacity-40" />
//     </>
//   );
// }
import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <>
      {/* Gradient background — lighter opacity */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-600/10 via-cyan-600/20 to-cyan-700/10" />

      {/* Noise texture — lighter */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Top glow — reduced blur and opacity */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-cyan-400/10 blur-[30px]" />

      {/* Animated top glow — reduced blur and opacity */}
      <motion.div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-cyan-300/10 blur-[20px]"
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [0.98, 1.02, 0.98] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Bottom glow — reduced blur and opacity */}
      <motion.div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90vh] h-[90vh] rounded-t-full bg-cyan-400/10 blur-[20px]"
        animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.1, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          delay: 1,
        }}
      />

      {/* Corner pulses — reduced blur and opacity */}
      <div className="absolute left-1/4 top-1/4 w-96 h-96 bg-white/3 rounded-full blur-[40px] animate-pulse opacity-30" />
      <div className="absolute right-1/4 bottom-1/4 w-96 h-96 bg-white/3 rounded-full blur-[40px] animate-pulse delay-1000 opacity-30" />
    </>
  );
}
