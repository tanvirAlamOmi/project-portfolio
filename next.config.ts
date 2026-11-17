import type { NextConfig } from "next";

/**
 * Dynamic basePath configuration:
 * - Subfolder deployment (current ebnhost: https://sejuti.com/era/): NEXT_PUBLIC_BASE_PATH = "/era"
 * - Custom domain root (future domain: https://example.com/): NEXT_PUBLIC_BASE_PATH = ""
 * Defaults to "/era" if not explicitly specified.
 */
const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/era";
const basePath = rawBasePath.trim();
const normalizedBasePath =
  basePath && basePath !== "/" && basePath.toLowerCase() !== "none"
    ? (basePath.startsWith("/") ? basePath : `/${basePath}`)
    : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: normalizedBasePath || undefined,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./src/utils/imageLoader.ts",
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: normalizedBasePath,
  },
};

export default nextConfig;
