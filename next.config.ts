import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  reactStrictMode: true,
  /*
   * The portfolio moved from /work to /portfolio. Old links and search results
   * still land in the right place. Only page paths are matched: `/work` itself and
   * single-segment slugs without a dot. The images live under `public/work/...`,
   * which these patterns deliberately never match.
   */
  async redirects() {
    return [
      { source: "/work", destination: "/portfolio", permanent: true },
      {
        source: "/work/:slug([^/.]+)",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
