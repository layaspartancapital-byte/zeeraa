import { Metadata } from "next";
import nextDynamic from "next/dynamic";
import SchemaMarkup from "@/components/SchemaMarkup";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

const BookingCalendar = nextDynamic(
  () => import("@/components/BookingCalendar"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Contact Zeeraa | Get a Free eCommerce Audit",
  description:
    "Get in touch with Zeeraa for a free eCommerce audit. Book a call or send us a message to learn how we can help your brand scale across every platform.",
};

export default function ContactPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Zeeraa",
    description: "Get a free eCommerce audit and learn how Zeeraa can help your brand scale.",
    url: "https://zeeraa.com/contact",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zeeraa.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://zeeraa.com/contact" },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[webPageSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden hero-gradient">
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-syne text-4xl md:text-6xl font-bold text-white mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-[#A0B4D0] max-w-3xl mx-auto">
            Ready to scale your eCommerce brand? Book a call or send us a
            message and get a free audit.
          </p>
        </div>
      </section>

      {/* Contact Info + Calendar */}
      <section className="py-16 md:py-24 bg-background-alt">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — Contact Info */}
            <div>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-text-primary mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 mb-10">
                <div className="bg-white border border-border rounded-xl p-5 shadow-card">
                  <p className="text-sm text-text-muted mb-1">Email</p>
                  <a href="mailto:hello@zeeraa.com" className="text-primary hover:underline">
                    hello@zeeraa.com
                  </a>
                </div>
                <div className="bg-white border border-border rounded-xl p-5 shadow-card">
                  <p className="text-sm text-text-muted mb-1">Phone</p>
                  <p className="text-text-primary">(888) 000-0000</p>
                </div>
              </div>

              <h3 className="font-syne text-xl font-bold text-text-primary mb-4">
                Send Us a Message
              </h3>
              <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-card">
                <ContactForm />
              </div>
            </div>

            {/* Right — Calendar */}
            <div>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-text-primary mb-6">
                Book a Call
              </h2>
              <div className="bg-white border border-border rounded-xl p-6 md:p-8 shadow-card">
                <BookingCalendar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
