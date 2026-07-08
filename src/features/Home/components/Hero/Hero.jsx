import { useRef } from "react";
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
  const { images, isReady, progress, folder } = useImagePreloader();

  useGSAP(() => {
    if (!isReady || images.length === 0) return;
    if (triggerRef.current) {
      triggerRef.current.kill();
      triggerRef.current = null;
    }

    currentFolderRef.current = folder;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    frameRef.current = 0;

    const dpr = window.devicePixelRatio || 1;

    const sizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawFrame = (index) => {
      const img = images[Math.floor(index)];
      if (!img) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const hRatio = w / img.naturalWidth;
      const vRatio = h / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);
      const sw = img.naturalWidth * ratio;
      const sh = img.naturalHeight * ratio;
      const sx = (w - sw) / 2;
      const sy = (h - sh) / 2;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, sx, sy, sw, sh);
    };

    sizeCanvas();
    drawFrame(0);

    const onResize = () => {
      const newFolder = window.innerWidth <= HERO_CONFIG.breakpoint ? "mobile" : "desktop";
      if (newFolder !== currentFolderRef.current) {
        window.location.reload();
        return;
      }
      sizeCanvas();
      drawFrame(frameRef.current);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: folder === "mobile" ? "+=3500" : "+=8000",
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const frame = self.progress * (HERO_CONFIG.frameCount - 1);
        frameRef.current = frame;
        drawFrame(frame);
      },
    });

    triggerRef.current = trigger;

    return () => {
      window.removeEventListener("resize", onResize);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };
  }, [images, isReady, folder]);

  const pct = Math.round(progress * 100);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {!isReady && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black">
          <div className="mb-3 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-white/60 transition-all duration-200" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">{pct}%</span>
        </div>
      )}
    </div>
  );
};

export default Hero;