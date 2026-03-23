"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { locations } from "@/lib/slugs";

export default function LocationsSection() {
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
            visible: { transition: { staggerChildren: 0.02 } },
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
              Serving eCommerce Brands Across All 50 States
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              From California to New York, Zeeraa manages your eCommerce
              presence no matter where you&apos;re based.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {locations.map((location) => (
              <motion.div
                key={location.slug}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.25 },
                  },
                }}
              >
                <Link
                  href={`/locations/${location.slug}`}
                  className="inline-block px-4 py-2 rounded-lg border border-primary/20 text-white text-sm hover:bg-primary hover:border-primary hover:text-white transition-all duration-200"
                >
                  {location.name}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/contact"
              className="text-text-muted hover:text-primary transition-colors text-sm"
            >
              Don&apos;t see your state? We serve everywhere →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
