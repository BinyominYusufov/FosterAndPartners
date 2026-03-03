import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import newsEn from '../../../public/locales/en/news.json';
import { NEWS_BY_SLUG } from '@/data/news';

type NewsJson = {
  metadata?: { title?: string; description?: string };
  items?: Record<string, string>;
};

const news = newsEn as NewsJson;
const fallbackTitle = news.metadata?.title ?? 'News — Foster + Partners';
const fallbackDescription = news.metadata?.description ?? '';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_BY_SLUG.get(slug);

  if (!article) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }

  const title = news.items?.[article.titleKey] ?? fallbackTitle;
  const description = news.items?.[article.summaryKey] ?? fallbackDescription;

  return {
    title,
    description,
  };
}

export default function NewsArticleLayout({ children }: LayoutProps) {
  return children;
}

