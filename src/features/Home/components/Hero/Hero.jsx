import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO_CONFIG } from "./config/heroConfig";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { SCENES, FINAL_SCENE } from "./scenes/sceneData";
import { SceneContent, FinalSceneContent } from "./components/SceneContent";

gsap.registerPlugin(ScrollTrigger);

const sceneVariants = {
  enter: (dir) => ({
    opacity: 0,
    y: dir > 0 ? 60 : -60,
    scale: 0.96,
    filter: "blur(12px)",
  }),
  center: {
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    y: dir > 0 ? -40 : 40,
    scale: 0.97,
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Particles() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.8,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 6,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

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

  // ✅ حدد حجم الـ Canvas (النسخة الوحيدة المستخدمة في كل مكان)
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

  const [activeScene, setActiveScene] = useState(0);
  const [isFinal, setIsFinal] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(1);

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

    // ✅ استخدام sizeCanvas الأصلية بس (مفيش تعريف تاني هنا)
    sizeCanvas();

    // ✅ اقرأ آخر موضع scroll محفوظ (لو موجود) عشان نرجّع المستخدم لمكانه
    // عدّلي المصدر ده لو عندك طريقة تانية بتحفظي بيها الـ scroll
    const savedScroll = Number(sessionStorage.getItem("heroScrollPos")) || 0;

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

    const totalScenes = SCENES.length;
    const finalZoneStart = 0.78;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${scrollEnd}`,
      pin: true,
      scrub: 1.5,
      onUpdate: (self) => {
        const p = self.progress;
        const dir = self.direction > 0 ? 1 : -1;
        setScrollDirection(dir);
        const frame = p * (HERO_CONFIG.frameCount - 1);
        frameRef.current = frame;
        drawFrame(frame);

        // ✅ احفظي موضع الـ scroll الحالي (لو حابة تستخدميه بعدين)
        sessionStorage.setItem("heroScrollPos", String(window.scrollY));

        if (p >= finalZoneStart) {
          setIsFinal(true);
          setActiveScene(0);
        } else {
          setIsFinal(false);
          const raw = p / finalZoneStart;
          const next = Math.min(Math.floor(raw * totalScenes), totalScenes - 1);
          setActiveScene(next);
        }
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
      className="relative h-screen w-full overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0c1210 0%, #030405 100%)" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 block" style={{ backgroundColor: "transparent" }} />

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at 100% 0%, rgba(79,209,184,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/55 via-black/20 to-black/65" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.65)_100%)]" />

      <Particles />

      <div className="absolute inset-0 z-20 flex items-center justify-center" style={{ padding: "clamp(60px, 8vh, 90px) 0" }}>
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait" custom={scrollDirection}>
            {isFinal ? (
              <motion.div
                key="final"
                variants={sceneVariants}
                custom={scrollDirection}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <FinalSceneContent scene={FINAL_SCENE} />
              </motion.div>
            ) : (
              <motion.div
                key={activeScene}
                variants={sceneVariants}
                custom={scrollDirection}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <SceneContent scene={SCENES[activeScene]} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


    </div>
  );
};

export default Hero;