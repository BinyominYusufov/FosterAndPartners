'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import {
  PEOPLE_BY_ID,
  getPeopleInSectionOrder,
  SECTION_KEYS,
  type SectionKey,
  type Person,
  type PeopleTitle,
  type PeopleBoard,
} from '@/data/people';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';

const TITLE_OPTIONS: (PeopleTitle | 'All')[] = ['All', 'Senior Partner', 'Partner', 'Associate Partner', 'Associate'];
const BOARD_OPTIONS: (PeopleBoard | 'All')[] = ['All', 'Design', 'Engineering', 'Sustainability', 'Leadership'];

function filterAndSort(
  personIds: number[],
  search: string,
  selectedTitle: string,
  selectedBoard: string,
  sortAlpha: 'asc' | 'desc',
  t: (key: string) => string
): Person[] {
  let list = personIds.map((id) => PEOPLE_BY_ID.get(id)).filter(Boolean) as Person[];
  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) => t(`people.items.${p.nameKey}.name`).toLowerCase().includes(q));
  }
  if (selectedTitle !== 'All') list = list.filter((p) => p.title === selectedTitle);
  if (selectedBoard !== 'All') list = list.filter((p) => p.board === selectedBoard);
  list = [...list].sort((a, b) => {
    const nameA = t(`people.items.${a.nameKey}.name`);
    const nameB = t(`people.items.${b.nameKey}.name`);
    return sortAlpha === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });
  return list;
}

export default function PeopleAllPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedTitle, setSelectedTitle] = useState<string>('All');
  const [selectedBoard, setSelectedBoard] = useState<string>('All');
  const [sortAlpha, setSortAlpha] = useState<'asc' | 'desc'>('asc');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_KEYS.map((k) => [k, true]))
  );

  const toggleSection = (key: SectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
            <Select
              value={selectedTitle}
              onChange={(e) => setSelectedTitle(e.target.value)}
              aria-label={t('people.page.ariaTitle')}
              className="w-full md:w-[200px]"
            >
              <option value="All">{t('people.page.allTitles')}</option>
              {TITLE_OPTIONS.filter((v) => v !== 'All').map((title) => (
                <option key={title} value={title}>{t(`people.titles.${title}`)}</option>
              ))}
            </Select>
            <Select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              aria-label={t('people.page.ariaBoard')}
              className="w-full md:w-[180px]"
            >
              <option value="All">{t('people.page.boards')}</option>
              {BOARD_OPTIONS.filter((v) => v !== 'All').map((board) => (
                <option key={board} value={board}>{t(`people.boards.${board}`)}</option>
              ))}
            </Select>
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

        {SECTION_KEYS.map((sectionKey) => {
          const order = getPeopleInSectionOrder(sectionKey).map((p) => p.id);
          const filtered = filterAndSort(order, search, selectedTitle, selectedBoard, sortAlpha, t);
          const isExpanded = expandedSections[sectionKey] ?? true;

          return (
            <AnimatedSection key={sectionKey} className="mb-8 last:mb-0">
              <div className="rounded-xl border border-neutral-100 bg-white">
                <button
                  type="button"
                  onClick={() => toggleSection(sectionKey)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-neutral-50"
                  aria-expanded={isExpanded}
                >
                  <h2 className="text-lg font-medium text-neutral-900">{t(`people.sections.${sectionKey}`)}</h2>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-600">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </span>
                </button>
                {isExpanded && (
                  <div className="border-t border-neutral-100 px-5 pb-5 pt-4">
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {filtered.map((person) => (
                        <PersonCard key={person.id} person={person} />
                      ))}
                    </ul>
                    {filtered.length === 0 && (
                      <p className="py-8 text-center text-sm text-neutral-500">{t('people.page.noResults')}</p>
                    )}
                  </div>
                )}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </main>
  );
}

function PersonCard({ person }: { person: Person }) {
  const { t } = useTranslation();
  const [imgError, setImgError] = useState(false);
  const name = t(`people.items.${person.nameKey}.name`);
  const title = t(`people.titles.${person.title}`);

  return (
    <li>
      <Link href={`/people/${person.id}`} className="group block text-center">
        <div className="relative mx-auto aspect-square w-full max-w-[140px] overflow-hidden rounded-full bg-neutral-200">
          {!imgError && (
            <Image
              src={person.image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="140px"
              unoptimized
              onError={() => setImgError(true)}
            />
          )}
          {imgError && (
            <span className="absolute inset-0 flex items-center justify-center bg-neutral-300 text-lg font-medium text-neutral-600">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <p className="mt-3 text-sm font-medium text-neutral-900 group-hover:text-neutral-700">{name}</p>
        <p className="mt-0.5 text-xs text-neutral-500">{title}</p>
      </Link>
    </li>
  );
}
