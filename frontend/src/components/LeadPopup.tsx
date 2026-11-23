"use client";

import { useEffect } from "react";
import { whatsappUrl } from "@/content/resolve";
import LeadForm, { type LeadFormSettings } from "./LeadForm";
import type { Lead } from "@/lib/leads";

export type PopupCopy = { kicker: string; title: string; sub: string; founderName: string; whatsappMessage: string };

type Props = {
  open: boolean;
  onClose: () => void;
  source: Lead["source"];
  copy: PopupCopy;
  settings: LeadFormSettings;
  onSubmitted?: () => void;
};

export default function LeadPopup({ open, onClose, source, copy, settings, onSubmitted }: Props) {
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
        <div className="popup-kicker">{copy.kicker}</div>
        <h2 className="popup-title" id="popup-title">{copy.title}</h2>
        <p className="popup-sub">{copy.sub}</p>
        <LeadForm
          variant="light"
          source={source}
          submitLabel="Get My Free Call →"
          privacyNote={`🔒 100% Confidential · Guided by ${copy.founderName} personally`}
          settings={settings}
          onSubmitted={onSubmitted}
        />
        <a
          className="btn btn-whatsapp popup-wa"
          href={whatsappUrl(settings.whatsappNumber, copy.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
        >
          💬 Or WhatsApp Us Directly
        </a>
      </div>
    </div>
  );
}
