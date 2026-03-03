'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IMG_EXPERTISE } from '@/lib/images';
import 'swiper/css';
import 'swiper/css/navigation';

export interface ExpertiseItem {
  titleKey: string;
  href: string;
  image: string;
  gridClass?: string;
}

const expertiseItems: ExpertiseItem[] = [
  { titleKey: 'engineering', href: '/expertise/engineering', image: IMG_EXPERTISE.enginering, gridClass: 'lg:col-span-3' },
  { titleKey: 'technology', href: '/expertise/technology', image: IMG_EXPERTISE.technology, gridClass: 'lg:col-span-3' },
  { titleKey: 'interiors', href: '/expertise/interiors', image: IMG_EXPERTISE.interiors, gridClass: 'lg:col-span-2' },
  { titleKey: 'urban', href: '/expertise/urban', image: IMG_EXPERTISE.urban, gridClass: 'lg:col-span-2' },
  { titleKey: 'workplace', href: '/expertise/workplace', image: IMG_EXPERTISE.worfplace, gridClass: 'lg:col-span-2' },
];

function ExpertiseCard({ item, title, aspectClass }: { item: ExpertiseItem; title: string; aspectClass?: string }) {
  return (
    <Link
      href={item.href}
      className={cn(
        'block overflow-hidden rounded-2xl group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground',
        'lg:h-full',
        item.gridClass
      )}
    >
      <Card
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border-0 p-0 shadow-none',
          aspectClass ?? 'aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[240px]',
          'transition-all duration-300 ease-out'
        )}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <Image
            src={item.image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
            'transition-all duration-300 ease-out',
            'group-hover:from-black/90'
          )}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-lg font-medium text-white tracking-wide md:text-xl">
            {title}
          </h3>
        </div>
      </Card>
    </Link>
  );
}

export default function ExpertiseSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#0f0f0f] px-6 py-16 md:px-8 lg:px-12">
      {/* Header with title + nav arrows */}
      <div className="mb-6 flex items-center justify-between lg:mb-12">
        <h2 className="text-4xl font-medium text-white tracking-tight md:text-5xl">
          {t('expertise.title')}
        </h2>
        {/* Mobile swiper nav - dark circular buttons */}
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            aria-label="Previous"
            className="expertise-swiper-prev flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="expertise-swiper-next flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile: Swiper */}
      <div className="overflow-hidden md:hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: '.expertise-swiper-prev',
            nextEl: '.expertise-swiper-next',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          loopAdditionalSlides={2}
          allowTouchMove={false}
          spaceBetween={16}
          slidesPerView={1}
          className="!overflow-hidden"
        >
          {expertiseItems.map((item) => (
            <SwiperSlide key={item.href}>
              <ExpertiseCard item={item} title={t(`expertise.cards.${item.titleKey}`)} aspectClass="aspect-[3/2]" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-6 md:gap-y-12 lg:grid-cols-6 lg:grid-rows-[1fr_1fr] lg:gap-8 lg:gap-y-8 lg:min-h-[400px]">
        {expertiseItems.map((item) => (
          <ExpertiseCard
            key={item.href}
            item={item}
            title={t(`expertise.cards.${item.titleKey}`)}
          />
        ))}
      </div>
    </section>
  );
}
