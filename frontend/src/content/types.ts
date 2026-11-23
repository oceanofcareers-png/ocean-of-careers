/**
 * The whole editable site is one JSON document of this shape.
 *
 * Text fields support:
 *  - `{{path}}` tokens resolved against `site`, e.g. "{{founder.name}}" or "{{stats.studentsGuided}}+"
 *  - `*highlight*` in section titles, rendered in gold
 */

export type Status = "active" | "hidden" | "disabled";

export type Link = { label: string; href: string };

export type IconItem = { icon: string; title: string; detail: string };

export type SiteInfo = {
  brand: { name: string; tagline: string; motto: string; url: string; logo: string | null; copyrightYear: number };
  founder: {
    name: string;
    firstName: string;
    role: string;
    photo: string | null;
    headlineCredential: string;
    credentials: IconItem[];
    certBadges: string[];
  };
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappRaw: string;
    whatsappDefaultMessage: string;
    email: string;
    altEmail: string;
    hours: string;
    onlineHours: string;
  };
  location: {
    short: string;
    full: string;
    city: string;
    region: string;
    country: string;
    serviceArea: string;
    mapEmbedUrl: string;
  };
  stats: { studentsGuided: number; yearsExperience: number; googleRating: number; googleReviews: number; statesServed: number };
  social: { linkedinUrl: string; instagramUrl: string; youtubeUrl: string; facebookUrl: string };
  integrations: { assessmentUrl: string };
  seo: { title: string; description: string; keywords: string[]; ogImage: string | null };
};

type Section<T> = { status: Status } & T;
type Heading = { eyebrow: string; title: string; desc: string };

export type Sections = {
  topBar: Section<{ cta: Link }>;
  navbar: { links: Link[]; bookCta: Link };
  hero: Section<{
    eyebrow: string;
    title: string;
    motto: string;
    intro: string;
    primaryCta: Link;
    secondaryCta: Link;
    trustItems: string[];
    formTitle: string;
    formSub: string;
    formSubmitLabel: string;
    formPrivacy: string;
    /** Background banner photo behind the hero (covered by a navy tint so text stays readable). */
    image: string | null;
  }>;
  credentials: Section<{ items: IconItem[] }>;
  stats: Section<{ items: { value: string; label: string }[] }>;
  audience: Section<Heading & { items: { icon: string; title: string; desc: string; popular: boolean; cta: Link }[] }>;
  problems: Section<Heading & { items: { icon: string; text: string }[]; ctaText: string; ctaHighlight: string; cta: Link }>;
  process: Section<Heading & { steps: { icon: string; title: string; desc: string; free: boolean }[] }>;
  services: Section<
    Heading & { items: { icon: string; theme: string; title: string; sub: string; points: string[]; cta: Link }[] }
  >;
  studyAbroad: Section<Heading & { pills: string[]; cta: Link }>;
  about: Section<{
    eyebrow: string;
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    quote: string;
    quoteAttribution: string;
    bookCta: Link;
  }>;
  assessments: Section<
    Heading & {
      featureTitle: string;
      featureDesc: string;
      types: { icon: string; title: string; sub: string }[];
      ctaLabel: string;
      flowTitle: string;
      flow: { title: string; desc: string }[];
    }
  >;
  testimonials: Section<
    Heading & { items: { quote: string; initials: string; photo: string | null; name: string; role: string; tag: string }[] }
  >;
  blog: Section<
    Heading & {
      posts: {
        category: string;
        title: string;
        excerpt: string;
        readTime: string;
        topic: string;
        image: string | null;
        href: string;
        featured: boolean;
      }[];
    }
  >;
  faq: Section<Heading & { items: { q: string; a: string }[] }>;
  finalCta: Section<{
    title: string;
    desc: string;
    primaryCta: Link;
    whatsappLabel: string;
    secondaryCta: Link;
    /** Background photo behind the banner (tinted navy). */
    image: string | null;
  }>;
  footer: { description: string; columns: { title: string; links: Link[] }[]; legalLinks: Link[]; copyright: string };
};

export type Widgets = {
  whatsappFloat: { status: Status; label: string };
  mobileStickyBar: { status: Status; bookLabel: string; whatsappLabel: string };
  exitIntentPopup: { status: Status; kicker: string; title: string; sub: string };
  statsCounterAnimation: { status: Status };
  appointmentBooking: {
    status: Status;
    buttonLabel: string;
    kicker: string;
    title: string;
    sub: string;
    detailsStepLabel: string;
    scheduleStepLabel: string;
    messagePlaceholder: string;
    nextLabel: string;
    submitLabel: string;
    /** Bookable days from today, including today. */
    daysAhead: number;
    /** `endHour` (0–23) hides a slot for today once that hour has passed. */
    slots: { label: string; time: string; endHour: number }[];
    successMessage: string;
  };
};

export type SiteContent = {
  site: SiteInfo;
  sections: Sections;
  widgets: Widgets;
  leadForm: { iAmOptions: string[]; concernOptions: string[]; successMessage: string };
};

export type SectionKey = keyof Sections;
export type WidgetKey = keyof Widgets;
