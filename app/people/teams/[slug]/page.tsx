'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { TEAMS_BY_SLUG } from '@/data/teams';
import { AnimatedSection } from '@/components/AnimatedSection';

export default function TeamDetailPage() {
  const { t } = useTranslation();
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const team = slug ? TEAMS_BY_SLUG.get(slug) : undefined;

  if (!team) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('people.page.notFound')}</p>
          <Link href="/people/teams" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
            {t('people.page.backToTeams')}
          </Link>
        </div>
      </main>
    );
  }

  const title = t(`people.teams.${team.titleKey}`);
  const description = t(`people.teams.${team.descriptionKey}`);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-6 md:py-14">
        <AnimatedSection>
          <Link
            href="/people/teams"
            className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('people.page.breadcrumbTeams')} <span className="mx-1">/</span> <span className="text-neutral-900">{title}</span>
          </Link>
        </AnimatedSection>

        <AnimatedSection>
          <h1 className="mb-6 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">{title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">{description}</p>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={team.image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <Link
            href="/people/teams"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('people.page.backToTeams')}
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}
