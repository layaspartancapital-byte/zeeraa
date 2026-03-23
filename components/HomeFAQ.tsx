"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FAQAccordion from "@/components/FAQAccordion";

interface HomeFAQProps {
  faqs: { question: string; answer: string }[];
}

export default function HomeFAQ({ faqs }: HomeFAQProps) {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        }}
      >
        <div className="text-center mb-12">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Everything you need to know about working with Zeeraa.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />
        </div>
      </motion.div>
    </section>
  );
}
