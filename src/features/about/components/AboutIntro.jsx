import { AnimatedGradient } from "@/components/ui/animated-gradient";

export default function AboutIntro() {
  return (
    <section className="bg-white py-20">
      <div className="relative w-[90%] h-[500px] mx-auto overflow-hidden rounded-[40px]">
        <AnimatedGradient
          className="absolute inset-0"
          config={{ preset: "Oceanic" }}
        />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <p className="mb-4 uppercase tracking-[0.4em] text-sm">ABOUT US</p>

          <h1 className="text-5xl md:text-7xl font-bold">
            The Fusion of
            <br />
            Technology & Tradition
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-white/80">
            We design architectural experiences that combine innovation,
            creativity, and timeless elegance.
          </p>
        </div>
      </div>
    </section>
  );
}
