import { Metadata } from "next";
import Link from "next/link";
import SchemaMarkup from "@/components/SchemaMarkup";
import { services, industries, locations } from "@/lib/slugs";

export const metadata: Metadata = {
  title: "Sitemap | Zeeraa",
  description:
    "Browse all pages on the Zeeraa website. Find services, industries, locations, blog posts, and more.",
};

const mainPages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Team", href: "/team" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function SitemapPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Sitemap",
    description: "Complete sitemap for the Zeeraa website.",
    url: "https://zeeraa.com/sitemap",
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
        name: "Sitemap",
        item: "https://zeeraa.com/sitemap",
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[webPageSchema, breadcrumbSchema]} />

      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="font-syne text-4xl md:text-5xl font-bold mb-16">
            Sitemap
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Main Pages */}
            <div>
              <h2 className="font-syne text-xl font-bold mb-4 text-primary">
                Main Pages
              </h2>
              <ul className="space-y-2">
                {mainPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="text-muted hover:text-white transition-colors"
                    >
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h2 className="font-syne text-xl font-bold mb-4 text-primary">
                Services
              </h2>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-muted hover:text-white transition-colors"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h2 className="font-syne text-xl font-bold mb-4 text-primary">
                Industries
              </h2>
              <ul className="space-y-2">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/industries/${industry.slug}`}
                      className="text-muted hover:text-white transition-colors"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div>
              <h2 className="font-syne text-xl font-bold mb-4 text-primary">
                Locations
              </h2>
              <ul className="space-y-2">
                {locations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/locations/${location.slug}`}
                      className="text-muted hover:text-white transition-colors"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Blog */}
            <div>
              <h2 className="font-syne text-xl font-bold mb-4 text-primary">
                Blog
              </h2>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/blog"
                    className="text-muted hover:text-white transition-colors"
                  >
                    All Posts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
