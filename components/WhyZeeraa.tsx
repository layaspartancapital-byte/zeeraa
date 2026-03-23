"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "38+ Platform Expertise",
    zeeraa: true,
    inHouse: false,
    otherAgency: false,
  },
  {
    feature: "Dedicated Account Team",
    zeeraa: true,
    inHouse: true,
    otherAgency: false,
  },
  {
    feature: "Multi-Platform Coordination",
    zeeraa: true,
    inHouse: false,
    otherAgency: false,
  },
  {
    feature: "No Hiring or Training Costs",
    zeeraa: true,
    inHouse: false,
    otherAgency: true,
  },
  {
    feature: "Data-Driven Strategy",
    zeeraa: true,
    inHouse: false,
    otherAgency: true,
  },
  {
    feature: "Full-Stack Management",
    zeeraa: true,
    inHouse: false,
    otherAgency: false,
  },
];

export default function WhyZeeraa() {
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
          visible: { transition: { staggerChildren: 0.1 } },
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
            Why Zeeraa
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            See how Zeeraa compares to hiring in-house or working with other
            agencies.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-text-muted font-medium">
                    Feature
                  </th>
                  <th className="p-4 text-center text-primary font-syne font-bold">
                    Zeeraa
                  </th>
                  <th className="p-4 text-center text-text-muted font-medium">
                    In-House
                  </th>
                  <th className="p-4 text-center text-text-muted font-medium">
                    Other Agencies
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="p-4 text-white">{row.feature}</td>
                    <td className="p-4 text-center">
                      <Check className="w-5 h-5 text-success mx-auto" />
                    </td>
                    <td className="p-4 text-center">
                      {row.inHouse ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-error mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.otherAgency ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-error mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
