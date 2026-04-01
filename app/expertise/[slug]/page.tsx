'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getExpertiseBySlug } from '@/services/expertiseService';
import type { ExpertiseTopic } from '@/lib/types/api';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_EXPERTISE } from '@/lib/images';

function topicTitle(topic: ExpertiseTopic, t: (key: string) => string): string {
  return topic.title ?? (topic.titleKey ? t(`expertise.cards.${topic.titleKey}`) : topic.slug);
}

function topicDescription(topic: ExpertiseTopic, t: (key: string) => string): string {
  return topic.description ?? (topic.descriptionKey ? t(`expertise.descriptions.${topic.descriptionKey}`) : '');
}

const FALLBACK_IMAGES: Record<string, string> = {
  architecture: IMG_EXPERTISE.expertiseInterior,
  climate: IMG_EXPERTISE.climate,
  engineering: IMG_EXPERTISE.enginering,
  technology: IMG_EXPERTISE.technology,
  interiors: IMG_EXPERTISE.interiors,
  urban: IMG_EXPERTISE.urban,
  workplace: IMG_EXPERTISE.worfplace,
  'master-planning': IMG_EXPERTISE.studioAbout,
};

export default function ExpertiseDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const { t } = useTranslation();
  const [topic, setTopic] = useState<ExpertiseTopic | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getExpertiseBySlug(slug)
      .then((data) => {
        if (!cancelled) setTopic(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load topic');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-[72px] px-5 py-14">
        <p className="text-sm text-neutral-500">{t('expertise.loading', { defaultValue: 'Loading…' })}</p>
      </main>
    );
  }

  if (error || !topic) {
    return (
      <main className="min-h-screen bg-white pt-[72px] px-5 py-14">
        <p className="text-sm text-neutral-500">{t('expertise.notFound')}</p>
        <Link href="/expertise" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
          {t('expertise.backToExpertise')}
        </Link>
      </main>
    );
  }

  const title = topicTitle(topic, t);
  const description = topicDescription(topic, t);
  const imageSrc = topic.image ?? FALLBACK_IMAGES[slug] ?? IMG_EXPERTISE.expertiseInterior;

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
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              unoptimized={imageSrc.startsWith('http')}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-600 md:text-base">
            {description}
          </p>
        </AnimatedSection>
      </div>
    </main>
  );
}
