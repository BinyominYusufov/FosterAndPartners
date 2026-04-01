'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getPlusJournalBySlug } from '@/services/insightsService';
import type { PlusJournalArticleDetail } from '@/lib/types/api';

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function articleTitle(article: PlusJournalArticleDetail, t: (key: string) => string): string {
  return article.title ?? (article.titleKey ? t(`items.${article.titleKey}`) : '');
}

function articleBody(article: PlusJournalArticleDetail, t: (key: string) => string): string {
  return article.body ?? (article.bodyKey ? (t(`items.${article.bodyKey}`) || '') : '');
}

function articleAuthors(article: PlusJournalArticleDetail, t: (key: string) => string): string {
  return article.authors ?? (article.authorsKey ? t(`authors.${article.authorsKey}`) : '');
}

export default function PlusJournalArticlePage() {
  const params = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('insights');
  const slug = params?.slug;
  const [article, setArticle] = useState<PlusJournalArticleDetail | null>(null);
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
    getPlusJournalBySlug(slug)
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
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm text-neutral-600">{t('searchEmpty', { defaultValue: 'Loading…' })}</p>
        </div>
      </main>
    );
  }

  if (error || !article) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm text-neutral-600">
            Article not found.
          </p>
        </div>
      </main>
    );
  }

  const title = articleTitle(article, t);
  const body = articleBody(article, t);
  const author = articleAuthors(article, t);
  const rawDate = article.published_at || article.date;
  const dateStr = rawDate ? formatDate(rawDate, i18n.language) : '';
  const imageSrc = article.image || '/news1.jpg';

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-8 lg:px-0">
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
            unoptimized={imageSrc.startsWith('http')}
          />
        </div>

        <header className="mb-8 space-y-3">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
            {t('plusJournal')}
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {title}
          </h1>
          <p className="text-sm text-neutral-500">
            {t('article.byAuthor', { author })} • {dateStr}
          </p>
        </header>

        <div className="prose prose-neutral max-w-none text-sm leading-relaxed">
          {body || (
            <p className="text-neutral-600">
              {t('articlePlaceholder', {
                defaultValue:
                  'Full article content will be added here.',
              })}
            </p>
          )}
        </div>
      </article>
    </main>
  );
}
