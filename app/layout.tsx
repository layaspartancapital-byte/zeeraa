import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
  preload: true,
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  preload: true,
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Zeeraa | Full-Stack eCommerce Management Agency",
    template: "%s",
  },
  description:
    "Zeeraa manages your entire eCommerce presence across Amazon, Shopify, Walmart, TikTok Shop, and 35+ US platforms. Full-service management from day one to scale.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://zeeraa.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zeeraa",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} font-inter antialiased bg-background text-text-primary`}
      >
        <ClientProviders>
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
