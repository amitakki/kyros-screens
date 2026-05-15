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
import { SchoolTickerSection } from "../components/SchoolTickerSection";
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
    schoolTicker,
    schools,
    testimonials,
    tryAQuestion,
    whoIsItFor,
  } = landingPageContent;
  const tickerItems = [...schools, ...schools];


  return (
    <div
      className="min-h-screen bg-surface-subtle"
    >
      {/* ─── Ticker keyframes ─── */}
      <style>{`
        @keyframes kyrosTickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .kyros-ticker-track { display: flex; animation: kyrosTickerScroll 36s linear infinite; will-change: transform; }
        .kyros-ticker-track:hover { animation-play-state: paused; }
      `}</style>

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

      <SchoolTickerSection
        schools={schools}
        tickerItems={tickerItems}
        prefix={schoolTicker.prefix}
        suffix={schoolTicker.suffix}
      />

      <OutcomesStripSection
        isMobile={isMobile}
        stats={outcomesStrip.stats}
        footnote={outcomesStrip.footnote}
      />

      <WhoIsItForSection isMobile={isMobile} content={whoIsItFor} />

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




