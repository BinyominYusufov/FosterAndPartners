'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { projects } from '@/data/projects';
import type { Project, ProjectRegion } from '@/data/projects';
import { ArrowRight } from 'lucide-react';

const REGION_I18N_KEYS: Record<ProjectRegion, string> = {
  Europe: 'Europe',
  'Middle East': 'middleEast',
  Asia: 'Asia',
  'North America': 'northAmerica',
};

function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export default function ProjectInfoPage() {
  const { t } = useTranslation();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const project = getProjectById(id);

  if (!project) {
    return (
      <main className="min-h-screen bg-white pt-[72px]">
        <div className="mx-auto max-w-4xl px-5 py-14">
          <p className="text-neutral-500">{t('projects.page.notFound')}</p>
          <Link href="/projects" className="mt-4 inline-flex text-sm text-neutral-900 underline hover:no-underline">
            {t('projects.page.backToProjects')}
          </Link>
        </div>
      </main>
    );
  }

  const title = t(`projects.items.${project.id}.title`);
  const description = t(`projects.items.${project.id}.description`);

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <div className="mx-auto max-w-6xl px-5 pt-6 md:px-6">
        <Link
          href="/projects"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          {t('projects.page.title')} <span className="mx-1">/</span> <span className="text-neutral-900">{title}</span>
        </Link>
      </div>

      <div className="relative mt-4 aspect-[21/9] w-full overflow-hidden md:aspect-[3/1]">
        <Image
          src={project.image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
          unoptimized
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-500';
              fallback.textContent = title;
              parent.appendChild(fallback);
            }
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 md:flex-row md:items-end">
            <h1 className="text-3xl font-normal tracking-tight text-white md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <span className="inline-flex w-fit rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-700 backdrop-blur-sm">
              {t(`projects.types.${project.type}`)}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {t('projects.page.about')}
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
              {description}
            </p>
          </div>
          <div className="border-t border-neutral-100 pt-8 lg:border-t-0 lg:border-l lg:border-neutral-100 lg:pl-10 lg:pt-0">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
              {t('projects.page.locationDetails')}
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-neutral-500">{t('projects.page.location')}</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{project.location}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">{t('projects.page.region')}</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{t(`projects.regions.${REGION_I18N_KEYS[project.region]}`)}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">{t('projects.page.year')}</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{project.year}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">{t('projects.page.type')}</dt>
                <dd className="mt-0.5 font-medium text-neutral-900">{t(`projects.types.${project.type}`)}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            {t('projects.page.backToProjects')}
            <ArrowRight className="h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  );
}
