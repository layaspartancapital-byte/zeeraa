"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { services, industries, locations } from "@/lib/slugs";

const mainPages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function SitemapPage() {
  const [query, setQuery] = useState("");
  const q = query.toLowerCase().trim();

  const filteredServices = useMemo(
    () => (q ? services.filter((s) => s.name.toLowerCase().includes(q)) : services),
    [q]
  );
  const filteredIndustries = useMemo(
    () => (q ? industries.filter((i) => i.name.toLowerCase().includes(q)) : industries),
    [q]
  );
  const filteredLocations = useMemo(
    () => (q ? locations.filter((l) => l.name.toLowerCase().includes(q)) : locations),
    [q]
  );
  const filteredMainPages = useMemo(
    () => (q ? mainPages.filter((p) => p.name.toLowerCase().includes(q)) : mainPages),
    [q]
  );

  const totalResults =
    filteredServices.length +
    filteredIndustries.length +
    filteredLocations.length +
    filteredMainPages.length;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <h1 className="font-syne text-4xl md:text-5xl font-bold text-white mb-4">
          Sitemap
        </h1>
        <p className="text-text-muted text-lg mb-10 max-w-2xl">
          Browse all pages on the Zeeraa website — services, industries, locations, and more.
        </p>

        {/* Search bar */}
        <div className="relative max-w-md mb-14">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, services, states…"
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-white placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
          />
          {q && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">
              {totalResults} result{totalResults !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Main Pages */}
        {filteredMainPages.length > 0 && (
          <section className="mb-14">
            <h2 className="font-syne text-2xl font-bold text-white mb-6">
              Main Pages
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredMainPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="px-4 py-3 rounded-xl border border-border bg-card text-text-muted text-sm hover:text-white hover:border-primary/40 hover:shadow-glow transition-all duration-200"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {filteredServices.length > 0 && (
          <section className="mb-14">
            <h2 className="font-syne text-2xl font-bold text-white mb-2">
              Our Services
            </h2>
            <p className="text-text-muted text-sm mb-6">
              {services.length} specialized eCommerce services
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="px-4 py-3 rounded-xl border border-border bg-card text-text-muted text-sm hover:text-white hover:border-primary/40 hover:shadow-glow transition-all duration-200"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Industries */}
        {filteredIndustries.length > 0 && (
          <section className="mb-14">
            <h2 className="font-syne text-2xl font-bold text-white mb-2">
              Industries We Serve
            </h2>
            <p className="text-text-muted text-sm mb-6">
              {industries.length} industry verticals with specialized expertise
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="px-4 py-3 rounded-xl border border-border bg-card text-text-muted text-sm hover:text-white hover:border-primary/40 hover:shadow-glow transition-all duration-200"
                >
                  {industry.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Locations */}
        {filteredLocations.length > 0 && (
          <section className="mb-14">
            <h2 className="font-syne text-2xl font-bold text-white mb-2">
              Locations We Serve
            </h2>
            <p className="text-text-muted text-sm mb-6">
              All 50 US states, listed A–Z
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredLocations.map((location) => (
                <Link
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  className="px-4 py-3 rounded-xl border border-border bg-card text-text-muted text-sm hover:text-white hover:border-primary/40 hover:shadow-glow transition-all duration-200"
                >
                  {location.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* No results */}
        {q && totalResults === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted text-lg">
              No pages found for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
