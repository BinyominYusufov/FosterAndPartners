'use client';

import { HeroSection } from '@/components/HeroSection';
import { AnimatedSection } from '@/components/AnimatedSection';
import ArchitectureSection from '@/components/architecture/ArchitectureSection';
import ClimateSection from '@/components/climate/ClimateSection';
import ExpertiseSection from '@/components/expertise/ExpertiseSection';
import NewsSection from '@/components/news/NewsSection';
import StudioSection from '@/components/studio/StudioSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AnimatedSection>
        <StudioSection />
      </AnimatedSection>
      <AnimatedSection>
        <ArchitectureSection />
      </AnimatedSection>
      <AnimatedSection>
        <ClimateSection />
      </AnimatedSection>
      <AnimatedSection>
        <ExpertiseSection />
      </AnimatedSection>
      <AnimatedSection>
        <NewsSection />
      </AnimatedSection>
    </>
  );
}
