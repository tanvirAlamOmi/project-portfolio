import type { NextConfig } from "next";

/**
 * Dynamic basePath configuration:
 * - Subfolder deployment (ebnhost cPanel: https://sejuti.com/era/): NEXT_PUBLIC_BASE_PATH = "/era"
 * - Custom domain root (local dev / root domain): NEXT_PUBLIC_BASE_PATH = "" (default)
 * Defaults to "" (root) so local development (npm run dev) works seamlessly at http://localhost:3000/.
 * In GitHub Actions CI (deploy.yml) or when running 'npm run build:era', NEXT_PUBLIC_BASE_PATH is set to '/era'.
 */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").trim();
const normalizedBasePath =
  rawBasePath && rawBasePath !== "/" && rawBasePath.toLowerCase() !== "none"
    ? (rawBasePath.startsWith("/") ? rawBasePath : `/${rawBasePath}`)
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
