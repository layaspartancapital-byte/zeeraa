import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "eCommerce Case Studies | Zeeraa",
  description:
    "See how Zeeraa drives measurable eCommerce growth. Real results from real brands across Amazon, Shopify, TikTok Shop, Walmart, and more.",
  openGraph: {
    title: "eCommerce Case Studies | Zeeraa",
    description:
      "See how Zeeraa drives measurable eCommerce growth. Real results from real brands across Amazon, Shopify, TikTok Shop, Walmart, and more.",
  },
};

interface CaseStudyFrontmatter {
  title: string;
  slug: string;
  client: string;
  industry: string;
  platforms: string[];
  results: string;
  metric: string;
  date: string;
  excerpt: string;
}

function getCaseStudies(): CaseStudyFrontmatter[] {
  const dir = path.join(process.cwd(), "content/case-studies");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  const studies = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data } = matter(raw);
    return data as CaseStudyFrontmatter;
  });

  return studies.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default function CaseStudiesPage() {
  const studies = getCaseStudies();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "eCommerce Case Studies",
      description:
        "See how Zeeraa drives measurable eCommerce growth across Amazon, Shopify, TikTok Shop, and more.",
      url: "https://zeeraa.com/case-studies",
      publisher: {
        "@type": "Organization",
        name: "Zeeraa",
        url: "https://zeeraa.com",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: studies.map((study, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: study.title,
          url: `https://zeeraa.com/case-studies/${study.slug}`,
        })),
      },
    },
    {
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
          name: "Case Studies",
          item: "https://zeeraa.com/case-studies",
        },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />
      <Header />

      <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">Case Studies</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-syne text-4xl md:text-6xl font-bold text-white">
              Case Studies
            </h1>
            <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
              Real results for real brands. See how Zeeraa drives measurable
              eCommerce growth across every platform.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 hover:border-primary/40 hover:shadow-glow transition-all duration-300"
              >
                {/* Industry badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                  {study.industry}
                </span>

                {/* Client name */}
                <h2 className="font-syne text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                  {study.client}
                </h2>

                {/* Result metric */}
                <div className="mb-4">
                  <span className="text-primary font-syne font-bold text-3xl">
                    {study.results}
                  </span>
                  <span className="block text-text-muted text-sm mt-1">
                    {study.metric}
                  </span>
                </div>

                {/* Platforms */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 rounded bg-white/5 text-xs text-text-muted"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                {/* Excerpt */}
                <p className="text-text-muted text-sm leading-relaxed">
                  {study.excerpt}
                </p>

                {/* Read more */}
                <span className="inline-block mt-4 text-sm font-semibold text-primary group-hover:underline">
                  Read Case Study &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
