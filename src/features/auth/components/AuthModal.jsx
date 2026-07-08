// // import { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { X } from "lucide-react";
// // import { AuthCard } from "./AuthCard";
// // import { SignInForm } from "./SignInForm";
// // import { SignUpForm } from "./SignUpForm";

// // export function AuthModal({
// //   isOpen,
// //   onClose,
// //   defaultMode = "signin",
// //   onSuccess,
// // }) {
// //   const [mode, setMode] = useState(defaultMode);

// //   useEffect(() => {
// //     if (isOpen) {
// //       setMode(defaultMode);
// //     }
// //   }, [isOpen, defaultMode]);

// //   const handleSwitch = () => {
// //     setMode(mode === "signin" ? "signup" : "signin");
// //   };

// //   const handleSuccess = () => {
// //     onSuccess?.();
// //     onClose();
// //   };

// //   return (
// //     <AnimatePresence>
// //       {isOpen && (
// //         <motion.div
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           exit={{ opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="fixed inset-0 z-50 flex items-center justify-center p-4"
// //           onClick={onClose}
// //         >
// //           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
// //           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //             animate={{ opacity: 1, scale: 1, y: 0 }}
// //             exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //             transition={{ type: "spring", damping: 25, stiffness: 300 }}
// //             onClick={(e) => e.stopPropagation()}
// //             className="relative w-full max-w-md flex justify-center"
// //           >
// //             <AuthCard>
// //               <button
// //                 onClick={onClose}
// //                 className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-20"
// //               >
// //                 <X className="w-5 h-5" />
// //               </button>

// //               <AnimatePresence mode="wait">
// //                 {mode === "signin" ? (
// //                   <SignInForm
// //                     key="signin"
// //                     onSwitchMode={handleSwitch}
// //                     onSuccess={handleSuccess}
// //                   />
// //                 ) : (
// //                   <SignUpForm key="signup" onSwitchMode={handleSwitch} />
// //                 )}
// //               </AnimatePresence>
// //             </AuthCard>
// //           </motion.div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";
// import { AuthCard } from "./AuthCard";
// import { SignInForm } from "./SignInForm";
// import { SignUpForm } from "./SignUpForm";

// export function AuthModal({
//   isOpen,
//   onClose,
//   defaultMode = "signin",
//   onSuccess,
// }) {
//   const [mode, setMode] = useState(defaultMode);

//   // ✅ Already correct — resyncs mode every time the modal opens.
//   useEffect(() => {
//     if (isOpen) {
//       setMode(defaultMode);
//     }
//   }, [isOpen, defaultMode]);

//   const handleSwitch = () => {
//     setMode(mode === "signin" ? "signup" : "signin");
//   };

//   const handleSuccess = () => {
//     onSuccess?.();
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           onClick={onClose}
//         >
//           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none" />

//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//             onClick={(e) => e.stopPropagation()}
//             className="relative w-full max-w-lg flex justify-center"
//           >
//             <AuthCard>
//               <button
//                 onClick={onClose}
//                 // 🎨 WHITE THEME: close icon flipped from white to gray
//                 // className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-20"
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-20"
//               >
//                 <X className="w-5 h-5" />
//               </button>

//               <AnimatePresence mode="wait">
//                 {mode === "signin" ? (
//                   <SignInForm
//                     key="signin"
//                     onSwitchMode={handleSwitch}
//                     onSuccess={handleSuccess}
//                   />
//                 ) : (
//                   <SignUpForm key="signup" onSwitchMode={handleSwitch} />
//                 )}
//               </AnimatePresence>
//             </AuthCard>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AuthCard } from "./AuthCard";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";

export function AuthModal({
  isOpen,
  onClose,
  defaultMode = "signin",
  onSuccess,
}) {
  const [mode, setMode] = useState(defaultMode);

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
    }
  }, [isOpen, defaultMode]);

  const handleSwitch = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* 🔧 CHANGED: Reduced blur from 100px to 30px and opacity from /20 to /10 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[30px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg flex justify-center"
          >
            <AuthCard>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <AnimatePresence mode="wait">
                {mode === "signin" ? (
                  <SignInForm
                    key="signin"
                    onSwitchMode={handleSwitch}
                    onSuccess={handleSuccess}
                  />
                ) : (
                  <SignUpForm key="signup" onSwitchMode={handleSwitch} />
                )}
              </AnimatePresence>
            </AuthCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
