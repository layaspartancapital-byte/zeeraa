"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "38+", label: "Platforms" },
  { value: "$50M+", label: "Revenue Managed" },
  { value: "200+", label: "Brands" },
  { value: "All 50", label: "States" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function StatsBar() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-5xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-glow p-8 md:p-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="text-center"
            >
              <p className="text-primary font-syne font-bold text-3xl md:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 text-text-muted text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
