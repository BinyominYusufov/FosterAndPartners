'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { studioItems } from '@/data/studioItems';
import { Card } from '@/components/ui/card';

export default function StudioPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-white pt-[72px]">
      {/* Hero: full-width image, "Studio" overlay bottom-left */}
      <section className="relative h-[420px] w-full overflow-hidden">
        <Image
          src="/studio.jpg"
          alt={t('studio.title')}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-12 left-12">
          <h1 className="text-4xl font-semibold text-white tracking-tight md:text-5xl">
            {t('studio.title')}
          </h1>
        </div>
      </section>

      {/* Text content */}
      <section className="bg-white px-6 py-12 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-neutral-600 leading-relaxed">
            {t('studio.aboutText')}
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-16 lg:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {studioItems.map((item) => {
            const title = t(`studio.cards.${item.titleKey}`);
            return (
              <Link
                key={item.id}
                href={item.route}
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-900"
              >
                <Card className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-lg">
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-base font-semibold text-neutral-900 md:text-lg">
                      {title}
                    </h2>
                    <ArrowRight className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900" />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}

