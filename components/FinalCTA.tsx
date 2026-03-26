"use client";

import { motion } from "framer-motion";
import { useBookingModal } from "@/hooks/useBookingModal";

export default function FinalCTA() {
  const { open } = useBookingModal();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
          Ready to Scale Your eCommerce?
        </h2>
        <p className="mt-5 text-white/80 text-lg max-w-xl mx-auto">
          Get a free audit and strategy session with our team.
        </p>
        <button
          onClick={open}
          className="mt-8 px-10 py-4 bg-white text-primary font-semibold rounded-lg transition-colors duration-200 text-lg hover:bg-gray-100"
        >
          Book Your Free Strategy Call
        </button>
      </motion.div>
    </section>
  );
}
