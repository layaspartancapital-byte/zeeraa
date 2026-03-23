import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const footerServices = [
  { label: "Amazon Store Management", href: "/services/amazon-store-management" },
  { label: "Shopify Store Development", href: "/services/shopify-store-development" },
  { label: "Walmart Marketplace", href: "/services/walmart-marketplace-management" },
  { label: "TikTok Shop Management", href: "/services/tiktok-shop-management" },
  { label: "eBay Store Optimization", href: "/services/ebay-store-optimization" },
  { label: "Etsy Shop Management", href: "/services/etsy-shop-management" },
  { label: "Amazon FBA Management", href: "/services/amazon-fba-management" },
  { label: "Amazon PPC & Advertising", href: "/services/amazon-ppc-dsp-advertising" },
];

const footerIndustries = [
  { label: "Health & Wellness", href: "/industries/health-wellness" },
  { label: "Beauty & Skincare", href: "/industries/beauty-skincare" },
  { label: "Electronics", href: "/industries/electronics" },
  { label: "Fashion & Apparel", href: "/industries/fashion-apparel" },
  { label: "Home & Kitchen", href: "/industries/home-kitchen" },
  { label: "Sports & Outdoors", href: "/industries/sports-outdoors" },
  { label: "Pet Supplies", href: "/industries/pet-supplies" },
  { label: "Supplements & Nutrition", href: "/industries/supplements-nutrition" },
];

const footerLocations = [
  { label: "California", href: "/locations/california" },
  { label: "Texas", href: "/locations/texas" },
  { label: "New York", href: "/locations/new-york" },
  { label: "Florida", href: "/locations/florida" },
  { label: "Illinois", href: "/locations/illinois" },
  { label: "Pennsylvania", href: "/locations/pennsylvania" },
  { label: "Ohio", href: "/locations/ohio" },
  { label: "Georgia", href: "/locations/georgia" },
  { label: "Michigan", href: "/locations/michigan" },
  { label: "New Jersey", href: "/locations/new-jersey" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Brand section */}
        <div className="mb-12">
          <Link href="/" className="inline-block">
            <span className="font-syne text-2xl font-bold text-white">
              Zeera<span className="text-primary">a</span>
            </span>
          </Link>
          <p className="mt-3 text-text-muted text-sm max-w-md">
            Full-Stack eCommerce. Every Platform. Every Result.
          </p>
        </div>

        {/* Columns grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {footerServices.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/sitemap"
                  className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
                >
                  View All 38 Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-white font-semibold mb-4">Industries</h3>
            <ul className="space-y-2">
              {footerIndustries.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/sitemap"
                  className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
                >
                  View All 24 Industries →
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold mb-4">Locations</h3>
            <ul className="space-y-2">
              {footerLocations.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/sitemap"
                  className="text-primary text-sm font-medium hover:text-primary-hover transition-colors"
                >
                  View All 50 States →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; 2025 Zeeraa. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-text-muted hover:text-white transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
