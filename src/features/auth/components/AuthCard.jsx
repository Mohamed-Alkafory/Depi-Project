// // import { motion, useMotionValue, useTransform } from "framer-motion";

// // export function AuthCard({ children }) {
// //   const mouseX = useMotionValue(0);
// //   const mouseY = useMotionValue(0);
// //   const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
// //   const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

// //   const handleMouseMove = (e) => {
// //     const rect = e.currentTarget.getBoundingClientRect();
// //     mouseX.set(e.clientX - rect.left - rect.width / 2);
// //     mouseY.set(e.clientY - rect.top - rect.height / 2);
// //   };

// //   const handleMouseLeave = () => {
// //     mouseX.set(0);
// //     mouseY.set(0);
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.8 }}
// //       className="w-full max-w-sm relative z-10 px-4"
// //       style={{ perspective: 1500 }}
// //     >
// //       <motion.div
// //         className="relative"
// //         style={{ rotateX, rotateY }}
// //         onMouseMove={handleMouseMove}
// //         onMouseLeave={handleMouseLeave}
// //         whileHover={{ z: 10 }}
// //       >
// //         <div className="relative group">
// //           {/* Card glow effect */}
// //           <motion.div
// //             className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
// //             animate={{
// //               boxShadow: [
// //                 "0 0 10px 2px rgba(255,255,255,0.03)",
// //                 "0 0 15px 5px rgba(255,255,255,0.05)",
// //                 "0 0 10px 2px rgba(255,255,255,0.03)",
// //               ],
// //               opacity: [0.2, 0.4, 0.2],
// //             }}
// //             transition={{
// //               duration: 4,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //               repeatType: "mirror",
// //             }}
// //           />

// //           {/* Traveling light beam effect */}
// //           <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
// //             <motion.div
// //               className="absolute top-0 left-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"
// //               animate={{
// //                 left: ["-50%", "100%"],
// //                 opacity: [0.3, 0.7, 0.3],
// //               }}
// //               transition={{
// //                 duration: 2.5,
// //                 ease: "easeInOut",
// //                 repeat: Infinity,
// //                 repeatDelay: 1,
// //               }}
// //             />
// //             <motion.div
// //               className="absolute top-0 right-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-70"
// //               animate={{
// //                 top: ["-50%", "100%"],
// //                 opacity: [0.3, 0.7, 0.3],
// //               }}
// //               transition={{
// //                 duration: 2.5,
// //                 ease: "easeInOut",
// //                 repeat: Infinity,
// //                 repeatDelay: 1,
// //                 delay: 0.6,
// //               }}
// //             />
// //             <motion.div
// //               className="absolute bottom-0 right-0 h-[3px] w-[50%] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70"
// //               animate={{
// //                 right: ["-50%", "100%"],
// //                 opacity: [0.3, 0.7, 0.3],
// //               }}
// //               transition={{
// //                 duration: 2.5,
// //                 ease: "easeInOut",
// //                 repeat: Infinity,
// //                 repeatDelay: 1,
// //                 delay: 1.2,
// //               }}
// //             />
// //             <motion.div
// //               className="absolute bottom-0 left-0 h-[50%] w-[3px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-70"
// //               animate={{
// //                 bottom: ["-50%", "100%"],
// //                 opacity: [0.3, 0.7, 0.3],
// //               }}
// //               transition={{
// //                 duration: 2.5,
// //                 ease: "easeInOut",
// //                 repeat: Infinity,
// //                 repeatDelay: 1,
// //                 delay: 1.8,
// //               }}
// //             />
// //           </div>

// //           {/* Card border glow */}
// //           <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-white/3 via-white/7 to-white/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

// //           {/* Glass card background */}
// //           <div className="relative bg-cyan-600/20 backdrop-blur-2xl rounded-2xl p-6 border border-white/[0.05] shadow-2xl overflow-hidden">
// //             {/* Subtle card inner patterns */}
// //             <div
// //               className="absolute inset-0 opacity-[0.03]"
// //               style={{
// //                 backgroundImage: `linear-gradient(135deg, white 0.5px, transparent 0.5px), linear-gradient(45deg, white 0.5px, transparent 0.5px)`,
// //                 backgroundSize: "30px 30px",
// //               }}
// //             />

// //             {children}
// //           </div>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }
// import { motion, useMotionValue, useTransform } from "framer-motion";

// export function AuthCard({ children }) {
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);
//   const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
//   const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     mouseX.set(e.clientX - rect.left - rect.width / 2);
//     mouseY.set(e.clientY - rect.top - rect.height / 2);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8 }}
//       className="w-full max-w-md relative z-10 px-4"
//       style={{ perspective: 1500 }}
//     >
//       <motion.div
//         className="relative"
//         style={{ rotateX, rotateY }}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         whileHover={{ z: 10 }}
//       >
//         <div className="relative group">
//           {/* Card glow effect — kept as a subtle light glow, works fine on white too */}
//           {/* <motion.div
//             className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
//             animate={{
//               boxShadow: [
//                 "0 0 10px 2px rgba(0,0,0,0.05)",
//                 "0 0 15px 5px rgba(0,0,0,0.08)",
//                 "0 0 10px 2px rgba(0,0,0,0.05)",
//               ],
//               opacity: [0.2, 0.4, 0.2],
//             }}
//             transition={{
//               duration: 4,
//               repeat: Infinity,
//               ease: "easeInOut",
//               repeatType: "mirror",
//             }}
//           /> */}

//           <motion.div
//             className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
//             animate={{
//               boxShadow: [
//                 "0 0 15px 3px rgba(16, 21, 20, 0.15)",
//                 "0 0 25px 6px rgba(16, 21, 20, 0.3)",
//                 "0 0 15px 3px rgba(16, 21, 20, 0.15)",
//               ],
//               opacity: [0.4, 0.7, 0.4],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Infinity,
//               ease: "easeInOut",
//               repeatType: "mirror",
//             }}
//           />

//           <div className="absolute -inset-[3px] rounded-2xl overflow-hidden">
//             <motion.div
//               // 🎨 WHITE THEME: was 3px + via-blue-500/70 — bumped to 4px + brighter
//               // teal (matches the logo color) + a soft glow so it actually reads
//               // against the light card instead of disappearing into it.
//               className="absolute top-0 left-0 h-[4px] w-[50%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-90 "
//               style={{
//                 boxShadow: "0 0 8px 2px rgba(20,184,166,0.6)",
//               }}
//               animate={{ left: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
//               transition={{
//                 duration: 2.5,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatDelay: 1,
//               }}
//             />
//             <motion.div
//               className="absolute top-0 right-0 h-[50%] w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
//               animate={{ top: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
//               transition={{
//                 duration: 2.5,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 delay: 0.6,
//               }}
//             />
//             <motion.div
//               className="absolute bottom-0 right-0 h-[4px] w-[50%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
//               animate={{ right: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
//               transition={{
//                 duration: 2.5,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 delay: 1.2,
//               }}
//             />
//             <motion.div
//               className="absolute bottom-0 left-0 h-[50%] w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
//               animate={{ bottom: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
//               transition={{
//                 duration: 2.5,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatDelay: 1,
//                 delay: 1.8,
//               }}
//             />
//           </div>

//           {/* 🎨 WHITE THEME: border glow flipped from white-gradient to black-gradient
//               (a white glow was invisible against the new white card background) */}
//           <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-black/3 via-black/7 to-black/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

//           {/* 🎨 WHITE THEME: card background changed from bg-cyan-600/20 (dark glass)
//               to bg-white/90 (light glass). Border also flipped to black/[0.05]
//               since a white-ish border was invisible on white. */}
//           <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl p-6 border border-black/[0.05] shadow-2xl overflow-hidden">
//             {/* 🎨 WHITE THEME: inner pattern flipped from white lines to black lines */}
//             <div
//               className="absolute inset-0 opacity-[0.03]"
//               style={{
//                 backgroundImage: `linear-gradient(135deg, black 0.5px, transparent 0.5px), linear-gradient(45deg, black 0.5px, transparent 0.5px)`,
//                 backgroundSize: "30px 30px",
//               }}
//             />

//             {children}
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }
import { motion, useMotionValue, useTransform } from "framer-motion";

export function AuthCard({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-md relative z-10 px-4"
      style={{ perspective: 1500 }}
    >
      <motion.div
        className="relative"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 10 }}
      >
        <div className="relative group">
          {/* Card glow effect */}
          <motion.div
            className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            animate={{
              boxShadow: [
                "0 0 15px 3px rgba(16, 21, 20, 0.15)",
                "0 0 25px 6px rgba(16, 21, 20, 0.3)",
                "0 0 15px 3px rgba(16, 21, 20, 0.15)",
              ],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatType: "mirror",
            }}
          />

          {/* Traveling light beam effect */}
          <div className="absolute -inset-[3px] rounded-2xl overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-[4px] w-[50%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-90"
              style={{
                boxShadow: "0 0 8px 2px rgba(20,184,166,0.6)",
              }}
              animate={{ left: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
            <motion.div
              className="absolute top-0 right-0 h-[50%] w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
              animate={{ top: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
                delay: 0.6,
              }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[4px] w-[50%] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
              animate={{ right: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1.2,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-[50%] w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-90 shadow-[0_0_8px_2px_rgba(20,184,166,0.6)]"
              animate={{ bottom: ["-50%", "100%"], opacity: [0.5, 0.9, 0.5] }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
                delay: 1.8,
              }}
            />
          </div>

          {/* Card border glow */}
          <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-r from-black/3 via-black/7 to-black/3 opacity-0 group-hover:opacity-70 transition-opacity duration-500" />

          {/* Card background — REMOVED backdrop-blur, solid white */}
          <div className="relative bg-white rounded-2xl p-6 border border-black/[0.05] shadow-2xl overflow-hidden">
            {/* Inner pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(135deg, black 0.5px, transparent 0.5px), linear-gradient(45deg, black 0.5px, transparent 0.5px)`,
                backgroundSize: "30px 30px",
              }}
            />

            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
