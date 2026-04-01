'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getExpertise } from '@/services/expertiseService';
import type { ExpertiseTopic } from '@/lib/types/api';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_EXPERTISE } from '@/lib/images';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function topicTitle(topic: ExpertiseTopic, t: (key: string) => string): string {
  return topic.title ?? (topic.titleKey ? t(`expertise.cards.${topic.titleKey}`) : topic.slug);
}

export default function ExpertisePage() {
  const { t } = useTranslation();
  const [topics, setTopics] = useState<ExpertiseTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getExpertise({ page_size: 100 })
      .then((res) => {
        if (!cancelled) {
          const rows = Array.isArray(res?.results) ? res.results : [];
          setTopics(rows);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load expertise');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  const topicList = Array.isArray(topics) ? topics : [];

  return (
    <main className="min-h-screen bg-white pt-[72px]">
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
        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('expertise.loading', { defaultValue: 'Loading…' })}</p>
        ) : topicList.length === 0 ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('expertise.noResults', { defaultValue: 'No expertise topics found.' })}</p>
        ) : (
          <AnimatedSection>
            <section className="mb-16 last:mb-0 md:mb-24">
              <h2 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 md:mb-8">
                {t('expertise.sections.design')}
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                {topicList.map((topic) => {
                  const title = topicTitle(topic, t);
                  const imageSrc = topic.image || IMG_EXPERTISE.expertiseInterior;
                  return (
                    <Link
                      key={topic.slug}
                      href={`/expertise/${topic.slug}`}
                      className={cn(
                        'group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300'
                      )}
                    >
                      <div className="relative aspect-[4/3] w-full overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={title}
                          fill
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          unoptimized={imageSrc.startsWith('http')}
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-neutral-100 px-5 py-4">
                        <h3 className="text-sm font-normal text-neutral-800 md:text-base">{title}</h3>
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </AnimatedSection>
        )}
      </div>
    </main>
  );
}
