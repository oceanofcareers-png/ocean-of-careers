import { siteConfig } from "@/config";
import type { SiteContent } from "./types";

const book = (label: string) => ({ label, href: "#book" });

export const defaultContent: SiteContent = {
  site: siteConfig,

  sections: {
    topBar: { status: "active", cta: book("🎁 Book a Free 15-Min Guidance Call") },

    navbar: {
      links: [
        { label: "Home", href: "#top" },
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Study Abroad", href: "#study-abroad" },
        { label: "Assessments", href: "#assessments" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
      ],
      bookCta: book("📅 Book Free Call"),
    },

    hero: {
      status: "active",
      eyebrow: "Personalised Guidance for Students · Graduates · Professionals",
      title: "Discover the Career *Your Child Was Born For.*",
      motto: "{{brand.motto}}",
      intro:
        "Expert career counselling, psychometric assessments & global education guidance by **{{founder.name}}** — a Global Career Counsellor certified by UCLA Extension (USA), guiding students, graduates and professionals from {{location.city}} and online across India.",
      primaryCta: book("📅 Book Free Guidance Call"),
      secondaryCta: { label: "✈ Explore Study Abroad →", href: "#study-abroad" },
      trustItems: [
        "{{stats.studentsGuided}}+ Students Guided",
        "{{stats.googleRating}} ★ · {{stats.googleReviews}} Google Reviews",
        "Online Across India",
        "Study Abroad: USA · UK · Germany · Australia",
      ],
      formTitle: "🎯 Get Your Free Career Clarity Call",
      formSub: "2 mins to fill · 100% free · No spam ever",
      formSubmitLabel: "Get My Free Guidance Call →",
      formPrivacy: "🔒 100% Confidential · No obligations",
    },

    credentials: {
      status: "active",
      items: [
        ...siteConfig.founder.credentials,
        { icon: "📍", title: "Serving Students Across", detail: "{{location.serviceArea}}" },
      ],
    },

    stats: {
      status: "active",
      items: [
        { value: "{{stats.studentsGuided}}+", label: "Students Guided" },
        { value: "{{stats.yearsExperience}}+", label: "Years Experience" },
        { value: "{{stats.googleRating}} ★", label: "Google Rating · {{stats.googleReviews}} Reviews" },
        { value: "{{stats.statesServed}}", label: "States Served" },
      ],
    },

    audience: {
      status: "active",
      eyebrow: "Who We Help",
      title: "Guidance Designed for *Every Stage* of Your Journey",
      desc: "",
      items: [
        { icon: "🎒", title: "School Students", desc: "Class 8–12 · Stream selection · NEP-based guidance · Subject clarity", popular: false, cta: book("Get Guidance →") },
        { icon: "🎓", title: "UG / PG Students", desc: "Graduates · College confusion · Higher education · Study abroad decisions", popular: true, cta: book("Get Guidance →") },
        { icon: "💼", title: "Working Professionals", desc: "Career change · Upskilling · Burnout · Higher studies · Leadership growth", popular: false, cta: book("Get Guidance →") },
        { icon: "👨‍👩‍👧", title: "Parents", desc: "Child's stream · College shortlist · Study abroad direction · Joint counselling sessions", popular: false, cta: book("Get Guidance →") },
      ],
    },

    problems: {
      status: "active",
      eyebrow: "Sound Familiar?",
      title: "Feeling *Confused* About the Right Career Choice?",
      desc: "You're not alone. These are the most common questions parents and students bring to us every day.",
      items: [
        { icon: "🤯", text: "Too many career options — don't know where to start?" },
        { icon: "📚", text: "Confused between Science, Commerce or Arts?" },
        { icon: "😰", text: "Fear of choosing the wrong course and wasting years?" },
        { icon: "👨‍👩‍👧", text: "Pressure from family, relatives and society?" },
        { icon: "🌫️", text: "No clarity about which career truly suits your child?" },
        { icon: "🎓", text: "Confused about best colleges and placement records?" },
        { icon: "💰", text: "Looking for high salary career options after 12th?" },
        { icon: "🤖", text: "Worried about AI replacing careers in the future?" },
        { icon: "✈️", text: "Want to study abroad but don't know how to start?" },
        { icon: "🔄", text: "Stuck in the wrong job and want a meaningful career change?" },
      ],
      ctaText: "You don't need more opinions.",
      ctaHighlight: "You need the right professional guidance.",
      cta: book("Book Your Free 15-Min Call →"),
    },

    process: {
      status: "active",
      eyebrow: "Our Process",
      title: "Your *Career Clarity* Journey — 6 Simple Steps",
      desc: "A structured, science-backed process — from first conversation to your complete career roadmap.",
      steps: [
        { icon: "📞", title: "Free Guidance Call", desc: "15-minute no-obligation call to understand your situation, goals and concerns.", free: true },
        { icon: "🧪", title: "Career Assessment", desc: "Scientific psychometric test — aptitude, personality, interests and intelligence mapping.", free: false },
        { icon: "🤝", title: "One-on-One Counselling", desc: "Deep-dive session with {{founder.firstName}} analysing your results and exploring career directions.", free: false },
        { icon: "🗺️", title: "Career Mapping", desc: "Stream selection, college shortlist, course selection and entrance exam roadmap.", free: false },
        { icon: "📋", title: "Personalised Roadmap", desc: "30-page written career report with 10-year plan and actionable next steps.", free: false },
        { icon: "🔄", title: "Ongoing Support", desc: "WhatsApp follow-up, milestone check-ins and guidance as your journey unfolds.", free: false },
      ],
    },

    services: {
      status: "active",
      eyebrow: "What We Offer",
      title: "Expert Guidance for *Every Stage* of Your Journey",
      desc: "From stream selection to study abroad direction — one trusted place for your career decisions.",
      items: [
        {
          icon: "🎒", theme: "navy", title: "Career Guidance for Students",
          sub: "After 10th, 12th, graduation — stream, college & course clarity",
          points: ["Stream selection (Science/Commerce/Arts)", "College shortlisting & admission guidance", "Entrance exam strategy (JEE, NEET, CLAT, CA)", "MPC / BiPC / MEC career mapping", "High salary career options planning"],
          cta: book("Learn More →"),
        },
        {
          icon: "✈️", theme: "gold", title: "Study Abroad Guidance",
          sub: "USA, UK, Germany, Australia & more",
          points: ["Profile evaluation & country selection", "Course & university shortlisting", "Scholarship identification", "Application timeline planning", "Parent + student Q&A session"],
          cta: { label: "Explore Abroad →", href: "#study-abroad" },
        },
        {
          icon: "💼", theme: "deep", title: "Professional Career Transition",
          sub: "Career change, upskilling, leadership & growth strategy",
          points: ["Career switch strategy & execution plan", "Skills gap & personality deep-dive", "MBA / higher education counselling", "Future-proof career planning post-AI", "High-growth career direction mapping"],
          cta: book("Learn More →"),
        },
        {
          icon: "🧪", theme: "teal", title: "Psychometric Assessments",
          sub: "Scientific career assessments with 30-page personalised report",
          points: ["IQ + Aptitude testing", "Personality mapping (Big Five + MBTI style)", "Multiple Intelligence assessment", "Emotional Intelligence (EQ) evaluation", "30-page career report + 10-year roadmap"],
          cta: { label: "Take Assessment →", href: "#assessments" },
        },
        {
          icon: "💻", theme: "purple", title: "Online Career Counselling",
          sub: "Same depth as in-person — from anywhere in India",
          points: ["Zoom / Google Meet / phone sessions", "Online psychometric test + report", "Flexible evening & weekend slots", "Parents can join from any city", "WhatsApp follow-up support"],
          cta: book("Book Online Session →"),
        },
        {
          icon: "👨‍👩‍👧", theme: "rust", title: "Parent + Student Sessions",
          sub: "Joint guidance to align family & student aspirations",
          points: ["Parent anxiety & expectation counselling", "Student-parent career alignment session", "School & college campus workshops", "Online + offline available", "Group sessions for schools"],
          cta: book("Enquire →"),
        },
      ],
    },

    studyAbroad: {
      status: "active",
      eyebrow: "Study Abroad Guidance",
      title: "Thinking of Studying *Abroad?*",
      desc: "Get honest guidance on the right country, course and university for your profile before you commit time and money.",
      pills: ["🗽 USA", "✈ UK", "🇩🇪 Germany", "🦘 Australia", "+ more"],
      cta: { label: "Talk to {{founder.firstName}} About Study Abroad →", href: "whatsapp:Hi {{founder.firstName}}, I'd like guidance on studying abroad." },
    },

    about: {
      status: "active",
      eyebrow: "Meet Your Counsellor",
      title: "{{founder.headlineCredential}} — Where *Psychology Meets Purpose*",
      paragraphs: [
        "{{founder.name}} brings a rare and powerful dual lens to career guidance. Grounded in the science of human behaviour through her MSc in Psychology, and sharpened by the analytical precision of her LLB (Hons), she approaches every career conversation with both psychological depth and real-world clarity — helping students and professionals cut through confusion and step confidently into the right path.",
        "With {{stats.yearsExperience}}+ years of experience and {{stats.studentsGuided}}+ students guided across Hyderabad, Telangana, AP, Tamil Nadu and Karnataka — including students who went on to study abroad — {{founder.firstName}} has built a reputation for structured, honest, life-changing career guidance.",
        "She founded {{brand.name}} with a single belief: that the right guidance, given at the right moment, changes everything — and that every family deserves access to it.",
      ],
      stats: [
        { value: "{{stats.studentsGuided}}+", label: "Students Guided" },
        { value: "{{stats.yearsExperience}}+", label: "Years Experience" },
        { value: "{{stats.statesServed}}", label: "States Served" },
      ],
      quote:
        "Behind every career question is a story — a student feeling lost, a parent lying awake wondering if they're making the right choice, a professional exhausted by a path that was never truly theirs. I started {{brand.name}} because I believe every person deserves guidance that sees them as an individual — not a number, not a demographic. You deserve clarity, you deserve confidence, and you deserve someone who walks this journey with you — every step of the way.",
      quoteAttribution: "— {{founder.name}}, Founder, {{brand.name}}",
      bookCta: book("Book a Session with {{founder.firstName}} →"),
    },

    assessments: {
      status: "active",
      eyebrow: "Career Assessments",
      title: "Stop Guessing. Let *Science* Guide Your Career.",
      desc: "Our scientifically validated psychometric assessments remove the guesswork from career decisions. Backed by psychology, powered by data.",
      featureTitle: "What Our *Assessments* Reveal About You",
      featureDesc:
        "Most career advice is based on opinions. Ours is based on validated psychological science — measuring what you're naturally good at, how your mind works, and what environments help you thrive.",
      types: [
        { icon: "🧠", title: "Aptitude Testing", sub: "IQ, logical reasoning, numerical & verbal ability" },
        { icon: "👤", title: "Personality Mapping", sub: "Big Five + interest inventory + work style" },
        { icon: "⚡", title: "Multiple Intelligence", sub: "Howard Gardner's 8 intelligences profiled" },
        { icon: "❤️", title: "Emotional Intelligence", sub: "EQ mapping for career & leadership fit" },
      ],
      ctaLabel: "Take Career Assessment →",
      flowTitle: "How It Works",
      flow: [
        { title: "Book your assessment", desc: "free initial call to choose the right test for you" },
        { title: "Take the test online", desc: "via our Edumilestones assessment portal (takes 30–45 mins)" },
        { title: "Receive your 30-page report", desc: "detailed analysis of aptitude, personality and career fit" },
        { title: "Counselling session with {{founder.firstName}}", desc: "deep-dive into results and career roadmap creation" },
        { title: "Your 10-year career roadmap", desc: "actionable steps from today to your dream career" },
      ],
    },

    // PLACEHOLDERS — replace with real testimonials (with permission to use names/initials).
    testimonials: {
      status: "active",
      eyebrow: "Success Stories",
      title: "Real Students. Real Families. *Real Transformations.*",
      desc: "From {{location.city}} and across India — students who found their direction with {{brand.name}}.",
      items: [
        {
          quote: "I was completely lost after 12th. {{founder.firstName}}'s assessment revealed I was naturally suited to psychology and research. Now studying at a top university and loving every day.",
          initials: "PK", photo: null, name: "Priya K.", role: "Student · Hyderabad", tag: "After 12th",
        },
        {
          quote: "Stuck in IT for 8 years and miserable. {{founder.firstName}} helped me realise my calling was education management. Made the switch — 30% salary hike doing what I love.",
          initials: "RM", photo: null, name: "Rahul M.", role: "IT Pro → EdTech Manager", tag: "Career Change",
        },
        {
          quote: "We were confused as parents — son wanted arts, we pushed engineering. One session changed everything. He's now thriving at a design school in Melbourne.",
          initials: "SP", photo: null, name: "Sunita & Prakash P.", role: "Parents · Son in Melbourne", tag: "Study Abroad",
        },
      ],
    },

    blog: {
      status: "active",
      eyebrow: "Career Insights",
      title: "Expert Advice from the *Career Guidance Blog*",
      desc: "Practical, honest career articles written by {{founder.name}} — covering careers, study abroad, exams and professional growth.",
      posts: [
        {
          category: "After 12th",
          title: "What to Do After 12th Science in Hyderabad — The Complete 2026 Guide",
          excerpt: "Engineering vs Medicine vs Law vs Emerging Careers — an honest, data-backed guide from a certified counsellor on what actually works in today's market.",
          readTime: "10 min read", topic: "Career Guidance", image: null, href: "", featured: true,
        },
        {
          category: "Study Abroad",
          title: "USA vs UK vs Germany vs Australia — Which Suits Indian Students in 2026?",
          excerpt: "Cost, scholarships and post-study work options compared honestly.",
          readTime: "8 min read", topic: "", image: null, href: "", featured: false,
        },
        {
          category: "Careers",
          title: "Top 15 Future-Proof Careers After AI — That Robots Can't Replace",
          excerpt: "Which careers are safe from automation? A psychologist's answer backed by research.",
          readTime: "7 min read", topic: "", image: null, href: "", featured: false,
        },
      ],
    },

    faq: {
      status: "active",
      eyebrow: "FAQ",
      title: "Questions *Parents & Students* Ask Us Most",
      desc: "",
      items: [
        { q: "What is career counselling and how does it help?", a: "Career counselling is a professional guidance process using psychological assessments and expert advice to help students and professionals identify their strengths, interests and ideal career path — removing guesswork and confusion." },
        { q: "At what age should my child take career counselling?", a: "Ideally Class 8–10 for early stream selection guidance. However, counselling at any stage — after 12th, graduation, or even mid-career — is highly effective and life-changing." },
        { q: "Is the initial career counselling free?", a: "Yes — we offer a free 15-minute career guidance call to understand your situation before recommending the right programme. No payment required and no obligations." },
        { q: "Do you offer online career counselling?", a: "Absolutely. We offer Zoom, Google Meet and phone sessions for clients across India and internationally — same depth and quality as in-person Hyderabad sessions." },
        { q: "How is {{brand.name}} different from other counsellors?", a: "{{founder.name}} is a {{founder.headlineCredential}} with dual qualifications in MSc Psychology and Law — bringing analytical, science-backed and genuinely personalised guidance to every family." },
        { q: "What is a psychometric test and is it accurate?", a: "Psychometric tests are scientifically validated tools measuring aptitude, personality, intelligence and interests. Our assessments use standardised, research-based tools and are always interpreted by a counsellor — not left to guesswork." },
        { q: "Do you guide students on studying abroad?", a: "Your first 15-minute call is free and helps you understand your options. For detailed study abroad guidance, we will always tell you upfront what any further support costs." },
        { q: "Can parents attend the counselling session?", a: "Yes — we actively encourage parents to join for student sessions. We also offer dedicated parent + student joint sessions to align expectations, which are particularly effective for stream and college selection." },
      ],
    },

    finalCta: {
      status: "active",
      title: "Your Future Deserves the *Right Guidance.*",
      desc: "Helping students, graduates and professionals make confident career decisions — with clarity, structure and expert support.",
      primaryCta: book("📅 Book Free Guidance Call"),
      whatsappLabel: "💬 WhatsApp Us Now",
      secondaryCta: { label: "✈ Study Abroad Enquiry", href: "whatsapp:Hi {{founder.firstName}}, I have a study abroad enquiry." },
    },

    footer: {
      description:
        "Career guidance practice in {{location.city}} led by a {{founder.headlineCredential}}. Deeply personalised guidance for students and professionals — {{stats.yearsExperience}}+ years of experience.",
      columns: [
        {
          title: "Services",
          links: ["Career Counselling", "Study Abroad", "Psychometric Tests", "Online Counselling", "School Workshops", "Parent Sessions", "Career Resources"].map((label) => ({ label, href: "#services" })),
        },
        {
          title: "Study Abroad",
          links: ["Study in USA", "Study in UK", "Study in Germany", "Study in Australia"].map((label) => ({ label, href: "#study-abroad" })),
        },
        {
          title: "Quick Links",
          links: [
            { label: "About {{founder.name}}", href: "#about" },
            { label: "Success Stories", href: "#top" },
            { label: "Career Blog", href: "#blog" },
            { label: "Free Career Test", href: "#assessments" },
            { label: "Book Session", href: "#book" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
          ],
        },
      ],
      legalLinks: ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Sitemap"].map((label) => ({ label, href: "#top" })),
      copyright: "© {{brand.copyrightYear}} {{brand.name}}. All rights reserved. | {{founder.name}} | Career Counsellor in {{location.city}}",
    },
  },

  widgets: {
    whatsappFloat: { status: "active", label: "💬 Chat on WhatsApp" },
    mobileStickyBar: { status: "active", bookLabel: "📅 Book Free Call", whatsappLabel: "💬 WhatsApp" },
    exitIntentPopup: {
      status: "active",
      kicker: "FREE Career Guidance",
      title: "Get Your Free 15-Min Career Clarity Call",
      sub: "Zero cost · No spam · Instant WhatsApp confirmation",
    },
    statsCounterAnimation: { status: "active" },
    appointmentBooking: {
      status: "active",
      buttonLabel: "📅 Book an Appointment",
      kicker: "1-on-1 Session with {{founder.firstName}}",
      title: "Book an Appointment",
      sub: "Pick a day and a time that suits you — we'll confirm on WhatsApp.",
      detailsStepLabel: "Your details",
      scheduleStepLabel: "Date & time",
      messagePlaceholder: "Briefly tell us what you'd like guidance on (optional)",
      nextLabel: "Next →",
      submitLabel: "📅 Book an Appointment",
      daysAhead: 30,
      slots: [
        { label: "Morning", time: "9 AM – 12 PM", endHour: 12 },
        { label: "Afternoon", time: "1 PM – 4 PM", endHour: 16 },
        { label: "Evening", time: "5 PM – 8 PM", endHour: 20 },
      ],
      successMessage: "✓ We've opened WhatsApp with your appointment request — hit send and we'll confirm your slot shortly.",
    },
  },

  leadForm: {
    iAmOptions: ["Parent of student", "Student", "Graduate", "Professional"],
    concernOptions: ["Stream selection", "College confusion", "Study abroad", "Career change", "Job growth"],
    successMessage: "✓ Thank you! We've opened WhatsApp with your details — hit send and we'll confirm your call shortly.",
  },
};
