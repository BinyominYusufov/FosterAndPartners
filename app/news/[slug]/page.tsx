'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getNewsBySlug } from '@/services/newsService';
import type { NewsArticleDetail } from '@/lib/types/api';
import { AnimatedSection } from '@/components/AnimatedSection';

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function readTime(article: NewsArticleDetail): number {
  return article.read_time_minutes ?? article.readTimeMinutes ?? 0;
}

export default function NewsArticlePage() {
  const { t, i18n } = useTranslation('news');
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [article, setArticle] = useState<NewsArticleDetail | null>(null);
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
    getNewsBySlug(slug)
      .then((data) => {
        if (!cancelled) setArticle(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load article');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('page.loading', { defaultValue: 'Loading…' })}</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('page.notFound')}</p>
          <Link href="/news" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
            {t('page.backToNews')}
          </Link>
        </div>
      </main>
    );
  }

  const title = article.title ?? (article.titleKey ? t(`items.${article.titleKey}`) : '');
  const summary = article.summary ?? (article.summaryKey ? t(`items.${article.summaryKey}`) : '');
  const body = article.body ?? (article.bodyKey ? t(`items.${article.bodyKey}`) : '');
  const rawDate = article.published_at || article.date;
  const dateStr = rawDate ? formatDate(rawDate, i18n.language) : '';
  const readTimeStr = t('page.readTime', { count: readTime(article) });
  const typeLabel = article.type ? t(`types.${article.type}`) : '';
  const paragraphs = body ? body.split(/\n\n+/).filter(Boolean) : [];
  const imageSrc = article.image || '/news1.jpg';

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6 md:py-14">
        <AnimatedSection>
          <Link
            href="/news"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('page.backToNews')}
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          {typeLabel && (
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">{typeLabel}</p>
          )}
          <h1 className="mt-2 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl lg:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {dateStr} – {readTimeStr}
          </p>
        </AnimatedSection>

        <AnimatedSection className="mt-8">
          <div className="prose prose-neutral max-w-none text-base leading-relaxed text-neutral-700 md:text-lg">
            {paragraphs.length > 0 ? (
              paragraphs.map((para, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-neutral-600">{summary}</p>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized={imageSrc.startsWith('http')}
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('page.backToNews')}
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}
