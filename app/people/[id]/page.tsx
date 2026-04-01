'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPersonById } from '@/services/peopleService';
import type { Person } from '@/lib/types/api';
import { AnimatedSection } from '@/components/AnimatedSection';

function personName(p: Person, t: (key: string) => string): string {
  if (p.name?.trim()) return p.name;
  if (p.full_name?.trim()) return p.full_name;
  const fromParts = [p.first_name, p.last_name].filter(Boolean).join(' ').trim();
  if (fromParts) return fromParts;
  if (p.nameKey) return t(`people.items.${p.nameKey}.name`);
  return '';
}

function personBio(p: Person, t: (key: string) => string): string {
  return p.bio ?? (p.nameKey ? t(`people.items.${p.nameKey}.bio`) : '');
}

function personTitle(p: Person, t: (key: string) => string): string {
  if (p.titleKey) return t(`people.titles.${p.titleKey}`);
  if (!p.title) return '';

  const key = `people.titles.${p.title}`;
  const translated = t(key);
  return translated === key ? p.title : translated;
}

export default function PersonInfoPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPersonById(id)
      .then((data) => {
        if (!cancelled) setPerson(data);
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load person');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('people.page.loading', { defaultValue: 'Loading…' })}</p>
        </div>
      </main>
    );
  }

  if (error || !person) {
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

  const name = personName(person, t);
  const bio = personBio(person, t);
  const title = personTitle(person, t);
  const imageSrc = person.image || '/people1.jpg';

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

        <AnimatedSection>
          <h1 className="mb-2 text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">{name}</h1>
          <p className="mb-2 text-sm text-neutral-500">{title}</p>
          <div className="prose prose-neutral max-w-none pt-4 text-base leading-relaxed text-neutral-700 md:text-lg">
            {bio}
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200">
            <Image
              src={imageSrc}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              unoptimized={imageSrc.startsWith('http')}
              priority
            />
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10">
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('people.page.backToPeople')}
          </Link>
        </AnimatedSection>
      </div>
    </main>
  );
}
