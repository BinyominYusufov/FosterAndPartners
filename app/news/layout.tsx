import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import newsEn from '../../public/locales/en/news.json';

const meta = (newsEn as { metadata?: { title?: string; description?: string } }).metadata;

export function generateMetadata(): Metadata {
  return {
    title: meta?.title ?? 'News — Foster + Partners',
    description: meta?.description ?? '',
  };
}

export default function NewsLayout({ children }: { children: ReactNode }) {
  return children;
}

