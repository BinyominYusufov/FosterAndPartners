'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { publications } from '@/data/publications';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PublicationsPage() {
  const { t } = useTranslation('insights');

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <section className="container mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <header className="mb-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl">
            {t('publications')}
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {publications.map((book) => (
            <Card
              key={book.id}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={book.image}
                  alt={t(`pub.${book.titleKey}`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold text-neutral-900 md:text-base">
                    {t(`pub.${book.titleKey}`)}
                  </h2>
                  <p className="mt-1 text-xs text-neutral-500 md:text-sm">
                    {book.year} · {t(`pub.${book.publisherKey}`)}
                  </p>
                </div>
                <div className="mt-4">
                  <Button type="button" className="w-full rounded-full">
                    {t('buy')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

