"use client";

import { motion } from "framer-motion";
import { Store, BarChart3, Headphones } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    icon: Store,
    title: "Launch & Optimize",
    description:
      "We set up your store on every relevant platform, create optimized listings, and build your brand presence from the ground up.",
  },
  {
    icon: BarChart3,
    title: "Advertise & Scale",
    description:
      "Our team manages PPC campaigns, SEO strategy, and marketplace advertising to drive traffic and maximize ROAS across all platforms.",
  },
  {
    icon: Headphones,
    title: "Manage & Grow",
    description:
      "From inventory management to customer service to performance analytics — we handle the day-to-day so you can focus on your business.",
  },
];

export default function WhatWeDo() {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-center mb-16"
        >
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white mb-4">
            What We Do
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Zeeraa handles your entire eCommerce operation in three simple
            phases.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5 },
                },
              }}
              className="glass-card p-8 text-center hover:shadow-glow transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-syne text-xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
