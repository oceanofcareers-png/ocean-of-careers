import { siteConfig, whatsappLink } from "@/config";
import LeadForm from "./LeadForm";
import CountUp from "./CountUp";

const { brand, founder, contact, location, stats } = siteConfig;

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <div className="topbar-item">📞 <b>{contact.phoneDisplay}</b></div>
          <a className="topbar-item" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            💬 <b>WhatsApp: {contact.phoneDisplay}</b>
          </a>
          <a className="topbar-item" href={`mailto:${contact.email}`}>✉ <b>{contact.email}</b></a>
          <div className="topbar-item">📍 <b>{location.short}</b> · Online Across India</div>
        </div>
        <a href="#book" className="btn btn-gold topbar-cta">🎁 Book a Free 15-Min Guidance Call</a>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-orb hero-orb1" />
      <div className="hero-orb hero-orb2" />
      <div className="hero-lines" />
      <div className="container hero-inner">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Personalised Guidance for Students · Graduates · Professionals
          </div>
          <h1 className="hero-h1">
            Discover the Career <span className="gold">Your Child Was Born For.</span>
          </h1>
          <p className="hero-tagline">&ldquo;{brand.motto}&rdquo;</p>
          <p className="hero-sub">
            Expert career counselling, psychometric assessments &amp; global education guidance by{" "}
            <b>{founder.name}</b> — a Global Career Counsellor certified by UCLA Extension (USA), guiding students,
            graduates and professionals from {location.city} and online across India.
          </p>
          <div className="hero-btns">
            <a href="#book" className="btn btn-gold btn-lg">📅 Book Free Guidance Call</a>
            {siteConfig.features.studyAbroad && (
              <a href="#study-abroad" className="btn btn-outline btn-lg">✈ Explore Study Abroad →</a>
            )}
          </div>
          <div className="hero-trust-row">
            <div className="hero-trust-item"><span className="hero-tick">✓</span> {stats.studentsGuided}+ Students Guided</div>
            <div className="hero-trust-item"><span className="hero-tick">✓</span> {stats.googleRating.toFixed(1)} ★ · {stats.googleReviews} Google Reviews</div>
            <div className="hero-trust-item"><span className="hero-tick">✓</span> Online Across India</div>
            {siteConfig.features.studyAbroad && (
              <div className="hero-trust-item"><span className="hero-tick">✓</span> Study Abroad: USA · UK · Germany · Australia</div>
            )}
          </div>
        </div>

        <div className="hero-card" id="book">
          <div className="hero-card-head">🎯 Get Your Free Career Clarity Call</div>
          <div className="hero-card-sub">2 mins to fill · 100% free · No spam ever</div>
          <LeadForm
            variant="dark"
            source="hero"
            submitLabel="Get My Free Guidance Call →"
            privacyNote="🔒 100% Confidential · No obligations"
          />
        </div>
      </div>
    </section>
  );
}

export function CredentialsBar() {
  const items = [...founder.credentials, { icon: "📍", title: "Serving Students Across", detail: location.serviceArea }];
  return (
    <div className="cred-bar">
      <div className="container cred-bar-inner">
        {items.map((c, i) => (
          <div key={c.title} style={{ display: "contents" }}>
            {i > 0 && <div className="cred-divider" />}
            <div className="cred-item">
              <div className="cred-icon">{c.icon}</div>
              <div className="cred-text"><b>{c.title}</b>{c.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsBar() {
  const items = [
    { node: <CountUp value={stats.studentsGuided} suffix="+" />, label: "Students Guided" },
    { node: <CountUp value={stats.yearsExperience} suffix="+" />, label: "Years Experience" },
    { node: <CountUp value={stats.googleRating} decimals={1} suffix=" ★" />, label: `Google Rating · ${stats.googleReviews} Reviews` },
    { node: <CountUp value={stats.statesServed} />, label: "States Served" },
  ];
  return (
    <div className="stats-bar">
      <div className="container stats-bar-inner">
        {items.map((s, i) => (
          <div key={s.label} style={{ display: "contents" }}>
            {i > 0 && <div className="stat-div" />}
            <div className="stat-item">
              <div className="stat-num">{s.node}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
