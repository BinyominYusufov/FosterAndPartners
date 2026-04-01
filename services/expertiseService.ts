import apiClient from '@/lib/apiClient';
import type { ExpertiseTopic, PaginatedResponse } from '@/lib/types/api';

export interface ExpertiseListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export type ExpertiseCreatePayload = Partial<ExpertiseTopic>;
export type ExpertiseUpdatePayload = Partial<ExpertiseTopic>;

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

export async function getExpertise(params?: ExpertiseListParams): Promise<PaginatedResponse<ExpertiseTopic>> {
  const { data } = await apiClient.get('/expertise/', { params });
  return normalizePaginated<ExpertiseTopic>(unwrapResponse<unknown>(data));
}

export async function getExpertiseBySlug(slug: string): Promise<ExpertiseTopic> {
  const { data } = await apiClient.get(`/expertise/${slug}/`);
  return unwrapResponse<ExpertiseTopic>(data);
}

export async function createExpertise(payload: ExpertiseCreatePayload): Promise<ExpertiseTopic> {
  const { data } = await apiClient.post('/expertise/', payload);
  return unwrapResponse<ExpertiseTopic>(data);
}

export async function updateExpertise(slug: string, payload: ExpertiseUpdatePayload): Promise<ExpertiseTopic> {
  const { data } = await apiClient.put(`/expertise/${slug}/`, payload);
  return unwrapResponse<ExpertiseTopic>(data);
}

export async function deleteExpertise(slug: string): Promise<void> {
  await apiClient.delete(`/expertise/${slug}/`);
}
