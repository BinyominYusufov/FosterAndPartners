import apiClient from '@/lib/apiClient';
import type { StudioTopicDetail, StudioTopicList, StudioTopicWrite, PaginatedResponse } from '@/lib/types/api';

export interface StudioTopicsListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export type StudioTopicCreatePayload = StudioTopicWrite;
export type StudioTopicUpdatePayload = StudioTopicWrite;

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

export async function getStudioTopics(params?: StudioTopicsListParams): Promise<PaginatedResponse<StudioTopicList>> {
  const { data } = await apiClient.get('/studio-topics/', { params });
  return normalizePaginated<StudioTopicList>(unwrapResponse<unknown>(data));
}

export async function getStudioTopicBySlug(slug: string): Promise<StudioTopicDetail> {
  const { data } = await apiClient.get(`/studio-topics/${slug}/`);
  return unwrapResponse<StudioTopicDetail>(data);
}

export async function createStudioTopic(payload: StudioTopicCreatePayload): Promise<StudioTopicWrite> {
  const { data } = await apiClient.post('/studio-topics/', payload);
  return unwrapResponse<StudioTopicWrite>(data);
}

export async function updateStudioTopic(slug: string, payload: StudioTopicUpdatePayload): Promise<StudioTopicWrite> {
  const { data } = await apiClient.put(`/studio-topics/${slug}/`, payload);
  return unwrapResponse<StudioTopicWrite>(data);
}

export async function deleteStudioTopic(slug: string): Promise<void> {
  await apiClient.delete(`/studio-topics/${slug}/`);
}
