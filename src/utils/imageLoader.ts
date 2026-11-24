'use client';

/**
 * Dynamic Next.js Image Loader
 * Automatically resolves image paths dynamically based on NEXT_PUBLIC_BASE_PATH.
 * - Subfolder (e.g. /era): prefixes with /era
 * - Root Domain (e.g. custom domain / local dev): returns clean root path
 */
const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim();
const normalizedBasePath =
  BASE_PATH && BASE_PATH !== '/' && BASE_PATH.toLowerCase() !== 'none'
    ? BASE_PATH.startsWith('/')
      ? BASE_PATH
      : `/${BASE_PATH}`
    : '';

export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width?: number;
  quality?: number;
}): string {
  if (!src) return '';
  // If external URL or data URI, return directly
  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }

  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;

  // When deployed to root of custom domain, return root path
  if (!normalizedBasePath) {
    return normalizedSrc;
  }

  // Avoid double prefixing
  if (
    normalizedSrc === normalizedBasePath ||
    normalizedSrc.startsWith(`${normalizedBasePath}/`)
  ) {
    return normalizedSrc;
  }

  return `${normalizedBasePath}${normalizedSrc}`;
}
