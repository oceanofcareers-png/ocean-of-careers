"use client";

import { useEffect, useState } from "react";
import type { Sections, SiteInfo } from "@/content/types";
import { SmartLink } from "./primitives";
import Logo from "./Logo";

export default function Navbar({ site, nav }: { site: SiteInfo; nav: Sections["navbar"] }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Main">
      <div className="container navbar-inner">
        <a href="#top" className="nav-brand" onClick={close}>
          <Logo src={site.brand.logo} name={site.brand.name} />
          <div>
            <div className="nav-brand-name">{site.brand.name}</div>
            <div className="nav-brand-sub">{site.brand.tagline}</div>
          </div>
        </a>

        <div className="nav-menu">
          {nav.links.map((l, i) => (
            <SmartLink key={i} link={l} site={site} className="nav-item" />
          ))}
          <SmartLink link={nav.bookCta} site={site} className="btn btn-gold nav-book" />
        </div>

        <div className="nav-actions-mobile">
          <a href={`tel:+${site.contact.phoneRaw}`} className="nav-icon-btn" aria-label={`Call ${site.contact.phoneDisplay}`}>
            📞
          </a>
          <button
            className="nav-icon-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="nav-drawer">
          {nav.links.map((l, i) => (
            <SmartLink key={i} link={l} site={site} onClick={close} />
          ))}
          <SmartLink link={nav.bookCta} site={site} className="btn btn-gold btn-md" onClick={close} />
        </div>
      )}
    </nav>
  );
}
