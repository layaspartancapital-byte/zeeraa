import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";

export const metadata: Metadata = {
  title: "Our Team | Zeeraa",
  description:
    "Meet the team behind Zeeraa. eCommerce experts with decades of combined experience across Amazon, Shopify, TikTok Shop, Walmart, and more.",
  openGraph: {
    title: "Our Team | Zeeraa",
    description:
      "Meet the team behind Zeeraa. eCommerce experts with decades of combined experience across Amazon, Shopify, TikTok Shop, Walmart, and more.",
  },
};

const team = [
  { name: "Marcus Chen", role: "Founder & CEO", bio: "Former Amazon category manager with 10+ years in eCommerce", gradient: "from-blue-500 to-cyan-400" },
  { name: "Sarah Williams", role: "VP of Operations", bio: "Scaled 200+ brands across 30+ platforms", gradient: "from-purple-500 to-pink-400" },
  { name: "David Park", role: "Head of Advertising", bio: "Managed $20M+ in marketplace ad spend", gradient: "from-orange-500 to-yellow-400" },
  { name: "Lisa Martinez", role: "Director of Client Success", bio: "Specialist in multi-platform growth strategy", gradient: "from-green-500 to-emerald-400" },
  { name: "James Thompson", role: "Lead SEO Strategist", bio: "Driven 500M+ organic impressions for eCommerce brands", gradient: "from-red-500 to-rose-400" },
  { name: "Priya Sharma", role: "TikTok Shop Lead", bio: "Built TikTok Shop programs generating $5M+ monthly", gradient: "from-indigo-500 to-violet-400" },
];

export default function TeamPage() {
  const schema = [
    {
      "@context": "https://schema.org", "@type": "WebPage",
      name: "Our Team | Zeeraa",
      description: "Meet the team behind Zeeraa. eCommerce experts with decades of combined experience.",
      url: "https://zeeraa.com/team",
      publisher: {
        "@type": "Organization", name: "Zeeraa", url: "https://zeeraa.com",
        member: team.map((member) => ({ "@type": "Person", name: member.name, jobTitle: member.role, description: member.bio })),
      },
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://zeeraa.com" },
        { "@type": "ListItem", position: 2, name: "Team", item: "https://zeeraa.com/team" },
      ],
    },
  ];

  return (
    <>
      <SchemaMarkup schema={schema} />
      <Header />

      <main className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="mb-8 text-sm text-text-muted" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li>/</li>
              <li className="text-text-primary">Team</li>
            </ol>
          </nav>

          <div className="text-center mb-16">
            <h1 className="font-syne text-4xl md:text-6xl font-bold text-text-primary">Our Team</h1>
            <p className="mt-4 text-text-muted text-lg max-w-2xl mx-auto">
              eCommerce experts with decades of combined experience driving growth across every major platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-border bg-white p-8 shadow-card hover:shadow-card-hover hover:border-primary hover:-translate-y-0.5 transition-all duration-300 text-center"
              >
                <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center`}>
                  <span className="text-white font-syne font-bold text-2xl">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h2 className="font-syne text-xl font-bold text-text-primary mb-1">{member.name}</h2>
                <p className="text-primary text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-text-muted text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
