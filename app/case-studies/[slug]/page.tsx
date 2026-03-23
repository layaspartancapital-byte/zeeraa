import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

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

function getCaseStudy(slug: string) {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return { frontmatter: data as CaseStudyFrontmatter, content };
    }
  }

  return null;
}

export function generateStaticParams() {
  const files = fs.readdirSync(CASE_STUDIES_DIR).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(CASE_STUDIES_DIR, file), "utf-8");
    const { data } = matter(raw);
    return { slug: data.slug as string };
  });
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) {
    return { title: "Case Study Not Found | Zeeraa" };
  }

  const { frontmatter } = study;

  return {
    title: `${frontmatter.title} | Zeeraa`,
    description: frontmatter.excerpt,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.excerpt,
      type: "article",
      publishedTime: frontmatter.date,
    },
  };
}

export default function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const study = getCaseStudy(params.slug);

  if (!study) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-syne text-4xl font-bold text-white mb-4">
              Case Study Not Found
            </h1>
            <Link href="/case-studies" className="text-primary hover:underline">
              View all case studies
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const { frontmatter, content } = study;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: frontmatter.title,
      description: frontmatter.excerpt,
      datePublished: frontmatter.date,
      url: `https://zeeraa.com/case-studies/${frontmatter.slug}`,
      publisher: {
        "@type": "Organization",
        name: "Zeeraa",
        url: "https://zeeraa.com",
      },
      about: {
        "@type": "Organization",
        name: frontmatter.client,
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
        {
          "@type": "ListItem",
          position: 3,
          name: frontmatter.client,
          item: `https://zeeraa.com/case-studies/${frontmatter.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />
      <Header />

      <main className="min-h-screen bg-background pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/case-studies"
                  className="hover:text-white transition-colors"
                >
                  Case Studies
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{frontmatter.client}</li>
            </ol>
          </nav>

          {/* Meta header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {frontmatter.industry}
              </span>
              {frontmatter.platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-2 py-0.5 rounded bg-white/5 text-xs text-text-muted"
                >
                  {platform}
                </span>
              ))}
            </div>
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-primary font-syne font-bold text-4xl">
                {frontmatter.results}
              </span>
              <span className="text-text-muted text-sm">
                {frontmatter.metric}
              </span>
            </div>
          </div>

          {/* Markdown content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-syne prose-headings:text-white prose-p:text-text-muted prose-li:text-text-muted prose-strong:text-white prose-a:text-primary prose-th:text-white prose-td:text-text-muted prose-table:border-border prose-th:border-border prose-td:border-border">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/case-studies"
              className="text-primary font-semibold hover:underline"
            >
              &larr; All Case Studies
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
