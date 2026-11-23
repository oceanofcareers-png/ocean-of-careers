"use client";

import { useCallback, useEffect, useState } from "react";
import LeadPopup, { type PopupCopy } from "./LeadPopup";
import type { LeadFormSettings } from "./LeadForm";

const STORAGE_KEY = "ooc-exit-popup-shown";

/** Desktop-only exit-intent popup, shown at most once per session. */
export default function ExitIntentPopup({ copy, settings }: { copy: PopupCopy; settings: LeadFormSettings }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 769px) and (pointer: fine)").matches;
    if (!isDesktop) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {}

    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || e.relatedTarget) return;
      setOpen(true);
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      document.removeEventListener("mouseout", onLeave);
    };
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return <LeadPopup open={open} onClose={close} source="exit-popup" copy={copy} settings={settings} />;
}
