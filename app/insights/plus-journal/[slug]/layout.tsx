import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import insightsEn from '../../../../public/locales/en/insights.json';
import { PLUS_JOURNAL_BY_SLUG } from '@/data/insights';

type InsightsJson = {
  metadata?: { title?: string; description?: string };
  items?: Record<string, string>;
};

const insights = insightsEn as InsightsJson;
const fallbackTitle = insights.metadata?.title ?? 'Insights — Foster + Partners';
const fallbackDescription = insights.metadata?.description ?? '';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = PLUS_JOURNAL_BY_SLUG.get(slug);

  if (!article) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const title = insights.items?.[article.titleKey] ?? fallbackTitle;
  const description = insights.items?.[article.summaryKey] ?? fallbackDescription;

  return {
    title,
    description,
  };
}

export default function PlusJournalArticleLayout({ children }: LayoutProps) {
  return children;
}

