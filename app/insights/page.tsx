'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { INSIGHTS_CARDS } from '@/data/insights';
import { IMG_INSIGHTS, IMG_MISC, IMG_NEWS, IMG_PROJECTS } from '@/lib/images';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const HERO_CANDIDATES: string[] = [
  IMG_INSIGHTS.banner,
  IMG_MISC.heroMain,
  IMG_MISC.heroMain2,
  IMG_MISC.latestNews,
  IMG_NEWS[0],
  IMG_PROJECTS[0],
];

const HERO_IMAGE_SRC = HERO_CANDIDATES.find(Boolean) ?? IMG_INSIGHTS.banner;

export default function InsightsPage() {
  const { t } = useTranslation('insights');

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      <section className="relative w-full h-[420px] overflow-hidden">
        <Image
          src={HERO_IMAGE_SRC}
          alt={t('insights')}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-12 left-1/2 w-full max-w-7xl -translate-x-1/2 px-6 text-white md:px-8 lg:px-12">
          <h1 className="text-3xl font-semibold md:text-4xl">
            {t('insights')}
          </h1>
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-6 py-12 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {INSIGHTS_CARDS.map((card) => (
            <Link key={card.key} href={card.href} className="group">
              <Card className="h-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={card.image}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex items-center justify-between px-6 py-5">
                  <div>
                    <h2 className="text-lg font-semibold text-neutral-900 md:text-xl">
                      {t(card.titleKey)}
                    </h2>
                    <p className="mt-1 text-sm text-neutral-600">
                      {t(card.descriptionKey)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label={t(card.titleKey)}
                    className="shrink-0 border border-white/40 bg-white/10 text-white transition group-hover:bg-white group-hover:text-black"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

