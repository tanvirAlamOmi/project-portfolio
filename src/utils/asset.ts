export const BASE_PATH = '/era';

/**
 * Returns the path prefixed with the Next.js basePath (/era).
 * Ensures static assets and images resolve correctly when hosted in a subfolder.
 * e.g. asset('/assets/icons/nav-home.svg') => '/era/assets/icons/nav-home.svg'
 */
export function asset(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === BASE_PATH || normalized.startsWith(`${BASE_PATH}/`)) {
    return normalized;
  }
  return `${BASE_PATH}${normalized}`;
}

