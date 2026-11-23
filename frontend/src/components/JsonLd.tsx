import type { SiteContent } from "@/content/types";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default function JsonLd({ c }: { c: SiteContent }) {
  const { brand, founder, contact, location, stats } = c.site;

  const business = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: brand.name,
    url: brand.url,
    ...(brand.logo ? { logo: brand.logo } : {}),
    telephone: `+${contact.phoneRaw}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.full,
      addressLocality: location.city,
      addressRegion: location.region,
      addressCountry: location.country,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.googleRating,
      reviewCount: stats.googleReviews,
    },
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.role,
      hasCredential: founder.credentials.map((cr) => `${cr.title} — ${cr.detail}`),
    },
  };

  const faq = c.sections.faq;
  const faqPage = faq.status === "active" &&
    faq.items.length > 0 && {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
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
