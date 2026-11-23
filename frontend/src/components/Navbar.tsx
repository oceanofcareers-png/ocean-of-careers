"use client";

import { useEffect, useState } from "react";
import { siteConfig, telLink } from "@/config";
import { navLinks } from "@/content/home";
import Logo from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);
  const links = navLinks.filter((l) => !l.flag || siteConfig.features[l.flag]);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} aria-label="Main">
      <div className="container navbar-inner">
        <a href="#top" className="nav-brand" onClick={close}>
          <Logo />
          <div>
            <div className="nav-brand-name">{siteConfig.brand.name}</div>
            <div className="nav-brand-sub">{siteConfig.brand.tagline}</div>
          </div>
        </a>

        <div className="nav-menu">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-item">{l.label}</a>
          ))}
          <a href="#book" className="btn btn-gold nav-book">📅 Book Free Call</a>
        </div>

        <div className="nav-actions-mobile">
          <a href={telLink()} className="nav-icon-btn" aria-label={`Call ${siteConfig.contact.phoneDisplay}`}>📞</a>
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
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
          ))}
          <a href="#book" className="btn btn-gold btn-md" onClick={close}>📅 Book Free Call</a>
        </div>
      )}
    </nav>
  );
}
