import type { SiteContent } from "@/content/types";
import type { LeadFormSettings } from "./LeadForm";
import type { PopupCopy } from "./LeadPopup";

export function leadFormSettings(c: SiteContent): LeadFormSettings {
  return { ...c.leadForm, brandName: c.site.brand.name, whatsappNumber: c.site.contact.whatsappRaw };
}

export function popupCopy(c: SiteContent, overrides?: Partial<PopupCopy>): PopupCopy {
  const w = c.widgets.exitIntentPopup;
  return {
    kicker: w.kicker,
    title: w.title,
    sub: w.sub,
    founderName: c.site.founder.name,
    whatsappMessage: c.site.contact.whatsappDefaultMessage,
    ...overrides,
  };
}
