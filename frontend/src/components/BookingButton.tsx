import type { Link, SiteContent } from "@/content/types";
import AppointmentBooking from "./AppointmentBooking";
import { Gate, SmartLink } from "./primitives";

type Props = {
  c: SiteContent;
  /** The section's own button; its label is kept, and it is used as-is when booking is hidden. */
  fallback: Link;
  className: string;
  /** Use the booking widget's button text instead of the fallback's. */
  useWidgetLabel?: boolean;
};

/** A booking button that follows the "Book a Session" flag: active/disabled → modal, hidden → plain link. */
export default function BookingButton({ c, fallback, className, useWidgetLabel }: Props) {
  const booking = c.widgets.appointmentBooking;
  if (booking.status === "hidden") {
    return fallback.label ? <SmartLink link={fallback} site={c.site} className={className} /> : null;
  }
  return (
    <Gate status={booking.status}>
      <AppointmentBooking
        copy={booking}
        label={useWidgetLabel ? undefined : fallback.label}
        iAmOptions={c.leadForm.iAmOptions}
        brandName={c.site.brand.name}
        whatsappNumber={c.site.contact.whatsappRaw}
        className={className}
      />
    </Gate>
  );
}
