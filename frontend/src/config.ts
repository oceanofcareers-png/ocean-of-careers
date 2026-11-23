import type { SiteInfo } from "@/content/types";

/**
 * Default personal & business info.
 *
 * These are the starting values. Once anything is saved from /admin, the
 * stored copy takes over, so edit live content in the admin, not here.
 * New fields added here are merged into stored content automatically.
 */
export const siteConfig: SiteInfo = {
  brand: {
    name: "Ocean of Careers",
    tagline: "Career Counselling & Global Education",
    motto: "Today's guidance shapes tomorrow's identity.",
    url: "https://oceanofcareers.com",
    logo: null,
    copyrightYear: 2026,
  },

  founder: {
    name: "Divya Joanna",
    firstName: "Divya",
    role: "Founder & Lead Career Counsellor",
    photo: null,
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
    mapEmbedUrl: "",
  },

  stats: {
    studentsGuided: 760,
    yearsExperience: 8,
    googleRating: 5.0,
    googleReviews: 58,
    statesServed: 4,
  },

  social: {
    linkedinUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    facebookUrl: "",
  },

  integrations: {
    assessmentUrl: "",
  },

  seo: {
    title: "{{brand.name}} | Best Career Counsellor in {{location.city}} — {{founder.name}}",
    description:
      "Career counselling, psychometric assessments & study abroad guidance in {{location.city}} and online across India by {{founder.name}}, {{founder.headlineCredential}}. Book a free 15-minute guidance call.",
    keywords: [
      "career counselling hyderabad",
      "best career counsellor hyderabad",
      "career guidance hyderabad",
      "psychometric test hyderabad",
      "online career counselling india",
      "study abroad guidance hyderabad",
    ],
    ogImage: null,
  },
};
