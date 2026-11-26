import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { ImpactStatement } from '../components/ImpactStatement';
import { HowItWorks } from '../components/HowItWorks';
import { FeaturesSection } from '../components/FeaturesSection';
import { AudienceSection } from '../components/AudienceSection';
import { ClosingCTA } from '../components/ClosingCTA';

interface LandingPageProps {
  onNavigateSection: (sectionId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateSection,
}) => {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const id = state.scrollTo;
      window.setTimeout(() => onNavigateSection(id), 60);
    }
  }, [location.state, onNavigateSection]);

  return (
    <main>
      <Hero onNavigateSection={onNavigateSection} />
      <ImpactStatement />
      <HowItWorks />
      <FeaturesSection />
      <AudienceSection />
      <ClosingCTA onNavigateSection={onNavigateSection} />
    </main>
  );
};
