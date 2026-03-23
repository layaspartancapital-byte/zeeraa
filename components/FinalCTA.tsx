"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "@/hooks/useBookingModal";

export default function FinalCTA() {
  const { open } = useBookingModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[200px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
          Ready to Scale Your eCommerce?
        </h2>
        <p className="mt-5 text-text-muted text-lg max-w-xl mx-auto">
          Get a free audit and strategy session with our team.
        </p>
        <button
          onClick={open}
          className="mt-8 px-10 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200 text-lg shadow-glow-lg"
        >
          Book Your Free Strategy Call
        </button>
      </motion.div>
    </section>
  );
}
