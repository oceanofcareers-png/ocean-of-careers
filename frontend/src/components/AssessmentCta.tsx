"use client";

import { useCallback, useState } from "react";
import LeadPopup, { type PopupCopy } from "./LeadPopup";
import type { LeadFormSettings } from "./LeadForm";

type Props = { label: string; assessmentUrl: string; copy: PopupCopy; settings: LeadFormSettings };

/** Opens the lead popup, then redirects to the assessment portal if one is configured. */
export default function AssessmentCta({ label, assessmentUrl, copy, settings }: Props) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const handleSubmitted = useCallback(() => {
    if (/^https?:\/\//i.test(assessmentUrl)) window.location.href = assessmentUrl;
  }, [assessmentUrl]);

  return (
    <>
      <button className="btn btn-gold btn-md" onClick={() => setOpen(true)}>
        {label}
      </button>
      <LeadPopup
        open={open}
        onClose={close}
        source="assessment"
        copy={copy}
        settings={settings}
        onSubmitted={handleSubmitted}
      />
    </>
  );
}
