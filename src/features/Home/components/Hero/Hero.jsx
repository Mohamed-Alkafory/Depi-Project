// // // // import { useRef } from "react";
// // // // import gsap from "gsap";
// // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // import { useGSAP } from "@gsap/react";
// // // // import { HERO_CONFIG } from "./config/heroConfig";
// // // // import { useImagePreloader } from "./hooks/useImagePreloader";

// // // // gsap.registerPlugin(ScrollTrigger);

// // // // const Hero = () => {
// // // //   const containerRef = useRef(null);
// // // //   const canvasRef = useRef(null);
// // // //   const frameRef = useRef(0);
// // // //   const triggerRef = useRef(null);
// // // //   const ctxRef = useRef(null);
// // // //   const currentFolderRef = useRef("desktop");
// // // //   const { images, isReady, progress, folder } = useImagePreloader();

// // // //   useGSAP(() => {
// // // //     if (!isReady || images.length === 0) return;
// // // //     if (triggerRef.current) {
// // // //       triggerRef.current.kill();
// // // //       triggerRef.current = null;
// // // //     }

// // // //     currentFolderRef.current = folder;
// // // //     const canvas = canvasRef.current;
// // // //     const ctx = canvas.getContext("2d");
// // // //     ctxRef.current = ctx;
// // // //     frameRef.current = 0;

// // // //     const dpr = window.devicePixelRatio || 1;

// // // //     const sizeCanvas = () => {
// // // //       const w = window.innerWidth;
// // // //       const h = window.innerHeight;
// // // //       canvas.style.width = w + "px";
// // // //       canvas.style.height = h + "px";
// // // //       canvas.width = w * dpr;
// // // //       canvas.height = h * dpr;
// // // //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// // // //     };

// // // //     const drawFrame = (index) => {
// // // //       const img = images[Math.floor(index)];
// // // //       if (!img) return;
// // // //       const w = window.innerWidth;
// // // //       const h = window.innerHeight;
// // // //       const hRatio = w / img.naturalWidth;
// // // //       const vRatio = h / img.naturalHeight;
// // // //       const ratio = Math.max(hRatio, vRatio);
// // // //       const sw = img.naturalWidth * ratio;
// // // //       const sh = img.naturalHeight * ratio;
// // // //       const sx = (w - sw) / 2;
// // // //       const sy = (h - sh) / 2;
// // // //       ctx.clearRect(0, 0, w, h);
// // // //       ctx.drawImage(
// // // //         img,
// // // //         0,
// // // //         0,
// // // //         img.naturalWidth,
// // // //         img.naturalHeight,
// // // //         sx,
// // // //         sy,
// // // //         sw,
// // // //         sh,
// // // //       );
// // // //     };

// // // //     sizeCanvas();
// // // //     drawFrame(0);

// // // //     const onResize = () => {
// // // //       const newFolder =
// // // //         window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
// // // //       if (newFolder !== currentFolderRef.current) {
// // // //         window.location.reload();
// // // //         return;
// // // //       }
// // // //       sizeCanvas();
// // // //       drawFrame(frameRef.current);
// // // //       ScrollTrigger.refresh();
// // // //     };

// // // //     window.addEventListener("resize", onResize);

// // // //     const trigger = ScrollTrigger.create({
// // // //       trigger: containerRef.current,
// // // //       start: "top top",
// // // //       end: folder === "mobile" ? "+=3500" : "+=8000",
// // // //       pin: true,
// // // //       scrub: 1.5,
// // // //       onUpdate: (self) => {
// // // //         const frame = self.progress * (HERO_CONFIG.frameCount - 1);
// // // //         frameRef.current = frame;
// // // //         drawFrame(frame);
// // // //       },
// // // //     });

// // // //     triggerRef.current = trigger;

// // // //     return () => {
// // // //       window.removeEventListener("resize", onResize);
// // // //       if (triggerRef.current) {
// // // //         triggerRef.current.kill();
// // // //         triggerRef.current = null;
// // // //       }
// // // //     };
// // // //   }, [images, isReady, folder]);

// // // //   // const pct = Math.round(progress * 100);

// // // //   return (
// // // //     <div
// // // //       ref={containerRef}
// // // //       className="relative h-screen w-full overflow-hidden"
// // // //     >
// // // //       <canvas ref={canvasRef} className="absolute inset-0 block" />

// // // //       {/* {!isReady && (
// // // //         <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
// // // //           <div className="mb-3 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
// // // //             <div
// // // //               className="h-full rounded-full bg-white/60 transition-all duration-200"
// // // //               style={{ width: `${pct}%` }}
// // // //             />
// // // //           </div>
// // // //           <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
// // // //             {pct}%
// // // //           </span>
// // // //         </div>
// // // //       )} */}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Hero;

// // // // // import { useRef, useEffect } from "react";
// // // // // import gsap from "gsap";
// // // // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // // // import { useGSAP } from "@gsap/react";
// // // // // import { HERO_CONFIG } from "./config/heroConfig";
// // // // // import { useImagePreloader } from "./hooks/useImagePreloader";

// // // // // gsap.registerPlugin(ScrollTrigger);

// // // // // const Hero = () => {
// // // // //   const containerRef = useRef(null);
// // // // //   const canvasRef = useRef(null);
// // // // //   const frameRef = useRef(0);
// // // // //   const triggerRef = useRef(null);
// // // // //   const ctxRef = useRef(null);
// // // // //   const currentFolderRef = useRef("desktop");
// // // // //   const { images, isReady, folder } = useImagePreloader();

// // // // //   useGSAP(() => {
// // // // //     if (!isReady || images.length === 0) return;
// // // // //     if (triggerRef.current) {
// // // // //       triggerRef.current.kill();
// // // // //       triggerRef.current = null;
// // // // //     }

// // // // //     currentFolderRef.current = folder;
// // // // //     const canvas = canvasRef.current;
// // // // //     const ctx = canvas.getContext("2d");
// // // // //     ctxRef.current = ctx;
// // // // //     frameRef.current = 0;

// // // // //     const dpr = window.devicePixelRatio || 1;

// // // // //     const sizeCanvas = () => {
// // // // //       const w = window.innerWidth;
// // // // //       const h = window.innerHeight;
// // // // //       canvas.style.width = w + "px";
// // // // //       canvas.style.height = h + "px";
// // // // //       canvas.width = w * dpr;
// // // // //       canvas.height = h * dpr;
// // // // //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// // // // //     };

// // // // //     const drawFrame = (index) => {
// // // // //       const img = images[Math.floor(index)];
// // // // //       if (!img) return;
// // // // //       const w = window.innerWidth;
// // // // //       const h = window.innerHeight;
// // // // //       const hRatio = w / img.naturalWidth;
// // // // //       const vRatio = h / img.naturalHeight;
// // // // //       const ratio = Math.max(hRatio, vRatio);
// // // // //       const sw = img.naturalWidth * ratio;
// // // // //       const sh = img.naturalHeight * ratio;
// // // // //       const sx = (w - sw) / 2;
// // // // //       const sy = (h - sh) / 2;
// // // // //       ctx.clearRect(0, 0, w, h);
// // // // //       ctx.drawImage(
// // // // //         img,
// // // // //         0,
// // // // //         0,
// // // // //         img.naturalWidth,
// // // // //         img.naturalHeight,
// // // // //         sx,
// // // // //         sy,
// // // // //         sw,
// // // // //         sh,
// // // // //       );
// // // // //     };

// // // // //     sizeCanvas();
// // // // //     drawFrame(0);

// // // // //     const onResize = () => {
// // // // //       const newFolder =
// // // // //         window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
// // // // //       if (newFolder !== currentFolderRef.current) {
// // // // //         window.location.reload();
// // // // //         return;
// // // // //       }
// // // // //       sizeCanvas();
// // // // //       drawFrame(frameRef.current);
// // // // //       ScrollTrigger.refresh();
// // // // //     };

// // // // //     window.addEventListener("resize", onResize);

// // // // //     const trigger = ScrollTrigger.create({
// // // // //       trigger: containerRef.current,
// // // // //       start: "top top",
// // // // //       end: folder === "mobile" ? "+=3500" : "+=8000",
// // // // //       pin: true,
// // // // //       scrub: 1.5,
// // // // //       onUpdate: (self) => {
// // // // //         const frame = self.progress * (HERO_CONFIG.frameCount - 1);
// // // // //         frameRef.current = frame;
// // // // //         drawFrame(frame);
// // // // //       },
// // // // //     });

// // // // //     triggerRef.current = trigger;

// // // // //     return () => {
// // // // //       window.removeEventListener("resize", onResize);
// // // // //       if (triggerRef.current) {
// // // // //         triggerRef.current.kill();
// // // // //         triggerRef.current = null;
// // // // //       }
// // // // //     };
// // // // //   }, [images, isReady, folder]);

// // // // //   return (
// // // // //     <div
// // // // //       ref={containerRef}
// // // // //       className="relative h-screen w-full overflow-hidden bg-black"
// // // // //     >
// // // // //       <canvas ref={canvasRef} className="absolute inset-0 block" />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default Hero;
// // // import { useRef, useState } from "react";
// // // import gsap from "gsap";
// // // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // // import { useGSAP } from "@gsap/react";
// // // import { HERO_CONFIG } from "./config/heroConfig";
// // // import { useImagePreloader } from "./hooks/useImagePreloader";

// // // gsap.registerPlugin(ScrollTrigger);

// // // const Hero = () => {
// // //   const containerRef = useRef(null);
// // //   const canvasRef = useRef(null);
// // //   const frameRef = useRef(0);
// // //   const triggerRef = useRef(null);
// // //   const ctxRef = useRef(null);
// // //   const currentFolderRef = useRef("desktop");

// // //   const [showPoster, setShowPoster] = useState(true);

// // //   const { images, isReady, folder } = useImagePreloader();

// // //   useGSAP(() => {
// // //     if (!isReady || images.length === 0) return;
// // //     if (triggerRef.current) {
// // //       triggerRef.current.kill();
// // //       triggerRef.current = null;
// // //     }

// // //     currentFolderRef.current = folder;
// // //     const canvas = canvasRef.current;
// // //     const ctx = canvas.getContext("2d");
// // //     ctxRef.current = ctx;
// // //     frameRef.current = 0;

// // //     const dpr = window.devicePixelRatio || 1;

// // //     const sizeCanvas = () => {
// // //       const w = window.innerWidth;
// // //       const h = window.innerHeight;
// // //       canvas.style.width = w + "px";
// // //       canvas.style.height = h + "px";
// // //       canvas.width = w * dpr;
// // //       canvas.height = h * dpr;
// // //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// // //     };

// // //     const drawFrame = (index) => {
// // //       const img = images[Math.floor(index)];
// // //       if (!img) return;
// // //       const w = window.innerWidth;
// // //       const h = window.innerHeight;
// // //       const hRatio = w / img.naturalWidth;
// // //       const vRatio = h / img.naturalHeight;
// // //       const ratio = Math.max(hRatio, vRatio);
// // //       const sw = img.naturalWidth * ratio;
// // //       const sh = img.naturalHeight * ratio;
// // //       const sx = (w - sw) / 2;
// // //       const sy = (h - sh) / 2;
// // //       ctx.clearRect(0, 0, w, h);
// // //       ctx.drawImage(
// // //         img,
// // //         0,
// // //         0,
// // //         img.naturalWidth,
// // //         img.naturalHeight,
// // //         sx,
// // //         sy,
// // //         sw,
// // //         sh,
// // //       );
// // //     };

// // //     sizeCanvas();
// // //     drawFrame(0);

// // //     // ✅ بعد ما أول Frame يترسم، اخفي الـ Poster
// // //     requestAnimationFrame(() => {
// // //       setTimeout(() => {
// // //         setShowPoster(false);
// // //       }, 150);
// // //     });

// // //     const onResize = () => {
// // //       const newFolder =
// // //         window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
// // //       if (newFolder !== currentFolderRef.current) {
// // //         window.location.reload();
// // //         return;
// // //       }
// // //       sizeCanvas();
// // //       drawFrame(frameRef.current);
// // //       ScrollTrigger.refresh();
// // //     };

// // //     window.addEventListener("resize", onResize);

// // //     const trigger = ScrollTrigger.create({
// // //       trigger: containerRef.current,
// // //       start: "top top",
// // //       end: folder === "mobile" ? "+=3500" : "+=8000",
// // //       pin: true,
// // //       scrub: 1.5,
// // //       onUpdate: (self) => {
// // //         const frame = self.progress * (HERO_CONFIG.frameCount - 1);
// // //         frameRef.current = frame;
// // //         drawFrame(frame);
// // //       },
// // //     });

// // //     triggerRef.current = trigger;

// // //     return () => {
// // //       window.removeEventListener("resize", onResize);
// // //       if (triggerRef.current) {
// // //         triggerRef.current.kill();
// // //         triggerRef.current = null;
// // //       }
// // //     };
// // //   }, [images, isReady, folder]);

// // //   return (
// // //     <div
// // //       ref={containerRef}
// // //       className="relative h-screen w-full overflow-hidden"
// // //     >
// // //       {/* ✅ Poster Image — بتظهر فورًا وتختفي بـ Fade */}
// // //       <img
// // //         src={`/frames/${folder}/0001.jpg`}
// // //         alt="Hero Poster"
// // //         className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
// // //           showPoster ? "opacity-100" : "opacity-0"
// // //         }`}
// // //       />

// // //       {/* ✅ Canvas — بيبدأ شفاف ويظهر بـ Fade */}
// // //       <canvas
// // //         ref={canvasRef}
// // //         className={`absolute inset-0 block transition-opacity duration-500 ${
// // //           showPoster ? "opacity-0" : "opacity-100"
// // //         }`}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default Hero;
// // import { useRef, useState } from "react";
// // import gsap from "gsap";
// // import { ScrollTrigger } from "gsap/ScrollTrigger";
// // import { useGSAP } from "@gsap/react";
// // import { HERO_CONFIG } from "./config/heroConfig";
// // import { useImagePreloader } from "./hooks/useImagePreloader";

// // gsap.registerPlugin(ScrollTrigger);

// // const Hero = () => {
// //   const containerRef = useRef(null);
// //   const canvasRef = useRef(null);
// //   const frameRef = useRef(0);
// //   const triggerRef = useRef(null);
// //   const ctxRef = useRef(null);
// //   const currentFolderRef = useRef("desktop");

// //   const [showPoster, setShowPoster] = useState(true);
// //   const [posterLoaded, setPosterLoaded] = useState(false);

// //   const { images, isReady, folder } = useImagePreloader();

// //   useGSAP(() => {
// //     if (!isReady || images.length === 0) return;
// //     if (triggerRef.current) {
// //       triggerRef.current.kill();
// //       triggerRef.current = null;
// //     }

// //     currentFolderRef.current = folder;
// //     const canvas = canvasRef.current;
// //     const ctx = canvas.getContext("2d");
// //     ctxRef.current = ctx;
// //     frameRef.current = 0;

// //     const dpr = window.devicePixelRatio || 1;

// //     const sizeCanvas = () => {
// //       const w = window.innerWidth;
// //       const h = window.innerHeight;
// //       canvas.style.width = w + "px";
// //       canvas.style.height = h + "px";
// //       canvas.width = w * dpr;
// //       canvas.height = h * dpr;
// //       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
// //     };

// //     const drawFrame = (index) => {
// //       const img = images[Math.floor(index)];
// //       if (!img) return;
// //       const w = window.innerWidth;
// //       const h = window.innerHeight;
// //       const hRatio = w / img.naturalWidth;
// //       const vRatio = h / img.naturalHeight;
// //       const ratio = Math.max(hRatio, vRatio);
// //       const sw = img.naturalWidth * ratio;
// //       const sh = img.naturalHeight * ratio;
// //       const sx = (w - sw) / 2;
// //       const sy = (h - sh) / 2;
// //       ctx.clearRect(0, 0, w, h);
// //       ctx.drawImage(
// //         img,
// //         0,
// //         0,
// //         img.naturalWidth,
// //         img.naturalHeight,
// //         sx,
// //         sy,
// //         sw,
// //         sh,
// //       );
// //     };

// //     sizeCanvas();
// //     drawFrame(0);

// //     // ✅ اخفي الـ Poster بعد ما الـ Canvas يرسم
// //     requestAnimationFrame(() => {
// //       setTimeout(() => {
// //         setShowPoster(false);
// //       }, 100);
// //     });

// //     const onResize = () => {
// //       const newFolder =
// //         window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
// //       if (newFolder !== currentFolderRef.current) {
// //         window.location.reload();
// //         return;
// //       }
// //       sizeCanvas();
// //       drawFrame(frameRef.current);
// //       ScrollTrigger.refresh();
// //     };

// //     window.addEventListener("resize", onResize);

// //     const trigger = ScrollTrigger.create({
// //       trigger: containerRef.current,
// //       start: "top top",
// //       end: folder === "mobile" ? "+=3500" : "+=8000",
// //       pin: true,
// //       scrub: 1.5,
// //       onUpdate: (self) => {
// //         const frame = self.progress * (HERO_CONFIG.frameCount - 1);
// //         frameRef.current = frame;
// //         drawFrame(frame);
// //       },
// //     });

// //     triggerRef.current = trigger;

// //     return () => {
// //       window.removeEventListener("resize", onResize);
// //       if (triggerRef.current) {
// //         triggerRef.current.kill();
// //         triggerRef.current = null;
// //       }
// //     };
// //   }, [images, isReady, folder]);

// //   const posterSrc = `/frames/${folder}/0001.jpg`;

// //   return (
// //     <div
// //       ref={containerRef}
// //       className="relative h-screen w-full overflow-hidden bg-black"
// //     >
// //       {/* ✅ Poster Image — بيظهر فورًا */}
// //       <img
// //         src={posterSrc}
// //         alt="Hero Poster"
// //         onLoad={() => setPosterLoaded(true)}
// //         className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
// //           showPoster && posterLoaded ? "opacity-100" : "opacity-0"
// //         }`}
// //         style={{ willChange: "opacity" }}
// //       />

// //       {/* ✅ Placeholder أسود لحد ما الصورة تتحمل */}
// //       {!posterLoaded && <div className="absolute inset-0 bg-black" />}

// //       {/* ✅ Canvas */}
// //       <canvas
// //         ref={canvasRef}
// //         className={`absolute inset-0 block transition-opacity duration-700 ${
// //           showPoster ? "opacity-0" : "opacity-100"
// //         }`}
// //         style={{ willChange: "opacity" }}
// //       />
// //     </div>
// //   );
// // };

// // export default Hero;
// import { useRef, useState, useEffect } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";
// import { HERO_CONFIG } from "./config/heroConfig";
// import { useImagePreloader } from "./hooks/useImagePreloader";

// gsap.registerPlugin(ScrollTrigger);

// const Hero = () => {
//   const containerRef = useRef(null);
//   const canvasRef = useRef(null);
//   const frameRef = useRef(0);
//   const triggerRef = useRef(null);
//   const ctxRef = useRef(null);
//   const currentFolderRef = useRef("desktop");

//   const [showPoster, setShowPoster] = useState(true);

//   const { images, isReady, folder } = useImagePreloader();

//   // ✅ لما تدخل الصفحة، شوف لو فيه scroll position محفوظ
//   useEffect(() => {
//     const savedScroll = parseInt(
//       sessionStorage.getItem("home_scroll_position") || "0",
//       10,
//     );
//     if (savedScroll > 0 && isReady) {
//       // ارجع للـ position بعد ما الـ Canvas يجهز
//       requestAnimationFrame(() => {
//         window.scrollTo(0, savedScroll);
//         // ارسم الـ Frame المناسب للـ scroll position
//         const maxScroll = ScrollTrigger.maxScroll(window);
//         if (maxScroll > 0) {
//           const progress = savedScroll / maxScroll;
//           const frame = progress * (HERO_CONFIG.frameCount - 1);
//           frameRef.current = frame;
//           // ارسم الـ Frame ده
//           const canvas = canvasRef.current;
//           if (canvas) {
//             const ctx = canvas.getContext("2d");
//             const img = images[Math.floor(frame)];
//             if (img && img.complete) {
//               const w = window.innerWidth;
//               const h = window.innerHeight;
//               const hRatio = w / img.naturalWidth;
//               const vRatio = h / img.naturalHeight;
//               const ratio = Math.max(hRatio, vRatio);
//               const sw = img.naturalWidth * ratio;
//               const sh = img.naturalHeight * ratio;
//               const sx = (w - sw) / 2;
//               const sy = (h - sh) / 2;
//               ctx.clearRect(0, 0, w, h);
//               ctx.drawImage(
//                 img,
//                 0,
//                 0,
//                 img.naturalWidth,
//                 img.naturalHeight,
//                 sx,
//                 sy,
//                 sw,
//                 sh,
//               );
//             }
//           }
//         }
//       });
//     }
//   }, [isReady, images]);

//   useGSAP(() => {
//     if (!isReady || images.length === 0) return;

//     // ✅ لو الـ trigger موجود متعملش جديد
//     if (triggerRef.current && triggerRef.current.isActive?.()) {
//       return;
//     }

//     currentFolderRef.current = folder;
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     ctxRef.current = ctx;

//     // ✅ متبدأش من 0 لو فيه scroll position محفوظ
//     const savedScroll = parseInt(
//       sessionStorage.getItem("home_scroll_position") || "0",
//       10,
//     );
//     const maxScroll =
//       ScrollTrigger.maxScroll(window) || (folder === "mobile" ? 3500 : 8000);
//     const initialProgress =
//       savedScroll > 0 ? Math.min(savedScroll / maxScroll, 1) : 0;
//     frameRef.current = initialProgress * (HERO_CONFIG.frameCount - 1);

//     const dpr = window.devicePixelRatio || 1;

//     const sizeCanvas = () => {
//       const w = window.innerWidth;
//       const h = window.innerHeight;
//       canvas.style.width = w + "px";
//       canvas.style.height = h + "px";
//       canvas.width = w * dpr;
//       canvas.height = h * dpr;
//       ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };

//     const drawFrame = (index) => {
//       const img = images[Math.floor(index)];
//       if (!img || !img.complete) return;
//       const w = window.innerWidth;
//       const h = window.innerHeight;
//       const hRatio = w / img.naturalWidth;
//       const vRatio = h / img.naturalHeight;
//       const ratio = Math.max(hRatio, vRatio);
//       const sw = img.naturalWidth * ratio;
//       const sh = img.naturalHeight * ratio;
//       const sx = (w - sw) / 2;
//       const sy = (h - sh) / 2;
//       ctx.clearRect(0, 0, w, h);
//       ctx.drawImage(
//         img,
//         0,
//         0,
//         img.naturalWidth,
//         img.naturalHeight,
//         sx,
//         sy,
//         sw,
//         sh,
//       );
//     };

//     sizeCanvas();
//     drawFrame(frameRef.current);

//     // اخفي الـ Poster
//     requestAnimationFrame(() => {
//       setTimeout(() => setShowPoster(false), 100);
//     });

//     const onResize = () => {
//       const newFolder =
//         window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
//       if (newFolder !== currentFolderRef.current) {
//         window.location.reload();
//         return;
//       }
//       sizeCanvas();
//       drawFrame(frameRef.current);
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("resize", onResize);

//     const trigger = ScrollTrigger.create({
//       trigger: containerRef.current,
//       start: "top top",
//       end: folder === "mobile" ? "+=3500" : "+=8000",
//       pin: true,
//       scrub: 1.5,
//       onUpdate: (self) => {
//         const frame = self.progress * (HERO_CONFIG.frameCount - 1);
//         frameRef.current = frame;
//         drawFrame(frame);
//       },
//     });

//     triggerRef.current = trigger;

//     // ✅ لو فيه saved scroll، حرك الـ trigger للمكان ده
//     if (savedScroll > 0) {
//       requestAnimationFrame(() => {
//         ScrollTrigger.refresh();
//         window.scrollTo(0, savedScroll);
//       });
//     }

//     return () => {
//       window.removeEventListener("resize", onResize);
//       // ✅ متقتلش الـ trigger هنا — سيبه يعيش
//     };
//   }, [images, isReady, folder]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative h-screen w-full overflow-hidden bg-black"
//     >
//       <img
//         src={`/frames/${folder}/0001.jpg`}
//         alt="Hero Poster"
//         className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
//           showPoster ? "opacity-100" : "opacity-0"
//         }`}
//       />

//       <canvas
//         ref={canvasRef}
//         className={`absolute inset-0 block transition-opacity duration-700 ${
//           showPoster ? "opacity-0" : "opacity-100"
//         }`}
//       />
//     </div>
//   );
// };

// export default Hero;
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO_CONFIG } from "./config/heroConfig";
import { useImagePreloader } from "./hooks/useImagePreloader";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const triggerRef = useRef(null);
  const ctxRef = useRef(null);
  const currentFolderRef = useRef("desktop");
  const hasRestoredRef = useRef(false);

  const [showPoster, setShowPoster] = useState(true);

  const { images, isReady, folder } = useImagePreloader();

  // ✅ ارسم أي Frame على الـ Canvas
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const img = images[Math.floor(index)];
    if (!img || !img.complete) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const hRatio = w / img.naturalWidth;
    const vRatio = h / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);
    const sw = img.naturalWidth * ratio;
    const sh = img.naturalHeight * ratio;
    const sx = (w - sw) / 2;
    const sy = (h - sh) / 2;

    ctx.clearRect(0, 0, w * dpr, h * dpr);
    ctx.drawImage(
      img,
      0,
      0,
      img.naturalWidth,
      img.naturalHeight,
      sx,
      sy,
      sw,
      sh,
    );
  };

  // ✅ حدد حجم الـ Canvas
  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  useGSAP(() => {
    if (!isReady || images.length === 0) return;

    // لو الـ trigger موجود وشغال، متعملش جديد
    if (triggerRef.current?.isActive?.()) {
      ScrollTrigger.refresh();
      return;
    }

    currentFolderRef.current = folder;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;

    sizeCanvas();

    // ✅ شوف لو فيه scroll position محفوظ
    const savedScroll = parseInt(
      sessionStorage.getItem("home_scroll_position") || "0",
      10,
    );

    // ✅ احسب الـ progress المناسب من الـ scroll
    const scrollEnd = folder === "mobile" ? 3500 : 8000;
    const totalScroll = scrollEnd + window.innerHeight; // pin adds viewport height
    let initialProgress = 0;

    if (savedScroll > 0 && !hasRestoredRef.current) {
      // الـ scroll داخل الـ pinned area
      if (savedScroll <= totalScroll) {
        initialProgress = Math.min(savedScroll / scrollEnd, 1);
      } else {
        initialProgress = 1; // خلصنا الـ animation
      }
      hasRestoredRef.current = true;
    }

    frameRef.current = initialProgress * (HERO_CONFIG.frameCount - 1);

    // ارسم الـ Frame الأولي
    drawFrame(frameRef.current);

    // اخفي الـ Poster
    requestAnimationFrame(() => {
      setTimeout(() => setShowPoster(false), 100);
    });

    // Resize handler
    const onResize = () => {
      const newFolder =
        window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
      if (newFolder !== currentFolderRef.current) {
        window.location.reload();
        return;
      }
      sizeCanvas();
      drawFrame(frameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    // ✅ اعمل الـ ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollEnd}`,
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const frame = self.progress * (HERO_CONFIG.frameCount - 1);
        frameRef.current = frame;
        drawFrame(frame);
      },
    });

    triggerRef.current = trigger;

    // ✅ لو فيه saved scroll، حرك الـ trigger للمكان ده
    if (savedScroll > 0 && initialProgress > 0 && initialProgress < 1) {
      // ScrollTrigger لسه مش محسوب صح — استنى شوية
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
          // حرك الـ scroll للمكان الصح
          const targetScroll = initialProgress * scrollEnd;
          window.scrollTo(0, targetScroll);
        });
      });
    }

    return () => {
      window.removeEventListener("resize", onResize);
      // ❌ متقتلش الـ trigger هنا
    };
  }, [images, isReady, folder]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <img
        src={`/frames/${folder}/0001.jpg`}
        alt="Hero Poster"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          showPoster ? "opacity-100" : "opacity-0"
        }`}
      />

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 block transition-opacity duration-500 ${
          showPoster ? "opacity-0" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default Hero;
