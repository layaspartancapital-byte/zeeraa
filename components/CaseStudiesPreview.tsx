"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const caseStudies = [
  {
    brand: "NovaBright Beauty",
    metric: "340%",
    metricLabel: "Revenue Increase",
    platform: "Amazon",
    timeframe: "6 months",
    description:
      "NovaBright Beauty was struggling with flat sales and poor ad performance on Amazon. Zeeraa rebuilt their listing strategy, optimized PPC campaigns, and launched A+ Content that tripled their conversion rate — driving a 340% revenue increase in just six months.",
  },
  {
    brand: "PeakGear Outdoors",
    metric: "$2.1M",
    metricLabel: "First Year Revenue",
    platform: "12 Platforms",
    timeframe: "12 months",
    description:
      "PeakGear Outdoors wanted to go from a single Shopify store to a multi-platform powerhouse. Zeeraa launched them on 12 marketplaces simultaneously — including Amazon, Walmart, eBay, and TikTok Shop — generating $2.1M in first-year revenue across all channels.",
  },
  {
    brand: "FreshPaws Pet Co",
    metric: "$850K/mo",
    metricLabel: "Monthly Revenue",
    platform: "TikTok Shop",
    timeframe: "8 months",
    description:
      "FreshPaws Pet Co had zero social commerce presence. Zeeraa built their TikTok Shop from scratch, managed influencer partnerships, and optimized their content strategy — scaling them from $0 to $850K per month in under 8 months.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function CaseStudiesPreview() {
  return (
    <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
            Case Studies
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
            Real results for real brands. See how Zeeraa drives measurable
            eCommerce growth.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.brand}
              variants={cardVariant}
              className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 hover:border-primary/40 hover:shadow-glow transition-all duration-300"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                {study.platform}
              </span>
              <h3 className="font-syne text-xl font-bold text-white mb-2">
                {study.brand}
              </h3>
              <div className="mb-4">
                <span className="text-primary font-syne font-bold text-4xl">
                  {study.metric}
                </span>
                <span className="block text-text-muted text-sm mt-1">
                  {study.metricLabel} in {study.timeframe}
                </span>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                {study.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline transition-all"
          >
            View All Case Studies
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
