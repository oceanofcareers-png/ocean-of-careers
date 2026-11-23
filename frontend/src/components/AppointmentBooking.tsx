"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import type { Widgets } from "@/content/types";
import { appointmentWhatsappUrl, type Appointment } from "@/lib/leads";

type Copy = Widgets["appointmentBooking"];

type Props = {
  copy: Copy;
  /** Button text; defaults to the widget's hero button label. */
  label?: string;
  iAmOptions: string[];
  brandName: string;
  whatsappNumber: string;
  className?: string;
};

type Step = 1 | 2 | 3;

const EMPTY: Appointment = { name: "", phone: "", iAm: "", message: "", date: "", slot: "" };

/** Local `YYYY-MM-DD`, `days` from today. */
function isoDate(days = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Button that opens a two-step booking modal and hands the request off to WhatsApp. */
export default function AppointmentBooking({ copy, label, iAmOptions, brandName, whatsappNumber, className }: Props) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [appt, setAppt] = useState<Appointment>(EMPTY);
  const [waUrl, setWaUrl] = useState("");
  // Computed on open (not during render) so the static page never bakes in a stale "today".
  const [today, setToday] = useState({ date: "", hour: 0 });

  const set = (field: keyof Appointment) => (e: { target: { value: string } }) =>
    setAppt((a) => ({ ...a, [field]: e.target.value }));

  function openModal() {
    setToday({ date: isoDate(), hour: new Date().getHours() });
    setStep(1);
    setAppt((a) => ({ ...a, date: "", slot: "" }));
    setOpen(true);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const slotLabel = (s: Copy["slots"][number]) => [s.label, s.time && `(${s.time})`].filter(Boolean).join(" ");
  const slotPassed = (s: Copy["slots"][number]) => appt.date === today.date && today.hour >= s.endHour;

  function pickDate(date: string) {
    setAppt((a) => {
      const current = copy.slots.find((s) => slotLabel(s) === a.slot);
      const stillValid = current && !(date === today.date && today.hour >= current.endHour);
      return { ...a, date, slot: stillValid ? a.slot : "" };
    });
  }

  function next(e: FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function book(e: FormEvent) {
    e.preventDefault();
    const url = appointmentWhatsappUrl(
      { ...appt, name: appt.name.trim(), phone: appt.phone.trim(), message: appt.message.trim() },
      brandName,
      whatsappNumber,
    );
    window.open(url, "_blank", "noopener,noreferrer");
    setWaUrl(url);
    setStep(3);
    setAppt(EMPTY);
  }

  const steps = [copy.detailsStepLabel, copy.scheduleStepLabel];
  const todayAllPassed = copy.slots.length > 0 && copy.slots.every((s) => today.hour >= s.endHour);
  const minDate = todayAllPassed ? isoDate(1) : today.date;

  return (
    <>
      <button type="button" className={className ?? "btn btn-gold btn-lg"} onClick={openModal}>
        {label || copy.buttonLabel}
      </button>

      {/* Portalled so the modal doesn't inherit styles from whichever section hosts the button. */}
      {open && createPortal(
        <div className="popup-overlay" onClick={() => setOpen(false)}>
          <div
            className="popup-box appt-box"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="popup-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
            {copy.kicker && <div className="popup-kicker">{copy.kicker}</div>}
            <h2 className="popup-title" id={`${id}-title`}>{copy.title}</h2>
            {copy.sub && <p className="popup-sub">{copy.sub}</p>}

            <ol className="appt-stepper" aria-label="Booking steps">
              {steps.map((label, i) => {
                const n = i + 1;
                const state = step > n ? "done" : step === n ? "current" : "todo";
                return (
                  <li key={n} className={`appt-step ${state}`} aria-current={state === "current" ? "step" : undefined}>
                    <span className="appt-step-num">{state === "done" ? "✓" : n}</span>
                    <span className="appt-step-label">{label}</span>
                  </li>
                );
              })}
            </ol>

            {step === 1 && (
              <form className="lead-form light" onSubmit={next}>
                <label htmlFor={`${id}-name`}>Your Name</label>
                <input id={`${id}-name`} type="text" autoComplete="name" required autoFocus value={appt.name} onChange={set("name")} />

                <label htmlFor={`${id}-phone`}>Mobile Number</label>
                <input
                  id={`${id}-phone`}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[+0-9 \-]{10,15}"
                  title="Enter a valid phone number"
                  required
                  value={appt.phone}
                  onChange={set("phone")}
                />

                <label htmlFor={`${id}-iam`}>I am a...</label>
                <select id={`${id}-iam`} required value={appt.iAm} onChange={set("iAm")}>
                  <option value="" disabled>Select one</option>
                  {iAmOptions.map((o) => <option key={o}>{o}</option>)}
                </select>

                <label htmlFor={`${id}-msg`}>Message</label>
                <textarea id={`${id}-msg`} rows={3} maxLength={500} placeholder={copy.messagePlaceholder} value={appt.message} onChange={set("message")} />

                <button type="submit" className="btn btn-gold lead-submit">{copy.nextLabel}</button>
              </form>
            )}

            {step === 2 && (
              <form className="lead-form light" onSubmit={book}>
                <label htmlFor={`${id}-date`}>Preferred Date</label>
                <input
                  id={`${id}-date`}
                  type="date"
                  required
                  autoFocus
                  min={minDate}
                  max={isoDate(Math.max(1, copy.daysAhead) - 1)}
                  value={appt.date}
                  onChange={(e) => pickDate(e.target.value)}
                />

                <fieldset className="appt-slots">
                  <legend>Preferred Time</legend>
                  <div className="appt-pills">
                    {copy.slots.map((s) => {
                      const value = slotLabel(s);
                      const passed = slotPassed(s);
                      return (
                        <label key={value} className={`appt-pill${passed ? " passed" : ""}`}>
                          <input
                            type="radio"
                            name={`${id}-slot`}
                            value={value}
                            required
                            disabled={passed}
                            checked={appt.slot === value}
                            onChange={() => setAppt((a) => ({ ...a, slot: value }))}
                          />
                          <span className="appt-pill-label">{s.label}</span>
                          {s.time && <span className="appt-pill-time">{s.time}</span>}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="appt-actions">
                  <button type="button" className="btn appt-back" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="btn btn-gold lead-submit">{copy.submitLabel}</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="lead-form light">
                <p className="lead-success">{copy.successMessage}</p>
                <a className="btn btn-whatsapp popup-wa" href={waUrl} target="_blank" rel="noopener noreferrer">
                  💬 WhatsApp didn&apos;t open? Tap here
                </a>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
