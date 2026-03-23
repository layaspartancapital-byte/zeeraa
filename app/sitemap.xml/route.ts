import { services, industries, locations } from "@/lib/slugs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeeraa.com";

function generateSitemapXml(): string {
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.8", changefreq: "weekly" },
    { url: "/case-studies", priority: "0.8", changefreq: "monthly" },
    { url: "/team", priority: "0.6", changefreq: "monthly" },
    { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" },
  ];

  const servicePages = services.map((s) => ({
    url: `/services/${s.slug}`,
    priority: "0.8",
    changefreq: "monthly",
  }));

  const industryPages = industries.map((i) => ({
    url: `/industries/${i.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const locationPages = locations.map((l) => ({
    url: `/locations/${l.slug}`,
    priority: "0.7",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...servicePages, ...industryPages, ...locationPages];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

export async function GET() {
  const xml = generateSitemapXml();
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
