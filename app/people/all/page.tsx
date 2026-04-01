'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { getPeople } from '@/services/peopleService';
import type { Person } from '@/lib/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';

function personName(p: Person, t: (key: string) => string): string {
  if (p.name?.trim()) return p.name;
  if (p.full_name?.trim()) return p.full_name;
  const fromParts = [p.first_name, p.last_name].filter(Boolean).join(' ').trim();
  if (fromParts) return fromParts;
  if (p.nameKey) return t(`people.items.${p.nameKey}.name`);
  return '';
}

function personTitle(p: Person, t: (key: string) => string): string {
  if (p.titleKey) return t(`people.titles.${p.titleKey}`);
  if (!p.title) return '';

  const key = `people.titles.${p.title}`;
  const translated = t(key);
  return translated === key ? p.title : translated;
}

function filterAndSort(
  people: Person[],
  search: string,
  sortAlpha: 'asc' | 'desc',
  t: (key: string) => string
): Person[] {
  let list = people;
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) => personName(p, t).toLowerCase().includes(q));
  }
  list = [...list].sort((a, b) => {
    const nameA = personName(a, t);
    const nameB = personName(b, t);
    return sortAlpha === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  return list;
}

export default function PeopleAllPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [sortAlpha, setSortAlpha] = useState<'asc' | 'desc'>('asc');
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getPeople({ page_size: 500 })
      .then((res) => {
        if (!cancelled) setPeople(res.results);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load people');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);
  const filteredPeople = filterAndSort(people, search, sortAlpha, t);

  if (error) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
          <p className="text-neutral-600">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <p className="mb-4 text-sm text-neutral-500">{t('people.page.breadcrumbAll')}</p>

        <div className="mb-8 rounded-2xl bg-[#f5f5f5] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-3">
            <div className="relative flex-1 md:max-w-[280px]">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder={t('people.page.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                aria-label={t('people.page.searchPlaceholder')}
              />
            </div>
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={() => setSortAlpha((o) => (o === 'asc' ? 'desc' : 'asc'))}
              className="rounded-full bg-white/80 text-neutral-700 hover:bg-white"
              aria-label={sortAlpha === 'asc' ? t('people.page.alphabeticalAsc') : t('people.page.alphabeticalDesc')}
            >
              {t('people.page.alphabetical')} {sortAlpha === 'asc' ? t('people.page.sortAsc') : t('people.page.sortDesc')}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('people.page.loading', { defaultValue: 'Loading…' })}</p>
        ) : (
          <AnimatedSection className="rounded-xl border border-neutral-100 bg-white p-5">
            <h2 className="mb-4 text-lg font-medium text-neutral-900">{t('people.page.title')}</h2>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filteredPeople.map((person) => (
                <PersonCard key={person.id} person={person} nameStr={personName(person, t)} />
              ))}
            </ul>
            {filteredPeople.length === 0 && (
              <p className="py-8 text-center text-sm text-neutral-500">{t('people.page.noResults')}</p>
            )}
          </AnimatedSection>
        )}
      </div>
    </main>
  );
}

function PersonCard({ person, nameStr }: { person: Person; nameStr: string }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const title = personTitle(person, t);
  const imageSrc = person.image || '/people1.jpg';

  return (
    <li>
      <Link href={`/people/${person.id}`} className="group block text-center">
        <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-neutral-200">
          {!imgError && (
            <Image
              src={imageSrc}
              alt={nameStr}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="140px"
              unoptimized={imageSrc.startsWith('http')}
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <span className="absolute inset-0 flex items-center justify-center bg-neutral-300 text-lg font-medium text-neutral-600">
              {nameStr.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-neutral-900 group-hover:text-neutral-700">{nameStr}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{title}</p>
      </Link>
    </li>
  );
}
