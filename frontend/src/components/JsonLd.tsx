import { siteConfig } from "@/config";
import { faqs } from "@/content/home";

const { brand, founder, contact, location, stats } = siteConfig;

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function JsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: brand.name,
    url: brand.url,
    telephone: `+${contact.phoneRaw}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.full,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    openingHours: "Mo-Sa 09:00-19:00",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.googleRating,
      reviewCount: stats.googleReviews,
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      hasCredential: founder.credentials.map((c) => `${c.title} — ${c.detail}`),
    },
  };

  const faqPage = siteConfig.features.faq && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Script data={business} />
      {faqPage && <Script data={faqPage} />}
    </>
  );
}
