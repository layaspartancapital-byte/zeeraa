import { notFound } from "next/navigation";
import Link from "next/link";
import { industries } from "@/lib/slugs";
import {
  generatePageMetadata,
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) return {};
  return generatePageMetadata({
    title: industry.title,
    description: industry.metaDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = industries.find((i) => i.slug === params.slug);
  if (!industry) notFound();

  const schemas = [
    generateWebPageSchema({ title: industry.title, description: industry.metaDescription, url: `/industries/${industry.slug}` }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Industries", url: "/industries" },
      { name: industry.name, url: `/industries/${industry.slug}` },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
          <nav className="flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-text-primary">{industry.name}</span>
          </nav>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="font-syne text-4xl md:text-6xl font-bold text-text-primary mb-6">{industry.h1}</h1>
          <p className="text-text-muted text-lg md:text-xl max-w-3xl leading-relaxed">{industry.intro}</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">Industry Challenges</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.challenges.map((challenge, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-error text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-text-primary">{challenge}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-background-alt">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">How Zeeraa Solves It</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {industry.solutions.map((solution, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-6 shadow-card">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-success text-sm font-bold">✓</span>
                  </div>
                  <p className="text-text-primary">{solution}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">Platforms We Manage for {industry.name}</h2>
          <div className="flex flex-wrap gap-4">
            {industry.platforms.map((platform) => (
              <span key={platform} className="px-6 py-3 bg-primary-light text-primary font-medium rounded-full">
                {platform}
              </span>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-syne text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Grow Your {industry.name} Brand Online?
            </h2>
            <p className="text-white/80 mb-6">
              Get a free eCommerce audit tailored to the {industry.name.toLowerCase()} industry.
            </p>
            <Link href="/contact" className="inline-block bg-white text-primary font-semibold py-3 px-8 rounded-lg transition-colors hover:bg-gray-100">
              Get Your Free Audit
            </Link>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-syne text-3xl font-bold text-text-primary mb-8">Related Industries</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {industries.filter((i) => i.slug !== industry.slug).slice(0, 3).map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`}
                className="bg-white border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover hover:border-primary transition-all duration-300 group"
              >
                <h3 className="font-syne text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">{i.name}</h3>
                <p className="text-text-muted text-sm mt-2 line-clamp-2">{i.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
