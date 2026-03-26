"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "@/hooks/useBookingModal";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function HeroSection() {
  const { open } = useBookingModal();

  const scrollToCaseStudies = () => {
    const el = document.getElementById("case-studies");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden hero-gradient">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #A0B4D0 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-syne text-5xl md:text-7xl font-bold text-white leading-tight"
        >
          Full-Stack eCommerce.
          <br />
          Every Platform. Every Result.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-[#A0B4D0] text-lg max-w-3xl mx-auto leading-relaxed"
        >
          Zeeraa manages your entire eCommerce presence across Amazon, Shopify,
          Walmart, TikTok Shop, and 30+ more US platforms — from day one to
          scale.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={open}
            className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200 text-lg"
          >
            Get a Free Audit
          </button>
          <button
            onClick={scrollToCaseStudies}
            className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors duration-200 text-lg"
          >
            See Our Work
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
