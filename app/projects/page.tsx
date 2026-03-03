'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { projects } from '@/data/projects';
import type { Project, ProjectType, ProjectRegion } from '@/data/projects';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PROJECT_TYPES: (ProjectType | 'All')[] = ['All', 'Residential', 'Commercial', 'Infrastructure', 'Masterplan', 'Cultural'];
const REGIONS: (ProjectRegion | 'All')[] = ['All', 'Europe', 'Middle East', 'Asia', 'North America'];

const REGION_I18N_KEYS: Record<ProjectRegion, string> = {
  Europe: 'Europe',
  'Middle East': 'middleEast',
  Asia: 'Asia',
  'North America': 'northAmerica',
};

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'alpha'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredProjects = useMemo(() => {
    let result = projects;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((p) =>
        t(`projects.items.${p.id}.title`).toLowerCase().includes(q)
      );
    }

    if (selectedType !== 'All') {
      result = result.filter((p) => p.type === selectedType);
    }

    if (selectedRegion !== 'All') {
      result = result.filter((p) => p.region === selectedRegion);
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' ? a.year - b.year : b.year - a.year;
      }
      const titleA = t(`projects.items.${a.id}.title`);
      const titleB = t(`projects.items.${b.id}.title`);
      return sortOrder === 'asc'
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });

    return result;
  }, [search, selectedType, selectedRegion, sortBy, sortOrder, t]);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-14">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl">
            {t('projects.page.title')}
          </h1>
          <p className="text-sm text-neutral-500">
            {filteredProjects.length === 1
              ? t('projects.page.countOne')
              : t('projects.page.count', { count: filteredProjects.length })}
          </p>
        </div>

        {/* Filter bar */}
        <div className="mb-10 rounded-2xl bg-[#f5f5f5] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-3">
            <div className="relative flex-1 md:max-w-[280px]">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder={t('projects.page.searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                aria-label={t('projects.page.searchPlaceholder')}
              />
            </div>

            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              aria-label={t('projects.page.type')}
              className="w-full md:w-[200px]"
            >
              <option value="All">{t('projects.page.allTypes')}</option>
              {PROJECT_TYPES.filter((type) => type !== 'All').map((type) => (
                <option key={type} value={type}>
                  {t(`projects.types.${type}`)}
                </option>
              ))}
            </Select>

            <Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              aria-label={t('projects.page.location')}
              className="w-full md:w-[200px]"
            >
              <option value="All">{t('projects.page.allLocations')}</option>
              {REGIONS.filter((r) => r !== 'All').map((r) => (
                <option key={r} value={r}>
                  {t(`projects.regions.${REGION_I18N_KEYS[r as ProjectRegion]}`)}
                </option>
              ))}
            </Select>

            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="default"
                size="default"
                onClick={() => setSortBy('date')}
                className={cn(
                  'rounded-full text-neutral-700',
                  sortBy === 'date' ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-white/80 hover:bg-white'
                )}
              >
                {t('projects.page.date')}
              </Button>
              <Button
                type="button"
                variant="default"
                size="default"
                onClick={() => setSortBy('alpha')}
                className={cn(
                  'rounded-full text-neutral-700',
                  sortBy === 'alpha' ? 'bg-neutral-200 hover:bg-neutral-300' : 'bg-white/80 hover:bg-white'
                )}
              >
                {t('projects.page.alphabetical')}
              </Button>
              <Button
                type="button"
                variant="default"
                size="icon"
                onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}
                className="rounded-full bg-white/80 text-neutral-700 hover:bg-white"
                aria-label={sortOrder === 'asc' ? t('projects.page.date') : t('projects.page.date')}
              >
                {sortOrder === 'asc' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <ul
          key={`${search}-${selectedType}-${selectedRegion}-${sortBy}-${sortOrder}`}
          className="projects-grid-fade-in grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} regionKey={REGION_I18N_KEYS[project.region]} />
          ))}
        </ul>

        {filteredProjects.length === 0 && (
          <p className="py-12 text-center text-sm text-neutral-500">
            {t('projects.page.noResults')}
          </p>
        )}
      </div>
    </main>
  );
}

function ProjectCard({ project, regionKey }: { project: Project; regionKey: string }) {
  const { t } = useTranslation();
  return (
    <li
      className={cn(
        'group overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 transition-all duration-300',
        'hover:border-neutral-200 hover:shadow-md',
        'opacity-100'
      )}
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] bg-neutral-200">
          <Image
            src={project.image}
            alt={t(`projects.items.${project.id}.title`)}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="border-t border-neutral-100 p-4">
          <p className="text-xs uppercase tracking-wider text-neutral-400">
            {t(`projects.types.${project.type}`)} · {t(`projects.regions.${regionKey}`)}
          </p>
          <h2 className="mt-1 text-base font-medium text-neutral-900 group-hover:text-neutral-700">
            {t(`projects.items.${project.id}.title`)}
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            {project.location} · {project.year}
          </p>
          <div className="mt-3 flex justify-end">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}
