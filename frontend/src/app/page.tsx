import { siteConfig } from "@/config";
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

export default function Home() {
  const f = siteConfig.features;

  return (
    <>
      <JsonLd />
      <div id="top" />
      {f.topBar && <TopBar />}
      <Navbar />
      <main>
        <Hero />
        <CredentialsBar />
        <StatsBar />
        {f.audienceSection && <Audience />}
        {f.problemSection && <Problems />}
        {f.processSection && <Process />}
        {f.servicesSection && <Services />}
        {f.studyAbroad && <StudyAbroad />}
        {f.aboutSection && <About />}
        {f.assessments && <Assessments />}
        {f.testimonials && <Testimonials />}
        {f.blog && <Blog />}
        {f.faq && <Faq />}
        <FinalCta />
      </main>
      <Footer />
      {f.whatsappFloat && <WhatsAppFloat />}
      {f.mobileStickyBar && <MobileStickyBar />}
      {f.exitIntentPopup && <ExitIntentPopup />}
    </>
  );
}
