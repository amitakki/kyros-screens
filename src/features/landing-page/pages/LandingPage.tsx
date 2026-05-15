import { useState } from "react";
import { useIsMobile } from "../../../shared/hooks/useIsMobile";
import { FaqSection } from "../components/FaqSection";
import { FeatureSpotlightSection } from "../components/FeatureSpotlightSection";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { LandingFooter } from "../components/LandingFooter";
import { LandingHeader } from "../components/LandingHeader";
import { OutcomesStripSection } from "../components/OutcomesStripSection";
import { PathVisualization } from "../components/PathVisualization";
import { PricingSection } from "../components/PricingSection";
import { SchoolsSection } from "../components/SchoolsSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { TryAQuestionSection } from "../components/TryAQuestionSection";
import { WhoIsItForSection } from "../components/WhoIsItForSection";
import { landingPageContent } from "../content";

export function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const {
    faqItems,
    faqSection,
    featureSpotlight,
    footer,
    header,
    hero,
    howItWorks,
    outcomesStrip,
    pathVisualization,
    pricing,
    schools,
    schoolsSection,
    testimonials,
    tryAQuestion,
    whoIsItFor,
  } = landingPageContent;

  return (
    <div className="min-h-screen bg-surface-subtle">
      <LandingHeader
        isMobile={isMobile}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen(!menuOpen)}
        onCloseMenu={() => setMenuOpen(false)}
        brandName={header.brandName}
        loginLabel={header.loginLabel}
        startTrialLabel={header.startTrialLabel}
        logoLabel={header.logoLabel}
        navItems={header.navItems}
      />

      <HeroSection
        isMobile={isMobile}
        content={hero}
        visual={<PathVisualization content={pathVisualization} />}
      />

      <OutcomesStripSection
        isMobile={isMobile}
        stats={outcomesStrip.stats}
        footnote={outcomesStrip.footnote}
      />

      <WhoIsItForSection isMobile={isMobile} content={whoIsItFor} />

      <SchoolsSection isMobile={isMobile} schools={schools} content={schoolsSection} />

      <HowItWorksSection
        isMobile={isMobile}
        content={howItWorks}
      />

      <FeatureSpotlightSection
        isMobile={isMobile}
        content={featureSpotlight}
      />

      <TryAQuestionSection isMobile={isMobile} content={tryAQuestion} />

      <TestimonialsSection isMobile={isMobile} content={testimonials} />

      <FaqSection
        isMobile={isMobile}
        items={faqItems}
        openFaq={openFaq}
        onToggleFaq={(index) =>
          setOpenFaq(openFaq === index ? null : index)
        }
        title={faqSection.title}
        moreQuestionsLabel={faqSection.moreQuestionsLabel}
        helpCenterLabel={faqSection.helpCenterLabel}
        helpCenterHref={faqSection.helpCenterHref}
      />

      <PricingSection isMobile={isMobile} content={pricing} />
      <LandingFooter isMobile={isMobile} content={footer} />
    </div>
  );
}




