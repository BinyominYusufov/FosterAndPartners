'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ExpertisePageCard, type ExpertisePageCardItem } from '@/components/expertise/ExpertisePageCard';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_EXPERTISE } from '@/lib/images';

const expertiseSections: { sectionKey: string; items: ExpertisePageCardItem[] }[] = [
  {
    sectionKey: 'design',
    items: [
      { slug: 'architecture', titleKey: 'architecture', image: IMG_EXPERTISE.expertiseInterior },
      { slug: 'climate', titleKey: 'climate', image: IMG_EXPERTISE.climate },
    ],
  },
  {
    sectionKey: 'engineering',
    items: [
      { slug: 'engineering', titleKey: 'engineering', image: IMG_EXPERTISE.enginering },
      { slug: 'technology', titleKey: 'technology', image: IMG_EXPERTISE.technology },
    ],
  },
  {
    sectionKey: 'spaces',
    items: [
      { slug: 'interiors', titleKey: 'interiors', image: IMG_EXPERTISE.interiors },
      { slug: 'urban', titleKey: 'urban', image: IMG_EXPERTISE.urban },
    ],
  },
  {
    sectionKey: 'consulting',
    items: [
      { slug: 'workplace', titleKey: 'workplace', image: IMG_EXPERTISE.worfplace },
      { slug: 'master-planning', titleKey: 'masterPlanning', image: IMG_EXPERTISE.studioAbout },
    ],
  },
];

export default function ExpertisePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      {/* Banner under header, above cards */}
      <AnimatedSection className="w-full">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1]">
          <Image
            src={IMG_EXPERTISE.expertiseBanner}
            alt="Expertise"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl font-normal tracking-tight text-white md:text-3xl lg:text-4xl">
              {t('expertise.title')}
            </h1>
          </div>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20 lg:py-24">

        {expertiseSections.map((section) => (
          <AnimatedSection key={section.sectionKey}>
            <section className="mb-16 last:mb-0 md:mb-24">
              <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 md:mb-8">
                {t(`expertise.sections.${section.sectionKey}`)}
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {section.items.map((item) => (
                  <ExpertisePageCard
                    key={item.slug}
                    item={item}
                    title={t(`expertise.cards.${item.titleKey}`)}
                  />
                ))}
              </div>
            </section>
          </AnimatedSection>
        ))}
      </div>
    </main>
  );
}
