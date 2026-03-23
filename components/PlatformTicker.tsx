"use client";

import { motion } from "framer-motion";

const platforms = [
  "Amazon",
  "Shopify",
  "Walmart",
  "eBay",
  "TikTok Shop",
  "Etsy",
  "Target+",
  "Home Depot",
  "Wayfair",
  "Chewy",
  "Best Buy",
  "Newegg",
  "Google Shopping",
  "Facebook Shop",
  "Pinterest",
  "Nordstrom",
  "Macy's",
];

// Duplicate for seamless loop
const doubled = [...platforms, ...platforms];

export default function PlatformTicker() {
  return (
    <section className="py-10 overflow-hidden bg-background border-y border-border">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-4 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          {doubled.map((platform, i) => (
            <span
              key={`${platform}-${i}`}
              className="flex-shrink-0 px-5 py-2.5 rounded-full border border-border bg-card text-text-muted text-sm font-medium whitespace-nowrap hover:border-primary/40 hover:text-white transition-colors duration-200"
            >
              {platform}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
