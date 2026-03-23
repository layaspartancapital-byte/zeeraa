import { services, industries, locations } from "@/lib/slugs";
import fs from "fs";
import path from "path";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zeeraa.com";

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getBlogSlugs(): string[] {
  try {
    const dir = path.join(process.cwd(), "content", "blog");
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

function getCaseStudySlugs(): string[] {
  try {
    const dir = path.join(process.cwd(), "content", "case-studies");
    return fs
      .readdirSync(dir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  } catch {
    return [];
  }
}

interface SitemapEntry {
  url: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

function generateSitemapXml(): string {
  const today = getToday();
  const blogSlugs = getBlogSlugs();
  const caseStudySlugs = getCaseStudySlugs();

  const entries: SitemapEntry[] = [];

  // Priority 1.0
  entries.push(
    { url: "/", priority: "1.0", changefreq: "daily", lastmod: today },
    { url: "/contact", priority: "1.0", changefreq: "weekly", lastmod: today }
  );

  // Priority 0.9 — Services
  for (const s of services) {
    entries.push({
      url: `/services/${s.slug}`,
      priority: "0.9",
      changefreq: "weekly",
      lastmod: today,
    });
  }

  // Priority 0.9 — Industries
  for (const i of industries) {
    entries.push({
      url: `/industries/${i.slug}`,
      priority: "0.9",
      changefreq: "weekly",
      lastmod: today,
    });
  }

  // Priority 0.8 — Locations
  for (const l of locations) {
    entries.push({
      url: `/locations/${l.slug}`,
      priority: "0.8",
      changefreq: "weekly",
      lastmod: today,
    });
  }

  // Priority 0.8 — Static pages
  entries.push(
    { url: "/about", priority: "0.8", changefreq: "monthly", lastmod: today },
    { url: "/case-studies", priority: "0.8", changefreq: "monthly", lastmod: today },
    { url: "/team", priority: "0.8", changefreq: "monthly", lastmod: today }
  );

  // Priority 0.7 — Blog
  entries.push({
    url: "/blog",
    priority: "0.7",
    changefreq: "weekly",
    lastmod: today,
  });

  for (const slug of blogSlugs) {
    entries.push({
      url: `/blog/${slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: today,
    });
  }

  // Priority 0.7 — Case study pages
  for (const slug of caseStudySlugs) {
    entries.push({
      url: `/case-studies/${slug}`,
      priority: "0.7",
      changefreq: "monthly",
      lastmod: today,
    });
  }

  // Priority 0.5 — Legal/sitemap
  entries.push(
    { url: "/privacy", priority: "0.5", changefreq: "yearly", lastmod: today },
    { url: "/terms", priority: "0.5", changefreq: "yearly", lastmod: today },
    { url: "/sitemap", priority: "0.5", changefreq: "monthly", lastmod: today }
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE_URL}${e.url}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
