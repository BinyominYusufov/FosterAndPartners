import apiClient from '@/lib/apiClient';
import type { JournalArticleDetail, JournalArticleList, JournalArticleWrite, PaginatedResponse } from '@/lib/types/api';

export interface PlusJournalListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export type PlusJournalCreatePayload = JournalArticleWrite;
export type PlusJournalUpdatePayload = JournalArticleWrite;

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

export async function getPlusJournal(params?: PlusJournalListParams): Promise<PaginatedResponse<JournalArticleList>> {
  const { data } = await apiClient.get('/insights/plus-journal/', { params });
  return normalizePaginated<JournalArticleList>(unwrapResponse<unknown>(data));
}

export async function getPlusJournalBySlug(slug: string): Promise<JournalArticleDetail> {
  const { data } = await apiClient.get(`/insights/plus-journal/${slug}/`);
  return unwrapResponse<JournalArticleDetail>(data);
}

export async function createPlusJournalArticle(payload: PlusJournalCreatePayload): Promise<JournalArticleWrite> {
  const { data } = await apiClient.post('/insights/plus-journal/', payload);
  return unwrapResponse<JournalArticleWrite>(data);
}

export async function updatePlusJournalArticle(
  slug: string,
  payload: PlusJournalUpdatePayload
): Promise<JournalArticleWrite> {
  const { data } = await apiClient.put(`/insights/plus-journal/${slug}/`, payload);
  return unwrapResponse<JournalArticleWrite>(data);
}

export async function deletePlusJournalArticle(slug: string): Promise<void> {
  await apiClient.delete(`/insights/plus-journal/${slug}/`);
}
