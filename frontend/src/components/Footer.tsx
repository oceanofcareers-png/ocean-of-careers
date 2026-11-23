import { siteConfig, telLink, whatsappLink } from "@/config";
import { footerLinks } from "@/content/home";

const { brand, founder, contact, location, stats, social } = siteConfig;

export default function Footer() {
  const socials = [
    { label: "in", name: "LinkedIn", href: social.linkedin },
    { label: "IG", name: "Instagram", href: social.instagram },
    { label: "YT", name: "YouTube", href: social.youtube },
    { label: "FB", name: "Facebook", href: social.facebook },
    { label: "WA", name: "WhatsApp", href: whatsappLink() },
  ].filter((s) => s.href);

  return (
    <footer className="footer" id="contact">
      <div className="container footer-top">
        <div>
          <div className="footer-brand-name">🌊 {brand.name}</div>
          <div className="footer-brand-tag">{brand.tagline}</div>
          <p className="footer-brand-desc">
            Career guidance practice in {location.city} led by a {founder.headlineCredential}. Deeply personalised
            guidance for students and professionals — {stats.yearsExperience}+ years of experience.
          </p>
          <div className="footer-socials">
            {socials.map((s) => (
              <a key={s.name} className="fsoc" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
                {s.label}
              </a>
            ))}
          </div>
          <div className="footer-cert-strip">
            {founder.certBadges.map((c) => <span key={c} className="footer-cert">{c}</span>)}
            <span className="footer-cert">⭐ {stats.googleRating.toFixed(1)} Google · {stats.googleReviews} Reviews</span>
          </div>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>{footerLinks.services.map((l) => <li key={l}><a href="#services">{l}</a></li>)}</ul>
        </div>

        {siteConfig.features.studyAbroad && (
          <div className="footer-col">
            <h4>Study Abroad</h4>
            <ul>{footerLinks.studyAbroad.map((l) => <li key={l}><a href="#study-abroad">{l}</a></li>)}</ul>
          </div>
        )}

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>{footerLinks.quick.map((l) => <li key={l}><a href="#top">{l}</a></li>)}</ul>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <address style={{ fontStyle: "normal" }}>
            <div className="contact-item"><span>📍</span><div><span className="contact-label">Location</span>{location.full}</div></div>
            <div className="contact-item"><span>📞</span><div><span className="contact-label">Call / WhatsApp</span><a href={telLink()}>{contact.phoneDisplay}</a></div></div>
            <div className="contact-item"><span>✉</span><div><span className="contact-label">Primary Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div></div>
            <div className="contact-item"><span>✉</span><div><span className="contact-label">Alternate</span><a href={`mailto:${contact.altEmail}`}>{contact.altEmail}</a></div></div>
            <div className="contact-item"><span>🕐</span><div><span className="contact-label">Hours</span>{contact.hours}<br />{contact.onlineHours}</div></div>
          </address>
          <div className="footer-map">
            {location.mapEmbedUrl ? (
              <iframe src={location.mapEmbedUrl} title={`${brand.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            ) : (
              <span>📍 Google Maps embed — set location.mapEmbedUrl in config.ts</span>
            )}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-copy">
            © {brand.foundedYearForCopyright} {brand.name}. All rights reserved. | {founder.name} | Career Counsellor in {location.city}
          </div>
          <div className="footer-links-row">
            {footerLinks.legal.map((l) => <a key={l} href="#top">{l}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
