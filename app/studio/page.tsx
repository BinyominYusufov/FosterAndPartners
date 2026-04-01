'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStudioTopics } from '@/services/studioTopicsService';
import type { StudioTopicList } from '@/lib/types/api';
import { Card } from '@/components/ui/card';

function topicHref(topic: StudioTopicList): string {
  return `/studio/${topic.slug}`;
}

export default function StudioPage() {
  const { t } = useTranslation();
  const [topics, setTopics] = useState<StudioTopicList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getStudioTopics({ page_size: 100 })
      .then((res) => {
        if (!cancelled) setTopics(res.results ?? []);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load studio topics');
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

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <section className="relative h-[420px] w-full overflow-hidden">
        <Image
          src="/studio.jpg"
          alt={t('studio.title')}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12">
          <h1 className="text-4xl font-semibold text-white tracking-tight md:text-5xl">
            {t('studio.title')}
          </h1>
        </div>
      </section>

      <section className="bg-white px-6 py-12 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-neutral-600 leading-relaxed">
            {t('studio.aboutText')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('studio.loading', { defaultValue: 'Loading…' })}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {topics.map((item) => {
              const title = item.title;
              const href = topicHref(item);
              return (
                <Link
                  key={String(item.id)}
                  href={href}
                  className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
                >
                  <Card className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={item.image ?? '/studio-about.png'}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        unoptimized={(item.image ?? '').startsWith('http')}
                      />
                    </div>
                    <div className="flex items-center justify-between px-5 py-4">
                      <h2 className="text-base font-semibold text-neutral-900 md:text-lg">
                        {title}
                      </h2>
                      <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && topics.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">{t('studio.noResults', { defaultValue: 'No studio topics found.' })}</p>
        )}
      </section>
    </main>
  );
}
