import { siteConfig, whatsappLink } from "@/config";

export type Lead = {
  name: string;
  phone: string;
  iAm: string;
  concern: string;
  source: "hero" | "exit-popup" | "assessment";
};

/**
 * Static-site lead handling: hands the enquiry off to WhatsApp with a
 * pre-filled message. Swap this for a POST to the Express backend later —
 * callers only depend on this function.
 */
export async function submitLead(lead: Lead): Promise<void> {
  const message = [
    `Hi ${siteConfig.brand.name}, I'd like a free 15-minute guidance call.`,
    `Name: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    `I am a: ${lead.iAm}`,
    `Main concern: ${lead.concern}`,
  ].join("\n");

  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}
