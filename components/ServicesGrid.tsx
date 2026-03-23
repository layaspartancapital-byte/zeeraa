"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { services } from "@/lib/slugs";
import {
  Store,
  ShoppingCart,
  Package,
  BarChart3,
  Search,
  Shield,
  Truck,
  Globe,
  Megaphone,
  Camera,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Zap,
  Target,
  PenTool,
  Layers,
  Monitor,
  Headphones,
  DollarSign,
  Boxes,
  Tag,
  Share2,
  MessageSquare,
  Palette,
  ClipboardList,
  LayoutGrid,
  RefreshCw,
  Award,
  ShoppingBag,
  Briefcase,
  BarChart,
  Mail,
  Percent,
  ArrowUpRight,
  Smartphone,
  Database,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: LucideIcon[] = [
  Store,
  ShoppingCart,
  Package,
  BarChart3,
  Search,
  Shield,
  Truck,
  Globe,
  Megaphone,
  Camera,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Zap,
  Target,
  PenTool,
  Layers,
  Monitor,
  Headphones,
  DollarSign,
  Boxes,
  Tag,
  Share2,
  MessageSquare,
  Palette,
  ClipboardList,
  LayoutGrid,
  RefreshCw,
  Award,
  ShoppingBag,
  Briefcase,
  BarChart,
  Mail,
  Percent,
  ArrowUpRight,
  Smartphone,
  Database,
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ServicesGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white">
            Our Services
          </h2>
          <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
            38 specialized eCommerce services to launch, manage, and scale your
            brand across every major US platform.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {services.map((service, index) => {
            const Icon = iconMap[index % iconMap.length];
            const description =
              service.intro.length > 80
                ? service.intro.slice(0, 80) + "..."
                : service.intro;

            return (
              <motion.div key={service.slug} variants={cardVariant}>
                <Link
                  href={`/services/${service.slug}`}
                  className="block h-full p-6 rounded-xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-syne font-semibold text-white text-base mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-3">
                    {description}
                  </p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
