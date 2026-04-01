import apiClient from '@/lib/apiClient';
import type { Team, PaginatedResponse } from '@/lib/types/api';

export interface TeamsListParams {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export type TeamCreatePayload = Partial<Team>;
export type TeamUpdatePayload = Partial<Team>;

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

export async function getTeams(params?: TeamsListParams): Promise<PaginatedResponse<Team>> {
  const { data } = await apiClient.get('/people/teams/', { params });
  const payload = unwrapResponse<unknown>(data);

  if (Array.isArray(payload)) {
    return { count: payload.length, next: null, previous: null, results: payload };
  }

  if (Array.isArray((payload as { results?: Team[] })?.results)) {
    const page = payload as PaginatedResponse<Team>;
    return {
      count: typeof page.count === 'number' ? page.count : page.results.length,
      next: page.next ?? null,
      previous: page.previous ?? null,
      results: page.results,
    };
  }

  return { count: 0, next: null, previous: null, results: [] };
}

export async function getTeamBySlug(slug: string): Promise<Team> {
  const { data } = await apiClient.get(`/people/teams/${slug}/`);
  return unwrapResponse<Team>(data);
}

export async function createTeam(payload: TeamCreatePayload): Promise<Team> {
  const { data } = await apiClient.post('/people/teams/', payload);
  return unwrapResponse<Team>(data);
}

export async function updateTeam(slug: string, payload: TeamUpdatePayload): Promise<Team> {
  const { data } = await apiClient.put(`/people/teams/${slug}/`, payload);
  return unwrapResponse<Team>(data);
}

export async function deleteTeam(slug: string): Promise<void> {
  await apiClient.delete(`/people/teams/${slug}/`);
}
