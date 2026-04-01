export function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function openExternalUrl(url: string): void {
  if (typeof window === 'undefined') return;
  if (!isSafeExternalUrl(url)) return;

  // noopener/noreferrer prevents reverse-tabnabbing and removes Referer.
  window.open(url, '_blank', 'noopener,noreferrer');
}

