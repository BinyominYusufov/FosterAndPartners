'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { PEOPLE_BY_ID } from '@/data/people';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function PersonInfoPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const person = id ? PEOPLE_BY_ID.get(parseInt(id, 10)) : undefined;

  if (!person) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('people.page.notFound')}</p>
          <Link href="/people" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
            {t('people.page.backToPeople')}
          </Link>
        </div>
      </main>
    );
  }

  const name = t(`people.items.${person.nameKey}.name`);
  const bio = t(`people.items.${person.nameKey}.bio`);
  const title = t(`people.titles.${person.title}`);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6 md:py-14">
        <AnimatedSection>
          <Link
            href="/people"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('people.page.title')} <span className="mx-1">/</span> <span className="text-neutral-900">{name}</span>
          </Link>
        </AnimatedSection>

        {/* 1. Text (bio) first */}
        <AnimatedSection>
          <h1 className="mb-2 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">{name}</h1>
          <p className="mb-2 text-sm text-neutral-500">{title}</p>
          <div className="prose prose-neutral max-w-none pt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
            {bio}
          </div>
        </AnimatedSection>

        {/* 2. Photo after */}
        <AnimatedSection className="mt-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={person.image}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized
              priority
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('people.page.backToPeople')}
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}
