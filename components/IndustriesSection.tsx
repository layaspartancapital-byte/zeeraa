"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { industries } from "@/lib/slugs";

export default function IndustriesSection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-center mb-12"
        >
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mb-4">
            Industries We Serve
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Specialized eCommerce expertise across 24 industries.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {industries.map((industry) => (
            <motion.div
              key={industry.slug}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.3 },
                },
              }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="inline-block px-5 py-3 glass-card text-sm text-text-muted hover:text-white hover:shadow-glow hover:border-primary/30 transition-all duration-300"
              >
                {industry.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
}
