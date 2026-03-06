'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { journalBySlug } from '@/data/journal';

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(
    locale === 'en' ? 'en-GB' : locale,
    { day: 'numeric', month: 'long', year: 'numeric' }
  );
}

export default function PlusJournalArticlePage() {
  const params = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation('insights');
  const slug = params?.slug;
  const article = slug ? journalBySlug.get(slug) : undefined;

  if (!article) {
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

  const title = t(`items.${article.titleKey}`);
  const body = t(`items.${article.bodyKey}`, { defaultValue: '' });
  const author = t(`authors.${article.authorsKey}`);
  const dateStr = formatDate(article.date, i18n.language);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-8 lg:px-0">
        <div className="relative mb-8 h-72 w-full overflow-hidden rounded-2xl md:h-96">
          <Image
            src={article.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
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

