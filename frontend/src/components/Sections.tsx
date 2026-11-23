import Image from "next/image";
import { siteConfig, whatsappLink } from "@/config";
import {
  aboutParagraphs,
  assessmentFlow,
  assessmentTypes,
  audiences,
  blogPosts,
  faqs,
  founderQuote,
  problems,
  processSteps,
  services,
  studyAbroadCountries,
  testimonials,
} from "@/content/home";
import AssessmentCta from "./AssessmentCta";

const { founder, stats, location } = siteConfig;

export function Audience() {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="sh" style={{ marginBottom: 28 }}>
          <span className="sh-eyebrow">Who We Help</span>
          <h2 className="sh-title">Guidance Designed for <span className="gold">Every Stage</span> of Your Journey</h2>
        </div>
        <div className="audience-grid">
          {audiences.map((a) => (
            <a key={a.title} href="#book" className={`audience-card${a.popular ? " popular" : ""}`}>
              {a.popular && <span className="audience-badge">MOST POPULAR</span>}
              <div className="audience-icon">{a.icon}</div>
              <h3 className="audience-title">{a.title}</h3>
              <p className="audience-desc">{a.desc}</p>
              <span className="btn btn-gold btn-sm">Get Guidance →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Problems() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow navy">Sound Familiar?</span>
          <h2 className="sh-title">Feeling <span className="gold">Confused</span> About the Right Career Choice?</h2>
          <p className="sh-desc">You&apos;re not alone. These are the most common questions parents and students bring to us every day.</p>
        </div>
        <div className="problem-grid">
          {problems.map((p) => (
            <div key={p.text} className="prob-card">
              <span className="prob-icon">{p.icon}</span>
              <p className="prob-text">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="problem-cta">
          <p>You don&apos;t need more opinions.<br /><span>You need the right professional guidance.</span></p>
          <a href="#book" className="btn btn-gold btn-md">Book Your Free 15-Min Call →</a>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow">Our Process</span>
          <h2 className="sh-title">Your <span className="gold">Career Clarity</span> Journey — 6 Simple Steps</h2>
          <p className="sh-desc">A structured, science-backed process — from first conversation to your complete career roadmap.</p>
        </div>
        <ol className="steps-track">
          {processSteps.map((s, i) => (
            <li key={s.title} className="step-node">
              <div className="step-circle"><span className="s-num">{i + 1}</span><span className="s-icon">{s.icon}</span></div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-desc">{s.desc}</p>
              {"free" in s && s.free && <span className="badge-free">FREE</span>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="section section-alt" id="services">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow">What We Offer</span>
          <h2 className="sh-title">Expert Guidance for <span className="gold">Every Stage</span> of Your Journey</h2>
          <p className="sh-desc">From stream selection to study abroad direction — one trusted place for your career decisions.</p>
        </div>
        <div className="services-grid">
          {services
            .filter((s) => siteConfig.features.studyAbroad || s.theme !== "gold")
            .map((s) => (
              <article key={s.title} className="svc-card">
                <div className={`svc-header svc-${s.theme}`}>
                  <div className="svc-icon-wrap">{s.icon}</div>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-sub">{s.sub}</p>
                </div>
                <div className="svc-body">
                  <ul className="svc-list">
                    {s.points.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
                <div className="svc-footer"><a href="#book" className="svc-link">{s.cta}</a></div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export function StudyAbroad() {
  return (
    <section className="section section-tight" id="study-abroad">
      <div className="container">
        <div className="abroad-strip">
          <div>
            <span className="sh-eyebrow gold">Study Abroad Guidance</span>
            <h2>Thinking of Studying <span>Abroad?</span></h2>
            <p>Get honest guidance on the right country, course and university for your profile before you commit time and money.</p>
            <div className="abroad-pills">
              {studyAbroadCountries.map((c) => <span key={c} className="abroad-pill">{c}</span>)}
            </div>
          </div>
          <a
            href={whatsappLink(`Hi ${founder.firstName}, I'd like guidance on studying abroad.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-md"
          >
            Talk to {founder.firstName} About Study Abroad →
          </a>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const initials = founder.name.split(" ").map((w) => w[0]).join("");
  return (
    <section className="section section-alt" id="about">
      <div className="container about-grid">
        <aside className="about-photo-card">
          <div className="about-photo-frame">
            {founder.photo ? (
              <Image src={founder.photo} alt={`${founder.name}, career counsellor in ${location.city}`} fill sizes="150px" style={{ objectFit: "cover" }} />
            ) : (
              <span aria-hidden>{initials}</span>
            )}
          </div>
          <div className="about-name-big">{founder.name}</div>
          <div className="about-role-tag">{founder.role}</div>
          <div className="cred-list">
            {founder.credentials.map((c) => (
              <div key={c.title} className="cred-row">
                <span className="cred-row-icon">{c.icon}</span>
                <span>{c.title} — {c.detail}</span>
              </div>
            ))}
          </div>
          <a href="#book" className="btn btn-gold about-book-btn">Book a Session with {founder.firstName} →</a>
        </aside>
        <div>
          <span className="sh-eyebrow about-eyebrow">Meet Your Counsellor</span>
          <h2 className="about-h2">{founder.headlineCredential} — Where <span>Psychology Meets Purpose</span></h2>
          {aboutParagraphs.map((p) => <p key={p.slice(0, 24)} className="about-p">{p}</p>)}
          <div className="about-stats-row">
            <div className="about-stat"><div className="about-stat-n">{stats.studentsGuided}+</div><div className="about-stat-l">Students Guided</div></div>
            <div className="about-stat"><div className="about-stat-n">{stats.yearsExperience}+</div><div className="about-stat-l">Years Experience</div></div>
            <div className="about-stat"><div className="about-stat-n">{stats.statesServed}</div><div className="about-stat-l">States Served</div></div>
          </div>
          <blockquote className="philosophy-box">
            <p>&ldquo;{founderQuote}&rdquo;</p>
            <cite>— {founder.name}, Founder, {siteConfig.brand.name}</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export function Assessments() {
  return (
    <section className="section section-navy" id="assessments">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow gold">Career Assessments</span>
          <h2 className="sh-title">Stop Guessing. Let <span className="gold">Science</span> Guide Your Career.</h2>
          <p className="sh-desc">Our scientifically validated psychometric assessments remove the guesswork from career decisions. Backed by psychology, powered by data.</p>
        </div>
        <div className="assess-feature">
          <div className="assess-left">
            <h3>What Our <span>Assessments</span> Reveal About You</h3>
            <p>Most career advice is based on opinions. Ours is based on validated psychological science — measuring what you&apos;re naturally good at, how your mind works, and what environments help you thrive.</p>
            <div className="assess-cards-grid">
              {assessmentTypes.map((a) => (
                <div key={a.title} className="assess-card">
                  <div className="assess-card-icon">{a.icon}</div>
                  <div className="assess-card-title">{a.title}</div>
                  <div className="assess-card-sub">{a.sub}</div>
                </div>
              ))}
            </div>
            <div className="assess-cta-row"><AssessmentCta /></div>
          </div>
          <div>
            <div className="assess-flow-head">How It Works</div>
            <ol className="assess-flow">
              {assessmentFlow.map((f, i) => (
                <li key={f.title} className="assess-flow-step">
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

export function Testimonials() {
  return (
    <section className="section section-navy" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow gold">Success Stories</span>
          <h2 className="sh-title">Real Students. Real Families. <span className="gold">Real Transformations.</span></h2>
          <p className="sh-desc">From {location.city} and across India — students who found their direction with {siteConfig.brand.name}.</p>
        </div>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <figure key={t.name} className="testi-card">
              <div className="testi-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote className="testi-quote">&ldquo;{t.quote}&rdquo;</blockquote>
              <hr className="testi-divider" />
              <figcaption className="testi-author">
                <div className="testi-av">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                  <span className="testi-tag">{t.tag}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Blog() {
  return (
    <section className="section section-alt" id="blog">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow">Career Insights</span>
          <h2 className="sh-title">Expert Advice from the <span className="gold">Career Guidance Blog</span></h2>
          <p className="sh-desc">Practical, honest career articles written by {founder.name} — covering careers, study abroad, exams and professional growth.</p>
        </div>
        <div className="blog-grid">
          {blogPosts.map((b) => (
            <article key={b.title} className={`blog-card${b.featured ? " featured" : ""}`}>
              <div className="blog-img"><span className="blog-cat-tag">{b.category}</span><span aria-hidden>🌊</span></div>
              <div className="blog-body">
                <h3 className="blog-title">{b.title}</h3>
                <p className="blog-excerpt">{b.excerpt}</p>
                <div className="blog-meta">
                  <span>{founder.name}</span><span className="blog-meta-dot" /><span>{b.readTime}</span>
                  {b.topic && <><span className="blog-meta-dot" /><span>{b.topic}</span></>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="sh">
          <span className="sh-eyebrow">FAQ</span>
          <h2 className="sh-title">Questions <span className="gold">Parents &amp; Students</span> Ask Us Most</h2>
        </div>
        <div className="faq-cols">
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary className="faq-q">{f.q}</summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta" id="booking">
      <h2>Your Future Deserves the <span>Right Guidance.</span></h2>
      <p>Helping students, graduates and professionals make confident career decisions — with clarity, structure and expert support.</p>
      <div className="final-cta-btns">
        <a href="#book" className="btn btn-gold btn-lg">📅 Book Free Guidance Call</a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-lg">💬 WhatsApp Us Now</a>
        {siteConfig.features.studyAbroad && (
          <a
            href={whatsappLink(`Hi ${founder.firstName}, I have a study abroad enquiry.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            ✈ Study Abroad Enquiry
          </a>
        )}
      </div>
    </section>
  );
}
