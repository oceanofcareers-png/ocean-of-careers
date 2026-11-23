import { whatsappLink } from "@/config";

export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
      <span className="wa-pulse" /> 💬 Chat on WhatsApp
    </a>
  );
}

/** Mobile-only bottom bar (replaces popups on mobile, per the wireframe). */
export function MobileStickyBar() {
  return (
    <div className="mobile-sticky">
      <a href="#book" className="btn btn-gold">📅 Book Free Call</a>
      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">💬 WhatsApp</a>
    </div>
  );
}
