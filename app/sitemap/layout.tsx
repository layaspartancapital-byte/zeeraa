import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";
import {
  generateWebPageSchema,
  generateBreadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sitemap | Zeeraa",
  description:
    "Browse all pages on the Zeeraa website — services, industries, locations, blog posts, and more.",
};

export default function SitemapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemas = [
    generateWebPageSchema({
      title: "Sitemap | Zeeraa",
      description: "Complete sitemap for the Zeeraa website.",
      url: "/sitemap",
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Sitemap", url: "/sitemap" },
    ]),
  ];

  return (
    <>
      <SchemaMarkup schema={schemas} />
      {children}
    </>
  );
}
