import heroImg from "/src/assets/images/homes/Picture_6.avif";
export default function HeroSection({ onStart }) {
  return (
    <section className="relative w-full bg-white rounded-[2.5rem] p-2 md:p-3 shadow-xl mb-10">
      {/* Image Frame */}
      <div className="relative rounded-[2rem] overflow-hidden group">
        <img
          src={heroImg}
          alt="Modern house"
          className="w-full h-[380px] md:h-[440px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />

        {/* Overlay بلون الموقع الأساسي - gradient واضح من الشمال */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--brand-primary) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 60%, transparent 85%)",
            mixBlendMode: "multiply",
          }}
        />
        {/* طبقة سوداء خفيفة فوقها عشان النص يفضل واضح مهما كان لون البراند فاتح */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Text Content */}
        <div className="absolute top-10 left-8 md:top-14 md:left-12 max-w-md">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            Designing Spaces That Inspire & Endure
          </h1>

          <p className="text-gray-100 text-sm md:text-base leading-relaxed max-w-sm">
            We transform visions into timeless architecture, blending innovative design with functional excellence
          </p>
        </div>
      </div>

      {/* Floating white notch with button */}
      {/* <div className="absolute -bottom-2 left-4 md:left-8 bg-white rounded-full p-2 shadow-lg">
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white text-sm md:text-base font-medium transition-all active:scale-[0.98] hover:opacity-90"
          style={{ backgroundColor: "var(--brand-primary)" }}
        >
          Schedule a Free Consultation
        </button>
      </div> */}
    </section>
  );
}

