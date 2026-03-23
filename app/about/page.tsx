import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "About Zeeraa | Full-Service eCommerce Agency",
  description:
    "Zeeraa is a full-service eCommerce management agency helping brands scale across Amazon, Shopify, Walmart, and 35+ platforms with expert strategy, advertising, and operations.",
};

const whatWeDo = [
  {
    title: "Platform Management",
    description:
      "We manage your storefronts across Amazon, Shopify, Walmart, eBay, TikTok Shop, Etsy, and 30+ additional platforms — handling listings, inventory, compliance, and day-to-day operations so you can focus on your brand.",
  },
  {
    title: "Advertising & Growth",
    description:
      "From PPC and sponsored ads to social commerce campaigns, we build and optimize multi-channel advertising strategies that drive traffic, conversions, and profitable growth at scale.",
  },
  {
    title: "Strategy & Support",
    description:
      "Every brand gets a dedicated team of eCommerce strategists, designers, and analysts. We provide ongoing consulting, performance reporting, and proactive recommendations to keep you ahead of the competition.",
  },
];

const stats = [
  { value: "38+", label: "Platforms" },
  { value: "$50M+", label: "Revenue Managed" },
  { value: "200+", label: "Brands" },
  { value: "All 50", label: "States" },
];

const values = [
  {
    title: "Results-Driven",
    description:
      "Every action we take is tied to measurable outcomes. We optimize for revenue, profit, and sustainable growth — not vanity metrics.",
  },
  {
    title: "Platform Experts",
    description:
      "Our team holds certifications and deep expertise across every major eCommerce marketplace and advertising platform.",
  },
  {
    title: "Transparent",
    description:
      "Real-time dashboards, weekly reports, and open communication. You always know exactly what we're doing and why.",
  },
  {
    title: "Dedicated Teams",
    description:
      "You're not a ticket number. Every client gets a dedicated team that knows your brand, your goals, and your competitive landscape.",
  },
];

export default function AboutPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Zeeraa",
    description:
      "Learn about Zeeraa, a full-service eCommerce management agency helping brands scale across 38+ platforms.",
    url: "https://zeeraa.com/about",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://zeeraa.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://zeeraa.com/about",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zeeraa",
    url: "https://zeeraa.com",
    description:
      "Full-service eCommerce management agency helping brands scale across Amazon, Shopify, Walmart, and 35+ additional platforms.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://zeeraa.com/contact",
    },
  };

  return (
    <>
      <SchemaMarkup
        schema={[webPageSchema, breadcrumbSchema, organizationSchema]}
      />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-syne text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-primary">Zeeraa</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            Zeeraa is a full-service eCommerce management agency built for
            brands that want to scale everywhere — without the complexity.
            We handle strategy, operations, advertising, and growth across
            38+ platforms so you can focus on building your brand.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-xl md:text-2xl text-muted leading-relaxed">
            &ldquo;We exist to help eCommerce brands scale across every
            platform without the complexity.&rdquo;
          </p>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-center mb-16">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whatWeDo.map((item) => (
              <div key={item.title} className="glass-card p-8">
                <h3 className="font-syne text-xl font-bold mb-4 text-primary">
                  {item.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-28 border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-syne text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </p>
                <p className="text-muted text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-center mb-16">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-8">
                <h3 className="font-syne text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-syne text-3xl md:text-4xl font-bold mb-6">
            Ready to scale?
          </h2>
          <p className="text-muted text-lg mb-8">
            Book a call with our team and discover how Zeeraa can help your
            brand grow across every platform.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
          >
            Book a Call
          </a>
        </div>
      </section>
    </>
  );
}
