'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IMG_MISC } from '@/lib/images';
import { subscribeNewsletter } from '@/services/newsletterService';

export default function NewsSection() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;

    setStatus('loading');
    try {
      await subscribeNewsletter({ email: value });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="w-full bg-[#202020] px-6 py-16 md:px-8 lg:px-12">
      <h2 className="mb-12 text-4xl font-medium text-white tracking-tight md:text-5xl">
        {t('news.title')}
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        <div className="relative overflow-hidden rounded-2xl lg:col-span-2 aspect-[25/9]">
          <Image
            src={IMG_MISC.latestNews}
            alt={t('news.latestNews')}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
            aria-hidden
          />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-lg font-medium text-white tracking-wide md:text-xl">
              {t('news.latestNews')}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-2xl bg-[#2C2C2C] p-6 lg:p-8">
          <p className="mb-6 text-base leading-relaxed text-white md:text-lg">
            {t('news.subscribeHeadline')}
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('news.emailPlaceholder')}
              className="w-full rounded-full border-0 bg-[#1a1a1a] px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              aria-label={t('news.emailPlaceholder')}
              required
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full rounded-full bg-[#1a1a1a] px-6 py-4 font-medium text-white transition-colors hover:bg-[#252525] focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-70"
            >
              {status === 'loading'
                ? t('news.sending', { defaultValue: 'Sending…' })
                : status === 'success'
                  ? t('news.subscribed', { defaultValue: 'Subscribed!' })
                  : status === 'error'
                    ? t('news.error', { defaultValue: 'Try again' })
                    : t('news.subscribe')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
