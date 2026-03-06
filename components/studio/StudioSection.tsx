'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { studioItems, type StudioItem } from '@/data/studioItems';
import 'swiper/css';
import 'swiper/css/navigation';

interface StudioCardProps {
  item: StudioItem;
  title: string;
  gridClass?: string;
  aspectClass?: string;
}

function StudioCard({ item, title, gridClass, aspectClass = 'aspect-[25/9]' }: StudioCardProps) {
  return (
    <Link
      href={item.route}
      className={cn(
        'block overflow-hidden rounded-2xl group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground',
        gridClass
      )}
    >
      <Card
        className={cn(
          'relative w-full overflow-hidden rounded-2xl border-0 p-0 shadow-none',
          aspectClass,
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
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-lg font-medium text-white tracking-wide md:text-xl">
            {title}
          </h3>
        </div>
      </Card> 
    </Link>
  );
}

export default function StudioSection() {
  const { t } = useTranslation();

  return (
    <section className="w-full overflow-x-hidden bg-[#0f0f0f] px-6 py-16 md:px-8 lg:px-12">
      {/* Mobile: header with title + nav arrows */}
      <div className="mb-6 flex items-center justify-between lg:mb-12">
        <h2 className="text-4xl font-medium text-white tracking-tight md:text-5xl">
          {t('studio.title')}
        </h2>
        {/* Mobile swiper nav - dark circular buttons */}
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            aria-label="Previous"
            className="studio-swiper-prev flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="studio-swiper-next flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:bg-white/10"
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
            prevEl: '.studio-swiper-prev',
            nextEl: '.studio-swiper-next',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          loopAdditionalSlides={2}
          allowTouchMove={false}
          spaceBetween={16}
          slidesPerView={1}
          className="!overflow-hidden"
        >
          {studioItems.map((item) => (
            <SwiperSlide key={item.id}>
              <StudioCard
                item={item}
                title={t(`studio.cards.${item.titleKey}`)}
                aspectClass="aspect-[3/2]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid - About (wide) + Quote, then rest of cards */}
      <div className="hidden overflow-hidden grid-cols-1 gap-6 gap-y-10 md:grid md:grid-cols-2 md:gap-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:gap-y-12">
        {/* Row 1: About (wide left) + Quote (narrow right) */}
        <div className="lg:col-span-2">
          <StudioCard item={studioItems[0]} title={t(`studio.cards.about`)} aspectClass="aspect-[25/9]" />
        </div>
        <div className="flex h-full min-h-[140px] flex-col items-center justify-center rounded-2xl bg-[#1a1a1a] p-6 text-center">
          <p className="text-base leading-relaxed text-white/90 md:text-lg">
            {t('studio.aboutQuote')}
          </p>
          <p className="mt-4 text-sm text-white/70">{t('brand')}</p>
        </div>
        {/* Rest of cards */}
        {studioItems.slice(1).map((item, index) => (
          <StudioCard
            key={item.id}
            item={item}
            title={t(`studio.cards.${item.titleKey}`)}
            aspectClass={index === 4 ? 'aspect-[3/1]' : 'aspect-[3/2]'}
            gridClass={
              index === 0
                ? 'lg:col-start-1 lg:row-start-2'
                : index === 1
                  ? 'lg:col-start-2 lg:row-start-2'
                  : index === 2
                    ? 'lg:col-start-3 lg:row-start-2'
                    : index === 3
                      ? 'lg:col-start-1 lg:row-start-3'
                      : index === 4
                        ? 'lg:col-span-2 lg:col-start-2 lg:row-start-3'
                        : undefined
            }
          />
        ))}
      </div>
    </section>
  );
}
