'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { IMG_EXPERTISE } from '@/lib/images';

export default function CareersLifePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src={IMG_EXPERTISE.lifeAtFoster}
          alt={t('careers.life')}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <Link
          href="/careers"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('careers.title')} / {t('careers.life')}
        </Link>
        <h1 className="text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
          {t('careers.life')}
        </h1>
        <p className="mt-4 text-neutral-600">
          {t('careers.intro1')} {t('careers.intro2')}
        </p>
      </div>
    </main>
  );
}
