import { motion } from "framer-motion";
import { Calculator, BrickWall, Building2, Sparkles } from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Accurate Estimation",
    description:
      "Generate reliable cost estimates and reduce budgeting uncertainty before construction starts.",
  },
  {
    icon: BrickWall,
    title: "Material Calculator",
    description:
      "Automatically calculate quantities of bricks, cement, steel, and other construction materials.",
  },
  {
    icon: Building2,
    title: "Smart Planning",
    description:
      "Organize every construction phase with clear planning tools and structured project workflows.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description:
      "Receive intelligent recommendations that help optimize materials, costs, and planning decisions.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function WhyChooseHOMI() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FCFCFD] pt-8 pb-10 md:pt-18 md:pb-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-24 flex max-w-5xl flex-col items-center text-center"
        >
          {/* Small Label */}
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-teal-500/40" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-teal-500">
              WHY HOMI
            </span>

            <div className="h-px w-16 bg-teal-500/40" />
          </div>

          {/* Heading */}
          <span className="block text-2xl font-semibold  text-slate-900 pb-2">
            Build Smarter.
          </span>

          <span className="block text-3xl text-[#14B8A6]">
            Plan With Confidence.
          </span>
          {/* Description */}
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-500 md:text-xl">
            HOMI helps homeowners, architects, and contractors estimate costs,
            calculate materials, and organize every construction phase with
            intelligent planning tools designed for modern building projects.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  y: -6,
                  scale: 1.01,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group relative cursor-default rounded-[28px] border border-slate-100 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition-shadow duration-500 hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_12px_40px_rgba(0,0,0,0.06),0_0_0_1px_rgba(20,184,166,0.08)] md:p-10 lg:p-12"
              >
                {/* Subtle teal glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_50%_0%,rgba(20,184,166,0.06),transparent_60%)]" />
                </div>

                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-slate-700 transition-colors duration-300 group-hover:bg-[#14B8A6]/10 group-hover:text-[#14B8A6]">
                    <Icon className="h-6 w-6" strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base leading-relaxed text-slate-500 md:text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
