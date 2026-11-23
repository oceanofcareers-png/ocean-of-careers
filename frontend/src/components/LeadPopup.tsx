"use client";

import { useEffect } from "react";
import { siteConfig, whatsappLink } from "@/config";
import LeadForm from "./LeadForm";
import type { Lead } from "@/lib/leads";

type Props = {
  open: boolean;
  onClose: () => void;
  source: Lead["source"];
  kicker?: string;
  title?: string;
  onSubmitted?: () => void;
};

export default function LeadPopup({
  open,
  onClose,
  source,
  kicker = "FREE Career Guidance",
  title = "Get Your Free 15-Min Career Clarity Call",
  onSubmitted,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose} aria-label="Close">×</button>
        <div className="popup-kicker">{kicker}</div>
        <h2 className="popup-title" id="popup-title">{title}</h2>
        <p className="popup-sub">Zero cost · No spam · Instant WhatsApp confirmation</p>
        <LeadForm
          variant="light"
          source={source}
          submitLabel="Get My Free Call →"
          privacyNote={`🔒 100% Confidential · Guided by ${siteConfig.founder.name} personally`}
          onSubmitted={onSubmitted}
        />
        <a className="btn btn-whatsapp popup-wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          💬 Or WhatsApp Us Directly
        </a>
      </div>
    </div>
  );
}
