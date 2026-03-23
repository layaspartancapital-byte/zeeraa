"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Store,
  ShoppingCart,
  Package,
  Smartphone,
  BarChart3,
  Search,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface TopService {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

const topServices: TopService[] = [
  {
    slug: "amazon-store-management",
    name: "Amazon Store Management",
    description:
      "End-to-end Amazon management — listings, PPC, inventory, A+ Content, and account health monitoring to dominate the world's largest marketplace.",
    icon: Store,
  },
  {
    slug: "shopify-store-development",
    name: "Shopify Store Development",
    description:
      "Custom Shopify stores built for conversions. Theme design, app integrations, checkout optimization, and ongoing growth strategy.",
    icon: ShoppingCart,
  },
  {
    slug: "walmart-marketplace-management",
    name: "Walmart Marketplace Management",
    description:
      "Capitalize on Walmart's explosive growth with optimized listings, Walmart Connect ads, WFS fulfillment, and Buy Box strategy.",
    icon: Package,
  },
  {
    slug: "tiktok-shop-management",
    name: "TikTok Shop Management",
    description:
      "Launch and scale on TikTok's fastest-growing eCommerce channel with affiliate programs, live shopping, and shoppable content strategy.",
    icon: Smartphone,
  },
  {
    slug: "amazon-ppc-dsp-advertising",
    name: "Amazon PPC & DSP Advertising",
    description:
      "Data-driven Sponsored Products, Brands, Display, and DSP campaigns that maximize ROAS and turn ad spend into profitable growth.",
    icon: BarChart3,
  },
  {
    slug: "ecommerce-seo",
    name: "eCommerce SEO",
    description:
      "Drive sustainable organic growth across your store and marketplace listings with technical SEO, content strategy, and link building.",
    icon: Search,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-[#0A0A0A]">
            Our Services
          </h2>
          <p className="mt-4 text-[#555] text-lg max-w-2xl mx-auto">
            38 specialized eCommerce services to launch, manage, and scale your
            brand across every major US platform.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {topServices.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.slug} variants={cardVariant}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full p-8 rounded-2xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-syne font-bold text-[#0A0A0A] text-xl mb-3 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-[#555] text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <span className="text-primary text-sm font-semibold inline-flex items-center gap-1.5 group-hover:gap-3 transition-all">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/sitemap"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors duration-200"
          >
            View All 38 Services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
