/**
 * Dynamic Asset Path Resolver
 * Automatically resolves asset paths dynamically based on NEXT_PUBLIC_BASE_PATH.
 * - Subfolder deployment (e.g. /era): returns '/era/assets/...'
 * - Root Domain deployment (custom domain): returns '/assets/...'
 */
const RAW_BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? '/era').trim();
export const BASE_PATH =
  RAW_BASE_PATH && RAW_BASE_PATH !== '/' && RAW_BASE_PATH.toLowerCase() !== 'none'
    ? RAW_BASE_PATH.startsWith('/')
      ? RAW_BASE_PATH
      : `/${RAW_BASE_PATH}`
    : '';

export function asset(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (!BASE_PATH) {
    return normalized;
  }

  if (normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) {
    return normalized;
  }

  return `${BASE_PATH}${normalized}`;
}
