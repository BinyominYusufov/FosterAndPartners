'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export default function CareersVacanciesPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <Link
          href="/careers"
          className="mb-8 inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('careers.title')} / {t('careers.vacancies')}
        </Link>
        <h1 className="text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
          {t('careers.vacancies')}
        </h1>
        <p className="mt-4 text-neutral-600">
          {t('careers.intro1')} {t('careers.intro2')}
        </p>
      </div>
    </main>
  );
}
