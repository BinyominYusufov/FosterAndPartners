import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ACCESS_TOKEN_KEY = 'foster_access_token';
const REFRESH_TOKEN_KEY = 'foster_refresh_token';

function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function safeRemoveItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export const authStorage = {
  getAccessToken(): string | null {
    return safeGetItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken(): string | null {
    return safeGetItem(REFRESH_TOKEN_KEY);
  },
  setTokens(access: string, refresh: string): void {
    safeSetItem(ACCESS_TOKEN_KEY, access);
    safeSetItem(REFRESH_TOKEN_KEY, refresh);
  },
  clearTokens(): void {
    safeRemoveItem(ACCESS_TOKEN_KEY);
    safeRemoveItem(REFRESH_TOKEN_KEY);
  },
};

apiClient.interceptors.request.use((config) => {
  const token = authStorage.getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RetriableAxiosRequestConfig = AxiosRequestConfig & { _retry?: boolean };

function isAxiosError(error: unknown): error is AxiosError {
  return Boolean(error) && typeof error === 'object' && (error as AxiosError).isAxiosError === true;
}

const refreshClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refresh = authStorage.getRefreshToken();
  if (!refresh) throw new Error('No refresh token');

  const { data } = await refreshClient.post<{ access: string }>('/token/refresh/', { refresh });
  authStorage.setTokens(data.access, refresh);
  return data.access;
}

apiClient.interceptors.response.use(
  (res) => res,
  async (error: unknown) => {
    if (!isAxiosError(error)) throw error;

    const originalConfig = (error.config ?? {}) as RetriableAxiosRequestConfig;
    const status = error.response?.status;

    if (status !== 401 || originalConfig._retry) throw error;

    const hasRefresh = Boolean(authStorage.getRefreshToken());
    if (!hasRefresh) {
      authStorage.clearTokens();
      throw error;
    }

    originalConfig._retry = true;
    try {
      refreshPromise ??= refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
      const access = await refreshPromise;
      originalConfig.headers = originalConfig.headers ?? {};
      originalConfig.headers.Authorization = `Bearer ${access}`;
      return apiClient(originalConfig);
    } catch (refreshErr) {
      authStorage.clearTokens();
      throw refreshErr;
    }
  }
);

export default apiClient;
