"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/useBookingModal";

/* ------------------------------------------------------------------ */
/*  Data — all slugs match /lib/slugs.ts                               */
/* ------------------------------------------------------------------ */

const serviceCategories = [
  {
    title: "Platform Management",
    items: [
      { label: "Amazon Store Management", href: "/services/amazon-store-management" },
      { label: "Shopify Store Development", href: "/services/shopify-store-development" },
      { label: "Walmart Marketplace", href: "/services/walmart-marketplace-management" },
      { label: "TikTok Shop Management", href: "/services/tiktok-shop-management" },
      { label: "eBay Store Optimization", href: "/services/ebay-store-optimization" },
      { label: "Etsy Shop Management", href: "/services/etsy-shop-management" },
    ],
  },
  {
    title: "Advertising & SEO",
    items: [
      { label: "Amazon PPC & DSP", href: "/services/amazon-ppc-dsp-advertising" },
      { label: "eCommerce SEO", href: "/services/ecommerce-seo" },
      { label: "Google Shopping & Listings", href: "/services/google-shopping-free-listings" },
      { label: "Brand Registry & IP", href: "/services/brand-registry-ip-protection" },
    ],
  },
  {
    title: "Strategy & Growth",
    items: [
      { label: "Product Listing Optimization", href: "/services/product-listing-optimization" },
      { label: "Amazon FBA Management", href: "/services/amazon-fba-management" },
      { label: "Amazon FBM Management", href: "/services/amazon-fbm-management" },
      { label: "Shopify Plus Enterprise", href: "/services/shopify-plus-enterprise" },
    ],
  },
];

const headerIndustries = [
  { label: "Health & Wellness", href: "/industries/health-wellness" },
  { label: "Beauty & Skincare", href: "/industries/beauty-skincare" },
  { label: "Electronics & Gadgets", href: "/industries/electronics" },
  { label: "Fashion & Apparel", href: "/industries/fashion-apparel" },
  { label: "Home & Kitchen", href: "/industries/home-kitchen" },
  { label: "Sports & Outdoors", href: "/industries/sports-outdoors" },
  { label: "Pet Supplies", href: "/industries/pet-supplies" },
  { label: "Baby & Kids", href: "/industries/baby-kids" },
  { label: "Food & Beverage", href: "/industries/food-beverage" },
  { label: "Supplements & Nutrition", href: "/industries/supplements-nutrition" },
  { label: "Automotive", href: "/industries/automotive" },
  { label: "Toys & Games", href: "/industries/toys-games" },
  { label: "Jewelry & Accessories", href: "/industries/jewelry-accessories" },
  { label: "Tools & Hardware", href: "/industries/tools-hardware" },
  { label: "Garden & Outdoor", href: "/industries/garden-outdoor" },
  { label: "Industrial & B2B", href: "/industries/industrial-b2b" },
  { label: "Arts & Crafts", href: "/industries/arts-crafts" },
  { label: "Cleaning & Household", href: "/industries/cleaning-household" },
  { label: "Books & Media", href: "/industries/books-media" },
  { label: "Office Supplies", href: "/industries/office-supplies" },
  { label: "Dropshipping", href: "/industries/dropshipping" },
  { label: "Print on Demand", href: "/industries/print-on-demand" },
  { label: "Wholesale & Liquidation", href: "/industries/wholesale-liquidation" },
  { label: "Marketplace Arbitrage", href: "/industries/marketplace-arbitrage" },
];

const headerLocations = [
  { label: "California", href: "/locations/california" },
  { label: "Texas", href: "/locations/texas" },
  { label: "New York", href: "/locations/new-york" },
  { label: "Florida", href: "/locations/florida" },
  { label: "Illinois", href: "/locations/illinois" },
  { label: "Pennsylvania", href: "/locations/pennsylvania" },
  { label: "Ohio", href: "/locations/ohio" },
  { label: "Georgia", href: "/locations/georgia" },
  { label: "North Carolina", href: "/locations/north-carolina" },
  { label: "Michigan", href: "/locations/michigan" },
  { label: "New Jersey", href: "/locations/new-jersey" },
  { label: "Virginia", href: "/locations/virginia" },
  { label: "Washington", href: "/locations/washington" },
  { label: "Arizona", href: "/locations/arizona" },
  { label: "Massachusetts", href: "/locations/massachusetts" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/sitemap", megaMenu: true },
  { label: "Industries", href: "/sitemap", dropdown: "industries" },
  { label: "Locations", href: "/sitemap", dropdown: "locations" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);
  const { open: openBooking } = useBookingModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const toggleMobileSection = (key: string) => {
    setMobileExpanded((prev) => (prev === key ? null : key));
  };

  /* Render a dropdown panel */
  const renderDropdown = (key: string) => {
    if (key === "industries") {
      return (
        <div className="w-[640px] rounded-xl border border-border bg-white p-6 shadow-xl">
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {headerIndustries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="block rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-primary"
              >
                {ind.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }
    if (key === "locations") {
      return (
        <div className="w-[480px] rounded-xl border border-border bg-white p-6 shadow-xl">
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {headerLocations.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="block rounded-lg px-3 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-primary"
              >
                {loc.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-3">
            <Link
              href="/sitemap"
              className="block text-center text-sm font-medium text-primary transition-colors hover:text-primary-hover"
            >
              View All 50 States →
            </Link>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-border shadow-sm"
            : "bg-white border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 z-10">
            <span className="text-2xl font-bold tracking-tight text-primary font-syne">
              Zeera<span className="text-primary">a</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              /* --- Services mega menu --- */
              if (link.megaMenu) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter("services")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#333333] transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === "services" ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === "services" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full pt-2 -translate-x-1/2"
                        >
                          <div className="w-[720px] rounded-xl border border-border bg-white p-6 shadow-xl">
                            <div className="grid grid-cols-3 gap-6">
                              {serviceCategories.map((cat) => (
                                <div key={cat.title}>
                                  <span className="mb-3 block text-sm font-semibold text-primary">
                                    {cat.title}
                                  </span>
                                  <ul className="space-y-2">
                                    {cat.items.map((item) => (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          className="block text-sm text-text-muted transition-colors hover:text-primary"
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 border-t border-border pt-4">
                              <Link
                                href="/sitemap"
                                className="text-sm font-medium text-primary transition-colors hover:text-primary-hover"
                              >
                                View All 38 Services →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* --- Industries / Locations dropdown --- */
              if (link.dropdown) {
                const key = link.dropdown;
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#333333] transition-colors hover:text-primary"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === key ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full pt-2 -translate-x-1/2"
                        >
                          {renderDropdown(key)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* --- Standard link --- */
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-[#333333] transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openBooking}
              className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-hover"
            >
              <Phone className="h-4 w-4" />
              Book a Call
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-10 lg:hidden rounded-lg p-2 text-text-body transition-colors hover:text-primary"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ================================================================ */}
      {/*  Mobile Full-screen Menu                                         */}
      {/* ================================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-white lg:hidden"
          >
            <div className="h-20 shrink-0" />
            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isExpandable = link.megaMenu || link.dropdown;
                  const sectionKey = link.megaMenu
                    ? "services"
                    : link.dropdown || "";
                  const isExpanded = mobileExpanded === sectionKey;

                  if (isExpandable) {
                    return (
                      <li key={link.label}>
                        <button
                          onClick={() => toggleMobileSection(sectionKey)}
                          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-text-body transition-colors hover:bg-background-alt hover:text-primary"
                        >
                          {link.label}
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              {link.megaMenu && (
                                <div className="space-y-4 py-2 pl-4">
                                  {serviceCategories.map((cat) => (
                                    <div key={cat.title}>
                                      <span className="mb-2 block px-4 text-sm font-semibold text-primary">
                                        {cat.title}
                                      </span>
                                      <ul className="space-y-1">
                                        {cat.items.map((item) => (
                                          <li key={item.href}>
                                            <Link
                                              href={item.href}
                                              onClick={() =>
                                                setMobileOpen(false)
                                              }
                                              className="block rounded-lg px-4 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-primary"
                                            >
                                              {item.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                  <Link
                                    href="/sitemap"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 text-sm font-medium text-primary"
                                  >
                                    View All 38 Services →
                                  </Link>
                                </div>
                              )}

                              {link.dropdown === "industries" && (
                                <div className="py-2 pl-4">
                                  <ul className="space-y-1">
                                    {headerIndustries.slice(0, 12).map((ind) => (
                                      <li key={ind.href}>
                                        <Link
                                          href={ind.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block rounded-lg px-4 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-primary"
                                        >
                                          {ind.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <Link
                                    href="/sitemap"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 text-sm font-medium text-primary"
                                  >
                                    View All 24 Industries →
                                  </Link>
                                </div>
                              )}

                              {link.dropdown === "locations" && (
                                <div className="py-2 pl-4">
                                  <ul className="space-y-1">
                                    {headerLocations.map((loc) => (
                                      <li key={loc.href}>
                                        <Link
                                          href={loc.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block rounded-lg px-4 py-2 text-sm text-text-muted transition-colors hover:bg-background-alt hover:text-primary"
                                        >
                                          {loc.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <Link
                                    href="/sitemap"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 text-sm font-medium text-primary"
                                  >
                                    View All 50 States →
                                  </Link>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-4 py-3 text-lg font-medium text-text-body transition-colors hover:bg-background-alt hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-8 border-t border-border pt-8">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openBooking();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-hover"
                >
                  <Phone className="h-5 w-5" />
                  Book a Call
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
