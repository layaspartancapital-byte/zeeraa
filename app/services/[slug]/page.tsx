import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/lib/slugs";
import {
  generatePageMetadata,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateWebPageSchema,
} from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";
import FAQAccordion from "@/components/FAQAccordion";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return {};
  return generatePageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const schemas = [
    generateWebPageSchema({ title: service.title, description: service.metaDescription, url: `/services/${service.slug}` }),
    generateServiceSchema({ name: service.name, description: service.metaDescription, url: `/services/${service.slug}` }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.name, url: `/services/${service.slug}` },
    ]),
    generateFAQSchema(service.faqs),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">{service.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-syne text-4xl md:text-6xl font-bold text-text-primary mb-6">{service.h1}</h1>
          <p className="text-text-muted text-lg md:text-xl max-w-3xl leading-relaxed">{service.intro}</p>
        </section>

        {/* Benefits */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background-alt rounded-3xl mx-4">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">What&apos;s Included</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-primary transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">{i + 1}</span>
                </div>
                <p className="text-text-primary">{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <p className="text-xl md:text-2xl text-white font-syne font-semibold mb-6">{service.cta}</p>
            <Link href="/contact" className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-gray-100">
              Get Started
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">Frequently Asked Questions</h2>
          <FAQAccordion faqs={service.faqs} />
        </section>

        {/* Related Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`}
                className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-primary transition-all duration-300 group"
              >
                <h3 className="font-syne text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">{s.name}</h3>
                <p className="text-text-muted text-sm mt-2 line-clamp-2">{s.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
