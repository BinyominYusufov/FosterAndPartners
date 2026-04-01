import apiClient from '@/lib/apiClient';
import type { Person, PaginatedResponse } from '@/lib/types/api';

export interface PeopleListParams {
  page?: number;
  page_size?: number;
  search?: string;
  title?: string;
  board?: string;
  ordering?: string;
}

export type PersonCreatePayload = Partial<Person>;
export type PersonUpdatePayload = Partial<Person>;

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export async function getPeople(params?: PeopleListParams): Promise<PaginatedResponse<Person>> {
  const { data } = await apiClient.get('/people/', { params });
  const payload = unwrapResponse<unknown>(data);

  if (Array.isArray(payload)) {
    return { count: payload.length, next: null, previous: null, results: payload };
  }

  if (Array.isArray((payload as { results?: Person[] })?.results)) {
    const page = payload as PaginatedResponse<Person>;
    return {
      count: typeof page.count === 'number' ? page.count : page.results.length,
      next: page.next ?? null,
      previous: page.previous ?? null,
      results: page.results,
    };
  }

  return { count: 0, next: null, previous: null, results: [] };
}

export async function getPersonById(id: string | number): Promise<Person> {
  const { data } = await apiClient.get(`/people/${id}/`);
  return unwrapResponse<Person>(data);
}

export async function createPerson(payload: PersonCreatePayload): Promise<Person> {
  const { data } = await apiClient.post('/people/', payload);
  return unwrapResponse<Person>(data);
}

export async function updatePerson(id: string | number, payload: PersonUpdatePayload): Promise<Person> {
  const { data } = await apiClient.put(`/people/${id}/`, payload);
  return unwrapResponse<Person>(data);
}

export async function deletePerson(id: string | number): Promise<void> {
  await apiClient.delete(`/people/${id}/`);
}
