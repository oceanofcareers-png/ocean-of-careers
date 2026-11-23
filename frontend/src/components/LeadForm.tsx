"use client";

import { useId, useState, type FormEvent } from "react";
import { submitLead, type Lead } from "@/lib/leads";
import type { SiteContent } from "@/content/types";

export type LeadFormSettings = SiteContent["leadForm"] & { brandName: string; whatsappNumber: string };

type Props = {
  variant: "dark" | "light";
  source: Lead["source"];
  submitLabel: string;
  privacyNote: string;
  settings: LeadFormSettings;
  onSubmitted?: () => void;
};

export default function LeadForm({ variant, source, submitLabel, privacyNote, settings, onSubmitted }: Props) {
  const id = useId();
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await submitLead(
      {
        name: String(data.get("name")).trim(),
        phone: String(data.get("phone")).trim(),
        iAm: String(data.get("iAm")),
        concern: String(data.get("concern")),
        source,
      },
      settings.brandName,
      settings.whatsappNumber,
    );
    setSent(true);
    onSubmitted?.();
  }

  if (sent) {
    return (
      <div className={`lead-form ${variant}`}>
        <p className="lead-success">{settings.successMessage}</p>
      </div>
    );
  }

  return (
    <form className={`lead-form ${variant}`} onSubmit={handleSubmit}>
      <label htmlFor={`${id}-name`}>Your Name</label>
      <input id={`${id}-name`} name="name" type="text" autoComplete="name" required />

      <label htmlFor={`${id}-phone`}>WhatsApp Number</label>
      <input
        id={`${id}-phone`}
        name="phone"
        type="tel"
        autoComplete="tel"
        inputMode="tel"
        pattern="[+0-9 \-]{10,15}"
        title="Enter a valid phone number"
        required
      />

      <label htmlFor={`${id}-iam`}>I am a...</label>
      <select id={`${id}-iam`} name="iAm" required defaultValue="">
        <option value="" disabled>Select one</option>
        {settings.iAmOptions.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>

      <label htmlFor={`${id}-concern`}>My main concern is...</label>
      <select id={`${id}-concern`} name="concern" required defaultValue="">
        <option value="" disabled>Select one</option>
        {settings.concernOptions.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>

      <button type="submit" className="btn btn-gold lead-submit">{submitLabel}</button>
      <p className="lead-privacy">{privacyNote}</p>
    </form>
  );
}
