import apiClient from '@/lib/apiClient';
import type { Project, PaginatedResponse } from '@/lib/types/api';

export interface ProjectListParams {
  page?: number;
  page_size?: number;
  search?: string;
  type?: string;
  region?: string;
  ordering?: string;
}

export type ProjectCreatePayload = Partial<Project>;
export type ProjectUpdatePayload = Partial<Project>;

export async function getProjects(params?: ProjectListParams): Promise<PaginatedResponse<Project>> {
  const { data } = await apiClient.get('/projects/', { params });

  if (Array.isArray(data)) {
    return {
      count: data.length,
      next: null,
      previous: null,
      results: data,
    };
  }

  if (Array.isArray(data?.results)) {
    return {
      count: typeof data.count === 'number' ? data.count : data.results.length,
      next: data.next ?? null,
      previous: data.previous ?? null,
      results: data.results,
    };
  }

  if (Array.isArray(data?.data?.results)) {
    return {
      count: typeof data.data.count === 'number' ? data.data.count : data.data.results.length,
      next: data.data.next ?? null,
      previous: data.data.previous ?? null,
      results: data.data.results,
    };
  }

  return {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };
}

export async function getProjectById(id: string | number): Promise<Project> {
  const { data } = await apiClient.get<Project>(`/projects/${id}/`);
  return data;
}

export async function createProject(payload: ProjectCreatePayload): Promise<Project> {
  const { data } = await apiClient.post<Project>('/projects/', payload);
  return data;
}

export async function updateProject(id: string | number, payload: ProjectUpdatePayload): Promise<Project> {
  const { data } = await apiClient.put<Project>(`/projects/${id}/`, payload);
  return data;
}

export async function deleteProject(id: string | number): Promise<void> {
  await apiClient.delete(`/projects/${id}/`);
}
