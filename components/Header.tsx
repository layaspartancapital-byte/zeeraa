"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useBookingModal } from "@/hooks/useBookingModal";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const serviceCategories = [
  {
    title: "Platform Management",
    href: "/services#platform-management",
    items: [
      { label: "Amazon Account Management", href: "/services/amazon-account-management" },
      { label: "Shopify Management", href: "/services/shopify-management" },
      { label: "Walmart Marketplace", href: "/services/walmart-marketplace" },
      { label: "eBay Management", href: "/services/ebay-management" },
      { label: "TikTok Shop", href: "/services/tiktok-shop" },
      { label: "Etsy Management", href: "/services/etsy-management" },
    ],
  },
  {
    title: "Advertising & SEO",
    href: "/services#advertising-seo",
    items: [
      { label: "Amazon PPC Management", href: "/services/amazon-ppc-management" },
      { label: "eCommerce SEO", href: "/services/ecommerce-seo" },
      { label: "Google Shopping Ads", href: "/services/google-shopping-ads" },
      { label: "Social Media Advertising", href: "/services/social-media-advertising" },
    ],
  },
  {
    title: "Strategy & Growth",
    href: "/services#strategy-growth",
    items: [
      { label: "Product Listing Optimization", href: "/services/product-listing-optimization" },
      { label: "Brand Registry & Protection", href: "/services/brand-registry" },
      { label: "FBA / FBM Strategy", href: "/services/fba-fbm-strategy" },
      { label: "Marketplace Launch Strategy", href: "/services/marketplace-launch-strategy" },
    ],
  },
];

const industries = [
  { label: "Health & Wellness", href: "/industries/health-wellness" },
  { label: "Beauty & Personal Care", href: "/industries/beauty-personal-care" },
  { label: "Home & Garden", href: "/industries/home-garden" },
  { label: "Electronics & Tech", href: "/industries/electronics-tech" },
  { label: "Fashion & Apparel", href: "/industries/fashion-apparel" },
  { label: "Food & Beverage", href: "/industries/food-beverage" },
  { label: "Sports & Outdoors", href: "/industries/sports-outdoors" },
  { label: "Baby & Kids", href: "/industries/baby-kids" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", megaMenu: true },
  { label: "Industries", href: "/industries", dropdown: true },
  { label: "Locations", href: "/locations" },
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

  /* Sticky header on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* Dropdown hover helpers */
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

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#0A0A0A]/80 border-b border-[#1A1A1A] shadow-lg shadow-black/10"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* ---- Logo ---- */}
          <Link href="/" className="flex items-center gap-1 z-10">
            <span
              className="text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Zeera<span className="text-[#0066FF]">a</span>
            </span>
          </Link>

          {/* ---- Desktop Nav ---- */}
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
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
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
                          <div className="w-[720px] rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]/95 backdrop-blur-xl p-6 shadow-2xl shadow-black/40">
                            <div className="grid grid-cols-3 gap-6">
                              {serviceCategories.map((cat) => (
                                <div key={cat.title}>
                                  <Link
                                    href={cat.href}
                                    className="mb-3 block text-sm font-semibold text-[#0066FF]"
                                  >
                                    {cat.title}
                                  </Link>
                                  <ul className="space-y-2">
                                    {cat.items.map((item) => (
                                      <li key={item.href}>
                                        <Link
                                          href={item.href}
                                          className="block text-sm text-gray-400 transition-colors hover:text-white"
                                        >
                                          {item.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 border-t border-[#1A1A1A] pt-4">
                              <Link
                                href="/services"
                                className="text-sm font-medium text-[#0066FF] transition-colors hover:text-[#0066FF]/80"
                              >
                                View All Services &rarr;
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              /* --- Industries dropdown --- */
              if (link.dropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter("industries")}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === "industries" ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === "industries" && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full pt-2 -translate-x-1/2"
                        >
                          <div className="w-64 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]/95 backdrop-blur-xl p-4 shadow-2xl shadow-black/40">
                            <ul className="space-y-1">
                              {industries.map((ind) => (
                                <li key={ind.href}>
                                  <Link
                                    href={ind.href}
                                    className="block rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                                  >
                                    {ind.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-3 border-t border-[#1A1A1A] pt-3">
                              <Link
                                href="/industries"
                                className="block text-center text-sm font-medium text-[#0066FF] transition-colors hover:text-[#0066FF]/80"
                              >
                                View All Industries &rarr;
                              </Link>
                            </div>
                          </div>
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
                  className="px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ---- Desktop CTA ---- */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={openBooking}
              className="flex items-center gap-2 rounded-lg bg-[#0066FF] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0066FF]/90 hover:shadow-lg hover:shadow-[#0066FF]/25"
            >
              <Phone className="h-4 w-4" />
              Book a Call
            </button>
          </div>

          {/* ---- Mobile hamburger ---- */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-10 lg:hidden rounded-lg p-2 text-gray-300 transition-colors hover:text-white"
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
            className="fixed inset-0 z-40 flex flex-col bg-[#0A0A0A] lg:hidden"
          >
            {/* Spacer for header height */}
            <div className="h-20 shrink-0" />

            <div className="flex-1 overflow-y-auto px-6 pb-8">
              <ul className="space-y-1">
                {navLinks.map((link) => {
                  const isExpandable = link.megaMenu || link.dropdown;
                  const sectionKey = link.megaMenu ? "services" : link.dropdown ? "industries" : "";
                  const isExpanded = mobileExpanded === sectionKey;

                  if (isExpandable) {
                    return (
                      <li key={link.label}>
                        <button
                          onClick={() => toggleMobileSection(sectionKey)}
                          className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-lg font-medium text-gray-300 transition-colors hover:bg-[#1A1A1A] hover:text-white"
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
                                      <span className="mb-2 block px-4 text-sm font-semibold text-[#0066FF]">
                                        {cat.title}
                                      </span>
                                      <ul className="space-y-1">
                                        {cat.items.map((item) => (
                                          <li key={item.href}>
                                            <Link
                                              href={item.href}
                                              onClick={() => setMobileOpen(false)}
                                              className="block rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                                            >
                                              {item.label}
                                            </Link>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                  <Link
                                    href="/services"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 text-sm font-medium text-[#0066FF]"
                                  >
                                    View All Services &rarr;
                                  </Link>
                                </div>
                              )}

                              {link.dropdown && (
                                <div className="py-2 pl-4">
                                  <ul className="space-y-1">
                                    {industries.map((ind) => (
                                      <li key={ind.href}>
                                        <Link
                                          href={ind.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block rounded-lg px-4 py-2 text-sm text-gray-400 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                                        >
                                          {ind.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <Link
                                    href="/industries"
                                    onClick={() => setMobileOpen(false)}
                                    className="block px-4 py-2 text-sm font-medium text-[#0066FF]"
                                  >
                                    View All Industries &rarr;
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
                        className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-300 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile CTA */}
              <div className="mt-8 border-t border-[#1A1A1A] pt-8">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openBooking();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0066FF] px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#0066FF]/90"
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
