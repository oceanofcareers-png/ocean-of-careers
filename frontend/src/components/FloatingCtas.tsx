import type { SiteContent } from "@/content/types";
import { SmartLink } from "./primitives";

export function WhatsAppFloat({ c }: { c: SiteContent }) {
  return (
    <SmartLink href="whatsapp:" site={c.site} className="wa-float">
      <span className="wa-pulse" /> {c.widgets.whatsappFloat.label}
    </SmartLink>
  );
}

/** Mobile-only bottom bar (replaces popups on mobile, per the wireframe). */
export function MobileStickyBar({ c }: { c: SiteContent }) {
  const w = c.widgets.mobileStickyBar;
  return (
    <div className="mobile-sticky">
      <a href="#book" className="btn btn-gold">{w.bookLabel}</a>
      <SmartLink href="whatsapp:" site={c.site} className="btn btn-whatsapp">{w.whatsappLabel}</SmartLink>
    </div>
  );
}
