'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_EXPERTISE } from '@/lib/images';

const expertiseData: Record<
  string,
  { image: string; descriptionKey: string }
> = {
  architecture: { image: IMG_EXPERTISE.expertiseInterior, descriptionKey: 'architectureDesc' },
  climate: { image: IMG_EXPERTISE.climate, descriptionKey: 'climateDesc' },
  engineering: { image: IMG_EXPERTISE.enginering, descriptionKey: 'engineeringDesc' },
  technology: { image: IMG_EXPERTISE.technology, descriptionKey: 'technologyDesc' },
  interiors: { image: IMG_EXPERTISE.interiors, descriptionKey: 'interiorsDesc' },
  urban: { image: IMG_EXPERTISE.urban, descriptionKey: 'urbanDesc' },
  workplace: { image: IMG_EXPERTISE.worfplace, descriptionKey: 'workplaceDesc' },
  'master-planning': { image: IMG_EXPERTISE.studioAbout, descriptionKey: 'masterPlanningDesc' },
};

export default function ExpertiseDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { t } = useTranslation();

  const data = expertiseData[slug];
  const titleKey = slug === 'master-planning' ? 'masterPlanning' : slug;

  if (!data) {
    return (
      <main className="min-h-screen bg-white pt-[72px] px-5 py-14">
        <p className="text-sm text-neutral-500">{t('expertise.notFound')}</p>
        <Link href="/expertise" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
          {t('expertise.backToExpertise')}
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <AnimatedSection>
          <Link
            href="/expertise"
            className="mb-10 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('expertise.backToExpertise')}
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-lg">
            <Image
              src={data.image}
              alt={t(`expertise.cards.${titleKey}`)}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
            {t(`expertise.cards.${titleKey}`)}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            {t(`expertise.descriptions.${data.descriptionKey}`)}
          </p>
        </AnimatedSection>
      </div>
    </main>
  );
}
