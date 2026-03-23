import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import SchemaMarkup from "@/components/SchemaMarkup";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from "@/lib/seo";

const VSLVideo = dynamic(() => import("@/components/VSLVideo"), { ssr: false });
const PlatformTicker = dynamic(() => import("@/components/PlatformTicker"));
const StatsBar = dynamic(() => import("@/components/StatsBar"));
const WhatWeDo = dynamic(() => import("@/components/WhatWeDo"));
const ServicesGrid = dynamic(() => import("@/components/ServicesGrid"));
const WhyZeeraa = dynamic(() => import("@/components/WhyZeeraa"));
const CaseStudiesPreview = dynamic(() => import("@/components/CaseStudiesPreview"));
const IndustriesSection = dynamic(() => import("@/components/IndustriesSection"));
const LocationsSection = dynamic(() => import("@/components/LocationsSection"));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection"));
const HomeFAQ = dynamic(() => import("@/components/HomeFAQ"));
const FinalCTA = dynamic(() => import("@/components/FinalCTA"));

const homeFaqs = [
  { question: "What platforms does Zeeraa manage?", answer: "Zeeraa manages 38+ eCommerce platforms including Amazon, Shopify, Walmart, eBay, TikTok Shop, Etsy, Target Plus, Home Depot, Wayfair, Best Buy, Newegg, and many more. We handle every major US marketplace." },
  { question: "How much does Zeeraa's eCommerce management cost?", answer: "Our pricing is customized based on the number of platforms, product catalog size, and services needed. We offer flexible packages starting from single-platform management to full multi-platform operations. Contact us for a free audit and custom quote." },
  { question: "How quickly can I see results?", answer: "Most clients see measurable improvements within 30-60 days. PPC and advertising optimizations can show results within 2 weeks, while organic ranking improvements typically take 60-90 days. Full multi-platform launches usually take 2-3 months." },
  { question: "Do you work with small businesses or only large brands?", answer: "We work with businesses of all sizes — from solo sellers looking to scale past $10K/month to enterprise brands managing $10M+ across multiple platforms. Our services are tailored to your current stage and growth goals." },
  { question: "Can you manage multiple platforms simultaneously?", answer: "Absolutely. Multi-platform management is our specialty. Most of our clients sell on 3-8 platforms. We coordinate strategy, inventory, pricing, and branding across all channels while tailoring tactics for each platform's unique requirements." },
  { question: "Do you offer a free audit?", answer: "Yes, we offer a comprehensive free eCommerce audit that analyzes your current listings, advertising, SEO, and competitive positioning. The audit includes actionable recommendations you can implement immediately, whether or not you work with us." },
  { question: "What industries do you serve?", answer: "We serve 24+ industries including health & wellness, beauty, electronics, home & kitchen, fashion, pet supplies, food & beverage, supplements, sports & outdoors, and many more. Our team has category-specific expertise across all major eCommerce verticals." },
  { question: "Do you serve businesses in all 50 states?", answer: "Yes, Zeeraa serves eCommerce businesses in all 50 US states. Our team works remotely with clients nationwide, providing the same level of dedicated service regardless of location." },
];

export default function HomePage() {
  const schemas = [
    generateWebPageSchema({
      title: "Zeeraa | Full-Stack eCommerce Management Agency",
      description: "Zeeraa manages your entire eCommerce presence across Amazon, Shopify, Walmart, TikTok Shop, and 35+ US platforms.",
      url: "/",
    }),
    generateOrganizationSchema(),
    generateLocalBusinessSchema(),
    generateFAQSchema(homeFaqs),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <main className="min-h-screen bg-background">
        <HeroSection />
        <VSLVideo />
        <PlatformTicker />
        <StatsBar />
        <WhatWeDo />
        <ServicesGrid />
        <WhyZeeraa />
        <div id="case-studies">
          <CaseStudiesPreview />
        </div>
        <IndustriesSection />
        <LocationsSection />
        <TestimonialsSection />
        <HomeFAQ faqs={homeFaqs} />
        <FinalCTA />
      </main>
    </>
  );
}
