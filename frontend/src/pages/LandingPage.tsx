import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { AudienceSection } from '../components/AudienceSection';

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
    <main id="home">
      <Hero onNavigateSection={onNavigateSection} />
      <AudienceSection />
    </main>
  );
};
