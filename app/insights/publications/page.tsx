'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { PUBLICATIONS } from '@/data/insights';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function PublicationsPage() {
  const { t } = useTranslation('insights');

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <Link
          href="/insights"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('page.breadcrumbPublications')}
        </Link>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PUBLICATIONS.map((pub) => (
            <AnimatedSection key={pub.id}>
              <article className="flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white">
                <div className="relative aspect-[3/4] w-full bg-neutral-100">
                  <Image
                    src={pub.image}
                    alt={t(`items.${pub.titleKey}`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between border-t border-neutral-100 p-5">
                  <div>
                    <h2 className="text-base font-medium text-neutral-900 md:text-lg">
                      {t(`items.${pub.titleKey}`)}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      {pub.year} – {t(`publishers.${pub.publisherKey}`)}
                    </p>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="mt-4 inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
                  >
                    {t('page.buy')}
                  </a>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </main>
  );
}
