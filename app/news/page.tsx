'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight } from 'lucide-react';
import { getNews } from '@/services/newsService';
import type { NewsArticleList } from '@/lib/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function readTime(article: NewsArticleList): number {
  return article.read_time_minutes ?? article.readTimeMinutes ?? 0;
}

function articleTitle(article: NewsArticleList, t: (key: string) => string): string {
  return article.title ?? (article.titleKey ? t(`items.${article.titleKey}`) : '');
}

function articleSummary(article: NewsArticleList, t: (key: string) => string): string {
  return article.summary ?? (article.summaryKey ? t(`items.${article.summaryKey}`) : '');
}

export default function NewsPage() {
  const { t, i18n } = useTranslation('news');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [articles, setArticles] = useState<NewsArticleList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getNews({ page_size: 500 })
      .then((res) => {
        if (cancelled) return;
        const rows = Array.isArray(res?.results) ? res.results : [];
        setArticles(rows);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load news');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    let list = Array.isArray(articles) ? articles : [];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          articleTitle(a, t).toLowerCase().includes(q) ||
          articleSummary(a, t).toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const aDate = a.published_at || a.date || '';
      const bDate = b.published_at || b.date || '';
      const cmp = aDate.localeCompare(bDate);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [articles, search, sortOrder, t]);

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
          <p className="text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
            {t('title')}
          </h1>
          {!loading && (
            <p className="text-sm text-neutral-500">
              {filtered.length === 1
                ? t('page.countOne')
                : t('page.count', { count: filtered.length })}
            </p>
          )}
        </div>

        <div className="mb-10 rounded-2xl bg-[#f5f5f5] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-3">
            <div className="relative flex-1 md:max-w-[280px]">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                aria-label={t('searchPlaceholder')}
              />
            </div>
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
              className="rounded-full bg-white/80 text-neutral-700 hover:bg-white"
            >
              {sortOrder === 'desc' ? t('sort.latest') : t('sort.alphabetical')} {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('page.loading', { defaultValue: 'Loading…' })}</p>
        ) : (
          <>
            <ul className="space-y-8">
              {filtered.map((article) => (
                <NewsCard
                  key={String(article.id)}
                  article={article}
                  locale={i18n.language}
                  readTimeMin={readTime(article)}
                  titleStr={articleTitle(article, t)}
                  summaryStr={articleSummary(article, t)}
                />
              ))}
            </ul>

            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-neutral-700">{t('emptyState.title')}</p>
                <p className="mt-1 text-sm text-neutral-500">{t('emptyState.description')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function NewsCard({
  article,
  locale,
  readTimeMin,
  titleStr,
  summaryStr,
}: {
  article: NewsArticleList;
  locale: string;
  readTimeMin: number;
  titleStr: string;
  summaryStr: string;
}) {
  const { t } = useTranslation('news');
  const rawDate = article.published_at || article.date;
  const dateStr = rawDate ? formatDate(rawDate, locale) : '';
  const readTimeStr = t('page.readTime', { count: readTimeMin });
  const imageSrc = article.image || '/news1.jpg';

  return (
    <li>
      <Link
        href={`/news/${article.slug}`}
        className="group flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200 sm:flex-row"
      >
        <div className="relative h-56 w-full shrink-0 sm:h-52 sm:w-80">
          <Image
            src={imageSrc}
            alt={titleStr}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 320px"
            unoptimized={imageSrc.startsWith('http')}
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h2 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-700 md:text-xl">
              {titleStr}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {dateStr} – {readTimeStr}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
              {summaryStr}
            </p>
          </div>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
            {t('card.readMore')}
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </li>
  );
}
