'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { getPublications } from '@/services/publicationsService';
import type { Publication } from '@/lib/types/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { openExternalUrl } from '@/lib/safeUrl';

function pubTitle(pub: Publication, t: (key: string) => string): string {
  return pub.title ?? (pub.titleKey ? t(`pub.${pub.titleKey}`) : '');
}

function pubPublisher(pub: Publication, t: (key: string) => string): string {
  return pub.publisher ?? (pub.publisherKey ? t(`pub.${pub.publisherKey}`) : '');
}

export default function PublicationsPage() {
  const { t } = useTranslation('insights');
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPublications({ page_size: 100 })
      .then((res) => {
        if (!cancelled) {
          const rows = Array.isArray(res?.results) ? res.results : [];
          setPublications(rows);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load publications');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const list = Array.isArray(publications) ? publications : [];

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <section className="container mx-auto max-w-7xl px-6 py-12">
          <p className="text-neutral-600">{error}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <section className="container mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {t('publications')}
          </h1>
        </header>

        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('searchEmpty', { defaultValue: 'Loading…' })}</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {list.map((book) => {
              const coverSrc = book.cover_image || book.image || '/p1.jpg';
              const buyUrl = book.buy_url || book.buyUrl;
              const yearStr = book.year != null ? String(book.year) : '';
              const publisherStr = pubPublisher(book, t);
              const meta = [yearStr, publisherStr].filter(Boolean).join(' · ');

              return (
                <Card
                  key={String(book.id)}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={coverSrc}
                      alt={pubTitle(book, t)}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={coverSrc.startsWith('http')}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between px-5 py-4">
                    <div>
                      <h2 className="text-sm font-semibold text-neutral-900 md:text-base">
                        {pubTitle(book, t)}
                      </h2>
                      <p className="mt-1 text-xs text-neutral-500 md:text-sm">
                        {meta || t('publicationsMetaFallback', { defaultValue: '' })}
                      </p>
                    </div>
                    <div className="mt-4">
                      <Button
                        type="button"
                        className="w-full rounded-full"
                        onClick={() => buyUrl && openExternalUrl(buyUrl)}
                        disabled={!buyUrl}
                      >
                        {t('buy')}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {!loading && list.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">{t('searchEmpty', { defaultValue: 'No publications found.' })}</p>
        )}
      </section>
    </main>
  );
}
