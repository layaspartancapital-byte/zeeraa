"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin } from "lucide-react";
import { locations } from "@/lib/slugs";

const featuredStates = [
  "california", "texas", "florida", "new-york", "illinois",
  "pennsylvania", "ohio", "georgia", "north-carolina", "michigan",
];

export default function LocationsSection() {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
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
            Serving All 50 States
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From coast to coast, Zeeraa manages eCommerce operations for
            businesses across every US state.
          </p>
        </motion.div>

        {/* USA Map Placeholder */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="glass-card p-8 md:p-12 mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <MapPin className="w-12 h-12 text-primary" />
            <div>
              <p className="font-syne text-4xl font-bold text-white">50</p>
              <p className="text-text-muted">States Served</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {featuredStates.map((slug) => {
              const state = locations.find((l) => l.slug === slug);
              if (!state) return null;
              return (
                <Link
                  key={slug}
                  href={`/locations/${slug}`}
                  className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg text-white hover:bg-primary/20 transition-colors"
                >
                  {state.name}
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/sitemap"
              className="text-primary hover:text-primary-hover transition-colors text-sm"
            >
              View all 50 states →
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
