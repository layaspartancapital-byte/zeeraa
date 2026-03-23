"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Zeeraa took our Amazon store from barely breaking even to our most profitable channel in under 90 days. Their team understands marketplace algorithms better than anyone we've worked with.",
    name: "Sarah Chen",
    company: "LuxVita Supplements",
    role: "Founder & CEO",
  },
  {
    quote:
      "We tried managing Walmart and eBay ourselves for a year with mediocre results. Within 3 months of partnering with Zeeraa, our multi-channel revenue doubled. They handle everything so we can focus on product development.",
    name: "Marcus Rivera",
    company: "Elevate Home Goods",
    role: "Director of eCommerce",
  },
  {
    quote:
      "The TikTok Shop launch Zeeraa executed for us was flawless. They coordinated influencer outreach, set up the entire storefront, and had us generating six figures monthly within weeks. Absolutely world-class execution.",
    name: "Jessica Park",
    company: "GlowUp Skincare",
    role: "VP of Digital Sales",
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

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
            Trusted by 200+ brands across the United States.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariant}
              className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 hover:border-primary/40 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <blockquote className="text-white text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div>
                <p className="font-semibold text-white">{t.name}</p>
                <p className="text-text-muted text-sm">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
