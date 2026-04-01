import apiClient, { authStorage } from '@/lib/apiClient';
import type { TokenObtainPairResponse, TokenRefreshResponse } from '@/lib/types/api';

export async function login(username: string, password: string): Promise<TokenObtainPairResponse> {
  const { data } = await apiClient.post<TokenObtainPairResponse>('/token/', { username, password });
  authStorage.setTokens(data.access, data.refresh);
  return data;
}

export async function refreshToken(): Promise<string> {
  const refresh = authStorage.getRefreshToken();
  if (!refresh) throw new Error('No refresh token');
  const { data } = await apiClient.post<TokenRefreshResponse>('/token/refresh/', { refresh });
  authStorage.setTokens(data.access, refresh);
  return data.access;
}

export function logout(): void {
  authStorage.clearTokens();
}

export function getStoredAccessToken(): string | null {
  return authStorage.getAccessToken();
}
