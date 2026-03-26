import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Terms of Service | Zeeraa",
  description: "Read Zeeraa's terms of service governing your use of our website and eCommerce management services.",
};

export default function TermsPage() {
  const webPageSchema = { "@context": "https://schema.org", "@type": "WebPage", name: "Terms of Service", description: "Zeeraa's terms of service.", url: "https://zeeraa.com/terms" };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zeeraa.com" },
      { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://zeeraa.com/terms" },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[webPageSchema, breadcrumbSchema]} />
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-syne text-4xl md:text-5xl font-bold text-text-primary mb-4">Terms of Service</h1>
          <p className="text-text-muted mb-12">Last updated: March 2026</p>
          <div className="prose prose-lg max-w-none space-y-10">
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Acceptance of Terms</h2>
              <p className="text-text-body leading-relaxed">By accessing and using the Zeeraa website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. We reserve the right to update or modify these terms at any time without prior notice, and your continued use of the website constitutes acceptance of any changes.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Services Description</h2>
              <p className="text-text-body leading-relaxed">Zeeraa provides eCommerce management services including but not limited to marketplace management, advertising, listing optimization, brand strategy, and consulting. The specific services provided to each client are outlined in individual service agreements. We reserve the right to modify, suspend, or discontinue any part of our services at any time.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">User Responsibilities</h2>
              <p className="text-text-body leading-relaxed">You agree to provide accurate, current, and complete information when using our services or filling out forms on our website. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. You agree not to use our website for any unlawful purpose or in any way that could damage, disable, or impair the website.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Payment Terms</h2>
              <p className="text-text-body leading-relaxed">Payment terms are specified in individual service agreements between Zeeraa and each client. All fees are non-refundable unless otherwise stated in your service agreement. Late payments may be subject to interest charges and may result in suspension of services. You are responsible for all applicable taxes associated with the services.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Intellectual Property</h2>
              <p className="text-text-body leading-relaxed">All content on this website, including text, graphics, logos, images, and software, is the property of Zeeraa or its content suppliers and is protected by copyright and intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our express written permission.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Limitation of Liability</h2>
              <p className="text-text-body leading-relaxed">Zeeraa shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services. Our total liability for any claims arising from the use of our services shall not exceed the amount paid by you for the services during the twelve months preceding the claim. Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above may not apply to you.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Termination</h2>
              <p className="text-text-body leading-relaxed">Either party may terminate the service agreement in accordance with the terms specified in the individual service agreement. We reserve the right to terminate or suspend your access to our website and services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Governing Law</h2>
              <p className="text-text-body leading-relaxed">These terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of our services shall be resolved in the courts of competent jurisdiction.</p>
            </section>
            <section>
              <h2 className="font-syne text-2xl font-bold text-text-primary mb-4">Contact</h2>
              <p className="text-text-body leading-relaxed">If you have any questions about these Terms of Service, please contact us at{" "}<a href="mailto:hello@zeeraa.com" className="text-primary hover:underline">hello@zeeraa.com</a>.</p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
