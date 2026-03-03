import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import insightsEn from '../../public/locales/en/insights.json';

const meta = (insightsEn as { metadata?: { title?: string; description?: string } }).metadata;

export function generateMetadata(): Metadata {
  return {
    title: meta?.title ?? 'Insights — Foster + Partners',
    description: meta?.description ?? '',
  };
}

export default function InsightsLayout({ children }: { children: ReactNode }) {
  return children;
}

