'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { journalArticles, type PlusJournalArticle } from '@/data/journal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(
    locale === 'en' ? 'en-GB' : locale,
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
}

export default function PlusJournalPage() {
  const { t, i18n } = useTranslation('insights');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'date' | 'alphabetical'>('date');

  const filtered = useMemo(() => {
    let items = [...journalArticles];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((a) =>
        t(`items.${a.titleKey}`).toLowerCase().includes(q)
      );
    }

    items.sort((a, b) => {
      if (sort === 'date') {
        return b.date.localeCompare(a.date);
      }
      const ta = t(`items.${a.titleKey}`).toLowerCase();
      const tb = t(`items.${b.titleKey}`).toLowerCase();
      return ta.localeCompare(tb);
    });

    return items;
  }, [search, sort, t]);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <section className="container mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <nav className="mb-6 text-sm text-neutral-500">
          <span>{t('breadcrumb.insights')}</span>
          <span className="mx-2">/</span>
          <span className="text-neutral-900">{t('breadcrumb.plusJournal')}</span>
        </nav>

        <header className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {t('plusJournal')}
          </h1>
        </header>

        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:max-w-md">
            <Input
              type="search"
              placeholder={t('search')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={sort === 'date' ? 'default' : 'ghost'}
              onClick={() => setSort('date')}
              className="rounded-full"
            >
              {t('date')}
            </Button>
            <Button
              type="button"
              variant={sort === 'alphabetical' ? 'default' : 'ghost'}
              onClick={() => setSort('alphabetical')}
              className="rounded-full"
            >
              {t('alphabetical')}
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {filtered.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              locale={i18n.language}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-500">
            {t('searchEmpty', { defaultValue: 'No articles match your search.' })}
          </div>
        )}
      </section>
    </main>
  );
}

function ArticleCard({
  article,
  locale,
}: {
  article: PlusJournalArticle;
  locale: string;
}) {
  const { t } = useTranslation('insights');
  const title = t(`items.${article.titleKey}`);
  const summary = t(`items.${article.summaryKey}`, { defaultValue: '' });
  const author = t(`authors.${article.authorsKey}`);
  const dateStr = formatDate(article.date, locale);
  const readTime = t('article.readTime', { count: article.readTimeMinutes });

  return (
    <Link
      href={`/insights/plus-journal/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:shadow-lg md:flex-row"
    >
      <div className="relative h-56 w-full shrink-0 md:h-56 md:w-80">
        <Image
          src={article.image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <Badge className="mb-3">
            {t('plusJournal')}
          </Badge>
          <h2 className="text-lg font-semibold text-neutral-900 md:text-xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            {dateStr} • {readTime}
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            {t('article.byAuthor', { author })}
          </p>
          {summary && (
            <p className="mt-3 line-clamp-3 text-sm text-neutral-600">
              {summary}
            </p>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            className="px-0 text-sm font-medium text-neutral-900 hover:bg-transparent"
          >
            {t('readArticle')}
          </Button>
          <ArrowRight className="h-4 w-4 text-neutral-700 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
        </div>
      </div>
    </Link>
  );
}

