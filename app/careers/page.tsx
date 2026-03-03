'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { IMG_CAREERS } from '@/lib/images';

export default function CareersPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <AnimatedSection className="w-full">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1]">
          <Image
            src={IMG_CAREERS.banner}
            alt={t('careers.title')}
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
            <h1 className="text-2xl font-normal tracking-tight text-white md:text-3xl lg:text-4xl">
              {t('careers.title')}
            </h1>
          </div>
        </div>
      </AnimatedSection>

      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <AnimatedSection className="mb-12 max-w-3xl">
          <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
            {t('careers.intro1')}
          </p>
          <p className="mt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
            {t('careers.intro2')}
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <Link
            href="/careers/vacancies"
            className="group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={IMG_CAREERS.vacancies}
                alt={t('careers.vacancies')}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-neutral-100 bg-[#f5f5f5] px-5 py-4">
              <span className="text-sm font-normal text-neutral-800 md:text-base">{t('careers.vacancies')}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
          <Link
            href="/careers/life"
            className="group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={IMG_CAREERS.life}
                alt={t('careers.life')}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-neutral-100 bg-[#f5f5f5] px-5 py-4">
              <span className="text-sm font-normal text-neutral-800 md:text-base">{t('careers.life')}</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
