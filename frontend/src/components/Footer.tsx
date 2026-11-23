import type { SiteContent } from "@/content/types";
import { SmartLink } from "./primitives";

export default function Footer({ c }: { c: SiteContent }) {
  const { site } = c;
  const { brand, founder, contact, location, stats, social } = site;
  const f = c.sections.footer;

  const socials = [
    { label: "in", name: "LinkedIn", href: social.linkedinUrl },
    { label: "IG", name: "Instagram", href: social.instagramUrl },
    { label: "YT", name: "YouTube", href: social.youtubeUrl },
    { label: "FB", name: "Facebook", href: social.facebookUrl },
    { label: "WA", name: "WhatsApp", href: "whatsapp:" },
  ].filter((s) => s.href);

  return (
    <footer className="footer" id="contact">
      <div className="container footer-top">
        <div>
          <div className="footer-brand-name">🌊 {brand.name}</div>
          <div className="footer-brand-tag">{brand.tagline}</div>
          <p className="footer-brand-desc">{f.description}</p>
          <div className="footer-socials">
            {socials.map((s) => (
              <SmartLink key={s.name} href={s.href} site={site} className="fsoc" ariaLabel={s.name}>
                {s.label}
              </SmartLink>
            ))}
          </div>
          <div className="footer-cert-strip">
            {founder.certBadges.map((b, i) => <span key={i} className="footer-cert">{b}</span>)}
            <span className="footer-cert">⭐ {stats.googleRating.toFixed(1)} Google · {stats.googleReviews} Reviews</span>
          </div>
        </div>

        {f.columns.map((col, i) => (
          <div key={i} className="footer-col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((l, j) => (
                <li key={j}><SmartLink link={l} site={site} /></li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col">
          <h4>Contact</h4>
          <address style={{ fontStyle: "normal" }}>
            <div className="contact-item"><span>📍</span><div><span className="contact-label">Location</span>{location.full}</div></div>
            <div className="contact-item"><span>📞</span><div><span className="contact-label">Call / WhatsApp</span><a href={`tel:+${contact.phoneRaw}`}>{contact.phoneDisplay}</a></div></div>
            <div className="contact-item"><span>✉</span><div><span className="contact-label">Primary Email</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div></div>
            {contact.altEmail && (
              <div className="contact-item"><span>✉</span><div><span className="contact-label">Alternate</span><a href={`mailto:${contact.altEmail}`}>{contact.altEmail}</a></div></div>
            )}
            <div className="contact-item"><span>🕐</span><div><span className="contact-label">Hours</span>{contact.hours}<br />{contact.onlineHours}</div></div>
          </address>
          {/^https:\/\/(www\.)?google\.[a-z.]+\/maps\/embed/i.test(location.mapEmbedUrl) && (
            <div className="footer-map">
              <iframe src={location.mapEmbedUrl} title={`${brand.name} location`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-copy">{f.copyright}</div>
          <div className="footer-links-row">
            {f.legalLinks.map((l, i) => <SmartLink key={i} link={l} site={site} />)}
          </div>
        </div>
      </div>
    </footer>
  );
}
