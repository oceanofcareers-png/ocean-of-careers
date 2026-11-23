import { whatsappUrl } from "@/content/resolve";

export type Lead = {
  name: string;
  phone: string;
  iAm: string;
  concern: string;
  source: "hero" | "exit-popup" | "assessment";
};

/**
 * Static-site lead handling: hands the enquiry off to WhatsApp with a
 * pre-filled message. Swap this for a POST to a backend later —
 * callers only depend on this function.
 */
export async function submitLead(lead: Lead, brandName: string, whatsappNumber: string): Promise<void> {
  const message = [
    `Hi ${brandName}, I'd like a free 15-minute guidance call.`,
    `Name: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    `I am a: ${lead.iAm}`,
    `Main concern: ${lead.concern}`,
  ].join("\n");

  window.open(whatsappUrl(whatsappNumber, message), "_blank", "noopener,noreferrer");
}
