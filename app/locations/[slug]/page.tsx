import { notFound } from "next/navigation";
import Link from "next/link";
import { locations, services } from "@/lib/slugs";
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
} from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const location = locations.find((l) => l.slug === params.slug);
  if (!location) return {};
  return generatePageMetadata({
    title: location.title,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
  });
}

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = locations.find((l) => l.slug === params.slug);
  if (!location) notFound();

  const schemas = [
    generateWebPageSchema({
      title: location.title,
      description: location.metaDescription,
      url: `/locations/${location.slug}`,
    }),
    generateLocalBusinessSchema(location.name),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Locations", url: "/locations" },
      { name: location.name, url: `/locations/${location.slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/locations" className="hover:text-white transition-colors">Locations</Link>
            <span>/</span>
            <span className="text-white">{location.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-syne text-4xl md:text-6xl font-bold text-white mb-6">
            {location.h1}
          </h1>
          <p className="text-text-muted text-lg md:text-xl max-w-3xl leading-relaxed">
            {location.intro}
          </p>
        </section>

        {/* Services in this state */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-white mb-8">
            Our Services in {location.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 12).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="glass-card p-6 hover:shadow-glow transition-shadow duration-300 group"
              >
                <h3 className="font-syne text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-text-muted text-sm mt-2 line-clamp-2">
                  {service.metaDescription}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-text-muted">
              Plus {services.length - 12} more services available for {location.name} businesses.
            </p>
          </div>
        </section>

        {/* Why choose Zeeraa */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-white mb-8">
            Why {location.name} Businesses Choose Zeeraa
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <h3 className="font-syne text-xl font-semibold text-white mb-3">38+ Platforms</h3>
              <p className="text-text-muted">We manage every major eCommerce platform so you can sell everywhere your customers shop.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-syne text-xl font-semibold text-white mb-3">Dedicated Team</h3>
              <p className="text-text-muted">Your {location.name} business gets a dedicated account team that understands your market and goals.</p>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-syne text-xl font-semibold text-white mb-3">Proven Results</h3>
              <p className="text-text-muted">We&apos;ve managed over $50M in eCommerce revenue for brands across all 50 states.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="glass-card p-8 md:p-12 text-center blue-glow">
            <h2 className="font-syne text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Grow Your {location.name} eCommerce Business?
            </h2>
            <p className="text-text-muted mb-6">
              Get a free audit and strategy session tailored to your business.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Book Your Free Strategy Call
            </Link>
          </div>
        </section>

        {/* Other locations */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-white mb-8">
            We Serve All 50 States
          </h2>
          <div className="flex flex-wrap gap-3">
            {locations
              .filter((l) => l.slug !== location.slug)
              .map((l) => (
                <Link
                  key={l.slug}
                  href={`/locations/${l.slug}`}
                  className="px-4 py-2 glass-card text-sm text-text-muted hover:text-white hover:shadow-glow transition-all duration-300"
                >
                  {l.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
