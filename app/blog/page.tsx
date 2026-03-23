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
    ],
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "eCommerce Blog | Zeeraa",
    description:
      "Expert insights on Amazon, TikTok Shop, Walmart, and eCommerce growth strategies.",
    url: "https://zeeraa.com/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Zeeraa",
      url: "https://zeeraa.com",
    },
  };

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, webpageSchema]} />

      <main className="min-h-screen bg-black text-white">
        {/* Header */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              eCommerce Blog
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Expert insights on Amazon, TikTok Shop, Walmart, and eCommerce
              growth strategies from the Zeeraa team.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <article className="h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <time
                      className="text-xs text-gray-500"
                      dateTime={post.date}
                    >
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 text-sm text-blue-400 font-medium">
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
