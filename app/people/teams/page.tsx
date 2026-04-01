'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight } from 'lucide-react';
import { getTeams } from '@/services/teamsService';
import type { Team } from '@/lib/types/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AnimatedSection } from '@/components/AnimatedSection';

function teamTitle(team: Team, t: (key: string) => string): string {
  return team.title ?? (team.titleKey ? t(`people.teams.${team.titleKey}`) : '');
}

function teamDescription(team: Team, t: (key: string) => string): string {
  return team.description ?? (team.descriptionKey ? t(`people.teams.${team.descriptionKey}`) : '');
}

export default function PeopleTeamsPage() {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const [sortAlpha, setSortAlpha] = useState<'asc' | 'desc'>('asc');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getTeams({ page_size: 500 })
      .then((res) => {
        if (!cancelled) setTeams(res.results);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message ?? 'Failed to load teams');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = teams;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (team) =>
          teamTitle(team, t).toLowerCase().includes(q) ||
          teamDescription(team, t).toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) => {
      const titleA = teamTitle(a, t);
      const titleB = teamTitle(b, t);
      return sortAlpha === 'asc' ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
    });
    return list;
  }, [teams, search, sortAlpha, t]);

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
        <p className="mb-4 text-sm text-neutral-500">{t('people.page.breadcrumbTeams')}</p>

        <div className="mb-10 rounded-2xl bg-[#f5f5f5] p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
            <div className="relative flex-1 md:max-w-[320px]">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <Input
                type="search"
                placeholder={t('people.page.searchTeamPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                aria-label={t('people.page.searchTeamPlaceholder')}
              />
            </div>
            <Button
              type="button"
              variant="default"
              size="default"
              onClick={() => setSortAlpha((o) => (o === 'asc' ? 'desc' : 'asc'))}
              className="w-full rounded-full bg-white/80 text-neutral-600 hover:bg-white md:w-auto"
            >
              {t('people.page.alphabetical')} {sortAlpha === 'asc' ? '↑' : '↓'}
            </Button>
          </div>
        </div>

        {loading ? (
          <p className="py-12 text-center text-sm text-neutral-500">{t('people.page.loading', { defaultValue: 'Loading…' })}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSorted.map((team) => (
                <AnimatedSection key={team.slug}>
                  <Link
                    href={`/people/teams/${team.slug}`}
                    className="group block overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors hover:border-neutral-200"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={team.image || '/expertise-interior.png'}
                        alt={teamTitle(team, t)}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={(team.image || '').startsWith('http')}
                      />
                    </div>
                    <div className="flex items-start justify-between gap-4 border-t border-neutral-100 bg-[#f5f5f5] px-5 py-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-neutral-900 group-hover:text-neutral-700">
                          {teamTitle(team, t)}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-neutral-600">
                          {teamDescription(team, t)}
                        </p>
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 transition-colors group-hover:border-neutral-300 group-hover:text-neutral-900">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            {filteredAndSorted.length === 0 && (
              <p className="py-12 text-center text-sm text-neutral-500">{t('people.page.noResults')}</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
