/**
 * Site configuration — personal & business info.
 *
 * Every component reads from here, so changing a value updates it across the
 * whole site. `features` holds on/off switches for sections and widgets; these
 * will later be managed from a feature-flag admin UI.
 */

export type FeatureFlags = {
  topBar: boolean;
  audienceSection: boolean;
  problemSection: boolean;
  processSection: boolean;
  servicesSection: boolean;
  studyAbroad: boolean;
  aboutSection: boolean;
  assessments: boolean;
  testimonials: boolean;
  blog: boolean;
  faq: boolean;
  exitIntentPopup: boolean;
  whatsappFloat: boolean;
  mobileStickyBar: boolean;
  statsCounterAnimation: boolean;
};

export const siteConfig = {
  brand: {
    name: "Ocean of Careers",
    tagline: "Career Counselling & Global Education",
    motto: "Today's guidance shapes tomorrow's identity.",
    domain: "oceanofcareers.com",
    url: "https://oceanofcareers.com",
    /** Path under /public, e.g. "/logo.png". Leave null to show a text placeholder. */
    logo: null as string | null,
    foundedYearForCopyright: 2026,
  },

  founder: {
    name: "Divya Joanna",
    firstName: "Divya",
    role: "Founder & Lead Career Counsellor",
    /** Path under /public, e.g. "/divya.webp". Leave null to show a placeholder. */
    photo: null as string | null,
    headlineCredential: "UCLA Extension (USA) Certified Global Career Counsellor",
    credentials: [
      { icon: "🎓", title: "Global Career Counsellor", detail: "UCLA Extension (USA)" },
      { icon: "🏅", title: "Certified Career Analyst", detail: "ACCPH, UK & BCPA, India" },
      { icon: "🌏", title: "Organisational Member", detail: "IAAP (Global) & APCDA (Asia-Pacific)" },
      { icon: "⚖️", title: "MSc Psychology + LLB (Hons)", detail: "Dual qualified — Science of mind + Law" },
    ],
    certBadges: ["UCLA Extension, USA", "ACCPH UK", "BCPA India", "IAAP Global", "APCDA Asia"],
  },

  contact: {
    phoneDisplay: "+91 83285 50920",
    /** E.164 digits without "+", used for tel: and wa.me links. */
    phoneRaw: "918328550920",
    whatsappRaw: "918328550920",
    whatsappDefaultMessage: "Hi Ocean of Careers, I'd like to book a free 15-minute guidance call.",
    email: "info@oceanofcareers.com",
    altEmail: "oceanofcareers@gmail.com",
    hours: "Mon–Sat 9AM–7PM",
    onlineHours: "Online: Flexible",
  },

  location: {
    short: "Madinaguda, Miyapur, Hyderabad",
    full: "Ocean of Careers, CBR Estates, Deepthisri Nagar, Madinaguda, Miyapur (near GSM Mall), Hyderabad",
    city: "Hyderabad",
    region: "Telangana",
    country: "IN",
    serviceArea: "Telangana · AP · Tamil Nadu · Karnataka & All India Online",
    /** Paste the Google Maps embed URL (the src of the iframe). Leave null for a placeholder. */
    mapEmbedUrl: null as string | null,
  },

  stats: {
    studentsGuided: 760,
    yearsExperience: 8,
    googleRating: 5.0,
    googleReviews: 58,
    statesServed: 4,
  },

  social: {
    linkedin: "",
    instagram: "",
    youtube: "",
    facebook: "",
  },

  integrations: {
    /** Edumilestones assessment URL — users are sent here after the assessment lead form. */
    assessmentUrl: null as string | null,
  },

  features: {
    topBar: true,
    audienceSection: true,
    problemSection: true,
    processSection: true,
    servicesSection: true,
    studyAbroad: true,
    aboutSection: true,
    assessments: true,
    testimonials: true,
    blog: true,
    faq: true,
    exitIntentPopup: true,
    whatsappFloat: true,
    mobileStickyBar: true,
    statsCounterAnimation: true,
  } satisfies FeatureFlags as FeatureFlags,
};

export type SiteConfig = typeof siteConfig;

export function whatsappLink(message: string = siteConfig.contact.whatsappDefaultMessage) {
  return `https://wa.me/${siteConfig.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
}

export function telLink() {
  return `tel:+${siteConfig.contact.phoneRaw}`;
}
