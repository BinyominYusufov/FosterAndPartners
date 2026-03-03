'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight } from 'lucide-react';
import { NEWS_ARTICLES, NEWS_TYPES, type NewsArticle, type NewsType } from '@/data/news';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const TYPE_OPTIONS: (NewsType | 'All')[] = ['All', ...NEWS_TYPES];

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(locale === 'en' ? 'en-GB' : locale, { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function NewsPage() {
  const { t, i18n } = useTranslation('news');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filtered = useMemo(() => {
    let list = NEWS_ARTICLES;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (a) =>
          t(`items.${a.titleKey}`).toLowerCase().includes(q) ||
          t(`items.${a.summaryKey}`).toLowerCase().includes(q)
      );
    }
    if (selectedType !== 'All') {
      list = list.filter((a) => a.type === selectedType);
    }
    list = [...list].sort((a, b) => {
      const cmp = a.date.localeCompare(b.date);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return list;
  }, [search, selectedType, sortOrder, t]);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
            {t('title')}
          </h1>
          <p className="text-sm text-neutral-500">
            {filtered.length === 1
              ? t('page.countOne')
              : t('page.count', { count: filtered.length })}
          </p>
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
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label={t('filters.all')}
              className="w-full md:w-[200px]"
            >
              <option value="All">{t('filters.all')}</option>
              {TYPE_OPTIONS.filter((v) => v !== 'All').map((type) => (
                <option key={type} value={type}>
                  {t(`types.${type}`)}
                </option>
              ))}
            </Select>
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

        <ul className="space-y-8">
          {filtered.map((article) => (
            <NewsCard key={article.id} article={article} locale={i18n.language} />
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm font-medium text-neutral-700">{t('emptyState.title')}</p>
            <p className="mt-1 text-sm text-neutral-500">{t('emptyState.description')}</p>
          </div>
        )}
      </div>
    </main>
  );
}

function NewsCard({ article, locale }: { article: NewsArticle; locale: string }) {
  const { t } = useTranslation('news');
  const title = t(`items.${article.titleKey}`);
  const summary = t(`items.${article.summaryKey}`);
  const dateStr = formatDate(article.date, locale);
  const readTimeStr = t('page.readTime', { count: article.readTimeMinutes });

  return (
    <li>
      <Link
        href={`/news/${article.slug}`}
        className="group flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200 sm:flex-row"
      >
        <div className="relative h-56 w-full shrink-0 sm:h-52 sm:w-80">
          <Image
            src={article.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, 320px"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <h2 className="text-lg font-medium text-neutral-900 group-hover:text-neutral-700 md:text-xl">
              {title}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {dateStr} – {readTimeStr}
            </p>
            <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
              {summary}
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
