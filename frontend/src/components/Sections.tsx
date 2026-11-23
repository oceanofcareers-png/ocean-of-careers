import type { SiteContent } from "@/content/types";
import AssessmentCta from "./AssessmentCta";
import BookingButton from "./BookingButton";
import { ContentImage, Highlight, SmartLink } from "./primitives";
import { leadFormSettings, popupCopy } from "./settings";

type P = { c: SiteContent };

function Heading({ eyebrow, title, desc, eyebrowClass = "" }: { eyebrow: string; title: string; desc?: string; eyebrowClass?: string }) {
  return (
    <div className="sh">
      {eyebrow && <span className={`sh-eyebrow ${eyebrowClass}`}>{eyebrow}</span>}
      <h2 className="sh-title"><Highlight text={title} /></h2>
      {desc && <p className="sh-desc">{desc}</p>}
    </div>
  );
}

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function Audience({ c }: P) {
  const s = c.sections.audience;
  return (
    <section className="section section-tight">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
        <div className="audience-grid">
          {s.items.map((a, i) => (
            <SmartLink key={i} link={a.cta} site={c.site} className={`audience-card${a.popular ? " popular" : ""}`}>
              {a.popular && <span className="audience-badge">MOST POPULAR</span>}
              <div className="audience-icon">{a.icon}</div>
              <h3 className="audience-title">{a.title}</h3>
              <p className="audience-desc">{a.desc}</p>
              {a.cta.label && <span className="btn btn-gold btn-sm">{a.cta.label}</span>}
            </SmartLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Problems({ c }: P) {
  const s = c.sections.problems;
  return (
    <section className="section section-alt">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} eyebrowClass="navy" />
        <div className="problem-grid">
          {s.items.map((p, i) => (
            <div key={i} className="prob-card">
              <span className="prob-icon">{p.icon}</span>
              <p className="prob-text">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="problem-cta">
          <p>{s.ctaText}<br /><span>{s.ctaHighlight}</span></p>
          {s.cta.label && <SmartLink link={s.cta} site={c.site} className="btn btn-gold btn-md" />}
        </div>
      </div>
    </section>
  );
}

export function Process({ c }: P) {
  const s = c.sections.process;
  return (
    <section className="section">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
        <ol className="steps-track">
          {s.steps.map((step, i) => (
            <li key={i} className="step-node">
              <div className="step-circle"><span className="s-num">{i + 1}</span><span className="s-icon">{step.icon}</span></div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
              {step.free && <span className="badge-free">FREE</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Services({ c }: P) {
  const s = c.sections.services;
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
        <div className="services-grid">
          {s.items.map((item, i) => (
            <article key={i} className="svc-card">
              <div className={`svc-header svc-${item.theme}`}>
                <div className="svc-icon-wrap">{item.icon}</div>
                <h3 className="svc-card-title">{item.title}</h3>
                <p className="svc-card-sub">{item.sub}</p>
              </div>
              <div className="svc-body">
                <ul className="svc-list">
                  {item.points.map((p, j) => <li key={j}>{p}</li>)}
                </ul>
              </div>
              {item.cta.label && (
                <div className="svc-footer"><SmartLink link={item.cta} site={c.site} className="svc-link" /></div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudyAbroad({ c }: P) {
  const s = c.sections.studyAbroad;
  return (
    <section className="section section-tight" id="study-abroad">
      <div className="container">
        <div className="abroad-strip">
          <div>
            {s.eyebrow && <span className="sh-eyebrow gold">{s.eyebrow}</span>}
            <h2><Highlight text={s.title} className="" /></h2>
            <p>{s.desc}</p>
            <div className="abroad-pills">
              {s.pills.map((p, i) => <span key={i} className="abroad-pill">{p}</span>)}
            </div>
          </div>
          {s.cta.label && <SmartLink link={s.cta} site={c.site} className="btn btn-gold btn-md" />}
        </div>
      </div>
    </section>
  );
}

export function About({ c }: P) {
  const s = c.sections.about;
  const { founder, location } = c.site;
  return (
    <section className="section section-alt" id="about">
      <div className="container about-grid">
        <aside className="about-photo-card">
          <div className="about-photo-frame">
            {founder.photo ? (
              <ContentImage src={founder.photo} alt={`${founder.name}, career counsellor in ${location.city}`} sizes="150px" />
            ) : (
              <span aria-hidden>{initialsOf(founder.name)}</span>
            )}
          </div>
          <div className="about-name-big">{founder.name}</div>
          <div className="about-role-tag">{founder.role}</div>
          <div className="cred-list">
            {founder.credentials.map((cr, i) => (
              <div key={i} className="cred-row">
                <span className="cred-row-icon">{cr.icon}</span>
                <span>{cr.title} — {cr.detail}</span>
              </div>
            ))}
          </div>
          <BookingButton c={c} fallback={s.bookCta} className="btn btn-gold about-book-btn" />
        </aside>
        <div>
          {s.eyebrow && <span className="sh-eyebrow about-eyebrow">{s.eyebrow}</span>}
          <h2 className="about-h2"><Highlight text={s.title} className="" /></h2>
          {s.paragraphs.map((p, i) => <p key={i} className="about-p">{p}</p>)}
          {s.stats.length > 0 && (
            <div className="about-stats-row">
              {s.stats.map((st, i) => (
                <div key={i} className="about-stat"><div className="about-stat-n">{st.value}</div><div className="about-stat-l">{st.label}</div></div>
              ))}
            </div>
          )}
          {s.quote && (
            <blockquote className="philosophy-box">
              <p>&ldquo;{s.quote}&rdquo;</p>
              <cite>{s.quoteAttribution}</cite>
            </blockquote>
          )}
        </div>
      </div>
    </section>
  );
}

export function Assessments({ c }: P) {
  const s = c.sections.assessments;
  return (
    <section className="section section-navy" id="assessments">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} eyebrowClass="gold" />
        <div className="assess-feature">
          <div className="assess-left">
            <h3><Highlight text={s.featureTitle} className="" /></h3>
            <p>{s.featureDesc}</p>
            <div className="assess-cards-grid">
              {s.types.map((a, i) => (
                <div key={i} className="assess-card">
                  <div className="assess-card-icon">{a.icon}</div>
                  <div className="assess-card-title">{a.title}</div>
                  <div className="assess-card-sub">{a.sub}</div>
                </div>
              ))}
            </div>
            {s.ctaLabel && (
              <div className="assess-cta-row">
                <AssessmentCta
                  label={s.ctaLabel}
                  assessmentUrl={c.site.integrations.assessmentUrl}
                  copy={popupCopy(c, { kicker: "Career Assessment", title: "Tell Us a Little About You" })}
                  settings={leadFormSettings(c)}
                />
              </div>
            )}
          </div>
          <div>
            <div className="assess-flow-head">{s.flowTitle}</div>
            <ol className="assess-flow">
              {s.flow.map((f, i) => (
                <li key={i} className="assess-flow-step">
                  <span className="assess-flow-num">{i + 1}</span>
                  <span className="assess-flow-text"><b>{f.title}</b> — {f.desc}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ c }: P) {
  const s = c.sections.testimonials;
  return (
    <section className="section section-navy testimonials">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} eyebrowClass="gold" />
        <div className="testi-grid">
          {s.items.map((t, i) => (
            <figure key={i} className="testi-card">
              <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="testi-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <hr className="testi-divider" />
              <figcaption className="testi-author">
                <div className="testi-av" style={{ position: "relative", overflow: "hidden" }}>
                  {t.photo ? <ContentImage src={t.photo} alt={t.name} sizes="38px" /> : t.initials || initialsOf(t.name)}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                  {t.tag && <span className="testi-tag">{t.tag}</span>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog({ c }: P) {
  const s = c.sections.blog;
  return (
    <section className="section section-alt" id="blog">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
        <div className="blog-grid">
          {s.posts.map((b, i) => {
            const inner = (
              <>
                <div className="blog-img">
                  {b.image ? <ContentImage src={b.image} alt={b.title} sizes="(max-width: 768px) 100vw, 33vw" /> : <span aria-hidden>🌊</span>}
                  {b.category && <span className="blog-cat-tag">{b.category}</span>}
                </div>
                <div className="blog-body">
                  <h3 className="blog-title">{b.title}</h3>
                  <p className="blog-excerpt">{b.excerpt}</p>
                  <div className="blog-meta">
                    <span>{c.site.founder.name}</span>
                    {b.readTime && <><span className="blog-meta-dot" /><span>{b.readTime}</span></>}
                    {b.topic && <><span className="blog-meta-dot" /><span>{b.topic}</span></>}
                  </div>
                </div>
              </>
            );
            const cls = `blog-card${b.featured ? " featured" : ""}`;
            return b.href ? (
              <SmartLink key={i} href={b.href} site={c.site} className={cls}>{inner}</SmartLink>
            ) : (
              <article key={i} className={cls}>{inner}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Faq({ c }: P) {
  const s = c.sections.faq;
  return (
    <section className="section" id="faq">
      <div className="container">
        <Heading eyebrow={s.eyebrow} title={s.title} desc={s.desc} />
        <div className="faq-cols">
          {s.items.map((f, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta({ c }: P) {
  const s = c.sections.finalCta;
  return (
    <section className="final-cta" id="booking">
      <h2><Highlight text={s.title} className="" /></h2>
      <p>{s.desc}</p>
      <div className="final-cta-btns">
        {s.primaryCta.label && <SmartLink link={s.primaryCta} site={c.site} className="btn btn-gold btn-lg" />}
        {s.whatsappLabel && (
          <SmartLink href="whatsapp:" site={c.site} className="btn btn-whatsapp btn-lg">{s.whatsappLabel}</SmartLink>
        )}
        {s.secondaryCta.label && <SmartLink link={s.secondaryCta} site={c.site} className="btn btn-outline btn-lg" />}
      </div>
    </section>
  );
}
