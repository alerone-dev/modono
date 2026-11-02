import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async redirects() {
    return [
      // Data deletion now lives in the privacy policy; keep old links working
      { source: "/data-deletion", destination: "/privacy#data-deletion", permanent: true },
    ];
  },
};

export default nextConfig;
