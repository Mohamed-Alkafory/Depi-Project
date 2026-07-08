// // // import { useEffect, useState, useRef } from "react";
// // // import { HERO_CONFIG } from "../config/heroConfig";

// // // export const useImagePreloader = () => {
// // //   const [images, setImages] = useState([]);
// // //   const [progress, setProgress] = useState(0);
// // //   const [isReady, setIsReady] = useState(false);
// // //   const [folder, setFolder] = useState("desktop");
// // //   const loadedRef = useRef(0);
// // //   const mountedRef = useRef(true);

// // //   const currentFolder = () =>
// // //     window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";

// // //   useEffect(() => {
// // //     mountedRef.current = true;

// // //     const load = () => {
// // //       loadedRef.current = 0;
// // //       setIsReady(false);
// // //       setProgress(0);

// // //       const total = HERO_CONFIG.frameCount;
// // //       const f = currentFolder();
// // //       setFolder(f);
// // //       const loaded = [];

// // //       for (let i = 1; i <= total; i++) {
// // //         const img = new Image();
// // //         img.src = `/frames/${f}/${String(i).padStart(4, "0")}.jpg`;
// // //         img.onload = img.onerror = () => {
// // //           if (!mountedRef.current) return;
// // //           loadedRef.current++;
// // //           const p = loadedRef.current / total;
// // //           setProgress(p);
// // //           if (p >= HERO_CONFIG.loadingThreshold) {
// // //             setIsReady(true);
// // //           }
// // //         };
// // //         loaded.push(img);
// // //       }
// // //       setImages(loaded);
// // //     };

// // //     load();

// // //     return () => {
// // //       mountedRef.current = false;
// // //     };
// // //   }, []);

// // //   return { images, progress, isReady, folder };
// // // };
// // import { useEffect, useState, useRef } from "react";
// // import { HERO_CONFIG } from "../config/heroConfig";

// // export const useImagePreloader = () => {
// //   const [images, setImages] = useState([]);
// //   const [progress, setProgress] = useState(0);
// //   const [isReady, setIsReady] = useState(false);
// //   const [folder, setFolder] = useState("desktop");
// //   const loadedRef = useRef(0);
// //   const mountedRef = useRef(true);

// //   const currentFolder = () =>
// //     window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";

// //   useEffect(() => {
// //     mountedRef.current = true;

// //     const load = () => {
// //       loadedRef.current = 0;
// //       setIsReady(false);
// //       setProgress(0);

// //       const total = HERO_CONFIG.frameCount;
// //       const f = currentFolder();
// //       setFolder(f);
// //       const loaded = [];
// //       const completed = new Set(); // ← جديد: track completed images

// //       for (let i = 1; i <= total; i++) {
// //         const img = new Image();
// //         const src = `/frames/${f}/${String(i).padStart(4, "0")}.jpg`;
// //         img.src = src;

// //         img.onload = img.onerror = () => {
// //           if (!mountedRef.current) return;
// //           if (completed.has(src)) return; // ← تجاهل لو اتكررت
// //           completed.add(src);

// //           loadedRef.current++;
// //           const p = Math.min(loadedRef.current / total, 1); // ← cap at 100%
// //           setProgress(p);
// //           if (p >= HERO_CONFIG.loadingThreshold) {
// //             setIsReady(true);
// //           }
// //         };

// //         loaded.push(img);
// //       }
// //       setImages(loaded);
// //     };

// //     load();

// //     return () => {
// //       mountedRef.current = false;
// //     };
// //   }, []);

// //   return { images, progress, isReady, folder };
// // };
// import { useEffect, useState, useRef } from "react";
// import { HERO_CONFIG } from "../config/heroConfig";

// export const useImagePreloader = () => {
//   const [images, setImages] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [isReady, setIsReady] = useState(false);
//   const [folder, setFolder] = useState("desktop");

//   const loadedRef = useRef(0);
//   const mountedRef = useRef(true);

//   const currentFolder = () =>
//     window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";

//   useEffect(() => {
//     mountedRef.current = true;

//     const load = () => {
//       loadedRef.current = 0;
//       setProgress(0);
//       setIsReady(false);

//       const total = HERO_CONFIG.frameCount;
//       const current = currentFolder();

//       setFolder(current);

//       const loadedImages = [];
//       const completed = new Set();

//       for (let i = 1; i <= total; i++) {
//         const img = new Image();
//         const src = `/frames/${current}/${String(i).padStart(4, "0")}.jpg`;

//         img.src = src;

//         img.onload = img.onerror = () => {
//           if (!mountedRef.current) return;
//           if (completed.has(src)) return;

//           completed.add(src);

//           loadedRef.current++;

//           const p = Math.min(loadedRef.current / total, 1);
//           setProgress(p);

//           // أول ما أول Frame يتحمل ابدأ اعرض الـ Hero
//           if (loadedRef.current === 1) {
//             setIsReady(true);
//           }
//         };

//         loadedImages.push(img);
//       }

//       setImages(loadedImages);
//     };

//     load();

//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   return {
//     images,
//     progress,
//     isReady,
//     folder,
//   };
// };
import { useEffect, useState, useRef } from "react";
import { HERO_CONFIG } from "../config/heroConfig";

export const useImagePreloader = () => {
  const [images, setImages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [folder, setFolder] = useState("desktop");

  const loadedRef = useRef(0);
  const mountedRef = useRef(true);

  const currentFolder = () =>
    window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";

  useEffect(() => {
    mountedRef.current = true;

    const load = () => {
      loadedRef.current = 0;
      setIsReady(false);

      const total = HERO_CONFIG.frameCount;
      const current = currentFolder();
      setFolder(current);

      const loadedImages = [];
      const completed = new Set();

      // ✅ ابدأ بتحميل أول صورة الأولى (الـ Poster)
      const posterImg = new Image();
      posterImg.src = `/frames/${current}/0001.jpg`;

      posterImg.onload = () => {
        if (!mountedRef.current) return;
        // أول ما الـ Poster يتحمل، قول إننا جاهزين
        setIsReady(true);
      };

      posterImg.onerror = () => {
        if (!mountedRef.current) return;
        setIsReady(true); // حتى لو فشل، اشتغل
      };

      loadedImages.push(posterImg);

      // ✅ حمل باقي الصور في الخلفية
      for (let i = 2; i <= total; i++) {
        const img = new Image();
        const src = `/frames/${current}/${String(i).padStart(4, "0")}.jpg`;
        img.src = src;

        img.onload = img.onerror = () => {
          if (!mountedRef.current) return;
          if (completed.has(src)) return;
          completed.add(src);
          loadedRef.current++;
        };

        loadedImages.push(img);
      }

      setImages(loadedImages);
    };

    load();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { images, isReady, folder };
};
