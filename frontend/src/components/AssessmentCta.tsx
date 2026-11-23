"use client";

import { useCallback, useState } from "react";
import { siteConfig } from "@/config";
import LeadPopup from "./LeadPopup";

/** Opens the lead popup, then redirects to the assessment portal if one is configured. */
export default function AssessmentCta() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { assessmentUrl } = siteConfig.integrations;

  const handleSubmitted = useCallback(() => {
    if (assessmentUrl) window.location.href = assessmentUrl;
  }, [assessmentUrl]);

  return (
    <>
      <button className="btn btn-gold btn-md" onClick={() => setOpen(true)}>
        Take Career Assessment →
      </button>
      <LeadPopup
        open={open}
        onClose={close}
        source="assessment"
        kicker="Career Assessment"
        title="Tell Us a Little About You"
        onSubmitted={handleSubmitted}
      />
    </>
  );
}
