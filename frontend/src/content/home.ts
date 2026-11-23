import { siteConfig, type FeatureFlags } from "@/config";

const { founder, stats } = siteConfig;

export const navLinks: { label: string; href: string; flag?: keyof FeatureFlags }[] = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about", flag: "aboutSection" },
  { label: "Services", href: "#services", flag: "servicesSection" },
  { label: "Study Abroad", href: "#study-abroad", flag: "studyAbroad" },
  { label: "Assessments", href: "#assessments", flag: "assessments" },
  { label: "Blog", href: "#blog", flag: "blog" },
  { label: "Contact", href: "#contact" },
];

export const leadFormOptions = {
  iAm: ["Parent of student", "Student", "Graduate", "Professional"],
  concerns: ["Stream selection", "College confusion", "Study abroad", "Career change", "Job growth"],
};

export const audiences = [
  {
    icon: "🎒",
    title: "School Students",
    desc: "Class 8–12 · Stream selection · NEP-based guidance · Subject clarity",
  },
  {
    icon: "🎓",
    title: "UG / PG Students",
    desc: "Graduates · College confusion · Higher education · Study abroad decisions",
    popular: true,
  },
  {
    icon: "💼",
    title: "Working Professionals",
    desc: "Career change · Upskilling · Burnout · Higher studies · Leadership growth",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Parents",
    desc: "Child's stream · College shortlist · Study abroad direction · Joint counselling sessions",
  },
];

export const problems = [
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
];

export const processSteps = [
  { icon: "📞", title: "Free Guidance Call", desc: "15-minute no-obligation call to understand your situation, goals and concerns.", free: true },
  { icon: "🧪", title: "Career Assessment", desc: "Scientific psychometric test — aptitude, personality, interests and intelligence mapping." },
  { icon: "🤝", title: "One-on-One Counselling", desc: `Deep-dive session with ${founder.firstName} analysing your results and exploring career directions.` },
  { icon: "🗺️", title: "Career Mapping", desc: "Stream selection, college shortlist, course selection and entrance exam roadmap." },
  { icon: "📋", title: "Personalised Roadmap", desc: "30-page written career report with 10-year plan and actionable next steps." },
  { icon: "🔄", title: "Ongoing Support", desc: "WhatsApp follow-up, milestone check-ins and guidance as your journey unfolds." },
];

export const services = [
  {
    icon: "🎒",
    theme: "navy",
    title: "Career Guidance for Students",
    sub: "After 10th, 12th, graduation — stream, college & course clarity",
    points: [
      "Stream selection (Science/Commerce/Arts)",
      "College shortlisting & admission guidance",
      "Entrance exam strategy (JEE, NEET, CLAT, CA)",
      "MPC / BiPC / MEC career mapping",
      "High salary career options planning",
    ],
    cta: "Learn More →",
  },
  {
    icon: "✈️",
    theme: "gold",
    title: "Study Abroad Guidance",
    sub: "USA, UK, Germany, Australia & more",
    points: [
      "Profile evaluation & country selection",
      "Course & university shortlisting",
      "Scholarship identification",
      "Application timeline planning",
      "Parent + student Q&A session",
    ],
    cta: "Explore Abroad →",
  },
  {
    icon: "💼",
    theme: "deep",
    title: "Professional Career Transition",
    sub: "Career change, upskilling, leadership & growth strategy",
    points: [
      "Career switch strategy & execution plan",
      "Skills gap & personality deep-dive",
      "MBA / higher education counselling",
      "Future-proof career planning post-AI",
      "High-growth career direction mapping",
    ],
    cta: "Learn More →",
  },
  {
    icon: "🧪",
    theme: "teal",
    title: "Psychometric Assessments",
    sub: "Scientific career assessments with 30-page personalised report",
    points: [
      "IQ + Aptitude testing",
      "Personality mapping (Big Five + MBTI style)",
      "Multiple Intelligence assessment",
      "Emotional Intelligence (EQ) evaluation",
      "30-page career report + 10-year roadmap",
    ],
    cta: "Take Assessment →",
  },
  {
    icon: "💻",
    theme: "purple",
    title: "Online Career Counselling",
    sub: "Same depth as in-person — from anywhere in India",
    points: [
      "Zoom / Google Meet / phone sessions",
      "Online psychometric test + report",
      "Flexible evening & weekend slots",
      "Parents can join from any city",
      "WhatsApp follow-up support",
    ],
    cta: "Book Online Session →",
  },
  {
    icon: "👨‍👩‍👧",
    theme: "rust",
    title: "Parent + Student Sessions",
    sub: "Joint guidance to align family & student aspirations",
    points: [
      "Parent anxiety & expectation counselling",
      "Student-parent career alignment session",
      "School & college campus workshops",
      "Online + offline available",
      "Group sessions for schools",
    ],
    cta: "Enquire →",
  },
] as const;

export const studyAbroadCountries = ["🗽 USA", "✈ UK", "🇩🇪 Germany", "🦘 Australia", "+ more"];

export const aboutParagraphs = [
  `${founder.name} brings a rare and powerful dual lens to career guidance. Grounded in the science of human behaviour through her MSc in Psychology, and sharpened by the analytical precision of her LLB (Hons), she approaches every career conversation with both psychological depth and real-world clarity — helping students and professionals cut through confusion and step confidently into the right path.`,
  `With ${stats.yearsExperience}+ years of experience and ${stats.studentsGuided}+ students guided across Hyderabad, Telangana, AP, Tamil Nadu and Karnataka — including students who went on to study abroad — ${founder.firstName} has built a reputation for structured, honest, life-changing career guidance.`,
  `She founded ${siteConfig.brand.name} with a single belief: that the right guidance, given at the right moment, changes everything — and that every family deserves access to it.`,
];

export const founderQuote = `Behind every career question is a story — a student feeling lost, a parent lying awake wondering if they're making the right choice, a professional exhausted by a path that was never truly theirs. I started ${siteConfig.brand.name} because I believe every person deserves guidance that sees them as an individual — not a number, not a demographic. You deserve clarity, you deserve confidence, and you deserve someone who walks this journey with you — every step of the way.`;

export const assessmentTypes = [
  { icon: "🧠", title: "Aptitude Testing", sub: "IQ, logical reasoning, numerical & verbal ability" },
  { icon: "👤", title: "Personality Mapping", sub: "Big Five + interest inventory + work style" },
  { icon: "⚡", title: "Multiple Intelligence", sub: "Howard Gardner's 8 intelligences profiled" },
  { icon: "❤️", title: "Emotional Intelligence", sub: "EQ mapping for career & leadership fit" },
];

export const assessmentFlow = [
  { title: "Book your assessment", desc: "free initial call to choose the right test for you" },
  { title: "Take the test online", desc: "via our Edumilestones assessment portal (takes 30–45 mins)" },
  { title: "Receive your 30-page report", desc: "detailed analysis of aptitude, personality and career fit" },
  { title: `Counselling session with ${founder.firstName}`, desc: "deep-dive into results and career roadmap creation" },
  { title: "Your 10-year career roadmap", desc: "actionable steps from today to your dream career" },
];

// PLACEHOLDERS — replace with real testimonials (with permission to use names/initials).
export const testimonials = [
  {
    quote: `I was completely lost after 12th. ${founder.firstName}'s assessment revealed I was naturally suited to psychology and research. Now studying at a top university and loving every day.`,
    initials: "PK",
    name: "Priya K.",
    role: "Student · Hyderabad",
    tag: "After 12th",
  },
  {
    quote: `Stuck in IT for 8 years and miserable. ${founder.firstName} helped me realise my calling was education management. Made the switch — 30% salary hike doing what I love.`,
    initials: "RM",
    name: "Rahul M.",
    role: "IT Pro → EdTech Manager",
    tag: "Career Change",
  },
  {
    quote: "We were confused as parents — son wanted arts, we pushed engineering. One session changed everything. He's now thriving at a design school in Melbourne.",
    initials: "SP",
    name: "Sunita & Prakash P.",
    role: "Parents · Son in Melbourne",
    tag: "Study Abroad",
  },
];

export const blogPosts = [
  {
    category: "After 12th",
    title: "What to Do After 12th Science in Hyderabad — The Complete 2026 Guide",
    excerpt: "Engineering vs Medicine vs Law vs Emerging Careers — an honest, data-backed guide from a certified counsellor on what actually works in today's market.",
    readTime: "10 min read",
    topic: "Career Guidance",
    featured: true,
  },
  {
    category: "Study Abroad",
    title: "USA vs UK vs Germany vs Australia — Which Suits Indian Students in 2026?",
    excerpt: "Cost, scholarships and post-study work options compared honestly.",
    readTime: "8 min read",
  },
  {
    category: "Careers",
    title: "Top 15 Future-Proof Careers After AI — That Robots Can't Replace",
    excerpt: "Which careers are safe from automation? A psychologist's answer backed by research.",
    readTime: "7 min read",
  },
];

export const faqs = [
  {
    q: "What is career counselling and how does it help?",
    a: "Career counselling is a professional guidance process using psychological assessments and expert advice to help students and professionals identify their strengths, interests and ideal career path — removing guesswork and confusion.",
  },
  {
    q: "At what age should my child take career counselling?",
    a: "Ideally Class 8–10 for early stream selection guidance. However, counselling at any stage — after 12th, graduation, or even mid-career — is highly effective and life-changing.",
  },
  {
    q: "Is the initial career counselling free?",
    a: "Yes — we offer a free 15-minute career guidance call to understand your situation before recommending the right programme. No payment required and no obligations.",
  },
  {
    q: "Do you offer online career counselling?",
    a: "Absolutely. We offer Zoom, Google Meet and phone sessions for clients across India and internationally — same depth and quality as in-person Hyderabad sessions.",
  },
  {
    q: `How is ${siteConfig.brand.name} different from other counsellors?`,
    a: `${founder.name} is a ${founder.headlineCredential} with dual qualifications in MSc Psychology and Law — bringing analytical, science-backed and genuinely personalised guidance to every family.`,
  },
  {
    q: "What is a psychometric test and is it accurate?",
    a: "Psychometric tests are scientifically validated tools measuring aptitude, personality, intelligence and interests. Our assessments use standardised, research-based tools and are always interpreted by a counsellor — not left to guesswork.",
  },
  {
    q: "Do you guide students on studying abroad?",
    a: "Your first 15-minute call is free and helps you understand your options. For detailed study abroad guidance, we will always tell you upfront what any further support costs.",
  },
  {
    q: "Can parents attend the counselling session?",
    a: "Yes — we actively encourage parents to join for student sessions. We also offer dedicated parent + student joint sessions to align expectations, which are particularly effective for stream and college selection.",
  },
];

export const footerLinks = {
  services: ["Career Counselling", "Study Abroad", "Psychometric Tests", "Online Counselling", "School Workshops", "Parent Sessions", "Career Resources"],
  studyAbroad: ["Study in USA", "Study in UK", "Study in Germany", "Study in Australia"],
  quick: [`About ${founder.name}`, "Success Stories", "Career Blog", "Free Career Test", "Book Session", "FAQ", "Contact"],
  legal: ["Privacy Policy", "Terms & Conditions", "Cookie Policy", "Sitemap"],
};
