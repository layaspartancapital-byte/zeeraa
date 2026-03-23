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
    description:
      "Get a free eCommerce audit and learn how Zeeraa can help your brand scale.",
    url: "https://zeeraa.com/contact",
  };

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
        name: "Contact",
        item: "https://zeeraa.com/contact",
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[webPageSchema, breadcrumbSchema]} />

      {/* Hero */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="font-syne text-4xl md:text-6xl font-bold mb-6">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl mx-auto">
            Ready to scale your eCommerce brand? Book a call or send us a
            message and get a free audit.
          </p>
        </div>
      </section>

      {/* Contact Info + Calendar */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left — Contact Info */}
            <div>
              <h2 className="font-syne text-2xl md:text-3xl font-bold mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 mb-10">
                <div className="glass-card p-5">
                  <p className="text-sm text-muted mb-1">Email</p>
                  <a
                    href="mailto:hello@zeeraa.com"
                    className="text-primary hover:underline"
                  >
                    hello@zeeraa.com
                  </a>
                </div>
                <div className="glass-card p-5">
                  <p className="text-sm text-muted mb-1">Phone</p>
                  <p className="text-white">(888) 000-0000</p>
                </div>
              </div>

              <h3 className="font-syne text-xl font-bold mb-4">
                Send Us a Message
              </h3>
              <div className="glass-card p-6 md:p-8">
                <ContactForm />
              </div>
            </div>

            {/* Right — Calendar */}
            <div>
              <h2 className="font-syne text-2xl md:text-3xl font-bold mb-6">
                Book a Call
              </h2>
              <div className="glass-card p-6 md:p-8">
                <BookingCalendar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
