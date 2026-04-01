import apiClient from '@/lib/apiClient';
import type { NewsArticleDetail, NewsArticleList, PaginatedResponse } from '@/lib/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

export interface NewsListParams {
  page?: number;
  page_size?: number;
  search?: string;
  type?: string;
  ordering?: string;
}

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

function normalizePaginated<T>(payload: unknown): PaginatedResponse<T> {
  if (Array.isArray(payload)) {
    return { count: payload.length, next: null, previous: null, results: payload };
  }
  if (payload && typeof payload === 'object' && Array.isArray((payload as PaginatedResponse<T>).results)) {
    const p = payload as PaginatedResponse<T>;
    return {
      count: typeof p.count === 'number' ? p.count : p.results.length,
      next: p.next ?? null,
      previous: p.previous ?? null,
      results: p.results,
    };
  }
  return { count: 0, next: null, previous: null, results: [] };
}

export async function getNews(params?: NewsListParams): Promise<PaginatedResponse<NewsArticleList>> {
  const { data } = await apiClient.get('/news/', { params });
  const unwrapped = unwrapResponse<unknown>(data);
  return normalizePaginated<NewsArticleList>(unwrapped);
}

export async function getNewsBySlug(slug: string): Promise<NewsArticleDetail> {
  const { data } = await apiClient.get(`/news/${slug}/`);
  return unwrapResponse<NewsArticleDetail>(data);
}

/** Server-safe fetch for metadata (no auth, no axios). */
export async function getNewsBySlugServer(slug: string): Promise<NewsArticleDetail | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${slug}/`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
