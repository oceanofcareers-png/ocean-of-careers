import { whatsappUrl } from "@/content/resolve";
import type { SiteContent } from "@/content/types";
import LeadForm from "./LeadForm";
import CountUp from "./CountUp";
import { Bold, Highlight, SmartLink } from "./primitives";
import { leadFormSettings } from "./settings";

type P = { c: SiteContent };

export function TopBar({ c }: P) {
  const { site } = c;
  const { contact, location } = site;
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <a className="topbar-item" href={`tel:+${contact.phoneRaw}`}>📞 <b>{contact.phoneDisplay}</b></a>
          <a
            className="topbar-item"
            href={whatsappUrl(contact.whatsappRaw, contact.whatsappDefaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 <b>WhatsApp: {contact.phoneDisplay}</b>
          </a>
          <a className="topbar-item" href={`mailto:${contact.email}`}>✉ <b>{contact.email}</b></a>
          <div className="topbar-item">📍 <b>{location.short}</b> · Online Across India</div>
        </div>
        <SmartLink link={c.sections.topBar.cta} site={site} className="btn btn-gold topbar-cta" />
      </div>
    </div>
  );
}

export function Hero({ c }: P) {
  const h = c.sections.hero;
  return (
    <section className="hero">
      <div className="hero-orb hero-orb1" />
      <div className="hero-orb hero-orb2" />
      <div className="hero-lines" />
      <div className="container hero-inner">
        <div>
          {h.eyebrow && (
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              {h.eyebrow}
            </div>
          )}
          <h1 className="hero-h1"><Highlight text={h.title} /></h1>
          {h.motto && <p className="hero-tagline">&ldquo;{h.motto}&rdquo;</p>}
          <p className="hero-sub"><Bold text={h.intro} /></p>
          <div className="hero-btns">
            {h.primaryCta.label && <SmartLink link={h.primaryCta} site={c.site} className="btn btn-gold btn-lg" />}
            {h.secondaryCta.label && <SmartLink link={h.secondaryCta} site={c.site} className="btn btn-outline btn-lg" />}
          </div>
          <div className="hero-trust-row">
            {h.trustItems.map((t, i) => (
              <div key={i} className="hero-trust-item"><span className="hero-tick">✓</span> {t}</div>
            ))}
          </div>
        </div>

        <div className="hero-card" id="book">
          <div className="hero-card-head">{h.formTitle}</div>
          <div className="hero-card-sub">{h.formSub}</div>
          <LeadForm
            variant="dark"
            source="hero"
            submitLabel={h.formSubmitLabel}
            privacyNote={h.formPrivacy}
            settings={leadFormSettings(c)}
          />
        </div>
      </div>
    </section>
  );
}

export function CredentialsBar({ c }: P) {
  return (
    <div className="cred-bar">
      <div className="container cred-bar-inner">
        {c.sections.credentials.items.map((item, i) => (
          <div key={i} style={{ display: "contents" }}>
            {i > 0 && <div className="cred-divider" />}
            <div className="cred-item">
              <div className="cred-icon">{item.icon}</div>
              <div className="cred-text"><b>{item.title}</b>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StatsBar({ c }: P) {
  const animate = c.widgets.statsCounterAnimation.status === "active";
  return (
    <div className="stats-bar">
      <div className="container stats-bar-inner">
        {c.sections.stats.items.map((s, i) => (
          <div key={i} style={{ display: "contents" }}>
            {i > 0 && <div className="stat-div" />}
            <div className="stat-item">
              <div className="stat-num"><CountUp text={s.value} animate={animate} /></div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
