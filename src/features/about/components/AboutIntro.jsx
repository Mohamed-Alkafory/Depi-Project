// //
// import { AnimatedGradient } from "@/components/ui/animated-gradient";

// export default function AboutIntro() {
//   return (
//     <section className="bg-white pt-16 pb-8">
//       <div className="mx-auto w-[92%] max-w-7xl">
//         <div className="relative h-[480px] overflow-hidden rounded-[36px] border border-black/10 shadow-xl">
//           {/* Animated Background */}
//           <AnimatedGradient
//             className="absolute inset-0"
//             config={{ preset: "Oceanic" }}
//           />

//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-black/25" />

//           {/* Content */}
//           <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
//             <p className="mb-5 text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
//               About Homi
//             </p>

//             <h1 className="max-w-4xl font-serif text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl lg:text-[5.5rem]">
//               Smarter Planning
//               <br />
//               Starts Here
//             </h1>

//             <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/80 md:text-lg">
//               Homi Architecture Platform is an intelligent construction platform
//               that helps homeowners, engineers, and contractors estimate project
//               costs, calculate building materials, and plan every stage with
//               confidence. We bring technology and construction together to make
//               smarter decisions, reduce uncertainty, and simplify the building
//               journey.
//             </p>
//           </div>

//           {/* Bottom Gradient */}
//           <div
//             className="absolute bottom-0 left-0 h-32 w-full"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,.08) 100%)",
//             }}
//           />
//         </div>
//       </div>
//     </section>
//   );
// }
//
import { AnimatedGradient } from "@/components/ui/animated-gradient";

export default function AboutIntro() {
  return (
    <section className="bg-white pt-16 pb-8">
      <div className="mx-auto w-[92%] max-w-7xl">
        <div className="relative h-[480px] overflow-hidden rounded-[36px] border border-black/10 shadow-xl">
          {/* Animated Background */}
          <AnimatedGradient
            className="absolute inset-0"
            config={{ preset: "Oceanic" }}
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
              About Homi
            </p>

            {/* ✅ الخط بقى مستقل: مش بيسحب من --font-serif بتاع theme المشروع.
                غيّر fontFamily هنا براحتك وقت ما تحب من غير ما تأثر على حاجة تانية. */}
            <h1
              className="max-w-4xl text-4xl leading-[1.05] tracking-tight md:text-6xl lg:text-[5.5rem]"
              style={{
                fontFamily: "'Libre Caslon Display', serif",
                fontWeight: 500,
              }}
            >
              Smarter Planning
              <br />
              Starts Here
            </h1>

            <p className="mt-8 max-w-2xl text-base font-light leading-8 text-white/80 md:text-lg">
              Homi Architecture Platform is an intelligent construction platform
              that helps homeowners, engineers, and contractors estimate project
              costs, calculate building materials, and plan every stage with
              confidence. We bring technology and construction together to make
              smarter decisions, reduce uncertainty, and simplify the building
              journey.
            </p>
          </div>

          {/* Bottom Gradient */}
          <div
            className="absolute bottom-0 left-0 h-32 w-full"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,.08) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
