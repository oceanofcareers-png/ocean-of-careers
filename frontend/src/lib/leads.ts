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

export type Appointment = {
  name: string;
  phone: string;
  iAm: string;
  message: string;
  /** `YYYY-MM-DD` from the date input. */
  date: string;
  slot: string;
};

/** Formats a `YYYY-MM-DD` date as e.g. "Mon, 24 Nov 2026" without timezone shifts. */
export function formatAppointmentDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

export function appointmentWhatsappUrl(appt: Appointment, brandName: string, whatsappNumber: string): string {
  const message = [
    `Hi ${brandName}, I'd like to book an appointment.`,
    `Name: ${appt.name}`,
    `Mobile: ${appt.phone}`,
    `I am a: ${appt.iAm}`,
    `Preferred date: ${formatAppointmentDate(appt.date)}`,
    `Preferred time: ${appt.slot}`,
    ...(appt.message ? [`Message: ${appt.message}`] : []),
  ].join("\n");
  return whatsappUrl(whatsappNumber, message);
}
