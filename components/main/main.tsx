"use client";
import { Navigation } from "../layouts/navigation";
import TruckHeroSection from "../sections/truck-hero-section";
import PackagesSection from "../sections/packages-section";
import { FeedbackSection } from "../sections/feedback-section";
import ContactSection from "../sections/contact-section";
import { Footer } from "../layouts/footer";
import { getContent, Lang } from "@/constants/i18n";

export default function MainPage({ lang = "en" as Lang }: { lang?: Lang }) {
  const content = getContent(lang);
  return (
    <main className="min-h-screen">
      <Navigation nav={content.navigation} />
      <TruckHeroSection bgImages={content.hero.bgImages} />
      <PackagesSection packages={content.section.packagesSection} />
      <FeedbackSection feedback={content.section.feedbackSection} />
      <ContactSection contact={content.section.contactSection as any} />
      <Footer footer={content.section.footerSection} />
    </main>
  );
}
