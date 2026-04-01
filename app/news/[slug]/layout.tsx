import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getNewsBySlugServer } from '@/services/newsService';

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlugServer(slug);

  if (!article) {
    return {
      title: 'News — Foster + Partners',
      description: '',
    };
  }

  const title = article.title ?? 'News — Foster + Partners';
  const description = article.summary ?? article.summaryKey ?? '';

  return {
    title,
    description,
  };
}

export default function NewsArticleLayout({ children }: LayoutProps) {
  return children;
}
