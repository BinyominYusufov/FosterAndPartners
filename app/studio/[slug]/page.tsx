'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getStudioTopicBySlug } from '@/services/studioTopicsService';
import type { StudioTopicDetail } from '@/lib/types/api';

export default function StudioDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const { t } = useTranslation();
  const [topic, setTopic] = useState<StudioTopicDetail | null>(null);
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
    getStudioTopicBySlug(slug)
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
        <p className="text-sm text-neutral-500">{t('studio.loading', { defaultValue: 'Loading…' })}</p>
      </main>
    );
  }

  if (error || !topic) {
    return (
      <main className="min-h-screen bg-white pt-[72px] px-5 py-14">
        <p className="text-sm text-neutral-500">{t('studio.notFound')}</p>
        <Link
          href="/studio"
          className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-900 underline hover:no-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('studio.backToStudio')}
        </Link>
      </main>
    );
  }

  const title = topic.title;
  const description = topic.description;
  const imageSrc = topic.image ?? '/studio-about.png';

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <Link
          href="/studio"
          className="mb-10 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('studio.title')} / {title}
        </Link>

        <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-lg">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
            unoptimized={imageSrc.startsWith('http')}
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
          {title}
        </h1>
        <p className="mt-6 text-neutral-600 leading-relaxed">
          {description}
        </p>
      </div>
    </main>
  );
}
