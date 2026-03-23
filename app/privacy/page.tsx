import { Metadata } from "next";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Privacy Policy | Zeeraa",
  description:
    "Read Zeeraa's privacy policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    description: "Zeeraa's privacy policy.",
    url: "https://zeeraa.com/privacy",
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
        name: "Privacy Policy",
        item: "https://zeeraa.com/privacy",
      },
    ],
  };

  return (
    <>
      <SchemaMarkup schema={[webPageSchema, breadcrumbSchema]} />

      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-syne text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted mb-12">Last updated: March 2026</p>

          <div className="prose prose-invert prose-lg max-w-none space-y-10">
            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">
                Information We Collect
              </h2>
              <p className="text-muted leading-relaxed">
                We collect information you provide directly to us, such as when
                you fill out a contact form, book a consultation, or communicate
                with us via email. This may include your name, email address,
                phone number, company name, and any other information you choose
                to provide. We also automatically collect certain information
                when you visit our website, including your IP address, browser
                type, operating system, referring URLs, and pages viewed.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">
                How We Use Information
              </h2>
              <p className="text-muted leading-relaxed">
                We use the information we collect to provide, maintain, and
                improve our services; respond to your inquiries and fulfill your
                requests; send you marketing communications (with your consent);
                monitor and analyze trends, usage, and activities; detect,
                investigate, and prevent fraudulent transactions and other
                illegal activities; and comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">
                Information Sharing
              </h2>
              <p className="text-muted leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal
                information to outside parties except as described in this
                policy. We may share your information with trusted third-party
                service providers who assist us in operating our website,
                conducting our business, or serving you. We may also release
                information when we believe disclosure is appropriate to comply
                with the law, enforce our site policies, or protect our or
                others&apos; rights, property, or safety.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">
                Data Security
              </h2>
              <p className="text-muted leading-relaxed">
                We implement a variety of security measures to maintain the
                safety of your personal information. Your data is stored on
                secured servers and transmitted via SSL encryption. However, no
                method of transmission over the internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">Cookies</h2>
              <p className="text-muted leading-relaxed">
                We use cookies and similar tracking technologies to track
                activity on our website and hold certain information. Cookies are
                small files that a site transfers to your computer&apos;s hard
                drive through your web browser. You can instruct your browser to
                refuse all cookies or to indicate when a cookie is being sent.
                However, if you do not accept cookies, you may not be able to
                use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">
                Your Rights
              </h2>
              <p className="text-muted leading-relaxed">
                You have the right to access, correct, or delete your personal
                information at any time. You may also opt out of receiving
                marketing communications from us by following the unsubscribe
                instructions in any email we send. If you are a resident of the
                European Economic Area (EEA) or California, you may have
                additional rights under the GDPR or CCPA, including the right to
                data portability and the right to restrict processing.
              </p>
            </section>

            <section>
              <h2 className="font-syne text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:hello@zeeraa.com"
                  className="text-primary hover:underline"
                >
                  hello@zeeraa.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
