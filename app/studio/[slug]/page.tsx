'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { getStudioItemBySlug } from '@/data/studioItems';

export default function StudioDetailPage() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? '';
  const { t } = useTranslation();
  const item = getStudioItemBySlug(slug);

  if (!item) {
    return (
      <main className="min-h-screen bg-white pt-[72px] px-5 py-14">
        <p className="text-sm text-neutral-500">{t('studio.notFound')}</p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-neutral-900 underline hover:no-underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('studio.backToStudio')}
        </Link>
      </main>
    );
  }

  const title = t(`studio.cards.${item.titleKey}`);
  const description = t(`studio.descriptions.${item.descriptionKey}`);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-6 md:py-20">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('studio.title')} / {title}
        </Link>

        <div className="relative mb-10 aspect-[2/1] w-full overflow-hidden rounded-lg">
          <Image
            src={item.image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 896px"
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
