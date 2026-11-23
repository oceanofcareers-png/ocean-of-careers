import type { SiteContent } from "@/content/types";
import { SmartLink } from "./primitives";
import WhatsAppIcon, { withoutChatEmoji } from "./WhatsAppIcon";

export function WhatsAppFloat({ c }: { c: SiteContent }) {
  return (
    <SmartLink href="whatsapp:" site={c.site} className="wa-float">
      <WhatsAppIcon size={30} className="wa-icon" />
      <span className="wa-label">{withoutChatEmoji(c.widgets.whatsappFloat.label)}</span>
    </SmartLink>
  );
}

/** Mobile-only bottom bar (replaces popups on mobile, per the wireframe). */
export function MobileStickyBar({ c }: { c: SiteContent }) {
  const w = c.widgets.mobileStickyBar;
  return (
    <div className="mobile-sticky">
      <a href="#book" className="btn btn-gold">{w.bookLabel}</a>
      <SmartLink href="whatsapp:" site={c.site} className="btn btn-whatsapp">
        <WhatsAppIcon size={18} /> {withoutChatEmoji(w.whatsappLabel)}
      </SmartLink>
    </div>
  );
}
