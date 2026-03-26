import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "eCommerce Blog | Zeeraa",
  description:
    "Expert insights on Amazon, TikTok Shop, Walmart, and eCommerce growth strategies. Tips, guides, and industry analysis from the Zeeraa team.",
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  category: string;
}

function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), "content", "blog");
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));

  const posts: BlogPost[] = files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: data.slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      author: data.author,
      category: data.category,
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export default function BlogPage() {
  const posts = getBlogPosts();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zeeraa.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://zeeraa.com/blog" },
    ],
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "eCommerce Blog | Zeeraa",
    description: "Expert insights on Amazon, TikTok Shop, Walmart, and eCommerce growth strategies.",
    url: "https://zeeraa.com/blog",
    isPartOf: { "@type": "WebSite", name: "Zeeraa", url: "https://zeeraa.com" },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, webpageSchema]} />

      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="pt-32 pb-16 px-6 hero-gradient">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              eCommerce Blog
            </h1>
            <p className="text-lg text-[#A0B4D0] max-w-2xl mx-auto">
              Expert insights on Amazon, TikTok Shop, Walmart, and eCommerce
              growth strategies from the Zeeraa team.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24 px-6 pt-16 bg-background-alt">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-xl border border-border bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:border-primary hover:-translate-y-0.5">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-primary bg-primary-light px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <time
                      className="text-xs text-text-muted"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-semibold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-text-muted leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 text-sm text-primary font-medium">
                    Read more &rarr;
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
