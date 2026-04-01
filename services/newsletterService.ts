import apiClient from '@/lib/apiClient';
import type { NewsletterSubscription } from '@/lib/types/api';

export async function subscribeNewsletter(payload: NewsletterSubscription): Promise<void> {
  await apiClient.post('/newsletter-subscriptions/', payload);
}
