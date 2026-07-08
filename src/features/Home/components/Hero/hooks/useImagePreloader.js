import { useEffect, useState, useRef } from "react";
import { HERO_CONFIG } from "../config/heroConfig";

export const useImagePreloader = () => {
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
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
      setProgress(0);

      const total = HERO_CONFIG.frameCount;
      const f = currentFolder();
      setFolder(f);
      const loaded = [];

      for (let i = 1; i <= total; i++) {
        const img = new Image();
        img.src = `/frames/${f}/${String(i).padStart(4, "0")}.jpg`;
        img.onload = img.onerror = () => {
          if (!mountedRef.current) return;
          loadedRef.current++;
          const p = loadedRef.current / total;
          setProgress(p);
          if (p >= HERO_CONFIG.loadingThreshold) {
            setIsReady(true);
          }
        };
        loaded.push(img);
      }
      setImages(loaded);
    };

    load();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return { images, progress, isReady, folder };
};