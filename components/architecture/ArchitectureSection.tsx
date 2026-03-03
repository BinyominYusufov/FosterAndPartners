'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IMG_EXPERTISE } from '@/lib/images';

export default function ArchitectureSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#0f0f0f] px-6 py-16 md:px-8 lg:px-12">
      <h2 className="mb-12 text-4xl font-medium text-white tracking-tight md:text-5xl">
        {t('architecture.title')}
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Image (wide left) */}
        <div className="relative overflow-hidden rounded-2xl lg:col-span-2 aspect-[25/9]">
          <Image
            src={IMG_EXPERTISE.architecture}
            alt={t('architecture.title')}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-lg font-medium text-white tracking-wide md:text-xl">
              {t('architecture.title')}
            </h3>
          </div>
        </div>
        {/* Quote (narrow right) */}
        <div className="flex h-full min-h-[140px] flex-col items-center justify-center rounded-2xl bg-[#1a1a1a] p-6 text-center">
          <p className="text-base leading-relaxed text-white/90 md:text-lg">
            {t('architecture.quote')}
          </p>
          <p className="mt-4 text-sm text-white/70">{t('architecture.quoteAuthor')}</p>
        </div>
      </div>
    </section>
  );
}
