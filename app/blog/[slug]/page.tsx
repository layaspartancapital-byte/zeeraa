import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { Metadata } from "next";
import Link from "next/link";
import SchemaMarkup from "@/components/SchemaMarkup";

export const revalidate = 3600;

const blogDir = path.join(process.cwd(), "content", "blog");

function getPostBySlug(slug: string) {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    if (data.slug === slug) {
      return { frontmatter: data, content };
    }
  }

  return null;
}

export async function generateStaticParams() {
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return { slug: data.slug as string };
  });
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return { title: "Post Not Found | Zeeraa" };
  }

  return {
    title: `${post.frontmatter.title} | Zeeraa`,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-blue-400 hover:underline">
            &larr; Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const { frontmatter, content } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.excerpt,
    datePublished: frontmatter.date,
    author: {
      "@type": "Organization",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Zeeraa",
      url: "https://zeeraa.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zeeraa.com/blog/${frontmatter.slug}`,
    },
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
        name: "Blog",
        item: "https://zeeraa.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: `https://zeeraa.com/blog/${frontmatter.slug}`,
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />

      <main className="min-h-screen bg-black text-white">
        <article className="pt-32 pb-24 px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="text-sm text-gray-400 hover:text-white transition-colors mb-8 inline-block"
            >
              &larr; Back to Blog
            </Link>

            {/* Post meta */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-medium uppercase tracking-wider text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                {frontmatter.category}
              </span>
              <time
                className="text-xs text-gray-500"
                dateTime={frontmatter.date}
              >
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-xs text-gray-500">
                {frontmatter.author}
              </span>
            </div>

            {/* Markdown content */}
            <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-p:text-gray-300 prose-p:leading-relaxed prose-strong:text-white prose-ul:text-gray-300 prose-li:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
