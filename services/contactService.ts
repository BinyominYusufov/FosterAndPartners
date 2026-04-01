import axios, { AxiosError } from 'axios';
import apiClient from '@/lib/apiClient';

/**
 * POST /contact-messages/
 * Body: { name, email, subject, message } (see OpenAPI)
 */
export interface ContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormPayload {
  name?: string;
  email: string;
  subject?: string;
  message?: string;
}

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

function extractApiErrorMessage(err: unknown): string {
  if (!axios.isAxiosError(err)) {
    return err instanceof Error ? err.message : 'Request failed';
  }
  const data = err.response?.data as unknown;
  if (data && typeof data === 'object') {
    const o = data as Record<string, unknown>;
    if (typeof o.detail === 'string') return o.detail;
    if (typeof o.message === 'string') return o.message;
    if (typeof o.error === 'string') return o.error;
    if (Array.isArray(o.non_field_errors) && typeof o.non_field_errors[0] === 'string') {
      return o.non_field_errors[0];
    }
  }
  return err.message || 'Request failed';
}

export async function submitContactMessage(formPayload: ContactFormPayload): Promise<void> {
  const body: ContactMessageRequest = {
    name: (formPayload.name ?? '').trim(),
    email: formPayload.email.trim(),
    subject: (formPayload.subject ?? '').trim(),
    message: (formPayload.message ?? '').trim(),
  };

  if (!body.email) {
    throw new Error('Email is required');
  }

  try {
    const { data } = await apiClient.post<unknown>('/contact-messages/', body);
    const payload = unwrapResponse<unknown>(data);

    if (
      payload &&
      typeof payload === 'object' &&
      'success' in payload &&
      (payload as { success?: boolean }).success === false
    ) {
      const err = (payload as { error?: unknown }).error;
      throw new Error(typeof err === 'string' ? err : 'Request failed');
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(extractApiErrorMessage(e));
    }
    throw e;
  }
}
