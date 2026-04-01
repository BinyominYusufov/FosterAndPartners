import apiClient from '@/lib/apiClient';
import type { Publication, PaginatedResponse } from '@/lib/types/api';

export interface PublicationsListParams {
  page?: number;
  page_size?: number;
  ordering?: string;
}

export type PublicationCreatePayload = Partial<Publication>;
export type PublicationUpdatePayload = Partial<Publication>;

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

export async function getPublications(params?: PublicationsListParams): Promise<PaginatedResponse<Publication>> {
  const { data } = await apiClient.get('/publications/', { params });
  return normalizePaginated<Publication>(unwrapResponse<unknown>(data));
}

export async function getPublicationById(id: string | number): Promise<Publication> {
  const { data } = await apiClient.get(`/publications/${id}/`);
  return unwrapResponse<Publication>(data);
}

export async function createPublication(payload: PublicationCreatePayload): Promise<Publication> {
  const { data } = await apiClient.post('/publications/', payload);
  return unwrapResponse<Publication>(data);
}

export async function updatePublication(id: string | number, payload: PublicationUpdatePayload): Promise<Publication> {
  const { data } = await apiClient.put(`/publications/${id}/`, payload);
  return unwrapResponse<Publication>(data);
}

export async function deletePublication(id: string | number): Promise<void> {
  await apiClient.delete(`/publications/${id}/`);
}
