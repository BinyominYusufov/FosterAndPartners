'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import heroMain from '@/public/hero-main.png';
import heromain2 from '@/public/hero-main2.png';
import heromain3 from '@/public/hero-main3.png';

const heroSlides = [
  { id: 1, image: heroMain },
  { id: 2, image: heromain2 },
  { id: 3, image: heromain3 },
];

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Swiper background */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.id === 1}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="mt-auto px-6 pb-16 md:px-8 md:pb-20 lg:px-12">
          <div className="max-w-xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-300">
              {t('hero.category')}
            </p>
            <h1 className="text-2xl font-semibold leading-snug md:text-3xl lg:text-4xl">
              {t('hero.title')}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

