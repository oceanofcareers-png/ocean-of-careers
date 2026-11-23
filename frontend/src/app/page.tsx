import { getPublishedContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import { CredentialsBar, Hero, StatsBar, TopBar } from "@/components/TopSections";
import {
  About,
  Assessments,
  Audience,
  Blog,
  Faq,
  FinalCta,
  Problems,
  Process,
  Services,
  StudyAbroad,
  Testimonials,
} from "@/components/Sections";
import Footer from "@/components/Footer";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import { MobileStickyBar, WhatsAppFloat } from "@/components/FloatingCtas";
import JsonLd from "@/components/JsonLd";
import { Gate } from "@/components/primitives";
import { leadFormSettings, popupCopy } from "@/components/settings";
import type { SectionKey } from "@/content/types";

const SECTION_ORDER = [
  ["hero", Hero],
  ["credentials", CredentialsBar],
  ["stats", StatsBar],
  ["audience", Audience],
  ["problems", Problems],
  ["process", Process],
  ["services", Services],
  ["studyAbroad", StudyAbroad],
  ["about", About],
  ["assessments", Assessments],
  ["testimonials", Testimonials],
  ["blog", Blog],
  ["faq", Faq],
  ["finalCta", FinalCta],
] as const satisfies readonly (readonly [SectionKey, unknown])[];

export default async function Home() {
  const c = await getPublishedContent();
  const { sections, widgets } = c;

  return (
    <>
      <JsonLd c={c} />
      <div id="top" />
      <Gate status={sections.topBar.status}><TopBar c={c} /></Gate>
      <Navbar site={c.site} nav={sections.navbar} />
      <main>
        {SECTION_ORDER.map(([key, Section]) => (
          <Gate key={key} status={sections[key].status}>
            <Section c={c} />
          </Gate>
        ))}
      </main>
      <Footer c={c} />
      <Gate status={widgets.whatsappFloat.status}><WhatsAppFloat c={c} /></Gate>
      <Gate status={widgets.mobileStickyBar.status}><MobileStickyBar c={c} /></Gate>
      {widgets.exitIntentPopup.status === "active" && (
        <ExitIntentPopup copy={popupCopy(c)} settings={leadFormSettings(c)} />
      )}
    </>
  );
}
