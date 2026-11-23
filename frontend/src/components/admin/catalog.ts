import type { SectionKey, SiteInfo, WidgetKey } from "@/content/types";

export const SECTION_INFO: Record<SectionKey, { name: string; desc: string }> = {
  topBar: { name: "Top Bar", desc: "Phone, WhatsApp, email strip above the menu (hidden on mobile)" },
  navbar: { name: "Navigation Menu", desc: "Menu links and the Book button" },
  hero: { name: "Hero", desc: "Main headline, intro and the lead form" },
  credentials: { name: "Credentials Bar", desc: "Certifications strip under the hero" },
  stats: { name: "Stats Bar", desc: "Students guided, experience, rating…" },
  audience: { name: "Who We Help", desc: "Audience cards — students, graduates, professionals, parents" },
  problems: { name: "Sound Familiar?", desc: "Common problems + call to action" },
  process: { name: "Our Process", desc: "The 6-step journey" },
  services: { name: "Services", desc: "Service cards" },
  studyAbroad: { name: "Study Abroad", desc: "Study abroad strip" },
  about: { name: "About the Founder", desc: "Founder bio, stats and quote" },
  assessments: { name: "Career Assessments", desc: "Psychometric assessment section" },
  testimonials: { name: "Testimonials", desc: "Success stories" },
  blog: { name: "Blog", desc: "Blog article cards" },
  faq: { name: "FAQ", desc: "Frequently asked questions" },
  finalCta: { name: "Final Call to Action", desc: "Bottom booking banner" },
  footer: { name: "Footer", desc: "Footer text and link columns" },
};

export const WIDGET_INFO: Record<WidgetKey, { name: string; desc: string }> = {
  whatsappFloat: { name: "WhatsApp Button", desc: "Floating chat button (desktop)" },
  mobileStickyBar: { name: "Mobile Bottom Bar", desc: "Book + WhatsApp bar on phones" },
  exitIntentPopup: { name: "Exit Popup", desc: "Lead form shown when a desktop visitor is about to leave" },
  statsCounterAnimation: { name: "Stats Count-up Animation", desc: "Numbers count up when scrolled into view" },
  appointmentBooking: {
    name: "Book an Appointment",
    desc: "Hero button that opens a 2-step booking form and sends it on WhatsApp (when hidden, the hero shows its Primary button instead)",
  },
};

export const SITE_INFO: Record<keyof SiteInfo, { name: string; desc: string }> = {
  brand: { name: "Brand", desc: "Business name, tagline, logo" },
  founder: { name: "Founder", desc: "Name, photo, credentials" },
  contact: { name: "Contact", desc: "Phone, WhatsApp, email, hours" },
  location: { name: "Location", desc: "Address and map" },
  stats: { name: "Numbers", desc: "Students, years, rating — used via {{stats.…}}" },
  social: { name: "Social Links", desc: "LinkedIn, Instagram, YouTube, Facebook" },
  integrations: { name: "Integrations", desc: "Assessment portal link" },
  seo: { name: "SEO", desc: "Google title, description, share image" },
};

/** Friendlier names for common field keys; anything else is humanised automatically. */
export const FIELD_LABELS: Record<string, string> = {
  cta: "Button",
  primaryCta: "Primary button",
  secondaryCta: "Secondary button",
  bookCta: "Book button",
  label: "Text",
  href: "Link",
  desc: "Description",
  sub: "Subtitle",
  q: "Question",
  a: "Answer",
  ctaText: "Banner text",
  ctaHighlight: "Banner highlight",
  ctaLabel: "Button text",
  intro: "Intro paragraph",
  phoneRaw: "Phone (digits with country code, for links)",
  whatsappRaw: "WhatsApp number (digits with country code)",
  mapEmbedUrl: "Google Maps embed URL",
  ogImage: "Share image (WhatsApp/Facebook preview)",
  popular: "Show “Most popular” badge",
  free: "Show “Free” badge",
  featured: "Featured (wide card)",
  linkedinUrl: "LinkedIn URL",
  instagramUrl: "Instagram URL",
  youtubeUrl: "YouTube URL",
  facebookUrl: "Facebook URL",
  assessmentUrl: "Assessment portal URL",
  iAmOptions: "“I am a…” options",
  concernOptions: "“Main concern” options",
  buttonLabel: "Hero button text",
  detailsStepLabel: "Step 1 name",
  scheduleStepLabel: "Step 2 name",
  messagePlaceholder: "Message box hint",
  nextLabel: "Next button text",
  submitLabel: "Book button text",
  daysAhead: "Bookable days ahead (from today)",
  slots: "Time slots",
  time: "Time range",
  endHour: "Ends at hour (0–23) — hidden for today after this",
};

export const SERVICE_THEMES = ["navy", "gold", "deep", "teal", "purple", "rust"];
